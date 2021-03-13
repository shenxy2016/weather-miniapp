import { requestLocaion, filterData, showErrModal } from "../../utils/util.js";
import { requestWeather } from "../../request/index.js";
import mock from "../../request/mock_payload";

Page({
  data: {
    weather:[],
    dayWeather:[],
    city:"",
    unit:"celsius",
    inputValue:"",
    weatherMap:{
      "Clear":"icon-qing",
      "Clouds":"icon-cloudy",
      "Fog":"icon-Mist",
      "Sand":"icon-Mist",
      "Ash":"icon-Mist",
      "Squall":"icon-Mist",
      "Rain":"icon-rain",
      "Drizzle":"icon-rain",
      "Thunderstorm":"icon-Thunder-StormNight",
      "Snow":"icon-snowy-line",
      "Mist":"icon-Mist",
      "Smoke":"icon-Mist",
      "Haze":"icon-Mist",
      "Dust":"icon-Mist",  
      "Tornado":"icon-Mist"
    }
  },

  onLoad: function() {
    
    //get current location weather on first load
    this.getCurrentLocationWeather();

    // this.getMockData();
  },

  handleUnitsChange(e){
    const d = ["celsius", "fahrenheit"];
    this.setData({
      unit:d[1 - d.indexOf(this.data.unit)]
    });
  },

  handleChangeInput(e){
    this.setData({
      inputValue: e.detail
    })
  },

  handleWeatherSearch(e){
    this.setData({
      inputValue:""
    });
    const {city} = e.detail;
    const c = city.toLowerCase();
    const prevW = wx.getStorageSync(c);

    if(!prevW){
      this.getInputCityWeather({city});
    }else{
      if((Date.now() - prevW.time > 1000*60*15)){
        this.getInputCityWeather({city});
      }else{
        this.setData(
          {
            ...prevW
          }
        )
      }
    }    
  },

  //test app with mock data
  getMockData(){
    console.log(mock.list[0]);
    const data = filterData(mock);
    console.log(data.weather[0]);
    console.log(data.dayWeather);
    this.setData({
      weather: data.weather, 
      city: data.city,
      dayWeather: data.dayWeather
    });
  },

  getCurrentLocationWeather(){
    requestLocaion()
    .then((res) => {
      const{latitude, longitude} = res;
      return requestWeather({lat: latitude, lon: longitude});     
    })
    .then(res => {
      const data = filterData(res.data);
      const city = data.city;
      this.saveData(city, data);
    })
    .catch(err => showErrModal(err))
    .catch(() => this.getCurrentLocationWeather());  
  },

  //handle user input city search
  getInputCityWeather(param){
    requestWeather(param)
      .then(res => {
        const data = filterData(res.data);
        const city = data.city;
        this.saveData(city, data);
      })
      .catch(err => 
        wx.showToast({
          title: 'City not found!',
          icon: 'none',
          duration: 4000
      }));   
  },

  //handle data saving
  saveData(city, data){
    const c = city.toLowerCase();
    wx.setStorageSync(c, {
      time: Date.now(),
      weather: data.weather, 
      city: data.city,
      dayWeather: data.dayWeather
    });
    this.setData({
      weather: data.weather, 
      city: data.city,
      dayWeather: data.dayWeather
    });
  },

});


  
