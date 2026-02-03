import { useNavigate } from "react-router-dom";

const SocialMedia = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Solicitar Préstamo</h1>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Iniciar sesión
        </button>

        <button
          onClick={() => navigate("/registro")}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default SocialMedia;
