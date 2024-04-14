import { WidthIcon } from "@radix-ui/react-icons";

type WeatherGridProps = {
    // weatherIcon: string;
    weatherTypeName: string;
    tempC: number;
    // tempF: number;
    humidity: number;
    wind: number;
    location: string;
    weathericon: string;
}

const WeatherGrid = (props: WeatherGridProps) => {
    return (
        <div className="w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
  <div className="p-6 text-center">
    <div className="mb-2 text-lg font-semibold text-gray-800 uppercase">
      {props.location}
    </div>
    <div className="mb-4 w-24 h-24 mx-auto">
      <img
        src={`http://openweathermap.org/img/wn/${props.weathericon}@4x.png`}
        alt="weather icon"
        className="w-full h-full object-cover rounded-full shadow-md"
      />
    </div>
    <p className="mb-2 text-gray-600">{props.weatherTypeName}</p>
    <div className="mb-4 text-4xl font-bold text-gray-800">
      {props.tempC}<sup>o</sup>C
    </div>
    <div className="flex justify-center">
      <div className="flex items-center mr-6 text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mr-2 w-5 h-5 fill-current text-blue-500"
        >
          <title>Humidity</title>
          <path d="M10.5,8c0-3.49-3.3-5.74-3.44-5.83a1,1,0,0,0-1.12,0C5.8,2.27,2.5,4.55,2.5,8a4,4,0,0,0,8,0Zm-4,2a2,2,0,0,1-2-2,5.44,5.44,0,0,1,2-3.72A5.39,5.39,0,0,1,8.5,8,2,2,0,0,1,6.5,10ZM18.06,2.17a1,1,0,0,0-1.12,0C16.8,2.27,13.5,4.55,13.5,8a4,4,0,0,0,8,0C21.5,4.51,18.2,2.26,18.06,2.17ZM17.5,10a2,2,0,0,1-2-2,5.44,5.44,0,0,1,2-3.72A5.39,5.39,0,0,1,19.5,8,2,2,0,0,1,17.5,10Zm-4.44,2.17a1,1,0,0,0-1.12,0c-.14.1-3.44,2.38-3.44,5.83a4,4,0,0,0,8,0C16.5,14.51,13.2,12.26,13.06,12.17ZM12.5,20a2,2,0,0,1-2-2,5.44,5.44,0,0,1,2-3.72,5.39,5.39,0,0,1,2,3.72A2,2,0,0,1,12.5,20Z" />
        </svg>
        {props.humidity}%
      </div>
      <div className="flex items-center text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mr-2 w-5 h-5 fill-current text-blue-500"
        >
          <title>Wind Speed</title>
          <path d="M3.5,9a1,1,0,1,0-1-1A1,1,0,0,0,3.5,9Zm4,0h7a3,3,0,0,0,0-6,3.06,3.06,0,0,0-1.5.4,1,1,0,0,0-.37,1.37A1,1,0,0,0,14,5.13,1.09,1.09,0,0,1,14.5,5a1,1,0,0,1,0,2h-7a1,1,0,0,0,0,2Zm-4,4h7a1,1,0,0,0,0-2h-7a1,1,0,0,0,0,2Zm17-4a1,1,0,1,0-1-1A1,1,0,0,0,20.5,9Zm-2,2h-4a1,1,0,0,0,0,2h4a1,1,0,0,1,0,2,1,1,0,0,0,0,2,3,3,0,0,0,0-6Zm-6,4h-4a1,1,0,0,0,0,2h4a1,1,0,0,1,0,2,1.09,1.09,0,0,1-.5-.13,1,1,0,1,0-1,1.73,3.06,3.06,0,0,0,1.5.4,3,3,0,0,0,0-6Zm-8,0h-1a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Z" />
        </svg>
        {props.wind} km/h
      </div>
    </div>
  </div>
</div>
  )
}

export default WeatherGrid;