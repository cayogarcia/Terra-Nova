import background from "../assets/background.jpeg"

function ApresentacaoInstitucional() {
  return (
    <section
      style={{
        padding: "40px 20px",
        backgroundImage: `linear-gradient(
          rgba(10, 15, 25, 0.52),
          rgba(10, 15, 25, 0.52)
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
          Apresentação Institucional
        </h1>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#272829",
            textAlign: "left"
          }}
        >
          <p>
            A <strong>Terra Nova Gestão de Riscos Socioambientais e Desenvolvimento
            Sustentável</strong> é uma empresa especializada em análise, prevenção e
            gestão de riscos socioambientais, atuando no apoio técnico e
            estratégico a organizações que buscam alinhar seus projetos aos
            princípios da sustentabilidade.
          </p>

          <p style={{ marginTop: "25px" }}>
            Nosso trabalho integra conhecimento multidisciplinar nas áreas
            ambiental, social e de governança, oferecendo soluções que auxiliam
            empresas, instituições e empreendimentos a identificar riscos,
            atender exigências regulatórias e implementar práticas responsáveis
            de gestão.
          </p>

          <p style={{ marginTop: "25px" }}>
            Atuamos com foco na antecipação de riscos, na mitigação de impactos
            e na promoção de estratégias sustentáveis, contribuindo para que
            projetos e atividades econômicas sejam desenvolvidos de forma segura,
            eficiente e socialmente responsável.
          </p>

          <p style={{ marginTop: "25px" }}>
            A Terra Nova acredita que o desenvolvimento sustentável depende de
            planejamento, conhecimento técnico e compromisso com o futuro.
          </p>

          <p style={{ marginTop: "25px" }}>
            Por isso, trabalhamos para construir soluções que fortaleçam a
            sustentabilidade dos negócios e a proteção do meio ambiente e das
            comunidades.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ApresentacaoInstitucional