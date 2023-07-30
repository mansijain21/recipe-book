// import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = 
        [ new Ingredient('apples', 5), 
          new Ingredient('bananas', 12)
        ];

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient(ing: Ingredient)
    {
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    addFromRecipe(ings : Ingredient[])
    {
        this.ingredients = this.ingredients.concat(ings);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    getOneIngredient(index: number)
    {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
    deleteIngredient(index: number)
    {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}