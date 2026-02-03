import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

interface NavLink {
  text: string;
  href: string;
}

const navLinks: NavLink[] = [
  { text: "Inicio", href: "/" },
  { text: "¿Cómo funciona?", href: "/Como-Funciona" },
  { text: "¿Cómo pagar?", href: "/Como-Pagar" },
  /*
  { text: "¿Cómo extender?", href: "/Como-Extender" },
  { text: "Preguntas Frecuentes", href: "/Preguntas-Frecuentes" },
  { text: "Artículos", href: "/Articulos" },
   */
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // <-- Detecta ruta actual

  return (
    <>
      {/* NAVBAR FIJO */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          fixed top-0 left-0 w-full z-50
          flex justify-between items-center
          px-6 py-4 bg-white shadow-md
        "
      >
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="flex items-center cursor-pointer"
        >
          <img src={logo} alt="Prestamos JB logo" className="h-10 w-auto" />
        </motion.div>

        {/* BOTÓN HAMBURGUESA */}
        <button
          className="md:hidden text-gray-700 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
            ☰
          </motion.span>
        </button>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex md:items-center">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.href;

            return (
              <motion.a
                key={link.text}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`
                  px-4 py-2 text-sm
                  ${isActive ? "text-[#7c2ae8] font-semibold" : "text-gray-700"}
                  hover:text-[#7c2ae8] transition-colors
                `}
              >
                {link.text}
              </motion.a>
            );
          })}

          <motion.a
            href="/zona-clientes"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#04BF20]  text-white text-sm font-bold px-5 py-2 ml-4 rounded shadow"
          >
            ZONA DE CLIENTES
          </motion.a>
        </div>

        {/* MENÚ MÓVIL */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="
                absolute top-16 left-0 bg-white w-full shadow-md
                md:hidden flex flex-col p-4
              "
            >
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.href;

                return (
                  <motion.a
                    key={link.text}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    className={`
                      p-3 text-sm transition-colors
                      ${isActive ? "text-[#7c2ae8] font-semibold" : "text-gray-700"}
                      hover:text-[#7c2ae8]
                    `}
                  >
                    {link.text}
                  </motion.a>
                );
              })}

              <motion.a
                href="/zona-clientes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#04BF20]  text-white text-sm font-bold px-4 py-3 mt-3 rounded text-center"
              >
                ZONA DE CLIENTES
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ESPACIADO */}
      <div className="h-[80px] md:h-[88px]"></div>
    </>
  );
};

export default Navbar;
