import React, { useEffect, useState } from "react";
import "./App.css";

import temp from "assets/temp.gif";
import { Input } from "components/ui/input";
import fetchPlace from "api/fetchplace";
import { fetchWeather } from "api/fetchweather";
import { fetchWeaklyWeather } from "api/weeklyweather";
import WeatherGrid from "components/ui/weather-grid";
import Graph from "components/ui/graph";
import DailyWeather from "components/ui/dailyweather";


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

type weatherData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind:{
    speed: number;
    deg: number;
  };
  name: string;
}

type ForecastRecord = {
  max: number;
  min: number;
  time: string;
  weekday: string;
  weather_icon: string;
};

type ForecastData = ForecastRecord[];


function App() {

  const [inputText, setInputText] = useState("");
  const [completeCity, setCompleteCity] = useState<City[] | []>([]);
  const [foreCasthours, setForeCasthours] = useState<ForecastData>([]);
  const [forecastWeek, setForecastWeek] = useState<ForecastData[]>([]);
  const [TodayData, setTodayData] = useState<weatherData>();
  const [subscribedCities, setSubscribedCities] = useState<SubscribedCity[]>([]);



  const onCitySubscribe = (city: City) => {
    setSubscribedCities([
        { lat: city.center[1], lon: city.center[0], id: city.id }
      ]);
      setInputText("");
   };

  useEffect(() => {
    fetchPlace(inputText).then((data) => {
      setCompleteCity(data.features);
    });
  }, [inputText]);

  useEffect(() => {

    if (subscribedCities.length > 0) {
      fetchWeather((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        setTodayData(data);
      });
      fetchWeaklyWeather.getTodayData((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        const newData = data[0].slice(0, 8)
        setForeCasthours(newData);
        setForecastWeek(data);
      } );
    }
  }, [subscribedCities]);

  useEffect(() => {
    const data = fetchWeaklyWeather.extractDailyTemperatures(forecastWeek);
  }, [forecastWeek]);


  return (
    <div className="h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center mt-2 relative">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Weather App</h1>
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
      {(<div className="flex flex-col md:flex-row items-center justify-center pt-44 gap-8 bg-gray-100 p-8">
        <div className="flex items-center justify-center md:w-1/3 ml-auto">
        {TodayData && <WeatherGrid weatherTypeName={TodayData.weather[0].main} tempC={TodayData.main.temp} humidity={TodayData.main.humidity} wind={TodayData.wind.speed} location={TodayData.name} weathericon={TodayData.weather[0].icon} />}
        </div>
        {TodayData && (<div className="px-2 md:px-4 flex flex-col justify-start md:w-2/3">
          <Graph props={foreCasthours} />
          <DailyWeather props={forecastWeek} />
        </div>) }
      </div>)}
    </div>
  );
}

export default App;
