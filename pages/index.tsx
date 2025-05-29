import DrinkListItem from "@/components/DrinkListItem";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";
import MobileDrinkItemCard from "@/components/MobileDrinkItemCard";
import SearchOptionButton from "@/components/SearchOptionButton";
import { Drink } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const categories_mapping: {[key: string]: string} = {
  "Coffee__Tea" : "Coffee / Tea",
  "Other__Unknown" : "Other / Unknown",
  "Punch__Party_Drink" : "Punch / Party Drink",
  "MargaritaCoupette glass" : "Margarita/Coupette glass"

}

export default function Home() {

  const router = useRouter();
  const { search, category } = router.query;

  // Format user's search to display without underscore characters
  let searchFormatted = "";
  if (typeof search === "string"){
    searchFormatted = search.split("_").join(" ")
    if (search in categories_mapping){
      searchFormatted = categories_mapping[search]
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [drinkFilters, setDrinkFilters] = useState<Record<string, string[]>|null>(null);
  const [searchResult, setSearchResult] = useState<Drink[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchCategory, setSearchCategory] = useState<string>("Name");

  const handleSearch = (option?: string) => {
    if (option){
      option = option.replaceAll("/", "")
      option = option.split(" ").join("_");
      console.log(option);
      router.push(`/?search=${option}&category=${searchCategory}`);
    }
    else {
      router.push(`/?search=${searchValue}&category=${searchCategory}`);
    }
  }

  useEffect(() => {
    // Abortcontroller to handle aborting previous fetch requests when user clicks or makes multiple searches
    // without the search not finishing executing
    const abortController: AbortController = new AbortController();
    const signal = abortController.signal;

    const getSearchFilters = async () => {
      let fetchedFilters = sessionStorage.getItem("filters")
      if(fetchedFilters) {
        setDrinkFilters(JSON.parse(fetchedFilters));
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/filters");
      const filters = await response.json();
      console.log(filters)

      sessionStorage.setItem("filters", JSON.stringify(filters))
      setDrinkFilters(filters);
      setIsLoading(false);
    }

    const getSearchQuery = async () => {
      // Try and catch to handle unhandled runtime error
      // Pass the signal of the abortController
      try {
        const response = await fetch(`/api/search/${search}?category=${category}`, {signal})
        const result = await response.json();
        localStorage.setItem("search", search);
        localStorage.setItem("searchResult", JSON.stringify(result))
        setSearchResult(result);
        // Keep setSearching here instead of finally to keep the Loading component display for new search user made
        setSearching(false);

      } catch (error: any){
        if (error.name === "AbortError"){
          console.log("Fetch from previous search aborted")
        } else {
          console.error("Unhandled fetch error:", error);
        }
      }
    }

    getSearchFilters();

    if(typeof search === 'string' && typeof category === 'string' && ["Name", "Category", "Ingredients", "Glass"].includes(category)){

      let prevSearch = localStorage.getItem("search");
      let prevResult = localStorage.getItem("searchResult")
      // If previous search found, if previous matches current search
      // and prevResult exists, return previousResults
      // else we send the search request
      if (prevSearch && prevSearch === search && prevResult){
        setSearchResult(JSON.parse(prevResult))
        setSearchCategory(category)
        return;
      }
      
      setSearching(true);
      setSearchResult([])
      getSearchQuery();
    }
    else {
      setSearchValue("")
      setSearchResult([])
    }

    // Cleanup function to abort the controller when the search changes
    return () => {
      abortController.abort();
    }


  }, [search])

  if (isLoading){
    return (
      <div className="flex-1 w-full h-full m-auto">
      <Loading message="Welcome to Mixed Bevs" messageStyles="text-4xl italic font-semibold"/>
    </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col justify-center items-center">
          <h1 className={`text-center lg:text-6xl text-2xl font-bold text-orange-400`}>Welcome to Mixed Bevs!</h1>
          <p className={`text-center lg:my-2 my-0.5 lg:text-2xl sm:w-auto w-[80%] sm:text-md text-sm font-semibold`}>Select one of the search options below to start finding Mixed Bevs</p>
      </div>


      <div className="mt-3 sm:flex justify-center items-center">
        <h2 className="lg:text-3xl text-xl mr-2 font-bold text-center">Search Options: </h2>
        <div className="flex sm:justify-between sm:flex-nowrap flex-wrap gap-y-2 sm:gap-y-0 justify-center lg:gap-x-4 gap-x-2.5 lg:text-2xl sm:text-lg font-bold hover">
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Name" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Category" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Ingredients" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Glass" />
        </div>

      </div>

      {/* Search Bar */}
      <div className={`${searchCategory === "Name" ? "flex" : "hidden"} w-full lg:mt-5 mt-8 flex-col justify-center items-center`}>
        <div className="w-full flex sm:flex-row flex-col justify-center items-center sm:items-stretch sm:gap-x-1 gap-y-2">
          <input 
            type="search" 
            placeholder="Enter Drink Name..."  
            value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} 
            className="bg-blue-600 rounded-md sm:w-[300px] w-[80%] px-4 py-3 text-white lg:text-2xl sm:text-xl font-semibold border-none outline-none placeholder:text-white"/>
          <button onClick={() => handleSearch()} className="bg-orange-400 px-2 py-2 lg:text-2xl sm:text-xl rounded-md text-black font-semibold">Search</button>
        </div>
      </div>

      {/* Category Search Filters */}
      <div className="my-7">
        {drinkFilters && Object.entries(drinkFilters).map( ([key, value]) => (
          <Filter key={key} name={key} filters={value} searchCategory={searchCategory} handleSearch={handleSearch} search={searchFormatted} />
        ))}
      </div>

        {!searching && search !== undefined && searchResult.length === 0 ? 
        <div>
          <p className="text-3xl text-orange-400 font-bold text-center">No results found for <span className="underline">{searchFormatted}</span></p>
        </div> 
        : search !== undefined && (
          <div>
            <h1 className="lg:text-4xl text-2xl font-semibold mb-3">Search Results for {searchFormatted}:</h1>
            <div className="sm:flex hidden flex-row flex-wrap gap-5 justify-center items-center">
              {searchResult.map((drink, index) => (
                <DrinkListItem drinkInfo={drink} key={index} />
              ))}
            </div>
            <div className='sm:hidden flex mt-8 flex-1 flex-wrap justify-center items-center gap-4'>
            {searchResult.map((drink, index) => (
              <MobileDrinkItemCard key={index} drinkInfo={drink} />
            ))}
          </div> 
          </div>
        )}

        {searching && <Loading message={`Searching for ${searchFormatted}`} />}


    </div>
  );
}
