import ENV from '../services/Env.js';

export const getAvailables = (_host) => {
  console.log('http://' + _host + '/ibm/users/orders/list/availables');
  return fetch('http://' + _host + '/ibm/users/orders/list/availables', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
}

export const addUserToOrder = (_host, _uid, _oid) => {
  console.log('http://' + _host + '/ibm/users/orders/set/user/'+_uid+'/'+_oid);
  return fetch('http://' + _host + '/ibm/users/orders/set/user/'+_uid+'/'+_oid, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
}

export const doneOrder = (_host, _oid) => {
  return fetch('http://' + _host + '/ibm/users/orders/done/'+_oid, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
}


export const payOrder = (_host, _сid, _type, _stat, _price ) => {
  console.log('http://' + _host + '/ibm/users/orders/price/'+_сid+'/'+ _type +'/'+_stat+"/"+_price);
  return fetch('http://' + _host + '/ibm/users/orders/price/'+_сid+'/'+ _type +'/'+_stat+"/"+_price, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
}

export const getCoords = (_val) => {
  return fetch('https://geocode-maps.yandex.ru/1.x/?apikey=1cc23b7d-036d-4b86-a7b2-2ea8a63809c9&format=json&geocode=' + _val, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json());
}


