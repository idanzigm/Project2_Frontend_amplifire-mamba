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
    return this.http.get<Category>(this.apiUrl + 'category?id=' + categoryNumber);
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

  getMostCategories(): Observable<Map<string, number>> {
    return this.http.get(this.backendUrl + 'mpcategories') as Observable<Map<string, number>>;
  }

  loadCategoryQuestions(id:number):void {
      this.getQuestionsByCategory(id).subscribe(
        (response:Category) => {
          //console.log(response);
          //get all of the clues from the category and sory into separate arrays based on difficulty
          let allQuestions:Question[] = response.clues;

          let easiestQuestions:Question[] = [];
          let easyQuestions:Question[] = [];
          let mediumQuestions:Question[] = [];
          let hardQuestions:Question[] = [];
          let hardestQuestions:Question[] = [];
          
          for (let i:number = 0; i < allQuestions.length; i++) {
            //Verifies that both the question and the value exist
            //Necessary because some clues/questions don't have a question and/or a value
            if ((allQuestions[i].question && allQuestions[i].value) && (allQuestions[i].question != "" && allQuestions[i].value != 0)){
              //If the airdate year is earlier than 2001, the question's value is doubled
              //If we decide to implement some kind of functionality similar to double jeopardy, we can just write another conditional
              //and update the values as necessary
              if (parseInt(allQuestions[i].airdate.substring(5)) < 2001){
                allQuestions[i].value *= 2;
              }
              
              switch (allQuestions[i].value) {
                case 200:
                  easiestQuestions.push(allQuestions[i]);
                  break;
                case 400:
                  easyQuestions.push(allQuestions[i]);
                  break;
                case 600:
                  mediumQuestions.push(allQuestions[i]);
                  break;
                case 800:
                  hardQuestions.push(allQuestions[i]);
                  break;
                case 1000:
                  hardestQuestions.push(allQuestions[i]);
                  break;
                //With the changes mentioned above this default case shouldn't happen, but we'll keep it for now
                default:
                  //some of the questions in the API don't have a value assigned so we must skip these
                  console.log("found a question with no value");
              }
            }
          }

          //after going through each question, add the individual question arrays to the currentCategoryQuestions array
          this.currentCategoryQuestions = []; //before adding new questions, make sure to remove any existing questions
          this.currentCategoryQuestions.push(easiestQuestions);
          this.currentCategoryQuestions.push(easyQuestions);
          this.currentCategoryQuestions.push(mediumQuestions);
          this.currentCategoryQuestions.push(hardQuestions);
          this.currentCategoryQuestions.push(hardestQuestions);
        }
      )
      
  }
}
