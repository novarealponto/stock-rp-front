import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";

export const newReservaInterno = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/reserve/RInterno`, value, { headers: headers })
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

export const newReservaOs = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/reserve/OS`, values, { headers: headers })
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

export const updateReservaOs = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/reserve/OS`, values, { headers: headers })
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

export const getOsByOs = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/getOsByOs`, {
      headers,
      params: { os: value },
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

export const getTodasOs = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/Os`, {
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

export const getAllOsPartsByParams = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/getAllOsPartsByParams`, {
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

  console.log(response);
  return response;
};

export const getAllOsParts = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/getAllOsParts`, {
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

  console.log(response);
  return response;
};

export const getAllOsPartsByParamsForReturn = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/getAllOsPartsByParams/return`, {
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

  console.log(response);
  return response;
};

export const associarEquipParaOsPart = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(
      `${BACKEND_URL}/api/reserve/reservaTecnico/associarEquipParaOsPart`,
      values,
      { headers: headers }
    )
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

export const associarEquipsParaOsPart = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(
      `${BACKEND_URL}/api/reserve/reservaTecnico/associarEquipsParaOsPart`,
      values,
      { headers: headers }
    )
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

export const getTodasOsInterno = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/reserve/RInterno`, {
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

export const baixaReservaOs = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/reserve/output`, values, { headers: headers })
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

export const retornarBaixaReservaOs = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/reserve/returnOutput`, values, {
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

export const removeReservaOs = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .delete(`${BACKEND_URL}/api/reserve/Os`, {
      headers: headers,
      params: query,
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

export const newConserto = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/conserto`, values, { headers: headers })
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

export const checkout = async (value) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  try {
    return await axios.put(
      `${BACKEND_URL}/api/reserve/OS/finalizarCheckout`,
      value,
      {
        headers: headers,
      }
    );
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      console.log("Error", error.message);
    }
  }
};
