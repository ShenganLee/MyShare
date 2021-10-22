const { contextBridge, ipcRenderer, dialog, clipboard } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        on: (channel, listener) => {
            return ipcRenderer.on(channel, listener)
        },
        off: (channel, listener) => {
            return ipcRenderer.off(channel, listener)
        },
        send: (channel, ...args) => {
            return ipcRenderer.send(channel, ...args)
        },
        sendSync: (channel, ...args) => {
            return ipcRenderer.sendSync(channel, ...args)
        },
    },
});
