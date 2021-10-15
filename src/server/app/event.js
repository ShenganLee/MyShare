const { ipcMain } = require('electron')

const mainEvents = () => {
    // 操作数据
    // type: get add delete, list: []
    ipcMain.on('dataSource', (...args) => {
        console.log('dataSource', args)
    })

    // 查询文件夹下的文件
    // parent
    ipcMain.on('queryFile', (...args) => {
        console.log('queryFile', args)
    })
}

module.exports = mainEvents;