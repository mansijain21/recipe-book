import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";

@Injectable(
    // { providedIn: 'root' }
)

export class DataStorageService
{
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes()
    {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-9fd45-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }
    // put overwrites everything in the url
    // post only pushes 1 value at a time

    fetchRecipes()
    {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-9fd45-default-rtdb.firebaseio.com/recipes.json')
        .pipe( map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredientsNeeded: recipe.ingredientsNeeded ? recipe.ingredientsNeeded : [] };
            });
        }),
        tap( recipes => {
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}