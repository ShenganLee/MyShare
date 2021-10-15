const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        on(channel, func) {
            return ipcRenderer.on(channel, func)
        },
        off(channel, func) {
            return ipcRenderer.off(channel, func)
        },
        send(channel, ...args) {
            return ipcRenderer.send(channel, ...args)
        },
        sendSync(channel, ...args) {
            return ipcRenderer.sendSync(channel, ...args)
        }
    },
});
