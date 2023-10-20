import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WorldTimeComponent = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryTime, setCountryTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCountryTime((prevCountryTime) => {
          if (prevCountryTime) {
            const currentTime = new Date(prevCountryTime.getTime() + 1000);
            return currentTime;
          }
          return null;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
      .then((response) => response.json())
      .then((data) => {
        const countryTime = new Date(data.utc_datetime);
        setCountryTime(countryTime);
        setIsRunning(true);
      })
      .catch((error) => {
        console.error("Error while fetching current time:", error);
      });
  };

  const toggleClock = () => {
    setIsRunning(!isRunning); 
  };

  return (
    <div className=" p-4 rounded-md mb-4 flex justify-between">
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row justify-center items-center mt-4 ">
        <select
          className="border border-gray-300 py-2 px-4 rounded-md"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div className="bg-red-500 text-white p-3 rounded-md">
          {countryTime !== null ? (
            <div>
              <p>
                <span>{countryTime.toISOString().slice(0, 10)} </span>
                <span>{countryTime.toLocaleString("en-US", { weekday: "long" }).slice(0, 3).toUpperCase()}</span>
              </p>
              <p className="text-3xl">{countryTime.toISOString().slice(11, 19)}</p>
            </div>
          ) : (
            <div>
              <p>
                <span>YYYY-MM-DD</span>
                <span>DAY</span>
              </p>
              <p className="text-3xl">00:00:00</p>
            </div>
          )}
        </div>
      </div>
      <button
        className={`bg-green-500 ${isRunning ? "red" : "green"} text-white py-2 px-4 rounded-md mt-4`}
        onClick={toggleClock}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default WorldTimeComponent;
