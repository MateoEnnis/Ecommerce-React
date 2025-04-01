import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";


function Carrusel() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div id="carouselExampleIndicators" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://cdn.pixabay.com/photo/2016/06/17/09/54/woman-1462986_1280.jpg" className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="https://th.bing.com/th/id/OIP.LhVnPV2XnXtrNSTPV0C3UAHaFi?rs=1&pid=ImgDetMain" className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="https://okdiario.com/coolthelifestyle/img/2021/11/23/grace-kelly-getty.jpg" className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carrusel;
