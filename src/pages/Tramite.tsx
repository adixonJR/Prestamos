import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Tramite() {
  const { state } = useLocation();

  // Datos del préstamo que vienen del simulador
  const { tipo, monto, plazo, interesTotal, total, fecha } = state || {};

  const [paso, setPaso] = useState(1);

  const [form, setForm] = useState({
    // PASO 1
    email: "",
    celular: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",

    // PASO 2
    fechaNacimiento: "",
    departamento: "",
    distrito: "",
    direccion: "",
    refNombres: "",
    refTelefono: "",
    refParentesco: "",

    // PASO 3
    ocupacion: "",
    ingresos: "",
    banco: "",
    tipoCuenta: "",
    cci: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

        {/* PASOS */}
        <div className="flex justify-between mb-6 text-sm font-semibold">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`flex-1 text-center ${
                paso === n ? "text-[#04BF20]" : "text-gray-400"
              }`}
            >
              Paso {n}
            </div>
          ))}
        </div>

        {/* ================= PASO 1 ================= */}
        {paso === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Datos personales</h2>

            <div className="grid grid-cols-1 gap-3">
              <input name="email" placeholder="Correo electrónico" onChange={handleChange} className="input" />
              <input name="celular" placeholder="Celular" onChange={handleChange} className="input" />
              <input name="nombres" placeholder="Nombres completos" onChange={handleChange} className="input" />
              <input name="apellidoPaterno" placeholder="Apellido paterno" onChange={handleChange} className="input" />
              <input name="apellidoMaterno" placeholder="Apellido materno" onChange={handleChange} className="input" />
              <input name="dni" placeholder="DNI" onChange={handleChange} className="input" />
            </div>
          </>
        )}

        {/* ================= PASO 2 ================= */}
        {paso === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Dirección y referencia</h2>

            <div className="grid grid-cols-1 gap-3">
              <input type="date" name="fechaNacimiento" onChange={handleChange} className="input" />
              <input name="departamento" placeholder="Departamento" onChange={handleChange} className="input" />
              <input name="distrito" placeholder="Distrito" onChange={handleChange} className="input" />
              <input name="direccion" placeholder="Dirección exacta" onChange={handleChange} className="input" />

              <hr />

              <input name="refNombres" placeholder="Referencia: nombres y apellidos" onChange={handleChange} className="input" />
              <input name="refTelefono" placeholder="Teléfono referencia" onChange={handleChange} className="input" />
              <input name="refParentesco" placeholder="Parentesco" onChange={handleChange} className="input" />
            </div>
          </>
        )}

        {/* ================= PASO 3 ================= */}
        {paso === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Datos laborales y bancarios</h2>

            <div className="grid grid-cols-1 gap-3">
              <input name="ocupacion" placeholder="Ocupación laboral" onChange={handleChange} className="input" />
              <input name="ingresos" placeholder="Ingreso mensual (S/)" onChange={handleChange} className="input" />
              <input name="banco" placeholder="Banco" onChange={handleChange} className="input" />

              <select name="tipoCuenta" onChange={handleChange} className="input">
                <option value="">Tipo de cuenta</option>
                <option value="Ahorros">Ahorros</option>
                <option value="Corriente">Corriente</option>
              </select>

              <input name="cci" placeholder="CCI" onChange={handleChange} className="input" />
            </div>
          </>
        )}

        {/* ================= PASO 4 ================= */}
        {paso === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Resumen del préstamo</h2>

            <div className="text-sm space-y-2 bg-gray-50 p-4 rounded">
              <p><b>Tipo:</b> {tipo}</p>
              <p><b>Monto:</b> S/ {monto}</p>
              <p><b>Plazo:</b> {plazo} días</p>
              <p><b>Interés:</b> S/ {interesTotal}</p>
              <p><b>Total a pagar:</b> S/ {total}</p>
              <p><b>Fecha de pago:</b> {fecha}</p>

              <hr />

              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(form, null, 2)}
              </pre>
            </div>
          </>
        )}

        {/* BOTONES */}
        <div className="flex justify-between mt-6">
          {paso > 1 && (
            <button
              onClick={() => setPaso(paso - 1)}
              className="px-4 py-2 border rounded"
            >
              Atrás
            </button>
          )}

          {paso < 4 ? (
            <button
              onClick={() => setPaso(paso + 1)}
              className="px-6 py-2 bg-[#04BF20] text-white rounded"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={() => console.log("ENVIAR TODO", { ...form, tipo, monto, plazo })}
              className="px-6 py-2 bg-[#04BF20] text-white rounded font-bold"
            >
              Confirmar solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
