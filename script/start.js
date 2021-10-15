const child_process = require('child_process')

process.env.electronEnv = 'development' // 'production'

const vite = child_process.spawn(`yarn`, ['vite:start'], { stdio: 'ignore' })

vite.once('spawn', () => {
    const args = process.argv.slice(2)
    child_process.spawnSync(`yarn`, [`electron:start`, ...args],  { stdio: 'inherit' })
})