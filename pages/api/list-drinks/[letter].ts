import { Drink, Ingredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

// Example Drink JSON from TheCocktail DB API
// let drink = {
//   "idDrink":"12162",
//   "strDrink":"Screwdriver",
//   "strDrinkAlternate":null,
//   "strTags":"IBA",
//   "strVideo":"https:\/\/www.youtube.com\/watch?v=ce_YOgaEo3Q",
//   "strCategory":"Ordinary Drink",
//   "strIBA":"Unforgettables",
//   "strAlcoholic":"Alcoholic",
//   "strGlass":"Highball glass",
//   "strInstructions":"Mix in a highball glass with ice. Garnish and serve.",
//   "strInstructionsES":null,
//   "strInstructionsDE":"In einem Highball-Glas mit Eis mischen. Garnieren und servieren.",
//   "strInstructionsFR":null,"strInstructionsIT":"Mescolare in un bicchiere highball con ghiaccio. Guarnire e servire.",
//   "strInstructionsZH-HANS":null,
//   "strInstructionsZH-HANT":null,"strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/8xnyke1504352207.jpg",
//   "strIngredient1":"Vodka",
//   "strIngredient2":"Orange juice",
//   "strIngredient3":null,
//   "strIngredient4":null,
//   "strIngredient5":null,
//   "strIngredient6":null,
//   "strIngredient7":null,
//   "strIngredient8":null,
//   "strIngredient9":null,
//   "strIngredient10":null,
//   "strIngredient11":null,
//   "strIngredient12":null,
//   "strIngredient13":null,
//   "strIngredient14":null,
//   "strIngredient15":null,
//   "strMeasure1":"2 oz ",
//   "strMeasure2":null,
//   "strMeasure3":null,
//   "strMeasure4":null,
//   "strMeasure5":null,
//   "strMeasure6":null,
//   "strMeasure7":null,
//   "strMeasure8":null,
//   "strMeasure9":null,
//   "strMeasure10":null,
//   "strMeasure11":null,
//   "strMeasure12":null,
//   "strMeasure13":null,
//   "strMeasure14":null,
//   "strMeasure15":null,
//   "strImageSource":null,
//   "strImageAttribution":null,
//   "strCreativeCommonsConfirmed":"No",
//   "dateModified":"2017-09-02 12:36:47"
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Drink[]>) {

    const getDrinksWithLetter = async (char: string): Promise<Drink[]> => {

      const drinksWithLetter = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${char}`).then(
        response => response.json()
      )

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
