import React, { createContext, useState } from "react";
export const WeatherStateProvider = createContext(null);
export const WeatherDispatchProvider = createContext(null);
export default function WeatherContext(props) {
  const [weatherDetails, setWeatherDetails] = useState(null); // Here the weather details are being stored which is passed to the child component (WeatherDisplay).
  return (
    <WeatherStateProvider.Provider value={{ weatherDetails }}>
      <WeatherDispatchProvider.Provider value={{ setWeatherDetails }}>
        {props.children}
      </WeatherDispatchProvider.Provider>
    </WeatherStateProvider.Provider>
  );
}
