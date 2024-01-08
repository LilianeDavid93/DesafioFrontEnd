import Cadastro from "./pages/cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Global.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/home/:id" element={<Home />} />
      <Route path="*" element={<h1>Pagina Não Encontrada</h1>} />
    </Routes>
  );
}

export default App;
