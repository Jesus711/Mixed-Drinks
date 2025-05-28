import { Drink, Ingredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Drink>) {

    const getRandomDrink = async () => {
      const random_drink = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
        response => response.json()
      )
      
      return random_drink.drinks[0];
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

    let drink = await getRandomDrink();

    let id: number = Number(drink["idDrink"]);
    let name: string = drink["strDrink"];
    let ingredients: Ingredient[] = [];
    let instructions: string = drink["strInstructions"]
    let alcoholic: string = drink["strAlcoholic"];
    let category: string = drink["strCategory"];
    let glass: string = drink["strGlass"]
    let image: string = await getDrinkThumbnail(id)

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

    const response: Drink = {
      id: id,
      name: name,
      ingredients: ingredients,
      instructions: instructions,
      alcolholic: alcoholic,
      category: category,
      glass: glass,
      image: image,
    }

  res.status(200).json(response);
}
