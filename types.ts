interface Drink {
    id: number,
    name: string,
    ingredients: Ingredient[],
    instructions: string,
    alcolholic: string, 
    category: string,
    glass: string,
    image: string | null
}

interface Ingredient {
    name: string,
    measurement: string,
}

export type {
    Drink,
    Ingredient
}