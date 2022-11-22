import { ipcMain } from "electron";

function appRoute(name:string,func: (...args:any[]) => Promise<any>){
    return ipcMain.handle(name, async (event,args)=>{
        var results = await func(args);
        return results;
    })
}

export {appRoute};