import foto from "../assets/comopagar.avif";

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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-700 text-white text-center py-12 rounded-lg shadow-lg mb-10">
        <h1 className="text-4xl font-extrabold">Cómo Pagar</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src={foto}
            alt="Cómo pagar préstamo"
            className="rounded-lg shadow-md object-cover w-full h-auto"
          />
        </div>

        {/* Contenido */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">
            ¿Cómo pagar el préstamo Merite?
          </h2>
          <p className="mb-8 text-gray-700">
            El pago del préstamo es muy simple. Ofrecemos diferentes opciones:
          </p>

          {/* Pagos en línea */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4 text-pink-600">🌐</div>
              <h3 className="text-xl font-semibold">Pagos en línea</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {pagosEnLinea.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Pagos en efectivo */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4 text-yellow-500">💵</div>
              <h3 className="text-xl font-semibold">Pagos en efectivo</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {pagosEnEfectivo.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
            SOLICITA TU PRÉSTAMO AHORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoPrestamo;
