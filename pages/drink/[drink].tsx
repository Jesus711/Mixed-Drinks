import DrinkCard from '@/components/DrinkCard';
import Loading from '@/components/Loading';
import MobileDrinkCard from '@/components/MobileDrinkCard';
import { Drink } from '@/types';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Details = () => {

    const [drinkInfo, setDrinkInfo] = useState<Drink|null>(null);

    useEffect(() => {
        const drink = localStorage.getItem("selectedDrink")
        console.log(drink)
        if (drink) {
            setDrinkInfo(JSON.parse(drink));
        }

    }, [])


    if (!drinkInfo) {
        return <Loading message='Getting Info'/>
    }

  return (
    <div className='flex-1 flex flex-col justify-center items-center p-4'>
      <div className='sm:block hidden'>
        <DrinkCard drinkInfo={drinkInfo} />
      </div>
      <div className='sm:hidden block'>
        <MobileDrinkCard drinkInfo={drinkInfo} />
      </div>
    </div>
  )
}

export default Details