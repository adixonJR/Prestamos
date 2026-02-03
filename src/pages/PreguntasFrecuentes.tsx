import  { useState } from "react";
import "../estilos.css/FaqSection.css";

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

const FaqSection: React.FC = () => {
  const preguntas1: FaqItem[] = [
    {
      pregunta: "¿Quiénes somos?",
      respuesta: "Somos una empresa dedicada a ofrecer préstamos online de forma rápida y segura.",
    },
    {
      pregunta: "¿Qué es un préstamo online?",
      respuesta: "Es un préstamo 100% digital que puedes solicitar desde tu casa sin trámites complicados.",
    },
    {
      pregunta: "¿Por qué pedir un préstamo online?",
      respuesta: "Porque es rápido, seguro, con requisitos simples y desembolso inmediato.",
    },
  ];

  const preguntas2: FaqItem[] = [
    {
      pregunta: "¿Cómo puedo solicitar un préstamo online?",
      respuesta: "Solo necesitas registrarte, validar tus datos y elegir el monto que deseas.",
    },
    {
      pregunta: "¿Pide aval, seguros u otras garantías adicionales?",
      respuesta: "No pedimos aval ni garantías adicionales. Todo el proceso es digital.",
    },
    {
      pregunta: "¿Qué requisitos necesito para inscribirme?",
      respuesta: "Ser mayor de edad, contar con DNI y tener una cuenta bancaria activa.",
    },
  ];

  const productos1: FaqItem[] = [
    {
      pregunta: "¿Cuál es la diferencia entre préstamo a pago único y préstamo de pago en cuotas?",
      respuesta: "El pago único se paga en una sola fecha. El préstamo en cuotas se paga en partes.",
    },
    {
      pregunta: "¿En cuánto tiempo  desembolsa el préstamo?",
      respuesta: "Aproximadamente en 5 a 10 minutos después de la aprobación.",
    },
    {
      pregunta: "¿Cuál es la tasa de interés que ofrece?",
      respuesta: "Depende del monto solicitado y tu calificación crediticia.",
    },
  ];

  const productos2: FaqItem[] = [
    {
      pregunta: "¿Puedo pedir un préstamo a cuotas si tengo un préstamo a pago único activo?",
      respuesta: "No, primero debes pagar el préstamo activo.",
    },
    {
      pregunta: "¿Cuántos préstamos online  puedo solicitar?",
      respuesta: "Puedes tener solo un préstamo activo a la vez.",
    },
    {
      pregunta: "¿Qué pasa si no puedo pagar en la fecha pactada?",
      respuesta: "Puedes solicitar una extensión o pago parcial dependiendo de tu caso.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  // reutilizar renderizado de columnas
  const renderColumn = (lista: FaqItem[], prefix: string) =>
    lista.map((item, i) => {
      const key = `${prefix}-${i}`;
      const isOpen = openIndex === key;
      return (
        <div className="faq-item" key={key}>
          <div className="faq-box" onClick={() => toggle(key)}>
            {item.pregunta}
            <span className="icon">{isOpen ? "−" : "+"}</span>
          </div>

          <div className={`faq-answer ${isOpen ? "open" : ""}`}>
            <p>{item.respuesta}</p>
          </div>
        </div>
      );
    });

  return (
    <div className="faq-wrapper">

      {/* Encabezado */}
      <div className="faq-header">
        <h1>Preguntas frecuentes</h1>
      </div>

      {/* Sección 1 */}
      <div className="faq-grid">
        <div className="column">{renderColumn(preguntas1, "p1")}</div>
        <div className="column">{renderColumn(preguntas2, "p2")}</div>
      </div>

      <h2 className="productos-title">Productos y servicios</h2>

      {/* Sección 2 */}
      <div className="faq-grid">
        <div className="column">{renderColumn(productos1, "p3")}</div>
        <div className="column">{renderColumn(productos2, "p4")}</div>
      </div>
    </div>
  );
};

export default FaqSection;
