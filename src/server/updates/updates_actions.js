
const {autoUpdater} = require("electron-updater");

const simulateUpdate = false;

let win;
let store;
module.exports.setupWin = function(win,store){
    this.win = win;
    this.store = store;
}

module.exports.checkAndNotify = async function(){
    if(process.env.NODE_ENV !== 'production'){
        if(simulateUpdate){
          this.simulate();  
        }else{
            this.win.webContents.send('updates/checking',{})
            this.win.webContents.send('updates/available',{available:false,info:{}})
        }
    }else{
        autoUpdater.checkForUpdatesAndNotify();
    }
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports.simulate = async function(){
    var multiplayer = 0.4;
    await sleep(2000*multiplayer);
    this.win.webContents.send('updates/checking',{})
    await sleep(2000*multiplayer);
    this.win.webContents.send('updates/available',{available:true,info:{}})
    var sleepTime = 300*multiplayer;
    var totalTime = 5000*multiplayer;
    var currentTime = 0;
    while(currentTime < totalTime){
        await sleep(sleepTime);
        currentTime += sleepTime;
        var percentual = (currentTime*100)/totalTime;
        if(percentual>100) percentual = 100;
        this.win.webContents.send('updates/downloading',{progressObj:{
            percent: percentual,
        }})
    }
    await sleep(1000);
    this.win.webContents.send('updates/downloaded')

}

autoUpdater.on('checking-for-update', () => {
    this.win.webContents.send('updates/checking',{})
})
autoUpdater.on('update-available', (info) => {
    this.win.webContents.send('updates/available',{available:true,info:info})
})
autoUpdater.on('update-not-available', (info) => {
    this.win.webContents.send('updates/available',{available:false,info:info})
})
autoUpdater.on('error', (err) => {
    this.win.webContents.send('updates/error',{error: err});
})
autoUpdater.on('download-progress', (progressObj) => {
    this.win.webContents.send('updates/downloading',{progressObj:progressObj})
    // let log_message = "Download speed: " + progressObj.bytesPerSecond;
    // log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    // log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    // sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    this.win.webContents.send('updates/downloaded')
    //sendStatusToWindow('Update downloaded');
});