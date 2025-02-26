let arr = [1, 2, 3, 4, 5]
arr.filter((n) => {
    return (n % 2 === 0)
}).map((n) => {
    return n * 2
}
).forEach((n) => {
    console.log(n);

})

console.log(arr);
