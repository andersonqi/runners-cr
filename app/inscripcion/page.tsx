"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Participant,
  RUTAS,
  TALLAS,
  getPrecioByRuta,
  getRutaLabel,
  formatColones,
} from "@/lib/types";

const emptyParticipant: Participant = {
  nombre: "",
  apellidos: "",
  genero: "masculino",
  fecha_nacimiento: "",
  cedula: "",
  telefono: "",
  talla_camiseta: "M",
  ruta: "10km",
};

interface OrderResult {
  id: string;
  order_number: string;
  total_amount: number;
}

export default function InscripcionPage() {
  const [participants, setParticipants] = useState<Participant[]>([
    { ...emptyParticipant },
  ]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");

  const total = participants.reduce(
    (sum, p) => sum + getPrecioByRuta(p.ruta),
    0
  );

  function updateParticipant(index: number, field: keyof Participant, value: string) {
    setParticipants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function addParticipant() {
    setParticipants((prev) => [...prev, { ...emptyParticipant }]);
  }

  function removeParticipant(index: number) {
    if (participants.length <= 1) return;
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate
    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];
      if (!p.nombre || !p.apellidos || !p.fecha_nacimiento || !p.cedula || !p.telefono) {
        setError(`Por favor completá todos los campos del participante ${i + 1}`);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participants, total_amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la orden");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload() {
    if (!uploadFile || !order) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("order_id", order.id);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUploaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir comprobante");
    } finally {
      setUploading(false);
    }
  }

  function getWhatsAppUrl(phone: string) {
    const participantLines = participants
      .map((p, i) => `${i + 1}. ${p.nombre} ${p.apellidos} - ${getRutaLabel(p.ruta)} - Talla ${p.talla_camiseta}`)
      .join("\n");
    const message = encodeURIComponent(
      `Hola, me acabo de inscribir en Abangares Run 2026.\n\n` +
        `📋 Orden: ${order?.order_number}\n` +
        `💰 Total: ${formatColones(total)}\n\n` +
        `Participantes:\n${participantLines}\n\n` +
        `Este es mi # de reserva: ${order?.order_number}`
    );
    return `https://wa.me/506${phone}?text=${message}`;
  }

  // -- ORDER CREATED: show payment + upload + whatsapp --
  if (order) {
    return (
      <div className="min-h-screen bg-navy px-4 py-12 text-white">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 rounded-2xl border border-teal/30 bg-navy-light p-8 text-center">
            <div className="mb-4 text-5xl">✅</div>
            <h1 className="mb-2 text-2xl font-bold">¡Inscripción Creada!</h1>
            <p className="mb-4 text-gray-400">Tu número de orden es:</p>
            <p className="mb-6 text-3xl font-extrabold text-orange">{order.order_number}</p>
            <p className="text-lg">
              Total a pagar: <span className="font-bold text-teal">{formatColones(total)}</span>
            </p>
          </div>

          {/* SINPE info */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-navy-light p-6">
            <h2 className="mb-4 text-center text-lg font-bold">Realizá el pago por SINPE Móvil</h2>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <div className="rounded-lg border border-white/10 px-5 py-3 text-center">
                <p className="font-bold">8710-7247</p>
                <p className="text-xs text-gray-400">Jonathan Mena</p>
              </div>
              <div className="rounded-lg border border-white/10 px-5 py-3 text-center">
                <p className="font-bold">8533-5311</p>
                <p className="text-xs text-gray-400">Kenneth Mena</p>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400">
              Detalle: <span className="font-bold text-white">&quot;Carrera Abangares&quot;</span>
            </p>
          </div>

          {/* Upload */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-navy-light p-6">
            <h2 className="mb-4 text-center text-lg font-bold">Subí tu comprobante</h2>
            {!uploaded ? (
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:rounded-full file:border-0 file:bg-orange file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange/90"
                />
                <button
                  onClick={handleUpload}
                  disabled={!uploadFile || uploading}
                  className="rounded-full bg-teal px-6 py-3 font-bold text-navy transition hover:bg-teal/90 disabled:opacity-50"
                >
                  {uploading ? "Subiendo..." : "Subir Comprobante"}
                </button>
              </div>
            ) : (
              <p className="text-center text-teal">✅ Comprobante subido correctamente</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="mb-8">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Notificar pago por WhatsApp
            </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={getWhatsAppUrl("87107247")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-6 py-3 text-center font-bold text-white transition hover:bg-green-700"
            >
              📱 WhatsApp Jonathan
            </a>
            <a
              href={getWhatsAppUrl("85335311")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-6 py-3 text-center font-bold text-white transition hover:bg-green-700"
            >
              📱 WhatsApp Kenneth
            </a>
          </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-center text-red-400">
              {error}
            </p>
          )}

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -- REGISTRATION FORM --
  return (
    <div className="min-h-screen bg-navy px-4 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-6 inline-block text-sm text-gray-400 hover:text-white">
          ← Volver
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Inscripción</h1>
        <p className="mb-8 text-gray-400">Abangares Run - 1 Edición 2026</p>

        <form onSubmit={handleSubmit}>
          {participants.map((p, i) => (
            <div
              key={i}
              className="mb-6 rounded-2xl border border-white/10 bg-navy-light p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  Participante {i + 1}
                </h2>
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(i)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Nombre</label>
                  <input
                    type="text"
                    required
                    value={p.nombre}
                    onChange={(e) => updateParticipant(i, "nombre", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Apellidos</label>
                  <input
                    type="text"
                    required
                    value={p.apellidos}
                    onChange={(e) => updateParticipant(i, "apellidos", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Género</label>
                  <select
                    value={p.genero}
                    onChange={(e) => updateParticipant(i, "genero", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    required
                    value={p.fecha_nacimiento}
                    onChange={(e) => updateParticipant(i, "fecha_nacimiento", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Cédula</label>
                  <input
                    type="text"
                    required
                    value={p.cedula}
                    onChange={(e) => updateParticipant(i, "cedula", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">N° Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={p.telefono}
                    onChange={(e) => updateParticipant(i, "telefono", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Talla Camiseta</label>
                  <select
                    value={p.talla_camiseta}
                    onChange={(e) => updateParticipant(i, "talla_camiseta", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  >
                    {TALLAS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Ruta</label>
                  <select
                    value={p.ruta}
                    onChange={(e) => updateParticipant(i, "ruta", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-navy px-4 py-2.5 text-white outline-none focus:border-orange"
                  >
                    {RUTAS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre} - {formatColones(r.precio)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addParticipant}
            className="mb-8 w-full rounded-xl border-2 border-dashed border-white/20 py-3 text-gray-400 transition hover:border-orange hover:text-orange"
          >
            + Agregar otro participante
          </button>

          {/* Total */}
          <div className="mb-6 rounded-2xl border border-orange/30 bg-navy-light p-6">
            <div className="flex items-center justify-between">
              <span className="text-lg">Total a pagar:</span>
              <span className="text-2xl font-bold text-orange">
                {formatColones(total)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {participants.map((p, i) => (
                <p key={i}>
                  {p.nombre || `Participante ${i + 1}`} — {getRutaLabel(p.ruta)} ({formatColones(getPrecioByRuta(p.ruta))})
                </p>
              ))}
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-500/20 px-4 py-2 text-center text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-orange py-4 text-lg font-bold text-white transition hover:bg-orange/90 disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Confirmar Inscripción"}
          </button>
        </form>
      </div>
    </div>
  );
}
