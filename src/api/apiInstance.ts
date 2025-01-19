import axios from 'axios';

const apiService = process.env.API_SERVICE ? process.env.API_SERVICE : '';
const apiKey = process.env.API_KEY ? process.env.API_KEY.trim() : '';

export const apiInstance = axios.create({
  baseURL: apiService,
  headers: {
    'x-api-key': apiKey,
  },
});
