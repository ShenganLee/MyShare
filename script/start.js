const path = require('path')
const child_process = require('child_process')

const start = () => {
    const args = process.argv.slice(2)
    const shellPath = path.join(
        process.cwd(),
        './node_modules/@electron-forge/cli/dist/electron-forge.js'
    )
    child_process.spawnSync(
        `node`,
        [shellPath, 'start', ...args], 
        {
            stdio: 'inherit',
            env: { ...process.env, electronEnv: 'development' }
        }
    )
}

start()


