import React from 'react'
import { Drink } from '@/types';
import Image from 'next/image';



const DrinkCard = ({ drinkInfo }: { drinkInfo: Drink }) => {

  const formatInstructions = () => {

    let formatted: string[] = [];

    let lines = drinkInfo.instructions.split(".")
    for (let i = 0; i < lines.length; i++){
      if (lines[i].length <= 2) {
        continue;
      }

      formatted.push(lines[i])    
    }
    return formatted;
}

  return (
    <div className="p-4 rounded-2xl border-4 border-gray-300 flex flex-col space-x-4 bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.5)]">
      <div className='flex'>
        <div>
          <div className='flex justify-center items-center'>
            <Image priority src={drinkInfo.image} alt={drinkInfo.name} width={300} height={300} className="rounded-xl object-cover" />
          </div>
          <div className="mt-2">
            <h2 className="text-[32px] text-center font-semibold">{drinkInfo.name}</h2>
          </div>
        </div>
        <div className='flex flex-col p-4'>
          <div className='my-8'>
            <h3 className="text-left font-semibold text-[32px]">Ingredients & Measurements:</h3>
            <ul className="pl-6 flex flex-col justify-start text-wrap">
              {drinkInfo?.ingredients.map((ingredient, index) => {
                if ((ingredient.name === null || ingredient.name === '') && (ingredient.measurement === null || ingredient.measurement === '')) {
                  return;
                }

                return (
                  <li key={index} className='text-[26px]'> <span className='font-semibold'>{ingredient.name}</span>{ingredient.measurement && ingredient.measurement !== "/n" ? `: ${ingredient.measurement}` : " - Add Desired Amount"}</li>
                )
              })}
            </ul>
          </div>
          <div className='flex flex-wrap justify-center items-center gap-x-4'>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xl">{drinkInfo.alcolholic}</span>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xl">{drinkInfo.glass}</span>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xl">{drinkInfo.category}</span>
          </div>
        </div>
      </div>
      <div className='pl-4'>
        <h3 className="font-semibold text-start text-[30px] mt-4">Instructions: </h3>
        <ul className='pl-6 flex flex-col justify-center items-start'>
          {formatInstructions().map((sentence, index) => (
            <li key={index} className='list-disc text-[24px] w-[800px]'>{sentence.charAt(0).toUpperCase() + sentence.slice(1)}</li>
          )
          )}
        </ul>
      </div>
    </div>
  );
}

export default DrinkCard