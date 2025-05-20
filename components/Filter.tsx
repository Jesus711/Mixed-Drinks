import { useState } from 'react'

const Filter = ({name, filters, searchCategory, handleSearch, search}: {name: string, filters: string[], searchCategory: string, handleSearch: (option?: string) => void, search: string}) => {

  return (
    <div className={`${searchCategory === name ? "flex" : "hidden"} w-full flex-col justify-center mx-2`}>
        <p className='text-center text-2xl font-semibold mb-2'>Click on any option below to begin searching</p>
        <ul className={`flex flex-wrap justify-center gap-x-3 items-center gap-y-2`}>
            {filters.map((filter) => (
                <li 
                    key={filter + name} 
                    className={`${search === filter && searchCategory === name ? "bg-orange-400 text-black font-bold" : "bg-gray-300 text-black"} rounded-md py-2 px-3 text-lg hover:cursor-pointer hover:bg-orange-400 hover:text-black`} 
                    onClick={() => handleSearch(filter)}
                >
                    {filter}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Filter