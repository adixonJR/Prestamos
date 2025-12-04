import { useState, useEffect, useRef } from "react";
import "../estilos.css/home.css";
import "../index.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import foto from "../assets/OIP.webp";
import chicadinero from "../assets/descarga.webp";
import yape from "../assets/yape.jpg";
import equifax from "../assets/equifax.png";
import bcp from "../assets/bcp.png";
import experian from "../assets/experian.jpg";
import LogoLoop from "../components/logoloop";

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // -----------------------------
  // ESTADOS PRINCIPALES
  // -----------------------------
  const [monto, setMonto] = useState(500);
  const [tipo, setTipo] = useState<"cuotas" | "unico">("cuotas");
  const [plazo, setPlazo] = useState<15 | 30 | 90>(90);
  const [requisitoActivo, setRequisitoActivo] = useState(0);

  const handleMonto = (val: number) => {
    if (val >= 200 && val <= 5000) setMonto(val);
  };

  // -----------------------------
  // FECHA
  // -----------------------------
  const getFecha = (dias: number) => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + dias);

    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const año = hoy.getFullYear();

    return `${dia}/${mes}/${año}`;
  };

  const fecha = getFecha(plazo);

  // -----------------------------
  // CÁLCULOS DEL PRÉSTAMO
  // -----------------------------
  const interesTotal =
    tipo === "cuotas"
      ? monto * 0.18
      : plazo === 15
      ? monto * 0.12
      : monto * 0.18;

  const custodia = monto * 0.05;
  const tecnologia = tipo === "cuotas" ? monto * 0.08 : monto * 0.06;
  const igv = (interesTotal + tecnologia) * 0.18;
  const total = monto + interesTotal + custodia + tecnologia + igv;

  const requisitos = [
    "Documento DNI vigente",
    "Ser mayor de 18 años",
    "Contar con ingresos demostrables",
    "Tener una cuenta bancaria activa",
  ];
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ];
  
  // Alternative with image sources
  const imageLogos = [
    { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
    { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
  ];
  // -----------------------------
  // ESTADÍSTICAS — CONTADORES
  // -----------------------------
  const stats = [
    { icon: "📅", value: 90, sub: "Plazo de pago" },
    { icon: "🏅", value: 1, sub: "Fintech préstamos" },
    { icon: "👛", value: 800000, sub: "Solicitudes" },
    { icon: "🌍", value: 8, sub: "Países" },
  ];

  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const durations = [90, 1, 800000, 8];

    durations.forEach((max, index) => {
      let start = 0;
      const speed = max > 1000 ? 200 : 50;

      const interval = setInterval(() => {
        start += Math.ceil(max / speed);
        if (start >= max) {
          start = max;
          clearInterval(interval);
        }
        setCounters((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
      }, 20);
    });
  }, []);

  // -----------------------------
  // REFS PARA ANIMACIONES GSAP
  // -----------------------------
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contenedor izquierdo
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
      });

      // Contenedor derecho
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 60,
        duration: 1.1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Beneficios
      gsap.from(".beneficio-card", {
        scrollTrigger: {
          trigger: ".beneficios-container",
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
      });

      // Estadísticas
      gsap.from(".stats-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 85%",
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-screen">

        {/* IZQUIERDA */}
        <div
          ref={containerRef}
          className="w-full md:w-1/2 h-full text-white flex flex-col justify-center p-10 text-center"
          style={{
            background: "linear-gradient(to right, #e91e63, #7c2ae8)",
            fontSize: "28px",
            fontWeight: "800",
            paddingTop: "40px",
            paddingBottom: "40px",
          }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold">Préstamos personales</h1>
          <h2 className="text-7xl md:text-9xl font-extrabold leading-none mt-3">50%</h2>
          <p className="text-lg mt-3">De descuento en intereses en tu primer préstamo online</p>

          <small className="text-sm opacity-90 mt-5">
            *El descuento se perderá si el pago se realiza después del vencimiento.
          </small>
        </div>

        {/* DERECHA */}
        <div
          ref={rightRef}
          className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-6 bg-gray-100 overflow-auto"
        >


  {/* Título */}
  <div className="w-full text-center py-4 font-bold text-lg text-[#04BF20]">
    ⬇️ Elige aquí el tipo de préstamo que necesitas ⬇️
  </div>

  {/* Tabs */}
  <div className="flex w-full max-w-xl rounded-lg overflow-hidden border border-[#04BF20]">
    <button
      onClick={() => {
        setTipo("cuotas");
        setPlazo(90);
      }}
      className={`w-1/2 py-3 font-semibold ${
        tipo === "cuotas"
          ? "bg-[#04BF20] text-white"
          : "text-[#04BF20] bg-white"
      }`}
    >
      Pago a Cuotas
    </button>

    <button
      onClick={() => {
        setTipo("unico");
        setPlazo(15);
      }}
      className={`w-1/2 py-3 font-semibold ${
        tipo === "unico"
          ? "bg-[#04BF20] text-white"
          : "text-[#04BF20] bg-white"
      }`}
    >
      Pago Único
    </button>
  </div>

  {/* Monto */}
  <div className="w-full max-w-xl mt-6 px-2">
    <p className="font-semibold text-base">¿Cuánto necesitas?</p>

    <div className="flex gap-3 mt-3 items-center">
      <button
        onClick={() => handleMonto(monto - 50)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#04BF20] text-white text-xl"
      >
        −
      </button>

      <input
        type="range"
        min={200}
        max={5000}
        step={50}
        value={monto}
        onChange={(e) => handleMonto(Number(e.target.value))}
        className="flex-1 accent-[#04BF20]"
      />

      <button
        onClick={() => handleMonto(monto + 50)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#04BF20] text-white text-xl"
      >
        +
      </button>
    </div>

    <p className="mt-2 font-bold text-[#04BF20] text-xl text-end">
      S/ {monto.toFixed(2)}
    </p>
  </div>

  <div className="w-full max-w-xl mt-6 px-2">
  <p className="font-semibold">Plazo</p>

  {tipo === "cuotas" ? (
    <div className="text-center w-full py-3 rounded-lg font-bold text-[#04BF20] border border-[#04BF20] text-lg mt-2">
      3 cuotas (90 días)
    </div>
  ) : (
    <div className="flex gap-3 mt-2">
      {([15, 30] as const).map((d) => (
        <button
          key={d}
          onClick={() => setPlazo(d)}
          className={`flex-1 py-3 rounded-lg text-lg font-bold ${
            plazo === d
              ? "bg-[#04BF20] text-white"
              : "border border-[#04BF20] text-[#04BF20]"
          }`}
        >
          {d} días
        </button>
      ))}
    </div>
  )}
</div>


  {/* Detalle de Costos */}
  <div className="w-full max-w-xl mt-6 p-4 bg-white shadow rounded-lg">
    <div className="grid grid-cols-2 gap-2 text-sm">
      <p>Cantidad Solicitada</p><p className="text-right">S/ {monto.toFixed(2)}</p>
      <p>Custodia</p><p className="text-right">S/ {custodia.toFixed(2)}</p>
      <p>Tecnología</p><p className="text-right">S/ {tecnologia.toFixed(2)}</p>
      <p>Interés Total</p><p className="text-right">S/ {interesTotal.toFixed(2)}</p>
      <p>IGV</p><p className="text-right">S/ {igv.toFixed(2)}</p>

      <p className="font-bold mt-2">Total a Pagar</p>
      <p className="font-bold text-right mt-2">S/ {total.toFixed(2)}</p>

      <p className="font-semibold">Fecha de Pago</p>
      <p className="text-right font-semibold">{fecha}</p>
    </div>
  </div>

  {/* Botón */}
  <button className="mt-8 bg-[#04BF20] text-white w-full max-w-xl py-4 text-lg font-bold rounded-full shadow">
    Solicítalo Ahora
  </button>

</div>
</div>



    {/* Beneficios */}
<section className="w-full py-20 px-6 text-center bg-white">
  <h2 className="text-green-600 text-3xl md:text-4xl font-extrabold mb-14">
    Préstamos online
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

    {/* CARD */}
    {[ 
      { icon: "%", title: "Descuento en intereses", text: "Primer préstamo con 50% de descuento en intereses. ¡Aprovéchalo!" },
      { icon: "⚡", title: "Préstamos en menos de 24h", text: "100% digital. Sin colas. Sin papeleo." },
      { icon: "⭐", title: "¿Por qué elegirnos?", text: "Préstamos rápidos, simples y hechos para ti." },
      { icon: "⏱", title: "Respuesta inmediata", text: "Aprobamos en segundos. Tu tiempo vale." },
    ].map((item, index) => (
      
      <div
        key={index}
        className="
          relative group bg-white rounded-2xl p-7 border border-pink-400 shadow-lg 
          transition-all duration-500 
          hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.03] 
          opacity-0 animate-fadeSlideUp
        "
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {/* Brillo lateral */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none 
          bg-gradient-to-r from-pink-200/30 to-purple-200/30 blur-xl">
        </div>

        <span className="text-5xl font-extrabold text-pink-600 block">
          {item.icon}
        </span>

        <h3 className="text-purple-800 font-bold text-xl mt-3">
          {item.title}
        </h3>

        <p className="text-gray-700 text-sm mt-3 leading-relaxed">
          {item.text}
        </p>
      </div>

    ))}

  </div>
</section>


<section className="bg-[#4b2bbf] py-14 flex justify-around items-center text-white 
                        rounded-b-[60%/18%] shadow-lg animate-fadeSlideUp">
      
      {stats.map((item, i) => (
        <div key={i} className="text-center transition-all duration-500 hover:scale-110">
          <span className="text-5xl block mb-2">{item.icon}</span>
          
          {/* CONTADOR ANIMADO */}
          <p className="font-extrabold text-2xl tracking-wide">
            {i === 2 ? counters[i].toLocaleString() : counters[i]}
          </p>

          <small className="text-sm opacity-90">{item.sub}</small>
        </div>
      ))}
    </section>


   {/* Requisitos */}
<section
  className="py-16 px-6 text-center bg-white overflow-hidden"
  id="requisitos"
>
  <h2
    className="text-3xl md:text-4xl font-bold text-[#04BF20] mb-12 opacity-0 animate-fadeUp"
  >
    ¿Qué requisitos debes cumplir?
  </h2>

  <div className="flex flex-col md:flex-row gap-12 items-center justify-center">

    {/* Imagen con animación */}
    <div
      className="md:w-1/2 opacity-0 animate-slideLeft"
      style={{ animationDelay: "0.3s" }}
    >
      <img
        src={foto}
        alt="Requisitos préstamo"
        className="rounded-2xl shadow-xl object-cover w-full max-w-lg mx-auto hover:scale-[1.02] transition-all duration-300"
      />
    </div>

    {/* Lista y botones */}
    <div
      className="flex flex-col items-center gap-6 opacity-0 animate-fadeUp"
      style={{ animationDelay: "0.6s" }}
    >

      {/* Botones con animación al seleccionar */}
      <div className="flex gap-6 flex-wrap justify-center">
        {requisitos.map((_, index) => (
          <button
            key={index}
            onClick={() => setRequisitoActivo(index)}
            className={`
              w-16 h-16 rounded-full flex justify-center items-center font-bold text-xl
              transition-all duration-300 shadow-md hover:scale-110
              ${
                requisitoActivo === index
                  ? "bg-[#4b2bbf] text-white scale-125 shadow-xl animate-bounceSlow"
                  : "bg-white text-[#04BF20] border-2 border-[#04BF20]"
              }
            `}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Texto dinámico con fade */}
      <p
        key={requisitoActivo}
        className="text-gray-800 font-semibold text-xl mt-3 px-4 animate-fade"
      >
        {requisitos[requisitoActivo]}
      </p>

      {/* Emoji extra */}
      {requisitoActivo === 3 && (
        <span className="text-6xl text-[#4b2bbf] mt-2 animate-pop">🏦</span>
      )}
    </div>

  </div>
</section>

<section className="py-12 text-center">
  <h2 className="text-3xl md:text-4xl font-bold text-[#04BF20] mb-10">
    Nuestros colaboradores
  </h2>

  <div className="relative w-full overflow-hidden mt-8" style={{ height: 180 }}>
    <LogoLoop
      logos={techLogos}
      speed={90}
      direction="left"
      logoHeight={80}
      gap={60}
      hoverSpeed={5}
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel="Aliados estratégicos"
    />
  </div>
</section>



      {/* Ejemplo de préstamo */}
<section className="text-center py-14 px-4">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12">

    {/* Imagen */}
    <div className="flex justify-center flex-1">
      <img
        src={chicadinero}
        alt="Chica con dinero"
        className="w-60 md:w-72 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </div>

    {/* Texto */}
    <div className="flex-1 text-left max-w-md space-y-3">
      <h3 className="text-2xl font-bold text-[#04BF20]">
        ¿Cómo funcionan los préstamos Merite?
      </h3>

      <p className="underline font-semibold text-[#6e4cac]">
        Ejemplo préstamo online
      </p>

      <p className="text-lg font-bold text-gray-800">
        300 soles a pagar en 90 días
      </p>

      <ul className="space-y-1 text-gray-700 font-medium">
        <li>Tarifa de Tecnología: <span className="font-bold">S/. 60.00</span></li>
        <li>Custodia: <span className="font-bold">S/. 38.01</span></li>
        <li>Interés: <span className="font-bold">S/. 43.98</span></li>
        <li>IGV: <span className="font-bold">S/. 25.56</span></li>
      </ul>

      <p className="text-xl font-bold text-[#1f1a50]">
        Total a pagar: <span className="text-pink-600">S/. 467.55</span>
      </p>

      {/* CTA */}
      <button className="mt-4 bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 hover:scale-105 transition-all duration-300">
        Solicitar mi préstamo ahora
      </button>
    </div>
  </div>

  {/* Disclaimer */}
  <p className="text-xs text-gray-500 mt-6 px-6 max-w-2xl mx-auto">
    Los montos y costos son referenciales y pueden variar según evaluación crediticia del cliente.
  </p>
</section>


      {/* Testimonios */}
<section className="w-full py-20 bg-gray-50">
  <div className="text-center mb-12 px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-green-600">Testimonios</h2>
    <p className="text-gray-700 text-lg mt-2 font-medium">Nuestros clientes opinan</p>
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
    
    {/* Card 1 */}
    <div className="bg-white border border-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-purple-300 transition-transform duration-300 hover:scale-105 cursor-pointer group">
      <div className="text-green-600 text-xl mb-3 group-hover:scale-110 transition-transform duration-200">
        ★★★★★
      </div>
      <p className="text-gray-700 mb-4">Excelente atención y rapidez.</p>
      <h4 className="text-gray-900 font-bold">José Morante</h4>
    </div>
    
    {/* Card 2 */}
<div className="bg-white border border-purple-600 p-8 rounded-3xl shadow-xl 
     hover:shadow-purple-300 transition-transform duration-300 hover:scale-110 
     cursor-pointer group transform lg:-translate-y-3">
  <div className="text-green-600 text-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
    ★★★★★
  </div>
  <p className="text-gray-700 mb-4 text-lg">Desembolso rápido y seguro.</p>
  <h4 className="text-gray-900 font-bold text-xl">Renzo Huamanyauri</h4>
</div>


    {/* Card 3 */}
    <div className="bg-white border border-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-purple-300 transition-transform duration-300 hover:scale-105 cursor-pointer group">
      <div className="text-green-600 text-xl mb-3 group-hover:scale-110 transition-transform duration-200">
        ★★★★☆
      </div>
      <p className="text-gray-700 mb-4">Muy conformes con el servicio.</p>
      <h4 className="text-gray-900 font-bold">Archivos Digitales</h4>
    </div>

  </div>
</section>

{/* Banner Final */}
<div className="w-full text-center bg-green-600 text-white font-semibold text-lg md:text-xl py-4 mt-10 animate-bounce">
  Solicita hasta 1000 soles sin fotos ni documentos desde tu celular
</div>

  </>
  );
}

export default App;
function dayjs() {
  throw new Error("Function not implemented.");
}

