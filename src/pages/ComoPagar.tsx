
import "../estilos.css/ComoPgar.css";

const PagoPrestamo: React.FC = () => {
  const pagosEnLinea = [
    "Ingresando a merite.pe (Zona de clientes)",
    "App/web BCP / servicios / merite recaudación",
    "App/web BBVA / servicios / merite recaudación",
    "App/web Interbank / servicios / MERITE",
    "YAPE / pago de servicios",
    "Pagolink (solicítalo a través de WhatsApp y correo)",
  ];

  const pagosEnEfectivo = [
    "Agentes BCP (código 23313)",
    "Agentes BBVA (merite)",
    "Agentes Interbank (MERITE)",
    "Agentes KASNET (merite)",
  ];

  return (
    <div className="pago-wrapper">
      {/* Encabezado con gradiente */}
      <div className="pago-header">
        <h1>¿Cómo pagar? Paga tu préstamo personal</h1>
      </div>

      <div className="pago-container">
        {/* Imagen */}
        <div className="image-section">
          <img
            src="/images/pareja-phone.jpg"
            alt="Personas revisando información en un teléfono"
          />
        </div>

        {/* Contenido */}
        <div className="content-section">
          <h2>¿Cómo pagar el préstamo Merite?</h2>
          <p className="intro">
            El pago del préstamo es muy simple. Ofrecemos diferentes opciones:
          </p>

          {/* PAGOS EN LÍNEA */}
          <div className="block">
            <div className="icon-circle pink">🌐</div>
            <h3>Pagos en línea</h3>

            <ul>
              {pagosEnLinea.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* PAGOS EN EFECTIVO */}
          <div className="block">
            <div className="icon-circle orange">💵</div>
            <h3>Pagos en efectivo</h3>

            <ul>
              {pagosEnEfectivo.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <button className="btn-primary">SOLICITA TU PRÉSTAMO AHORA</button>
        </div>
      </div>
    </div>
  );
};

export default PagoPrestamo;
