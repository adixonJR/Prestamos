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
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Datos personales
    </h2>
    <p className="text-sm text-gray-500 mb-8">
      Ingrese sus datos exactamente como figuran en su documento de identidad.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* CORREO */}
      <div className="field">
        <label className="label text-gray-700 font-medium">
          Correo electrónico
        </label>
        <input
          className="input"
          name="email"
          type="email"
          placeholder="ejemplo@correo.com"
          onChange={handleChange}
        />
        <span className="text-xs text-gray-400 mt-1 block">
          Usaremos este correo para contactarlo.
        </span>
      </div>

      {/* CELULAR */}
      <div className="field">
        <label className="label text-gray-700 font-medium">
          Número de celular
        </label>
        <input
          className="input"
          name="celular"
          type="tel"
          placeholder="9XXXXXXXX"
          maxLength={9}
          onChange={handleChange}
        />
        <span className="text-xs text-gray-400 mt-1 block">
          Debe ser un número móvil válido en Perú.
        </span>
      </div>

      {/* NOMBRES */}
      <div className="field md:col-span-2">
        <label className="label text-gray-700 font-medium">
          Nombres completos
        </label>
        <input
          className="input"
          name="nombres"
          placeholder="Ej. Juan Carlos"
          onChange={handleChange}
        />
      </div>

      {/* APELLIDO PATERNO */}
      <div className="field">
        <label className="label text-gray-700 font-medium">
          Apellido paterno
        </label>
        <input
          className="input"
          name="apellidoPaterno"
          placeholder="Ej. Pérez"
          onChange={handleChange}
        />
      </div>

      {/* APELLIDO MATERNO */}
      <div className="field">
        <label className="label text-gray-700 font-medium">
          Apellido materno
        </label>
        <input
          className="input"
          name="apellidoMaterno"
          placeholder="Ej. Gómez"
          onChange={handleChange}
        />
      </div>

      {/* DNI */}
      <div className="field">
        <label className="label text-gray-700 font-medium">
          Documento Nacional de Identidad (DNI)
        </label>
        <input
          className="input"
          name="dni"
          placeholder="8 dígitos"
          maxLength={8}
          onChange={handleChange}
        />
        <span className="text-xs text-gray-400 mt-1 block">
          Ingrese solo números, sin espacios.
        </span>
      </div>

    </div>
  </>
)}


