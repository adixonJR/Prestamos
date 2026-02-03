import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Tramite() {
  const { state } = useLocation();
  const { tipo, monto, plazo, interesTotal, total, fecha } = state || {};
  const [paso, setPaso] = useState(1);

  // ================= UBIGEO PERÚ =================
  const ubigeoPeru = {
    Lima: [
      "Lima", "Ate", "Barranco", "Breña", "Chorrillos", "Comas",
      "El Agustino", "Independencia", "Jesús María", "La Molina",
      "La Victoria", "Los Olivos", "Miraflores", "Pueblo Libre",
      "Rímac", "San Borja", "San Isidro", "San Juan de Lurigancho",
      "San Juan de Miraflores", "San Luis", "San Martín de Porres",
      "San Miguel", "Santa Anita", "Surco", "Surquillo",
      "Villa El Salvador", "Villa María del Triunfo"
    ],
    Arequipa: [
      "Arequipa", "Cayma", "Cerro Colorado", "Characato",
      "Hunter", "José Luis Bustamante y Rivero",
      "Miraflores", "Paucarpata", "Sachaca", "Yanahuara"
    ],
    Cusco: [
      "Cusco", "San Sebastián", "San Jerónimo",
      "Santiago", "Wanchaq", "Poroy"
    ],
    Piura: [
      "Piura", "Castilla", "Catacaos", "Veintiséis de Octubre"
    ],
    La_Libertad: [
      "Trujillo", "El Porvenir", "Florencia de Mora",
      "Huanchaco", "La Esperanza", "Moche", "Salaverry"
    ],
    Lambayeque: [
      "Chiclayo", "José Leonardo Ortiz",
      "La Victoria", "Pimentel"
    ],
    Callao: [
      "Callao", "Bellavista", "Carmen de la Legua",
      "La Perla", "La Punta", "Ventanilla", "Mi Perú"
    ]
  };
  // =================================================

  const [form, setForm] = useState({
    email: "",
    celular: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    dni: "",
    fechaNacimiento: "",
    departamento: "",
    distrito: "",
    direccion: "",
    referenciaUbicacion: "",
    refNombres: "",
    refTelefono: "",
    refParentesco: "",
    ocupacion: "",
    otraOcupacion: "",
    ingresos: "",
    banco: "",
    otroBanco: "",
    tipoCuenta: "",
    cci: "",
  });

  const departamentos = Object.keys(ubigeoPeru);
  const distritos = form.departamento
    ? ubigeoPeru[form.departamento]
    : [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const progreso = (paso / 4) * 100;

  // ================= ENVÍO AL BACKEND =================
  const payload = {
    ...form,
    tipo,
    monto,
    plazo,
    interesTotal,
    total,
    fecha,
  };

  const enviarSolicitud = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/solicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al enviar la solicitud");
        return;
      }

      console.log("Solicitud registrada:", data);
      alert("Solicitud enviada correctamente");
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };
  // ====================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        {/* PROGRESO */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Paso {paso} de 4</span>
            <span>{Math.round(progreso)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#04BF20] h-2 rounded-full transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>

        {/* PASO 1 */}
        {paso === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-8">Datos personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input className="input" name="email" placeholder="Correo" onChange={handleChange} />
              <input className="input" name="celular" placeholder="Celular" onChange={handleChange} />
              <input className="input md:col-span-2" name="nombres" placeholder="Nombres" onChange={handleChange} />
              <input className="input" name="apellidoPaterno" placeholder="Apellido paterno" onChange={handleChange} />
              <input className="input" name="apellidoMaterno" placeholder="Apellido materno" onChange={handleChange} />
              <input className="input" name="dni" placeholder="DNI" onChange={handleChange} />
            </div>
          </>
        )}

        {/* PASO 2 */}
        {paso === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-8">Dirección y referencias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="date" className="input" name="fechaNacimiento" onChange={handleChange} />
              <select
                className="input"
                value={form.departamento}
                onChange={(e) =>
                  setForm({ ...form, departamento: e.target.value, distrito: "" })
                }
              >
                <option value="">Departamento</option>
                {departamentos.map((dep) => (
                  <option key={dep} value={dep}>{dep.replace("_", " ")}</option>
                ))}
              </select>
              <select
                className="input"
                name="distrito"
                value={form.distrito}
                onChange={handleChange}
              >
                <option value="">Distrito</option>
                {distritos.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
              <input className="input md:col-span-2" name="direccion" placeholder="Dirección" onChange={handleChange} />
              <input className="input md:col-span-2" name="referenciaUbicacion" placeholder="Referencia" onChange={handleChange} />
              <input className="input md:col-span-2" name="refNombres" placeholder="Familiar" onChange={handleChange} />
              <input className="input" name="refTelefono" placeholder="Teléfono familiar" onChange={handleChange} />
              <select className="input" name="refParentesco" onChange={handleChange}>
                <option value="">Parentesco</option>
                <option>Padre</option>
                <option>Madre</option>
                <option>Hermano(a)</option>
                <option>Otro</option>
              </select>
            </div>
          </>
        )}

        {/* PASO 3 */}
        {paso === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-8">Datos laborales y bancarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select className="input" name="ocupacion" onChange={handleChange}>
                <option value="">Ocupación</option>
                <option>Empleado dependiente</option>
                <option>Independiente</option>
                <option>Otro</option>
              </select>
              {form.ocupacion === "Otro" && (
                <input className="input" name="otraOcupacion" placeholder="¿Cuál?" onChange={handleChange} />
              )}
              <input className="input" name="ingresos" placeholder="Ingresos" onChange={handleChange} />
              <select className="input" name="banco" onChange={handleChange}>
                <option value="">Banco</option>
                <option value="BCP">BCP</option>
                <option value="BBVA">BBVA</option>
                <option value="Otro">Otro</option>
              </select>
              {form.banco === "Otro" && (
                <input className="input" name="otroBanco" placeholder="¿Cuál banco?" onChange={handleChange} />
              )}
              <select className="input" name="tipoCuenta" onChange={handleChange}>
                <option value="">Tipo cuenta</option>
                <option>Ahorros</option>
                <option>Corriente</option>
              </select>
              <input
                className="input md:col-span-2"
                name="cci"
                maxLength={20}
                placeholder="CCI"
                onChange={(e) =>
                  setForm({ ...form, cci: e.target.value.replace(/\D/g, "") })
                }
              />
            </div>
          </>
        )}

        {/* PASO 4 */}
        {paso === 4 && (
          <h2 className="text-2xl font-bold mb-6">Confirmar solicitud</h2>
        )}

        {/* BOTONES */}
        <div className="flex justify-between mt-8">
          {paso > 1 && (
            <button onClick={() => setPaso(paso - 1)} className="px-6 py-2 border rounded-lg">
              Atrás
            </button>
          )}
          <button
            onClick={() => paso < 4 ? setPaso(paso + 1) : enviarSolicitud()}
            className="px-8 py-3 bg-[#04BF20] text-white rounded-lg font-semibold"
          >
            {paso < 4 ? "Continuar" : "Confirmar solicitud"}
          </button>
        </div>

      </div>
    </div>
  );
}
