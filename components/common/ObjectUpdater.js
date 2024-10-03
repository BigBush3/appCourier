export const ObjectUpdater = (object,key,value) => {
    if (key in object){
        object[key] = value;
    } else {
        object[key] = value;
    }
    return object; 
  }
  
  export const ObjectAdder = (object,key,value) => {
    object[key] = value;

    return object; 
  }