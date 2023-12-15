import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import axios from "axios";
import Select from "react-select";
import ExceptionComponent from "./Exception";
import WeatherDisplay from "./WeatherDisplay";
import LoadingComponent from "./LoadingComponent";
import {
  WeatherStateProvider,
  WeatherDispatchProvider,
} from "../Context/WeatherContext";

const WeatherSearch = () => {
  const [countries, setCountries] = useState([]); // Here all the list of all drop down values of countries is stored
  const [isLoading, setIsLoading] = useState(false); // It is used to controll the loading on the searchable dropdown while making API call to fetch countries
  const [timeOutID, setTimeOutID] = useState(null); // It is used to store the setTimeout's ID, which can be cleared in future
  const [countryResponse, setCountryResponse] = useState([]); // Here all the response from fetch country API is stored for future reference
  const [selectedCountry, setSelectedCountry] = useState(null); // It holds the value of the selected country
  const [isWeatherLoading, setIsWeatherLoading] = useState(false); // It is used to determine the loading while the Weather API is invoked

  const { weatherDetails } = useContext(WeatherStateProvider); // Here the weatherDetails is destructured from the context
  const { setWeatherDetails } = useContext(WeatherDispatchProvider); // Here the setter method of weatherDetails is destructured from the context

  const dropDownReference = useRef(null); // Here a reference for the dropdown element is created

  useLayoutEffect(() => {
    dropDownReference.current.focus();
  }, []); // This method will be bringing the auto focus to the searchable dropdown in the page load

  useEffect(() => {
    if (selectedCountry) {
      (async () => {
        setIsWeatherLoading(true); // The loading component is rendered while the API is invoked by assigning true.
        try {
          const filteredCapital = countryResponse.filter(
            (el) => el.name.common === selectedCountry.value
          ); // Here the selected country's capital is being filtered from the entire country list response
          const weatherResult = await axios.get(
            `https://api.api-ninjas.com/v1/weather?city=${filteredCapital[0]?.capital[0]}`,
            {
              headers: {
                "X-Api-Key": "0mEpdG3yT79hMiRuQo0u4Q==rHXBl4BJcxAT1ebA",
              },
            }
          ); // Here the Weather API is invoked with axios. The API is a get method where the capital is sent in the query param. This API also need a X-Api-Key for authentication and it is attached in the header of the API call.
          weatherResult.data.country = selectedCountry.value; // The API don't return the country in the response, so the selected country is manually attached to the response.
          setWeatherDetails(weatherResult.data); // The final response is stored in the state that is in the context.
        } catch (error) {
          setWeatherDetails(null); // If the API fails then the weather details are resetted.
        }
        setIsWeatherLoading(false); // The loading component is unmounted after the API response is obtained.
      })(); // Self invoke function to make API call.
    }
  }, [selectedCountry]); // This use effect has a dependancy on selectedCountry variable. Every time when the selectedCountry is getting changed then a new API call to fetch weather is invoked with the selected country.

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // The selected option is stored in the state.
    if (selectedOption !== selectedCountry) {
      setWeatherDetails(null);
    } // If the choosen country is different from the previously choosen country then the previous weather details are resetted.
  }; // This method will be invoked when an option in the select is choosen.

  const handleInputChange = (inputValue) => {
    setIsLoading(true); // Here the loading for the searchable dropdown is activated as we will be going for an API call to fetch countries.
    if (timeOutID) {
      clearInterval(timeOutID);
    } // If there is a previous timeOutID available then it need to be resetted here, as every new user input should have a new timeOutID stored.
    if (inputValue) {
      const collectedIntervalID = setTimeout(async () => {
        try {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${inputValue}`
          ); // Here the axios call is done to fetch the list of all countries based on the input in the searchable dropdown. This API is of get method. The data for the API is passed in the query param, it holds the user typed values in the searchable dropdown.
          const countriesData = response.data.map((country) => ({
            value: country.name.common,
            label: country.name.common,
          })); // Here the response is looped and an array of object is formed and returned by map method. The array has 2 keys of value and label which is used to bind the options in the searchable dropdown.
          setCountryResponse(response.data); // The entire response is stored here which will be useful to filter the capital of the selected country.
          setCountries(countriesData); // The array of objects with value and label is stored here, which is used to bind the options in the searchable dropdown.
        } catch (error) {
          setCountries([]); // If the response is not obtained then the countries are resetted, where there will be no options in the searchable dropdown.
          setSelectedCountry(null); // If the response is not obtained then the selected countries is resetted.
        }
        setIsLoading(false); // Here the loading for the searchable dropdown is deactivated as the API call to fetch countries is done.
      }, 2000); // This timeout method is responsible for the debouncing behaviour of the search in the searchable dropdown. This method will be invoking the API call for fetching the list of countries after 2 seconds when the user stop the typing in the searchable dropdown. If the user make any interaction within 2 seconds then again from the begining the delay is applied.
      setTimeOutID(collectedIntervalID); // The timeout ID that is returned by setTimeout is being stored in the state, which will be used to clear the timeout with the corresponding timeout ID.
    } else {
      setIsLoading(false); // Here the loading for the searchable dropdown is deactivated as there is no values typed in the searchable dropdown.
    }
  }; // This method will be invoked when we type in the searchable dropdown.

  return (
    <div style={{ width: "100%" }}>
      <Select
        options={countries}
        ref={dropDownReference}
        isLoading={isLoading}
        onFocus={() => {
          setSelectedCountry(null);
          setCountries([]);
          setWeatherDetails(null);
        }}
        value={selectedCountry}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search and select a country"
        isSearchable
      />
      {weatherDetails ? (
        <WeatherDisplay /> // This component is rendered when the weather details of the selected country is obtained.
      ) : selectedCountry && isWeatherLoading ? (
        <LoadingComponent /> // This component is rendered when the user has selected a country and the weather details are being fetched.
      ) : selectedCountry && !weatherDetails ? (
        <ExceptionComponent /> // This component is rendered when the user has selected a country and the weather API don't have data for the selected country.
      ) : null}
    </div>
  );
};

export default WeatherSearch;
