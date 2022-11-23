const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions:{
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions:{
        "publish":[{
          "provider": "github",
          "owner": "Maffei46",
          "repo": "AFFIDA_CRM"
        }]
      }
    }
  }
  
})
