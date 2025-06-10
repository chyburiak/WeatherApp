import React from 'react';
import Search from './components/search/search';
import TodayWeather from './components/today-weather/today-weather';
import { useQuery } from './context/QueryContext.jsx'; 

export default function App() {
    const { query } = useQuery();

    return (
        <div className="h-max p-4 flex flex-col items-center gap-20 m-auto container">
            <Search />

            <div className="grid grid-cols-6 grid-rows-2 gap-4 w-full h-[550px]">
                <TodayWeather />
            </div>

            <h1>Query</h1>
            <pre>
                {typeof query === 'string'
                    ? query
                    : JSON.stringify(query, null, 2)}
            </pre>
        </div>
    );
}
