import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/logo-terranova.png"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        background: "#FFFFFF",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        borderBottom: "1px solid #e0e0e0"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "12px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Link to="/">
          <img
            src={logo}
            alt="Terranova"
            style={{
              height: "100px",
              objectFit: "contain"
            }}
          />
        </Link>

        <nav
          className="menu-desktop"
          style={{
            display: "flex",
            gap: "35px",
            alignItems: "center",
            color: "#000000", // Texto preto
          }}
        >
          {/* Adicionando color: "inherit" para garantir que o link use a cor do nav */}
          <Link className="nav-link" to="/" style={{color: "inherit", textDecoration: "none"}}>Home</Link>
          <Link className="nav-link" to="/missao" style={{color: "inherit", textDecoration: "none"}}>Missão</Link>
          <Link className="nav-link" to="/apresentacao" style={{color: "inherit", textDecoration: "none"}}>Institucional</Link>
          <Link className="nav-link" to="/servicos" style={{color: "inherit", textDecoration: "none"}}>Serviços</Link>
          <Link className="nav-link" to="/contato" style={{color: "inherit", textDecoration: "none"}}>Contato</Link>
        </nav>

        <div
          className="menu-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: "40px",
            color: "#000000", 
            cursor: "pointer"
          }}
        >
          ☰
        </div>
      </div>

      {menuOpen && (
        <div
          className="mobile-links"
          style={{
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "25px",
            color: "#000000",
            borderTop: "1px solid #e0e0e0"
          }}
        >
          {/* Adicionando color: "inherit" para os links mobile também */}
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)} style={{color: "inherit", textDecoration: "none"}}>Home</Link>
          <Link className="nav-link" to="/missao" onClick={() => setMenuOpen(false)} style={{color: "inherit", textDecoration: "none"}}>Missão</Link>
          <Link className="nav-link" to="/apresentacao" onClick={() => setMenuOpen(false)} style={{color: "inherit", textDecoration: "none"}}>Institucional</Link>
          <Link className="nav-link" to="/servicos" onClick={() => setMenuOpen(false)} style={{color: "inherit", textDecoration: "none"}}>Serviços</Link>
          <Link className="nav-link" to="/contato" onClick={() => setMenuOpen(false)} style={{color: "inherit", textDecoration: "none"}}>Contato</Link>
        </div>
      )}
    </header>
  )
}

export default Header