const child_process = require('child_process')

process.env.electronEnv = 'production'

child_process.execSync(`yarn clear`)

child_process.spawnSync(`yarn`, ['vite:build'], { stdio: 'inherit' })
child_process.spawnSync(`yarn`, [`electron:make`],  { stdio: 'inherit' })