type ForecastRecord = {
    max: number;
    min: number;
    weekday: string;
    weather_icon: string;
  };

const getIconUrl = (icon:string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const formatDate = (utc:number, timezone:number, format:string) =>  {

    const dt_timezone = new Date(utc * 1e3 + timezone * 1e3).toISOString();
    const dt = new Date(dt_timezone.substr(0, 19));
    if (format === "day") {
      return  dt.getDate();
    } else if (format === "time") {
      const hr = parseInt(dt_timezone.substr(11, 2), 0);
      if (hr === 12) {
        return "12pm";
      } else if (hr === 0) {
        return "12am";
      } else {
        return hr > 12 ? hr - 12 + "pm" : hr + "am";
      }
    } else if (format === "weekday") {
      return dt.toLocaleTimeString("en-us", { weekday: "long" }).split(" ")[0];
    }
    
};

export const fetchWeaklyWeather = {
    
    getTodayData: async (lat: string, lon: string) => {
        return await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=66124b154e482a21774c9eaa6df5b23b&units=metric`)
          .then(response => {
            return response.json();
          })
          .then(data => (
            data.list.map((itm: any) => {
                return {
                    max: parseInt(itm.main.temp_max, 0),
                    min: parseInt(itm.main.temp_min, 0),
                    time: formatDate(itm.dt, data.city.timezone, "time"),
                    weekday: formatDate(itm.dt, data.city.timezone, "weekday"),
                    weather_icon: getIconUrl(itm.weather[0].icon)
                }
            })))
          .then(data => {
            return [data];
          })
          .catch(error => {
            return [];
          });
      },
      
     extractDailyTemperatures: (WeatherData: ForecastRecord[][]) => {
      if (WeatherData.length === 0) {
        return [];
      }
      const dailyTemperatures: { [key: string]: { min: number, max: number, weekday:string, weather_icon: string } } = {};
        
        WeatherData[0].forEach(entry => {
            const { weekday, min, max, weather_icon } = entry;            
            if (!dailyTemperatures[weekday]) {
                dailyTemperatures[weekday] = { min: min, max: max, weekday: weekday, weather_icon: weather_icon};
            } else {
                dailyTemperatures[weekday].min = Math.min(dailyTemperatures[weekday].min, min);
                dailyTemperatures[weekday].max = Math.max(dailyTemperatures[weekday].max, max);
            }
        });
        return Object.entries(dailyTemperatures).map(([weekday, temperatures]) => ({
          weekday: weekday,
          min: temperatures.min,
          max: temperatures.max,
          weather_icon: temperatures.weather_icon
        }));
    },
      
};
