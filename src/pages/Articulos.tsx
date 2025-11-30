import React, { useEffect, useState } from "react";

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}

const Articulos = () => {
  const [articulos, setArticulos] = useState<Articulo[]>([]);

  useEffect(() => {
    // Simulación de datos obtenidos de una API
    const data: Articulo[] = [
      {
        id: 1,
        titulo: "Préstamos con tasas más bajas: Lo que debes saber",
        descripcion:
          "Te explicamos cómo aprovechar descuentos en intereses y evitar cargos adicionales.",
        imagen: "/articulo1.jpg",
      },
      {
        id: 2,
        titulo: "¿Cuándo es buena idea pedir un préstamo online?",
        descripcion:
          "Situaciones reales donde un préstamo puede ayudarte sin riesgos.",
        imagen: "/articulo2.jpg",
      },
      {
        id: 3,
        titulo: "Guía para mantener un buen historial crediticio",
        descripcion:
          "Consejos rápidos para no perder tu acceso a créditos futuros.",
        imagen: "/articulo3.jpg",
      },
    ];

    setArticulos(data);
  }, []);

  return (
    <div className="container">
      <h1 className="title">Artículos Informativos</h1>

      <div className="grid">
        {articulos.map((a) => (
          <div key={a.id} className="card">
            <img src={a.imagen} alt={a.titulo} className="img" />
            <h3>{a.titulo}</h3>
            <p>{a.descripcion}</p>
            <button className="btn">Leer más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articulos;
