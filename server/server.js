require('./config/config');
console.log("env *****",env);

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');

const {User} = require('./models/user');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
///  http verbs
app.get('/',(req,res)=>{
    res.send('Hello Betty');
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

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{   
        if(!todo){
            return res.status(404).send(todo);
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
})

app.patch('/todos/:id',(req,res)=>{
    let id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return  res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }   
    else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo) => {
        if(!todo){
            return  res.status(404).send();
        }
        res.send({todo});
    }).catch( (e) =>{
        res.status(400).send();
    })
});

app.listen(port,()=>{
    console.log('Server listening on port ' + port);
})

module.exports = {app};