import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAttempt } from 'src/app/models/login-attempt';
import { User } from 'src/app/models/user';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginAttempt:LoginAttempt;

  constructor(private currentUserService:CurrentUserService, private router:Router) {
    this.loginAttempt = new LoginAttempt("", ""); //start with a blank login attempt
  }


  ngOnInit(): void {
  }

  submitInfo():void {
    //TODO: Put functionality here to make sure both username and password aren't blank
    this.currentUserService.getUser(this.loginAttempt).subscribe({
      next:(data:User)=>{
        //If the user exists then we get a 200 response and update the current user in the currentUserService
        this.currentUserService.updateUser(data); //the current user is now logged in and we store their information for potential later use
        //console.log(this.currentUserService.currentUser.userStats);
        
        //need to update user on navbar. since navbar is always showing the OnInit() function only gets called once
        

        //redirect to the main page
        this.router.navigateByUrl("");
      },
      error:()=>{
        console.log("Something went wrong when attempting to log in.")
      }
    });
  }

}
