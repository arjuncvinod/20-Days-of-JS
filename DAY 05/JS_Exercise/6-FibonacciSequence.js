function fibonacci(n) {
    let a = [0, 1];
    if (n === 1) return [0]
    if (n === 2) return [0, 1]
    else
        for (i = 2; i < n; i++) {
            a.push(a[i - 1] + a[i - 2])
        }
    return a;

}

console.log(fibonacci(10));
