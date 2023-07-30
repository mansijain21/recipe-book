import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
  @ViewChild('f', {static: false}) slform: NgForm;

  subscription: Subscription;
  editMode = false;
  // true -- in editing mode    false -- not in editing mode
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getOneIngredient(index);
        this.slform.setValue(
          {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        )
      }
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm)
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    else
      this.slService.addIngredient(newIngredient);
    this.editMode = false;
    this.slform.reset();
  }

  onClear()
  {
    this.slform.reset();
    this.editMode = false;
  }

  onDelete()
  {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
