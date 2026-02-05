import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"
import Perfil from "./pages/Perfil";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages
import Home from "./pages/home";
import ComoFunciona from "./pages/ComoFunciona";
import ComoPagar from "./pages/ComoPagar";
import ComoExtender from "./pages/ComoExtender";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Articulos from "./pages/Articulos";
import ZonaClientes from "./pages/ZonClientes";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Tramite from "./pages/Tramite";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
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
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/tramite" element={<Tramite />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
