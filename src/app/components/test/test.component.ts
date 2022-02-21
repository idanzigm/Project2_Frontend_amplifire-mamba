import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {Category} from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question.service';
import { AbridgedCategory } from 'src/app/models/abridged-category';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { CurrentGameService } from 'src/app/services/current-game.service';
import { AnswerCompareService } from 'src/app/services/answer-compare.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions:any[] = [];
  mostQuestions:AbridgedCategory[] = [];
  categoryNumber:number = 25;
  continue:boolean = true;
  maxQuestionsLimit:number = 75; //dictates the maximum size of the 'mostQuestions' array
  paginationAmount:number = 100; //100 is the maximum for pagination
  category1:string = "";
  category2:string = "";
  category3:string = "";
  category4:string = "";
  category5:string = "";
  category6:string = "";
  currentQuestionPrompt:string = "";
  currentAnswerPrompt:string = "";
  currentAnswer:string = "";
  easiestValue:string = "";
  easyValue:string = "";
  mediumValue:string = "";
  hardValue:string = "";
  hardestValue:string = "";
  currentClickedButton:string = "";
  currentlySelectedCategory:string = "";
  currentlySelectedDifficutly:number = 0;
  potentialPointValue:number = 0;
  totalPoints:number = 0;

  constructor(private quest:QuestionService, private cat:CategoryService, private currentGame:CurrentGameService, private answerService:AnswerCompareService, private currentUserService:CurrentUserService,
    private router:Router) { }

  ngOnInit(): void {
    this.currentGame.newGame();
  }

  getRandomQuestion():void {
    this.quest.getQuestionsTest().subscribe(
      (response:Question[]) => {
        this.questions = response;
      }
    );
  }

  getRandomQuestion2():void {
    this.quest.getSingleQuestion().subscribe(response => 
      {
        this.questions = response.map(item => 
        {
          return new Question( 
              item.id,
              item.question,
              item.answer,
              item.value,
              item.category,
              item.airdate
          );
        });
      });
  }

  getCategoryQuestions(cat:number):void {
    this.continue = false;
    this.cat.getQuestionsByCategory(cat).subscribe(
      (response:Category) => {
        this.questions = [];
        for (let currentQuestion of response.clues) {
          let newQuestion = new Question(currentQuestion["id"], currentQuestion["question"], currentQuestion["answer"], currentQuestion["value"], response, currentQuestion["airdate"]);
          this.questions.push(newQuestion);
          this.continue = true;
        }
      }
    );
  }

  async getMostPopulousCategories(offset:number): Promise<boolean> {
    //100 is the maximum pagination value for the api
    let response:AbridgedCategory[] = await this.cat.getCategories(offset, this.paginationAmount);

    for (let currentCategory of response) {
      let currentAmount:number = currentCategory.clues_count;

      //before going into the below loop, check to see if the 'mostQuestions' array is at capacity yet.
      //if it is, check the last element to see if the current one is bigger. if not then skip
      if (this.mostQuestions.length == this.maxQuestionsLimit) {
        if (currentAmount <= this.mostQuestions[this.maxQuestionsLimit - 1].clues_count) continue;
      }

      //this is where we put our sorting logic
      for (let i:number = this.mostQuestions.length; i >= 0; i--) {
        //we start at the end of the array and iterate towards the beginning
        if (i == 0) {
          //we've reached the front of the array so add the element to the front
          this.mostQuestions.splice(0, 0, currentCategory); //insert the current category to the front of the array
        }
        else if (currentAmount <= this.mostQuestions[i - 1].clues_count) {
          //insert right before the current location of the array and break
          this.mostQuestions.splice(i, 0, currentCategory); //insert the current category to the front of the array
          break; //since we already inserted element no need to keep iterating through the array
        }
      }

      //make sure that the currently length of the array doesn't exceed our max desired length
      //if so remove the last element of the array
      if (this.mostQuestions.length > this.maxQuestionsLimit) this.mostQuestions.pop();
    }
    return true;
  }

  async gMPC() {
    //delete the current array
    this.mostQuestions = [];

    //synchronously get the categories with the most amount of clues
    //18313 is the upper limit for the offset variable
    let offset:number = 0;

    while (offset < 18313) {
      if (this.continue) {
        await this.getMostPopulousCategories(offset);
        offset += this.paginationAmount;
      }
    }

  }

  sendCategories():void {
    //once the list of most populated categories has been filled out, send them to the database for easy reference in the future.
    //NOTE - there shouldn't really be a need to do this multiple times.

    //TODO: implement a function to delete current categories from database so that the list can potentially be refreshed

    if (this.mostQuestions.length == 0) {
      alert("There aren't any categories to send.")
    }
    else {
      this.cat.sendMostCategories(this.mostQuestions).subscribe(
        (response:number) => {
          if (response == 0) console.log("Successfully added categories!")
          else console.log("Something went wrong.")
        }
      )
    }
  }

  startNewGame():void {
    this.category1 = this.currentGame.categories[0].title;
    this.category2 = this.currentGame.categories[1].title;
    this.category3 = this.currentGame.categories[2].title;
    this.category4 = this.currentGame.categories[3].title;
    this.category5 = this.currentGame.categories[4].title;
    this.category6 = this.currentGame.categories[5].title;

    this.easiestValue = "100";
    this.easyValue = "200";
    this.mediumValue = "300";
    this.hardValue = "400";
    this.hardestValue = "500";

    let startButton = document.getElementById("new-game");
    if (startButton != null) startButton.hidden = true;

    let endButton = document.getElementById("end-game");
    if (endButton != null) endButton.hidden = false;
  }

  loadIndividualQuestion(category:number, question:number, clickedButton:string):void {
    //clicking on one of the question buttons will cause the question text to load in the prompt section
    this.currentQuestionPrompt = this.currentGame.questions[category][question].question;
    this.currentAnswer = this.currentGame.questions[category][question].answer;

    this.currentClickedButton = clickedButton;
    console.log(this.currentClickedButton);

    //load up the potential point value
    this.potentialPointValue = question * 100 + 100;
    console.log(this.potentialPointValue);

    this.currentlySelectedCategory = this.currentGame.categories[category].title;
    this.currentlySelectedDifficutly = question;

    //unhide question elements
    let questionHeader = document.getElementById("question-header");
    if (questionHeader != null) questionHeader.hidden = false;

    let questionPrompt = document.getElementById("question-prompt");
    if (questionPrompt != null) questionPrompt.hidden = false;

    let answerHeader = document.getElementById("answer-header");
    if (answerHeader != null) answerHeader.hidden = false;

    let answerPrompt = document.getElementById("answer-prompt");
    if (answerPrompt != null) answerPrompt.hidden = false;

    let submitAnswer = document.getElementById("submit-answer");
    if (submitAnswer != null) submitAnswer.hidden = false;
  }

  submitAnswer() {
    //add answer comparison function here
    let correct:boolean = this.answerService.compareAnswers(this.currentAnswerPrompt, this.currentAnswer);
    let currentButton = document.getElementById(this.currentClickedButton);
    this.currentAnswerPrompt = ""; //reset answer text box


    if (correct) {
      //add to current point total
      this.currentGame.currentPoints += this.potentialPointValue;
      this.totalPoints = this.currentGame.currentPoints;

      //change color of clicked answer button to green and remove click functionality
      if (currentButton != null) currentButton.className = "btn btn-success navbar-btn"
    }
    else {
      //change color of clicked answer button to red and remove click functionality
      if (currentButton != null) currentButton.className = "btn btn-danger navbar-btn"
    }

    //regardless of a correct or incorrect response we need to update the stat for the user
    this.currentUserService.updateStat(this.currentlySelectedCategory, this.currentlySelectedDifficutly, correct);

    //set current question elements to hidden
    let questionHeader = document.getElementById("question-header");
    if (questionHeader != null) questionHeader.hidden = true;

    let questionPrompt = document.getElementById("question-prompt");
    if (questionPrompt != null) questionPrompt.hidden = true;

    let answerHeader = document.getElementById("answer-header");
    if (answerHeader != null) answerHeader.hidden = true;

    let answerPrompt = document.getElementById("answer-prompt");
    if (answerPrompt != null) answerPrompt.hidden = true;

    let submitAnswer = document.getElementById("submit-answer");
    if (submitAnswer != null) submitAnswer.hidden = true;
  }

  stopCurrentGame():void {
    this.currentGame.endGame();

    //redirect to the main page after a game ends
    this.router.navigateByUrl("");
  }
}

