import { Component, OnInit } from '@angular/core';
import { HighScore } from 'src/app/models/high-score';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  currentUserScores:HighScore[] = [];
  highScoreLimit:number = 10; //only display the top 10 scores
  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    //need to put the scores in numeric order

    let tempScores:HighScore[] = [];
    for (let score of this.currentUserService.currentUser.userHighScores) {
      let added:boolean = false;
      for (let i:number = 0; i < tempScores.length; i++) {
        if (score.score >= tempScores[i].score) {
          tempScores.splice(i, 0, score);
          added = true;
          break;
        }
      }

      if (!added) tempScores.push(score);
    }
    
    this.currentUserScores = tempScores;
    if (this.currentUserScores.length > this.highScoreLimit) this.currentUserScores.slice(0, this.highScoreLimit); //only show the first 10 scores
  }

}
