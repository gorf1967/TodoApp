const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {   
        _id: new ObjectID(),
        "text": "first todo"
    },
    {
        _id: new ObjectID(),
        "text": "second todo"
    }
]

beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(done());
})

//  describe('POST /todos',()=>{
//      it('should create a todo',(done)=>{
//          let text = 'testing a new create';
//          request(app)//.get('/').expect('Hello App').end(done); 
//          .post('/todos')
//          .send({text})
//          .expect(200)
//          .expect((res)=>{
//              expect(res.body.text).toBe(text);
//          })
//          .end((err,res)=>{
//             if(err){
//                 return done(err);
//             }

//             Todo.find({text}).then((todos)=>{
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch((e)=>done(e));
//          });
//     });

//     it('empty todos',(done)=>{
//         let text = 'testing a new create';
//          request(app)//.get('/').expect('Hello App').end(done); 
//          .post('/todos')
//          .send({})
//          .expect(400)
//          .end((err,res)=>{
//             if(err){
//                 return done(err);
//             }
//             Todo.find().then((todos)=>{
//                 expect(todos.length).toBe(2);
//                 done();
//             }).catch((e)=>done(e));
//          });
//     })
// });
// describe('GET /todo',()=>{
//     it('should get all todos',(done)=>{
//         request(app)
//         .get('/todos')
//         .expect(200)
//         .expect((res)=>{
//             expect(res.body.todos.length).toBe(2);
//         })
//         .end(done);
//     })
// });

// describe('GET /todo/:id',()=>{
//     it('should get one todo by id',(done)=>{
//         request(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//         .expect(200)
//          .expect((res)=>{
//              console.log(todos[0]._id.toHexString());
//              console.log(res.body.doc.text);
//              expect(res.body.doc.text).toBe(todos[0].text);
//          })
//         .end(done);
//     });

//     it('should return 404 if todo not found',(done)=>{
//         request(app)
//         .get(`/todos/${todos[0]._id.toHexString()}xx`)
//         .expect(404)
//         .end(done);
//     });

//     it('should return 404 if non-object id',(done)=>{
//         request(app)
//         .get(`/todos/123`)
//         .expect(404)
//         .end(done);
//     });

// });

describe('DELETE /todo/:id',()=>{
    it('should delete todo with id',(done)=>{
        let id = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(id); 
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(id).then((todo)=>{
                expect(todo).toBe(null);
                done();
            }).catch((e)=>done(e));

        });
    });
    

    it('should return 404 if todo not found',(done)=>{
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}xx`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if non-object id',(done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });

});