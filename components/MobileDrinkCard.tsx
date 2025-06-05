import React from 'react'
import { Drink } from '@/types';
import Image from 'next/image';


const MobileDrinkCard = ({ drinkInfo }: { drinkInfo: Drink }) => {

    const formatInstructions = () => {

        let formatted: string[] = [];

        let lines = drinkInfo.instructions.split(".")
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].length <= 2) {
                continue;
            }

            formatted.push(lines[i])
        }
        return formatted;
    }

    return (
        <div className="lg:p-4 p-2 rounded-2xl border-4 border-gray-300 flex flex-col justify-center items-center bg-blue-900 text-white shadow-[6px_6px_12px_rgba(59,130,246,0.5)]">
            <Image priority src={drinkInfo.image ? drinkInfo.image : ""} alt={drinkInfo.name} width={300} height={300} className="rounded-xl object-cover" />
            <h2 className="text-[32px] text-center font-semibold text-wrap">{drinkInfo.name}</h2>
            {/*Ingredients + Categories*/}
            <div className='flex flex-col'>
                <h3 className="text-left font-semibold lg:text-[32px] text-2xl">Ingredients & Measurements:</h3>
                <ul className="pl-4 flex flex-col justify-start text-wrap">
                    {drinkInfo?.ingredients.map((ingredient, index) => {
                        if ((ingredient.name === null || ingredient.name === '') && (ingredient.measurement === null || ingredient.measurement === '')) {
                            return;
                        }

                        return (
                            <li key={index} className='lg:text-[26px] text-[22px]'> <span className='font-semibold'>{ingredient.name}</span>{ingredient.measurement && ingredient.measurement !== "/n" ? `: ${ingredient.measurement}` : " - Add Desired Amount"}</li>
                        )
                    })}
                </ul>
                <h3 className="text-center font-semibold lg:text-[32px] text-2xl mt-3">Categories:</h3>
                <div className='flex flex-wrap justify-center items-center gap-x-4 gap-y-2 p-3'>
                    <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.alcolholic}</span>
                    <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.glass}</span>
                    <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-md">{drinkInfo.category}</span>
                </div>
            </div>
            {/* Instructions */}
            <div className='pl-6'>
                <h3 className="font-semibold text-center text-[32px]">Instructions: </h3>
                <ul className='pl-4 flex flex-col justify-center items-start'>
                    {formatInstructions().map((sentence, index) => (
                        <li key={index} className='list-disc text-[24px] text-wrap w-[70%]'>{sentence.charAt(0).toUpperCase() + sentence.slice(1)}</li>
                    )
                    )}
                </ul>
            </div>

        </div>
    );
}
export default MobileDrinkCard