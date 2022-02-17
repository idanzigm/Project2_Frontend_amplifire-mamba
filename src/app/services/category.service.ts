import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbridgedCategory } from '../models/abridged-category';
import { Category } from '../models/category';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl:string = 'https://jservice.io/api/';
  backendUrl:string = 'http://localhost:8083/';
  currentCategoryQuestions:Array<Question[]> = [];
  //backendUrl:string = 'http://35.174.167.115:7000/';

  constructor(private http:HttpClient) { }

  getQuestionsByCategory(categoryNumber:number): Observable<Category>{
    return this.http.get<Category>(this.apiUrl + 'category?id=' + categoryNumber) as Observable<Category>;
  }

  getCategoriesTest(offset:number, count:number): Observable<AbridgedCategory[]> {
    return this.http.get<AbridgedCategory[]>(this.apiUrl + '/categories?offset=' + offset + "&count=" + count);
  }

  async getCategories(offset:number, count:number): Promise<AbridgedCategory[]> {
    //return this.http.get<AbridgedCategory[]>(this.apiUrl + '/categories?offset=' + offset + "&count=" + count);
    let response = await fetch(this.apiUrl + '/categories?offset=' + offset + "&count=" + count);
    let cats:AbridgedCategory[] = await response.json();
    return cats; //return a promise of the categories?
  }

  sendMostCategories(cats:AbridgedCategory[]): Observable<number> {
    return this.http.post(this.backendUrl +  'mpcategories', cats) as Observable<number>;
  }

  getMostCategories(): Observable<AbridgedCategory[]> {
    return this.http.get(this.backendUrl + 'mpcategories') as Observable<AbridgedCategory[]>;
  }

  sortByDifficulty(catQuestions:Question[]): Array<Question[]> {
    let easiestQuestions:Question[] = [];
    let easyQuestions:Question[] = [];
    let mediumQuestions:Question[] = [];
    let hardQuestions:Question[] = [];
    let hardestQuestions:Question[] = [];

    for (let i: number = 0; i < catQuestions.length; i++) {
      let currentQuestion: Question = catQuestions[i];
      let clue: string = currentQuestion.question;
      let value: number = currentQuestion.value;
      console.log("question clue: " + clue);
      console.log("question value: " + value);
      //Verifies that both the question and the value exist
      //Necessary because some clues/questions don't have a question and/or a value
      if ((clue && value) && (clue != "" && value != 0)) {
        //If the airdate year is earlier than 2001, the question's value is doubled
        //If we decide to implement some kind of functionality similar to double jeopardy, we can just write another conditional
        //and update the values as necessary
        if (parseInt(currentQuestion.airdate.substring(5)) < 2001) {
          currentQuestion.value *= 2;
          value *= 2;
        }

        switch (value) {
          case 200:
            easiestQuestions.push(currentQuestion);
            break;
          case 400:
            easyQuestions.push(currentQuestion);
            break;
          case 600:
            mediumQuestions.push(currentQuestion);
            break;
          case 800:
            hardQuestions.push(currentQuestion);
            break;
          case 1000:
            hardestQuestions.push(currentQuestion);
            break;
          //With the changes mentioned above this default case shouldn't happen, but we'll keep it for now
          default:
            //some of the questions in the API don't have a value assigned so we must skip these
            console.log("found a question with no value");
        }
      }
    }

    //after going through each question, add the individual question arrays to the currentCategoryQuestions array
    let currentCategoryQuestions:Array<Question[]> = [];
    currentCategoryQuestions.push(easiestQuestions);
    currentCategoryQuestions.push(easyQuestions);
    currentCategoryQuestions.push(mediumQuestions);
    currentCategoryQuestions.push(hardQuestions);
    currentCategoryQuestions.push(hardestQuestions);
    return currentCategoryQuestions;
  }
}
