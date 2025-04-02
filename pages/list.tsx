import DrinkCard from '@/components/DrinkCard';
import Loading from '@/components/Loading';
import { Drink } from '@/types';
import React, { act, useEffect, useState } from 'react'

const List = () => {

  const capitalLetters: string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  const [activeChar, setActiveChar] = useState<string>("");
  const [drinksList, setDrinksList] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDrinksWithLetter = async (char: string) => {
    setActiveChar(char);

    const drinks = await fetch(`/api/list-drinks/${char}`).then(response => response.json())

    console.log(drinks)
    setDrinksList(drinks);
    setTimeout(() => setIsLoading(false), 1000);
  }


  useEffect(() => {
    if (activeChar === ""){
      return;
    }
    setIsLoading(true);
  }, [activeChar])

  
  return (
    <section id="drinks-by-letter" className='flex-1 flex flex-col justify-start items-center'>
      <h2 className='text-center text-5xl font-semibold'>List Drinks by the first letter</h2>
      <ul className='flex gap-x-6 justify-center items-center mt-8'>
        {capitalLetters.map((char, index) => (
          <li 
            key={index} 
            className={`underline font-semibold text-2xl hover:cursor-pointer hover:text-cyan-500 ${activeChar === char && "text-orange-400"}`}
            onClick={() => getDrinksWithLetter(char)}
          >
            {char}
          </li> 
        ))}
      </ul>

      {activeChar === "" && <p className='flex-1 flex justify-center items-center text-orange-400 text-2xl text-center font-semibold'>Click on the any letter to see the drinks starting with that letter</p>}

      {isLoading ?
      <Loading message={`Loading Drinks that start with ${activeChar}...`}/>
      : 
        <div className='mt-8 flex-1 flex flex-col justify-center items-center gap-y-4'>
          {drinksList.map((drink, index) => (
            <DrinkCard key={index} drinkInfo={drink} />
          ))}
        </div> 
      }

    </section>
  )
}

export default List