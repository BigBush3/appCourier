  
  
  export const formatDateSQL = (date) => {
    let arr = date.split(" ");
    if(arr.length < 2) arr.unshift(null);
    let time = arr[1].split(":") ;
    return [ arr[0], time[0]+":"+time[1] ]
  }
  
  
  export const formatDate = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('-');
  }
  
  export const formatDateDotsCurr = () => {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
   
    return [day, month, year].join('.');
  }

  export const formatDateLineBeforeCurMonth = (val) => {
    var d = new Date(),
    month = '' + (d.getMonth() + 1) - val,
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
   
    return [year, month, day].join('-');
  }

  export const formatDateLineCurr = () => {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
   
    return [year, month, day].join('-');
  }

  export const formatTimeCurr = () => {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    return hours+":"+minutes;
  }


  export const formatDateLine = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return  [year, month, day].join('-');
  }


  export const formatDateDots = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('.');
  }

  export const formatDateTimeDots = (date) => {

    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours(),
    minutes = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    return [day, month, year].join('.') + ", "+[hours, minutes].join(':');;
  }


  export const formatDateString = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() ),
    day = '' + d.getDate(),
    year = d.getFullYear();


    
    var months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    var week = ['пн', "вт", "ср", "чт","пт","сб","вс"];

    return day+' '+months[month]+', '+week[d.getDay()];
  }


  export const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  export const formatTimeSlice = (line) => {
    if(line != undefined){
      time = line.split(":");
      return time[0]+":"+time[1]
    }
      
   
     
  }
 
 
  
  export const formatDateArr = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() ),
    day = '' + d.getDate(),
    year = d.getFullYear();

    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    return [day, months[month], month, year];
  }

  export const formatDateTimeArr = (date) => {
    var d = new Date(date),
    month = '' + (d.getMonth() ),
    day = '' + d.getDate(),
    year = d.getFullYear();
    hour = d.getHours();
    min = d.getMinutes();

    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    return [day, months[month], month, year, hour, min];
  }

  export const getMonthNumber = (month) => {
    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь",  "Декабрь"];
    var _index = 0;
    months.map((item,index)=>{
      if(item == month) _index = index;
    });
    return _index;
  }
  

  export const sortDateArrByYear = (arr) => {
    var d = new Date(date),
    month = '' + (d.getMonth() ),
    day = '' + d.getDate(),
    year = d.getFullYear();

    var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Декабрь"];

    return [day, months[month], month, year];
  }

  