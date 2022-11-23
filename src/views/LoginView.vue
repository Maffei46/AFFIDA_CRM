<template>
    <div id="login">
        <div class="loading" v-if="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
        <form @submit="sendForm">
            <div class="formName">LOGIN</div>
            <div class="input">
                <input type="email" class="large" v-model="form.username" required>
                <div class="label">EMAIL</div>
            </div>
            <div class="input">
                <input type="password" class="large" v-model="form.password" required>
                <div class="label">PASSWORD</div>
            </div>
            <div class="checkbox">
                <input type="checkbox" v-model="form.rememberCredentials">
                <div class="label bigLabel">RICORDA CREDENZIALI</div>
            </div>
            <div class="checkbox">
                <input type="checkbox" v-model="form.autoLogin">
                <div class="label bigLabel">LOGIN AUTOMATICO</div>
            </div>
            <button type="submit">LOGIN</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading:false,
            form:{
                username:'',
                password:'',
                rememberCredentials:false,
                autoLogin:false,
            }
        }
    },
    methods:{
        ...mapActions(['loginAction']),
        sendForm(e){
            e.preventDefault();
            this.loading = true;
            this.loginAction(this.form).then(()=>{
                this.loading = false;
                this.$router.push('/');
            })
        },
        setupForm(){
            if(this.stateFetched){
                this.form.rememberCredentials = this.login.rememberCredentials;
                this.form.autoLogin = this.login.autoLogin;
                if(this.login.rememberCredentials){
                    this.form.username = this.login.username;
                    this.form.password = this.login.password;
                }
            }
        }
    },
    computed: mapGetters(['login','stateFetched','logged']),
    watch:{
        stateFetched (){
            this.setupForm();
        }
    },
    mounted(){
        if(this.logged){
            this.$router.push('/');
        }
        this.setupForm();
    }
}
</script>

<style lang="scss" scoped>
#login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    form{
        max-width: 300px;
    }
}
</style>