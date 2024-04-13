import react from 'react';


const WeatherInfo = (props) => {
    return (
        <div>
            <h2>Weather Info</h2>
            <div>
                <p>Location: {props.city}, {props.country}</p>
                <p>Temperature: {props.temperature}</p>
                <p>Humidity: {props.humidity}</p>
                <p>Condition: {props.description}</p>
            </div>
        </div>
    );
}