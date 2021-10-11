const child_process = require('child_process')

process.env.electronEnv = 'development' // 'production'

const vite = child_process.spawn(`yarn`, ['vite:start'], { stdio: 'ignore' })

vite.once('spawn', () => {
    child_process.spawnSync(`yarn`, [`electron:start`],  { stdio: 'inherit' })
})