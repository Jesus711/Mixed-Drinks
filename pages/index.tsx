import DrinkListItem from "@/components/DrinkListItem";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";
import { Drink } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter();
  const { search } = router.query;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [drinkFilters, setDrinkFilters] = useState<Record<string, string[]>|null>(null);
  const [searchResult, setSearchResult] = useState<Drink[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  const handleSearch = () => {
    router.push(`/?search=${searchValue}`);
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

      const response = await fetch(`/api/search/${search}`)
      const result = await response.json();
      console.log(result);

      localStorage.setItem("search", search);
      localStorage.setItem("searchResult", JSON.stringify(result))

      setSearching(false);
      setSearchResult(result);
    }

    getSearchFilters();

    if(typeof search === 'string'){

      let prevSearch = localStorage.getItem("search");
      let prevResult = localStorage.getItem("searchResult")
      // If previous search found, if previous matches current search
      // and prevResult exists, return previousResults
      // else we send the search request
      if (prevSearch && prevSearch === search && prevResult){
        setSearchResult(JSON.parse(prevResult))
        return;
      }
      
      setSearching(true);
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
    <div className="flex-1 flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl text-orange-400 font-semibold">Search:</h2>
        <div className="flex gap-x-1">
        <input type="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} className="bg-blue-600 rounded-md w-[300px] p-2 text-white text-2xl font-semibold border-none outline-none"/>
        <button onClick={handleSearch} className="bg-orange-400 px-2 py-2 text-2xl rounded-md text-black font-semibold">Search</button>
        </div>
      </div>

      <div className="mt-4">
        {drinkFilters && Object.entries(drinkFilters).map( ([key, value]) => (
          <Filter key={key} name={key} filters={value} />
        ))}
      </div>

        {!searching && search !== undefined && searchResult.length === 0 ? 
        <div>
          <p>No results found for {search}</p>
        </div> 
        : search !== undefined && (
          <div>
            <h1 className="text-4xl font-semibold mb-3">Search Results for {search}:</h1>
            <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
              {searchResult.map((drink, index) => (
                <DrinkListItem drinkInfo={drink} key={index} />
              ))}
            </div>
          </div>
        )}

        {searching && <Loading message={`Searching for ${search}`} />}


    </div>
  );
}
