import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: typeof window === 'undefined' ? `http://localhost:${process.env.PORT}` : '',
});
