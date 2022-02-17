import { Stat } from "./stat";

export class User {
    //this class is the same as the user class in the backend
    constructor(public userId:number, public username:string, public password:string, public email:string, public firstName:string, public lastName:string, public userStats:Stat[]){}

}
