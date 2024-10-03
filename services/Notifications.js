import ENV from '../services/Env.js';

export const getNotifications = (_token, type) => {
    return fetch(ENV.API_URL+'/client/notifications?read='+type+'&sortType=DATE&sortOrder=ASC&page=0&limit=50' , {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+_token,
        }
      }).then((response) => response.json());
  }

  export const readNotifications = (_token, _id) => {
    return fetch(ENV.API_URL+'/client/notifications/read' , {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+_token,
        },
        body: JSON.stringify(
             [ _id ]
        ),
      }).then((response) => response.json());
  }


 