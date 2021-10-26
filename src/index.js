const { getFreePort, getIPAddress } = require('endpoint-utils')

const appStart = require('./server/app/index')
const serveStart = require('./server/serve/index')

const start = async () => {
    const ip = getIPAddress()
    const port = await getFreePort()

    await serveStart(ip, port)
    await appStart(ip, port)
}

start()
