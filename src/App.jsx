import React from 'react';
import Search from './components/search/search';
import TodayWeather from './components/today-weather/today-weather.jsx';

export default function App() {
    return (
        <div className="h-max p-4 flex flex-col items-center gap-20 m-auto container">
            <Search />

            <div className="grid grid-cols-6 grid-rows-2 gap-4 w-full h-[550px]">
                <TodayWeather />
            </div>
        </div>
    );
}
