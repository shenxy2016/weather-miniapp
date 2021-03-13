
const baseURL=`https://api.openweathermap.org/data/2.5/forecast`;
const appid=`ad15046ef0d432be033de780ad5d2d63`;


export const requestWeather = (params={}) => {
  return new Promise((resolve, reject) => {
    let data;
    if(params.lat && params.lon){
      data={...params, appid}
    }else if(params.city){
      data={q: params.city, appid}
    }else{
      reject("no input!!!");
    };
    wx.showLoading({
      title:"Loading..."
    });
    wx.request({
      url:baseURL,
      data,    
      success:(result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () =>{
        wx.hideLoading();
      }
    })
  })    
}




