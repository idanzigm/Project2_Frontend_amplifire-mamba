import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qmaster',
  templateUrl: './qmaster.component.html',
  styleUrls: ['./qmaster.component.css']
})
export class QmasterComponent implements OnInit {

  numTeams:number = 2;
  showNameSelectors:boolean = false;

  Arr = Array; //Array type captured in a variable
  num:number = 2;

  constructor() { }

  ngOnInit(): void {
  }

  setTeams(numChoice:number):void{
    this.num = numChoice;
    this.showNameSelectors = true;
    console.log("number of teams chosen is:"+this.num);
  }

}
