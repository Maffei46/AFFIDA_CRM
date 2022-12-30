<template>
    <div id="pratiche_import">
        <div class="loading" v-if="loading">
            <div class="loadingWithData">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                <div class="data">Uploading: 1/3000</div>
            </div>
        </div>
            
        <div class="file">
            <form @submit="loadFile">
                <input type="file" @change="previewFiles" accept=".csv" required>
                <button type="submit">LOAD</button>
            </form>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading:false,
            form:{
                file:''
            }
        }
    },
    methods:{
        previewFiles(e){
            this.form.file = e.target.files[0];
            var nameSPlitted = this.form.file.name.split('.');
            var extension = nameSPlitted[1];
            if(extension != 'csv'){
                console.log('NOT PERMITED EXTENSION')
                this.form.file = '';
            }
        },
        loadFile(e){
            e.preventDefault();
            if(!this.form.file){
                return console.log('FILE NOT ALLOWED');
            }
            var data = {
                size: this.form.file.size,
                name: this.form.file.name,
                path: this.form.file.path,
            }
            this.loading = true;
            window.API.invoke('pratiche/load',data).then((res)=>{
                console.log(res);
                this.loading = false;
            })
        }
    },
    mounted(){
        window.API.on('pratiche/loading',(data) =>{
            console.log(data);
        })
    }
}
</script>

<style lang="scss" scoped>
#pratiche_import{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc( var(--app-height) - var(--TitleBarHeight));
    
    .file{
        background: var(--Color2);
        padding: 20px;
        text-align: center;
        border-radius: 10px;
        button{
            margin-top: 15px;
        }
    }
}
</style>