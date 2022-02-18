import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/app/models/stat';
import { User } from 'src/app/models/user';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  currentUser:User = new User(0, "", "", "", "", "", []);
  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
  }

  checkStat(stat:Stat):boolean {
    if ((stat.easiestAttempted > 0) || (stat.easyAttempted > 0) || (stat.mediumAttempted > 0) || (stat.hardAttempted > 0) || (stat.hardestAttempted > 0)) return true;
    return false; 
  }

}
