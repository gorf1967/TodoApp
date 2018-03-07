let express = require('express');
let bodyParser = require('body-parser');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
app.use(bodyParser.json());
///  http verbs
app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
    console.log(req.body);
})

app.listen(3010,()=>{
    console.log('Server listening on port 3010');
})