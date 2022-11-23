<template>
    <div id="logged">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['logged']),
    mounted(){
        if(!this.logged){
            this.$router.push('/login');
        }
    }
}
</script>