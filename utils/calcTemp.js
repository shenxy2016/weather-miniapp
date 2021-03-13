export const calcTemp = temp => {
    const celsius = (temp - 273.15).toFixed(0);
    const fahrenheit = (celsius * 9 / 5 + 32).toFixed(0);
    return {
      kelvin: temp + "K", 
      celsius:  celsius + "°C", 
      fahrenheit: fahrenheit + "°F"
    };
  }