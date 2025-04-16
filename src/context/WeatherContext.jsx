import { createContext, useContext, useEffect, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [ weatherData, setWeatherData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        fetch('/weather.json')
            .then((res) => res.json())
            .then((data) => {
                setWeatherData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log('Failed to fetch weather data:', err);
                setError(err);
                setLoading(false);
            });
    }, []);
    
    return (
        <WeatherContext.Provider value={{ weatherData, loading, error }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);