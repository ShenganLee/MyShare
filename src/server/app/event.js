const { ipcMain } = require('electron')

const mainEvents = () => {
    // 操作数据
    // type: get add delete, list: []
    ipcMain.on('add-resource', (...args) => {
        console.log('add-resource', args)
    })

    ipcMain.on('delete-resource', (...args) => {
        console.log('delete-resource', args)
    })
}

module.exports = mainEvents;