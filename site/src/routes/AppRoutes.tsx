import { Routes, Route, useParams } from "react-router-dom"

import Home from "../pages/Home"
import { Cadastro } from '../pages/Cadastro';
import { DashboardProjeto } from '../pages/DashboardProjeto';

function DashboardProjetoWrapper() {
  const { projetoId } = useParams<{ projetoId: string }>();
  return <DashboardProjeto projetoId={projetoId || ""} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/missao" element={<Home />} />
      <Route path="/servicos" element={<Home />} />
      <Route path="/contato" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard/:projetoId" element={<DashboardProjetoWrapper />} />
    </Routes>
  )
}

export default AppRoutes