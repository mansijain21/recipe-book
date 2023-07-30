import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  // false -- new recipe  true -- editing an existing recipe
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = (params['id'] != null);
        this.initForm();
      }
    );
  }

  onSubmit()
  {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredientsNeeded']
    // );
    
    if(this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      // this.recipeService.updateRecipe(this.id, newRecipe);
    else
      this.recipeService.addRecipe(this.recipeForm.value);
      // this.recipeService.addRecipe(newRecipe);
    this.onCancel();
  }

  onCancel()
  {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  private initForm()
  {
    let recipeName = '', 
        recipeImagePath = '', 
        recipeDescription = '', 
        recipeIngredients = new FormArray([]);
    
    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeDetail(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredientsNeeded'])
      {
        for(let i of recipe.ingredientsNeeded)
        {
          recipeIngredients.push( new FormGroup({
            'name': new FormControl(i.name, Validators.required),
            'amount': new FormControl(i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup ({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredientsNeeded': recipeIngredients
    });
  }

  get controls()
  {
    return (<FormArray>this.recipeForm.get('ingredientsNeeded')).controls;
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredientsNeeded')).push( new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredientsNeeded')).removeAt(index);
  }
}