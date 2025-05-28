import React from 'react'
import { Drink } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';


const DrinkListItem = ({ drinkInfo }: { drinkInfo: Drink }) => {

  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('selectedDrink', JSON.stringify(drinkInfo));
    router.push(`/drink/${drinkInfo.id}`)
  }

  return (
      <div onClick={handleClick}
      className="w-[650px] min-h-[300px] px-2 py-4 rounded-2xl border-4 border-gray-300 
      flex flex-col space-x-4 bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.6)] 
      hover:cursor-pointer hover:shadow-[6px_6px_12px_rgba(129,130,24,0.9)] hover:border-orange-400">
      
      <div className='h-full flex-1 flex px-1'>
        <div className='flex justify-start'>
          <Image priority src={drinkInfo.image} alt={drinkInfo.name} width={180} height={180} className="min-w-[180px] min-h-[180px] rounded-xl object-cover" />
        </div>

        <div className='flex flex-col justify-start items-start px-3'>
            <h2 className="text-[28px] font-semibold">{drinkInfo.name}</h2>
            <h3 className="mt-2 text-left font-semibold text-[20px] underline">Ingredients:</h3>
            <ul className="flex flex-wrap justify-start items-center text-wrap gap-x-2">
              {drinkInfo?.ingredients.slice(0, Math.min(4, drinkInfo?.ingredients.length)).map((ingredient, index) => {
                if ((ingredient.name === null || ingredient.name === '') && (ingredient.measurement === null || ingredient.measurement === '')) {
                  return;
                }

                return (
                  <span key={index} className="font-medium mt-3 inline-block bg-orange-400 text-gray-800 px-2 py-1 rounded-md text-md">{ingredient.name}</span>
                )
              })}
              {drinkInfo?.ingredients.length > 4 && <span className="text-3xl mt-3 inline-block text-orange-400">...</span>}
            </ul>

        <h3 className="mt-5 text-left font-semibold text-[20px] underline">Categories</h3>
        <div className='flex justify-center items-center gap-x-4'>
          <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.alcolholic}</span>
          <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.glass}</span>
          <span className="mt-3 inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.category}</span>
      </div>
        </div>
      </div>
      
    </div>

  );
}

export default DrinkListItem