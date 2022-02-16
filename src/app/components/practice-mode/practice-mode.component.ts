import { Component, OnInit } from '@angular/core';
import { AbridgedCategory } from 'src/app/models/abridged-category';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-practice-mode',
  templateUrl: './practice-mode.component.html',
  styleUrls: ['./practice-mode.component.css']
})
export class PracticeModeComponent implements OnInit {

  categories:Map<string, number> = new Map<string, number>();
  currentCategoryName:string = "";
  displayCategory:string = "";
  currentDifficulty:number= 0;
  currentQuestion:Question = new Question(0, "", "", 0, new Category(0, "", 0, []), "");
  userAnswer:string = "";
  currentCategoryQuestions:Array<Question[]> = [];

  constructor(private questionService:QuestionService, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getMostCategories().subscribe(
      (response:Map<string, number>)=> {
        this.categories = response;
      }
    )
  }

  difficultyChange():void {
    //when the difficulty changes reset the question that's currently displaying
    this.getCategoryQuestion();
    this.userAnswer = "";
  }

  loadCategoryQuestions():void {
    //any time a new category is selected the currentCategory field will be updated
    //furthermore, the currently displayed question should become null
    this.currentQuestion = new Question(0, "", "", 0, new Category(0, "", 0, []), "");
    this.userAnswer = "";

    if (this.currentCategoryName != this.displayCategory) {
      //Find out if I should be using currentCategoryName or displayCategory
      this.currentCategoryQuestions = this.categoryService.loadCategoryQuestions(this.findCategoryInArray(this.currentCategoryName));
    }

    this.displayCategory = this.currentCategoryName;
    //After loading a new category, display a question in the text box
    this.getCategoryQuestion();
  }

  findCategoryInArray(categoryName:string):number {
    console.log(categoryName);
    if (this.categories){
      return this.categories.get(categoryName) as number;
    }

    /*
    for (let cat of this.categories) {
      if (cat.title == categoryName) 
        return cat.id;
    }
    */

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
    if (this.userAnswer == this.currentQuestion.answer) alert("Correct, good job!");
    else alert("Sorry incorrect, please try again.");
  }

  revealAnswer():void {
    this.userAnswer = this.currentQuestion.answer;
  }

}
