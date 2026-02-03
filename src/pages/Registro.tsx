import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dni: "",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.dni ||
      !form.nombres ||
      !form.apellido_paterno ||
      !form.apellido_materno ||
      !form.email ||
      !form.password
    ) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error al registrar");
        return;
      }

      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Crear cuenta
        </h2>

        <input
          name="dni"
          placeholder="DNI"
          maxLength={8}
          value={form.dni}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="apellido_paterno"
          placeholder="Apellido Paterno"
          value={form.apellido_paterno}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="apellido_materno"
          placeholder="Apellido Materno"
          value={form.apellido_materno}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registro;
