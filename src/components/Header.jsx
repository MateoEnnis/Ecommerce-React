import { Link } from "react-router-dom";
import { useState } from "react";
import CartModal from "./CartModal";
import logo from "../assets/logo.png";

function Header() {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header style={headerStyle}>
      <div style={topBarStyle}>
        {/* Logo + hamburguesa */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Link>
          <button onClick={toggleMenu} className="menu-toggle" style={hamburguesaBtn}>
            ☰
          </button>
        </div>

        {/* Menú normal horizontal en pantallas grandes */}
        <nav className="menu-horizontal">
          <Link to="/" style={linkStyle}>Inicio</Link>
          <Link to="/register" style={linkStyle}>Registro</Link>
          <Link to="/admin" style={linkStyle}>Admin</Link>
          <Link to="/info" style={linkStyle}>Empresa</Link>
          <Link to="/contacto" style={linkStyle}>Contacto</Link>
        </nav>

        {/* Carrito */}
        <button
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
          style={carritoBtn}
        >
          🛒 Carrito
        </button>
      </div>

      {/* Sidebar mobile */}
      <nav className={`menu-sidebar ${menuAbierto ? "abierto" : ""}`}>
        <Link to="/" onClick={cerrarMenu} style={linkStyle}>Inicio</Link>
        <Link to="/register" onClick={cerrarMenu} style={linkStyle}>Registro</Link>
        <Link to="/admin" onClick={cerrarMenu} style={linkStyle}>Admin</Link>
        <Link to="/info" onClick={cerrarMenu} style={linkStyle}>Empresa</Link>
        <Link to="/contacto" onClick={cerrarMenu} style={linkStyle}>Contacto</Link>
      </nav>

      <CartModal visible={mostrarCarrito} onClose={() => setMostrarCarrito(false)} />
    </header>
  );
}

// Estilos
const headerStyle = {
  background: "#222",
  color: "white",
  padding: "1rem 2rem",
  position: "relative",
  zIndex: 1000
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap"
};

const carritoBtn = {
  background: "transparent",
  color: "white",
  border: "1px solid white",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer"
};

const hamburguesaBtn = {
  background: "transparent",
  color: "white",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  display: "none"
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "0.8rem 1rem",
  display: "block"
};

export default Header;
