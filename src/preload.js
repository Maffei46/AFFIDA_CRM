const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
    invoke:(name) => ipcRenderer.invoke(name),
    invoke:(name,...args) => ipcRenderer.invoke(name,...args),
    on: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
})