{paso === 2 && (
<>
  <h2 className="text-2xl font-bold mb-8">Dirección y referencias</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* FECHA NACIMIENTO */}
    <div className="field">
      <label className="label">Fecha de nacimiento</label>
      <input
        type="date"
        className="input"
        name="fechaNacimiento"
        onChange={handleChange}
      />
    </div>

    {/* DEPARTAMENTO */}
    <div className="field">
      <label className="label">Departamento</label>
      <select
        className="input"
        value={form.departamento}
        onChange={(e) =>
          setForm({
            ...form,
            departamento: e.target.value,
            distrito: "",
          })
        }
      >
        <option value="">Seleccione</option>
        {departamentos.map((dep) => (
          <option key={dep} value={dep}>
            {dep.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>

    {/* DISTRITO */}
    <div className="field">
      <label className="label">Distrito</label>
      <select
        className="input"
        name="distrito"
        value={form.distrito}
        onChange={handleChange}
        disabled={!form.departamento}
      >
        <option value="">Seleccione</option>
        {distritos.map((dist) => (
          <option key={dist} value={dist}>
            {dist}
          </option>
        ))}
      </select>
    </div>

    {/* DIRECCIÓN */}
    <div className="field md:col-span-2">
      <label className="label">Dirección exacta</label>
      <input
        className="input"
        name="direccion"
        placeholder="Av., Jr., Calle, N°"
        onChange={handleChange}
      />
    </div>

    {/* REFERENCIA DE UBICACIÓN */}
    <div className="field md:col-span-2">
      <label className="label">Referencia de ubicación</label>
      <input
        className="input"
        name="referenciaUbicacion"
        placeholder="Ej: Frente al colegio, al costado del mercado"
        onChange={handleChange}
      />
    </div>

    {/* --- REFERENCIA FAMILIAR --- */}
    <div className="md:col-span-2 mt-4">
      <h3 className="text-sm font-semibold text-gray-600">
        Referencia familiar
      </h3>
    </div>

    <div className="field md:col-span-2">
      <label className="label">Nombre completo del familiar</label>
      <input
        className="input"
        name="refNombres"
        onChange={handleChange}
      />
    </div>

    <div className="field">
      <label className="label">Teléfono del familiar</label>
      <input
        className="input"
        name="refTelefono"
        onChange={handleChange}
      />
    </div>

    <div className="field">
      <label className="label">Parentesco</label>
      <select
        className="input"
        name="refParentesco"
        onChange={handleChange}
      >
        <option value="">Seleccione</option>
        <option value="Padre">Padre</option>
        <option value="Madre">Madre</option>
        <option value="Hermano(a)">Hermano(a)</option>
        <option value="Esposo(a)">Esposo(a)</option>
        <option value="Hijo(a)">Hijo(a)</option>
        <option value="Tío(a)">Tío(a)</option>
        <option value="Primo(a)">Primo(a)</option>
        <option value="Otro">Otro</option>
      </select>
    </div>

  </div>
</>
)}
{paso === 3 && (
<>
  <h2 className="text-2xl font-bold mb-8">Datos laborales y bancarios</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* OCUPACIÓN */}
    <div className="field">
      <label className="label">Ocupación</label>
      <select
        className="input"
        name="ocupacion"
        value={form.ocupacion}
        onChange={handleChange}
      >
        <option value="">Seleccione</option>
        <option>Empleado dependiente</option>
        <option>Independiente</option>
        <option>Comerciante</option>
        <option>Estudiante</option>
        <option>Ama de casa</option>
        <option>Jubilado</option>
        <option>Otro</option>
      </select>
    </div>

    {form.ocupacion === "Otro" && (
      <div className="field">
        <label className="label">¿Cuál?</label>
        <input
          className="input"
          name="otraOcupacion"
          onChange={handleChange}
        />
      </div>
    )}

    {/* INGRESOS */}
    <div className="field">
      <label className="label">Ingreso mensual (S/)</label>
      <input
        className="input"
        name="ingresos"
        placeholder="Ej: 1500"
        onChange={handleChange}
      />
    </div>

    {/* BANCO */}
    <div className="field">
      <label className="label">Banco</label>
      <select
        className="input"
        name="banco"
        value={form.banco}
        onChange={handleChange}
      >
        <option value="">Seleccione</option>
        <option value="BCP">Banco de Crédito del Perú (BCP)</option>
        <option value="BBVA">BBVA</option>
        <option value="Interbank">Interbank</option>
        <option value="Scotiabank">Scotiabank</option>
        <option value="Banco de la Nación">Banco de la Nación</option>
        <option value="MiBanco">MiBanco</option>
        <option value="Caja Arequipa">Caja Arequipa</option>
        <option value="Caja Huancayo">Caja Huancayo</option>
        <option value="Caja Piura">Caja Piura</option>
        <option value="Otro">Otro</option>
      </select>
    </div>

    {form.banco === "Otro" && (
      <div className="field">
        <label className="label">¿Cuál banco?</label>
        <input
          className="input"
          name="otroBanco"
          onChange={handleChange}
        />
      </div>
    )}

    {/* TIPO CUENTA */}
    <div className="field">
      <label className="label">Tipo de cuenta</label>
      <select
        className="input"
        name="tipoCuenta"
        onChange={handleChange}
      >
        <option value="">Seleccione</option>
        <option value="Ahorros">Ahorros</option>
        <option value="Corriente">Corriente</option>
      </select>
    </div>

    {/* CCI */}
    <div className="field md:col-span-2">
      <label className="label">CCI</label>
      <input
        className="input"
        name="cci"
        maxLength={20}
        placeholder="20 dígitos"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setForm({ ...form, cci: value });
        }}
      />
      {form.cci && form.cci.length !== 20 && (
        <p className="text-red-500 text-xs mt-1">
          El CCI debe tener exactamente 20 dígitos
        </p>
      )}
    </div>

  </div>
</>
)}


      {/* PASO 4 */}
{paso === 4 && (
<>
  <h2 className="text-2xl font-bold mb-6">Resumen de la solicitud</h2>

  <div className="space-y-6 text-sm">

    {/* DATOS PERSONALES */}
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-bold mb-3 text-gray-700">Datos personales</h3>
      <p><b>Correo:</b> {form.email}</p>
      <p><b>Celular:</b> {form.celular}</p>
      <p><b>Nombres:</b> {form.nombres}</p>
      <p><b>Apellido paterno:</b> {form.apellidoPaterno}</p>
      <p><b>Apellido materno:</b> {form.apellidoMaterno}</p>
      <p><b>DNI:</b> {form.dni}</p>
      <p><b>Fecha de nacimiento:</b> {form.fechaNacimiento}</p>
    </div>

    {/* DIRECCIÓN */}
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-bold mb-3 text-gray-700">Dirección</h3>
      <p><b>Departamento:</b> {form.departamento}</p>
      <p><b>Distrito:</b> {form.distrito}</p>
      <p><b>Dirección:</b> {form.direccion}</p>
    </div>

    {/* REFERENCIA */}
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-bold mb-3 text-gray-700">Referencia</h3>
      <p><b>Nombre:</b> {form.refNombres}</p>
      <p><b>Teléfono:</b> {form.refTelefono}</p>
      <p><b>Parentesco:</b> {form.refParentesco}</p>
    </div>

    {/* DATOS LABORALES */}
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="font-bold mb-3 text-gray-700">Datos laborales y bancarios</h3>
      <p><b>Ocupación:</b> {form.ocupacion}</p>
      <p><b>Ingreso mensual:</b> S/ {form.ingresos}</p>
      <p><b>Banco:</b> {form.banco}</p>
      <p><b>Tipo de cuenta:</b> {form.tipoCuenta}</p>
      <p><b>CCI:</b> {form.cci}</p>
    </div>

    {/* PRÉSTAMO */}
    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
      <h3 className="font-bold mb-3 text-green-700">Resumen del préstamo</h3>
      <p><b>Tipo:</b> {tipo}</p>
      <p><b>Monto solicitado:</b> S/ {monto}</p>
      <p><b>Plazo:</b> {plazo} días</p>
      <p><b>Interés:</b> S/ {interesTotal}</p>
      <p className="text-lg font-bold text-green-700">
        Total a pagar: S/ {total}
      </p>
      <p><b>Fecha de pago:</b> {fecha}</p>
    </div>

  </div>
</>
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
