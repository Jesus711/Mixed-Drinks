import React from 'react'

const SearchOptionButton = ({searchCategory, option, handleOptionClick}: {searchCategory: string, option: string, handleOptionClick: (option: string) => void})  => {
  return (
        <button 
            onClick={() => handleOptionClick(option)} 
            className={`${searchCategory === option ? "text-black bg-orange-400" : "bg-white text-black"} hover:cursor-pointer rounded-md lg:px-3 px-2 lg:py-2 py-1`}
        >
            {option}
        </button>
  )
}

export default SearchOptionButton