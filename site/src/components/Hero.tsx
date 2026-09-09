import homeImage from "../assets/imgTerraNovaImpacto.jpg"

function Hero() {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "calc(100vh - 140px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "0"
      }}
    >
      <img
        src={homeImage}
        alt="Terranova"
        style={{
          width: "70%",
          height: "70%",
          objectFit: "cover",
          display: "block"
        }}
      />
    </section>
  )
}

export default Hero