import axios from "axios";
import { BACKEND_URL } from "./var";
import jsPDF from "jspdf";
import moment from "moment/min/moment-with-locales";
import { store } from "../App";

export const getProdutos = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/product`, { headers: headers, params: { query } })
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

export const getEquips = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/product/getEquipsByEntrance`, {
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

export const getItens = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/product/getAllNames`, {
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

export const getMarca = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/mark`, { headers: headers, params: { query } })
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

export const getFabricante = async (peca) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/manufacturer`, {
      headers: headers,
      params: { query: peca },
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

export const getTipo = async () => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/equipModel/getAllType`, {
      headers: headers,
      params: {},
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

export const newMarca = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/mark`, values, { headers: headers })
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

export const newTipo = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/equipModel/addType`, values, { headers: headers })
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

export const newFabricante = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/manufacturer`, values, { headers: headers })
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

export const newProduto = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/product`, values, { headers: headers })
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

export const updateProduto = async (values) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/product`, values, { headers: headers })
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

export const getProdutoByEstoque = async (query) => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username,
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/product/getProductByStockBase`, {
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

export const createPDF = async (products) => {
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    hotfixes: [], // an array of hotfix strings to enable
  });

  doc.setFontSize(10).text(148.5, 205, `Página 1`, "center");

  products.map((product, idx) => {
    let index = 0;
    let page = false;

    if (index === 0) {
      // title(doc);
    }
  });

  moment.locale("pt");

  doc.autoPrint();

  doc.save(`PRODUTOS_${moment().format("L")}.pdf`);
};
