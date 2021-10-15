const child_process = require('child_process')

process.env.electronEnv = 'production'


child_process.execSync(`yarn clear`)

child_process.spawnSync(`yarn`, ['vite:build'], { stdio: 'inherit' })

const args = process.argv.slice(2)
child_process.spawnSync(`yarn`, [`electron:package`, ...args],  { stdio: 'inherit' })