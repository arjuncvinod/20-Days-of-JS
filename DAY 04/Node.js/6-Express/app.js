const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.get("/arjun", (req, res) => {
    const id = req.query.id
    res.send("Hello Arjun with id :" + id)
})

app.get("/arjun/:id", (req, res) => {
    const id = req.params.id
    res.send("Hello Arjun with id :" + id)
})


app.listen(9000, () => {
    console.log('server is running on port 9000')
})