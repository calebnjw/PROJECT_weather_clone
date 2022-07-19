import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
