import React, { useState } from "react";
import "../App.css";
import logo from "../assets/logo.svg"
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
    <nav className="">
    <nav className="flex items-center px-4 h-12 bg-transparent">
  <img
    src={logo}
    alt="Prestamos JB logo"
    className="h-full w-auto object-contain hover:scale-105 transition-transform"
  />
</nav>

</nav>


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
