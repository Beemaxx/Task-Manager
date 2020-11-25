require('../src/db/mongoose')
const { count } = require('../src/model/user')
const User = require('../src/model/user')

// User.findByIdAndUpdate('5fba1f4123816d14881aba88', {age:25}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:25})
// }).then((result) =>{
//     console.log(result)
// }).catch((e)=> {
//     console.log(e)
// })


const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5fba216c16ebf82298912312',2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})