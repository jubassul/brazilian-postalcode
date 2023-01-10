import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";
import Img from "./img01.svg";
import Icon from "./icon01.svg";
function App() {
  const [inputCep, setInputCep] = useState("");
  const [inputUf, setInputUf] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const [searchAddress, setSearchAddress] = useState({}); //render address
  const [searchCep, setSearchCep] = useState([]); //render cep

  const [errorCep, setErrorCep] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);
  const [notFoundAddress, setNotFoundAddress] = useState(false);
  const [notFoundCep, setNotFoundCep] = useState(false);

  async function handleSearchAddress() {
    if (inputCep === "") {
      setErrorAddress(true);
      return;
    }
    try {
      const responseSearchAddress = await api.get(`${inputCep}/json`);
      setSearchAddress(responseSearchAddress.data);
    } catch {
      setNotFoundAddress(true);
      setInputCep("");
    }
  }
  async function handleSearchCep() {
    if (inputUf === "" || inputAddress === "" || inputCity === "") {
      setErrorCep(true);
      return;
    }
    try {
      const responseSearchCep = await api.get(
        `${inputUf}/${inputCity}/${inputAddress}/json`
      );
      setSearchCep(responseSearchCep.data);
    } catch {
      setNotFoundCep(true);
      setInputUf("");
      setInputAddress("");
      setInputCity("");
    }
  }

  return (
    <div className="container">
      <header>
        <div className="header">
          <h1 className="title">Brazil Postal Code</h1>
          <img src={Icon} className="icon" />
        </div>
        <p className="subtitle">
          Search brazilian postal code anywhere in the world
        </p>
      </header>

      <div className="content">
        <div className="containerSearchAddress">
          <h2>Search the address</h2>
          <div className="search-address">
            <input
              type="text"
              placeholder="Type the postal code"
              value={inputCep}
              onChange={(event) => setInputCep(event.target.value)}
              className="input-search-address"
            />
            <button className="button-address" onClick={handleSearchAddress}>
              <FiSearch className="search-img" size={25} color="#AA14F0" />
            </button>
          </div>
          {errorAddress ? <span>Preencha algum campo</span> : ""}
          {notFoundAddress ? <span>Não Encontrado</span> : ""}
          <img src={Img} />
        </div>
        <div className="containerSearchCep">
          <h2>Search the postal code</h2>
          <input
            type="text"
            placeholder="Type the UF"
            value={inputUf}
            onChange={(event) => setInputUf(event.target.value)}
            className="input-postal-code"
          />

          <input
            type="text"
            placeholder="Type the city"
            value={inputCity}
            onChange={(event) => setInputCity(event.target.value)}
            className="input-postal-code"
          />

          <input
            type="text"
            placeholder="Type the address"
            value={inputAddress}
            onChange={(event) => setInputAddress(event.target.value)}
            className="input-postal-code"
          />
          <button className="button-postal-code" onClick={handleSearchCep}>
            Search
          </button>
          {errorCep ? <span>Preencha algum campo</span> : ""}
          {notFoundCep ? <span>Não Encontrado</span> : ""}
        </div>
      </div>
      {Object.keys(searchAddress).length > 0 && (
        <div className="content-main">
          <div className="main">
            <h2>CEP: {searchAddress.cep}</h2>
            <span>Rua: {searchAddress.logradouro}</span>
            <span>Complemento: {searchAddress.complemento}</span>
            <span>Bairro: {searchAddress.bairro}</span>
            <span>
              {searchAddress.localidade} - {searchAddress.uf}
            </span>
          </div>
        </div>
      )}
      {Object.keys(searchCep).length > 0 && (
        <div className="content-main">
          <div className="main">
            <h2>Ceps Encontrados:</h2>
            <ul>
              {searchCep.map((searchCeps) => (
                <li key={searchCeps.cep}>{searchCeps.cep}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
