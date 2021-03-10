
// return a location
export const requestLocaion = () => {
  return new Promise((resolve, reject) => {
      wx.getLocation({
          type: 'wgs84',
          success: (res) => {           
            resolve(res);
          },
          fail: (err) => {
              reject(err);
          }
        })
  })
}

//filter weather information
export const filterData = (obj) => {
  const city = obj.city && obj.city.name;
  const weather = obj.list && obj.list.map(w => {
    const filteredW={};
    filteredW.time = w.dt && calcTime(w.dt);
    filteredW.weather = w.weather && w.weather[0] && w.weather[0].main;
    filteredW.temp = w.main && w.main.temp;
    filteredW.minTemp = w.main && w.main.temp_min;
    filteredW.maxTemp = w.main && w.main.temp_max;
    return filteredW;
  })
  return {city, weather};

}

const calcTime = (time) => {
  const date = new Date(time);
  const hrs = date.getHours();
  const days = date.getDay();
  return {hrs, days};
}
