import axios from 'axios';

export default axios.create({
  baseURL: `https://script.googleusercontent.com/macros/echo?user_content_key=${process.env.REACT_APP_API_KEY}`
});
