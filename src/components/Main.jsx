import { useState } from "react";
import { fetchData } from "../fetchData";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import searchImg from "../assets/search.svg";
import humidityImg from "../assets/humidity.svg";
import pressureImg from "../assets/pressure.svg";
import windImg from "../assets/wind.svg";
import rainImg from "../assets/rain.svg";
import sunriseImg from "../assets/sunrise.svg";
import sunsetImg from "../assets/sunset.svg";

const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("celsius");

  const handleFetchData = async () => {
    if (inputValue.trim()) {
      setIsLoading(true);
      try {
        const data = await fetchData(inputValue.trim());
        setWeatherData(data);
      } catch (error) {
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (event, newUnit) => {
    if (newUnit !== null) {
      setUnit(newUnit);
    }
  };

  const getShortDayOfWeek = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short" });

  return (
    <main className="flex flex-col items-center gap-1 lg:gap-3 p-4 w-full sm:w-5/6 lg:w-1/2 max-w-[900px] h-max bg-gray text-white rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 w-[90%] lg:w-5/6 xl:w-2/3 text-lg">
        <div className="flex justify-center items-center gap-1 md:gap-3 w-full">
          <input
            type="text"
            placeholder="Enter city name"
            autoComplete="off"
            required={true}
            value={inputValue}
            className="max-w-[85%] sm:w-auto px-3 py-1 bg-gray font-semibold outline-none border-b-2 border-white placeholder-lightBlue placeholder-opacity-80 hover:border-lightBlue focus:border-lightBlue ease-in focus:placeholder-gray duration-200"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFetchData();
            }}
          />
          <div>
            {!isLoading ? (
              <img
                src={searchImg}
                alt="Search"
                title="Search city"
                draggable="false"
                className="w-8 h-8 cursor-pointer hover:scale-105 ease-out duration-150"
                onClick={handleFetchData}
              />
            ) : (
              <div
                title="Retrieving data..."
                className="w-8 h-8 border-[5px] border-lightBlue border-t-white rounded-[50%] animate-spin"
              ></div>
            )}
          </div>
        </div>
        <div>
          <ToggleButtonGroup
            value={unit}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            className="toggle-button-group"
          >
            <ToggleButton
              value="celsius"
              style={{
                color: "#e6e6e6",
                fontSize: "1em",
                fontWeight: "900",
                border: "1px solid #0d0d0d",
                opacity: "0.7",
              }}
            >
              &deg;C
            </ToggleButton>
            <ToggleButton
              value="fahrenheit"
              style={{
                color: "#e6e6e6",
                fontSize: "1em",
                fontWeight: "900",
                border: "1px solid #0d0d0d",
                opacity: "0.7",
              }}
            >
              &deg;F
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      {weatherData && weatherData[0].error && (
        <h2 className="text-2xl text-lightBlue">
          Oops!{" "}
          {weatherData && weatherData[0].error
            ? weatherData[0].error.message
            : ""}
        </h2>
      )}
      <div
        className={`flex flex-col justify-between items-center gap-1 w-full ${
          weatherData && !weatherData[0].error ? "visible" : "invisible"
        }`}
      >
        <div className="flex items-center gap-4 w-[90%] lg:w-5/6 xl:w-2/3 cursor-default">
          <h1 className="text-3xl font-black italic">
            {weatherData && !weatherData[0].error
              ? weatherData[0].location.name
              : ""}
          </h1>
          <p className="text-base md:text-lg">
            (last update:{" "}
            {weatherData && !weatherData[0].error
              ? `${weatherData[0].current.last_updated.slice(11)}`
              : ""}
            h local time)
          </p>
        </div>
        <div className="flex justify-between w-[90%] lg:w-5/6 xl:w-2/3 cursor-default">
          <div className="flex items-center gap-1">
            <div>
              <p className="text-right text-2xl md:text-4xl text-lightBlue font-bold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? weatherData[0].current.temp_c + " °C"
                    : weatherData[0].current.temp_f + " °F"
                  : ""}
              </p>
              <p>
                {weatherData && !weatherData[0].error
                  ? weatherData[0].current.condition.text
                  : ""}
              </p>
            </div>
            <img
              src={
                weatherData && !weatherData[0].error
                  ? `./${weatherData[0].current.condition.icon.slice(34)}`
                  : ""
              }
              alt="Current condition"
              draggable="false"
            />
          </div>
          <div className="text-lg">
            <p>
              Max:{" "}
              <span className="text-lightBlue">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? weatherData[0].forecast.forecastday[0].day.maxtemp_c +
                      " °C"
                    : weatherData[0].forecast.forecastday[0].day.maxtemp_f +
                      " °F"
                  : ""}
              </span>
            </p>
            <p>
              Min:{" "}
              <span className="text-lightBlue">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? weatherData[0].forecast.forecastday[0].day.mintemp_c +
                      " °C"
                    : weatherData[0].forecast.forecastday[0].day.mintemp_f +
                      " °F"
                  : ""}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full text-xl">
          <h2 className="font-semibold cursor-default">Day to day info</h2>
          <hr className="w-[90%] h-min lg:w-5/6 xl:w-2/3" />
          <Swiper
            slidesPerView={3}
            initialSlide={1}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-[90%] lg:w-5/6 xl:w-2/3 pb-9 text-base md:text-lg"
          >
            <SwiperSlide className="flex flex-col items-center w-max h-max cursor-default">
              <h3 className="text-xl">
                {weatherData && !weatherData[0].error
                  ? getShortDayOfWeek(
                      weatherData[2].forecast.forecastday[0].date
                    )
                  : ""}
              </h3>
              <img
                src={
                  weatherData && !weatherData[0].error
                    ? `./${weatherData[2].forecast.forecastday[0].day.condition.icon.slice(
                        34
                      )}`
                    : ""
                }
                alt="Condition"
                title={
                  weatherData && !weatherData[0].error
                    ? weatherData[2].forecast.forecastday[0].day.condition.text
                    : ""
                }
                draggable="false"
              />
              <p title="Average temperature" className="font-semibold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[2].forecast.forecastday[0].day.avgtemp_c
                      ) + " °C"
                    : Math.round(
                        weatherData[2].forecast.forecastday[0].day.avgtemp_f
                      ) + " °F"
                  : ""}
              </p>
              <p title="Max/Min temperature">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[2].forecast.forecastday[0].day.maxtemp_c
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[2].forecast.forecastday[0].day.mintemp_c
                      ) +
                      "°"
                    : Math.round(
                        weatherData[2].forecast.forecastday[0].day.maxtemp_f
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[2].forecast.forecastday[0].day.mintemp_f
                      ) +
                      "°"
                  : ""}
              </p>
              <p title="Average humidity" className="text-medium">
                {weatherData && !weatherData[0].error
                  ? weatherData[2].forecast.forecastday[0].day.avghumidity
                  : ""}
                %
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col items-center w-max h-max cursor-default">
              <h3 className="text-xl">
                {weatherData && !weatherData[0].error
                  ? getShortDayOfWeek(
                      weatherData[1].forecast.forecastday[0].date
                    )
                  : ""}
              </h3>
              <img
                src={
                  weatherData && !weatherData[0].error
                    ? `./${weatherData[1].forecast.forecastday[0].day.condition.icon.slice(
                        34
                      )}`
                    : ""
                }
                alt="Condition"
                title={
                  weatherData && !weatherData[0].error
                    ? weatherData[1].forecast.forecastday[0].day.condition.text
                    : ""
                }
                draggable="false"
              />
              <p title="Average temperature" className="font-semibold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[1].forecast.forecastday[0].day.avgtemp_c
                      ) + " °C"
                    : Math.round(
                        weatherData[1].forecast.forecastday[0].day.avgtemp_f
                      ) + " °F"
                  : ""}
              </p>
              <p title="Max/Min temperature">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[1].forecast.forecastday[0].day.maxtemp_c
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[1].forecast.forecastday[0].day.mintemp_c
                      ) +
                      "°"
                    : Math.round(
                        weatherData[1].forecast.forecastday[0].day.maxtemp_f
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[1].forecast.forecastday[0].day.mintemp_f
                      ) +
                      "°"
                  : ""}
              </p>
              <p title="Average humidity" className="text-medium">
                {weatherData && !weatherData[0].error
                  ? weatherData[1].forecast.forecastday[0].day.avghumidity
                  : ""}
                %
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col items-center w-max h-max cursor-default">
              <h3 className="text-xl font-semibold text-lightBlue">Today</h3>
              <img
                src={
                  weatherData && !weatherData[0].error
                    ? `./${weatherData[0].forecast.forecastday[0].day.condition.icon.slice(
                        34
                      )}`
                    : ""
                }
                alt="Condition"
                title={
                  weatherData && !weatherData[0].error
                    ? weatherData[0].forecast.forecastday[0].day.condition.text
                    : ""
                }
                draggable="false"
              />
              <p title="Average temperature" className="font-semibold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[0].day.avgtemp_c
                      ) + " °C"
                    : Math.round(
                        weatherData[0].forecast.forecastday[0].day.avgtemp_f
                      ) + " °F"
                  : ""}
              </p>
              <p title="Max/Min temperature">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[0].day.maxtemp_c
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[0].day.mintemp_c
                      ) +
                      "°"
                    : Math.round(
                        weatherData[0].forecast.forecastday[0].day.maxtemp_f
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[0].day.mintemp_f
                      ) +
                      "°"
                  : ""}
              </p>
              <p title="Average humidity" className="text-medium">
                {weatherData && !weatherData[0].error
                  ? weatherData[0].forecast.forecastday[0].day.avghumidity
                  : ""}
                %
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col items-center w-max h-max cursor-default">
              <h3 className="text-xl">
                {weatherData && !weatherData[0].error
                  ? getShortDayOfWeek(
                      weatherData[0].forecast.forecastday[1].date
                    )
                  : ""}
              </h3>
              <img
                src={
                  weatherData && !weatherData[0].error
                    ? `./${weatherData[0].forecast.forecastday[1].day.condition.icon.slice(
                        34
                      )}`
                    : ""
                }
                alt="Condition"
                title={
                  weatherData && !weatherData[0].error
                    ? weatherData[0].forecast.forecastday[1].day.condition.text
                    : ""
                }
                draggable="false"
              />
              <p title="Average temperature" className="font-semibold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[1].day.avgtemp_c
                      ) + " °C"
                    : Math.round(
                        weatherData[0].forecast.forecastday[1].day.avgtemp_f
                      ) + " °F"
                  : ""}
              </p>
              <p title="Max/Min temperature">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[1].day.maxtemp_c
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[1].day.mintemp_c
                      ) +
                      "°"
                    : Math.round(
                        weatherData[0].forecast.forecastday[1].day.maxtemp_f
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[1].day.mintemp_f
                      ) +
                      "°"
                  : ""}
              </p>
              <p title="Average humidity" className="text-medium">
                {weatherData && !weatherData[0].error
                  ? weatherData[0].forecast.forecastday[1].day.avghumidity
                  : ""}
                %
              </p>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col items-center w-max h-max cursor-default">
              <h3 className="text-xl">
                {weatherData && !weatherData[0].error
                  ? getShortDayOfWeek(
                      weatherData[0].forecast.forecastday[2].date
                    )
                  : ""}
              </h3>
              <img
                src={
                  weatherData && !weatherData[0].error
                    ? `./${weatherData[0].forecast.forecastday[2].day.condition.icon.slice(
                        34
                      )}`
                    : ""
                }
                alt="Condition"
                title={
                  weatherData && !weatherData[0].error
                    ? weatherData[0].forecast.forecastday[2].day.condition.text
                    : ""
                }
                draggable="false"
              />
              <p title="Average temperature" className="font-semibold">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[2].day.avgtemp_c
                      ) + " °C"
                    : Math.round(
                        weatherData[0].forecast.forecastday[2].day.avgtemp_f
                      ) + " °F"
                  : ""}
              </p>
              <p title="Max/Min temperature">
                {weatherData && !weatherData[0].error
                  ? unit === "celsius"
                    ? Math.round(
                        weatherData[0].forecast.forecastday[2].day.maxtemp_c
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[2].day.mintemp_c
                      ) +
                      "°"
                    : Math.round(
                        weatherData[0].forecast.forecastday[2].day.maxtemp_f
                      ) +
                      "° / " +
                      Math.round(
                        weatherData[0].forecast.forecastday[2].day.mintemp_f
                      ) +
                      "°"
                  : ""}
              </p>
              <p title="Average humidity" className="text-medium">
                {weatherData && !weatherData[0].error
                  ? weatherData[0].forecast.forecastday[2].day.avghumidity
                  : ""}
                %
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col items-center gap-1 w-full -mt-3 text-lg cursor-default">
          <h2 className="font-semibold">Additional info</h2>
          <hr className="w-[90%] lg:w-5/6 xl:w-2/3 mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-[90%] lg:w-5/6 xl:w-2/3">
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={humidityImg} draggable="false" />
                <span>Humidity: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? weatherData[0].current.humidity
                    : ""}{" "}
                  %
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={pressureImg} draggable="false" />
                <span>Pressure: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? unit === "celsius"
                      ? weatherData[0].current.pressure_mb + " mb"
                      : weatherData[0].current.pressure_in + " in"
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={rainImg} draggable="false" />
                <span>Precipitation: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? unit === "celsius"
                      ? weatherData[0].current.precip_mm + " mm"
                      : weatherData[0].current.precip_in + " in"
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={windImg} draggable="false" />
                <span>Wind: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? unit === "celsius"
                      ? weatherData[0].current.wind_kph +
                        " kph " +
                        weatherData[0].current.wind_dir
                      : weatherData[0].current.wind_mph +
                        " mph " +
                        weatherData[0].current.wind_dir
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={sunriseImg} draggable="false" />
                <span>Sunrise: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? weatherData[0].forecast.forecastday[0].astro.sunrise
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-1 w-60">
                <img src={sunsetImg} draggable="false" />
                <span>Sunset: </span>
                <span className="text-lightBlue">
                  {weatherData && !weatherData[0].error
                    ? weatherData[0].forecast.forecastday[0].astro.sunset
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
