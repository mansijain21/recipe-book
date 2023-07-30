// These are the elements that are shared by all the other components of the app

export class Ingredient
{
    // public name: string;
    // public amount: number;

    // constructor(name: string, amount:number)
    // {
    //     this.name = name;
    //     this.amount = amount;
    // }

    constructor(public name:string, public amount: number){}
    // we can just write the above line inside the class & it'll work the same way

}