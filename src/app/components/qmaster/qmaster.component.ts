import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Question } from 'src/app/models/question';
import { Team } from 'src/app/models/team';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-qmaster',
  templateUrl: './qmaster.component.html',
  styleUrls: ['./qmaster.component.css']
})
export class QmasterComponent implements OnInit {

  numTeams:number=0;
  showNameSelectors:boolean = false;
  showButtonSelectNoTeams:boolean = true;
  teams:Array<Team> = [];
  group:any = {};
  showFormTeamNames:boolean = true;
  numQuizzes:number = 20;
  currentQuiz:number = 0;
  questions:any[] = [];
  q:any;
  t1Ans:boolean=false;
  t2Ans:boolean=false;
  t3Ans:boolean=false;
  t4Ans:boolean=false;
  currentAnswer:string='';
  t1:Team = new Team('');
  t2:Team = new Team('');
  t3:Team = new Team('');
  t4:Team = new Team('');
  winner:Team = new Team('');
  winners:Team[] =[];
  showAnswer:boolean = false;
  declareWinner:boolean = false;
  disableBtnGetQ:boolean = false;
  disableBtnSubmitAns:boolean = false;
  winnerMessage:string = ''


  

  // Arr = Array; //Array type captured in a variable
  

  constructor(private quest:QuestionService) { }

  ngOnInit(): void {
  }

  setNumTeams(numChoice:string):void{
    this.numTeams = parseInt(numChoice);
    this.showNameSelectors = true;
    this.showButtonSelectNoTeams = false;
    console.log("number of teams chosen is:"+this.numTeams);
    
  
    // for (let i = 0; i < this.numTeams; i++) {
    //   this.group[i] = new FormControl('');
    // }
    // console.log(this.group);
  }

  
 
  
  userForm = new FormGroup({
    0: new FormControl(''),
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl('')
  }); 

   onFormSubmit(): void {
    console.log('0:' + this.userForm.get([0])?.value);
    console.log('1:' + this.userForm.get([1])?.value);
    console.log('2:' + this.userForm.get([2])?.value);
    console.log('3:' + this.userForm.get([3])?.value);

    this.t1.name = this.userForm.get([0])?.value;
    this.t2.name = this.userForm.get([1])?.value;
    this.t3.name = this.userForm.get([2])?.value;
    this.t4.name = this.userForm.get([3])?.value;
    this.numQuizzes = parseInt(this.userForm.get([4])?.value);

    for (let i = 0; i<4;i++){
      this.teams.push(new Team(this.userForm.get([i])?.value));
    }
    console.log(this.teams[1].name);
    console.log(this.teams[2].name);
    this.showFormTeamNames = false;

    } 

  answerForm = new FormGroup({
    1: new FormControl(''),
    2: new FormControl(''),
    3: new FormControl(''),
    4: new FormControl('')
  }); 
  onSubmitAnswers():void{
    this.disableBtnSubmitAns = true;
    this.showAnswer = true;
    let t1Ans:string = this.answerForm.get([1])?.value;
    let t2Ans:string = this.answerForm.get([2])?.value;
    let t3Ans:string = this.answerForm.get([3])?.value;
    let t4Ans:string = this.answerForm.get([4])?.value;

    if(t1Ans==this.currentAnswer){
      this.t1Ans=true;
      this.t1.score++
    }

    if(t2Ans==this.currentAnswer){
      this.t2Ans=true;
      this.t2.score++
    }

    if(t3Ans==this.currentAnswer){
      this.t3Ans=true;
      this.t3.score++
    }

    if(t4Ans==this.currentAnswer){
      this.t4Ans=true;
      this.t4.score++
    }

    if (this.currentQuiz==this.numQuizzes){
      let winner:Team = new Team('');
      let teams = [this.t1, this.t2, this.t3, this.t4];
      for (let i:number = 0;i<4;i++){
        if (teams[i].score>winner.score){
          this.winners = [];
          winner = teams[i];
          this.winners.push(winner);
        }
        if (teams[i].score==winner.score){this.winners.push(winner);}
      }
      
      this.winner = winner;
      if(this.winners.length==1){this.winnerMessage = "The winner is team"+winner.name+"with score"+winner.score+"points";}
      else{this.winnerMessage = "The result is a tie! Play another game do decide who is the stronger team!"}
      }


    console.log(this.answerForm.get([1])?.value);
    console.log(this.answerForm.get([2])?.value);
    console.log(this.answerForm.get([3])?.value);
    console.log(this.answerForm.get([4])?.value);
    
    this.answerForm.reset();
    console.log(this.t1Ans, this.t2Ans,this.t3Ans,this.t4Ans);
    if(this.currentQuiz==this.numQuizzes){ this.declareWinner = true;}
   
  }

  getRandomQuestion():void {
  //   this.quest.getSingleQuestion().subscribe(
  //     (response:Question[]) => {
  //       this.questions = response;
  //     }
  //   );
  //   console.log(this.questions);
  //   this.q = this.questions[0];
  this.disableBtnSubmitAns = false;
  this.showAnswer = false;
  this.currentQuiz++
  this.t1Ans = false;
  this.t2Ans = false;
  this.t3Ans = false;
  this.t4Ans = false;

  if (this.currentQuiz==this.numQuizzes){this.disableBtnGetQ = true;}

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
    console.log(this.questions[0].answer);
    console.log(this.questions[0].question);
    this.q=this.questions[0].question;
    this.currentAnswer=this.questions[0].answer;
  }

  startNewGame():void{
    this.numTeams=0;
    this.showNameSelectors = false;
    this.showButtonSelectNoTeams = true;
    this.teams = [];
    this.group = {};
    this.showFormTeamNames = true;
    this.numQuizzes = 20;
    this.currentQuiz = 0;
    this.questions = [];
    this.q = undefined;
    this.t1Ans=false;
    this.t2Ans=false;
    this.t3Ans=false;
    this.t4Ans=false;
    this.currentAnswer='';
    this.t1 = new Team('');
    this.t2 = new Team('');
    this.t3 = new Team('');
    this.t4 = new Team('');
    this.winner = new Team('');
    this.winners = [];
    this.showAnswer = false;
    this.declareWinner = false;
    this.disableBtnGetQ = false;
    this.disableBtnSubmitAns = false;
    this.winnerMessage = '';
  }
  
}
