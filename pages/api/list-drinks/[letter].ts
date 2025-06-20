import { Drink, Ingredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse<Drink[]>) {

    const getDrinksWithLetter = async (char: string) => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${char}`)
      const drinksWithLetter = await response.json();
      return drinksWithLetter.drinks;
    }

    const getDrinkThumbnail = async (id: number) => {
      const drinkImage = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then(
        response => response.json()
      )
      console.log(drinkImage.drinks[0]["strDrinkThumb"]);

      if (drinkImage)
        return drinkImage.drinks[0]["strDrinkThumb"]
    
      return null
    }

    
    let { letter } = req.query;
    if (typeof letter !== "string"){
      return
    }

    let drinks = await getDrinksWithLetter(letter)

    // If drinks with the queried letter do not exist return an empty list to the client
    if (!drinks){
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
          measurement: drink[measurement_key]
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
