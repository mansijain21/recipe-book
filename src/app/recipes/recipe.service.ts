import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];
    
    // private recipes: Recipe[] = 
    // [   
    //     new Recipe('Bread Pizza recipe',
    //                 'this is the recipe for quick and easy Bread Pizza', 
    //                 'https://rb.gy/u3zdp',
    //                 [
    //                 new Ingredient('Bread', 2),
    //                 new Ingredient('Sauce', 1)
    //                 ]),
    //     new Recipe('Maggi recipe',
    //                 'this is the recipe for 10 minute Maggi', 
    //                 'https://rb.gy/u3zdp',
    //                 [
    //                     new Ingredient('Noodles', 5),
    //                     new Ingredient('Masala', 8)
    //                 ])
    // ];
    // why private? So no one can access it from outside

    getRecipes()
    {
        return this.recipes.slice();
        // why slice? returns a copy of the array. So no direct changes can be made to the original array
        // this statement returns a pointer to the array of objects
    }

    getRecipeDetail(index: number)
    {
        return this.recipes[index];
    }

    addRecipe(newRecipe: Recipe)
    {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe)
    {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number)
    {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[])
    {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}