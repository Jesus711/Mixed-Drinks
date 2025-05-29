import { useState } from 'react'

const Filter = ({ name, filters, searchCategory, handleSearch, search }: { name: string, filters: string[], searchCategory: string, handleSearch: (option?: string) => void, search: string }) => {

    const [toggleFilters, setToggleFilters] = useState<boolean>(false);



    return (
        <div className={`${searchCategory === name ? "flex" : "hidden"} w-full flex-col justify-center mx-2`}>
            <div className='flex text-center sm:flex-row flex-col justify-center items-center gap-x-2 mb-2'>
                <p className='text-center lg:text-2xl sm:text-lg font-semibold'>Click on any option below to begin searching</p>
                <button onClick={() => setToggleFilters((prev) => !prev)} className={`lg:text-xl text-md p-1.5 text-black font-semibold rounded-md bg-orange-400`}>{toggleFilters ? "Show Filters" : "Hide Filters"}</button>
            </div>

            <ul className={`${!toggleFilters ? 'lg:flex' : 'lg:hidden'} hidden flex-wrap justify-center gap-x-3 items-center gap-y-2`}>
                {filters.map((filter) => (
                    <li
                        key={filter + name}
                        className={`${search === filter && searchCategory === name ? "bg-orange-400 text-black font-bold" : "bg-gray-300 text-black"} rounded-md lg:py-2 py-1 lg:px-3 px-2 lg:text-lg text-md hover:cursor-pointer hover:bg-orange-400 hover:text-black`}
                        onClick={() => handleSearch(filter)}
                    >
                        {filter}
                    </li>
                ))}
            </ul>

            <ul className={`lg:hidden ${!toggleFilters ? 'flex' : 'hidden'} flex-wrap justify-center gap-x-3 items-center gap-y-2`}>
                {filters.map((filter) => (
                    <li
                        key={filter + name}
                        className={`${search === filter && searchCategory === name ? "bg-orange-400 text-black font-bold" : "bg-gray-300 text-black"} rounded-md lg:py-2 py-1 lg:px-3 px-2 lg:text-lg text-md hover:cursor-pointer hover:bg-orange-400 hover:text-black`}
                        onClick={() => {
                            handleSearch(filter);
                            setToggleFilters((prev) => !prev);
                        }
                        }
                    >
                        {filter}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Filter