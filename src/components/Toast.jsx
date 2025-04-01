function Toast({ mensaje }) {
    return (
      <div style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        background: "#333",
        color: "#fff",
        padding: "0.8rem 1.2rem",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        zIndex: 9999
      }}>
        {mensaje}
      </div>
    );
  }
  
  export default Toast;
  