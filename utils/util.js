import { calcTime } from "./calcTime";
import { calcTemp } from "./calcTemp";

// return a location
export const requestLocaion = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: "wgs84",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const showErrModal = (err) => {
  return new Promise((resolve, reject) => {
    console.log(err);
    wx.showModal({
      title: "Error",
      content: "Try again?",
      success(res) {
        if (res.confirm) {
          reject();
        } else {
          resolve();
        }
      },
    });
  });
};

//filter weather information
export const filterData = (obj) => {
  const city = obj.city && obj.city.name;

  let curLowestDayTemp = Number.MAX_VALUE,
    curHighestDayTemp = Number.MIN_VALUE;
  const dayWeather = [];

  //
  let idx = 0;
  const weather =
    obj.list &&
    obj.list.map((w, idx) => {
      //filter 3hrs weather
      const filteredW = { idx };
      filteredW.time = w.dt_txt && calcTime(w.dt_txt);
      filteredW.weather = w.weather && w.weather[0] && w.weather[0].main;
      filteredW.temp = w.main && calcTemp(w.main.temp);
      filteredW.minTemp = w.main && calcTemp(w.main.temp_min);
      filteredW.maxTemp = w.main && calcTemp(w.main.temp_max);

      //filter days weather
      curLowestDayTemp = Math.min(curLowestDayTemp, Number(w.main.temp_min));
      curHighestDayTemp = Math.max(curHighestDayTemp, Number(w.main.temp_max));
      if ((idx + 1) % 8 === 0) {
        let lowestDayTemp = curLowestDayTemp;
        let highestDayTemp = curHighestDayTemp;
        curLowestDayTemp = Number.MAX_VALUE;
        curHighestDayTemp = Number.MIN_VALUE;
        dayWeather.push({
          time: filteredW.time,
          low: calcTemp(lowestDayTemp),
          high: calcTemp(highestDayTemp),
          weather: filteredW.weather,
        });
      }
      return filteredW;
    })

  return { city, weather, dayWeather };
};
