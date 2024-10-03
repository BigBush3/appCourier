import ENV from '../services/Env.js';

 
export const getAll = (_host) => {
  console.log('http://'+_host+'/ibm/users/all/');

    return fetch('http://'+_host+'/ibm/users/all/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) =>{
        //console.log(response);
        return response.json();
      } );
  }

  export const getIncomeMonth = (_host, _sm, _em) => {
    console.log('http://'+_host+'/ibm/users/stat/income/month/'+_sm+'/'+_em );
      return fetch('http://'+_host+'/ibm/users/stat/income/month/'+_sm+'/'+_em, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
    }

    export const getIncomeDay = (_host, _day) => {
      console.log('http://'+_host+'/ibm/users/stat/income/day/'+_day);
        return fetch('http://'+_host+'/ibm/users/stat/income/day/'+_day, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((response) => response.json());
      }
    
  
      export const getIncomeFull = (_host, _start, _end, _point) => {
           
            return fetch('http://'+_host+'/ibm/users/stat/income/full/'+_start+'/'+_end+'/'+_point, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then((response) => response.json());
        }

      export const getIncomeShop = (_host, _start, _end, _point) => {
          console.log('http://'+_host+'/ibm/users/stat/income/shop/'+_start+'/'+_end+'/'+_point);
          return fetch('http://'+_host+'/ibm/users/stat/income/shop/'+_start+'/'+_end+'/'+_point, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          }).then((response) => response.json());
      }
      

      export const getIncomeUser = (_host, _start, _end, _user) => {
        console.log('http://'+_host+'/ibm/users/stat/income/user/'+_start+'/'+_end+'/'+_user);
        return fetch('http://'+_host+'/ibm/users/stat/income/user/'+_start+'/'+_end+'/'+_user, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json());
    }
    

