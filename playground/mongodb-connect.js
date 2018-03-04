const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        return console.log("unable to connect to db server");
    }
    console.log("connected to mongodb");
    const db = client.db('TodoApp')
    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('unable to insert record',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    db.collection('Users').insertOne({
        name: 'Ronnie Crepeu',
        age: 60,
        email: 'ronnie@oliservices.com',
        location: 'New York, NY'
    },(err,result)=>{
        if(err){
            return console.log('unable to insert into Users');
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    client.close(); 

});