import Config from './config';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Fetch = async (type, endpoint, body, token, auth) => {
  let response;
  let error = null;
  const url = `${Config.url}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    // Accept: "application/json",
  };

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  var config = {
    method: type,
    url: url,
    headers: headers,
    auth,
  };

  if (body) {
    config = { ...config, data: JSON.stringify(body) };
  }

  await axios(config)
    .then(async (res) => {
      response = await res.data;
      console.log(response);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 401) {
          error = {
            statusCode: 401,
            message: err.response.data.message,
          };
        } else {
          error = err;
        }
      } else {
        error = err;
      }
      return [response, error];
    });
  return [response, error];
};

export default Fetch;
