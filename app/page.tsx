import Link from "next/link";
import Countdown from "./components/Countdown";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,138,59,0.12)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(75,197,193,0.08)_0%,_transparent_50%)]" />
        <div className="absolute top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Badge */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Corre &middot; Cree &middot; Conquista
          </div>

          {/* Title - inline, RUN italic orange */}
          <h1 className="animate-fade-up delay-100 mb-3 inline-block text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl leading-none">
            <span className="text-white">ABANGARES </span><span className="text-orange italic">RUN</span>
          </h1>

          <p className="animate-fade-up delay-200 mb-10 text-lg text-gray-400 sm:text-xl">
            &#9733; 1 Edición &mdash; 2026
          </p>

          {/* Event details pills */}
          <div className="animate-fade-up delay-300 mb-10 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-3">
            <div className="glass flex flex-col items-center gap-1 rounded-2xl px-3 py-3 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange/10 text-sm sm:h-8 sm:w-8 sm:text-base">📅</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-500 sm:text-[10px]">Fecha</p>
                <p className="text-xs font-bold sm:text-sm">Dom 26 Abril</p>
              </div>
            </div>
            <div className="glass flex flex-col items-center gap-1 rounded-2xl px-3 py-3 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/10 text-sm sm:h-8 sm:w-8 sm:text-base">⏰</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-500 sm:text-[10px]">Hora</p>
                <p className="text-xs font-bold sm:text-sm">8:00 AM</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Redondel+Abangares+Guanacaste+Costa+Rica"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex cursor-pointer flex-col items-center gap-1 rounded-2xl px-3 py-3 transition-all hover:bg-white/[0.06] sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple/10 text-sm sm:h-8 sm:w-8 sm:text-base">📍</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-500 sm:text-[10px]">Salida</p>
                <p className="text-xs font-bold underline decoration-white/30 underline-offset-2 sm:text-sm">Redondel</p>
              </div>
            </a>
          </div>

          {/* Countdown */}
          <div className="animate-fade-up delay-400 mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Faltan
            </p>
            <Countdown />
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-500">
            <Link
              href="/inscripcion"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-orange to-orange-light px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-orange/20 transition-all hover:shadow-orange/40 hover:scale-[1.02]"
            >
              ¡Inscríbete Ahora!
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

      </section>

      {/* Rutas */}
      <section id="rutas" className="relative px-4 py-24 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(75,197,193,0.06)_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-teal">Categorías</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Elegí tu Ruta</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 10 KM */}
            <div className="group relative cursor-pointer overflow-hidden rounded-3xl border border-orange/20 bg-navy-light transition-all duration-300 hover:border-orange/40 hover:shadow-2xl hover:shadow-orange/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-orange/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="bg-gradient-to-r from-orange to-orange-light px-6 py-6 text-center">
                  <p className="text-5xl font-black">10K</p>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Ruta Larga</p>
                </div>
                <div className="p-6">
                  <div className="mb-4 rounded-xl bg-white/[0.03] p-4">
                    <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Premios
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥇</span> 1er Lugar</span>
                        <span className="font-bold text-orange">₡100,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥈</span> 2do Lugar</span>
                        <span className="font-bold text-orange-light">₡50,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥉</span> 3er Lugar</span>
                        <span className="font-bold text-orange-light/70">₡25,000</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Masculino y Femenino
                  </p>
                  <div className="rounded-2xl bg-gradient-to-r from-orange/10 to-orange/5 py-3 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                    <p className="text-2xl font-black text-gradient-orange">₡15,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6 KM */}
            <div className="group relative cursor-pointer overflow-hidden rounded-3xl border border-teal/20 bg-navy-light transition-all duration-300 hover:border-teal/40 hover:shadow-2xl hover:shadow-teal/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-teal/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="bg-gradient-to-r from-teal to-teal-light px-6 py-6 text-center">
                  <p className="text-5xl font-black text-navy">6K</p>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-navy/70">Ruta Corta</p>
                </div>
                <div className="p-6">
                  <div className="mb-4 rounded-xl bg-white/[0.03] p-4">
                    <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      Premios
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥇</span> 1er Lugar</span>
                        <span className="font-bold text-teal">₡50,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥈</span> 2do Lugar</span>
                        <span className="font-bold text-teal-light">₡30,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm"><span className="text-lg">🥉</span> 3er Lugar</span>
                        <span className="font-bold text-teal-light/70">₡20,000</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Masculino y Femenino
                  </p>
                  <div className="rounded-2xl bg-gradient-to-r from-teal/10 to-teal/5 py-3 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                    <p className="text-2xl font-black text-gradient-teal">₡15,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.5 KM */}
            <div className="group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-700/50 bg-navy-light transition-all duration-300 hover:border-gray-600 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="bg-gradient-to-r from-gray-600 to-gray-500 px-6 py-6 text-center">
                  <p className="text-5xl font-black">3.5K</p>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Caminata</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
                    🚶
                  </div>
                  <p className="mb-6 text-center text-sm text-gray-400">
                    Para toda la familia
                  </p>
                  <div className="w-full rounded-2xl bg-white/[0.03] py-3 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                    <p className="text-2xl font-black">₡10,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kids Run */}
            <div className="group relative cursor-pointer overflow-hidden rounded-3xl border border-purple/20 bg-navy-light transition-all duration-300 hover:border-purple/40 hover:shadow-2xl hover:shadow-purple/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-purple/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="bg-gradient-to-r from-purple to-purple-light px-6 py-6 text-center">
                  <p className="text-5xl font-black">KIDS</p>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Run</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple/10 text-3xl">
                    🧒
                  </div>
                  <p className="mb-6 text-center text-sm text-gray-400">
                    Los campeones del futuro
                  </p>
                  <div className="w-full rounded-2xl bg-purple/5 py-3 text-center">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                    <p className="text-2xl font-black text-purple-light">₡10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incluye */}
      <section id="incluye" className="relative px-4 py-24 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/30 to-navy" />
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">Tu inscripción</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Incluye</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: "👕", label: "Camisa", desc: "Oficial del evento" },
              { icon: "🏅", label: "Medalla", desc: "Finisher" },
              { icon: "💧", label: "Hidratación", desc: "En ruta y meta" },
              { icon: "🏆", label: "Podium", desc: "Top 3 categoría" },
              { icon: "🎟️", label: "Rifas", desc: "Premios extra" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass group flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inscripciones */}
      <section id="pago" className="relative px-4 py-24 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,138,59,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-orange">Inscripciones</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              ABANGARES <span className="text-gradient-orange italic">RUN</span>
            </h2>
          </div>

          {/* Organizan */}
          <div className="mb-12">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Organizan</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="glass w-full rounded-2xl px-8 py-5 text-center transition-all hover:bg-white/[0.06] sm:w-auto">
                <p className="text-lg font-bold">Jonathan Mena</p>
                <p className="mt-1 text-sm text-gray-400">8710-7247</p>
              </div>
              <div className="glass w-full rounded-2xl px-8 py-5 text-center transition-all hover:bg-white/[0.06] sm:w-auto">
                <p className="text-lg font-bold">Kenneth Mena</p>
                <p className="mt-1 text-sm text-gray-400">8533-5311</p>
              </div>
            </div>
          </div>

          {/* Pago SINPE */}
          <div className="mb-12">
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Pago por SINPE Móvil</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="glass group w-full cursor-pointer rounded-2xl px-8 py-6 text-center transition-all hover:border-orange/30 hover:-translate-y-0.5 sm:w-auto">
                <p className="text-3xl font-black tracking-wide">8710-7247</p>
                <p className="mt-1 text-sm text-gray-400">Jonathan Mena</p>
              </div>
              <div className="hidden text-2xl text-gray-600 sm:block">ó</div>
              <div className="block text-center text-lg text-gray-600 sm:hidden">ó</div>
              <div className="glass group w-full cursor-pointer rounded-2xl px-8 py-6 text-center transition-all hover:border-teal/30 hover:-translate-y-0.5 sm:w-auto">
                <p className="text-3xl font-black tracking-wide">8533-5311</p>
                <p className="mt-1 text-sm text-gray-400">Kenneth Mena</p>
              </div>
            </div>
          </div>

          <div className="mb-12 text-center">
            <div className="glass mx-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-gray-400">
              <span className="text-base">💬</span>
              Detalle: <span className="font-bold text-white">&quot;Carrera Abangares&quot;</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/inscripcion"
              className="group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-orange to-orange-light px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-orange/20 transition-all hover:shadow-orange/40 hover:scale-[1.02]"
            >
              Formulario de Inscripción
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-10">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wide">
              ABANGARES <span className="text-gradient-orange italic">RUN</span>
            </span>
          </div>
          <p className="text-xs text-gray-600">
            1 Edición 2026 &middot; Abangares, Guanacaste
          </p>
        </div>
      </footer>
    </div>
  );
}
