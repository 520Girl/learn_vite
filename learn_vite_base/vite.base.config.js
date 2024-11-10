import { defineConfig } from 'vite'
const path = require('path')
console.log(path.resolve(__dirname))

export default defineConfig({
    optimizeDeps: { 
        exclude: ['lodash-es']// 排除lodash-es依赖，减少打包体积
    },
    envPrefix: 'VITE_', // 环境变量前缀
    css:{ //对css进行配置
        //modules 的配置最终会丢给postcss-modules，具体配置请参考postcss-modules文档
        modules:{ //对css 的默认配置进行覆盖
            localsConvention: 'camelCase', // 驼峰命名 和 -连接命名法
            scopeBehaviour: 'local', // 配置当前的模块化行为是模块化还是全局化，有global和local两种，默认是带有hash的局部变量
            generateScopedName: '[name]__[local]--[hash:base64:5]', // 局部变量的命名规则 https://github.com/webpack/loader-utils#interpolatename
            // generateScopedName:((name,filename,css)=>{
            //     console.log(`name:${name},filename:${filename},css:${css}`)
            //     return `vite-base-${name}`
            // }),
            hashPrefix: 'amx', // 局部变量的hash前缀
            globalModulePaths: ['src/styles/global.css'] // 代表不想参与到css 模块化的路径，可以使用path.resolve()
        },
        preprocessorOptions: { //css预处理的一些参数key-value
            less:{ //可以配置less的命令
                math:'always', // less的math选项，默认为'parens-division'，可以设置为'always'，表示使用圆括号表示除法，否则使用斜杠表示除法。https://less.bootcss.com/usage/#lessjs-options-math
                globalVars: { // 全局变量
                    'primary-color': '#1890ff',
                }
            },
            scss:{

            },
            
        },
        devSourcemap: true, // 开启css的sourcemap,也就是可以看到css文件对应的源文件
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname)
        }
    },
    build:{ //构建生产包的配置
        rollupOptions: {    //配置rollup的一些参数https://www.rollupjs.com/configuration-options/#outputhashcharacters
            output:{
                //assetFileNames:"assets/[name]-[hash][extname]", // 配置静态资源的输出文件名，默认是[name]-[hash][extname]
                assetFileNames:"[name].[hash][extname].[ext]"
            },
            external:['lodash-es'],
            externalGlobals: {
                'lodash-es': {
                    var: '_', // 告诉rollup lodash-es 依赖全局变量为 '_'
                    path:'https://unpkg.com/lodash-es@4.17.21/lodash.js'
                }, 

            }
        },
        assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，
        outDir: 'dist', // 输出目录
        assetsDir: 'static', // 静态资源目录
    }
})