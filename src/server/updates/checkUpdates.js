const fs = require('fs');
function checkIfVersionIsGrater(a1,a2,a3,b1,b2,b3){
    if(a1>b1) return true; else if(a1 < b1) return false;
    if(a2>b2) return true; else if(a2 < b2) return false;
    if(a3>b3) return true; else if(a3 < b3) return false;
    return false;
}

const ELECTRON = require('electron');
const app = ELECTRON.app;
const dialog = ELECTRON.dialog;
const BrowserWindow = ELECTRON.BrowserWindow;

module.exports.Check = async function(){
    var currentVersion = app.getVersion();
        return new Promise((resolve, reject) => {
            const FOLDERPATH = "C:\\Tests\\Versioning";
            // File naming convention: CRM_
            fs.readdir(FOLDERPATH, (err, files) => {
                var fileToUpdate = null;
                var fileToUpdateVersion = null;
                files.forEach(file => {
                    var firstSplit = file.split('v');
                    if( firstSplit.length != 2 ) return;
                    var prefix = firstSplit[0];
                    if( prefix != "CRM_" ) return;
                    var others1 = firstSplit[1];
                    var secondSplit = others1.split('.');
                    if( secondSplit.length != 4) return;
                    var extension = secondSplit[3];
                    if( extension != "zip") return;
                    var currentVersionSplitted = currentVersion.split('.')
                    var isG = checkIfVersionIsGrater(currentVersionSplitted[0],currentVersionSplitted[1],currentVersionSplitted[2],secondSplit[0],secondSplit[1],secondSplit[2])
                    
                    if(!isG){
                        //console.log(currentVersion+' < '+secondSplit[0]+'.'+secondSplit[1]+'.'+secondSplit[2]);
                        if(fileToUpdate == null){
                            fileToUpdate = file;
                            fileToUpdateVersion = secondSplit;
                        }else if(checkIfVersionIsGrater(secondSplit[0],secondSplit[1],secondSplit[2],fileToUpdateVersion[0],        fileToUpdateVersion[1],fileToUpdateVersion[2])){
                            fileToUpdate = file;
                            fileToUpdateVersion = secondSplit;
                        }
                    }
                });
    
                if(fileToUpdate == null) return resolve(null);
                return resolve({
                    file: FOLDERPATH+'\\'+fileToUpdate,
                    newVersion: fileToUpdateVersion[0]+'.'+fileToUpdateVersion[1]+'.'+fileToUpdateVersion[2],
                    currentVersion: currentVersion
                })
            });
        })
}

module.exports.CheckUpdateAndProcess = async function(){
    var update = await this.Check();
    /*update = {
        file: 'C:\\Tests\\Versioning\\CRM_v1.0.3.zip',
        newVersion: '1.0.3',
        currentVersion: '0.1.0'
    }*/

    if(update != null){
        var stats = fs.statSync(update.file);
        var fileSizeInBytes = stats.size;
        var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);

        dialog.showMessageBox(
            new BrowserWindow({
                show: false,
                alwaysOnTop: true
            }),{
                type: 'question',
                title: 'Update Available v'+update.newVersion,
                message: `A new version of app is available (v${update.newVersion}). Do you want to update now? ${fileSizeInBytes} bytes`,
                buttons: ['Update', 'Ignore'],
                cancelId: -1,
            }
        ).then(result => {
            //Update -> result: { response: 0, checkboxChecked: false }
            //Ignore -> result: { response: 1, checkboxChecked: false }
            //Close -> result: { response: -1, checkboxChecked: false }
            var response = result.response;
            if(response == 1 || response == -1) return;

            console.log(result);
        })
    }
}
