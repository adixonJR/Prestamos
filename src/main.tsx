import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer"
// Pages
import Home from "./pages/home";
import ComoFunciona from "./pages/ComoFunciona";
import ComoPagar from "./pages/ComoPagar";
import ComoExtender from "./pages/ComoExtender";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Articulos from "./pages/Articulos";
import ZonaClientes from "./pages/ZonClientes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/como-pagar" element={<ComoPagar />} />
        <Route path="/como-extender" element={<ComoExtender />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/zona-clientes" element={<ZonaClientes />} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  </StrictMode>
);
