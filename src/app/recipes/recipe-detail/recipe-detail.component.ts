import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit
{
  chosenRecipeDetail: Recipe;
  id: number;

  constructor(private slService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe( (params: Params) => {
        this.id = +params['id'];
        this.chosenRecipeDetail = this.recipeService.getRecipeDetail(this.id);
      }
    );
  }

  addToSL()
  {
    this.slService.addFromRecipe(this.chosenRecipeDetail.ingredientsNeeded);
  }

  onDelete()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
