import { fetchWeaklyWeather } from "api/weeklyweather";
import { toggletemperature } from "lib/utils";

type ForecastRecord = {
    max: number;
    min: number;
    weekday: string;
    weather_icon: string;
  }[][];

type Props = {
    props: ForecastRecord;
    tempratureType: string;
}

const DailyWeather = ({props,tempratureType}: Props) => {
    const data = fetchWeaklyWeather.extractDailyTemperatures(props) ;
    return(
        <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Week Forecast</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr className="text-sm font-medium text-gray-700 text-center">
                {data.map((forecast) => (
                    <th key={forecast.weekday} className="px-4 py-3">
                    {forecast.weekday}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                <tr>
                {data.map((forecast) => (
                    <td key={forecast.weekday} className="px-4 py-3">
                    <img
                        src={forecast.weather_icon}
                        alt=""
                        className="w-12 h-12 mx-auto"
                    />
                    </td>
                ))}
                </tr>
                <tr className="text-sm text-gray-700 text-center">
                {data.map((forecast) => (
                    <td key={forecast.weekday} className="px-4 py-3">
                    {toggletemperature(forecast.max, tempratureType)}° | {toggletemperature(forecast.min, tempratureType)}°
                    </td>
                ))}
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    )
}

export default DailyWeather;