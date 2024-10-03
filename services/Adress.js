import ENV from '../services/Env.js';

export const getAdressAutocompleat = (line) => {
  //'https://maps.google.com/maps/api/geocode/json?address='+line+'&sensor=false&&key=AIzaSyALAyqXWQ1p2wXmy6eRlJaxyPZTLlThNes'
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+line+'&language=ru&key=AIzaSyALAyqXWQ1p2wXmy6eRlJaxyPZTLlThNes'
    return fetch( 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+line+'&language=ru&key=AIzaSyALAyqXWQ1p2wXmy6eRlJaxyPZTLlThNes' , {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json());
  }