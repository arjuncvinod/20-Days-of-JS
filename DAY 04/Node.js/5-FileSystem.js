

const fs = require('fs');
fs.writeFile("./test.js","console.log('Hello World')",(err)=>{
    console.log('File Created');
});

fs.readFile("./test.js","utf8",(err,data)=>{
    console.log(data);
});

fs.unlink("./test.js",(err)=>{
    console.log('File Deleted');
});