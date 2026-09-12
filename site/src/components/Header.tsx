import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import logo from "../assets/logoTerraNovaImpacto.png"

interface UserData {
  email: string;
  id: string;
  tipo_perfil: string;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const { t, i18n } = useTranslation()

  // Carrega e atualiza o estado do usuário
  const syncUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    syncUser()
    window.addEventListener('authChange', syncUser)
    return () => {
      window.removeEventListener('authChange', syncUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('authChange'))
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // Componente interno para as bandeiras e informações do usuário
  const RightSideControls = () => (
    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      {/* BANDEIRAS DE IDIOMA */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => changeLanguage("pt")}
          title="Português"
          style={{
            background: "none",
            border: i18n.language.startsWith("pt") ? "2px solid #1B5E20" : "2px solid transparent",
            borderRadius: "50%",
            padding: "2px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, border-color 0.2s ease",
            outline: "none"
          }}
        >
          <img
            src="https://flagcdn.com/w40/br.png"
            alt="Brasil"
            style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
          />
        </button>

        <button
          onClick={() => changeLanguage("en")}
          title="English"
          style={{
            background: "none",
            border: i18n.language.startsWith("en") ? "2px solid #1B5E20" : "2px solid transparent",
            borderRadius: "50%",
            padding: "2px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, border-color 0.2s ease",
            outline: "none"
          }}
        >
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="USA"
            style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
          />
        </button>
      </div>

      {/* ÍCONE DE USUÁRIO E LOGOUT */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "10px", borderLeft: "1px solid #ddd", paddingLeft: "15px" }}>
          {/* Ícone SVG de Usuário */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1b4332">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#1b4332" }}>
            Olá, {user.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#c0392b",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "bold",
              textDecoration: "underline",
              paddingLeft: "5px"
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )

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
              objectFit: "contain",
              mixBlendMode: "multiply"
            }}
          />
        </Link>

        {/* MENU DESKTOP */}
        <nav
          className="menu-desktop"
          style={{
            display: "flex",
            gap: "35px",
            alignItems: "center",
            color: "#000000",
          }}
        >
          <Link className="nav-link" to="/" style={{ color: "inherit", textDecoration: "none" }}>{t("Home")}</Link>
          <Link className="nav-link" to="/missao" style={{ color: "inherit", textDecoration: "none" }}>{t("Missao")}</Link>
          <Link className="nav-link" to="/servicos" style={{ color: "inherit", textDecoration: "none" }}>{t("Servicos")}</Link>
          <Link className="nav-link" to="/cadastro" style={{ color: "inherit", textDecoration: "none" }}>{t("Cadastro")}</Link>
          <Link className="nav-link" to="/contato" style={{ color: "inherit", textDecoration: "none" }}>{t("Contato")}</Link>

          <RightSideControls />
        </nav>

        {/* MENU MOBILE BURGER */}
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

      {/* MENU MOBILE EXPANDIDO */}
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
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>{t("Home")}</Link>
          <Link className="nav-link" to="/missao" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>{t("Missao")}</Link>
          <Link className="nav-link" to="/servicos" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>{t("Servicos")}</Link>
          <Link className="nav-link" to="/cadastro" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>{t("Cadastro")}</Link>
          <Link className="nav-link" to="/contato" onClick={() => setMenuOpen(false)} style={{ color: "inherit", textDecoration: "none" }}>{t("Contato")}</Link>

          <RightSideControls />
        </div>
      )}
    </header>
  )
}

export default Header