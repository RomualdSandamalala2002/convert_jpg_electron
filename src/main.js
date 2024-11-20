const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { default: reduceImage, reduce } = require('./reduce-image');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('src/index.html');
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  });

  if (result.canceled) {
    return [];
  }

  const selectedFolder = result.filePaths[0];
  const files = fs
    .readdirSync(selectedFolder)
    .filter((file) => path.extname(file).toLowerCase() === '.jpg');

  const mainResult = files.map((file) => path.join(selectedFolder, file));

  return mainResult;
});

ipcMain.handle('reduce-image', async (event, inputPath) => {
  await reduce(inputPath, inputPath)
});