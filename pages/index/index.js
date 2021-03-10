import { requestLocaion, filterData } from "../../utils/util.js";
import { requestWeather } from "../../request/index.js";

Page({
  data: {
    
  },

  onLoad: function(options) {
    
    //get current location weather on first load
    this.getCurrentLocationWeather();
  },

  getCurrentLocationWeather(){
    requestLocaion()
    .then((res) => {
      const{latitude, longitude} = res;
      return requestWeather({lat: latitude, lon: longitude});
    })
    .then(res => {
      console.log(filterData(res.data));
    })
    .catch(err => console.log(err));
    
  }
});
  