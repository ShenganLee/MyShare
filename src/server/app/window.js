const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: app.getName(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (process.env.electronEnv = 'development') {
    mainWindow.loadURL('http://localhost:9999')
  } else if (process.env.electronEnv = 'production') {
    mainWindow.loadFile(path.join(process.cwd(), './dist/index.html'))
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow
};

module.exports = createWindow