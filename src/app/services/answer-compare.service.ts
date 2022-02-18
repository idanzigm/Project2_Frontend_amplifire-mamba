import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerCompareService {
  //this service is meant to be more of a utility service, really only having functions.

  containsLengthRequirement:number = 6;
  typoLengthRequirement:number = 2;
  typoThreshold:number = 26;
  asciiToValue:number = 96;
  sameLetterThreshold:number = 0.75;
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

    /*
    Now for typo checking. Typos come in all shapes and sizes, there could be a mispress on the keyboard so only a single letter is wrong,
    there could be a misspress so that an extra letter is added or left out, etc. This function attempts to take these different typos into account.
    From the above logic we know that the guess and answer are within a certain length of eachother, however, for typo checking this length comparison
    should be more strict. If our issue is truly just a typo then we'd expect the answer and guess to be within probably 2 characters of each other 
    in lenght. We first check this using the global service variable (which can be easily altered if necessary).
    */
    if (diff > this.typoLengthRequirement || diff < -this.typoLengthRequirement) return false;

    /*
    The guess is close enough in length, so what we do is assign each string a numeric value based on the characters inside of it (kind of similar to a hash value).
    An 'a' will be worth 1 point whereas a 'z' will be 26. So as an example the word "aaaaa" would have a value of 5 whereas the word "bbbbb" would have a value of
    10. By assigning a point value to each number string we can tell at a glance how closely related they are, and we can define a threshold for what the maximum allowable
    difference in scores are and still count as being correct. Before getting further into what this threshold is, however, the above example points out a major flaw here.
    It's possible for every single letter to be incorrect and still have the scores be somewhat close to each other. So before we compare word scores we should first look
    at the individual letters in each word. If the issue is just a typo or misspelling then at least 80% of the letters should be the same. In the "aaaaa" and "bbbbb" example
    none of the letters are the same. We set a same letter threshold as a global service variable which can be changed at a later point.
    */

    //set some variables here to keep track of things
    let guessChars  = new Array<number>(26).fill(0);
    let answerChars = new Array<number>(26).fill(0);
    let guessScore:number = 0;
    let answerScore:number = 0;
    let isALetter:boolean = false;
    let isANumber:boolean = false;
    let guessNoPunctLength:number = 0; //keep track of the length minus punctuation

    //first scan the guess
    for (let i:number = 0; i < guess.length; i++) {
      isALetter = false;
      isANumber = false;

      let letterScore:number = guess.charCodeAt(i) - this.asciiToValue;
      if (letterScore > 0 && letterScore <= 26) {
        isALetter = true;
        guessChars[letterScore - 1]++; //keep track of the individual letters
        guessNoPunctLength++;
      }
      else if (letterScore >= -48 && letterScore <= -39 ) {
        isANumber = true;
        guessNoPunctLength++;
      }

      //we don't want to compare punctuation marks, only letters and number
      if (isALetter || isANumber) guessScore += letterScore;
    }

    //then scan the actual answer
    for (let i:number = 0; i < answer.length; i++) {
      isALetter = false;
      isANumber = false;

      let letterScore:number = answer.charCodeAt(i) - this.asciiToValue
      if (letterScore > 0 && letterScore <= 26) {
        isALetter = true;
        answerChars[letterScore - 1]++; //keep track of the individual letters only, no numbers or 
      }
      else if (letterScore >= -48 && letterScore <= -39 ) isANumber = true;

      //we don't want to compare punctuation marks, only letters and number
      if (isALetter || isANumber) answerScore += letterScore;
    }
    
    //Now we need to iterate through the two alphabet arrays and see how many letters are the same.
    let totalSameLetters:number = 0;
    for (let i:number = 0; i < 26; i++) {
      let adder:number = ((guessChars[i] <= answerChars[i]) ? guessChars[i] : answerChars[i]);
      totalSameLetters += adder;
    }

    console.log("Meets threshold??" + totalSameLetters + " / " + guessNoPunctLength);

    //we now know how many letters are the same between the two words. See if the threshold is met
    if (totalSameLetters / guessNoPunctLength < this.sameLetterThreshold) return false;

    //So we have enough matching letters, we now need to compare the word scores to make sure the typos aren't too eggrgious
    let typoDiff:number = guessScore - answerScore;
    if (typoDiff < this.typoThreshold && typoDiff > -this.typoThreshold) return true;

    //if none of the above tests pass we must assume the answer is incorrect
    return false;

    //Currently it's possible for answers to slip through the cracks. For example if the answer to a question was "Nashville" and the user answered
    //with "Asheville" this would pass all of our checks even though Nashville is a city in Tennessee and Asheville is in North Carolina. So there's clearly
    //more work to be done here, however, the algorithm works for a good number of questions currently so we'll leave it as is.
  }
}
