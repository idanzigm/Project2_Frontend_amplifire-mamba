import { Component, OnInit } from '@angular/core';
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
    console.log(this.currentUser.userStats);
  }

}
