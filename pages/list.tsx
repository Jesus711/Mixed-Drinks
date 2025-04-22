import DrinkListItem from '@/components/DrinkListItem';
import Loading from '@/components/Loading';
import { Drink } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const capitalLetters: string[] = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const List = () => {

  const [activeChar, setActiveChar] = useState<string>("");
  const [drinksList, setDrinksList] = useState<Drink[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { letter } = router.query;

  const getDrinksWithLetter = async (char: string) => {
    setActiveChar(char);

    const prevChar = localStorage.getItem('prevChar')
    const prevFetch = localStorage.getItem('drinkList');

    // If a previous char was selected and fetched
    // Check if previous char matches current char to restore previous result
    // else fetch list beginning with different char
    if (prevChar && prevFetch && prevChar === char) {
      const list = JSON.parse(prevFetch);
      setDrinksList(list);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`/api/list-drinks/${char}`)
    // If response is bad, empty list
    if (!response.ok){
      setDrinksList([])
    }
    else{
      const drinks: Drink[] = await response.json();
      setDrinksList([])
      // Empty drink list
      // if the retrieve list is not empty, update Drink List and store results
      if(drinks.length !== 0){
        setDrinksList(drinks); 
        localStorage.setItem('drinkList', JSON.stringify(drinks))
        localStorage.setItem('prevChar', char);
      }
    }
    setTimeout(() => setIsLoading(false), 500);
  }

  // Navigates to include the selected character in the url
  // to fetch the drinks or retrieve previous result
  const handleLetterClick = (char: string) => {
    router.push(`/list?letter=${char}`)
  }


  useEffect(() => {
    // Check the letter query received from useRouter
    // if it is non empty and in the capitalLetters array, then fetch drinks for that letter
    // else, set the list to empty and active char to empty
    if (typeof letter === 'string' && capitalLetters.includes(letter.toUpperCase())) {
      setIsLoading(true);
      getDrinksWithLetter(letter)
    } else {
      setDrinksList([])
      setActiveChar("")
    }
  }, [letter])

  
  return (
    <section id="drinks-by-letter" className='flex-1 flex flex-col justify-start items-center'>
      <h2 className='text-center text-3xl font-semibold'>List Drinks by the first letter</h2>
      {/* Displays all capital letters. Active char will be orange */}
      <ul className='flex gap-x-6 justify-center items-center mt-5'>
        {capitalLetters.map((char, index) => (
          <li 
            key={index} 
            className={`underline font-semibold text-3xl hover:cursor-pointer hover:text-cyan-500 ${activeChar === char && "text-orange-400"}`}
            onClick={() => handleLetterClick(char)}
          >
            {char}
          </li> 
        ))}
      </ul>

      {/* Message to tell user to select a char to begin fetching drinks */}
      {activeChar === "" && <p className='flex-1 flex justify-center items-center text-orange-400 text-3xl text-center font-semibold'>Click on the any letter to see the drinks starting with that letter</p>}

      {/* Showing Loading message. Then show Drinks List with instruction on the top */}
      {isLoading ?
      <Loading message={`Loading Drinks that start with ${activeChar}...`}/>
      : 
        <div className='pt-5'>
          {activeChar && !isLoading && drinksList.length > 0 && <h3 className='text-center font-bold text-2xl'>Click drink card to see instructions and more!</h3>}
          <div className='mt-8 flex-1 flex flex-wrap justify-center items-center gap-4'>
          
            {drinksList.map((drink, index) => (
              <DrinkListItem key={index} drinkInfo={drink} />
            ))}
          </div> 
        </div>
      }

      {/* Check if page is done loading, user selected a char and no drinks were found */}
      {!isLoading && activeChar && drinksList.length === 0 && <h2 className='text-orange-400 text-2xl font-semibold'>No Drinks starting with <span className='text-3xl underline'>{activeChar}</span> were found.</h2>}

    </section> 
  )
}

export default List