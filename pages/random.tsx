import DrinkCard from "@/components/DrinkCard";
import Loading from "@/components/Loading";
import { Drink, TimeRemaining } from "@/types";
import { useEffect, useState } from "react";

const Random = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [randomDrink, setRandomDrink] = useState<Drink>();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(getTimeUntilMidnight());

  function getTimeUntilMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Set time to midnight

    const diffMs = midnight.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }


  const getRandomDrink = async () => {
    const response = await fetch("/api/random")
    const random_drink: Drink = await response.json();
    console.log(random_drink)
    return random_drink;
  }

  useEffect(() => {
    const getLastVisitedDate = async () => {
      let lastDate = window.localStorage.getItem("last-visit")
      let visit: Date = new Date();

      // User Visited already
      if (lastDate !== null) {

        // If same day visit, get stored random drink
        if (visit.toDateString() === lastDate) {
          let drink = window.localStorage.getItem("random-drink");

          // If drink exists, update randomDrink State
          if (drink !== null && drink !== '{}') {
            let drink_info: Drink = JSON.parse(drink)
            console.log("Display Stored Drink")
            setRandomDrink(drink_info);
          }
          else {
            //User visited, but drink does not exist, generate a drink
            console.log("Date Existed, Drink didn't", drink)
            let drink_info = await getRandomDrink();
            setRandomDrink(drink_info)
            window.localStorage.setItem('random-drink', JSON.stringify(drink_info));
          }
        }
      }
      else {
        console.log('First Visit: ', visit.toDateString());
        window.localStorage.setItem('last-visit', visit.toDateString())
        let drink_info = await getRandomDrink();
        window.localStorage.setItem('random-drink', JSON.stringify(drink_info));
        setRandomDrink(drink_info)
      }
    }

    (async () => {
      await getLastVisitedDate();
      setTimeout(() => setIsLoading(false), 300)
    })();

    const interval = setInterval(() => {
      setTimeRemaining(getTimeUntilMidnight());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount

  }, [])

  return (
    <section id="random" className="flex-1 flex justify-center items-start mt-6">

      {isLoading? 
        <Loading message="Loading Drink" />
        : 
        <div className="flex flex-col justify-start items-center gap-10">
          <h3 className="text-2xl font-semibold">New Random Drink in {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s          </h3>
          <DrinkCard drinkInfo={randomDrink!} /> 
        </div>
      }
    </section>
  );
}

export default Random;