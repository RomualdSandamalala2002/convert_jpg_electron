const { contextBridge, ipcRenderer } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  reduceImage: (inputPath) => ipcRenderer.invoke('reduce-image', inputPath),
});
