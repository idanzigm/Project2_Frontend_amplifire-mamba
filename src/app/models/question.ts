import { Category } from "./category";

export class Question {

    public id:number;
    public question:string;
    public answer:string;
    public value:number;
    public category:Category;
    public airdate:string;

    constructor(questionId:number, clue:string, answer:string, value:number, category:Category, airdate:string){
        this.id = questionId;
        this.question = clue;
        this.answer = answer;
        this.value = value;
        this.category = category;
        this.airdate = airdate;
    }

    getValue() {
        return this.value; 
    }

    getId() {
        return this.id; 
    }

    getQuestion() {
        return this.question; 
    }

    getAnswer() {
        return this.answer; 
    }
}