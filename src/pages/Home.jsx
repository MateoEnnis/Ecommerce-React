import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import Carrusel from "../components/Carrusel";

function Home() {
  const [productos, setProductos] = useState([]);
  const [mensajeToast, setMensajeToast] = useState("");

  useEffect(() => {
    fetch("https://67df066290f846e7d62bd3ae.mockapi.io/api/v1/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  useEffect(() => {
    if (mensajeToast) {
      const timer = setTimeout(() => setMensajeToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensajeToast]);

  const agregarAlCarrito = (producto) => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carritoGuardado.find(item => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoGuardado.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
    setMensajeToast(`${producto.nombre} agregado al carrito`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Carrusel />

      {/* Sección "Sobre Nosotros" */}
      <section
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "2rem",
          margin: "2rem auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#111" }}>Sobre Nosotros</h2>
        <p style={{ fontSize: "1.1rem", color: "#444", lineHeight: "1.6" }}>
          En <strong>Buen Quilate</strong>, creamos piezas únicas y elegantes para aquellos que aprecian la belleza y la perfección.
          Con más de 20 años de experiencia en el mercado, nos enorgullece ofrecer diseños exclusivos y materiales de la más alta calidad.
        </p>
        <p style={{ fontSize: "1.1rem", color: "#444", lineHeight: "1.6", marginTop: "1rem" }}>
          Nuestra misión es capturar la esencia de cada momento especial a través de joyas excepcionales que perduran en el tiempo.
          Cada pieza es un reflejo de la pasión y la dedicación que ponemos en nuestro trabajo.
        </p>
      </section>

      <h2 style={{ textAlign: "center" }}>Productos</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center"
        }}
      >
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              width: "300px",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem"
              }}
            />
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#111" }}>{producto.nombre}</h3>
            <p style={{ margin: "0 0 0.5rem", color: "#555" }}><strong>Precio:</strong> ${producto.precio}</p>
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>{producto.descripcion}</p>
            <button onClick={() => agregarAlCarrito(producto)} style={{ marginBottom: "0.5rem" }}>
              Agregar al carrito
            </button>
            <Link to={`/detalle/${producto.id}`}>
              <button>Ver más</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Sección de ventajas */}
      <section
        style={{
          maxWidth: "900px",
          margin: "3rem auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem"
        }}
      >
        <div style={cardVentaja}>
          <h3 style={cardTitulo}>Calidad Superior</h3>
          <p style={cardTexto}>
            Utilizamos los mejores materiales para garantizar piezas únicas y duraderas.
          </p>
        </div>

        <div style={cardVentaja}>
          <h3 style={cardTitulo}>Diseños Exclusivos</h3>
          <p style={cardTexto}>
            Nuestras joyas están diseñadas con creatividad e innovación.
          </p>
        </div>
      </section>

      {mensajeToast && <Toast mensaje={mensajeToast} />}
    </div>
  );
}

// Estilos para las cards de ventaja
const cardVentaja = {
  flex: "1 1 300px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "1.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  textAlign: "center"
};

const cardTitulo = {
  fontSize: "1.2rem",
  color: "#111",
  marginBottom: "0.5rem"
};

const cardTexto = {
  fontSize: "1rem",
  color: "#555",
  lineHeight: "1.5"
};

export default Home;
