arr=[1,2,3,4,5,6]


const sum=(ar)=>{
    let s=0;
    ar.forEach((i)=>{
        s=s+i
    })
    return s
}

console.log("sum is ", sum(arr));
