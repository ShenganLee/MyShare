const { getFreePort, getIPAddress } = require('endpoint-utils')

const appStart = require('./server/app/index')

const start = async () => {
    const ip = getIPAddress()
    const port = await getFreePort()

    appStart()
}

start()
