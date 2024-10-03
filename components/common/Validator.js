export const ValidateInput = (key,value) => {
    var state = false;

    switch (key){
        case 'name':
            let name = value.split(' ');
            if(name.length < 2){
              state =  false;
            }else{
              state =  true;
            }
        break;
        case 'string6':
            if(value.length < 6){
              state =  false;
            }else{
              state =  true;
            }
        break;
        case 'email':
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(String(value).toLowerCase())){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'birthday':
            let birth = value.split('.');
            if(birth.length != 3){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'phone':
            
            if(value.length < 9 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code1':
            if(value.length < 1 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code2':
            if(value.length < 2 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code3':
            
            if(value.length < 3 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code4':
            
            if(value.length < 4 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code6':
            
            if(value.length < 6 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code9':
            
            if(value.length < 9 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        case 'code16':
            
            if(value.length < 16 ){
                state =  false;
            }else{
                state =  true;
            }
        break;
        default:
            if(value.length < 1){
              state =  false;
            }else{
                state =  true;
            }
        break;
      }
    
      return state;
    
  }
  