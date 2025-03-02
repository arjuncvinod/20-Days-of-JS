str = "Hello"

const reverse = (s) => {
    rev = ""
    for (i = str.length - 1; i >= 0; i--) {
        rev += str[i]
    }
    return rev
}
console.log(reverse(str));

