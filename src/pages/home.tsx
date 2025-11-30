import { useState } from "react";
import "../App.css";


function App() {
  const [monto, setMonto] = useState<number>(500);
  const [plazo, setPlazo] = useState<number>(15);

  const interesBase = plazo === 15 ? 70 : 90;
  const descuento = 0.5;
  const interesTotal = interesBase * descuento;

  return (
    <>
        
      <div className="container">
        {/* IZQUIERDA */}
        <div className="left-section">
          <h1>Préstamos personales</h1>
          <h2 className="big-discount">50%</h2>
          <p className="subtitle">
            De descuento en intereses en tu primer préstamo online
          </p>
          <small className="condition">
            *El descuento se perderá si el pago se realiza después del vencimiento.
          </small>
        </div>

        {/* DERECHA */}
        <div className="right-section">
          <h3 className="title-right">Elige aquí el tipo de préstamo que necesitas</h3>

          {/* Monto */}
          <label>¿Cuánto necesitas?</label>
          <div className="monto-control">
            <button onClick={() => setMonto((v) => Math.max(100, v - 100))}>-</button>
            <input value={`S/ ${monto}.00`} readOnly />
            <button onClick={() => setMonto((v) => v + 100)}>+</button>
          </div>

          <input
            type="range"
            min={100}
            max={2000}
            step={100}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            className="slider"
          />

          {/* Plazo */}
          <div className="plazo-btns">
            <button className={plazo === 15 ? "active" : ""} onClick={() => setPlazo(15)}>
              15 días
            </button>
            <button className={plazo === 30 ? "active" : ""} onClick={() => setPlazo(30)}>
              30 días
            </button>
          </div>

          {/* Detalle de pago */}
          <div className="detalle">
            <p>
              Cantidad Solicitada: <span>S/ {monto}.00</span>
            </p>
            <p>
              Interés Total: <span>S/ {interesTotal.toFixed(2)}</span>
            </p>
            <p>
              Total a Pagar: <span>S/ {(monto + interesTotal).toFixed(2)}</span>
            </p>
          </div>

          <button className="btn-submit">Solicítalo Ahora</button>
        </div>
      </div>

      {/* 🔻 Sección de beneficios debajo 🔻 */}
      <section className="beneficios-container">
        <h2 className="beneficios-title">Préstamos online</h2>

        <div className="beneficios-grid">
          <div className="beneficio-card">
            <span className="icon">%</span>
            <h3>Descuento en intereses</h3>
            <p>
              Si es tu primer préstamo personal con nosotros,
              tienes un 50% de descuento. ¡Pruébalo!
            </p>
          </div>

          <div className="beneficio-card">
            <span className="icon">24</span>
            <h3>Préstamos en menos de 24 horas laborales</h3>
            <p>
              Somos 100% digitales.<br />
              No pedimos papeles ni fotos para aprobar tu préstamo online.
            </p>
          </div>

          <div className="beneficio-card">
            <span className="icon">⭐</span>
            <h3>¿Por qué elegirnos?</h3>
            <p>
              Nos preocupamos por nuestros clientes y los escuchamos para
              ofrecerles el préstamo personal perfecto para sus necesidades.
            </p>
          </div>

          <div className="beneficio-card">
            <span className="icon">⏱</span>
            <h3>Respuesta inmediata</h3>
            <p>
              En segundos tendrás una respuesta si tu préstamo fue aprobado o no.
            </p>
          </div>
        </div>
      </section>
      {/* 🔻 Sección de estadísticas */}
<section className="stats-section">
  <div className="stats-item">
    <span className="stats-icon">📅</span>
    <p className="stats-title">HASTA 90 DÍAS</p>
    <small>Plazo de pago</small>
  </div>

  <div className="stats-item">
    <span className="stats-icon">🏅</span>
    <p className="stats-title">TOP</p>
    <small>Fintech préstamos</small>
  </div>

  <div className="stats-item">
    <span className="stats-icon">👛</span>
    <p className="stats-title">+ 800,000</p>
    <small>Solicitudes de préstamos</small>
  </div>

  <div className="stats-item">
    <span className="stats-icon">🌍</span>
    <p className="stats-title">8</p>
    <small>Países</small>
  </div>
</section>


{/* 🔻 Sección Requisitos */}
<section className="requisitos-section">
  <h2 className="requisitos-title">¿Qué requisitos debes cumplir?</h2>

  <div className="requisitos-content">
    {/* Imagen izquierda */}
    <div className="requisitos-img">
      <img src="logo" alt="Persona" />
    </div>

    {/* Números centro */}
    <div className="requisitos-list">
      <div className="numero">1</div>
      <div className="numero">2</div>
      <div className="numero">3</div>
      <div className="numero">4</div>
    </div>

    {/* Icono derecha */}
    <div className="requisitos-bank">
      <span className="bank-icon">🏦</span>
      <p className="bank-text">Tener cuenta bancaria</p>
    </div>
  </div>
</section>
{/* 🔻 Sección Colaboradores */}
<section className="partners-section">
  <h2 className="partners-title">Nuestros colaboradores</h2>

  <div className="partners-logos">
    <img src="/yape.png" alt="Yape" />
    <img src="/equifax.png" alt="Equifax" />
    <img src="/bcp.png" alt="BCP" />
    <img src="/experian.png" alt="Experian" />
  </div>
</section>


{/* 🔻 Ejemplo informativo del préstamo */}
<section className="info-prestamo-section">
  <div className="info-prestamo-container">

    {/* Imagen izquierda */}
    <div className="info-img">
      <img src="/chica-dinero.png" alt="Cliente feliz" />
    </div>

    {/* Texto explicativo derecha */}
    <div className="info-text">
      <h3>¿Cómo funcionan los préstamos personales Merite?</h3>
      <p className="underlined">
        Pongamos un siguiente ejemplo representativo de cómo funcionan los préstamos en línea Merite
      </p>

      <p className="example">
        Obtienes un préstamo online de <strong>300 soles</strong> a pagar en <strong>90 días</strong>
      </p>

      <ul className="costos">
        <li>Tarifa de Tecnología (S/. 60.00)</li>
        <li>Custodia de Pagaré Digital (S/. 38.01)</li>
        <li>Tasa de Interés (S/. 43.98)</li>
        <li>IGV (S/. 25.56)</li>
      </ul>

      <p className="total">
        Sumando todo el monto total del crédito es de <strong>S/. 467.55</strong>
      </p>
    </div>
  </div>

  {/* Nota legal */}
  <p className="disclaimer">
    El préstamo se aprobará luego de la evaluación crediticia ingresando a www.merite.pe.<br />
    Merite.pe forma parte del grupo FINSANA y FINANA S.A.C. y es una empresa registrada en la Superintendencia de Banca, Seguros y AFP.
  </p>
</section>
{/* 🔻 Sección Testimonios */}
<section className="testimonios-section">
  <h2 className="testimonios-title">Testimonios</h2>
  <p className="testimonios-subtitle">¿Qué dicen nuestros clientes?</p>

  <div className="testimonios-container">

    {/* Tarjeta 1 */}
    <div className="testimonio-card">
      <div className="stars">★★★★★</div>
      <p>Excelente, claros con toda la información sencilla y con facilidades.</p>
      <h4>José Morante</h4>
    </div>

    {/* Tarjeta 2 */}
    <div className="testimonio-card">
      <div className="stars">★★★★★</div>
      <p>
        Felicitarlos, desembolso rápido y entrega de carta de no adeudo al día siguiente del pago.
        Superaron con creces las expectativas, ¡Gracias!
      </p>
      <h4>Renzo Huamanyauri</h4>
    </div>

    {/* Tarjeta 3 */}
    <div className="testimonio-card">
      <div className="stars">★★★★☆</div>
      <p>Excelente, son serios al dar el préstamo lo recomiendo.</p>
      <h4>Archivos Digitales</h4>
    </div>

  </div>
</section>

{/* Franja inferior */}
<div className="banner-final">
  ¡Solicita hasta 1000 soles sin fotos ni documentos y desde tu celular!
</div>


    </>
  );
}

export default App;
