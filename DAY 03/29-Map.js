let map = new Map();
map.set("Navin", "Java" );
map.set("Kiran", "Android");
map.set("Chirag", "ML");
map.set("Navin", "Blockchain");
for(let [k,v] of map) {
console.log(k, ":", v );
}

map.forEach((v,k)=>{
    console.log(k, ":", v );
})