import axios from 'axios';
import { Server } from '../../utils/variables';
import cookie from 'vue-cookies'

const state = {
    logged:false,
    onLine:false,
    darkMode:true,

    stateFetched: false,

    login:{
        username: null,
        password: null,
        rememberCredentials:false,
        autoLogin: false,
    }
}
const getters = {
    onLine: state => state.onLine,
    logged: state => state.logged,
    login: state => state.login,
    darkMode: state => state.darkMode,
    stateFetched: state => state.stateFetched,
    
}


//  INTERNET CONNECTION --------
const updateOnlineStatus = () => {
    state.onLine = navigator.onLine ? true : false;
    console.log(state)
}
window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)
updateOnlineStatus()
//  ----------------------------


const actions = {
    async fetchState({state}){
        if(state.stateFetched) return;
        if(cookie.get('adminToken')){
            state.logged = true;
        }
        var res = await API.invoke('state');
        state.login = res.login;
        state.darkMode = res.darkMode;
        state.stateFetched = true;
        console.log('STATE FATCHED',state);
    },
    async loginAction({state},form){
        try{
            var res = await axios.post(Server+'/admin/login',form);
            cookie.set('adminToken',res.data.token);    
            state.logged = true;

            //STORING SELECTED OPTIONS IN SERVER STORAGE
            API.invoke('state/rememberCredentials',{
                rememberCredentials:form.rememberCredentials,
                username: form.username,
                password: form.password
            });
            API.invoke('state/autoLogin',form.autoLogin);

            //STORING SELECTED OPTIONS IN RENDERER STORAGE
            state.login.rememberCredentials = form.rememberCredentials;
            state.login.autoLogin = form.autoLogin;
            if(state.login.rememberCredentials){
                state.login.username = form.username;
                state.login.password = form.password; 
            }

        }catch(e){
            console.log('error:',e);
        }
        
    },
    async logoutAction({state}){
        state.logged = false;
        cookie.remove('adminToken');
    },
    async changeDarkMode({state}){
        state.darkMode = !state.darkMode;
        API.invoke('state/darkMode',state.darkMode);
    }

}
const mutations = {

}

export default{
    state,
    getters,
    actions,
    mutations
}