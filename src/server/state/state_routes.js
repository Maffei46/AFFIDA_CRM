'use strict'
const {ipcMain} = require("electron");

let win;
let store;
module.exports.start = function(win,store){
    this.win = win;
    this.store = store;

    ipcMain.handle('state/rememberCredentials', (event,data) => {
        store.set('login.username',data.username);
        store.set('login.password',data.password);
        store.set('login.rememberCredentials',data.rememberCredentials);
    });

    ipcMain.handle('state/autoLogin', (event,data) => {
        store.set('login.autoLogin',data);
    });

    ipcMain.handle('state/darkMode', (event,data) => {
        store.set('state.darkMode',data);
    });
    
    ipcMain.handle('state',(event) => {
        return {
            login:{
                username: store.get('login.username') || null,
                password: store.get('login.password') || null,
                rememberCredentials: store.get('login.rememberCredentials') || false,
                autoLogin: store.get('login.autoLogin') || false,
            },
            darkMode: store.get('state.darkMode'),
        }
    })
}
