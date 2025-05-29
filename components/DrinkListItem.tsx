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
      className="md:w-[650px] w-[90%] min-h-[300px] px-2 py-4 rounded-2xl border-4 border-gray-300 
      flex flex-col space-x-4 bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.6)] 
      hover:cursor-pointer hover:shadow-[6px_6px_12px_rgba(129,130,24,0.9)] hover:border-orange-400">
      
      <div className='h-full flex-1 flex px-1'>
        <div className='flex justify-start sm:w-auto w-[200px]'>
          <Image priority src={drinkInfo.image} alt={drinkInfo.name} width={180} height={180} className="min-w-[180px] min-h-[180px] rounded-xl object-cover" />
        </div>

        <div className='sm:flex flex-col justify-start items-start px-3'>
            <h2 className="text-[28px] font-semibold">{drinkInfo.name}</h2>
            <h3 className="sm:mt-2 mt-5 text-left font-semibold md:text-[20px] text-[16px] underline">Ingredients:</h3>
            <ul className="flex flex-wrap justify-start items-center text-wrap gap-x-2">
              {drinkInfo?.ingredients.slice(0, Math.min(4, drinkInfo?.ingredients.length)).map((ingredient, index) => {
                if ((ingredient.name === null || ingredient.name === '') && (ingredient.measurement === null || ingredient.measurement === '')) {
                  return;
                }

                return (
                  <span key={index} className="font-medium mt-3 inline-block bg-orange-400 text-gray-800 px-2 py-1 rounded-md sm:text-md text-sm">{ingredient.name}</span>
                )
              })}
              {drinkInfo?.ingredients.length > 4 && <span className="text-3xl sm:mt-3 sm:inline-block text-orange-400">...</span>}
            </ul>

        <h3 className="mt-5 text-left font-semibold sm:text-[20px] text-[16px] underline">Categories</h3>
        <div className='flex sm:flex-row flex-col sm:justify-center justify-start sm:items-center items-start gap-x-4 pt-3 sm:gap-y-0 gap-y-2'>
          <span className="inline-block bg-gray-200 text-gray-800 sm:px-2 px-1 py-1 rounded-md sm:text-md text-sm">{drinkInfo.alcolholic}</span>
          <span className="sm:inline-block hidden bg-gray-200 text-gray-800 px-2 py-1 rounded-md sm:text-md text-sm">{drinkInfo.glass}</span>
          <span className="inline-block bg-gray-200 text-gray-800 sm:px-2 px-1 py-1 rounded-md sm:text-md text-sm">{drinkInfo.category}</span>
      </div>
        </div>
      </div>
      
    </div>

  );
}

export default DrinkListItem