const Koa = require('koa');
const chalk = require('chalk')
const Router = require('koa-router')

const apiStart = async (app, { ip, port }) => {
    const router = new Router()

    router.get('/info', async (cxt) => {
        cxt.body = { ip, port }
    })

    app.use(
        router.routes(),
        router.allowedMethods()
    )
}

const viewStart = async (app, { ip }) => {
    const isDev = process.env.electronEnv === 'development'

    if (isDev) {
        const proxy = require('koa-proxy');
        const { getFreePort } = require('endpoint-utils')
        const { createServer: createViteServe } = require('vite')

        const vite = await createViteServe()
        const port = await getFreePort()
        await vite.listen(port);

        if (!vite.httpServer) {
            console.error(chalk.red.bold(`HTTP server not available`))
            process.exit(1)
        }

        app.use(proxy({
            host: `http://${ip}:${port}`
        }));

        console.log(chalk.green.bold(`Vite Start: http://${ip}/${port}`))
    } else {
        const path = require('path')
        const static = require('koa-static')

        app.use(
            static(path.join(__dirname, '../../../dist'))
        )
    }
}

const start = async (ip, port) => {
    const app = new Koa();

    await apiStart(app, { ip, port })
    await viewStart(app, { ip, port })

    app.listen(port)

    console.log(chalk.green.bold(`App Start: http://${ip}/${port}`))
}

module.exports = start

