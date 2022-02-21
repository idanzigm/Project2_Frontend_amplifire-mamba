import { HighScore } from "./high-score";
import { Stat } from "./stat";

export class User {
    //this class is the same as the user class in the backend
    public userId:number;
    public username:string;
    public password:string;
    public email:string;
    public firstName:string;
    public lastName:string;
    public userStats:Stat[];
    public userHighScores:HighScore[];

    constructor(userId:number, username:string, password:string, email:string, firstName:string, lastName:string, userStats:Stat[], userHighScores:HighScore[]) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userStats = userStats;
        this.userHighScores = userHighScores;
    }

}
