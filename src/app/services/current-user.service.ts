import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LoginAttempt } from '../models/login-attempt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  //this service will hold data about the currently signed in user and will be able to be accessed from 
  //the necessary components
  currentUser:User;
  url:string = "http://35.174.167.115:8080/"; //this is currently set for Bobby's EC2

  constructor(private http:HttpClient) { 
    this.currentUser  = new User("", "", ""); //starts off as a blank user upon instantiation
  }

  getUser(loginAttempt:LoginAttempt):Observable<User>{
    //takes a login attempt returns the user info stored in the database if the
    //username exists and the password matches
    return this.http.post(this.url + "login", loginAttempt) as Observable<User>;
  }

  updateUser(updatedUser:User):void {
    //updates the currentUser variable stored in the CurrentUserService
    this.currentUser.emailAddress = updatedUser.emailAddress;
    this.currentUser.password = updatedUser.password;
    this.currentUser.username = updatedUser.username;
  }

  removeUser():void {
    //this function is used when logging out. It erases cached information about the user that was previously
    //logged in
    this.currentUser.emailAddress = "";
    this.currentUser.password = "";
    this.currentUser.username = "";
  }

  //TODO: Add some more functions at some point which will allow the user to change some of their information
}
