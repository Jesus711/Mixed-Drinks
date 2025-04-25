import { useState } from 'react'

const Filter = ({name, filters}: {name: string, filters: string[]}) => {

    const [displayFilters, setDisplayFilters] = useState<boolean>(false);

    const handleFilterClick = (filterName: string) => {
        console.log("Getting Drinks matching", filterName)
    }

  return (
    <div className='w-full flex flex-col justify-center items-start mt-3'>
        <div className='flex gap-x-3'>
            <h2 className='text-orange-400 text-3xl font-semibold mb-2'>{name}</h2>
            <button onClick={() => setDisplayFilters((prev) => (!prev))} className={`text-xl underline ${displayFilters ? "text-blue-400" : "text-white"}`}>{displayFilters ? "Hide Search Filters" : "Show Search Filters"}</button>
        </div>
        <ul className={`flex flex-wrap justify-center gap-x-3 items-center gap-y-2 ${displayFilters? 'block' : 'hidden'}`}>
            {filters.map((filter) => (
                <li key={filter + name} className='bg-gray-300 text-gray-700 rounded-md py-2 px-3 text-lg hover:cursor-pointer hover:bg-orange-400 hover:text-black' onClick={() => handleFilterClick(filter)}>{filter}</li>
            ))}
        </ul>
    </div>
  )
}

export default Filter