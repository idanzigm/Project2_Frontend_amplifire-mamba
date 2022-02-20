export class Answer {

    public id:number; 
    public givenAnswer:string; 

    constructor(id:number, givenAnswer:string) {
        this.id = id; 
        this.givenAnswer = givenAnswer
    }

    setId(id:number) {
        this.id = id; 
    }

    getId() {
        return this.id; 
    }

    setGivenAnswer(givenAnswer:string) {
        this.givenAnswer = givenAnswer; 
    }

    getGivenAnswer() {
        return this.givenAnswer; 
    }
}
