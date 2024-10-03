import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = (key, value) => {
  let val = JSON.stringify(value);
  return AsyncStorage.setItem(key, val);
};

export const retrieveData = (key) => {
  return AsyncStorage.getItem(key).then((response) => JSON.parse(response));
};

export const uploadImageAsync = (_host, uri) => {
  let _filename = uri.split("/").pop();
  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  _filename = _filename.split(".");
  let formData = new FormData();
  let apiUrl = "http://" + _host + "/ibm/image/add/";
  let fileTypeExt = "image";
  if (
    fileType == "jpg" ||
    fileType == "jpeg" ||
    fileType == "png" ||
    fileType == "gif"
  ) {
    fileTypeExt = "image";
  } else {
    fileTypeExt = "application";
  }

  formData.append("file", {
    uri,
    extension: fileType,
    type: fileTypeExt + `/${fileType}`,
    name: _filename[0],
  });
  return fetch(apiUrl, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => response.json());
};

export const addImageItem = (_host, _data) => {
  return fetch("http://" + _host + "/ibm/users/orders/image/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_data),
  }).then((response) => response.text());
};

export const getAllImages = (_host, _id) => {
  console.log("http://" + _host + "/ibm/users/orders/images/all/" + _id);
  return fetch("http://" + _host + "/ibm/users/orders/images/all/" + _id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const delImageItem = (_host, _id) => {
  console.log("http://" + _host + "/ibm/items/del/images/" + _id);
  return fetch("http://" + _host + "/ibm/items/del/images/" + _id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};
