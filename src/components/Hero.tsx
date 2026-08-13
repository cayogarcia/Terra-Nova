import homeImage from "../assets/home.png"

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
          width: "50%",
          height: "50%",
          objectFit: "cover",
          display: "block"
        }}
      />
    </section>
  )
}

export default Hero