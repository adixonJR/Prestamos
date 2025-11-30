
import "../estilos.css/ExtensionPago.css";

const ExtensionPago: React.FC = () => {
  return (
    <div className="extension-wrapper">

      {/* ENCABEZADO */}
      <div className="header-gradient">
        <h1>Extensión de fecha de pago</h1>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="extension-content">

        {/* COLUMNA IZQUIERDA */}
        <div className="left-section">
          <div className="card-box">
            <h3>¿Qué es una extensión?</h3>
            <p>
              Es un beneficio que te permite ampliar la fecha de pago de tu préstamo
              por 30 días
            </p>
          </div>

          <div className="card-box">
            <h3>¿Quiénes pueden solicitar una extensión?</h3>
            <p>
              Clientes con un préstamo activo a una sola cuota cuya fecha de
              vencimiento no haya superado los 30 días de atraso en el pago
            </p>
          </div>

          <h2 className="subtitle">Ejemplo representativo</h2>

          <div className="example-box">
            Si tienes un préstamo activo con vencimiento el 19 de Mayo, puedes
            solicitar una extensión y tu nueva fecha de pago sería el 19 de Junio
          </div>

          <h2 className="subtitle">¿Cómo solicitar?</h2>

          <button className="video-btn">
            ▶ Mira este video
          </button>
        </div>

        {/* IMAGEN DERECHA */}
        <div className="right-section">
          <img
            src="/images/calendar.jpg"
            alt="Calendario marcado"
          />
        </div>
      </div>

      {/* SECCIÓN FINAL */}
      <div className="footer-gradient">
        <h2>¿Necesitas más tiempo para pagar tu préstamo?</h2>
        <button className="cta-btn">Solicita tu extensión aquí</button>
      </div>

    </div>
  );
};

export default ExtensionPago;
