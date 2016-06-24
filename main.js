'use strict'
const electron = require('electron')
const app = electron.app

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window being garbage collected
let mainWindow

function createMainWindow () {
  const win = new electron.BrowserWindow({
    width: 1280,
    height: 720
  })

  win.loadURL(`file://${__dirname} + '/public/views/index.html`)

  // win.on('move', function () {
  //   console.log('teste')
  // })

  win.on('closed', function () {
    mainWindow = null
  })

  win.webContents.openDevTools();

  return win
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
