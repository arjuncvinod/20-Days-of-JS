// let arr = [1,2,3,4]

// let [a,b,,d] = arr
// console.log(a);
// console.log(d);

let words ="delhi is the capital of india"
let arr = words.split(' ')
console.log(arr);

let [a,b,c,...d] = arr
console.log(d);