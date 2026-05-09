import background from "../assets/background.jpeg"

function Servicos() {
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
        minHeight: "calc(100svh - 140px)"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
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
          Nossos Serviços
        </h1>

        <div
          style={{
            fontSize: "18px",
            lineHeight: "1.9",
            color: "#A0AEC0",
            textAlign: "justify"
          }}
        >
          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            CONSULTORIA EM SUSTENTABILIDADE, GOVERNANÇA E GESTÃO AMBIENTAL
          </h3>

          <p>
            Atuamos no desenvolvimento de soluções estratégicas para organizações
            que buscam alinhar desempenho econômico, responsabilidade
            socioambiental e conformidade legal, promovendo transição para
            modelos de negócio sustentáveis, éticos e regenerativos.
          </p>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            CONSULTORIA EM SUSTENTABILIDADE
          </h3>

          <p>
            Realizamos diagnósticos ambientais e organizacionais para avaliar
            impactos, riscos e oportunidades de melhoria nos processos internos e
            externos da organização.
          </p>

          <p style={{ marginTop: "20px" }}>
            <strong>Nossos serviços incluem:</strong>
          </p>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>Diagnóstico ambiental e de sustentabilidade corporativa</li>
            <li>Avaliação de impactos ambientais e sociais</li>
            <li>Mapeamento de riscos e oportunidades ESG</li>
            <li>Orientação técnica para adoção de práticas ambientalmente corretas</li>
            <li>Desenvolvimento de políticas internas sustentáveis</li>
            <li>Capacitação e sensibilização de equipes</li>
          </ul>

          <p>
            Nosso objetivo é apoiar a tomada de decisão estratégica baseada em
            critérios técnicos e indicadores mensuráveis.
          </p>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            GESTÃO DE RISCOS E CONFORMIDADE
          </h3>

          <p>
            Implementamos práticas de governança corporativa voltadas à
            conformidade normativa e à mitigação de riscos ambientais e
            regulatórios.
          </p>

          <p style={{ marginTop: "20px" }}>
            <strong>Atuação em conformidade com normas técnicas:</strong>
          </p>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>IPCC</li>
            <li>GRI</li>
            <li>ABNT NBR ISO 14001:2015</li>
            <li>ABNT NBR ISO 14020:2025</li>
            <li>ABNT NBR 12235:2022</li>
            <li>ABNT NBR 14031</li>
            <li>Implementação e auditoria de SGA</li>
            <li>Estruturação de compliance ambiental</li>
            <li>Gestão de riscos regulatórios</li>
            <li>Relatórios de desempenho ambiental</li>
            <li>Preparação para certificações</li>
          </ul>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            GESTÃO DE PROJETOS SUSTENTÁVEIS
          </h3>

          <p>
            Desenvolvemos e executamos estratégias para a transição
            organizacional rumo a modelos de negócio éticos, resilientes e
            regenerativos.
          </p>

          <p style={{ marginTop: "20px" }}>
            <strong>Principais frentes:</strong>
          </p>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>Produção ILPF</li>
            <li>Planejamento estratégico ESG</li>
            <li>Estruturação e monitoramento de indicadores ESG</li>
            <li>Elaboração de relatórios de sustentabilidade</li>
            <li>Implementação de iniciativas sustentáveis</li>
            <li>Avaliação de impacto socioambiental</li>
            <li>Estratégias de descarbonização</li>
          </ul>

          <p>
            Atuamos alinhados às novas exigências do Sistema Brasileiro de
            Comércio de Emissões.
          </p>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            PLANEJAMENTO E DESENVOLVIMENTO SOCIOAMBIENTAL
          </h3>

          <p>
            Desenvolvemos programas e projetos voltados à responsabilidade
            socioambiental, recuperação ambiental e gestão sustentável dos
            recursos naturais.
          </p>

          <p style={{ marginTop: "20px" }}>
            <strong>Atuação em conformidade com:</strong>
          </p>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>Lei nº 10.257/2001</li>
            <li>Lei nº 6.766/1979</li>
            <li>Decreto nº 5.790/2006</li>
            <li>Lei 12.097/2009</li>
            <li>Lei nº 8.629/1993</li>
            <li>Lei nº 15.042/2024</li>
          </ul>

          <p style={{ marginTop: "20px" }}>
            <strong>Serviços oferecidos:</strong>
          </p>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>Produção ILPF</li>
            <li>Plano Municipal de Conservação</li>
            <li>Planos Municipais de Redução de Risco</li>
            <li>Programas de responsabilidade socioambiental</li>
            <li>Recuperação de áreas degradadas</li>
            <li>Planejamento ambiental territorial</li>
            <li>Gestão sustentável de recursos naturais</li>
          </ul>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            DIFERENCIAIS
          </h3>

          <ul style={{ paddingLeft: "25px", margin: "15px 0" }}>
            <li>✔ Abordagem estratégica integrada</li>
            <li>✔ Atuação baseada em normas técnicas atualizadas</li>
            <li>✔ Conformidade legal completa</li>
            <li>✔ Foco em resultados mensuráveis</li>
            <li>✔ Planejamento orientado por indicadores ESG</li>
            <li>✔ Visão regenerativa e inovação sustentável</li>
          </ul>

          <h3 style={{ color: "#1B5E20", margin: "40px 0 20px" }}>
            CONSIDERAÇÕES FINAIS
          </h3>

          <p>
            A TERRA NOVA coloca-se à disposição para apresentar proposta técnica
            personalizada, cronograma de execução e orçamento conforme as
            necessidades específicas da organização.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Servicos