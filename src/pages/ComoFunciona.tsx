import { useState } from "react";
import "../estilos.css/ComoFunciona.css";

interface NumberPinProps {
  number: string;
  positionClass: string;
  color: string;
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  color: string;
}

const NumberPin: React.FC<NumberPinProps> = ({ number, positionClass }) => (
  <div className={`number-pin ${positionClass}`}>
    {number}
  </div>
);

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => (
  <div className="step-card fade-slide">
    <div className="step-icon">
      <span>{number}</span>
    </div>

    <div className="step-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const HowItWorksSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Regístrate",
      description:
        "Crea tu cuenta de manera rápida y segura para acceder a nuestros servicios.",
    },
    {
      number: "02",
      title: "Usa la Calculadora",
      description:
        "Simula tu préstamo eligiendo cuánto y cuándo pagar. Tu primer préstamo de pago único tiene 30% de descuento en intereses.",
    },
    {
      number: "03",
      title: "Solicita tu préstamo",
      description:
        "Envía tu solicitud de forma sencilla y espera la validación de tus datos.",
    },
    {
      number: "04",
      title: "Recibe el dinero",
      description:
        "Si es aprobado, el dinero llegará directamente a tu cuenta bancaria.",
    },
  ];

  const placeholderImageUrl =
    "data:image/jpeg;base64,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";

  return (
    <div className="how-section">

      <header className="how-header">
        <h1>¿Cómo funciona?</h1>
      </header>

      <div className="how-container">
        <h2 className="how-subtitle">Pasos a seguir</h2>

        <div className="how-grid">

          {/* CÍRCULO */}
          <div className="circle-container">
            <div className="circle-border"></div>
            <img src={placeholderImageUrl} alt="Proceso" className="circle-img" />

            <NumberPin number="1" positionClass="pin-1" color="#e91e63" />
            <NumberPin number="2" positionClass="pin-2" color="#e91e63" />
            <NumberPin number="3" positionClass="pin-3" color="#e91e63" />
            <NumberPin number="4" positionClass="pin-4" color="#e91e63" />
          </div>

          {/* CARRUSEL ÚNICO */}
          <div className="carousel-box">

            <StepCard
              number={steps[current].number}
              title={steps[current].title}
              description={steps[current].description}
              color="#e91e63"
            />

            {/* CONTROLES */}
            <div className="carousel-controls">
              <button
                className="carousel-btn"
                onClick={() =>
                  setCurrent((current - 1 + steps.length) % steps.length)
                }
              >
                ‹
              </button>

              <div className="carousel-dots">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={i === current ? "dot active" : "dot"}
                    onClick={() => setCurrent(i)}
                  />
                ))}
              </div>

              <button
                className="carousel-btn"
                onClick={() => setCurrent((current + 1) % steps.length)}
              >
                ›
              </button>
            </div>

          </div>
        </div>

        <p className="warning-text">
          Si el préstamo no fue aprobado, puedes volver a intentarlo en un plazo de 30 días.
        </p>

        <div className="btn-container">
          <button className="cta-btn">
            SOLICITA TU PRÉSTAMO AHORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
