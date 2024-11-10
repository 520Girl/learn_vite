import { defineConfig } from 'vite'
import path from 'path'
const postcssPresetEnv = require('postcss-preset-env'); // v10.0.8
import { analyzer } from 'vite-bundle-analyzer'
import cdn from 'vite-plugin-cdn-import'
import vitePluginViteAliases from './plugins/vite-plugin-viteAliases'
import vitePluginHtml from './plugins/vite-plugin-vitePluginHtml'
import vitePluginMock from './plugins/vite-plugin-viteMock'
// import { createHtmlPlugin } from 'vite-plugin-html'
// import { viteMockServe as vitePluginMock } from 'vite-plugin-mock'
export default defineConfig({
    plugins: [
        analyzer(),
        cdn({
            modules: [{
                name: 'lodash',
                var: '_',
                path: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js'
            }]
        }),
        vitePluginViteAliases({ aliasNote: '@' }),
        vitePluginHtml(),
        vitePluginMock(),
        // createHtmlPlugin({
        //     minify: true,
        //     pages: [
        //         {   
        //             // entry: 'src/main.ts',
        //             filename:'index.html',
        //             template:'/index.html',
        //             injectOptions: {
        //                 data: {
        //                     title: '插件注入title'
        //                 },
        //                 tags: [
        //                     {
        //                         injectTo: 'body-prepend',
        //                         tag: 'div',
        //                         attrs: {
        //                             id: 'tag',
        //                         },
        //                     },
        //                 ],
        //             }
        //         }
        //     ]
        //     // template:'plugin/index.html',
        //     // inject: {
        //     //     data: {
        //     //         title: '插件注入title'
        //     //     },
        //     //     tags: [
        //     //         {
        //     //             injectTo: 'body-prepend',
        //     //             tag: 'div',
        //     //             attrs: {
        //     //                 id: 'tag',
        //     //             },
        //     //         },
        //     //     ],
        //     // }
        // })
        // vitePluginMock({
        //     // default
        //     mockPath: 'mock',
        // })
    ],
    optimizeDeps: {
        // exclude: ['lodash-es']// 优化预构建lodash-es
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './')
        }
    },
    css: {
        lightningcss: {
            minify: true,
            sourceMap: true
        },
        preprocessorOptions: {
            scss: {

            }
        },
        postcss: {
            plugins: [
                postcssPresetEnv({ minimumVendorImplementations: 2, browsers: 'last 2 versions' }),
                require('autoprefixer'),
                require('tailwindcss')
            ]
        },
        devSourcemap: true,
    },
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, './index.html'),
                app: path.resolve(__dirname, './inputIndex2.html')
            },
            output: {
                assetFileNames: ((assetInfo) => { //处理js css 图片等静态资源
                    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

                    const extname = path.extname(assetInfo.name)
                    // console.log('extname',extname,assetInfo.name)
                    if (extname === '.css') {
                        return 'assets/css/[name].[hash:8].css'
                    }
                    if (imageExtensions.includes(extname)) {
                        return 'assets/images/[name].[hash:8].[ext]'
                    }
                    return assetInfo.name
                }),
                chunkFileNames: ((chunkInfo) => { //处理需要分包的大js文件 在node_modules中
                    // console.log('chunkInfo',chunkInfo)
                    return 'assets/js/[name].[hash:8].js'
                }),
                entryFileNames: ((chunkInfo) => { //处理不需要分包的小js文件
                    // console.log('chunkInfo,entryFileNames',chunkInfo)
                    return 'assets/js/[name].[hash:8].js'
                })
            }
        },
        // minify: 'terser',
    },
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，
    outDir: 'dist', // 输出目录
    assetsDir: 'static', // 静态资源目录
})