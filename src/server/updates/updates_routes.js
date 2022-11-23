'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(win,store){
    var updates_actions = require('./updates_actions');
    updates_actions.setupWin(win,store);

    ipcMain.handle('updates/check', (event) => {
        updates_actions.checkAndNotify();
    });
}
