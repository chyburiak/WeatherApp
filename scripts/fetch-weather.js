// scripts/fetch-weather.js
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
if (!API_KEY) {
    console.error('❌ OPENWEATHER_API_KEY is not set in .env file');
    process.exit(1);
}

const europeanCapitals = [
    'Amsterdam', 'Andorra la Vella', 'Athens', 'Belgrade', 'Berlin', 'Bern', 'Bratislava',
    'Brussels', 'Bucharest', 'Budapest', 'Chisinau', 'Copenhagen', 'Dublin', 'Helsinki',
    'Kyiv', 'Lisbon', 'Ljubljana', 'London', 'Luxembourg', 'Madrid', 'Monaco', 'Moscow',
    'Oslo', 'Paris', 'Podgorica', 'Prague', 'Reykjavik', 'Riga', 'Rome', 'San Marino',
    'Sarajevo', 'Skopje', 'Sofia', 'Stockholm', 'Tallinn', 'Tirana', 'Vaduz', 'Valletta',
    'Vatican City', 'Vienna', 'Vilnius', 'Warsaw', 'Zagreb'
];

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'weather.json');
const DELAY = 3000; // 3 seconds between API calls

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithErrorHandling = async (url) => {
    const response = await fetch(url);

    if (response.status === 429) {
        throw new Error('Rate limit exceeded');
    }

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

const ensureDirectoryExists = (filePath) => {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const saveResults = (results) => {
    ensureDirectoryExists(OUTPUT_PATH);
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
};

const fetchWeather = async () => {
    let results = [];
    let errorCount = 0;

    for (const city of europeanCapitals) {
        try {
            console.log(`🔍 Fetching coordinates for ${city}...`);
            const geoData = await fetchWithErrorHandling(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
            );

            if (!Array.isArray(geoData) || geoData.length === 0) {
                throw new Error(`City not found: ${city}`);
            }

            const { lat, lon } = geoData[0];

            console.log(`🌤 Fetching weather for ${city}...`);
            const weatherData = await fetchWithErrorHandling(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            results.push({
                city,
                lat,
                lon,
                weather: weatherData,
                timestamp: new Date().toISOString()
            });

            saveResults(results);
            console.log(`✅ Fetched weather for ${city}`);
        } catch (err) {
            console.error(`❌ Error with ${city}: ${err.message}`);
            errorCount++;

            if (errorCount >= 3) {
                console.error('❌ Too many errors, stopping execution');
                process.exit(1);
            }
        }

        await sleep(DELAY);
    }

    console.log(`\n📦 Weather data saved to ${OUTPUT_PATH}`);
};

fetchWeather().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});