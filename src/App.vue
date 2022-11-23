<template>
  <TitleBar />
  <UpdatesComponent :done="updatesDone" />
  <div class="mainContent">
    <router-view/>  
  </div>
  
</template>

<script>
import TitleBar from '@/components/titleBar.vue'
import UpdatesComponent from '@/components/updates_component.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components:{TitleBar,UpdatesComponent},
  methods:{
    ...mapActions(['fetchState']),
    updatesDone(done){
      //console.log('Updates Ended: ',done)
    },
    appHeight(){
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    },
    checkDarkMode(){
      if(this.darkMode == undefined) return;
      if(this.darkMode){ //DARKMODE
        document.documentElement.style.setProperty('--mainColor', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--mainColorFont', 'rgb(24, 24, 24)');
        document.documentElement.style.setProperty('--mainBGColor', 'rgb(24, 24, 24)');
        document.documentElement.style.setProperty('--Color2', 'rgb(14, 14, 14)');
        document.documentElement.style.setProperty('--Color2Hover', 'rgb(30, 30, 30)');
        document.documentElement.style.setProperty('--NavbarShadow', 'rgba(0, 0, 0, 0.35) 0px 5px 15px');
        document.documentElement.style.setProperty('--Color3', 'rgb(14, 14, 14)');
      }else{            //LIGHTMODE
        document.documentElement.style.setProperty('--mainColor', 'rgb(24, 24, 24)');
        document.documentElement.style.setProperty('--mainColorFont', 'rgb(24, 24, 24)');
        document.documentElement.style.setProperty('--mainBGColor', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--Color2', 'rgb(205, 205, 205)');
        document.documentElement.style.setProperty('--Color2Hover', 'rgb(225, 225, 225)');
        document.documentElement.style.setProperty('--NavbarShadow', 'none');
        document.documentElement.style.setProperty('--Color3', 'rgb(205, 205, 205)');
      }
    }
  },
  computed: mapGetters(['darkMode']),
  watch:{
    darkMode (){
      this.checkDarkMode();
    }
  },
  mounted(){
    window.addEventListener('resize', this.appHeight);
    this.appHeight();
    this.fetchState();
    this.checkDarkMode();
  }
}
</script>

<style lang="scss" scoped>
@import url('@/assets/scss/main.scss');
.mainContent{
  height: calc( var(--app-height) - var(--TitleBarHeight));
  overflow-y: auto;
}
</style>
