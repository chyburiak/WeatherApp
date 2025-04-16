// scripts/fetch-weather.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const cities = ['Dublin', 'London', 'Kyiv'];

/**
 * Fetch all Weather data from API.
 * @returns {Promise<void>}
 */
const fetchWeather = async () => {
    const results = [];

    for (const city of cities) {
        try {
            const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
            const geoData = await geoRes.json();
            if (!geoData.length) throw new Error(`City not found: ${city}`);

            const { lat, lon } = geoData[0];

            const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const weatherData = await weatherRes.json();

            results.push({
                city,
                lat,
                lon,
                weather: weatherData
            });
        } catch (err) {
            console.error(`Error fetching weather for ${city}:`, err.message);
        }
    }

    const outputPath = path.join(process.cwd(), 'public', 'weather.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Weather data saved to ${outputPath}`);
};

fetchWeather();
