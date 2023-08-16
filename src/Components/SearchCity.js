import { useState } from "react";
import axios from "axios";
import image from "../assets/sunset.jpg";

function SearchCity() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6d4dbe34dc8b21f66265dc3884d5fa0d
`;

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setLocation("");
  };

  return (
    <div className="flex justify-center w-full h-screen relative text-white">
      <img
        className="absolute top-0 left-[33%] -z-10 w-1/3 h-full bg-no-repeat bg-center bg-cover"
        src={image}
        alt="sunset"
      />
      <div className="w-1/3 h-full m-auto py-0 px-4 flex flex-col justify-between ">
        <form className="text-center p-4" onSubmit={handleSubmit}>
          <input
            className="py-2 px-4 text-base rounded-full border-white/80 bg-white/10"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={handleChange}
          />
        </form>
        <div className="w-full my-4 mx-auto">
          <div className="text-2xl">
            <p>{data.name}</p>
          </div>
          <div className="text-8xl font-bold">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="relative -right-[90%] origin-[0-0] rotate-[269deg]">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="flex justify-evenly text-center w-full my-6 mx-auto py-4 rounded-lg bg-white/20">
            <div>
              {data.main ? (
                <p className="font-bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div>
              {data.main ? (
                <p className="font-bold">{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div>
              {data.wind ? (
                <p className="font-bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCity;
