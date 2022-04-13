import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
function App() {
  const [input, setInput] = useState("");

  function handleSearch() {
    alert(" valor do input " + input);
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
      <main className="main">
        <h2>CEP: 11111111</h2>
        <span>Rua Teste</span>
        <span>Complemento: teste</span>
        <span>Bairro: Teste</span>
        <span>Vitória- ES</span>
      </main>
    </div>
  );
}

export default App;
