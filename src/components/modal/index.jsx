import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalNovaSkill({
  skills,
  levelOptions,
  setModalIsOpen,
  setSelectLevelOption,
  setSelectSkillOption,
  vincularSkill,
}) {
  console.log(levelOptions);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "fixed", zindex: 99 }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => setModalIsOpen(false)}>
          <Modal.Title>Vincular nova Skill</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="d-flex">
            <select
              id="skills"
              name="skill"
              onChange={(event) => setSelectSkillOption(event.target.value)}
            >
              <option selected value={null}></option>
              {skills?.map((skill) => {
                return (
                  <option key={skill.id} value={skill.id}>
                    {skill.nomeSkill}
                  </option>
                );
              })}
            </select>
            <select
              id="levels"
              name="level"
              onChange={(event) => setSelectLevelOption(event.target.value)}
            >
              <option selected value={null}></option>
              {levelOptions?.map((level) => {
                return (
                  <option key={level.id} value={level.descricao}>
                    {level.descricao}
                  </option>
                );
              })}
            </select>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => vincularSkill()}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalNovaSkill;
