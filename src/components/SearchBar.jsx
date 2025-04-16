import { useState, useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = ({ onSelectCity }) => {
    const { weatherData } = useWeather();
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState([]);

    const cityNames = useMemo(() => weatherData.map(entry => entry.city), [weatherData]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        const matches = cityNames.filter((name) =>
            name.toLowerCase().startsWith(value.toLowerCase())
        );

        setFiltered(matches);
    };

    const handleSelect = (name) => {
        setQuery(name);
        setFiltered([]);
        const selectedCity = weatherData.find((entry) => entry.city === name);
        onSelectCity?.(selectedCity);
    };

    return (
        <div className="relative w-sm flex flex-col gap-2">
            <input
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Find your city"
                className="appearance-none text-2xl border rounded-xl w-full outline-none py-2 px-4"
            />

            {filtered.length > 0 && (
                <ul className="absolute bg-white w-full text-xl border rounded-xl mt-16 overflow-y-auto max-h-[300px] z-10">
                    {filtered.map((name) => (
                        <li
                            key={name}
                            className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
                            onClick={() => handleSelect(name)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
