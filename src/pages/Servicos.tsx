import React, { useState } from 'react'
import ImgServicos1 from '../assets/card1.png'
import ImgServicos2 from '../assets/card2.jpeg'
import ImgServicos3 from '../assets/card3.png'
import ImgServicos4 from '../assets/card4.jpg'
import ImgServicos5 from '../assets/card5.jpg'
import ImgServicos6 from '../assets/card6.jpg'
import ImgServicos7 from '../assets/card7.jpg'

interface SecaoSubitens {
  subtitulo: string
  itens: string[]
}

interface ServicoItem {
  id: number
  titulo: string
  imagem?: string
  descricao?: string
  subtituloLista?: string
  subdescricao?: string
  itens?: string[] // Para cards simples com apenas uma lista
  secoes?: SecaoSubitens[] // Para cards com subitens categorizados (ex: ESG)
}

const servicosData: ServicoItem[] = [
  {
    id: 1,
    imagem: ImgServicos1,
    titulo: "NOSSA PROPOSTA DE VALOR",
    descricao:
      "A Terra Nova não entrega apenas diagnósticos. Entregamos visão estratégica, identificação de riscos e caminhos para a transformação. Nosso trabalho busca aproximar sustentabilidade, gestão de riscos e resultados, permitindo que a organização compreenda sua situação atual, estabeleça prioridades e desenvolva ações capazes de gerar valor no curto, médio e longo prazo. Acreditamos em uma sustentabilidade que seja: Estratégica. Mensurável. Ética. Aplicável. Transformadora.",
    itens: [
      "Preparação para crédito sustentável",
      "Questionário Socioambiental",
      "Due Diligence Socioambiental",
      "Avaliação de Risco Climático",
      "KYS (Know Your Supplier)",
      "ESG Assessment",
      "PRSAC Assessment",
      "Gap assessment ESG"
    ]
  },
  {
    id: 2,
    imagem: ImgServicos2,
    titulo: "PROGRAMA ESG PARA HOSPITAIS",
    descricao:
      "Programa completo para instituições hospitalares que desejam incorporar ESG à sua estratégia.",
    subtituloLista: "Estrutura:",
    secoes: [
      {
        subtitulo: "E — Ambiental",
        itens: [
          "Gestão de resíduos",
          "Eficiência energética",
          "Gestão da água",
          "Uso racional de recursos",
          "Redução de impactos ambientais",
          "Indicadores ambientais"
        ]
      },
      {
        subtitulo: "S — Social",
        itens: [
          "Pessoas e colaboradores",
          "Saúde e segurança",
          "Diversidade e inclusão",
          "Direitos humanos",
          "Experiência e segurança das pessoas",
          "Relacionamento com a comunidade",
          "Impacto social"
        ]
      },
      {
        subtitulo: "G — Governança",
        itens: [
          "Ética",
          "Integridade",
          "Gestão de riscos",
          "Transparência",
          "Controles",
          "Políticas internas",
          "Indicadores de governança"
        ]
      }
    ]
  },
  {
    id: 3,
    imagem: ImgServicos3,
    titulo: " ESG PARA CLÍNICAS E CONSULTÓRIOS",
    descricao:
      "Solução desenvolvida para organizações de menor porte que desejam implementar ESG de maneira prática e proporcional à sua realidade.",
    subtituloLista: "Inclui:",
    itens: [
      "Diagnóstico ESG",
      "Identificação de riscos",
      "Gestão ambiental",
      "Gestão de pessoas",
      "Ética e governança",
      "Políticas internas",
      "Indicadores",
      "Plano de ação",
      "Treinamento da equipe"
    ],
    subdescricao: "ESG não precisa ser complexo para gerar resultados."
  },
  {
    id: 4,
    imagem: ImgServicos4,
    titulo: "GESTÃO AMBIENTAL PARA O SETOR DA SAÚDE",
    descricao:
      "Estruturação e aprimoramento das práticas ambientais da organização.",
    subtituloLista: "Serviços:",
    itens: [
      "Diagnóstico ambiental",
      "Identificação de impactos",
      "Gestão de resíduos",
      "Gestão de recursos naturais;",
      "Eficiência energética",
      "Uso racional da água",
      "Redução de desperdícios",
      "Indicadores ambientais",
      "Plano de melhoria ambiental",
      "Estratégias de economia circular"
    ]
  },
  {
    id: 5,
    imagem: ImgServicos5,
    titulo: "TREINAMENTOS E CAPACITAÇÃO ESG",
    descricao:
      "Capacitação de gestores, colaboradores e equipes sobre ESG aplicado à realidade da saúde.",
    subtituloLista: "Temas:",
    itens: [
      "ESG na saúde",
      "Sustentabilidade",
      "Gestão de riscos",
      "Ética e integridade",
      "Governança",
      "Responsabilidade social",
      "Gestão ambiental",
      "Cultura ESG",
      "Indicadores ESG",
      "Gestão de fornecedores",
      "Liderança sustentável"
    ],
    subdescricao: "Os treinamentos podem ser realizados de forma presencial ou online, com duração e conteúdo adaptados às necessidades da organização."
  },
  {
    id: 6,
    imagem: ImgServicos6,
    titulo: "ESG PARA INVESTIMENTOS E EXPANSÃO NA SAÚDE",
    descricao: "Avaliação de aspectos ESG para projetos de expansão, investimentos e novos empreendimentos no setor da saúde.",
    subtituloLista: "Analisamos:",
    itens: [
      "Riscos socioambientais",
      "Governança",
      "Impactos",
      "Oportunidades",
      "Viabilidade ESG",
      "Reputação",
      "Potenciais passivos",
      "Indicadores",
      "Estratégias de mitigação"
    ]
  },
  {
    id: 7,
    imagem: ImgServicos7,
    titulo: "CONSULTORIA ESG CONTINUADA",
    descricao: "A Terra Nova pode atuar de forma recorrente como parceira estratégica da organização.",
    subtituloLista: "Modelo de acompanhamento:",
    itens: [
      "Diagnóstico",
      "Estratégia",
      "Implementação",
      "Monitoramento",
      "Melhoria Contínua"
    ],
    subdescricao: "A consultoria continuada permite acompanhar indicadores, revisar metas, identificar novos riscos e apoiar a evolução da maturidade ESG da instituição."
  }
]

