const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    const db = client.db('TodoApp');
    if(err){
        return console.log("unable to connect to db server");
    }
    console.log("connected to mongodb");
    
    db.collection('Users').findOneAndUpdate({
        name: 'Ray'
    },{
        $set:{name: 'Raymond'},
        $inc: {age: 1}
    },{
        returnOriginal: false
    }).then((ret)=>{
        console.log(JSON.stringify(ret));
    })
   // client.close(); 
});