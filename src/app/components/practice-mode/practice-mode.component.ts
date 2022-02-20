import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbridgedCategory } from 'src/app/models/abridged-category';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { AnswerCompareService } from 'src/app/services/answer-compare.service';
import { CategoryService } from 'src/app/services/category.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-practice-mode',
  templateUrl: './practice-mode.component.html',
  styleUrls: ['./practice-mode.component.css']
})
export class PracticeModeComponent implements OnInit {

  categories:Map<string, number> = new Map<string, number>();
  catArray:AbridgedCategory[] = [];
  currentCategoryName:string = "";
  displayCategory:string = "";
  currentDifficulty:number= 0;
  currentQuestion:Question = new Question(0, "", "", 0, new Category(0, "", 0, []), "");
  userAnswer:string = "";
  currentCategoryQuestions:Array<Question[]> = [];

  constructor(private questionService:QuestionService, private categoryService:CategoryService, private currentUserService:CurrentUserService, 
    private answerCompare:AnswerCompareService, private router:Router) { }

  ngOnInit(): void {
    //before doing anything, we need to make sure that a user is actually logged on. for whatever reason if no one's logged in,
    //we need to restrict access to this page

    if (this.currentUserService.currentUser.userId != 0) {
      this.categoryService.getMostCategories().subscribe(
        (response:AbridgedCategory[])=> {
          this.catArray = response;
          this.catArray.forEach(element => 
            this.categories.set(element.title, element.id)
          );
          
          //after the categories have been loaded, select a random one to display
          // let randomNumber:number = Math.floor(Math.random() * this.catArray.length);
          // let selectedCategory = document.getElementById("categoryList")?.getElementsByTagName("option")[randomNumber];
  
          // if (selectedCategory != undefined) {
          //   selectedCategory.selected = true;
          //   console.log(selectedCategory.value);
          // }
          // console.log("yeeet");
        }
      );
    }
    else {
      alert("You must be signed in to view this page.");
      this.router.navigateByUrl(""); //navigate back to the main page
    }
    
  }

  difficultyChange():void {
    //when the difficulty changes reset the question that's currently displaying
    this.loadCategoryQuestions();
    this.getCategoryQuestion();
    this.userAnswer = "";
  }

  loadCategoryQuestions():void {
    //any time a new category is selected the currentCategory field will be updated
    //furthermore, the currently displayed question should become null
    this.currentQuestion = new Question(0, "", "", 0, new Category(0, "", 0, []), "");
    this.userAnswer = "";

    if (this.currentCategoryName != this.displayCategory) {
      this.categoryService.getQuestionsByCategory(this.findCategoryInArray(this.currentCategoryName)).subscribe(
        (response:Category) => {
          let cat:Category = response;
          let catQuestions:Question[] = cat.clues;
          this.currentCategoryQuestions = this.categoryService.sortByDifficulty(catQuestions);
          this.displayCategory = this.currentCategoryName;
          //After loading a new category, display a question in the text box
          this.getCategoryQuestion();
        }
      );
    }
  }

  findCategoryInArray(categoryName:string):number {
    if (this.categories){
      return this.categories.get(categoryName) as number;
    }

    //if we can't find the category for some reason return a negative number to show an error occured
    return -1;
  }

  getCategoryQuestion():void {
    //look at the length of the question array for the selected difficulty. Generate a random number between 0 and the length
    //of this array - 1 (inclusive) and set that as the current question

    //TODO: Currently all questions are viewable, if we want to limit the questions that can actually get asked during the practice game this would be the
    //place to do it

    let randomNumber:number = Math.floor(Math.random() * this.currentCategoryQuestions[this.currentDifficulty].length)
    this.currentQuestion = this.currentCategoryQuestions[this.currentDifficulty][randomNumber];
    this.userAnswer = ""; //reset whatever answer is currently in the input box
  }

  checkAnswer():void {
    let correct:boolean = false;
    if (this.answerCompare.compareAnswers(this.userAnswer,this.currentQuestion.answer)) {
      alert("Correct, good job!");
      correct = true;
    }
    else {
      alert("Sorry incorrect, please try again.");
    }
    //update statistics for user on incorrect answer
    //no longer update stats in practice mode
    //this.currentUserService.updateStat(this.displayCategory, this.currentDifficulty, correct);
  }

  revealAnswer():void {
    this.userAnswer = this.currentQuestion.answer;
  }

}
