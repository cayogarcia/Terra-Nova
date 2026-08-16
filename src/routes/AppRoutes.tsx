import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Missao from "../pages/Missao"
import ApresentacaoInstitucional from "../pages/ApresentacaoInstitucional"
import Servicos from "../pages/Servicos"
import Contato from "../pages/Contato"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/missao" element={<Missao />} />
      <Route path="/apresentacao" element={<ApresentacaoInstitucional />} />
      <Route path="/servicos" element={<Servicos />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
  )
}

export default AppRoutes