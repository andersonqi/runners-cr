"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order, Registration, getRutaLabel, formatColones } from "@/lib/types";

interface OrderWithRegistrations extends Order {
  registrations: Registration[];
}

async function fetchOrders(): Promise<OrderWithRegistrations[]> {
  const { data: ordersData } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (!ordersData) return [];

  const { data: regsData } = await supabase.from("registrations").select("*");

  return ordersData.map((o) => ({
    ...o,
    registrations: (regsData ?? []).filter(
      (r: { order_id: string }) => r.order_id === o.id
    ),
  })) as OrderWithRegistrations[];
}

// ---- Login form ----
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (!res.ok) {
        setError("Usuario o contraseña incorrectos");
        return;
      }
      onLogin();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-1 text-2xl font-black">
            ABANGARES <span className="text-orange italic">RUN</span>
          </h1>
          <p className="text-sm text-gray-500">Panel de Administración</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-400">Usuario</label>
            <input
              type="text"
              required
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="mb-1 block text-sm text-gray-400">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
            />
          </div>
          {error && (
            <p className="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-center text-sm text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-full bg-gradient-to-r from-orange to-orange-light py-3 font-bold text-white transition hover:shadow-lg hover:shadow-orange/25 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Dashboard ----
export default function DashboardPage() {
  const [auth, setAuth] = useState<"loading" | "logged_in" | "logged_out">("loading");
  const [orders, setOrders] = useState<OrderWithRegistrations[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todos" | "pendiente" | "confirmado" | "rechazado">("todos");
  const [search, setSearch] = useState("");
  const didLoad = useRef(false);

  // Check auth on mount
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => setAuth(res.ok ? "logged_in" : "logged_out"))
      .catch(() => setAuth("logged_out"));
  }, []);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (auth !== "logged_in" || didLoad.current) return;
    didLoad.current = true;
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [auth]);

  async function updateStatus(orderId: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: status as Order["status"] } : o))
    );
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuth("logged_out");
  }

  // Auth states
  if (auth === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-gray-400">
        Cargando...
      </div>
    );
  }

  if (auth === "logged_out") {
    return (
      <LoginForm
        onLogin={() => {
          setAuth("logged_in");
          didLoad.current = false;
        }}
      />
    );
  }

  const filtered = orders.filter((o) => {
    if (filter !== "todos" && o.status !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      const matchOrder = o.order_number.toLowerCase().includes(s);
      const matchReg = o.registrations.some(
        (r) =>
          r.nombre.toLowerCase().includes(s) ||
          r.apellidos.toLowerCase().includes(s) ||
          r.cedula.includes(s)
      );
      return matchOrder || matchReg;
    }
    return true;
  });

  const stats = {
    total: orders.length,
    confirmados: orders.filter((o) => o.status === "confirmado").length,
    pendientes: orders.filter((o) => o.status === "pendiente").length,
    participantes: orders.reduce((sum, o) => sum + o.registrations.length, 0),
    ingresos: orders
      .filter((o) => o.status === "confirmado")
      .reduce((sum, o) => sum + o.total_amount, 0),
  };

  return (
    <div className="min-h-screen bg-navy px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-black sm:text-3xl">
              ABANGARES <span className="text-orange italic">RUN</span>
            </h1>
            <p className="text-sm text-gray-400">Dashboard — Inscripciones</p>
          </div>
          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-red-500/30 hover:text-red-400"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-xl bg-navy-light p-4 text-center">
            <p className="text-2xl font-bold text-orange">{stats.total}</p>
            <p className="text-xs text-gray-400">Órdenes</p>
          </div>
          <div className="rounded-xl bg-navy-light p-4 text-center">
            <p className="text-2xl font-bold text-teal">{stats.confirmados}</p>
            <p className="text-xs text-gray-400">Confirmados</p>
          </div>
          <div className="rounded-xl bg-navy-light p-4 text-center">
            <p className="text-2xl font-bold text-gold">{stats.pendientes}</p>
            <p className="text-xs text-gray-400">Pendientes</p>
          </div>
          <div className="rounded-xl bg-navy-light p-4 text-center">
            <p className="text-2xl font-bold">{stats.participantes}</p>
            <p className="text-xs text-gray-400">Participantes</p>
          </div>
          <div className="col-span-2 rounded-xl bg-navy-light p-4 text-center sm:col-span-1">
            <p className="text-2xl font-bold text-teal">{formatColones(stats.ingresos)}</p>
            <p className="text-xs text-gray-400">Ingresos Conf.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Buscar por nombre, cédula u orden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-navy-light px-4 py-2.5 text-white outline-none focus:border-orange"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="cursor-pointer rounded-lg border border-white/10 bg-navy-light px-4 py-2.5 text-white outline-none focus:border-orange"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="rechazado">Rechazado</option>
          </select>
          <button
            onClick={loadOrders}
            className="cursor-pointer rounded-lg bg-orange/20 px-4 py-2.5 text-orange transition hover:bg-orange/30"
          >
            Recargar
          </button>
        </div>

        {/* Orders */}
        {loading ? (
          <p className="text-center text-gray-400">Cargando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400">No hay órdenes</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-navy-light p-5"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-bold text-orange">
                      {order.order_number}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleString("es-CR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        order.status === "confirmado"
                          ? "bg-teal/20 text-teal"
                          : order.status === "rechazado"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gold/20 text-gold"
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="font-bold">{formatColones(order.total_amount)}</p>
                  </div>
                </div>

                {/* Registrations table */}
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-xs text-gray-400">
                        <th className="pb-2">Nombre</th>
                        <th className="pb-2">Cédula</th>
                        <th className="pb-2">Teléfono</th>
                        <th className="pb-2">Género</th>
                        <th className="pb-2">Ruta</th>
                        <th className="pb-2">Talla</th>
                        <th className="pb-2">Nac.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.registrations.map((r) => (
                        <tr
                          key={r.id}
                          className="border-b border-white/5"
                        >
                          <td className="py-2">
                            {r.nombre} {r.apellidos}
                          </td>
                          <td className="py-2">{r.cedula}</td>
                          <td className="py-2">{r.telefono}</td>
                          <td className="py-2 capitalize">{r.genero}</td>
                          <td className="py-2">{getRutaLabel(r.ruta)}</td>
                          <td className="py-2">{r.talla_camiseta}</td>
                          <td className="py-2">{r.fecha_nacimiento}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Comprobante + Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  {order.payment_proof_url && (
                    <a
                      href={order.payment_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer rounded-lg bg-white/10 px-3 py-1.5 text-xs transition hover:bg-white/20"
                    >
                      Ver Comprobante
                    </a>
                  )}
                  {order.status !== "confirmado" && (
                    <button
                      onClick={() => updateStatus(order.id, "confirmado")}
                      className="cursor-pointer rounded-lg bg-teal/20 px-3 py-1.5 text-xs text-teal transition hover:bg-teal/30"
                    >
                      Confirmar
                    </button>
                  )}
                  {order.status !== "rechazado" && (
                    <button
                      onClick={() => updateStatus(order.id, "rechazado")}
                      className="cursor-pointer rounded-lg bg-red-500/20 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/30"
                    >
                      Rechazar
                    </button>
                  )}
                  {order.status !== "pendiente" && (
                    <button
                      onClick={() => updateStatus(order.id, "pendiente")}
                      className="cursor-pointer rounded-lg bg-gold/20 px-3 py-1.5 text-xs text-gold transition hover:bg-gold/30"
                    >
                      Pendiente
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
