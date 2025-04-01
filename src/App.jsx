import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Detalle from "./pages/Detalle";
import InfoEmpresa from "./components/InfoEmpresa";
import Contacto from "./pages/Contacto";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<Admin />} />
          <Route path="detalle/:id" element={<Detalle />} />
          <Route path="info" element={<InfoEmpresa />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
