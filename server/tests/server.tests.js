const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

let todos = [
    {
        "text": "first todo"
    },
    {
        "text": "second todo"
    }
]

beforeEach((done)=>{
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(done());
})

 describe('POST /todos',()=>{
     it('should create a todo',(done)=>{
         let text = 'testing a new create';
         request(app)//.get('/').expect('Hello App').end(done); 
         .post('/todos')
         .send({text})
         .expect(200)
         .expect((res)=>{
             expect(res.body.text).toBe(text);
         })
         .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
         });
    });

    it('empty todos',(done)=>{
        let text = 'testing a new create';
         request(app)//.get('/').expect('Hello App').end(done); 
         .post('/todos')
         .send({})
         .expect(400)
         .end((err,res)=>{
            if(err){
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
         });
    })
});
describe('GET /todo',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});