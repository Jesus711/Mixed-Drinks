import DrinkCard from '@/components/DrinkCard';
import Loading from '@/components/Loading';
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
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <DrinkCard drinkInfo={drinkInfo} />
    </div>
  )
}

export default Details