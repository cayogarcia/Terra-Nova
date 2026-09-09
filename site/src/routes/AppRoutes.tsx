import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import { Cadastro } from '../pages/Cadastro';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/missao" element={<Home />} />
      <Route path="/servicos" element={<Home />} />
      <Route path="/contato" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  )
}

export default AppRoutes