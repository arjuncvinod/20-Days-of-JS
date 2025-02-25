let arr = []

arr[0] = 5
arr[5] = 9

console.log(arr);


for (i of arr){
    console.log(i); 
}

for (i  in arr){
    console.log(i);
    console.log(arr[i]);
    
}