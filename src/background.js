'use strict'

import { app, protocol, BrowserWindow,ipcMain,Menu,dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path';

//STORE
const Store = require('electron-store');
const store = new Store();

//AUTO UPDATER
  const log = require('electron-log');
  // const {autoUpdater} = require("electron-updater");

  // autoUpdater.logger = log;
  // autoUpdater.logger.transports.file.level = 'info';
  log.info('App starting...');

//MENU
const updates_actions = require('./server/updates/updates_actions');
  const template = [
    { 
      label: 'File',
      submenu: [
        {
          label: 'Check For Updates',
          click(){
            updates_actions.checkAndNotify();
          }
        },
        {
          label: 'DevTool',
          click(){
            win.webContents.openDevTools();
          }
        },
        {
          label: 'Quit',
          click(){ app.quit();}
        }
      ]
    }
  ]



const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;
async function createWindow() {
  // Create the browser window.
  console.log(path.join(__dirname, 'favicon.ico'));
  win = new BrowserWindow({
    width: 1600,
    height: 1200,
    icon: path.join(__dirname, 'favicon.ico'),
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  win.on('closed', () => {
    win = null;
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
 

  //checkUpdates.CheckUpdateAndProcess();
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  const menu = Menu.buildFromTemplate(template);
  //Menu.setApplicationMenu(menu);
  createWindow()

  var routes = require('./server/routes');
  routes.start(win,store);
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


ipcMain.handle('restart', (event) => {
  //TODO: Controllare sfondo bianco al riavvio
  app.relaunch();
  app.exit();
});

ipcMain.handle('reduce', (event) => {
  win.isMinimized() ? win.restore() : win.minimize()
});

ipcMain.handle('crop', (event) => {
  win.isMaximized()? win.unmaximize(): win.maximize();
});

ipcMain.handle('close', (event) => {
  app.exit();
});

ipcMain.handle('test', (event) => {
  console.log('test');
});