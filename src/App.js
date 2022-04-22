import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";
function App() {
  const [input, setInput] = useState(""); // busca cep
  const [cep, setCep] = useState({}); //renderizar enderecos na tela
  const [inputUf, setInputUf] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputAddress, setInputAdress] = useState("");
  const [searchCep, setSearchCep] = useState([]); //renderizar ceps encontrados na tela

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
  async function handleSearchCep() {
    if (inputUf === "" || inputAddress === "" || inputCity === "") {
      alert("Prencha os campos ");
      return;
    }
    try {
      const responseSearchCep = await api.get(
        `${inputUf}/${inputCity}/${inputAddress}/json`
      );
      console.log(responseSearchCep.data);
      setSearchCep(responseSearchCep.data);
    } catch {
      alert("Erro");
      setInputUf("");
      setInputAdress("");
      setInputCity("");
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
          <FiSearch size={25} color="#4e639e" />
        </button>
      </div>
      <div>
        <div className="containerSearch">
          <input
            type="text"
            placeholder="Digite o seu UF"
            value={inputUf}
            onChange={(event) => setInputUf(event.target.value)}
          />
        </div>
        <div className="containerSearch">
          <input
            type="text"
            placeholder="Digite a sua Cidade"
            value={inputCity}
            onChange={(event) => setInputCity(event.target.value)}
          />
        </div>
        <div className="containerSearch">
          <input
            type="text"
            placeholder="Digite o seu Logradouro"
            value={inputAddress}
            onChange={(event) => setInputAdress(event.target.value)}
          />
        </div>
        <button className="button" onClick={handleSearchCep}>
          <FiSearch size={25} color="#4e639e" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <div className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </div>
      )}
      {Object.keys(searchCep).length > 0 && (
        <div className="main">
          <h2>Ceps Encontrados:</h2>
          <ul>
            {searchCep.map((searchCeps) => (
              <li key={searchCeps.cep}>{searchCeps.cep}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
