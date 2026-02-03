import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import articulo1 from "../assets/articulo1.jpg";
import articulo2 from "../assets/articulo2.jpg";
import articulo3 from "../assets/aeticulo3.webp";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

const Articulos = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [articuloSeleccionado, setArticuloSeleccionado] = useState<Articulo | null>(null);

  useEffect(() => {
    const data: Articulo[] = [
      {
        id: 1,
        titulo: "Préstamos con tasas más bajas: Lo que debes saber",
        descripcion:
          "Te explicamos cómo aprovechar descuentos en intereses y evitar cargos adicionales.",
        imagen: articulo1,
      },
      {
        id: 2,
        titulo: "¿Cuándo es buena idea pedir un préstamo online?",
        descripcion:
          "Situaciones reales donde un préstamo puede ayudarte sin riesgos.",
        imagen: articulo2,
      },
      {
        id: 3,
        titulo: "Guía para mantener un buen historial crediticio",
        descripcion:
          "Consejos rápidos para no perder tu acceso a créditos futuros.",
        imagen: articulo3,
      },
    ];

    setArticulos(data);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6 md:px-12">

      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">Artículos Informativos</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Aprende más sobre finanzas, préstamos y cómo mejorar tu historial.
        </p>
      </header>

      {/* GRID */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {articulos.map((a, index) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="
              bg-white shadow-lg rounded-xl overflow-hidden
              hover:shadow-2xl hover:-translate-y-2 
              transition-all duration-300 cursor-pointer
            "
            onClick={() => setArticuloSeleccionado(a)}
          >
            <img
              src={a.imagen}
              alt={a.titulo}
              className="w-full h-52 object-cover"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{a.titulo}</h3>
              <p className="text-gray-600 mt-3 mb-4">{a.descripcion}</p>

              <button
                onClick={() => setArticuloSeleccionado(a)}
                className="
                  w-full bg-purple-600 hover:bg-purple-700 text-white 
                  font-semibold px-4 py-2 rounded-lg transition-colors
                "
              >
                Leer más
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {articuloSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm 
                       flex justify-center items-center px-4 z-50"
            onClick={() => setArticuloSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={articuloSeleccionado.imagen}
                alt={articuloSeleccionado.titulo}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{articuloSeleccionado.titulo}</h2>
                <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                  {articuloSeleccionado.descripcion}
                </p>

                <button
                  onClick={() => setArticuloSeleccionado(null)}
                  className="
                    mt-6 w-full bg-purple-600 hover:bg-purple-700 
                    text-white py-2 rounded-lg text-lg font-semibold
                  "
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Articulos;
