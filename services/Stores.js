import ENV from '../services/Env.js';

export const getAllList = (_host) => {
 
    return fetch('http://'+_host+'/ibm/items/list/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json());
  }


  export const getAllMeasure = (_host) => {
    //console.log(_token, _id);
      return fetch('http://'+_host+'/ibm/items/measure/list/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
  }
  
  export const getAllPrice = (_host) => {
    //console.log(_token, _id);
      return fetch('http://'+_host+'/ibm/items/price/list/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
  }


  export const getAllListGroup = (_host, _gid, _sid, _s, _e) => {
    //console.log(_token, _id);
    console.log('http://'+_host+'/ibm/items/list/group/'+ _gid)
      return fetch('http://'+_host+'/ibm/items/list/group/'+ _gid+'/'+_sid+'/'+_s+'/'+_e, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
    }
   
    export const searchProducts = (_host, _key) => {
      console.log('http://'+_host+'/ibm/items/search/'+ _key)
        return fetch('http://'+_host+'/ibm/items/search/'+ _key, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((response) => response.json());
      }

      export const updatePrice = (_host, _pid, _price) => {
          console.log('http://'+_host+'/ibm/items/price/update/'+ _pid+'/'+_price)
          return fetch('http://'+_host+'/ibm/items/price/update/'+ _pid+'/'+_price, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json());
        }

          

      export const addItem = (_host, _data) => {
          return fetch('http://'+_host+'/ibm/items/info/add' , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(_data),
            }).then((response) => response.json());
      }

      export const updateItem = (_host, _data) => {
          
          return fetch('http://'+_host+'/ibm/items/info/update' , {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(_data),
            }).then((response) => response.json());
      }

      export const addCategory = (_host, _name, _pid) => {
        return fetch('http://'+_host+'/ibm/items/add/category' , {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:  _name,
                pid: _pid,
            }),
          }).then((response) => response.json());
      }
     
      