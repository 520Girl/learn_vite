import { defineConfig } from 'vite'
export default defineConfig({
    optimizeDeps: { 
        exclude: ['lodash-es']// 排除lodash-es依赖，减少打包体积
    },
    envPrefix: 'VITE_', // 环境变量前缀
})