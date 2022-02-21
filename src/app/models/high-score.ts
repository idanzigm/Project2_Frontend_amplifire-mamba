export class HighScore {
    //TODO: I didn't include a user for the stat as I'm petrified of circular references. May need to put that in here though...
    constructor(public gameId:number, public gameTime:string, public score:number){}

    convertDateToString(date:Date):string {
        //helper class to convert javascript Date() into a string that SQL will understand ...hopefully
        let pad = function(num:number) { return ('00'+num).slice(-2) };
        let dateString = date.getUTCFullYear()         + '-' +
        pad(date.getUTCMonth() + 1)  + '-' +
        pad(date.getUTCDate())       + ' ' +
        pad(date.getUTCHours())      + ':' +
        pad(date.getUTCMinutes())    + ':' +
        pad(date.getUTCSeconds());

        return dateString;
    }
}
