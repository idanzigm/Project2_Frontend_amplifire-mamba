import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbridgedCategory } from '../models/abridged-category';
import { Category } from '../models/category';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  apiUrl:string = 'https://jservice.io/api';
  backendUrl:string = 'http://localhost:8083';

  constructor(private http:HttpClient) { }

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(this.apiUrl + "/categories");
  }

  getQuestionsTest(): Observable<Question[]>{
    return this.http.get<Question[]>(this.apiUrl +  '/random');
  }


  getQuestionsByCategory(categoryNumber:number): Observable<Category>{
    return this.http.get<Category>(this.apiUrl + '/category?id=' + categoryNumber);
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

}

/*
return this.http
  .post<ISubscriber[]>(
    this.resourceUrl,
    '[{"key": "phoneLineType", "operation": ">", "value": "200"}]',
    {
      params: options
    {
  )
*/