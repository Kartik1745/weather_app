import { fetchWeaklyWeather } from "api/weeklyweather";

type ForecastRecord = {
    max: number;
    min: number;
    time: string;
    weekday: string;
    weather_icon: string;
  };

const dailyWeather = ({props}: {props: ForecastRecord[]}) => {
    const data = fetchWeaklyWeather.extractDailyTemperatures(props);
    return(
        <div className="grid grid-cols-3 gap-4">
            <div className="overflow-x-auto">
                <table className="table-auto">
                <tbody>
                    <tr className="text-center">
                    {props.map(forecast => (
                        <td key={forecast.weekday}>{forecast.weekday}</td>
                    ))}
                    </tr>
                    <tr>
                    {props.map(forecast => (
                        <td key={forecast.weekday} className="p-0">
                        <img src={forecast.weather_icon} alt="" className="w-full" />
                        </td>
                    ))}
                    </tr>
                    <tr>
                    {props.map(forecast => (
                        <td key={forecast.weekday} className="p-0">
                        {forecast.max}° | {forecast.min}°
                        </td>
                    ))}
                    </tr>
                </tbody>
                </table>
            </div>
</div>
    )
}

export default dailyWeather;