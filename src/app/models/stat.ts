import { User } from "./user";

export class Stat {

    //this class is the same as the user statistic in the backend
    //TODO: Is it better to move this fields out of constructor?
    //TODO: I didn't include a user for the stat as I'm petrified of circular references. May need to put that in here though...
    constructor(public statId:number, public categoryName:string, public easiestCorrect:number, public easiestAttempted:number,
        public easyCorrect:number, public easyAttempted:number, public mediumCorrect:number, public mediumAttempted:number, public hardCorrect:number, public hardAttempted:number,
        public hardestCorrect:number, public hardestAttempted:number){}

}
