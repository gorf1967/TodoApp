const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    const db = client.db('TodoApp');
    if(err){
        return console.log("unable to connect to db server");
    }
    console.log("connected to mongodb");
    // db.collection('Todos').find({
    //     _id: new ObjectID('5a99a4c6ff14d139d88b0211')
    // }).toArray().then((docs)=>{
    //     console.log("DOCS:");
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('unable to fetch docs', err);
    // });
    // db.collection('Todos').count().then((docs)=>{
    //     console.log("DOCS:", docs);
    // },(err)=>{
    //     console.log('unable to fetch count', err);
    // });
    db.collection('Users').find({
        name: 'Ronnie'
    }).toArray().then((docs)=>{
        console.log("DOCS:");
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('unable to fetch docs', err);
    });

   // client.close(); 
});

    

