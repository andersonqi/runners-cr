import Link from "next/link";
import Countdown from "./components/Countdown";
import AnimateOnScroll from "./components/AnimateOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero - dark con imagen */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
        <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-cover bg-[center_top_30%] bg-no-repeat" />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,138,59,0.15)_0%,_transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Corre &middot; Cree &middot; Conquista
          </div>

          <h1 className="animate-fade-up delay-100 mb-3 inline-block text-6xl font-black tracking-tight sm:text-8xl lg:text-9xl leading-none">
            <span className="text-white">ABANGARES </span><span className="text-orange italic">RUN</span>
          </h1>

          <p className="animate-fade-up delay-200 mb-10 text-lg text-gray-300 sm:text-xl">
            &#9733; 1 Edición &mdash; 2026
          </p>

          <div className="animate-fade-up delay-300 mb-10 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-3">
            <div className="glass-dark flex flex-col items-center gap-1 rounded-2xl px-3 py-3 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange/10 text-sm sm:h-8 sm:w-8 sm:text-base">📅</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400 sm:text-[10px]">Fecha</p>
                <p className="text-xs font-bold sm:text-sm">Dom 26 Abril</p>
              </div>
            </div>
            <div className="glass-dark flex flex-col items-center gap-1 rounded-2xl px-3 py-3 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal/10 text-sm sm:h-8 sm:w-8 sm:text-base">⏰</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400 sm:text-[10px]">Hora</p>
                <p className="text-xs font-bold sm:text-sm">8:00 AM</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Redondel+Abangares+Guanacaste+Costa+Rica"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark flex cursor-pointer flex-col items-center gap-1 rounded-2xl px-3 py-3 transition-all hover:bg-white/10 sm:flex-row sm:gap-2.5 sm:rounded-full sm:px-5 sm:py-2.5"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple/10 text-sm sm:h-8 sm:w-8 sm:text-base">📍</span>
              <div className="text-center sm:text-left">
                <p className="text-[9px] font-medium uppercase tracking-wider text-gray-400 sm:text-[10px]">Salida</p>
                <p className="text-xs font-bold underline decoration-white/30 underline-offset-2 sm:text-sm">Redondel</p>
              </div>
            </a>
          </div>

          <div className="animate-fade-up delay-400 mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Faltan
            </p>
            <Countdown />
          </div>

          <div className="animate-fade-up delay-500">
            <Link
              href="/inscripcion"
              className="group relative inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-orange to-orange-light px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-orange/20 transition-all hover:shadow-orange/40 hover:scale-[1.02] animate-pulse-glow"
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
      <section id="rutas" className="relative bg-[#0d1926] px-4 py-24 text-white sm:px-6">
        <div className="relative mx-auto max-w-6xl">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-teal">Categorías</p>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Elegí tu Ruta</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 10 KM */}
            <AnimateOnScroll animation="fade-up" delay={0} className="h-full">
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-orange/20 bg-navy-light shadow-lg shadow-orange/5 transition-all duration-300 hover:border-orange/40 hover:shadow-xl hover:shadow-orange/10 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gradient-to-r from-orange to-orange-light px-6 py-6 text-center text-white">
                    <p className="text-5xl font-black">10K</p>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Ruta Larga</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 rounded-xl bg-white/5 p-4">
                      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Premios
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥇</span> 1er Lugar</span>
                          <span className="font-bold text-orange">₡100,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥈</span> 2do Lugar</span>
                          <span className="font-bold text-orange-light">₡50,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥉</span> 3er Lugar</span>
                          <span className="font-bold text-orange-light/80">₡25,000</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                      Masculino y Femenino
                    </p>
                    <div className="rounded-2xl bg-orange/5 py-3 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                      <p className="text-2xl font-black text-gradient-orange">₡15,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* 6 KM */}
            <AnimateOnScroll animation="fade-up" delay={100} className="h-full">
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-teal/20 bg-navy-light shadow-lg shadow-teal/5 transition-all duration-300 hover:border-teal/40 hover:shadow-xl hover:shadow-teal/10 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gradient-to-r from-teal to-teal-light px-6 py-6 text-center text-white">
                    <p className="text-5xl font-black">6K</p>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Ruta Corta</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 rounded-xl bg-white/5 p-4">
                      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        Premios
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥇</span> 1er Lugar</span>
                          <span className="font-bold text-teal">₡50,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥈</span> 2do Lugar</span>
                          <span className="font-bold text-teal-light">₡30,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-300"><span className="text-lg">🥉</span> 3er Lugar</span>
                          <span className="font-bold text-teal-light/80">₡20,000</span>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                      Masculino y Femenino
                    </p>
                    <div className="rounded-2xl bg-teal/5 py-3 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                      <p className="text-2xl font-black text-gradient-teal">₡15,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* 3.5 KM */}
            <AnimateOnScroll animation="fade-up" delay={200} className="h-full">
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-gray-700/30 bg-navy-light shadow-lg shadow-black/10 transition-all duration-300 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative flex h-full flex-col">
                  <div className="bg-gradient-to-r from-gray-500 to-gray-400 px-6 py-6 text-center text-white">
                    <p className="text-5xl font-black">3.5K</p>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Caminata</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-between p-6">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
                        🚶
                      </div>
                      <p className="mb-6 text-center text-sm text-gray-400">
                        Para toda la familia
                      </p>
                    </div>
                    <div className="w-full rounded-2xl bg-white/5 py-3 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                      <p className="text-2xl font-black text-white">₡10,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Kids Run */}
            <AnimateOnScroll animation="fade-up" delay={300} className="h-full">
              <div className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-purple/20 bg-navy-light shadow-lg shadow-purple/5 transition-all duration-300 hover:border-purple/40 hover:shadow-xl hover:shadow-purple/10 hover:-translate-y-1">
                <div className="relative flex h-full flex-col">
                  <div className="bg-gradient-to-r from-purple to-purple-light px-6 py-6 text-center text-white">
                    <p className="text-5xl font-black">KIDS</p>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Run</p>
                  </div>
                  <div className="flex flex-1 flex-col items-center justify-between p-6">
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple/5 text-3xl">
                        🧒
                      </div>
                      <p className="mb-6 text-center text-sm text-gray-400">
                        Los campeones del futuro
                      </p>
                    </div>
                    <div className="w-full rounded-2xl bg-purple/5 py-3 text-center">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">Inscripción</p>
                      <p className="text-2xl font-black text-purple">₡10,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Incluye */}
      <section id="incluye" className="relative bg-[#111c2e] px-4 py-24 text-white sm:px-6">
        <div className="relative mx-auto max-w-4xl">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gold">Tu inscripción</p>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">Incluye</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: "👕", label: "Camisa", desc: "Oficial del evento" },
              { icon: "🏅", label: "Medalla", desc: "Finisher" },
              { icon: "💧", label: "Hidratación", desc: "En ruta y meta" },
              { icon: "🏆", label: "Podium", desc: "Top 3 categoría" },
              { icon: "🎟️", label: "Rifas", desc: "Premios extra" },
            ].map((item, i) => (
              <AnimateOnScroll key={item.label} animation="scale-in" delay={i * 100}>
                <div className="glass-dark group flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                  <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.label}</p>
                    <p className="mt-0.5 text-[11px] text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Inscripciones - con imagen de fondo */}
      <section id="pago" className="relative px-4 py-24 text-white sm:px-6">
        <div className="absolute inset-0 bg-[url('/background_2.jpeg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative mx-auto max-w-3xl">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-orange">Inscripciones</p>
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                ABANGARES <span className="text-gradient-orange italic">RUN</span>
              </h2>
            </div>
          </AnimateOnScroll>

          {/* Organizan */}
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="mb-12">
              <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Organizan</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="glass-dark w-full rounded-2xl px-8 py-5 text-center transition-all hover:bg-white/10 sm:w-auto">
                  <p className="text-lg font-bold">Jonathan Mena</p>
                  <p className="mt-1 text-sm text-gray-400">8710-7247</p>
                </div>
                <div className="glass-dark w-full rounded-2xl px-8 py-5 text-center transition-all hover:bg-white/10 sm:w-auto">
                  <p className="text-lg font-bold">Kenneth Mena</p>
                  <p className="mt-1 text-sm text-gray-400">8533-5311</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Pago SINPE */}
          <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="mb-12">
              <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Pago por SINPE Móvil</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="glass-dark w-full cursor-pointer rounded-2xl px-8 py-6 text-center transition-all hover:bg-white/10 hover:-translate-y-0.5 sm:w-auto">
                  <p className="text-3xl font-black tracking-wide">8710-7247</p>
                  <p className="mt-1 text-sm text-gray-400">Jonathan Mena</p>
                </div>
                <div className="hidden text-2xl text-gray-500 sm:block">ó</div>
                <div className="block text-center text-lg text-gray-500 sm:hidden">ó</div>
                <div className="glass-dark w-full cursor-pointer rounded-2xl px-8 py-6 text-center transition-all hover:bg-white/10 hover:-translate-y-0.5 sm:w-auto">
                  <p className="text-3xl font-black tracking-wide">8533-5311</p>
                  <p className="mt-1 text-sm text-gray-400">Kenneth Mena</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="scale-in" delay={300}>
            <div className="mb-12 text-center">
              <div className="glass-dark mx-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-gray-400">
                <span className="text-base">💬</span>
                Detalle: <span className="font-bold text-white">&quot;Carrera Abangares&quot;</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="zoom-in" delay={400}>
            <div className="text-center">
              <Link
                href="/inscripcion"
                className="group relative inline-flex cursor-pointer items-center gap-3 rounded-full bg-gradient-to-r from-orange to-orange-light px-12 py-5 text-xl font-bold text-white shadow-xl shadow-orange/20 transition-all hover:shadow-2xl hover:shadow-orange/30 hover:scale-[1.02]"
              >
                Formulario de Inscripción
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-navy px-4 py-10">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-4 text-white sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wide">
              ABANGARES <span className="text-gradient-orange italic">RUN</span>
            </span>
          </div>
          <p className="text-xs text-gray-500">
            1 Edición 2026 &middot; Abangares, Guanacaste
          </p>
        </div>
      </footer>
    </div>
  );
}
