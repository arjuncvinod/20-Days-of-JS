arr=[1, [2, [3, [4,[8,4]]], 5], 6];

function flatten(a){
   return a.flat(Infinity);
}
console.log(flatten(arr));
