import axios from 'axios';

const request = axios.create({
  timeout: 60000,
  timeoutErrorMessage:
    'Either your internet connect is not strong or you have no internet connection',
  baseURL:  "https://simba-test-api.herokuapp.com",
});

class Api {
  post = async (URL, data) => {
    try {
      let token = await localStorage.getItem('access-token');
      token = token || '';
      const res = await request.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
     console.log(err)
    }
  };

  delete = async (URL, query) => {
    try {
      let token = await localStorage.getItem('access-token');
      token = token || '';
      const res = await request.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      return err;
    }
  };


  get = async (URL) => {
    try {
      let token = await localStorage.getItem('access-token');
      token = token || '';
      const res = await request.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      console.log(err.message, 'get');
      return err;
    }
  };

  put = async (URL, data) => {
    try {
      let token = await localStorage.getItem('access-token');
      token = token || '';
      const res = await request.put(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {errorStatus: false, ...res};
    } catch (err) {
      return err;
    }
  };
}

export default new Api();