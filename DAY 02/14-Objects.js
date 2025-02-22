// let a ={
//     name:"Arjun",
//     tech:"JS",
// }

// console.log(a)
// console.log(typeof a)
// console.log(a.name)

let a ={
    name:"Arjun",
    tech:"JS",
    laptop:{
        ram:"8GB",
        storage:"1TB",
        brand:"Asus",
    }
}

console.log(a)
console.log(a.laptop)
console.log(a.laptop.brand)


delete a.laptop
console.log(a)