import background from "../assets/background.jpeg"

function Empresa() {
  return (
    <section
      style={{
        padding: "40px 20px",
        backgroundImage: `linear-gradient(
          rgba(10, 15, 25, 0.82),
          rgba(10, 15, 25, 0.82)
        ), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100svh - 160px)"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >
        {/* EMPRESA */}

        <h1
          style={{
            color: "#1B5E20",
            textAlign: "center",
            marginBottom: "40px",
            textShadow: `
              0.5px 0.5px 0 #fff
            `
          }}
        >
          Empresa
        </h1>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#A0AEC0",
            textAlign: "left"
          }}
        >
          <p>
            O propósito da <strong>Terra Nova Gestão de Riscos Socioambientais e
            Desenvolvimento Sustentável</strong> é contribuir para um modelo de
            desenvolvimento mais responsável, equilibrado e resiliente,
            apoiando organizações, projetos e territórios na identificação,
            prevenção e gestão de riscos socioambientais.
          </p>

          <p style={{ marginTop: "25px" }}>
            A empresa existe para transformar conhecimento técnico em
            soluções práticas, promovendo decisões mais conscientes,
            protegendo os recursos naturais e fortalecendo a relação
            entre desenvolvimento econômico, meio ambiente e sociedade.
          </p>

          <p style={{ marginTop: "25px" }}>
            Nosso compromisso é ajudar instituições públicas e privadas
            a crescer de forma sustentável, reduzindo impactos,
            aumentando a segurança socioambiental e gerando valor
            para as presentes e futuras gerações.
          </p>
        </div>

        {/* MISSÃO */}

        <h1
          style={{
            color: "#1B5E20",
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "40px",
            textShadow: `
              0.5px 0.5px 0 #fff
            `
          }}
        >
          Missão
        </h1>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#A0AEC0",
            textAlign: "left"
          }}
        >
          <p>
            Promover soluções estratégicas e inovadoras para a gestão de riscos
            socioambientais, apoiando empresas, organizações e comunidades na
            tomada de decisões responsáveis, na prevenção de impactos e na
            construção de modelos de desenvolvimento sustentável, equilibrando
            crescimento econômico, proteção ambiental e responsabilidade social.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Empresa