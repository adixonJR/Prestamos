import { useState, useEffect, useRef } from "react";
import "../estilos.css/home.css";
import "../index.css";
import fondo from "../assets/fondo.mp4";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // -----------------------------
  // ESTADOS PRINCIPALES
  // -----------------------------
  const [monto, setMonto] = useState(500);
  const [tipo, setTipo] = useState<"cuotas" | "unico">("cuotas");
  const [plazo, setPlazo] = useState<number>(90);
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
    ? monto * 0.10
    : plazo === 30
    ? monto * 0.20
    : 0;

  const custodia = monto * 0.05;
  const tecnologia = tipo === "cuotas" ? monto * 0.08 : monto * 0.06;
  const igv = (interesTotal + tecnologia) * 0.18;
  const total = monto + interesTotal ;

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
    { icon: "👛", value: 100, sub: "Solicitudes" },
    { icon: "🌍", value: 1, sub: "distrito" },
  ];

  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const durations = [90, 1 , 100, 1];

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

{/* IZQUIERDA CON VIDEO DE FONDO */}
<div className="relative w-full md:w-1/2 h-[500px] md:h-full text-pink-600 flex flex-col justify-center items-center p-10 text-center overflow-hidden">

  {/* VIDEO BACKGROUND */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-fulFl h-full object-cover"
  >
    <source src={fondo} type="video/mp4" />
  </video>

  {/* CAPA OSCURA */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* CONTENIDO ENCIMA */}
  <div className="relative z-10" style={{ fontSize: "26px", fontWeight: "800" }}>
    <h1 className="text-2xl text-purple-800 md:text-3xl font-semibold">Préstamos personales</h1>
    <h2 className="text-6xl text-purple-800 md:text-3xl font-extrabold leading-none mt-3">GRANDES DESCUENTOS</h2>
    <p className="text-base mt-3 text-purple-800">
      De descuento en intereses en tu primer préstamo online
    </p>

    <small className="text-xs opacity-90 mt-4 block text-purple-800" >
      *El descuento se perderá si el pago se realiza después del vencimiento.
    </small>
  </div>

</div>

{/* DERECHA (REDUCIDO AL 80%) */}
<div
  ref={rightRef}
  className="md:w-1/2 h-full flex flex-col items-center justify-start p-6 bg-gray-100 overflow-hidden"
>

  {/* Escala general al 80% */}
  <div className="w-full max-w-[90%] scale-[0.80] origin-top">

    {/* Título */}
    <div className="w-full text-center py-2 font-bold text-lg text-[#04BF20]">
      Elige aquí el tipo de préstamo que necesitas
    </div>

    {/* Tabs */}
    <div className="flex w-full max-w-lg gap-2 mt-2">
      <button
        onClick={() => {
          setTipo("cuotas");
          setPlazo(90);
        }}
        className={`flex-1 py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-200 ${
          tipo === "cuotas"
            ? "bg-[#04BF20] text-white"
            : "text-[#04BF20] bg-white border border-[#04BF20]"
        }`}
      >
        Pago a Cuotas
      </button>

      <button
        onClick={() => {
          setTipo("unico");
          setPlazo(15);
        }}
        className={`flex-1 py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-200 ${
          tipo === "unico"
            ? "bg-[#04BF20] text-white"
            : "text-[#04BF20] bg-white border border-[#04BF20]"
        }`}
      >
        Pago Único
      </button>
    </div>

    {/* Monto */}
    <div className="w-full max-w-lg mt-6 bg-white p-4 rounded-lg shadow">
      <p className="font-semibold text-sm">¿Cuánto necesitas?</p>

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
          className="flex-1 accent-[#04BF20] h-2"
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

    {/* Plazo */}
    <div className="w-full max-w-lg mt-5 bg-white p-4 rounded-lg shadow">
      <p className="font-semibold text-sm">Plazo</p>

      {tipo === "cuotas" ? (
        <div className="text-center w-full py-3 rounded-lg font-bold text-[#04BF20] border border-[#04BF20] text-base mt-3">
          3 cuotas (90 días)
        </div>
      ) : (
        <div className="flex gap-2 mt-3">
          {[15, 30].map((d) => (
            <button
              key={d}
              onClick={() => setPlazo(d)}
              className={`flex-1 py-2 rounded-lg text-base font-bold ${
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
    <div className="w-full max-w-lg mt-5 p-3 bg-white shadow rounded-lg text-sm">
      <div className="grid grid-cols-2 gap-1">
        <p>Cantidad Solicitada</p>
        <p className="text-right">S/ {monto.toFixed(2)}</p>
        
        

        <p>Interés Total</p>
        <p className="text-right">S/ {interesTotal.toFixed(2)}</p>
        
        

        <p className="font-bold mt-1">Total a Pagar</p>
        <p className="font-bold text-right mt-1">S/ {total.toFixed(2)}</p>

        <p className="font-semibold">Fecha de Pago</p>
        <p className="text-right font-semibold">{fecha}</p>
      </div>
    </div>

    <button
  type="button"
  onClick={() =>
    navigate("/tramite", {
      state: {
        tipo,
        monto,
        plazo,
        interesTotal,
        total,
        fecha,
      },
    })
  }
  className="mt-6 bg-[#04BF20] text-white w-full max-w-lg py-3 text-lg font-bold rounded-full shadow"
>
  Solicítalo Ahora
</button>

  </div>
</div>


</div>

{/* Beneficios */}
<section className="w-full py-20 px-6 text-center bg-white">
  <h2 className="text-[#04BF20] text-3xl md:text-4xl font-extrabold mb-14">
    Préstamos online
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">

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
          hover:-translate-y-3 hover:shadow-2xl hover:scale-[1.05] 
          animate-cardEnter
        "
        style={{ animationDelay: `${index * 0.15}s` }}
      >
        {/* Glow suave */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none 
          bg-gradient-to-r from-pink-200/40 to-purple-200/40 blur-xl">
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
    rounded-bl-[120px] rounded-br-[120px] shadow-lg animate-fadeSlideUp">
      
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


{/* ===========================
      SECCIÓN: REQUISITOS
=========================== */}
<section
  id="requisitos"
  className="py-20 px-6 text-center bg-white overflow-hidden"
>
  <h2 className="text-3xl md:text-4xl font-bold text-[#04BF20] mb-12 opacity-0 animate-fadeUp">
    ¿Qué requisitos debes cumplir?
  </h2>

  <div className="flex flex-col md:flex-row gap-16 items-center justify-center max-w-6xl mx-auto">

    {/* Imagen */}
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
      className="flex flex-col items-center gap-8 opacity-0 animate-fadeUp"
      style={{ animationDelay: "0.6s" }}
    >
      {/* Botones */}
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

      {/* Texto dinámico */}
      <p
        key={requisitoActivo}
        className="text-gray-800 font-semibold text-xl mt-3 px-6 animate-fade max-w-lg"
      >
        {requisitos[requisitoActivo]}
      </p>

      {/* Emoji */}
      {requisitoActivo === 3 && (
        <span className="text-6xl text-[#4b2bbf] mt-2 animate-pop"></span>
      )}
    </div>

  </div>
</section>

{/*
{/* ===========================
    SECCIÓN: COLABORADORES
=========================== 
<section className="py-20 text-center bg-gray-50">
  <div className="max-w-4xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-[#04BF20] mb-12">
      Nuestros colaboradores
    </h2>

    <div 
      className="relative overflow-hidden mx-auto rounded-xl shadow-md bg-white 
                 flex items-center justify-center"
      style={{ height: 150, width: "85%" }}
    >
      <LogoLoop
        logos={techLogos}
        speed={90}
        direction="left"
        logoHeight={70}
        gap={50}
        hoverSpeed={5}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Aliados estratégicos"
      />
    </div>

  </div>
</section>
*/}

{/* ===========================
    SECCIÓN: EJEMPLO PRÉSTAMO
=========================== */}
<section className="py-20 px-4 bg-white">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-16">

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
        ¿Cómo funcionan los préstamos?
      </h3>

      

      <p className="text-lg font-bold text-gray-800">
        300 soles a pagar en 90 días
      </p>

      <ul className="space-y-1 text-gray-700 font-medium">
        <li>Tarifa de Tecnología: <span className="font-bold">S/. 60.00</span></li>
       
        <li>Interés: <span className="font-bold">S/. 43.98</span></li>
       
      </ul>

      <p className="text-xl font-bold text-[#1f1a50]">
        Total a pagar: <span className="text-pink-600">S/. 467.55</span>
      </p>

      
  <button
  type="button"
  onClick={() =>
    navigate("/tramite", {
      state: {
        tipo,
        monto,
        plazo,
        interesTotal,
        total,
        fecha,
      },
    })
  }
  className="mt-6 bg-[#04BF20] text-white w-full max-w-lg py-3 text-lg font-bold rounded-full shadow"
>
  Solicítalo Ahora
</button>

    </div>
  </div>

  <p className="text-xs text-gray-500 mt-8 text-center max-w-2xl mx-auto">
    Los montos y costos son referenciales y pueden variar según evaluación crediticia del cliente.
  </p>
</section>


{/* ===========================
    SECCIÓN: TESTIMONIOS
=========================== */}
<section className="w-full py-24 bg-gray-50">
  <div className="text-center mb-16 px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-green-600">Testimonios</h2>
    <p className="text-gray-700 text-lg mt-2 font-medium">Nuestros clientes opinan</p>
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
    
    {/* Card 1 */}
    <div className="bg-white border border-purple-600 p-6 rounded-2xl shadow-lg hover:shadow-purple-300 transition-transform duration-300 hover:scale-105 cursor-pointer group">
      <div className="text-green-600 text-xl mb-3 group-hover:scale-110 transition-transform duration-200">
        ★★★★★
      </div>
      <p className="text-gray-700 mb-4">Excelente atención y rapidez.</p>
      <h4 className="text-gray-900 font-bold">José Morante</h4>
    </div>
    
    {/* Card 2 */}
    <div className="bg-white border border-purple-600 p-8 rounded-3xl shadow-xl hover:shadow-purple-300 transition-transform duration-300 hover:scale-110 cursor-pointer group transform lg:-translate-y-3">
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

