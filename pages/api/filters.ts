import { Drink, Ingredient } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

// Example Drink JSON from TheCocktail DB API
let drink = {
    "idDrink": "12162",
    "strDrink": "Screwdriver",
    "strDrinkAlternate": null,
    "strTags": "IBA",
    "strVideo": "https:\/\/www.youtube.com\/watch?v=ce_YOgaEo3Q",
    "strCategory": "Ordinary Drink",
    "strIBA": "Unforgettables",
    "strAlcoholic": "Alcoholic",
    "strGlass": "Highball glass",
    "strInstructions": "Mix in a highball glass with ice. Garnish and serve.",
    "strInstructionsES": null,
    "strInstructionsDE": "In einem Highball-Glas mit Eis mischen. Garnieren und servieren.",
    "strInstructionsFR": null, "strInstructionsIT": "Mescolare in un bicchiere highball con ghiaccio. Guarnire e servire.",
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null, "strDrinkThumb": "https:\/\/www.thecocktaildb.com\/images\/media\/drink\/8xnyke1504352207.jpg",
    "strIngredient1": "Vodka",
    "strIngredient2": "Orange juice",
    "strIngredient3": null,
    "strIngredient4": null,
    "strIngredient5": null,
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": "2 oz ",
    "strMeasure2": null,
    "strMeasure3": null,
    "strMeasure4": null,
    "strMeasure5": null,
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": null,
    "strImageAttribution": null,
    "strCreativeCommonsConfirmed": "No",
    "dateModified": "2017-09-02 12:36:47"
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getCategoryFilters = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
        if (response.ok) {
            const categories = await response.json();

            let filters = [];
            for(let i = 0; i < categories.drinks.length; i++){
                filters.push(categories.drinks[i].strCategory);
            }
            filters.sort();
            return filters;
        }

        return false;
    }
    const getGlassFilters = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
        if (response.ok) {
            const glass = await response.json();

            let filters = [];
            for(let i = 0; i < glass.drinks.length; i++){
                filters.push(glass.drinks[i].strGlass);
            }
            filters.sort();

            return filters;
        }

        return false;
    }
    const getIngredientsFilters = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
        if (response.ok) {
            const ingredients = await response.json();

            let filters = [];
            for(let i = 0; i < ingredients.drinks.length; i++){
                filters.push(ingredients.drinks[i].strIngredient1);
            }
            filters.sort();

            return filters;
        }

        return false;
    }
    const getAlcholFilters = async () => {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
        if (response.ok) {
            const alcohol = await response.json();

            let filters = [];
            for(let i = 0; i < alcohol.drinks.length; i++){
                filters.push(alcohol.drinks[i].strAlcoholic);
            }
            filters.sort();

            return filters;
        }

        return false;
    }

    let categoriesFilters = await getCategoryFilters();
    let glassFilters = await getGlassFilters();
    let ingredientFilters = await getIngredientsFilters();
    let alcoholFilters = await getAlcholFilters();
    if (!categoriesFilters) {
        res.status(200).json({message: "No Category Filters Found"})
    }

    let response = {
        'Category': categoriesFilters,
        'Alcohol': alcoholFilters,
        'Glass': glassFilters,
        'Ingredients' : ingredientFilters,
    }


    res.status(200).json(response);
}
