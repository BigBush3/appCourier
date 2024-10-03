import ENV from '../services/Env.js';

export const getAllList = (_host) => {
    console.log('http://'+_host+'/ibm/docs/get/all');

    return fetch('http://'+_host+'/ibm/docs/get/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json());
  }

  export const getAllListDate = (_host, _d1, _d2) => {
    console.log('http://'+_host+'/ibm/docs/get/date/'+_d1+'/'+_d2);

    return fetch('http://'+_host+'/ibm/docs/get/date/'+_d1+'/'+_d2, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json());
  }

  

  export const getAllTypes = (_host) => {
    //console.log(_token, _id);
      return fetch('http://'+_host+'/ibm/docs/get/types', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
    }
  
    export const getAllPoints = (_host) => {
      //console.log(_token, _id);
        return fetch('http://'+_host+'/ibm/docs/get/points', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((response) => response.json());
      }

      export const getAllItems = (_host) => {
        //console.log(_token, _id);
          return fetch('http://'+_host+'/ibm/docs/get/items', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json());
        }

        export const addItemToDoc = (_host, _id, _did,  _amount, _price, _total) => {
          console.log('http://'+_host+'/ibm/docs/add/item/'+_id+'/'+_did+'/'+_amount+'/'+_price+'/'+_total);
            return fetch('http://'+_host+'/ibm/docs/add/item/'+_id+'/'+_did+'/'+_amount+'/'+_price+'/'+_total, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
              }).then((response) => response.json());
          }

          export const deleteDoc = (_host, _id) => {
      
              return fetch('http://'+_host+'/ibm/docs/delete/item/'+_id, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
                }).then((response) => response.json());
            }
  
    export const sendDoc = (_host, _id) => {
      console.log('http://'+_host+'/ibm/docs/send/'+_id);
      
       return fetch('http://'+_host+'/ibm/docs/send/'+_id, {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
      }).then((response) => response.json());
    }    
    

  export const updateDoc = (_host, _data) => {
      return fetch('http://'+_host+'/ibm/docs/edit' , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(_data),
        }).then((response) => response.json());
  }

  export const addDoc= (_host, _data) => {
    return fetch('http://'+_host+'/ibm/docs/add' , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(_data),
      }).then((response) => response.json());
}
  
    