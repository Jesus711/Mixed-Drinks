import DrinkListItem from "@/components/DrinkListItem";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";
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

      const response = await fetch(`/api/search/${search}?category=${category}`)
      const result = await response.json();
      console.log(result);

      localStorage.setItem("search", search);
      localStorage.setItem("searchResult", JSON.stringify(result))

      setSearching(false);
      setSearchResult(result);
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
      <div className="flex flex-col">
          <h1 className={`text-center text-6xl font-bold text-orange-400`}>Welcome to Mixed Bevs!</h1>
          <p className={`text-center my-2 text-2xl font-semibold`}>Select one of the search options below to start finding Mixed Bevs</p>
      </div>


      <div className="mt-3 flex justify-center items-center">
        <h2 className="text-3xl mr-2 font-bold">Search Options: </h2>
        <div className="flex justify-between gap-x-4 text-2xl font-bold hover">
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Name" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Category" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Ingredients" />
          <SearchOptionButton searchCategory={searchCategory} handleOptionClick={(option) => setSearchCategory(option)} option="Glass" />
        </div>

      </div>

      {/* Search Bar */}
      <div className={`${searchCategory === "Name" ? "flex" : "hidden"} mt-5 flex-col justify-center items-center`}>
        <div className="flex gap-x-1">
        <input type="search" placeholder="Enter Drink Name..."  value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} className="bg-blue-600 rounded-md w-[300px] px-4 py-3 text-white text-2xl font-semibold border-none outline-none placeholder:text-white"/>
        <button onClick={() => handleSearch()} className="bg-orange-400 px-2 py-2 text-2xl rounded-md text-black font-semibold">Search</button>
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
            <h1 className="text-4xl font-semibold mb-3">Search Results for {searchFormatted}:</h1>
            <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
              {searchResult.map((drink, index) => (
                <DrinkListItem drinkInfo={drink} key={index} />
              ))}
            </div>
          </div>
        )}

        {searching && <Loading message={`Searching for ${searchFormatted}`} />}


    </div>
  );
}
