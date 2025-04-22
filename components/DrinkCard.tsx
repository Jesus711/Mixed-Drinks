import React from 'react'
import { Drink } from '@/types';
import Image from 'next/image';



const DrinkCard = ({ drinkInfo }: { drinkInfo: Drink }) => {

  return (
    <div  className="p-4 rounded-2xl border-4 border-gray-300 flex flex-row items-start space-x-4 bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.5)]">
      <div className=''>
        <div className='flex justify-center items-center'>
        <Image priority src={drinkInfo.image} alt={drinkInfo.name} width={300} height={300} className="rounded-xl object-cover" />
        </div> 
        <div className="mt-4">
          <h2 className="text-[28px] font-semibold">{drinkInfo.name}</h2>
          <div className='flex justify-center items-center gap-x-4'>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-lg">{drinkInfo.alcolholic}</span>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-lg">{drinkInfo.glass}</span>
            <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-lg">{drinkInfo.category}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col p-4'>
        <div className='my-8'>
          <h3 className="text-left font-semibold text-[32px]">Ingredients & Measurements:</h3>
          <ul className="pl-8 flex flex-col justify-start text-wrap">
            {drinkInfo?.ingredients.map((ingredient, index) => {
              if ((ingredient.name === null || ingredient.name === '') && (ingredient.measurement === null || ingredient.measurement === '')) {
                return;
              }

              return (
                <li key={index} className='text-[24px]'> <span className='font-semibold'>{ingredient.name}</span>{ingredient.measurement ? `: ${ingredient.measurement}` : " - Add Desired Amount"}</li>
              )
            })}
          </ul>
        </div>
        <p className="text-[24px]">
          <span className="font-semibold text-[32px] block">Instructions:</span> 
          <span className='pl-8 text-wrap'>{drinkInfo.instructions}</span>
        </p>
      </div>
    </div>
  );
}

export default DrinkCard