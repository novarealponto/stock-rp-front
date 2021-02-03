import axios from "axios";

import { BACKEND_URL } from "./var";

export const signIn = async values => {
  let response = {};
  await axios
    .post(`${BACKEND_URL}/oapi/login`, values)
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
