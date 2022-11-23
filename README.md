# AFFIDA - CRM

## DEVELOP MODE
```
Package.json - main:"background.js"
```

## HOW TO PUBLISH
```
Delete dist_electron folder.
Delete dist folder.
Package.json - main:"background.js"
vue-cli-service electron:build
Package.json - main:"dist_electron/bundled/background.js"
electron-builder -p always
```