import { Component, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  {

  model: AddCategoryRequest;
  private addCategorySubscribtion?: Subscription;
  
  constructor(private categoryService: CategoryService){
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onFormSubmit(){
    this.addCategorySubscribtion = this.categoryService.addCategory(this.model)
    .subscribe({
      next:(Response)=>{
        console.log('This was successful!');
      },
      error:(error)=>{
        console.log('This was an error!');
      }
    })
  }

}
