import { useState } from 'react';
import { geoApiOptions, GEODB_API_URL } from '../../api';
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const [query, setQuery] = useState('');
    const [cities, setCities] = useState('');

    const getCities = useDebouncedCallback(async () => {
        try {
            const response = await fetch(`${GEODB_API_URL}?minPopulation=10000&types=city&namePrefix=${query}`, geoApiOptions);
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }, 500);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        getCities();
    };

    const onSelectCity = (city) => {
        setQuery(city.name);
        setCities(null);
    }

    return (
        <div className="relative w-sm flex flex-col gap-2">
            <input
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="Find your city"
                className="appearance-none text-2xl border rounded-xl w-full outline-none py-2 px-4"
            />

            {cities?.data && cities.data.length > 0 && query.length !== 0 && (
                <ul className="absolute bg-white w-full text-xl border rounded-xl mt-16 overflow-y-auto max-h-[300px] z-10">
                    {cities.data.map((city) => (
                        <li
                            onClick={() => onSelectCity(city)}
                            className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
                        >
                            {city.name}, <span className="text-gray-500"> {city.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;