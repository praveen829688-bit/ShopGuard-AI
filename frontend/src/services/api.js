import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api"
});

export const getProducts = (search = "") =>
  API.get(
    `/products?search=${encodeURIComponent(search)}`
  );

export const getProduct = (id) =>
  API.get(`/products/${id}`);

export const getDecision = (id, budget = "") =>
  API.get(
    `/decision/${id}${budget ? `?budget=${budget}` : ""}`
  );

export const getFullAnalysis = (
  id,
  budget = ""
) =>
  API.get(
    `/analyze/${id}${budget ? `?budget=${budget}` : ""}`
  );

export const getRecommendations = (
  budget = ""
) =>
  API.get(
    `/recommendations${budget ? `?budget=${budget}` : ""}`
  );

export const askAI = (message) =>
  API.post(
    "/assistant",
    { message }
  );

export default API;
