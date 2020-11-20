// CRUD  create read update delete

// const mongodb =  require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error,client )=>{
    if(error) { 
        return console.log('Unable to connect with database')
    }

    const db = client.db(databaseName)

    //Find One, Find

    // db.collection('user').findOne({name:'user-2'},(error, user) => { 
    //     if (error){
    //         return console.log('User is not found.')
    //     }
    //     console.log(user)
    // })

    // db.collection('user').find({age:33}).toArray((error, users)=>{
    //     console.log(users)
    //  })



    db.collection('Tasks').findOne({_id: new ObjectID("5fb7466d4a5ae10d8064c3f3") }, (error, description)=> {
        if(error) {
            return console.log('Task is not found.')
        }
        console.log(description)
    })

    db.collection('Tasks').find({completed : true }).toArray((error, task) => {
        console.log(task)
    })
})