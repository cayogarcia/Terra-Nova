import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WhatsappButton from "./components/WhatsappButton"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
      <WhatsappButton />
    </BrowserRouter>
  )
}

export default App