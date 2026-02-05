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
    rol: "CLIENTE",
    codigoAdmin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.dni ||
      !form.nombres ||
      !form.apellido_paterno ||
      !form.apellido_materno ||
      !form.email ||
      !form.password
    ) {
      setError("Completa todos los campos");
      return;
    }

    if (form.rol === "ADMIN" && !form.codigoAdmin) {
      setError("El código de administrador es obligatorio");
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
        setError(data.message || "Error al registrar");
        return;
      }

      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Crear cuenta
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <input
          name="dni"
          placeholder="DNI (8 dígitos)"
          maxLength={8}
          value={form.dni}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="nombres"
          placeholder="Nombres completos"
          value={form.nombres}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="apellido_paterno"
          placeholder="Apellido paterno"
          value={form.apellido_paterno}
          onChange={handleChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <input
          name="apellido_materno"
          placeholder="Apellido materno"
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
          className="w-full border p-2 mb-3 rounded"
        />

        {/* 🔐 ROL */}
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        >
          <option value="CLIENTE">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>

        {/* 🔑 CÓDIGO ADMIN */}
        {form.rol === "ADMIN" && (
          <input
            name="codigoAdmin"
            type="password"
            placeholder="Código de administrador"
            value={form.codigoAdmin}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded border-red-400"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registro;
