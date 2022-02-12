import { Question } from "./question";

export class Category {

    public id:number;
    public title:string;
    public clues_count:number;
    public clues:Question[];

    constructor(categoryId:number, title:string, clueCount:number, questions:Question[]){
        this.id = categoryId;
        this.title = title;
        this.clues_count = clueCount;
        this.clues = questions;
    }
}
