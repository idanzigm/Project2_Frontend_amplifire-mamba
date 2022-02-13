import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {Category} from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question.service';
import { AbridgedCategory } from 'src/app/models/abridged-category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions:any[] = [];
  mostQuestions:AbridgedCategory[] = [];
  categoryNumber:number = 0;
  continue:boolean = true;
  maxQuestionsLimit:number = 75; //dictates the maximum size of the 'mostQuestions' array
  paginationAmount:number = 100; //100 is the maximum for pagination

  constructor(private quest:QuestionService) { }

  ngOnInit(): void {
  }

  getRandomQuestion():void {
    this.quest.getQuestionsTest().subscribe(
      (response:Question[]) => {
        this.questions = response;
      }
    );
  }

  getCategoryQuestions(cat:number):void {
    this.continue = false;
    this.quest.getQuestionsByCategory(cat).subscribe(
      (response:Category) => {
        this.questions = [];
        for (let currentQuestion of response.clues) {
          let newQuestion = new Question(currentQuestion["id"], currentQuestion["question"], currentQuestion["answer"], currentQuestion["value"], response)
          this.questions.push(newQuestion);
          this.continue = true;
        }
      }
    );
  }

  async getMostPopulousCategories(offset:number): Promise<boolean> {
    //100 is the maximum pagination value for the api
    let response:AbridgedCategory[] = await this.quest.getCategories(offset, this.paginationAmount);

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
      this.quest.sendMostCategories(this.mostQuestions).subscribe(
        (response:number) => {
          if (response == 0) console.log("Successfully added categories!")
          else console.log("Something went wrong.")
        }
      )
    }
  }

}

