import axios from "axios";

const TIMEOUT_MS = 30000;

export const baseUrl = () =>
  typeof window === "undefined" ? `http://localhost:${process.env.PORT}` : "";

export default axios.create({
  withCredentials: true,
  baseURL: baseUrl(),
  timeout: TIMEOUT_MS,
});
