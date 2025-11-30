import React from 'react';

import '../App.css'
// 1. Datos para los enlaces de las columnas
interface FooterColumn {
  title: string;
  links: { text: string; href: string }[];
}

const menuLinks: FooterColumn = {
  title: 'Menú',
  links: [
    { text: 'Inicio', href: '/' },
    { text: '¿Cómo funciona?', href: '/como-funciona' },
    { text: '¿Cómo pagar?', href: '/como-pagar' },
    { text: 'Artículos', href: '/articulos' },
    { text: 'Preguntas frecuentes', href: '/faq' },
  ],
};

const interestLinks: FooterColumn = {
  title: 'Enlaces de interés',
  links: [
    { text: 'Política de privacidad', href: '/privacidad' },
    { text: 'Términos y condiciones', href: '/terminos' },
    { text: 'Política de cookies', href: '/cookies' },
  ],
};

// 2. Componente funcional
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content-wrapper">

        {/* Columna 1: Logo e Información Legal SBS */}
        <div className="footer-col footer-info-col">
          <div className="footer-logo">
            {/* Logo Merite */}
            <span className="logo-text">
              <span className="logo-x">X</span>Merite
            </span>
          </div>

          <div className="sbs-info">
            <div className="sbs-lock-icon">🔒</div>
            <p>Empresa inscrita en el registro de la SBS</p>
            <p>
              <a href="https://www.sbs.gob.pe/app/uifvoc" target="_blank" rel="noopener noreferrer">
                https://www.sbs.gob.pe/app/uifvoc
              </a>
            </p>
            <p>mediante RESOLUCIÓN N° 10958-2021</p>
            <p>RUC: 20608657089.</p>
          </div>

          <p className="social-text">Síguenos en redes sociales:</p>
          {/* Aquí irían los íconos de redes sociales (solo placeholders) */}
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon">f</a>
            <a href="#" aria-label="TikTok" className="social-icon">T</a>
            <a href="#" aria-label="Instagram" className="social-icon">i</a>
            <a href="#" aria-label="YouTube" className="social-icon">Y</a>
            <a href="#" aria-label="LinkedIn" className="social-icon">in</a>
          </div>
        </div>

        {/* Columna 2: Menú */}
        <div className="footer-col">
          <h3>{menuLinks.title}</h3>
          <ul className="footer-links">
            {menuLinks.links.map((link, index) => (
              <li key={index}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Enlaces de Interés y Libro de Reclamaciones */}
        <div className="footer-col">
          <h3>{interestLinks.title}</h3>
          <ul className="footer-links">
            {interestLinks.links.map((link, index) => (
              <li key={index}><a href={link.href}>{link.text}</a></li>
            ))}
          </ul>
          
          <div className="libro-reclamaciones">
            <h4>Libro de Reclamaciones</h4>
            <div className="book-icon">📖</div>
          </div>
        </div>

        {/* Columna 4: Contáctanos */}
        <div className="footer-col">
          <h3>Contáctanos</h3>
          <div className="contact-info">
            <p>📧 <a href="mailto:servicioalcliente@merite.pe">servicioalcliente@merite.pe</a></p>
            <p>📞 924 130 566 <span className="whatsapp-note">(solo whatsapp)</span></p>
            <p>☎️ 01 701 8916</p>
            <p>📍 Av. Santo Toribio 173 San Isidro</p>
          </div>
        </div>
      </div>

      {/* Sección de Derechos de Autor y RUC */}
      <div className="footer-bottom-copy">
        <p>
          {currentYear} &copy; Merite Perú
        </p>
      </div>

      {/* Sección de Párrafo Legal Completo */}
      <div className="footer-legal-text">
        <p>
          La Plataforma MERITE es segura. La tasa de interés nunca será mayor a la permitida por el Banco Central de Reserva del Perú. El préstamo tiene periodo mínimo de cancelación de 61 días hasta un periodo máximo de 120 días. Ejemplo de préstamo a cuotas: Para un préstamo de seiscientos soles (S/.600) la tasa anual equivalente de interés APR (TAG): 35.00%, en 3 cuotas fijas mensuales y constantes de S/.279, con un valor total S/.837 más IGV. El otorgamiento de los préstamos está sujeto a evaluación crediticia. *BASES Y CONDICIONES COMERCIALES PARA LA CAMPAÑA DE LANZAMIENTO "TU PRÉSTAMO PERSONAL DE PAGO ÚNICO CON 50% EN INTERESES Y TARIFAS". Para más información puede contactarse a servicioalcliente@merite.pe o al 701-8916. Av. Santo Toribio 173, Vía Principal 125, Torre Real Ocho, Piso 16, San Isidro, Lima-Perú. FINSANA S.A.C. RUC: 20608657089.
        </p>
      </div>
    </footer>
  );
};

export default Footer;