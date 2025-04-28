export const geoApiOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_GEODB_API_KEY,
        'x-rapidapi-host': import.meta.env.VITE_GEODB_API_HOST
    }
};

export const GEODB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';