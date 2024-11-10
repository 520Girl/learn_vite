const path = require('path')
const fs = require('fs')
console.log('vite-plugin-test', path.resolve(__dirname, process.cwd()))
//区分当前路径下的文件 以及文件夹

function diffFileAndDir(FileDirsArr = [], basePath = '../') {
    const result = {
        dirs: [],
        files: []
    }
    FileDirsArr.forEach(item => {
        const currentFileStat = fs.statSync(path.resolve(__dirname, basePath, item))
        const isDirectory = currentFileStat.isDirectory()
        if (isDirectory) {
            result.dirs.push(item)
        } else {
            result.files.push(item)
        }

    })
    return result
}


// 获取当前目录下的文件夹,以及生成配置的别名路径
function readPwdDir(basePath, aliasNote) {
    const files = fs.readdirSync(path.resolve(__dirname, process.cwd()))
    // console.log('vite-plugin-test files', files)
    const direResults = diffFileAndDir(files, basePath)
    //生成别名路径
    const resultAlias = {}
    direResults.dirs.forEach(item => {
        resultAlias[`${aliasNote}${item}`] = path.resolve(__dirname, basePath, item)
    })
    console.log('vite-plugin-test resultAlias', resultAlias)
    return resultAlias
}



module.exports = ({ basePath = '../', aliasNote = "@" } = {}) => {
    return {
        name: 'vite-plugin-viteAliases',
        config: (config, { mode, command }) => { //! vite-alias 进行配置模仿配置
            const alias = readPwdDir(basePath, aliasNote)
            return {
                resolve: {
                    alias: alias
                }
            }
        },
        configResolved: (config) => {
            // console.log('vite-plugin-test configResolved',config)
        },
        configureServer: (server) => {
            // console.log('vite-plugin-test configureServer',server)
        },
        transform: (code, id) => { //模块请求事执行，也就是每一个资源加载时的请求
            // console.log('vite-plugin-test transform', id)
            return code
        },
    }
}