import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";

export const newReservaTecnico = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/reserve/reservaTecnico`, value, {
      headers: headers,
    })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getAllReservaTecnico = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/reservaTecnico`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getAllReservaTecnicoReturn = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/reservaTecnico/return`, {
      headers: headers,
      params: { query },
    })
    .then((resp) => {
      response = resp;
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};
