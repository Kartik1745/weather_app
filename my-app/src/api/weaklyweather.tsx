const getIconUrl = (icon:string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const formatDate = (utc:number, timezone:number, format:string) =>  {

    const dt_timezone = new Date(utc * 1e3 + timezone * 1e3).toISOString();
    console.log('dt_timezone:', dt_timezone);
    const dt = new Date(dt_timezone.substr(0, 19));
    console.log('dt:', dt);
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
        console.log("inside getTodayData")
        return await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=66124b154e482a21774c9eaa6df5b23b&units=metric`)
          .then(response => {
            console.log("calling api", response);    
            return response.json();
          })
          .then(data => (
            console.log("data.list", data),
            data.list.map((itm: any) => {
                return {
                    temp: parseInt(itm.main.temp, 0),
                    weatherDescription: itm.weather[0].description,
                    weatherIcon: getIconUrl(itm.weather[0].icon),
                    time: formatDate(itm.dt, data.city.timezone, "time"),
                    weekday: formatDate(itm.dt, data.city.timezone, "weekday"),
                }
            })))
          .then(data => {
            console.log("TodayData: ", data);
            return [data];
          })
          .catch(error => {
            console.log("Error: ", error);
            return [];
          });
      },
};
