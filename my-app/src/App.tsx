import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";

import WeatherGrid from "components/ui/weather-grid";

const fetchPlace = async (text: string) => {
  try {
    console.log("text", text);
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?access_token=pk.eyJ1Ijoia2FydGlrMTI5OCIsImEiOiJjbHV4ZG5xeXUwbjNoMmtxdDc0YTNsOXh5In0.Fx5rXUWnaIdALbJI_XuduQ&cachebuster=1625641871908&autocomplete=true&types=place`
    );

    console.log("res", res);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve places" };
  }
};

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
    const alreadySubscribed = subscribedCities.some(
      (c) => c.id === city.id
    );
   
    if (!alreadySubscribed) {
      setSubscribedCities([
        ...subscribedCities,
        { lat: city.center[1], lon: city.center[0], id: city.id },
      ]);
      setInputText(""); // Clear the input text
    }
   };

  useEffect(() => {
    console.log("inputText", inputText);

    fetchPlace(inputText).then((data) => {
      console.log("data", data);
      setCompleteCity(data.features);
    });
  }, [inputText]);

  useEffect(() => {
    console.log("completeCity", completeCity);
  }, [completeCity]);

  useEffect(() => {
    console.log("subscribedCities", subscribedCities);
  }, [subscribedCities]);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="">
        <div className="flex gap-1 w-full">
          <Input
          className="w-96"
            type="email"
            placeholder="Email"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {/* <Button type="submit">Subscribe</Button> */}
        </div>
        {inputText && (
          <div className="mt-2 w-96 text-sm overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 border-0 lg:border-2 border-blue-100 dark:border-blue-400 rounded-xl">
            <ul className="w-full p-2">
              {completeCity.map((city, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-600 rounded-md w-full"
                  onClick={(e) => { 
                    e.preventDefault();
                    onCitySubscribe(city);
                  } }
                >
                  <span>{city.place_name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* </div> */}
        <div className="mt-2">
          <WeatherGrid weatherTypeName="clsds" tempC={34} tempF={54} humidity={54} wind={54} />
        </div>
      </div>
    </div>
  );
}

export default App;
