const child_process = require('child_process')

process.env.electronEnv = 'production'

child_process.execSync(`yarn clear`)

child_process.spawnSync(`yarn`, ['vite:build'], { stdio: 'inherit' })

const args = process.argv.slice(2)
child_process.spawnSync(`yarn`, [`electron:publish`, ...args],  { stdio: 'inherit' })



const path = require('path')
const chalk = require('chalk')
const { build } = require('vite')
const rimraf = require('rimraf');
const child_process = require('child_process')

const start = async () => {
    console.log(chalk.green('start delete ./out'))
    rimraf.sync(path.join(process.cwd(), './out'))
    console.log(chalk.green('delete ./out success'))

    console.log(chalk.green('start delete ./dist'))
    rimraf.sync(path.join(process.cwd(), './dist'))
    console.log(chalk.green('delete ./dist success'))

    console.log(chalk.green('start build view'))
    await build()
    console.log(chalk.green('view build sucess'))

    const args = process.argv.slice(2)
    const shellPath = path.join(
        process.cwd(),
        './node_modules/@electron-forge/cli/dist/electron-forge.js'
    )
    child_process.spawnSync(
        `node`,
        [shellPath, 'publish', ...args], 
        {
            stdio: 'inherit',
        }
    )
}

start()