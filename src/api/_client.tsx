import axios from "axios";

export const baseUrl = () =>
  typeof window === "undefined" ? `http://localhost:${process.env.PORT}` : "";

export default axios.create({
  withCredentials: true,
  baseURL: baseUrl(),
});
