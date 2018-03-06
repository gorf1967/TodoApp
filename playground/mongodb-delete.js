const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    const db = client.db('TodoApp');
    if(err){
        return console.log("unable to connect to db server");
    }
    console.log("connected to mongodb");
    
    // delete many
    // db.collection('Users').deleteMany({name: 'Ronnie'}).then((result)=>{
    //     console.log(result);
    // })
    // delete one

    // find and delete 
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5a9c214f7f21b808b970aef8')
    }).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));
    })
   // client.close(); 
});