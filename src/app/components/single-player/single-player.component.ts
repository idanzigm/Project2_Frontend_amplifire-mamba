import { Component, OnInit } from '@angular/core';
import { AbridgedCategory } from 'src/app/models/abridged-category';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {

  public category1:Category; 
  public category2:Category;
  public category3:Category;
  public category4:Category;
  public category5:Category;
  public popCategories:AbridgedCategory[]; 

  public questionStore:Question[]; 

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {}

  setCategory1(c:Category) {
    this.category1 = c; 
  }

  getCategory1() : Category {
    return this.category1; 
  }

  setCategory2(c:Category) {
    this.category2 = c; 
  }

  getCategory2() : Category {
    return this.category2; 
  }

  setCategory3(c:Category) {
    this.category3 = c; 
  }

  getCategory3() : Category {
    return this.category3; 
  }

  setCategory4(c:Category) {
    this.category4 = c; 
  }

  getCategory4() : Category {
    return this.category4; 
  }

  setCategory5(c:Category) {
    this.category5 = c; 
  }

  getCategory5() : Category{
    return this.category5; 
  }

  generateBoard() : void {
    this.setEachCategory(); 
    this.setQuestionStore(); 
  }

  setEachCategory() : void {
    this.questionService.getMostCategories().subscribe((mostPopularArray:Array<AbridgedCategory>) {
      this.popCategories = mostPopularArray as AbridgedCategory[]
    });
    for (let i =0; i<5; i++) {
      let x = Math.floor(Math.random() * this.popCategories.length); 
      if (i=0) {
        this.questionService.getQuestionsByCategory(this.popCategories[i].getId()).subscribe((category:Category) => {
          this.category1 = category as Category
        })
      } 
      if (i=1) {
        this.questionService.getQuestionsByCategory(this.popCategories[i].getId()).subscribe((category:Category) => {
          this.category2 = category as Category
        })
      }
      if (i=2) {
        this.questionService.getQuestionsByCategory(this.popCategories[i].getId()).subscribe((category:Category) => {
          this.category3 = category as Category
        })
      }
      if (i=3) {
        this.questionService.getQuestionsByCategory(this.popCategories[i].getId()).subscribe((category:Category) => {
          this.category4 = category as Category
        })
      }
      if (i=4) {
        this.questionService.getQuestionsByCategory(this.popCategories[i].getId()).subscribe((category:Category) => {
          this.category5 = category as Category
        })
      }
    } 
  }

  setQuestionStore() : void {
    let c1questions200 = []; 
    c1questions200 = this.get200(this.category1.getClues()); 
    let c1question200:Question;
    let x:number = Math.floor(Math.random * c1questions200.length)
    c1question200 = c1questions200[]
    let c1questions400 = []; 
    c1questions400 = this.get400(this.category1.getClues()); 
    let c1questions600 = []; 
    c1questions600 = this.get600(this.category1.getClues()); 
    let c1questions800 = []; 
    c1questions800 = this.get800(this.category1.getClues()); 
    let c1questions1000 = []; 
    c1questions1000 = this.get1000(this.category1.getClues()); 

    let c2questions200 = []; 
    c2questions200 = this.get200(this.category2.getClues()); 
    let c2questions400 = []; 
    c2questions400 = this.get400(this.category2.getClues()); 
    let c2questions600 = []; 
    c2questions600 = this.get600(this.category2.getClues()); 
    let c2questions800 = []; 
    c2questions800 = this.get800(this.category2.getClues()); 
    let c2questions1000 = []; 
    c2questions1000 = this.get1000(this.category2.getClues()); 

    let c3questions200 = []; 
    c3questions200 = this.get200(this.category3.getClues()); 
    let c3questions400 = []; 
    c3questions400 = this.get400(this.category3.getClues()); 
    let c3questions600 = []; 
    c3questions600 = this.get600(this.category3.getClues()); 
    let c3questions800 = []; 
    c3questions800 = this.get800(this.category3.getClues()); 
    let c3questions1000 = []; 
    c3questions1000 = this.get1000(this.category3.getClues());

    let c4questions200 = []; 
    c4questions200 = this.get200(this.category4.getClues()); 
    let c4questions400 = []; 
    c4questions400 = this.get400(this.category4.getClues()); 
    let c4questions600 = []; 
    c4questions600 = this.get600(this.category4.getClues()); 
    let c4questions800 = []; 
    c4questions800 = this.get800(this.category4.getClues()); 
    let c4questions1000 = []; 
    c4questions1000 = this.get1000(this.category4.getClues());

    let c5questions200 = []; 
    c5questions200 = this.get200(this.category5.getClues()); 
    let c5questions400 = []; 
    c5questions400 = this.get400(this.category5.getClues()); 
    let c5questions600 = []; 
    c5questions600 = this.get600(this.category5.getClues()); 
    let c5questions800 = []; 
    c5questions800 = this.get800(this.category5.getClues()); 
    let c5questions1000 = []; 
    c5questions1000 = this.get1000(this.category5.getClues()); 
  }
    
  get200(array:Question[]) : Question[] { 
    let questions200 = []; 
    for (let q of array) {
      if (q.getValue() == 200){
        questions200.push(q); 
      }
    }
    return questions200; 
  }

  get400(array:Question[]) : Question[] { 
    let questions400 = []; 
    for (let q of array) {
      if (q.getValue() == 400){
        questions400.push(q); 
      }
    }
    return questions400; 
  }
   
  get600(array:Question[]) : Question[] { 
    let questions600 = []; 
    for (let q of array) {
      if (q.getValue() == 600){
        questions600.push(q); 
      }
    }
    return questions600; 
  }
  
  get800(array:Question[]) : Question[] { 
    let questions800 = []; 
    for (let q of array) {
      if (q.getValue() == 800){
        questions800.push(q); 
      }
    }
    return questions800; 
  }

  get1000(array:Question[]) : Question[] { 
    let questions1000 = []; 
    for (let q of array) {
      if (q.getValue() == 1000){
        questions1000.push(q); 
      }
    }
    return questions1000; 
  }

}
