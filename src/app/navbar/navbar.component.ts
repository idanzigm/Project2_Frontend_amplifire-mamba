import { LoginComponent } from '../components/login/login.component';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';
import { LoginAttempt } from '../models/login-attempt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  currentUser!: CurrentUserService;

  constructor(private user: CurrentUserService) { }

  submitInfo(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
