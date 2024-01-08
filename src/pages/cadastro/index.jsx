import { useState } from "react";
import Botao from "../../components/botao";
import PageContainer from "../../components/pagecontainer";
import LogoNeki from "../../assets/imagens/LogoNeki-1.png";
import { api } from "../../services/api/ServiceApi";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState(undefined);
  const [novaSenha, setNovaSenha] = useState(undefined);
  const [confirmaSenha, setConfirmaSenha] = useState(undefined);
  const navigate = useNavigate();

  function enviarFormulario(event) {
    event.preventDefault();
    if (novaSenha !== confirmaSenha) {
      return alert(
        `As senhas não conferem. Por favor verifique e tente novamente.`
      );
    }

    api
      .post("/usuario", {
        nomeUsuario: nomeUsuario,
        senha: novaSenha,
      })
      .then((response) => {
        if (response.status === 201) {
          alert(`Cadastro concuído com sucesso.`);
          navigate("/login");
        }
      })
      .catch((err) => alert(`Ocorreu algum erro ao realizar cadastro. ${err}`));
  }

  return (
    <PageContainer>
      <form className="form">
        <img src={LogoNeki} alt="Logo Neki" />
        <legend>Informações para Cadastro</legend>
        <label htmlFor="nomeid">Nome de Usuário </label>
        <input
          type="text"
          id="nomeid"
          placeholder="silvajp"
          value={nomeUsuario}
          required
          minLength={4}
          onChange={(e) => setNomeUsuario(e.target.value)}
        />

        <legend>Cadastrar senha</legend>
        <label htmlFor="senhaid">Senha</label>
        <input
          type="password"
          id="senhaid"
          placeholder="a@#43"
          value={novaSenha}
          required
          minLength={4}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <label htmlFor="confirmarsenhaid">Repita a senha</label>
        <input
          type="password"
          id="confirmarsenhaid"
          placeholder="a@#43"
          value={confirmaSenha}
          required
          minLength={4}
          onChange={(e) => setConfirmaSenha(e.target.value)}
        />

        <Botao onclick={enviarFormulario} cor="#00d5ff" type="button">
          Registrar-se
        </Botao>
      </form>
    </PageContainer>
  );
}
export default Cadastro;
