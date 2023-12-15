import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WeatherContext from "./Context/WeatherContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Here the context value is published throughout the application */}
    <WeatherContext>
      <App />
    </WeatherContext>
  </React.StrictMode>
);
reportWebVitals();
