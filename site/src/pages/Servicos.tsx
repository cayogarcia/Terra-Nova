import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImgServicos1 from '../assets/card1.png'
import ImgServicos2 from '../assets/card2.jpeg'
import ImgServicos3 from '../assets/card3.png'
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
  itens?: string[]
  secoes?: SecaoSubitens[]
}

function Servicos() {
  const { t } = useTranslation()
  const [expandedCards, setExpandedCards] = useState<number[]>([])

  const servicosData: ServicoItem[] = [
    {
      id: 1,
      imagem: ImgServicos1,
      titulo: t("servicos.propostaValor.titulo"),
      descricao: t("servicos.propostaValor.descricao"),
      itens: [
        t("servicos.propostaValor.item1"),
        t("servicos.propostaValor.item2"),
        t("servicos.propostaValor.item3"),
        t("servicos.propostaValor.item4"),
        t("servicos.propostaValor.item5"),
        t("servicos.propostaValor.item6"),
        t("servicos.propostaValor.item7"),
        t("servicos.propostaValor.item8")
      ]
    },
    {
      id: 2,
      imagem: ImgServicos2,
      titulo: t("servicos.hospitalar.titulo"),
      descricao: t("servicos.hospitalar.descricao"),
      subtituloLista: t("servicos.hospitalar.subtituloLista"),
      secoes: [
        {
          subtitulo: t("servicos.hospitalar.eAmbiental"),
          itens: [
            t("servicos.hospitalar.envItem1"),
            t("servicos.hospitalar.envItem2"),
            t("servicos.hospitalar.envItem3"),
            t("servicos.hospitalar.envItem4"),
            t("servicos.hospitalar.envItem5"),
            t("servicos.hospitalar.envItem6")
          ]
        },
        {
          subtitulo: t("servicos.hospitalar.sSocial"),
          itens: [
            t("servicos.hospitalar.socItem1"),
            t("servicos.hospitalar.socItem2"),
            t("servicos.hospitalar.socItem3"),
            t("servicos.hospitalar.socItem4"),
            t("servicos.hospitalar.socItem5"),
            t("servicos.hospitalar.socItem6"),
            t("servicos.hospitalar.socItem7")
          ]
        },
        {
          subtitulo: t("servicos.hospitalar.gGovernanca"),
          itens: [
            t("servicos.hospitalar.govItem1"),
            t("servicos.hospitalar.govItem2"),
            t("servicos.hospitalar.govItem3"),
            t("servicos.hospitalar.govItem4"),
            t("servicos.hospitalar.govItem5"),
            t("servicos.hospitalar.govItem6"),
            t("servicos.hospitalar.govItem7")
          ]
        }
      ]
    },
    {
      id: 3,
      imagem: ImgServicos3,
      titulo: t("servicos.relatorios.titulo"),
      descricao: t("servicos.relatorios.descricao"),
      subtituloLista: t("servicos.relatorios.subtituloLista"),
      itens: [
        t("servicos.relatorios.item1"),
        t("servicos.relatorios.item2"),
        t("servicos.relatorios.item3"),
        t("servicos.relatorios.item4"),
        t("servicos.relatorios.item5"),
        t("servicos.relatorios.item6"),
        t("servicos.relatorios.item7"),
        t("servicos.relatorios.item8"),
        t("servicos.relatorios.item9")
      ],
      subdescricao: t("servicos.relatorios.subdescricao")
    },
    {
      id: 4,
      imagem: ImgServicos5,
      titulo: t("servicos.treinamentos.titulo"),
      descricao: t("servicos.treinamentos.descricao"),
      subtituloLista: t("servicos.treinamentos.subtituloLista"),
      itens: [
        t("servicos.treinamentos.item1"),
        t("servicos.treinamentos.item2"),
        t("servicos.treinamentos.item3"),
        t("servicos.treinamentos.item4"),
        t("servicos.treinamentos.item5"),
        t("servicos.treinamentos.item6"),
        t("servicos.treinamentos.item7"),
        t("servicos.treinamentos.item8"),
        t("servicos.treinamentos.item9"),
        t("servicos.treinamentos.item10"),
        t("servicos.treinamentos.item11")
      ],
      subdescricao: t("servicos.treinamentos.subdescricao")
    },
    {
      id: 5,
      imagem: ImgServicos6,
      titulo: t("servicos.investimentos.titulo"),
      descricao: t("servicos.investimentos.descricao"),
      subtituloLista: t("servicos.investimentos.subtituloLista"),
      itens: [
        t("servicos.investimentos.item1"),
        t("servicos.investimentos.item2"),
        t("servicos.investimentos.item3"),
        t("servicos.investimentos.item4"),
        t("servicos.investimentos.item5"),
        t("servicos.investimentos.item6"),
        t("servicos.investimentos.item7"),
        t("servicos.investimentos.item8"),
        t("servicos.investimentos.item9")
      ]
    },
    {
      id: 6,
      imagem: ImgServicos7,
      titulo: t("servicos.consultoria.titulo"),
      descricao: t("servicos.consultoria.descricao"),
      subtituloLista: t("servicos.consultoria.subtituloLista"),
      itens: [
        t("servicos.consultoria.item1"),
        t("servicos.consultoria.item2"),
        t("servicos.consultoria.item3"),
        t("servicos.consultoria.item4"),
        t("servicos.consultoria.item5")
      ],
      subdescricao: t("servicos.consultoria.subdescricao")
    }
  ]

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
    height: "100%",
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
          {t("servicos.tituloPrincipal")}
        </h1>

        {/* Grid Container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
            color: "#2C2C2C"
          }}
        >
          {servicosData.map((servico) => {
            const isExpanded = expandedCards.includes(servico.id)
            const limiteLinhas = 4

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

                  {/* Conteúdo do Card em Flexbox */}
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1
                    }}
                  >
                    <div>
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

                        {/* Subdescrição final */}
                        {servico.subdescricao && (
                          <p style={{ marginTop: "12px", fontSize: "14px", fontStyle: "italic", color: "#444" }}>
                            {servico.subdescricao}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Botão alinhado ao rodapé */}
                    <button
                      onClick={() => toggleExpand(servico.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1B5E20",
                        fontWeight: "bold",
                        cursor: "pointer",
                        padding: "16px 0 0 0",
                        textAlign: "left",
                        fontSize: "15px",
                        textDecoration: "underline",
                        marginTop: "auto"
                      }}
                    >
                      {isExpanded ? t("servicos.verMenos") : t("servicos.verMais")}
                    </button>
                  </div>
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