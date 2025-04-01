import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://67df066290f846e7d62bd3ae.mockapi.io/api/v1/productos/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => {
        setProducto(data);
        setError(false);
      })
      .catch(err => {
        console.error("Error al cargar producto:", err);
        setError(true);
      });
  }, [id]);

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(p => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
  };

  if (error) return <p style={{ padding: "2rem", color: "red" }}>❌ Producto no encontrado.</p>;
  if (!producto) return <p style={{ padding: "2rem" }}>Cargando producto...</p>;

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "800px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    }}>
      <h2 style={{ textAlign: "center" }}>{producto.nombre}</h2>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
      />
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <p><strong>Fecha:</strong> {producto.fecha}</p>
      <button
        onClick={agregarAlCarrito}
        style={{
          padding: "0.75rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Detalle;
