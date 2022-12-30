'use strict'
const {ipcMain} = require("electron");

module.exports.start = function(win,store){
    var pratiche_actions = require('./pratiche_actions');
    pratiche_actions.setupWin(win,store);

    ipcMain.handle('pratiche/load', async (event,data) => {
        var praticheArray = await pratiche_actions.parseCSV(data);
        await pratiche_actions.loadFromCSV(praticheArray);

        return praticheArray;
    });
}
