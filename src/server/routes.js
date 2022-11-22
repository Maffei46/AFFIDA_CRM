//var appRoute = require('./routes_helper.ts');
'use strict'

import { app, dialog } from 'electron'
import { ipcMain } from "electron";

var checkUpdates = require('./updates/checkUpdates.js');

ipcMain.handle("test", async (event,args)=>{
    return checkUpdates.CheckUpdateAndProcess();    
})