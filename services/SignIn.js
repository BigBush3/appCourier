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



export const setUserPushToken = async (_host, _uid, _token) => {
  const url = 'http://'+_host+'/ibm/courier/user/token';
  const body = JSON.stringify({
    token: _token,
    uid: _uid,
  });

  console.log('setUserPushToken request:', url, body);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  });

  const text = await response.text();

  console.log('setUserPushToken response:', response.status, text);

  if (!response.ok) {
    throw new Error('setUserPushToken failed: '+response.status+' '+text);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
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