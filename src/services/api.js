import axios from "axios";

//configuração da nossa baseURL
const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",

});
export default api;
