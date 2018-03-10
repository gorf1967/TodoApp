const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log("All records deleted:",result);
// });

Todo.findByIdAndRemove('5aa1e46298fe4119aca9d602').then((result)=>{
    console.log(result);
})

Todo.findOneAndRemove().then((result)=>{
    console.log(result);
})