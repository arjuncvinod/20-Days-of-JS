const fact = (n) => {
    if (n === 1)
        return 1;
    else
        return n * fact(n - 1)
}

console.log(fact(6));
z