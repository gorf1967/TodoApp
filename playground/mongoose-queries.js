const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let userid = '6a9fe3edcffed5082897de06';
let id = '5aa15e0aed9d9d2c62296b4ex';
// Todo.find({
//     _id: id
/// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id',todo);
// }).catch((e)=> console.log(e));
////////////////////////////////////////////////////////////////
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Todo',todo);
// });

if(!ObjectID.isValid(userid)){
    return console.log(`Id ${userid} is not valid`); 
}
else{
    User.findById(userid).then((user)=>{
        if(!user){
            return console.log('No user found');
        }
        console.log('User by Id',user);
    }).catch((e)=> console.log(e));
}
