import React from "react";
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
  <div className="step-card">
    <div className="step-icon">
      <span>{number}</span>
    </div>

    <div className="step-content">
      <h3>{title}</h3>
      <p>{description}</p>

      <div className="dots">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  </div>
);

const HowItWorksSection: React.FC = () => {
  const placeholderImageUrl =
    "https://placehold.co/400x400/ffb300/e91e63?text=Imagen+del+Proceso";

  return (
    <div className="how-section">

      <header className="how-header">
        <h1>¿Cómo funciona?</h1>
      </header>

      <div className="how-container">
        
        <h2 className="how-subtitle">
          Pasos a seguir
        </h2>

        <div className="how-grid">

          <div className="circle-container">
            <div className="circle-border"></div>
            <img src={placeholderImageUrl} alt="Proceso" className="circle-img" />

            <NumberPin number="1" positionClass="pin-1" color="#e91e63" />
            <NumberPin number="2" positionClass="pin-2" color="#e91e63" />
            <NumberPin number="3" positionClass="pin-3" color="#e91e63" />
            <NumberPin number="4" positionClass="pin-4" color="#e91e63" />
          </div>

          <div>
            <StepCard 
              number="02"
              title="Usa la Calculadora"
              description="Utiliza la calculadora para hacer una simulación real de lo que necesitas, eligiendo cuánto y cuándo pagarás. Recuerda, el 1er préstamo de PAGO ÚNICO con nosotros tiene un 30% de descuento en intereses y gastos."
              color="#e91e63"
            />

            <div className="extra-text">
              {/* Más pasos opcionales */}
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
