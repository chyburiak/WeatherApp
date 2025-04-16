// src/App.jsx
import React from 'react';
import SearchBar from './components/SearchBar';
import ForecastLength from './components/ForecastLength';
import WeatherDisplay from './components/WeatherDisplay';
import DatePicker from './components/DatePicker';

export default function App() {
    return (
        <div className="h-max bg-white p-4 flex flex-col items-center gap-4 m-auto container">

            <div className="flex items-center gap-4">
                <SearchBar />

                <ForecastLength />
            </div>

            <div className="flex items-center gap-4 w-full">
                <WeatherDisplay />

                <DatePicker />
            </div>
        </div>
    );
}
