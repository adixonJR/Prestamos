import React, { useState } from "react";
import "../App.css";

interface NavLink {
  text: string;
  href: string;
}

const navLinks: NavLink[] = [
  { text: "Inicio", href: "/" },
  { text: "¿Cómo funciona?", href: "/Como-Funciona" },
  { text: "¿Cómo pagar?", href: "/Como-Pagar" },
  { text: "¿Cómo extender?", href: "/Como-Extender" },
  { text: "Preguntas Frecuentes", href: "/Preguntas-Frecuentes" },
  { text: "Artículos", href: "/Articulos" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-text">
          <span className="logo-x">X</span>Merite
        </span>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.text} href={link.href} className="nav-link">
            {link.text}
          </a>
        ))}

        <a href="/zona-clientes" className="cta-button">
          ZONA DE CLIENTES
        </a>
      </div>

      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;
