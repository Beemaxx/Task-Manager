// CRUD  create read update delete

const mongodb =  require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error,client )=>{
    if(error) { 
        return console.log('Unable to connect with database')
    }

    const db = client.db(databaseName)

//Insert One

    // db.collection('user').insertOne({
    //     name: 'Bryant',
    //     age: 33
    // }, (error, result)=>{
    //     if (error) {
    //         return console.log('Unable to insert data!')
    //     }

    //     console.log(result.ops._id)
    // })

//Insert Many
//     db.collection('user').insertMany([
//         { 
//         name: 'user-2',
//         age: 33
//     }, {
//         name: 'user-3',
//         age: 33
//     }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert data!')
//         }
//         console.log(result.ops)
//     })

console.log('Connection estbablished!')


//Add new Task Collection
// db.collection('Tasks').insertMany([
//     {
//         description: 'Clean the dishes',
//         completed: false
//     },{
//         description: 'Clean the house',
//         completed: true
//     },{
//         description: 'Buy new clothes',
//         completed: true
//     }
// ], (error,result) => {
//     if(error) {
//         return console.log('Unable to insert data')
//     }
//     console.log(result.ops)

// })



})
