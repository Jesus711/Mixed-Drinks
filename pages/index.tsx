import { Drink } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {

  const [lastVisited, setLastVisited] = useState<Date>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [randomDrink, setRandomDrink] = useState<Drink>();


  const getRandomDrink = async () => {
    const random_drink = await fetch("/api/random").then(response => response.json())
    console.log(random_drink)
    setRandomDrink(random_drink);
  }

  useEffect(() => {
    const getLastVisitedDate = () => {
      let lastDate = window.sessionStorage.getItem("last-visit")
      let visit: Date = new Date();
      if(lastDate !== null){
        if (visit.toDateString() === lastDate){
          let drink = window.sessionStorage.getItem("random-drink");
          if (drink !== null){
            //setRandomDrink(drink);
          }
          getRandomDrink();
        }
      }
      else {
        console.log(visit.toDateString());
        window.sessionStorage.setItem('last-visit', visit.toDateString())
        //setRandomDrink("Martini")
      }
    }

    getLastVisitedDate();
    setIsLoading(false);

  }, [])



  return (
   <div>
    <header className="w-full flex flex-col justify-center items-center">
      <h1 className="text-[32px] font-semibold text-center">Mixed Bevs</h1>
      <p className="text-center">Find & Learn new Drinks!</p>
    </header>
    <section id="random" className="flex justify-center items-center">
      {isLoading ? <div className="text-center text-green-500 text-[40px]">Loading...</div> : 
      <div className="w-[500px] h-[500px]">
        <h2 className="text-center">Daily Random Mixed Drink:</h2>
        <div className="flex justify-between">

          <div className="flex flex-col">
            <h1 className="text-white text-[48px]">{randomDrink?.name}</h1>
            <ul className="ml-4">
              <li>Category: {randomDrink?.category}</li>
              <li>Alcoholic: {randomDrink?.alcolholic}</li>
              <li>Glass: {randomDrink?.glass}</li>
            </ul>
          </div>

          <div className="w-[200px] h-[200px] flex justify-center items-center">
            <img className="w-[80%] h-[80%] object-cover rounded-md" src={randomDrink?.image} />
          </div>
        </div>


        <p className="text-center">Ingredients & Measurements:</p>
        <ul className="flex flex-wrap justify-evenly items-center">
          {randomDrink?.ingredients.map((ingredient, index) => { 
            if(ingredient.name === null && ingredient.measurement === null){
              return;
            }

            return(
              <li key={index}>{ingredient.name}{ingredient.measurement ? ` : ${ingredient.measurement}` : " - Add For Taste"}</li>
            )
          })}
        </ul>
        <p className="text-[24px]"><span className="font-semibold text-[32px] block">Instructions:</span> {randomDrink?.instructions}</p>

      </div>
      }
    </section>
   </div>
  );
}
