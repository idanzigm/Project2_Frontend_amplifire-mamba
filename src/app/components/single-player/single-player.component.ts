import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements OnInit {

  public category1!: Category; 
  public category2!: Category;
  public category3!: Category;
  public category4!: Category;
  public category5!: Category;
  public popCategories: Array<number> = [320, 301, 275, 265, 260, 255, 250, 245, 240, 235, 230, 225, 220, 217, 215, 200, 195, 190, 185, 175, 165, 160, 155, 150, 146, 145, 140, 135, 130, 127, 125, 120, 115, 110, 105]; 

  public c1question200!: Question;
  public c1question400!: Question;
  public c1question600!: Question;
  public c1question800!: Question;
  public c1question1000!: Question;
  public c2question200!: Question;
  public c2question400!: Question;
  public c2question600!: Question;
  public c2question800!: Question;
  public c2question1000!: Question;
  public c3question200!: Question;
  public c3question400!: Question;
  public c3question600!: Question;
  public c3question800!: Question;
  public c3question1000!: Question;
  public c4question200!: Question;
  public c4question400!: Question;
  public c4question600!: Question;
  public c4question800!: Question;
  public c4question1000!: Question;
  public c5question200!: Question;
  public c5question400!: Question;
  public c5question600!: Question;
  public c5question800!: Question;
  public c5question1000!: Question;
  
  public questionStore:Question[] = []; 
  public answerStore:Answer[] = []; 

  public displayQuestion:string = "Display Question"; 
  public displayQuestionID:number = 0; 
  public displayAnswer:string = ""; 
  public displayScore:number = 0;
  public displayCheck:boolean = false; 

  public givenAnswer:string = "Enter Answer Here"; 

  constructor(private questionService:QuestionService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.generateBoard(); 
  }

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

  getQuestionStore() : Question[] {
    return this.questionStore; 
  }

  //============================================================================
  //============================================================================

  generateBoard() : void {
    console.log("inside generateBoard"); 
    this.displayQuestion = "Display Question"
    this.displayCheck = false; 
    this.displayScore = 0; 
    this.setEachCategoryAndQuestionStore(); 
  }

  //============================================================================
  //============================================================================

  setEachCategoryAndQuestionStore() : void {
    console.log("inside setEachCategory"); 
    console.log("popCategories:")
    console.log(this.popCategories); 
    for (let i=0; i<5; i++) {
      let x = Math.floor(Math.random() * this.popCategories.length); 
      console.log("x = " + x + " at " + i)
      if (i==0) {
        this.categoryService.getQuestionsByCategory(this.popCategories[x]).subscribe((category:Category) => {
          this.category1 = category as Category; 
          console.log("category1:"); 
          console.log(this.category1);

          this.setQuestionStoreCategory1();  
          console.log("questionStore"); 
          console.log(this.questionStore); 
        })
        
      } 
      if (i==1) {
        this.categoryService.getQuestionsByCategory(this.popCategories[x]).subscribe((category:Category) => {
          this.category2 = category as Category; 
          console.log("category2:"); 
          console.log(this.category2);

          this.setQuestionStoreCategory2();
          console.log("questionStore"); 
          console.log(this.questionStore); 
        })
        
      }
      if (i==2) {
        this.categoryService.getQuestionsByCategory(this.popCategories[x]).subscribe((category:Category) => {
          this.category3 = category as Category; 
          console.log("category3:"); 
          console.log(this.category3);

          this.setQuestionStoreCategory3();
          console.log("questionStore"); 
          console.log(this.questionStore); 
        })
        
      }
      if (i==3) {
        this.categoryService.getQuestionsByCategory(this.popCategories[x]).subscribe((category:Category) => {
          this.category4 = category as Category;
          console.log("category4:"); 
          console.log(this.category4); 

          this.setQuestionStoreCategory4();
          console.log("questionStore"); 
          console.log(this.questionStore); 
        })
        
      }
      if (i==4) {
        this.categoryService.getQuestionsByCategory(this.popCategories[x]).subscribe((category:Category) => {
          this.category5 = category as Category; 
          console.log("category5:")
          console.log(this.category5);

          this.setQuestionStoreCategory5();
          console.log("questionStore"); 
          console.log(this.questionStore); 
        })
      }
    } 
  }

  //============================================================================
  //============================================================================

  setQuestionStoreCategory1() : void {
    console.log("inside setQuestionStoreCategory1"); 
    
    let c1questions:Question[] = new Array();
    c1questions = this.category1.clues; 
    console.log("c1qs: ");
    console.log(c1questions); 

    let c1questions200:Question[] = new Array(); 
    c1questions200 = this.get200(c1questions); 
    console.log("c1qs200: "); 
    console.log(c1questions200); 
    let x:number = Math.floor(Math.random() * c1questions200.length); 
    this.c1question200 = c1questions200[x]; 
    console.log("c1q200:" + this.c1question200); 
    this.questionStore.push(this.c1question200); 

    let c1questions400:Question[] = new Array(); 
    c1questions400 = this.get400(c1questions); 
    x = Math.floor(Math.random() * c1questions400.length); 
    this.c1question400 = c1questions400[x]; 
    this.questionStore.push(this.c1question400); 

    let c1questions600:Question[] = new Array(); 
    c1questions600 = this.get600(c1questions); 
    x = Math.floor(Math.random() * c1questions600.length); 
    this.c1question600 = c1questions600[x]; 
    this.questionStore.push(this.c1question600); 

    let c1questions800:Question[] = new Array(); 
    c1questions800 = this.get800(c1questions); 
    x = Math.floor(Math.random() * c1questions800.length); 
    this.c1question800 = c1questions800[x]; 
    this.questionStore.push(this.c1question800); 

    let c1questions1000:Question[] = new Array(); 
    c1questions1000 = this.get1000(c1questions); 
    x = Math.floor(Math.random() * c1questions1000.length); 
    this.c1question1000 = c1questions1000[x]; 
    this.questionStore.push(this.c1question1000); 
  }

//============================================================================

  setQuestionStoreCategory2() : void {
    let c2questions:Question[] = new Array();
    c2questions = this.category2.clues; 
    console.log("c1qs: ");
    console.log(c2questions);
    
    let c2questions200:Question[] = new Array(); 
    c2questions200 = this.get200(c2questions); 
    let x = Math.floor(Math.random() * c2questions200.length); 
    this.c2question200 = c2questions200[x]; 
    this.questionStore.push(this.c2question200);

    let c2questions400:Question[] = new Array(); 
    c2questions400 = this.get400(c2questions); 
    x = Math.floor(Math.random() * c2questions400.length); 
    this.c2question400 = c2questions400[x]; 
    this.questionStore.push(this.c2question400);

    let c2questions600:Question[] = new Array(); 
    c2questions600 = this.get600(c2questions); 
    x = Math.floor(Math.random() * c2questions600.length); 
    this.c2question600 = c2questions600[x]; 
    this.questionStore.push(this.c2question600);

    let c2questions800:Question[] = new Array(); 
    c2questions800 = this.get800(c2questions); 
    x = Math.floor(Math.random() * c2questions800.length); 
    this.c2question800 = c2questions800[x]; 
    this.questionStore.push(this.c2question800);

    let c2questions1000:Question[] = new Array(); 
    c2questions1000 = this.get1000(c2questions); 
    x = Math.floor(Math.random() * c2questions1000.length); 
    this.c2question1000 = c2questions1000[x]; 
    this.questionStore.push(this.c2question1000);
  }

//============================================================================

  setQuestionStoreCategory3() : void {
    let c3questions:Question[] = new Array();
    c3questions = this.category3.clues; 
    console.log("c1qs: ");
    console.log(c3questions);
    
    let c3questions200:Question[] = new Array(); 
    c3questions200 = this.get200(c3questions); 
    let x = Math.floor(Math.random() * c3questions200.length); 
    this.c3question200 = c3questions200[x]; 
    this.questionStore.push(this.c3question200);

    let c3questions400:Question[] = new Array(); 
    c3questions400 = this.get400(c3questions) 
    x = Math.floor(Math.random() * c3questions400.length); 
    this.c3question400 = c3questions400[x];
    this.questionStore.push(this.c3question400);

    let c3questions600:Question[] = new Array(); 
    c3questions600 = this.get600(c3questions); 
    x = Math.floor(Math.random() * c3questions600.length); 
    this.c3question600 = c3questions600[x];
    this.questionStore.push(this.c3question600);

    let c3questions800:Question[] = new Array(); 
    c3questions800 = this.get800(c3questions); 
    x = Math.floor(Math.random() * c3questions800.length); 
    this.c3question800 = c3questions800[x];
    this.questionStore.push(this.c3question800);

    let c3questions1000:Question[] = new Array(); 
    c3questions1000 = this.get1000(c3questions);
    x = Math.floor(Math.random() * c3questions1000.length); 
    this.c3question1000 = c3questions1000[x];
    this.questionStore.push(this.c3question1000);
  }

//============================================================================

  setQuestionStoreCategory4() : void {
    let c4questions:Question[] = new Array();
    c4questions = this.category4.clues; 
    console.log("c1qs: ");
    console.log(c4questions);
    
    let c4questions200:Question[] = new Array(); 
    c4questions200 = this.get200(c4questions); 
    let x = Math.floor(Math.random() * c4questions200.length); 
    this.c4question200 = c4questions200[x];
    this.questionStore.push(this.c4question200);

    let c4questions400:Question[] = new Array(); 
    c4questions400 = this.get400(c4questions); 
    x = Math.floor(Math.random() * c4questions400.length); 
    this.c4question400 = c4questions400[x];
    this.questionStore.push(this.c4question400);

    let c4questions600:Question[] = new Array(); 
    c4questions600 = this.get600(c4questions); 
    x = Math.floor(Math.random() * c4questions600.length); 
    this.c4question600 = c4questions600[x];
    this.questionStore.push(this.c4question600);

    let c4questions800:Question[] = new Array(); 
    c4questions800 = this.get800(c4questions); 
    x = Math.floor(Math.random() * c4questions800.length); 
    this.c4question800 = c4questions800[x];
    this.questionStore.push(this.c4question800);

    let c4questions1000:Question[] = new Array(); 
    c4questions1000 = this.get1000(c4questions);
    x = Math.floor(Math.random() * c4questions1000.length); 
    this.c4question1000 = c4questions1000[x];
    this.questionStore.push(this.c4question1000);
  }

//============================================================================

  setQuestionStoreCategory5() : void {
    let c5questions200:Question[] = new Array(); 
    c5questions200 = this.get200(this.category5.clues); 
    let x = Math.floor(Math.random() * c5questions200.length); 
    this.c5question200 = c5questions200[x];
    this.questionStore.push(this.c5question200);

    let c5questions400:Question[] = new Array(); 
    c5questions400 = this.get400(this.category5.clues); 
    x = Math.floor(Math.random() * c5questions400.length); 
    this.c5question400 = c5questions400[x];
    this.questionStore.push(this.c5question400);

    let c5questions600:Question[] = new Array(); 
    c5questions600 = this.get600(this.category5.clues); 
    x = Math.floor(Math.random() * c5questions600.length); 
    this.c5question600 = c5questions600[x];
    this.questionStore.push(this.c5question600);

    let c5questions800:Question[] = new Array(); 
    c5questions800 = this.get800(this.category5.clues); 
    x = Math.floor(Math.random() * c5questions800.length); 
    this.c5question800 = c5questions800[x];
    this.questionStore.push(this.c5question800);

    let c5questions1000:Question[] = new Array(); 
    c5questions1000 = this.get1000(this.category5.clues); 
    x = Math.floor(Math.random() * c5questions1000.length); 
    this.c5question1000 = c5questions1000[x];
    this.questionStore.push(this.c5question1000);
  }
    
//============================================================================

  get200(array:Question[]) : Question[] { 
    let questions200:Question[] = new Array();; 
    for (let q of array) {
      if (q.value == 100){
        questions200.push(q); 
      }
    }
    return questions200; 
  }

  get400(array:Question[]) : Question[] { 
    let questions400:Question[] = new Array();; 
    for (let q of array) {
      if (q.value == 200){
        questions400.push(q); 
      }
    }
    return questions400; 
  }
   
  get600(array:Question[]) : Question[] { 
    let questions600:Question[] = new Array();; 
    for (let q of array) {
      if (q.value == 300){
        questions600.push(q); 
      }
    }
    return questions600; 
  }
  
  get800(array:Question[]) : Question[] { 
    let questions800:Question[] = new Array();; 
    for (let q of array) {
      if (q.value == 400){
        questions800.push(q); 
      }
    }
    return questions800; 
  }

  get1000(array:Question[]) : Question[] { 
    let questions1000:Question[] = new Array();; 
    for (let q of array) {
      if (q.value == 500){
        questions1000.push(q); 
      }
    }
    return questions1000; 
  }

  //============================================================================
  //============================================================================

  displayPrompt(q:Question)  {
     this.displayQuestion = q.question; 
     this.displayQuestionID = q.id; 
  }

  storeAnswer() : void {
    let a:Answer = new Answer(this.displayQuestionID, this.givenAnswer); 
    this.answerStore.push(a); 
    this.givenAnswer = "Enter Answer Here"; 
    console.log(this.answerStore); 
  }

//=======================================================================================
//=======================================================================================

  score() : void {
    let score:number = 0; 
    for (let a of this.answerStore) {
      let x:number = 0; 
      x = a.id;
      for (let q of this.questionStore)  {
        if (q.id == x) {
          if (a.givenAnswer == q.answer) {
            score = score + (q.value * 2); 
          }
        }
      }
    }
    this.displayScore = score; 
    this.displayCheck = true; 
  }

  getGivenAnswer(id:number) : string{
    let ga:string = ""; 
    for (let a of this.answerStore) {
      if (id == a.id) {
        ga = a.givenAnswer; 
        return ga; 
      } else {
        ga = ""; 
      }
      return ga; 
    }
    return ga; 
  }

  ngStyle(q:Question) {
    if (this.getGivenAnswer(q.id) == q.answer) {
      return "background-color=green"
    } else {
      return "background-color=red"
    }
  }

}
