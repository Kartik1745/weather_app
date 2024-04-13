import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import temp from "assets/temp.gif";
import { Input } from "components/ui/input";
import fetchPlace from "api/fetchplace";
import { fetchWeather } from "api/fetchweather";
import { fetchWeaklyWeather } from "api/weaklyweather";
import WeatherGrid from "components/ui/weather-grid";


type City = {
  place_name: string;
  center: [string, string];
  id: string;
};

type SubscribedCity = {
  lat: string;
  lon: string;
  id: string;
}

function App() {
  const [inputText, setInputText] = useState("");
  const [completeCity, setCompleteCity] = useState<City[] | []>([]);

  const [subscribedCities, setSubscribedCities] = useState<SubscribedCity[]>([]);



  const onCitySubscribe = (city: City) => {
    setSubscribedCities([
        { lat: city.center[1], lon: city.center[0], id: city.id }
      ]);
      setInputText(""); // Clear the input text
   };

  useEffect(() => {
    console.log("inputText", inputText);

    fetchPlace(inputText).then((data) => {
      console.log("data", data);
      setCompleteCity(data.features);
    });
  }, [inputText]);

  useEffect(() => {
    console.log("subscribedCities", subscribedCities);

    if (subscribedCities.length > 0) {
      fetchWeather((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        // console.log("weatherData", data);
        // console.log("weatherData", data.weather[0].description);
      });
      fetchWeaklyWeather.getTodayData((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        console.log("weeklyWeatherData", data);
      } );
    }
  }, [subscribedCities]);

  useEffect(() => {
    console.log("completeCity", completeCity);
  }, [completeCity]);

  useEffect(() => {
    console.log("subscribedCities", subscribedCities);
  }, [subscribedCities]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-20 relative">
          <div className="">
            <div className="flex gap-1 w-full">
              <Input
                className="w-96"
                type="city"
                placeholder="Start typing the city name..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            {inputText && (
              <div className="absolute mt-2 w-96 text-sm border-0 lg:border-4 border-blue-100 dark:border-blue-400 rounded-xl">
                <ul className="w-full p-2">
                  {completeCity.map((city, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 rounded-md w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        onCitySubscribe(city);
                      }}
                    >
                      <span>{city.place_name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* </div> */}
          </div>
      </div>
      <div className="pt-56 gap-8">
            <WeatherGrid weatherTypeName="clsds" tempC={34} tempF={54} humidity={54} wind={54} location="Binghamton" />
            {/* <WeatherGrid weatherTypeName="clsds" tempC={34} tempF={54} humidity={54} wind={54} location="Binghamton" /> */}
            {/* <WeatherGrid weatherTypeName="clsds" tempC={34} tempF={54} humidity={54} wind={54} location="Binghamton" /> */}
      </div>
      {/* <img 
        src={temp} 
        alt="temp" 
        style={{width:'30px'}}/> */}
    </div>
  );
}

export default App;
