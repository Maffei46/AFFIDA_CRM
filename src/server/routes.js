//var appRoute = require('./routes_helper.ts');
// import { app, dialog } from 'electron'
// import { ipcMain } from "electron";

module.exports.start = function(win,store){
    var updates_routes = require('./updates/updates_routes');
    updates_routes.start(win,store);

    var state_routes = require('./state/state_routes');
    state_routes.start(win,store);

    var pratiche_routes = require('./pratiche/pratiche_routes');
    pratiche_routes.start(win,store);

    var agenti_routes = require('./agenti/agenti_routes');
    agenti_routes.start(win,store);

    // ipcMain.handle("test", async (event,args)=>{
    //     return "ciao";    
    // })
}

