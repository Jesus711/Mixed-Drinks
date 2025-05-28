import { Drink, Ingredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const categories_mapping: {[key: string]: string} = {
  "Coffee__Tea" : "Coffee_/_Tea",
  "Other__Unknown" : "Other_/_Unknown",
  "Punch__Party_Drink" : "Punch_/_Party_Drink",
  "MargaritaCoupette glass" : "Margarita/Coupette glass"

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Drink[]>) {

    const getNameSearchResults = async (value: string) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        if(!response.ok){
          return []
        }
        const result = await response.json();
        return result.drinks;
    }


    const getCategorySearchResults = async (value: string) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
        if(!response.ok || response.status === 404 || response.status === 500){
          return []
        }
        const result = await response.json();
        
        let drinks = [];

        for(let i = 0; i < result.drinks.length; i++) {
          let drink_id = result.drinks[i]["idDrink"]
          const details = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`)
          const info = await details.json();

          drinks.push(info.drinks[0])
        }
        return drinks;
    }


    const getIngredientSearchResults = async (value: string) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`)
        if(!response.ok){
          return []
        }
        const result = await response.json();
        let drinks = [];

        for(let i = 0; i < result.drinks.length; i++) {
          let drink_id = result.drinks[i]["idDrink"]
          const details = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`)
          const info = await details.json();

          drinks.push(info.drinks[0])
        }
        return drinks;
    }

    const getGlassSearchResults = async (value: string) => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${value}`)
        if(!response.ok){
          return []
        }
        const result = await response.json();
        let drinks = [];

        for(let i = 0; i < result.drinks.length; i++) {
          let drink_id = result.drinks[i]["idDrink"]
          const details = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink_id}`)
          const info = await details.json();
          drinks.push(info.drinks[0])
        }
        return drinks;
    }

    let { value, category } = req.query;
    if (typeof value !== "string"){
      return
    }

    if (value in categories_mapping){
      value = categories_mapping[value];
    }

    let drinks = []

    if (category === "Name"){
      drinks = await getNameSearchResults(value);
    } else if (category === "Category"){
      drinks = await getCategorySearchResults(value);
    } else if (category === "Ingredients"){
      drinks = await getIngredientSearchResults(value);
    } else if (category === "Glass"){
      drinks = await getGlassSearchResults(value);
    }
    
    console.log(drinks)
    // If drinks with the queried search do not exist return an empty list to the client
    if (!drinks){
      console.log("Failed", category, value)
      res.status(200).json([])
      return;
    }

    // Iterates through all drinks retrieved starting with the queried letter
    // Creates Drink objects, storing all necessary information
    const response: Drink[] = [];
    for(let i = 0; i < drinks.length; i++) {

      let drink = drinks[i];

      let id: number = Number(drink["idDrink"]);
      let name: string = drink["strDrink"];
      let ingredients: Ingredient[] = [];
      let instructions: string = drink["strInstructions"]
      let alcoholic: string = drink["strAlcoholic"];
      let category: string = drink["strCategory"];
      let glass: string = drink["strGlass"]
      let image = drink["strDrinkThumb"]

      for(let i = 1; i < 16; i++) {
        let ingred_key: string = `strIngredient${i}`;
        let measurement_key: string = `strMeasure${i}`;
        if (drink[ingred_key] === null){
          continue
        }
        let ingredient: Ingredient = {
          name: drink[ingred_key],
          measurement: drink[measurement_key] === "/n" ? null : drink[measurement_key]
        };

        ingredients.push(ingredient);
      }

      const drinkItem: Drink = {
        id: id,
        name: name,
        ingredients: ingredients,
        instructions: instructions,
        alcolholic: alcoholic,
        category: category,
        glass: glass,
        image: image,
      }

      response.push(drinkItem);
    }
  res.status(200).json(response);
}
