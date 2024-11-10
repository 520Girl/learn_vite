
const path = require('path')

module.exports = () => {
    //读取mock的文件夹并读取数据
    const mockDir = 'mock'
    const mockData = require(path.resolve(process.cwd(), mockDir))
    return {
        name: 'vite-plugin-viteMock',
        configureServer: (server) => {
            // 循环获取数据
            server.middlewares.use((req, res, next) => {
                const mockItem = mockData.find(item => item.url === req.url)
                if(mockItem){
                    const responseData = mockItem.response(req)
                    console.log('mock数据', responseData)
                    return  res.end(JSON.stringify(responseData))
                }
               return next()
            })
        }
    }
}