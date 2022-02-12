import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {Category} from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions:any[] = [];
  pokemon:any[] = [];
  categoryNumber:number = 0;

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
    this.quest.getQuestionsByCategory(cat).subscribe(
      (response:Category) => {
        this.questions = [];
        for (let currentQuestion of response.clues) {
          let newQuestion = new Question(currentQuestion["id"], currentQuestion["question"], currentQuestion["answer"], currentQuestion["value"], response)
          this.questions.push(newQuestion);
        }
      }
    );
  }

}
