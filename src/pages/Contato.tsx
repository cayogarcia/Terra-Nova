import background from "../assets/background.jpeg"

function Contato() {
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
          margin: "0 auto",
          color: "#A0AEC0",
          textAlign: "center"
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
          Contato
        </h1>

        <div style={{ marginBottom: "60px" }}>
          <p>Email: terranovagestaoderiscos@gmail.com</p>
          <p>Telefone: (14) 99683-0077</p>
        </div>

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
          Trabalhe Conosco
        </h1>

        <form
          action="https://formsubmit.co/terranovagestaoderiscos@gmail.com"
          method="POST"
          encType="multipart/form-data"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo *"
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="telefone"
            placeholder="Telefone *"
            required
            pattern="\([0-9]{2}\)\s[0-9]{5}-[0-9]{4}"
            title="Digite no formato: (XX) XXXXX-XXXX"
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail *"
            required
            style={inputStyle}
          />

          <input
            type="file"
            name="curriculo"
            accept=".pdf,.doc,.docx"
            required
            style={inputStyle}
          />

          <input
            type="hidden"
            name="_subject"
            value="Novo currículo - Terra Nova"
          />

          <input
            type="hidden"
            name="_captcha"
            value="false"
          />

          <button
            type="submit"
            style={{
              background: "#1B5E20",
              color: "#fff",
              padding: "12px 28px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "160px",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

const inputStyle = {
  width: "100%",
  maxWidth: "500px",
  height: "40px",
  padding: "0 15px",
  borderRadius: "8px",
  border: "1px solid #2D3748",
  background: "#1F2937",
  color: "#fff",
  fontSize: "16px"
}

export default Contato