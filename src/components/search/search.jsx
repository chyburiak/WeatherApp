import { useState } from 'react';
import { geoApiOptions, GEODB_API_URL } from '../../api';
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from '../../context/QueryContext.jsx';

const Search = () => {
    const { query, setQuery } = useQuery();
    const [cities, setCities] = useState('');

    const getCities = useDebouncedCallback(async () => {
        try {
            const response = await fetch(`${GEODB_API_URL}?minPopulation=10000&types=city&namePrefix=${query}`, geoApiOptions);
            const data = await response.json();
            setCities(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }, 800);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        getCities();
    };

    const onSelectCity = (city) => {
        setQuery(city);
        setCities(null);
    }

    return (
        <form
            role='form'
            aria-label="Search for a city" 
            className="relative w-full sm:w-sm flex flex-col gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
                role='searchbox'
                aria-label="Search input"
                autoComplete="off"
                autoCorrect="off"
                type="search"
                value={typeof query === 'string' ? query : query.name}
                onChange={handleChange}
                placeholder="Find your city"
                className='w-full text-base sm:text-2xl py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600'
            />

            {cities?.data && cities.data.length > 0 && query.length !== 0 && (
                <ul role='listbox'
                    className="absolute bg-white w-full text-base sm:text-xl border border-indigo-600 rounded-md mt-16 overflow-y-auto max-h-[300px] z-10">
                    {cities.data.map((city) => (
                        <li
                            role='option'
                            onClick={() => onSelectCity(city)}
                            key={city.id}
                            className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
                        >
                            {city.name}, <span className="text-gray-500"> {city.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default Search;