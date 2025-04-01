import { useState, useEffect, Fragment } from "react";

function Register() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    fecha: ""
  });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const API_URL = "https://67df066290f846e7d62bd3ae.mockapi.io/api/v1/usuarios";

  const cargarUsuarios = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  };

  useEffect(() => {
    cargarUsuarios();
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
      setForm({ nombre: "", email: "", password: "", fecha: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarUsuarios();
    });
  };

  const handleEditar = (usuario) => {
    setModoEdicion(true);
    setIdEditar(usuario.id);
    setForm({
      nombre: usuario.nombre || "",
      email: usuario.email || "",
      password: usuario.password || "",
      fecha: usuario.fecha || ""
    });
  };

  const handleEliminar = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => cargarUsuarios());
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>{modoEdicion ? "Editar Usuario" : "Registro de Usuario"}</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required minLength={3} maxLength={30} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required minLength={4} />
        <input name="fecha" type="date" value={form.fecha || ""} onChange={handleChange} required />
        <button type="submit">{modoEdicion ? "Actualizar" : "Registrar"}</button>
      </form>

      <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.fecha}</td>
                <td>
                  <Fragment>
                    <button onClick={() => handleEditar(usuario)}>Editar</button>
                    <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
                  </Fragment>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Register;
