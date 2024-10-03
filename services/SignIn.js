import ENV from '../services/Env.js';


export const checkLogin = (_host,_log, _pass) => {
    //let log = log.toLowerCase().trim();

    return fetch('http://'+_host+'/ibm/user/login/' , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: _pass,
          login: _log,
        }),
   
      }).then((response) =>   response.json() );
}

export const checkLoginCourier = (_host,_log, _pass) => {
  //let log = log.toLowerCase().trim();

  return fetch('http://'+_host+'/ibm/courier/user/login/' , {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: _pass,
        login: _log,
      }),
 
    }).then((response) =>   response.json() );
}



export const setUserPushToken = (_host, _uid, _token) => {
  return fetch('http://'+_host+'/ibm/courier/user/token' , {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: _token,
        uid: _uid,
      }),
    }).then((response) => response.json());
}


export const restorePassword = (_phone, _password, _code) => {
  return fetch(ENV.API_URL+'/passwords/restore/sms' , {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: _code,
        password: _password,
        phone: _phone,
      }),
    }).then((response) => response.json());
}