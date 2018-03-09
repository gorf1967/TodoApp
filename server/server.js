const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.port || 3010;
app.use(bodyParser.json());
///  http verbs
app.get('/',(req,res)=>{
    res.send('Hello App');
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
      //  console.log(JSON.stringify(res));
    },(e)=>{
        res.status(400).send(e);
        //console.log('ERR',e);
    })
  //  console.log(req.body);
})

//let id = '5aa15e0aed9d9d2c62296b4e';
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((doc)=>{   
        if(!doc){
            return res.status(404).send(doc);
        }
        res.send({doc});
    }).catch((e)=>{
        res.status(400).send();
    });

})

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

app.listen(port,()=>{
    console.log('Server listening on port ' + port);
})


module.exports = {app};