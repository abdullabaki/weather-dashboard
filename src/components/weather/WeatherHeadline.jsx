import cloudIcon from "../../assets/cloud.svg";
import hazeIcon from "../../assets/haze.svg";
import snowIcon from "../../assets/icons/snow.svg";
import sunnyIcon from "../../assets/icons/sunny.svg";
import rainyIcon from "../../assets/rainy.svg";
import thunderIcon from "../../assets/thunder.svg";

import { useContext } from "react";
import pinIcon from "../../assets/pin.svg";

import { WeatherContext } from "../../context";
import { getFormattedDate } from "../../utils/date-utils";

export default function WeatherHeadline() {
   const { weatherData } = useContext(WeatherContext);

   const { temperature, location, climate, time } = weatherData;

   function getWeatherIcon(climate) {
      switch (climate) {
         case "Clouds":
            return cloudIcon;
         case "Clear":
            return sunnyIcon;
         case "Snow":
            return snowIcon;
         case "Thunder":
            return thunderIcon;
         case "Fog":
            return hazeIcon;
         case "Haze":
            return hazeIcon;
         case "Mist":
            return hazeIcon;
         case "Rain":
            return rainyIcon;
         default:
            return sunnyIcon;
      }
   }

   return (
      <div>
         <div className="max-md:flex items-center justify-between md:-mt-10">
            <img src={getWeatherIcon(climate)} alt="climate" />
            <div className="max-md:flex items-center max-md:space-x-4">
               <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
                  {Math.round(temperature)}°
               </h1>
               <div className="flex items-center space-x-4 md:mb-4">
                  <img src={pinIcon} alt="pin" />
                  <h2 className="text-2xl lg:text-[50px]">{location}</h2>
               </div>
            </div>
         </div>
         <p className="text-sm lg:text-lg">
            {getFormattedDate(time, "time", false)} -{" "}
            {getFormattedDate(time, "date", false)}
         </p>
      </div>
   );
}
