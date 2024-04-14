import React, { useEffect, useState } from "react";
import "./App.css";

import { Input } from "components/ui/input";
import fetchPlace from "api/fetchplace";
import { fetchWeather } from "api/fetchweather";
import { fetchWeaklyWeather } from "api/weeklyweather";
import WeatherGrid from "components/ui/weather-grid";
import Graph from "components/ui/graph";
import DailyWeather from "components/ui/dailyweather";
import { toggletemperature } from "lib/utils";


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
  const [tempratureType, setTempratureType] = useState("C");
  const [userLocation, setUserLocation] = useState<{ lat: null | number; lon: null | number }>({ lat: null, lon: null });
  const [isLoading, setIsLoading] = useState(true);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
    setIsLoading(true);

    if (userLocation.lat && userLocation.lon) {
      fetchWeather(String(userLocation.lat), String(userLocation.lon)).then((data) => {
        setTodayData(data);
      });
      fetchWeaklyWeather.getTodayData(String(userLocation.lat), String(userLocation.lon)).then((data) => {
        const newData = data[0].slice(0, 8);
        setForeCasthours(newData);
        setForecastWeek(data);
        setIsLoading(false);
      });
    }

    if (subscribedCities.length > 0) {
      fetchWeather((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        setTodayData(data);
      });
      fetchWeaklyWeather.getTodayData((subscribedCities[0].lat), (subscribedCities[0].lon)).then((data) => {
        const newData = data[0].slice(0, 8)
        setForeCasthours(newData);
        setForecastWeek(data);
        setIsLoading(false);
      } );
    }
  }, [subscribedCities, userLocation.lat, userLocation.lon]);


  return (
    <div className="h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-8 relative">
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
              <div className="absolute mt-2 w-96 bg-gray-200 z-10 text-sm border-0 lg:border-4 border-blue-100 dark:border-blue-400 rounded-xl">
                <ul className="w-full p-2">
                  {completeCity.map((city, i) => (
                    <li
                      key={i}
                      className="flex justify-between  items-center py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 rounded-md w-full"
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
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    ) : (
      TodayData && (
        <div className="flex flex-col md:flex-row items-center justify-center pt-32 gap-8 bg-gray-100 p-8">
          <div className="flex flex-col gap-6 items-center justify-center md:w-1/3 ml-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setTempratureType(tempratureType === "C" ? "F" : "C");
              }}
            >
              Toggle °C/°F
            </button>
            {TodayData && (
              <WeatherGrid
                weatherTypeName={TodayData.weather[0].main}
                tempC={toggletemperature(TodayData.main.temp, tempratureType)}
                humidity={TodayData.main.humidity}
                wind={TodayData.wind.speed}
                location={TodayData.name}
                weathericon={TodayData.weather[0].icon}
                temperatureType={tempratureType}
              />
            )}
          </div>
          <div className="px-2 md:px-4 flex flex-col justify-start md:w-2/3">
            <Graph props={foreCasthours} tempratureType={tempratureType} />
            <DailyWeather props={forecastWeek} tempratureType={tempratureType} />
          </div>
        </div>
  )
)}
    </div>
  );
}

export default App;
