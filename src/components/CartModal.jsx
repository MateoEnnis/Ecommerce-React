import { useEffect, useState } from "react";

function CartModal({ visible, onClose }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(datos);
  }, [visible]);

  if (!visible) return null;

  const guardarCarrito = (nuevoCarrito) => {
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  const aumentarCantidad = (id) => {
    const actualizado = carrito.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    );
    guardarCarrito(actualizado);
  };

  const disminuirCantidad = (id) => {
    const actualizado = carrito
      .map(p =>
        p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      )
      .filter(p => p.cantidad > 0); // Elimina si cantidad es 0
    guardarCarrito(actualizado);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        color: "#000",
        padding: "1.5rem",
        borderRadius: "8px",
        width: "90%",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflowY: "auto",
        boxSizing: "border-box"
      }}>
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>🛒 Carrito de Compras</h3>

        {carrito.length === 0 ? (
          <p style={{ textAlign: "center" }}>El carrito está vacío</p>
        ) : (
          carrito.map((item) => (
            <div key={item.id} style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "1rem"
            }}>
              <strong>{item.nombre}</strong><br />
              {item.imagen && (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: "100%", maxHeight: "150px", objectFit: "cover", margin: "0.5rem 0", borderRadius: "6px" }}
                />
              )}
              Precio: ${item.precio}<br />
              Cantidad:
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button onClick={() => disminuirCantidad(item.id)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => aumentarCantidad(item.id)}>+</button>
              </div>
              <p style={{ marginTop: "0.5rem" }}>Subtotal: ${item.precio * item.cantidad}</p>
            </div>
          ))
        )}

        <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>Total: ${calcularTotal()}</p>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default CartModal;
