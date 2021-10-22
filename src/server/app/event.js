const { ipcMain, dialog, clipboard } = require('electron')
const clipboardFiles = require('clipboard-files')
const { AsyncFunc, prevFiles } = require('./util')

const mainEvents = () => {
    // 操作数据
    // type: get add delete, list: []
    ipcMain.on('get-resource', (event) => {

        console.log('get-resource')

        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('add-resource', (event, filePaths) => {
        const resource = prevFiles(filePaths)
        console.log('add-resource', resource)

        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('delete-resource', (event, ids) => {
        console.log('delete-resource', ids)

        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('open-file', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        }).then((files) => {
            if (files) {
                const resource = prevFiles(files.filePaths)
                console.log("open-file", resource)

                // event.sender.send('resource-monitor', )
            }
        })
    })

    ipcMain.on('paste-data', async (event) => {
        const typeSet = new Set(clipboard.availableFormats())
        console.log('paste-types', typeSet)


        if (typeSet.has('text/uri-list')) {
            console.log('文件')
            const [fileErr, files] = await AsyncFunc(clipboardFiles.readFiles().map(file => decodeURIComponent(file)))
            if (!fileErr) console.log('paste-data-files', files)
        } else if (typeSet.has('image/png')) {
            const [imgErr, img] = await AsyncFunc(clipboard.readImage().toDataURL())
            if (!imgErr) console.log('paste-data-img', img)
        } else {
            const [textErr, text] = await AsyncFunc(clipboard.readText())
            if (!textErr) console.log('paste-data-text', text)
        }
        
        // event.sender.send('resource-monitor', )
    })
}

module.exports = mainEvents;