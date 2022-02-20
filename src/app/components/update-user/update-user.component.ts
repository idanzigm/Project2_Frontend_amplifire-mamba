import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  // currentUserData:User = JSON.parse(this.currentUserData)
  user:User;

  username: string ="";
  fname:string = "";
  lname: string = "";
  email: string = "";
  password: string = "";

  constructor(private currentUserService:CurrentUserService, private router:Router) {
    this.user = new User(0, "", "", "", "", "", []);
    // this.username = this.currentUserService.
   }

  ngOnInit(): void {
    this.user = this.currentUserService.giveCurrentUser();
    console.log(this.user);
    this.username = this.user.username;
    this.fname = this.user.firstName;
    this.lname = this.user.lastName;
    this.email = this.user.email;
    // this.password = this.user.password;
    
  }

  userUpdated():void {

    this.user.username = this.username;
    this.user.firstName = this.fname;
    this.user.lastName = this.lname;
    this.user.email = this.email;
    if(this.password != ""){
      this.user.password = this.password;
    }

    this.currentUserService.updateUserDB(this.user).subscribe({
      next:(user:number)=>{
        //If the user exists then we get a 200 response and update the current user in the currentUserService
        this.currentUserService.updateUserDB(this.user); //the current user is now logged in and we store their information for potential later use
        //console.log(this.currentUserService.currentUser.userStats);
        this.currentUserService.updateUser(this.user);
        
        //need to update user on navbar. since navbar is always showing the OnInit() function only gets called once
        

        //redirect to the main page
        this.router.navigateByUrl("");
      },
      error:()=>{
        console.log("Something went wrong when attempting to update your personal information.")
      }
    });
  }

}
