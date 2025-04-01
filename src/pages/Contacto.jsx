function Contacto() {
    return (
      <div className="container-app">
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Contacto</h2>
  
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "600px",
            margin: "0 auto 3rem",
          }}
        >
          <input type="text" placeholder="Nombre" required minLength={2} maxLength={50} />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Mensaje" rows={5} required minLength={10}></textarea>
          <button type="submit">Enviar</button>
        </form>
  
        <div style={{ textAlign: "center" }}>
          <h3>Encontranos acá:</h3>
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.857793657768!2d-56.16297732504268!3d-34.90111267284121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a6259db92b8165%3A0x56ed6f0a879d7531!2sMontevideo%2C%20Uruguay!5e0!3m2!1ses!2suy!4v1711482021043!5m2!1ses!2suy"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }
  
  export default Contacto;
  