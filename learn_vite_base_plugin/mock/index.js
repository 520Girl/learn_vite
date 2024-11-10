const Mock = require('mockjs')

const Random = Mock.Random
module.exports = [
    {
        method: 'get',
        url:'/api/user',
        response:(ctx)=>{
            console.log('ctx',ctx.url)
            return {
                code: 200,
                data:{
                    name: Random.cname(),
                }
            }
        }
    }
]