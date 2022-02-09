import { Component, OnInit } from '@angular/core';
import { LoginAttempt } from 'src/app/models/login-attempt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginAttempt:LoginAttempt = new LoginAttempt("", ""); //start with a blank login attempt

  constructor() {}


  ngOnInit(): void {
  }

  submitInfo():void {
    console.log("The username box currently reads: " + this.loginAttempt.username);
    console.log("The password box currently reads: " + this.loginAttempt.password);

    //TODO: Need to put logic here to send the loginAttempt to the web server
  }

}
