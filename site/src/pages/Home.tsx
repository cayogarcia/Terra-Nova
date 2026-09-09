import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Hero from "../components/Hero"
import Missao from "./Missao"
import Servicos from "./Servicos"
import Contato from "./Contato"

function Home() {
  const location = useLocation()

  useEffect(() => {
    const sectionId = location.pathname.replace("/", "")

    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location.pathname])

  return (
    <main style={mainContainerStyle}>
      <section id="home" style={heroSectionStyle}>
        <Hero />
      </section>

      <div style={waveDividerStyle}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "60px", display: "block" }}
        >
          <path
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,120 L0,120 Z"
            fill="#F8FAF9"
          ></path>
        </svg>
      </div>

      <section id="missao" style={sectionMissaoStyle}>
        <div style={innerContainerStyle}>
          <Missao />
        </div>
      </section>

      <section id="servicos" style={sectionServicosStyle}>
        <div style={innerContainerStyle}>
          <Servicos />
        </div>
      </section>

      <section id="contato" style={sectionContatoStyle}>
        <div style={innerContainerStyle}>
          <Contato />
        </div>
      </section>
    </main>
  )
}

/* ESTILOS */
const mainContainerStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  color: "#2D3748",
  overflowX: "hidden",
}

const heroSectionStyle: React.CSSProperties = {
  scrollMarginTop: "100px",
  position: "relative",
  zIndex: 1,
}

const waveDividerStyle: React.CSSProperties = {
  width: "100%",
  overflow: "hidden",
  lineHeight: 0,
  backgroundColor: "#FFFFFF",
}

const innerContainerStyle: React.CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  width: "100%",
  padding: "0 24px",
  boxSizing: "border-box",
}

const sectionMissaoStyle: React.CSSProperties = {
  scrollMarginTop: "100px",
  padding: "80px 0",
  backgroundColor: "#F8FAF9",
  borderBottom: "1px solid #E2E8F0",
  transition: "all 0.3s ease",
}

const sectionServicosStyle: React.CSSProperties = {
  scrollMarginTop: "100px",
  padding: "90px 0",
  backgroundColor: "#FFFFFF",
  transition: "all 0.3s ease",
}

const sectionContatoStyle: React.CSSProperties = {
  scrollMarginTop: "100px",
  padding: "90px 0",
  backgroundColor: "#F0F7F4",
  borderTop: "1px solid #E2E8F0",
  position: "relative",
}

export default Home