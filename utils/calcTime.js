export const calcTime = (time) => {
    const daysMap ={
      0:"Sunday",
      1:"Monday",
      2:"Tuesday",
      3:"Wednesday",
      4:"Thursday",
      5:"Friday",
      6:"Saturday"
    };
    const date = new Date(time);
    const hrs = date.getHours();
    const days = daysMap[date.getDay()];
    if(hrs > 12){
        return [days, (hrs-12) + ":00 PM"];
    }else{
        return [days, " "+hrs + ":00 AM"];
    }   
  }