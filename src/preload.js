const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
    test: () => ipcRenderer.invoke('test')
})