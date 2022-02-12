import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {Category} from 'src/app/models/category';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  questions:Question[] = [];
  pokemon:any[] = [];
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


}
