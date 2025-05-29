import React from 'react'
import { Drink } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MobileDrinkItemCard = ({ drinkInfo }: { drinkInfo: Drink }) => {

  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('selectedDrink', JSON.stringify(drinkInfo));
    router.push(`/drink/${drinkInfo.id}`)
  }

  return (
    <div onClick={handleClick}
      className="w-[80%] pt-0.5 pb-1.5 rounded-2xl border-4 border-gray-300 
      flex flex-col justify-center items-center gap-y-1.5 bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.6)] 
      hover:cursor-pointer hover:shadow-[6px_6px_12px_rgba(129,130,24,0.9)] hover:border-orange-400">
      <Image priority src={drinkInfo.image} alt={drinkInfo.name} width={250} height={250} className="rounded-xl object-cover" />
      <h2 className="text-3xl text-center font-semibold">{drinkInfo.name}</h2>
      <div className='flex flex-col items-center justify-center'>
        <h3 className="text-left font-semibold text-2xl underline">Categories</h3>
        <div className='flex flex-wrap justify-center items-center gap-x-4 pt-3 sm:gap-y-0 gap-y-2'>
          <span className="inline-block bg-gray-200 text-gray-800 xs:px-2 px-1 py-1 rounded-md sm:text-md text-sm">{drinkInfo.alcolholic}</span>
          <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md sm:text-md text-sm">{drinkInfo.glass}</span>
          <span className="inline-block bg-gray-200 text-gray-800 sm:px-2 px-1 py-1 rounded-md sm:text-md text-sm">{drinkInfo.category}</span>
        </div>
      </div>


    </div>

  );
}

export default MobileDrinkItemCard