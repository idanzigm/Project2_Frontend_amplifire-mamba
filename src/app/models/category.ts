import { Question } from "./question";

export class Category {

    public categoryId:number;
    public title:string;
    public clueCount:number;
    public questions:Question[];

    constructor(categoryId:number, title:string, clueCount:number, questions:Question[]){
        this.categoryId = categoryId;
        this.title = title;
        this.clueCount = clueCount;
        this.questions = questions;
    }
}
