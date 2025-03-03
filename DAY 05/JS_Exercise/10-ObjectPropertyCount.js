obj = { name: "Alice", age: 25, job: "developer" }

function count(o) {
    return Object.keys(o).length;
}

console.log(count(obj));