function Servicos() {
  const [expandedCards, setExpandedCards] = useState<number[]>([])

  const toggleExpand = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    )
  }

  const cardStyle: React.CSSProperties = {
    background: "#F5F2EB",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #E5E0D8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden"
  }

  const titleStyle: React.CSSProperties = {
    color: "#1B5E20",
    marginTop: 0,
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "700"
  }

  const listStyle: React.CSSProperties = {
    paddingLeft: "20px",
    margin: "8px 0 15px 0",
    lineHeight: "1.7"
  }

  return (
    <section style={{ background: "#FFFFFF", padding: "50px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            color: "#1B5E20",
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "36px"
          }}
        >
          Nossos Serviços
        </h1>

        {/* Grid Container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
            color: "#2C2C2C",
            alignItems: "start"
          }}
        >
          {servicosData.map((servico) => {
            const isExpanded = expandedCards.includes(servico.id)
            const limiteLinhas = 4 // Limite de linhas visíveis por card antes de expandir

            const lineClampStyle: React.CSSProperties = !isExpanded
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: limiteLinhas,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }
              : {}

            return (
              <div key={servico.id} style={cardStyle}>
                <div>
                  {/* Imagem */}
                  {servico.imagem && (
                    <img
                      src={servico.imagem}
                      alt={servico.titulo}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        display: "block"
                      }}
                    />
                  )}

                  {/* Conteúdo do Card */}
                  <div style={{ padding: "20px" }}>
                    <h3 style={titleStyle}>{servico.titulo}</h3>

                    {/* Bloco de texto com limitação de linhas */}
                    <div style={lineClampStyle}>
                      {servico.descricao && (
                        <p style={{ margin: "0 0 10px 0" }}>{servico.descricao}</p>
                      )}

                      {servico.subtituloLista && (
                        <p style={{ marginTop: "15px", fontWeight: "600" }}>
                          {servico.subtituloLista}
                        </p>
                      )}

                      {/* Renderização de itens simples */}
                      {servico.itens && (
                        <ul
                          style={{
                            ...listStyle,
                            ...(servico.id === 6
                              ? { listStyleType: "none", paddingLeft: 0 }
                              : {})
                          }}
                        >
                          {servico.itens.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}

                      {/* Renderização de seções com subitens */}
                      {servico.secoes &&
                        servico.secoes.map((secao, idx) => (
                          <div key={idx} style={{ marginTop: "10px" }}>
                            <strong style={{ color: "#1B5E20" }}>
                              {secao.subtitulo}
                            </strong>
                            <ul style={listStyle}>
                              {secao.itens.map((item, subIdx) => (
                                <li key={subIdx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}

                      {/* Subdescrição final ex: Card 5 */}
                      {servico.subdescricao && (
                        <p style={{ marginTop: "12px", fontSize: "14px", fontStyle: "italic", color: "#444" }}>
                          {servico.subdescricao}
                        </p>
                      )}
                    </div>  
                  </div>

                    {/* Botão Ver mais / Ver menos */}
                    <button
                      onClick={() => toggleExpand(servico.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1B5E20",
                        fontWeight: "bold",
                        cursor: "pointer",
                        padding: "8px 0 0 0",
                        textAlign: "left",
                        fontSize: "15px",
                        textDecoration: "underline"
                      }}
                    >
                      {isExpanded ? "Ver menos" : "Ver mais..."}
                    </button>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Servicos