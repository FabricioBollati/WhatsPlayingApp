import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'a235269fa6225be0d9743f8892650f17',
    language: 'es-ES',
  },
});

export default movieDB;
