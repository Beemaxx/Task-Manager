require('../src/db/mongoose')
const User = require('../src/model/user')

User.findByIdAndUpdate('5fba1f4123816d14881aba88', {age:25}).then((user) => {
    console.log(user)
    return User.countDocuments({age:25})
}).then((result) =>{
    console.log(result)
}).catch((e)=> {
    console.log(e)
})
