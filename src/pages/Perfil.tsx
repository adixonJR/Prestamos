import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  dni: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  rol: string;
}

interface Solicitud {
  id: number;
  tipo_prestamo: string;
  monto: number;
  plazo: number;
  interes: number;
  total: number;
  fecha_pago: string;
}

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    fetch("http://localhost:3000/api/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setUser(data);
  
        return fetch(
          `http://localhost:3000/api/solicitudes/${data.dni}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => res.json())
      .then((data) => setSolicitudes(data))
      .catch((err) => {
        console.error(err);
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);
  

  if (!user) {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          👤 Mi Perfil
        </h2>

        <div className="space-y-2 text-sm">
          <p><b>DNI:</b> {user.dni}</p>
          <p><b>Nombres:</b> {user.nombres}</p>
          <p>
            <b>Apellidos:</b> {user.apellido_paterno}{" "}
            {user.apellido_materno}
          </p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Rol:</b> {user.rol}</p>
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">
          📄 Mis Solicitudes
        </h3>

        {solicitudes.length === 0 ? (
          <p className="text-sm text-gray-500">
            No tienes solicitudes registradas
          </p>
        ) : (
          <div className="space-y-3">
            {solicitudes.map((s) => (
              <div
                key={s.id}
                className="border rounded-lg p-3 text-sm bg-gray-50"
              >
                <p><b>Tipo:</b> {s.tipo_prestamo}</p>
                <p><b>Monto:</b> S/ {s.monto}</p>
                <p><b>Plazo:</b> {s.plazo} días</p>
                <p><b>Interés:</b> S/ {s.interes}</p>
                <p><b>Total:</b> S/ {s.total}</p>
                <p><b>Fecha de pago:</b> {s.fecha_pago}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
