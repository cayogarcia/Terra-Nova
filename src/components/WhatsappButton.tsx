import { FaWhatsapp } from "react-icons/fa"

function WhatsappButton() {

  const phone = "5514996830077"

  const message = "Olá Terra Nova, gostaria de saber mais sobre os seus serviços."

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (

    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#25D366",
        color: "#fff",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "32px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        textDecoration: "none",
        zIndex: 1000
      }}
    >
      <FaWhatsapp />
    </a>

  )
}

export default WhatsappButton