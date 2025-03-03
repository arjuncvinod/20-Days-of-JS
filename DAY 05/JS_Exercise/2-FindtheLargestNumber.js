arr = [1, 5, 2, 6, 19, 10]

const Large=(a)=>{
   a.sort((a,b)=>b-a)
   return a[0]
}


console.log("Largest number is " ,Large(a));
 