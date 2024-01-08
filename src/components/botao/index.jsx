import "./style.css";

function Botao({ children, onclick, cor, type }) {
  return (
    <button
      style={{ backgroundColor: cor }}
      className="botaouniversal"
      type={type}
      onClick={(event) => onclick(event)}
    >
      {children}
    </button>
  );
}

export default Botao;
