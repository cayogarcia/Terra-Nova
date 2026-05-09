import { Link } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/terranova2.png"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      style={{
        background: "#1B5E20",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%"
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
              height: "90px",
              objectFit: "contain"
            }}
          />
        </Link>

        <nav
          className="menu-desktop"
          style={{
            display: "flex",
            gap: "35px",
            alignItems: "center"
          }}
        >
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/empresa">Empresa</Link>
          <Link className="nav-link" to="/apresentacao">Institucional</Link>
          <Link className="nav-link" to="/servicos">Serviços</Link>
          <Link className="nav-link" to="/contato">Contato</Link>
        </nav>

        <div
          className="menu-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            fontSize: "40px",
            color: "#fff",
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
            background: "#1B5E20",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "25px"
          }}
        >
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="nav-link" to="/empresa" onClick={() => setMenuOpen(false)}>Empresa</Link>
          <Link className="nav-link" to="/apresentacao" onClick={() => setMenuOpen(false)}>Institucional</Link>
          <Link className="nav-link" to="/servicos" onClick={() => setMenuOpen(false)}>Serviços</Link>
          <Link className="nav-link" to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
        </div>
      )}
    </header>
  )
}

export default Header