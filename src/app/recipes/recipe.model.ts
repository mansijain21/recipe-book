// Here we will use vanilla TypeScript to define the structure of an object Recipe to be used continuously in our app

import { Ingredient } from "../shared/ingredient.model";

export class Recipe
{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredientsNeeded: Ingredient[];

    constructor(name: string, desp: string, imageP: string, ing: Ingredient[])
    {
        this.name = name;
        this.description = desp;
        this.imagePath = imageP;
        this.ingredientsNeeded = ing;
    }
}