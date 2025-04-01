import { useEffect, useState } from "react";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: "",
    fecha: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const API_URL = "https://67df066290f846e7d62bd3ae.mockapi.io/api/v1/productos";

  const cargarProductos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const metodo = modoEdicion ? "PUT" : "POST";
    const url = modoEdicion ? `${API_URL}/${idEditar}` : API_URL;

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        categoria: "",
        fecha: ""
      });
      setModoEdicion(false);
      setIdEditar(null);
      cargarProductos();
    });
  };

  const handleEliminar = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => cargarProductos());
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setIdEditar(producto.id);
    setForm({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      categoria: producto.categoria,
      fecha: producto.fecha
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>{modoEdicion ? "Editar producto" : "Agregar nuevo producto"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required minLength={3} maxLength={40} />
        <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} required min={1} />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required minLength={10} />
        <input name="imagen" placeholder="URL de Imagen" value={form.imagen} onChange={handleChange} required pattern="https?://.+" />
        <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
        <button type="submit">{modoEdicion ? "Actualizar" : "Agregar"}</button>
      </form>

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.categoria}</td>
                <td>
                  <button onClick={() => handleEditar(p)}>Editar</button>
                  <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
