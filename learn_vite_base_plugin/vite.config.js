import { defineConfig,loadEnv } from 'vite'
import baseConfig from './vite.base.config'
import devConfig from './vite.dev.config'
import prodConfig from './vite.prod.config'

//策略模式
const envResolver = {
    'serve':()=>{
        console.log('serve 开发者模式')
        return {
            ...baseConfig,
           ...devConfig,
        }
    },
    'build':()=>{
        console.log('build 生产模式')
        return {
            ...baseConfig,
           ...prodConfig,
        }
    },
}

export default defineConfig(({ command, mode, isSsrBuild, isPreview})=>{
    console.log(command, mode, isSsrBuild, isPreview,process.cwd())
    const envDs = loadEnv(mode, process.cwd(),'')
    
    return envResolver[command]()

})