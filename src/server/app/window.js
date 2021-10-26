const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = (ip, port) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // maximizable: false,
    titleBarStyle: 'hidden',
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`http://${ip}:${port}`)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow
};

module.exports = createWindow