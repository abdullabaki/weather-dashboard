import { useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";

import clearSkyImage from "./assets/backgrounds/clear-sky.jpg";
import fewCloudsImage from "./assets/backgrounds/few-clouds.jpg";
import mistImage from "./assets/backgrounds/mist.jpeg";
import rainyDayImage from "./assets/backgrounds/rainy-day.jpg";
import scatteredCloudsImage from "./assets/backgrounds/scattered-clouds.jpg";
import snowImage from "./assets/backgrounds/snow.jpg";
import sunnyImage from "./assets/backgrounds/sunny.jpg";
import thunderstormImage from "./assets/backgrounds/thunderstorm.jpg";
import winterImage from "./assets/backgrounds/winter.jpg";

import { WeatherContext } from "./context";

export default function Page() {
   const { weatherData, loading } = useContext(WeatherContext);
   const [climateImage, setClimateImage] = useState("");

   function getBackgroundImage(climate) {
      switch (climate) {
         case "Clouds":
            return scatteredCloudsImage;
         case "Clear":
            return clearSkyImage;
         case "Snow":
            return snowImage;
         case "Thunder":
            return thunderstormImage;
         case "Fog":
            return winterImage;
         case "Haze":
            return fewCloudsImage;
         case "Mist":
            return mistImage;
         case "Rain":
            return rainyDayImage;
         default:
            return sunnyImage;
      }
   }

   useEffect(() => {
      const bgImage = getBackgroundImage(weatherData.climate);
      setClimateImage(bgImage);
   }, [weatherData.climate]);

   return (
      <>
         {loading.state ? (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex flex-col items-center justify-center text-red-700">
               <p className="text-3xl font-semibold">{loading?.message}</p>
            </div>
         ) : (
            <div
               className="grid place-items-center h-screen bg-no-repeat bg-cover bg-center"
               style={{ backgroundImage: `url(${climateImage})` }}
            >
               <Header />
               <main>
                  <section>
                     <WeatherBoard />
                  </section>
               </main>
            </div>
         )}
      </>
   );
}
