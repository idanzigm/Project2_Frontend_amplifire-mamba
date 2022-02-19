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

  public c1question200:Question;
  public c1question400:Question;
  public c1question600:Question;
  public c1question800:Question;
  public c1question1000:Question;
  public c2question200:Question;
  public c2question400:Question;
  public c2question600:Question;
  public c2question800:Question;
  public c2question1000:Question;
  public c3question200:Question;
  public c3question400:Question;
  public c3question600:Question;
  public c3question800:Question;
  public c3question1000:Question;
  public c4question200:Question;
  public c4question400:Question;
  public c4question600:Question;
  public c4question800:Question;
  public c4question1000:Question;
  public c5question200:Question;
  public c5question400:Question;
  public c5question600:Question;
  public c5question800:Question;
  public c5question1000:Question;
  public questionStore:Question[]; 

  public AnswerStore:Answer[]; 

  public displayQuestion:string; 
  public displayQuestionID:number
  public displayAnswer:string; 
  public givenAnswer:string; 

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

  setDisplayQuestion(q:string) {
    this.displayQuestion = q; 
  }

  setDisplayAnswer(a:string) {
    this.displayAnswer = a; 
  }

  //============================================================================
  //============================================================================

  generateBoard() : void {
    this.setEachCategory(); 
    this.setQuestionStore(); 
  }

  //============================================================================
  //============================================================================

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

  //============================================================================
  //============================================================================

  setQuestionStore() : void {
    let c1questions200 = []; 
    c1questions200 = this.get200(this.category1.getClues()); 
    let x:number = Math.floor(Math.random() * c1questions200.length); 
    this.c1question200 = c1questions200[x]; 
    this.questionStore.push(this.c1question200); 

    let c1questions400 = []; 
    c1questions400 = this.get400(this.category1.getClues()); 
    x = Math.floor(Math.random() * c1questions400.length); 
    this.c1question400 = c1questions400[x]; 
    this.questionStore.push(this.c1question400); 

    let c1questions600 = []; 
    c1questions600 = this.get600(this.category1.getClues()); 
    x = Math.floor(Math.random() * c1questions600.length); 
    this.c1question600 = c1questions600[x]; 
    this.questionStore.push(this.c1question600); 

    let c1questions800 = []; 
    c1questions800 = this.get800(this.category1.getClues()); 
    x = Math.floor(Math.random() * c1questions800.length); 
    this.c1question800 = c1questions800[x]; 
    this.questionStore.push(this.c1question800); 

    let c1questions1000 = []; 
    c1questions1000 = this.get1000(this.category1.getClues()); 
    x = Math.floor(Math.random() * c1questions1000.length); 
    this.c1question1000 = c1questions1000[x]; 
    this.questionStore.push(this.c1question1000); 

//============================================================================

    let c2questions200 = []; 
    c2questions200 = this.get200(this.category2.getClues()); 
    x = Math.floor(Math.random() * c2questions200.length); 
    this.c2question200 = c2questions200[x]; 
    this.questionStore.push(this.c2question200);

    let c2questions400 = []; 
    c2questions400 = this.get400(this.category2.getClues()); 
    x = Math.floor(Math.random() * c2questions400.length); 
    this.c2question400 = c2questions400[x]; 
    this.questionStore.push(this.c2question400);

    let c2questions600 = []; 
    c2questions600 = this.get600(this.category2.getClues()); 
    x = Math.floor(Math.random() * c2questions600.length); 
    this.c2question600 = c2questions600[x]; 
    this.questionStore.push(this.c2question600);

    let c2questions800 = []; 
    c2questions800 = this.get800(this.category2.getClues()); 
    x = Math.floor(Math.random() * c2questions800.length); 
    this.c2question800 = c2questions800[x]; 
    this.questionStore.push(this.c2question800);

    let c2questions1000 = []; 
    c2questions1000 = this.get1000(this.category2.getClues()); 
    x = Math.floor(Math.random() * c2questions1000.length); 
    this.c2question1000 = c2questions1000[x]; 
    this.questionStore.push(this.c2question1000);

//============================================================================

    let c3questions200 = []; 
    c3questions200 = this.get200(this.category3.getClues()); 
    x = Math.floor(Math.random() * c3questions200.length); 
    this.c3question200 = c3questions200[x]; 
    this.questionStore.push(this.c3question200);

    let c3questions400 = []; 
    c3questions400 = this.get400(this.category3.getClues()); 
    x = Math.floor(Math.random() * c3questions400.length); 
    this.c3question400 = c3questions400[x];
    this.questionStore.push(this.c3question400);

    let c3questions600 = []; 
    c3questions600 = this.get600(this.category3.getClues()); 
    x = Math.floor(Math.random() * c3questions600.length); 
    this.c3question600 = c3questions600[x];
    this.questionStore.push(this.c3question600);

    let c3questions800 = []; 
    c3questions800 = this.get800(this.category3.getClues()); 
    x = Math.floor(Math.random() * c3questions800.length); 
    this.c3question800 = c3questions800[x];
    this.questionStore.push(this.c3question800);

    let c3questions1000 = []; 
    c3questions1000 = this.get1000(this.category3.getClues());
    x = Math.floor(Math.random() * c3questions1000.length); 
    this.c3question1000 = c3questions1000[x];
    this.questionStore.push(this.c3question1000);

//============================================================================

    let c4questions200 = []; 
    c4questions200 = this.get200(this.category4.getClues()); 
    x = Math.floor(Math.random() * c4questions200.length); 
    this.c4question200 = c4questions200[x];
    this.questionStore.push(this.c4question200);

    let c4questions400 = []; 
    c4questions400 = this.get400(this.category4.getClues()); 
    x = Math.floor(Math.random() * c4questions400.length); 
    this.c4question400 = c4questions400[x];
    this.questionStore.push(this.c4question400);

    let c4questions600 = []; 
    c4questions600 = this.get600(this.category4.getClues()); 
    x = Math.floor(Math.random() * c4questions600.length); 
    this.c4question600 = c4questions600[x];
    this.questionStore.push(this.c4question600);

    let c4questions800 = []; 
    c4questions800 = this.get800(this.category4.getClues()); 
    x = Math.floor(Math.random() * c4questions800.length); 
    this.c4question800 = c4questions800[x];
    this.questionStore.push(this.c4question800);

    let c4questions1000 = []; 
    c4questions1000 = this.get1000(this.category4.getClues());
    x = Math.floor(Math.random() * c4questions1000.length); 
    this.c4question1000 = c4questions1000[x];
    this.questionStore.push(this.c4question1000);

//============================================================================

    let c5questions200 = []; 
    c5questions200 = this.get200(this.category5.getClues()); 
    x = Math.floor(Math.random() * c5questions200.length); 
    this.c5question200 = c5questions200[x];
    this.questionStore.push(this.c5question200);

    let c5questions400 = []; 
    c5questions400 = this.get400(this.category5.getClues()); 
    x = Math.floor(Math.random() * c5questions400.length); 
    this.c5question400 = c5questions400[x];
    this.questionStore.push(this.c5question400);

    let c5questions600 = []; 
    c5questions600 = this.get600(this.category5.getClues()); 
    x = Math.floor(Math.random() * c5questions600.length); 
    this.c5question600 = c5questions600[x];
    this.questionStore.push(this.c5question600);

    let c5questions800 = []; 
    c5questions800 = this.get800(this.category5.getClues()); 
    x = Math.floor(Math.random() * c5questions800.length); 
    this.c5question800 = c5questions800[x];
    this.questionStore.push(this.c5question800);

    let c5questions1000 = []; 
    c5questions1000 = this.get1000(this.category5.getClues()); 
    x = Math.floor(Math.random() * c5questions1000.length); 
    this.c5question1000 = c5questions1000[x];
    this.questionStore.push(this.c5question1000);
  }
    
//============================================================================

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

  //============================================================================
  //============================================================================

  displayPrompt(q:Question)  {
     this.displayQuestion = q.getQuestion(); 
     this.displayQuestionID = q.getId(); 
  }

  storeAnswer(id:number) : void {
    let a:Answer; 
    setId(id); 
    setAnswer(this.givenAnswer); 
    this.answerStore.push(a); 
  }
}
