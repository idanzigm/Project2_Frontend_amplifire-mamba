import { Category } from "./category";

export class Question {

    public questionId:number;
    public clue:string;
    public answer:string;
    public value:number;
    public category:Category;

    constructor(questionId:number, clue:string, answer:string, value:number, category:Category){
        this.questionId = questionId;
        this.clue = clue;
        this.answer = answer;
        this.value = value;
        this.category = category;
    }
}
