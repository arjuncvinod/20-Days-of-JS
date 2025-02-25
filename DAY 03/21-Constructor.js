function Alien(name,tech){
    this.name = name;
    this.tech = tech;
    this.hello = function(){
        console.log("hello");
    }
    return 1
}

let alien1 = new Alien('alien1','Java');
let alien2 = new Alien('alein2','Python');


alien1.tech = 'JavaScript';

console.log(alien1);
// console.log(alien2);