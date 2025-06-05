import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer style={footerStyle}>
      {/* Logo izquierda */}
      <div style={leftStyle}>
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </div>

      {/* Centro: información de contacto */}
      <div style={centerStyle}>
        <p style={textStyle}><strong>Tel:</strong> +598 92 123 456</p>
        <p style={textStyle}><strong>Email:</strong> contacto@buenquilate.com</p>
        <p style={textStyle}><strong>Dirección:</strong> 18 de Julio 1234, Montevideo</p>
      </div>

      {/* Derecha: redes sociales */}
      <div style={rightStyle}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={iconLink}>
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={iconLink}>
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={iconLink}>
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
}

// 🖌️ Estilos en línea
const footerStyle = {
  background: "var(--footer-bg)",
  color: "#fff",
  padding: "2rem 1rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1.5rem",
  textAlign: "center"
};

const leftStyle = {
  flex: "1",
  display: "flex",
  justifyContent: "flex-start"
};

const centerStyle = {
  flex: "2",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const rightStyle = {
  flex: "1",
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  fontSize: "1.5rem"
};

const iconLink = {
  color: "#fff",
  textDecoration: "none"
};

const textStyle = {
  margin: "0.2rem 0"
};

export default Footer;
