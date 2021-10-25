const { ipcMain, dialog, clipboard } = require('electron')
const clipboardFiles = require('clipboard-files')

const { prevFiles, prevImage, prevText } = require('./util')
const Resource = require('./resource')

const mainEvents = () => {
    // 操作数据
    // type: get add delete, list: []
    ipcMain.on('get-resource', (event) => {

        console.log('get-resource')

        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('add-resource', (event, filePaths) => {
        if (!filePaths.length) return

        const resource = prevFiles(filePaths)
        console.log('add-resource', resource)

        Resource.addResource(resource)
        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('delete-resource', (event, ids) => {
        console.log('delete-resource', ids)

        Resource.deleteResource(ids)
        // event.sender.send('resource-monitor', )
    })

    ipcMain.on('open-file', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        }).then((files) => {
            if (files) {
                const resource = prevFiles(files.filePaths)
                console.log("open-file", resource)

                Resource.addResource(resource)
                // event.sender.send('resource-monitor', )
            }
        })
    })

    ipcMain.on('paste-data', (event) => {
        const typeSet = new Set(clipboard.availableFormats())
        console.log('paste-types', typeSet)

        let resource = []
        if (typeSet.has('text/uri-list')) {
            const files = clipboardFiles.readFiles().map(file => decodeURIComponent(file).replace('file://', ''))
            resource = prevFiles(files)
            console.log('paste-data-files', resource)
        } else if (typeSet.has('image/png')) {
            const img = clipboard.readImage().toDataURL()
            resource = [prevImage(img)]
            console.log('paste-data-img', resource)
        } else {
            const text = clipboard.readText()
            resource = [prevText(text)]
            console.log('paste-data-text', resource)
        }
        
        if (resource && resource.length) {
            Resource.addResource(resource)
        }
        // event.sender.send('resource-monitor', )
    })
}

module.exports = mainEvents;