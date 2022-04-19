import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});
  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum cep");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
    } catch {
      alert("Ops, erro ao buscar");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>
      <div className="containerSearch">
        <input
          type="text"
          placeholder="Digite o seu Cep"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="button" onClick={handleSearch}>
          <FiSearch size={25} color="#8eb695" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}{" "}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
