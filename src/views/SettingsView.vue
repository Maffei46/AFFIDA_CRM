<template>
    <div id="settings">
        <div class="button generalButton" @click="checkUpdates()">Controlla Aggiornamenti</div>
        <div class="button generalButton" @click="changeMode()">Cambia Modalità Colori</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions(['changeDarkMode']),
        checkUpdates(){
            window.API.invoke('updates/check');
        },
        changeMode(){
            this.changeDarkMode();
        }
    }
}
</script>