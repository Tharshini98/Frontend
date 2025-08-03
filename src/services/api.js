import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecommerce-backend-imft.onrender.com", 
});

export default instance;
