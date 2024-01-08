import { useContext } from "react";

import LogoNeki from "../../assets/imagens/LogoNeki-1.png";

import Botao from "../../components/botao";
import PageContainer from "../../components/pagecontainer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api/ServiceApi";

import "./style.css";

export default function Login() {
  const { login, setLogin, senha, setSenha, setUsuarioLogado } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function realizarLogin() {
    if (login == "" || senha == "") {
      return alert("Preencha os campos corretamente!");
    }

    api
      .post("/usuario/login", { nomeUsuario: login, senha: senha })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "usuarioAutenticado",
            JSON.stringify(response.data)
          );
          setUsuarioLogado(response.data);
          navigate(`/home/${response.data.id}`);
          return;
        }

        return alert(
          `Não foi possivel realizar o login, por favor tente novamente. ${response.status}`
        );
      })
      .catch((err) => {
        return alert("Erro ao realizar login");
      });
  }

  return (
    <PageContainer>
      <form className="form">
        <img src={LogoNeki} alt="Logo Neki" />
        <legend>Acessar</legend>
        <label>
          Nome de usuário
          <input
            type="text"
            placeholder="Digite seu nome de usuario..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        <Botao onclick={realizarLogin} cor="#00d5ff" type="button">
          Entrar
        </Botao>
        <span style={{ fontSize: "1.3rem" }}>
          Ainda não possui cadastro? Registre-se{" "}
          <span
            style={{
              color: "#1b8dff",
              cursor: "pointer",
            }}
            onClick={() => navigate("/cadastro")}
          >
            aqui
          </span>
        </span>
      </form>
    </PageContainer>
  );
}
