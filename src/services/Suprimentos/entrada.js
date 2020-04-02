import axios from "axios";
import { store } from "../../App";
import { BACKEND_URL } from "../var";

export const NovaEntrada = async values => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/suprimentos/entrance`, values, {
      headers: headers
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const GetEntrance = async query => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/suprimentos/entrance`, {
      headers: headers,
      params: { query }
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};
