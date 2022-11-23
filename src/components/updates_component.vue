<template>
    <div id="updates" v-if="state!=-1">
        <div class="lds-ring" v-if="state != 3"><div></div><div></div><div></div><div></div></div>
        <div class="subTitle">CHECKING UPDATES</div>
        <p v-if="state==0">Checking...</p>
        <p v-if="state==1">Update Available</p>
        <p v-if="state==2">Downloading: {{downloadPercentual}}%</p>
        <p v-if="state==3">DOWNLOADED</p>

        <div class="restart" v-if="restart">
            <p>Restart Application?</p>
            <div class="buttons">
                <div class="button" @click="restartAct(true)">YES</div>
                <div class="button" @click="restartAct(false)">NO</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['done'],
    data() {
        return {
            state:-1,
            downloadPercentual:0,
            restart:false,
        }
    },
    methods:{
        restartAct(rest){
            if(rest){
                window.API.invoke('restart');
            }else{
                this.state = -1;
                this.done(true);
            }
        }
    },
    mounted(){
        this.state = 0;
        window.API.invoke('updates/check');
        
        window.API.on('updates/checking',() =>{
            this.state = 0;
            this.restart = false;
        })

        window.API.on('updates/available',(res) =>{
            if(res.available){
                this.state = 1;
            }else{
                this.state = -1;
                this.done(false);
            }
            
        })

        window.API.on('updates/downloading',(res) =>{
            this.state = 2;
            this.downloadPercentual = res.progressObj.percent;
        })

        window.API.on('updates/downloaded',() =>{
            this.state = 3;
            this.restart = true;
            this.downloadPercentual = 0;
            //this.done(true);
        })

        window.API.on('updates/error',(error) =>{
            this.done(false);
        })
    }
}
</script>

<style lang="scss" scoped>
    #updates{
        position: fixed;
        top:var(--TitleBarHeight);
        left:0;
        width: 100%;
        height: calc(100% - var(--TitleBarHeight));
        backdrop-filter: blur(3px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        z-index: 100;
        .subTitle{color:white; font-weight: 800;}
        h2{color:white;}
        p{color:white; font-size: 10pt;}
        
    }
    .restart{
        position: fixed;
        top:5px;
        left:50%;transform: translateX(-50%);
        text-align: center;
        background-color: rgb(15, 15, 15);
        padding: 15px 20px 15px 20px;
        border-radius: 5px;
        p{margin-bottom: 5px;}
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .buttons{
            display: flex;
            column-gap: 10px;
            
            .button{
                background-color: rgb(55, 55, 55);
                padding: 3px 20px;
                border-radius: 3px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
                transition-duration: 0.1s;
                &:hover{
                    transform: scale(1.07);
                    transition-duration: 0.1s;
                }
            }
        }
    }
</style>