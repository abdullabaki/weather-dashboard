import AddToFavourite from "./AddToFavourite.jsx";
import WeatherCondition from "./WeatherCondition.jsx";
import WeatherHeadline from "./WeatherHeadline.jsx";

import { useContext } from "react";
import { WeatherContext } from "../../context";

export default function WeatherBoard() {
   const { loading } = useContext(WeatherContext);

   return (
      <div className="container">
         <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto">
            <div className="grid md:grid-cols-2 gap-10 md:gap-6">
               {loading.state ? (
                  <div className="col-span-2 text-center">
                     <p className="text-lg font-semibold">{loading?.message}</p>
                  </div>
               ) : (
                  <>
                     <AddToFavourite />
                     <WeatherHeadline />
                     <WeatherCondition />
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
