import { Category } from "./category";

export class Question {

    public id:number;
    public question:string;
    public answer:string;
    public value:number;
    public category:Category;

    constructor(questionId:number, clue:string, answer:string, value:number, category:Category){
        this.id = questionId;
        this.question = clue;
        this.answer = answer;
        this.value = value;
        this.category = category;
    }
}
