import { useContext, useEffect, useState } from "react";
import hartRedIcon from "../../assets/heart-red.svg";
import hartIcon from "../../assets/heart.svg";

import { FavouriteContext, WeatherContext } from "../../context";

export default function AddToFavourite() {
   const { addToFavourites, removeFromFavourites, favourites } =
      useContext(FavouriteContext);

   const { weatherData } = useContext(WeatherContext);

   const { latitude, longitude, location } = weatherData;

   const [isFavourite, toggleIsFavourite] = useState(false);

   useEffect(() => {
      const found = favourites.find((fav) => fav.location === location);
      toggleIsFavourite(found);
   }, [favourites, location]);

   function handleFavourites() {
      const found = favourites.find((fav) => fav.location === location);

      if (!found) {
         addToFavourites(latitude, longitude, location);
      } else {
         removeFromFavourites(location);
      }
      toggleIsFavourite(!isFavourite);
   }

   return (
      <div className="md:col-span-2">
         <div className="flex items-center justify-end space-x-6">
            <button
               onClick={handleFavourites}
               className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
            >
               <span>Add to Favourite</span>
               <img src={isFavourite ? hartRedIcon : hartIcon} alt="hart" />
            </button>
         </div>
      </div>
   );
}
