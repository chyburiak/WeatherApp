export const geoApiOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_GEODB_API_KEY,
        'x-rapidapi-host': import.meta.env.VITE_GEODB_API_HOST
    }
};

export const GEODB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;