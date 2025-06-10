const TodayWeather = ()=> {
    return (
        <div className="w-full bg-gray-50 rounded-lg shadow-md p-10 flex-col items-center content-center col-span-3 row-span-2">
            <h2 className="text-4xl font-bold mb-4 text-center">Location: Dublin, IE</h2>

            <div className="flex gap-12 mt-10 items-center">
                <div className="w-1/2 flex flex-col items-center">
                    <img src="icons/01d.png" alt="Weather Icon" className="w-3/4 h-auto" />
                    
                    <p className="text-3xl font-bold">25°C</p>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <h3 className="text-3xl mb-2">Details:</h3>

                    <p className="text-2xl text-gray-600">Feels like: 22°C</p>
                    <p className="text-2xl text-gray-600">Wind: 10 km/h</p>
                    <p className="text-2xl text-gray-600">Humidity: 60%</p>
                    <p className="text-2xl text-gray-600">Pressure: 15 hPa</p>
                </div>
            </div>
        </div>
    );
};

export default TodayWeather;