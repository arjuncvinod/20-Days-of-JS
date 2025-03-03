str="racecar"

function isPallindrome(str){

    let reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
}

console.log(isPallindrome(str));
