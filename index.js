'use strict'
const { app, BrowserWindow } = require('electron')
const { autoUpdater } = require('electron-updater')
const { is } = require('electron-util')
const unhandled = require('electron-unhandled')

unhandled()

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.mrbrist.wave')

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
if (!is.development) {
  const FOUR_HOURS = 1000 * 60 * 60 * 4
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, FOUR_HOURS)

  autoUpdater.checkForUpdates()
}

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 620,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'undocked' })

  // Remove menu
  mainWindow.setMenu(null)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
