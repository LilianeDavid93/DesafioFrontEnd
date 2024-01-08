import { useEffect, useState, useContext } from "react";
import PageContainer from "../../components/pagecontainer";
import Botao from "../../components/botao";
import ModalNovaSkill from "../../components/modal";
import LogoNeki from "../../assets/imagens/LogoNeki-1.png";
import "./style.css";
import Levels from "../../assets/levels.json";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { api } from "../../services/api/ServiceApi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UsuarioSkillsModel = [
  {
    usuarioSkillId: 0,
    skill: {
      id: 0,
      nomeSkill: "",
    },
    level: "",
    isEdit: false,
  },
];

function Home() {
  const [usuarioSkills, setUsuarioSkills] = useState(UsuarioSkillsModel);
  const [levelOptions] = useState(Levels);
  const [selectLevelOption, setSelectLevelOption] = useState(null);
  const [selectSkillOption, setSelectSkillOption] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [skills, setSkills] = useState();
  const { id } = useParams();
  const { usuarioLogado } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/usuarioskill/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setUsuarioSkills(
            response.data.map((skill) => {
              return {
                ...skill,
                isEdit: false,
              };
            })
          );

          setLoading(false);
          setRefresh(false);
          return;
        }
      })
      .catch((err) =>
        alert(
          `Ocorreu um erro ao buscar usuario skill, tente novamente verificando o id.${err}`
        )
      );
  }, [refresh]);

  useState(() => {
    api
      .get(`/skills`)
      .then((response) => {
        if (response.status == 200) {
          setSkills(response.data);
          setLoading(false);
          setRefresh(false);
          return;
        }
      })
      .catch((err) =>
        alert(`Ocorreu um erro ao buscar skill, tente novamente.${err}`)
      );
  }, []);

  function updateLevel(usuarioSkillId) {
    if (selectLevelOption == null || selectLevelOption == undefined) {
      return alert(`Opção de level deve ser informada.`);
    }

    api
      .put(`usuarioskill/${usuarioSkillId}`, {
        usuarioSkillId: usuarioSkillId,
        novoLevel: selectLevelOption,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(`Update ${usuarioSkillId} para o level ${selectLevelOption}`);
          setRefresh(true);
          resetarStates();
        }
      })
      .catch((err) =>
        alert(
          `Ocorreu um erro ao atualizar usuario skill, tente novamente verificando o id.${err}`
        )
      );
  }

  function deleteSkill(usuarioSkillId) {
    let skill = usuarioSkills.find((e) => e.usuarioSkillId === usuarioSkillId);
    if (confirm(`Deseja realmente excluir a Skill ${skill.skill.nomeSkill}`)) {
      api
        .delete(`usuarioskill/${skill.usuarioSkillId}`)
        .then((response) => {
          if (response.status === 204) {
            alert("Excluido com sucesso");
            setRefresh(true);
          }
        })
        .catch((err) => alert(`Ocorreu um erro ao deletar skill.${err}`));
    }
  }

  function handlePerfilEditSkill(id, value) {
    setUsuarioSkills(
      usuarioSkills.map((skill) => {
        if (skill.usuarioSkillId === id) {
          return {
            ...skill,
            isEdit: value,
          };
        }
        return { ...skill };
      })
    );
  }

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function sair() {
    if (confirm(`Deseja realmente sair?`)) {
      localStorage.removeItem("usuarioAutenticado");
      navigate("/login");
    }
  }

  function resetarStates() {
    setSelectLevelOption(null);
    setSelectSkillOption(null);
    setModalIsOpen(false);
  }

  function vincularSkill() {
    if (selectLevelOption !== null && selectSkillOption !== null) {
      api
        .post("usuarioskill/associar", {
          usuarioId: usuarioLogado.id,
          skillId: selectSkillOption,
          level: selectLevelOption,
        })
        .then((response) => {
          if (response.status === 201) {
            setModalIsOpen(false);
            alert(
              `Novo vinculo registrado ${selectSkillOption} - ${selectLevelOption}`
            );
            resetarStates();
            setRefresh(true);
            return;
          }

          return alert(
            `Não foi possivel vincular a skill ${selectSkillOption}. Verifique se a skill já não está associada.`
          );
        })
        .catch((err) => {
          return alert(
            `Não foi possivel vincular a skill ${selectSkillOption}. Verifique se a skill já não está associada.`
          );
        });
      return;
    }

    return alert(`Valores inávalido. Skill e Level são obrigatorios.`);
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <PageContainer>
      {modalIsOpen ? (
        <ModalNovaSkill
          skills={skills}
          levelOptions={Levels}
          setModalIsOpen={setModalIsOpen}
          setSelectSkillOption={setSelectSkillOption}
          setSelectLevelOption={setSelectLevelOption}
          vincularSkill={vincularSkill}
        />
      ) : (
        ""
      )}
      <div className="header">
        <div className="conteudo-esquerda">
          <img src={LogoNeki} alt="Logo Neki" />
          <span>{`Olá, ${usuarioLogado.nomeUsuario}`}</span>
        </div>
        <div className="conteudo-direita">
          <Botao onclick={openModal} type="button" cor="#00d5ff">
            Novo +
          </Botao>
        </div>
      </div>
      <h1>Suas Skills</h1>
      <div className="tabela-container">
        <table>
          <th>#ID</th>
          <th>SKILL</th>
          <th>LEVEL</th>
          <th colSpan={2}>AÇÕES</th>
          <tbody>
            {usuarioSkills.length > 0 ? (
              usuarioSkills.map((habilidade, index) => {
                return (
                  <tr key={index}>
                    <td>{habilidade.skill.id}</td>
                    <td>{habilidade.skill.nomeSkill}</td>
                    <td>
                      {habilidade.isEdit ? (
                        <select
                          id="levels"
                          name="level"
                          onChange={(e) => setSelectLevelOption(e.target.value)}
                        >
                          <option value={null}></option>
                          {levelOptions.map((level) => {
                            return (
                              <option key={level.id} value={level.descricao}>
                                {level.descricao}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        habilidade.level
                      )}
                    </td>
                    <td className="icon">
                      {habilidade.isEdit ? (
                        <FaCheckCircle
                          id="confirm"
                          onClick={() => updateLevel(habilidade.usuarioSkillId)}
                        />
                      ) : (
                        <FiEdit
                          onClick={() =>
                            handlePerfilEditSkill(
                              habilidade.usuarioSkillId,
                              true
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="icon" id="trash">
                      {habilidade.isEdit ? (
                        <MdCancel
                          onClick={() =>
                            handlePerfilEditSkill(
                              habilidade.usuarioSkillId,
                              false
                            )
                          }
                        />
                      ) : (
                        <BsTrash
                          onClick={() => deleteSkill(habilidade.usuarioSkillId)}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <span>Você não possui habilidades cadastradas.</span>
            )}
          </tbody>
        </table>
      </div>
      <footer>
        <Botao
          cor="#ff2c2c"
          type="button"
          id="botao-sair"
          onclick={() => sair()}
        >
          Sair
        </Botao>
      </footer>
    </PageContainer>
  );
}

export default Home;
