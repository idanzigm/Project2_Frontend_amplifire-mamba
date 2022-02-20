import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private currentUserService:CurrentUserService) { }

  ngOnInit(): void {
  }

}
