import React from 'react'
import { useTranslation } from "react-i18next"

function Missao() {
  const { t } = useTranslation()

  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* PROPÓSITO */}
        <div style={cardStyle}>
          <span style={subtitleStyle}>{t("missao.propositoTag")}</span>
          <h1 style={titleStyle}>{t("missao.propositoTitulo")}</h1>

          <div style={textContainerStyle}>
            <p style={{ marginTop: "15px", fontSize: "20px", fontWeight: "600", color: "#1B5E20" }}>
              {t("missao.propositoDestaque")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.propositoP2")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.propositoP3")}
            </p>
          </div>
        </div>

        {/* MISSÃO */}
        <div style={cardStyle}>
          <span style={subtitleStyle}>{t("missao.missaoTag")}</span>
          <h1 style={titleStyle}>{t("missao.missaoTitulo")}</h1>

          <div style={textContainerStyle}>
            <p style={{ marginTop: "15px", fontSize: "19px", fontWeight: "600" }}>
              {t("missao.missaoDestaque")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.missaoP2")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.missaoP3")}
            </p>
          </div>
        </div>

        {/* VISÃO */}
        <div style={cardStyle}>
          <span style={subtitleStyle}>{t("missao.visaoTag")}</span>
          <h1 style={titleStyle}>{t("missao.visaoTitulo")}</h1>

          <div style={textContainerStyle}>
            <p style={{ marginTop: "15px", fontSize: "19px", fontWeight: "600" }}>
              {t("missao.visaoDestaque")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.visaoP2")}
            </p>

            <p style={{ marginTop: "15px" }}>
              {t("missao.visaoP3")}
            </p>
          </div>
        </div>

        {/* VALORES */}
        <div style={cardStyle}>
          <span style={subtitleStyle}>{t("missao.valoresTag")}</span>
          <h1 style={titleStyle}>{t("missao.valoresTitulo")}</h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "30px" }}>
            <div style={valueItemStyle}>
              <h3 style={valueTitleStyle}>{t("missao.transparenciaTitulo")}</h3>
              <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.6" }}>
                {t("missao.transparenciaTexto")}
              </p>
            </div>

            <div style={valueItemStyle}>
              <h3 style={valueTitleStyle}>{t("missao.transformacaoTitulo")}</h3>
              <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.6" }}>
                {t("missao.transformacaoTexto")}
              </p>
            </div>

            <div style={valueItemStyle}>
              <h3 style={valueTitleStyle}>{t("missao.responsabilidadeTitulo")}</h3>
              <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.6" }}>
                {t("missao.responsabilidadeTexto")}
              </p>
            </div>

            <div style={valueItemStyle}>
              <h3 style={valueTitleStyle}>{t("missao.conexaoTitulo")}</h3>
              <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: "1.6" }}>
                {t("missao.conexaoTexto")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ESTILOS INTERNOS */

const cardStyle: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "40px",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  border: "1px solid #E2E8F0",
}

const subtitleStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1.5px",
  color: "#2D6A4F",
  textTransform: "uppercase",
  marginBottom: "8px",
}

const titleStyle: React.CSSProperties = {
  color: "#1B5E20",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "20px",
}

const textContainerStyle: React.CSSProperties = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#2D3748",
  textAlign: "left",
}

const valueItemStyle: React.CSSProperties = {
  backgroundColor: "#F8FAF9",
  padding: "24px",
  borderRadius: "12px",
  borderLeft: "4px solid #1B5E20",
}

const valueTitleStyle: React.CSSProperties = {
  color: "#1B5E20",
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "10px",
}

export default Missao