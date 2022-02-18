import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerCompareService {
  //this service is meant to be more of a utility service, really only having functions.

  containsLengthRequirement:number = 6;
  typoThreshold:number = 26;
  asciiToValue:number = 96;
  constructor() { }

  compareAnswers(g:string, a:string):boolean {
    //for certain questions in the JService database, answers aren't phrased the way you would expect.
    //As an example: Question = "What article of clothing are people said to be shaking in when they're scared?".
    //I'd expect the answer to be "boots", however, in this case the answer saved in the database is "their boots"
    //so the user's response would be deemed incorrect

    //The intent of this function is to try and deem whether or not an answer is "good enough" for a passing value.
    //There are a few checks that we go through to deem whether or not an answer is worthy.
    
    //TODO: I'm not sure if JavaScript passes variables by reference or not. Just to be safe, create copies of the two
    //variables passed to this function so we don't change the actual guess or answer
    let guess:string = g;
    let answer:string = a;

    //First and foremost, we want to make sure that the cases for the answer and guess match. Set all letters to lowercase
    guess = guess.toLowerCase();
    answer = answer.toLowerCase();


    //Next order of busines is to check whether or not guess and answer are identical
    if (guess == answer) return true;

    //if we don't have an exact match, check whether or not the the guess string is contained within the answer string. Vice versa,
    //also check to see if the answer string is contained within the guess. This will allow answers like for things like "The Mets"
    //vs. "Mets". Before making this kind of check, however, we first make sure that the answer and guess are within a reasonable
    //length of each other. For example if the answer is "The Pledge of Allegience" and the guess is just "The" then that should
    //hardly count. The length threshold can be changed and is saved in a Service level variable
    let diff:number = guess.length - answer.length;
    if (diff > this.containsLengthRequirement || diff < -this.containsLengthRequirement) return false;

    //We passed the length sanity check so let's see if the answer contains the guess, or vice versa, see if the guess contains 
    //the answer.
    if (guess.includes(answer) || answer.includes(guess)) return true;

    //Now for typo checking. Each string will get a numeric value based on the characters inside of it (kind of similar to a hash value)
    //an 'a' will be worth 1 point whereas a 'z' will be 26. Most likely if the issue is just a typo then the strings will be the same length.
    //The biggest point difference between characters would be 25 (an a is used instead of a z), however, it seems unlikely that someone who 
    //spells the word wrong will mistake an a for a z, it's much more likely that something like an s being substituted for a c, or a c for a k
    //will happen. It's also possible that a letter or two will be added or missing (i.e. "Science" vs. "Sience"). To try and be fair, the middle
    //letter of the alphabet is chosen as a base ('m' has a value of 13) and we say that we'll allow for two letters to be added or missing. This
    //means that if the word score for the guess and the answer are within 26 points of eachother, the answer will be accepted. This threshold score
    //for typos is subject to change and can be altered with the appropriate service variable
    let guessScore:number = 0;
    let answerScore:number = 0;

    let isALetter:boolean = false;
    let isANumber:boolean = false;

    for (let i:number = 0; i < guess.length; i++) {
      isALetter = false;
      isANumber = false;

      let letterScore:number = guess.charCodeAt(i) - this.asciiToValue;
      if (letterScore > 0 && letterScore <= 26) isALetter = true;
      else if (letterScore >= -48 && letterScore <= -39 ) isANumber = true;

      //we don't want to compare punctuation marks, only letters and number
      if (isALetter || isANumber) guessScore += letterScore;
    }

    for (let i:number = 0; i < answer.length; i++) {
      isALetter = false;
      isANumber = false;

      let letterScore:number = answer.charCodeAt(i) - this.asciiToValue
      if (letterScore > 0 && letterScore <= 26) isALetter = true;
      else if (letterScore >= -48 && letterScore <= -39 ) isANumber = true;

      //we don't want to compare punctuation marks, only letters and number
      if (isALetter || isANumber) answerScore += letterScore;
    }

    let typoDiff:number = guessScore - answerScore;
    if (typoDiff < this.typoThreshold && typoDiff > -this.typoThreshold) return true;

    //if none of the above tests pass we must assume the answer is incorrect
    return false;
  }
}
