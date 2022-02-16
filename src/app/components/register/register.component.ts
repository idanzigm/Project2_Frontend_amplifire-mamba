import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //user:User = new User(0, "", "", "", "", ""); //is there a better way for default initialization?
  firstName:string = "";
  username:string = "";
  email:string = "";
  password:string = "";
  repeatPassword:string = "";
  checked:boolean = false;

  constructor(private userService:CurrentUserService) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    //make sure no fields are blank, then create a user and send to the backend

    if (this.firstName == "" || this.username == "" || this.email == "" || this.password == "" || this.repeatPassword == "") {
      alert("Must fill out all fields.");
    }
    else if (this.password != this.repeatPassword) {
      alert("passwords entered don't match.")
    }
    else if (!this.checked){
      alert("You must agree to the terms of service.")
    }
    else {
      //first create a new user object
      let user:User = new User(0, this.username, this.password, this.email, this.firstName, "", []);

      //we only have a single input box for name. Need a little function to split up first name and last name.
      //if no last name was given the field will be left blank (last name can be blank in the database but firstname can't)
      let nameArray:string[] = this.firstName.split(" ");

      user.firstName = nameArray[0];
      if (nameArray.length > 1) {
        //There can be multiple last names, all get rolled into a single last name
        let lastName:string = "";
        for (let i:number = 1; i < nameArray.length; i++) {
          lastName += nameArray[i];
          lastName += " ";
        }
        lastName = lastName.slice(0, -1); //remove the trailing " " character
        user.lastName = lastName;
      }
      console.log(user);

      //create new user here using the userService
      this.userService.createUser(user).subscribe(
        (resposne:User)=>{

        }
      )
    }

  }

}
