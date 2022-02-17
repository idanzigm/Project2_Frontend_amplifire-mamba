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
  url:string = "http://localhost:8083/";
  //url:string = 'http://35.174.167.115:7000/';

  constructor(private http:HttpClient) { 
    this.currentUser  = new User(0, "", "", "", "", "", []); //starts off as a blank user upon instantiation
  }

  getUser(loginAttempt:LoginAttempt):Observable<User>{
    //takes a login attempt returns the user info stored in the database if the
    //username exists and the password matches
    return this.http.post(this.url + "login", loginAttempt) as Observable<User>;
  }

  updateUser(updatedUser:User):void {
    //updates the currentUser variable stored in the CurrentUserService
    this.currentUser = updatedUser;
  }

  removeUser():void {
    //this function is used when logging out. It erases cached information about the user that was previously
    //logged in
    this.currentUser  = new User(0, "", "", "", "", "", []);
  }

  createUser(user:User):Observable<User> {
    return this.http.post(this.url + "users", user) as Observable<User>;
  }

  //TODO: Add some more functions at some point which will allow the user to change some of their information
}
