export const fetchWeather = async (lat: string, lon: string) => {
    try {
        const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=66124b154e482a21774c9eaa6df5b23b&units=metric`
        );
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    } catch (err) {
        return { error: "Unable to retrieve weather" };
    }
};