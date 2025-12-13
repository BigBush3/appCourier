import ENV from "../services/Env.js";

export const getAvailables = (_host) => {
  console.log("http://" + _host + "/ibm/users/orders/list/availables");
  return fetch("http://" + _host + "/ibm/users/orders/list/availables", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getMyOrders = (_host) => {
  console.log("http://" + _host + "/ibm/users/orders/list/my");
  return fetch("http://" + _host + "/ibm/users/orders/list/my", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getAvailablesV2 = (_host, _date = "-1") => {
  console.log("http://" + _host + "/ibm/users/orders/list/availables_v2/");
  return fetch(
    "http://" + _host + "/ibm/users/orders/list/availables_v2/" + _date,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const getMyOrdersV2 = (_host, _date = "-1", _userId = "-1") => {
  console.log("http://" + _host + "/ibm/users/orders/list/my_v2/");
  return fetch(
    "http://" + _host + "/ibm/users/orders/list/my_v2/" + _date + "/" + _userId,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const getDoneOrders = (_host) => {
  console.log("http://" + _host + "/ibm/users/orders/list/done");
  return fetch("http://" + _host + "/ibm/users/orders/list/done", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const getOrderStatuses = (_host) => {
  console.log("http://" + _host + "/ibm/users/orders/status");
  return fetch("http://" + _host + "/ibm/users/orders/status", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const setOrderStatus = (_host, _orderId, _statusId) => {
  console.log(
    "http://" +
      _host +
      "/ibm/users/orders/set/status/" +
      _orderId +
      "/" +
      _statusId
  );
  return fetch(
    "http://" +
      _host +
      "/ibm/users/orders/set/status/" +
      _orderId +
      "/" +
      _statusId,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const addUserToOrder = (_host, _uid, _oid) => {
  console.log(
    "http://" + _host + "/ibm/users/orders/set/user/" + _uid + "/" + _oid
  );
  return fetch(
    "http://" + _host + "/ibm/users/orders/set/user/" + _uid + "/" + _oid,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const doneOrder = (_host, _oid) => {
  return fetch("http://" + _host + "/ibm/users/orders/done/" + _oid, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const payOrder = (_host, _сid, _type, _stat, _price) => {
  console.log(
    "http://" +
      _host +
      "/ibm/users/orders/price/" +
      _сid +
      "/" +
      _type +
      "/" +
      _stat +
      "/" +
      _price
  );
  return fetch(
    "http://" +
      _host +
      "/ibm/users/orders/price/" +
      _сid +
      "/" +
      _type +
      "/" +
      _stat +
      "/" +
      _price,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

export const getCoords = (_val) => {
  return fetch(
    "https://geocode-maps.yandex.ru/1.x/?apikey=1cc23b7d-036d-4b86-a7b2-2ea8a63809c9&format=json&geocode=" +
      _val,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};
