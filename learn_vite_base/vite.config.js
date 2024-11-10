// import { defineConfig } from 'vite'

// /**
//  * @type {import('vite').UserConfig}
//  */
// export default defineConfig({
//    optim
// })
import { defineConfig,loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'

/** @type {import('vite').UserConfig} */

//策略模式
const envResolver={
    "build":()=>{
        console.log("build 生产模式")
        return {...viteBaseConfig,...viteProdConfig}
    },
    "serve":()=>{
        console.log("serve 开发模式")
        return {...viteBaseConfig,...viteDevConfig}
    }
}
export default defineConfig(({ command,mode }) => {
    console.log("mode",mode)
    const env = loadEnv(mode, process.cwd(), '')
    console.log("env",env)
    console.log("env",process.env)
    return envResolver[command]();
})