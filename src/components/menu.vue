<template>
    <div id="menu" :class="opened?'menuOpened':'menuClosed'">
        <div class="top"></div>
        <div class="mid">
            <router-link to="/">
                <div class="section">
                    <i class="material-icons">home</i>
                    <span>HOME</span>
                </div>
            </router-link>
            <router-link to="/login" v-if="!logged">
                <div class="section">
                    <i class="material-icons">login</i>
                    <span>LOGIN</span>
                </div>
            </router-link>
            <router-link to="/logged/provvigioni" v-if="logged">
                <div class="section">
                    <i class="material-icons">payments</i>
                    <span>PROVVIGIONI</span>
                </div>
            </router-link>


            <router-link to="/settings">
                <div class="section">
                    <i class="material-icons">settings</i>
                    <span>SETTINGS</span>
                </div>
            </router-link>
        </div>
        <div class="bottom">
            <div class="logout" v-if="logged" @click="logout()">LOGOUT</div>
            <div class="version">v{{version}}</div>
        </div>
    </div>
    <!-- <div id="closeSection" :class="opened?'closeOpened':'closeClosed'" @click="closeMenu"></div> -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {version} from '../../package'
export default {
    data() {
        return {
            version:version,
        }
    },
    props:['opened'],
    computed: mapGetters(['onLine','logged']),
    methods:{
        ...mapActions(['logoutAction']),
        closeMenu(){
            this.$parent.toggleMenu()
        },
        logout(){
            this.logoutAction().then(()=>{
                this.$router.push('/login');
            })
        }
    },
    mounted(){
    }
}
</script>

<style lang="scss" scoped>
$menuTransitionTime: 0.4s;
#menu{
    width: var(--MenuWidth);
    position: fixed;
    top: var(--TitleBarHeight);
    background: var(--Color2);
    height: calc(100% - var(--TitleBarHeight));
    z-index: 99;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    box-shadow: var(--NavbarShadow);
    .mid{
        margin-left: 35px;
        .section{
            width: 100%;
            display: flex;
            align-items: center;
            transition-duration: 0.1s;
            margin-bottom: 5px;
            i{
                font-size: 20pt;
            }
            span{
                font-size: 12pt;
                font-weight: 600;
                margin-left: 5px;
                margin-right: 5px;
            }
            &:hover{
                transform: translateX(10px);
                transition-duration: 0.1s;
            }
        }
    }
    .bottom{
        text-align: center;
        padding-bottom: 10px;
        .signature{font-weight: 700;}
        .version{
            font-size: 9pt;
            font-weight: 300;
        }
    }
}
.menuClosed{
    transform: translateX(-100%);
    transition-duration: $menuTransitionTime;
}
.menuOpened{
    transform: translateX(0%);
    transition-duration: $menuTransitionTime;
}
#closeSection{
    position: fixed;
    width: calc(100% - var(--MenuWidth));
    left: var(--MenuWidth);
    top: var(--TitleBarHeight);
    height: calc(100% - var(--TitleBarHeight));
    background-color: rgba(255, 0, 0, 0.188);
    z-index: 99;
    
}


.redIcon{
    color: red;
}

.logout{
    font-size: 10pt;
    border: 1px solid var(--mainColor);
    width: max-content;
    margin: 0 auto;
    margin-bottom: 10px;
    padding: 2px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 700;
    transition-duration: 0.1s;
    &:hover{
        background: var(--mainColor);
        color: var(--Color2);
        transition-duration: 0.1s;
    }
}

</style>