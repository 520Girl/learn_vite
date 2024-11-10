const ejs = require('ejs')


module.exports = () => {
    console.log('vite-plugin-vitePluginHtml')
    return {
        name: 'vite-plugin-vitePluginHtml',
        options: (options) => {
            // console.log('options', options)
        },
        buildStart: (options) => {
            // console.log('buildStart',options)
        },
        transformIndexHtml: (html, ctx) => {
            // console.log('transformIndexHtml', ctx)
            html = ejs.render(html, {
                title: 'Hello Vite Plugin Html'
            });
            // console.log('transformIndexHtml', html, ctx)
            return html
        },
        configureServer: (server) => {
            server.middlewares.use((req, res, next) => {
                // 自定义请求处理...
                // console.log('configureServer', req.url)
                next()
            })
        }
    }
}