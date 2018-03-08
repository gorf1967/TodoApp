const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
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
    var todo = new Todo({
        _id: req.params.id
    });

    Todo.findById(req.params.id).then((doc)=>{   
        if(doc){
            res.send(doc);
        }
        res.status(404).send('not found');
    },(e)=>{
        if(!ObjectID.isValid(req.params.id)){
            return res.status(400).send(e);
        }
     //   res.status(404).send(e);
    })

//   if(!ObjectID.isValid(id)){
//      // console.log('invalid Id');
//       return res.status(404).send();
//   }  
//   res.send('<div>hello</>');

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

app.listen(3010,()=>{
    console.log('Server listening on port 3010');
})


module.exports = {app};