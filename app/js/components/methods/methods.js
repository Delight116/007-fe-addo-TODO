let GetPriorityColor = (priority)=>{
  const color = ['red', 'orange', 'silver'];
  if(priority > 3) priority = 3;
  return color[priority-1];
}
let getCookie=(name)=>{
  let cook = document.cookie.split(";");
  let need;
  let res = cook.map((item)=>{
    let temp = item.split("=");
    temp[0] = temp[0].replace(new RegExp(/^[ ]+/g),"");
    if(temp[0] == name){
      need = temp[1];
    }
  })
  return +need;
}
let StyledDate=(date)=>{
  const months = [
        'января',
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ]


  return days[date.getDay()]+" "+date.getDate()+" "+months[date.getMonth()];
}

let formatDate = (date)=> {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();


  return yy + '-' + mm + '-' + dd;
}

export {GetPriorityColor, StyledDate, getCookie, formatDate};
