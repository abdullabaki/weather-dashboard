import { useEffect, useState } from "react";

const useWeather = () => {
   const [weatherData, setweatherData] = useState({
      location: "",
      climate: "",
      temperature: "",
      maxTemperature: "",
      minTemperature: "",
      humidity: "",
      cloudPercentage: "",
      wind: "",
      time: "",
      longitude: "",
      latitude: "",
   });

   const [loading, setLoading] = useState({
      state: false,
      message: "",
   });

   const [error, setError] = useState(null);

   const fetchWeatherData = async (longitude, latitude) => {
      try {
         setLoading({
            ...loading,
            state: true,
            message: "Fetching Weather data",
         });

         const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
               import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`
         );

         if (!response.ok) {
            const errorMessage = `Fetching weather data failed: ${response.status}`;
            throw new Error(errorMessage);
         }

         const data = await response.json();

         const updateWeatherData = {
            ...weatherData,
            location: data?.name,
            climate: data?.weather[0]?.main,
            temperature: data?.main?.temp,
            maxTemperature: data?.main?.temp_max,
            minTemperature: data?.main?.temp_min,
            humidity: data?.main?.humidity,
            cloudPercentage: data?.clouds?.all,
            wind: data?.wind?.speed,
            time: data?.dt,
            longitude: longitude,
            latitude: latitude,
         };
         setweatherData(updateWeatherData);
      } catch (err) {
         setError(err);
      } finally {
         setLoading({
            ...loading,
            state: false,
            message: "",
         });
      }
   };

   useEffect(() => {
      setLoading({
         state: true,
         message: "Finding Location...",
      });

      navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const lon = position.coords.longitude;

         // Validation
         if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
            setError(new Error("Invalid coordinates received."));
            return;
         }

         fetchWeatherData(lon, lat); // ঠিক order: longitude, latitude
      });
   }, []);

   return {
      weatherData,
      error,
      loading,
   };
};

export default useWeather;
