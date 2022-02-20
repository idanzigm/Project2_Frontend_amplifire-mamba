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
  //url:string = "http://localhost:8083/";
  url:string = 'http://35.174.167.115:7000/';

  constructor(private http:HttpClient) { 
    this.currentUser  = new User(0, "", "", "", "", "", []); //starts off as a blank user upon instantiation
    
  }

  loginForTesting() {
    //This was a function to make life easier while in the testing phase, it can be safely deleted but is left here
    //for legacy purposes

    //because of Angular's hot reloading, everytime I make a change the page reloads which will log out the
    //current user. This is getting annoying during testing so I'm writing this function to just automatically
    //log in a user upon initial application load
    this.getUser(new LoginAttempt("Capn01", "hello")).subscribe(
      (response:User) => {
        this.updateUser(response);
      }
    )
  }

  getUser(loginAttempt:LoginAttempt):Observable<User>{
    //takes a login attempt returns the user info stored in the database if the
    //username exists and the password matches
    return this.http.post(this.url + "login", loginAttempt) as Observable<User>;
  }

  updateUser(updateUser:User):void {
    //updates the currentUser variable stored in the CurrentUserService
    this.currentUser = updateUser;
  }

  removeUser():void {
    //this function is used when logging out. It erases cached information about the user that was previously
    //logged in
    this.currentUser  = new User(0, "", "", "", "", "", []);
  }

  createUser(user:User):Observable<User> {
    return this.http.post(this.url + "users", user) as Observable<User>;
  }

  updateUserDB(user:User):Observable<number> {
    return this.http.put(this.url + "users", user) as Observable<number>;
  }

  logoutUser():Observable<number> {
    //if there's currently a user logged in, log them out by making a call to the backend and removing their
    //stored data in this service
    let logoutSuccess = this.http.put(this.url + "login", this.currentUser) as Observable<number>;
    this.removeUser();
    return logoutSuccess;
  }

  giveCurrentUser():User {
    //this functino is used to pass info on the current user to the components that use this service
    return this.currentUser;
  }

  updateStat(statCategory:string, difficulty:number, correct:boolean):void {
    for (let stat of this.currentUser.userStats) {
      if (stat.categoryName == statCategory) {
          if (difficulty == 0) {
            stat.easiestAttempted += 1;
            if (correct) stat.easiestCorrect += 1;
          }
          else if (difficulty == 1) {
            stat.easyAttempted += 1;
            if (correct) stat.easyCorrect += 1;
          }
          else if (difficulty == 2) {
            stat.mediumAttempted += 1;
            if (correct) stat.mediumCorrect += 1;
          }
          else if (difficulty == 3) {
            stat.hardAttempted += 1;
            if (correct) stat.hardCorrect += 1;
          }
          else {
            stat.hardestAttempted += 1;
            if (correct) stat.hardestCorrect += 1;
          }

        break; //only one of each category so we can break out of loop after updating it
      }
    }
  }

  //TODO: Add some more functions at some point which will allow the user to change some of their information
}
