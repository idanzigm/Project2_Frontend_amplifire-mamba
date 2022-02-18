import { Injectable } from '@angular/core';
import { CategoriesStore } from '../models/storageModels/categories-store';
import { Category } from '../models/category';
import { Question } from '../models/question';
import { QuestionsStore } from '../models/storageModels/questions-store.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public catStore:CategoriesStore; 
  public questionStore:QuestionsStore; 

  constructor(catStore:CategoriesStore, questionStore:QuestionsStore) {
    this.catStore = catStore; 
    this.questionStore = questionStore; 
  }

  storeQuestions(q:Question) : void {
    this.questionStore.appendStore(q); 
  }

  getQuestionsStore() : Array<Question> {
    return this.questionStore.getStore(); 
  }

  storeCategories(c:Category) : void {
    this.catStore.appendStore(c); 
  }

  getCategoryStore() : Array<Category> {
    return this.catStore.getStore(); 
  }
}
