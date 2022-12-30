<template>
    <div id="pratiche">
        <div class="subMenu">
            <router-link to="/">
                <div class="back">
                    <i class="material-icons">arrow_back</i> 
                </div>
            </router-link>
            <div class="separator"></div>
            <div class="title">
                <i class="material-icons">payments</i>
                <span>PRATICHE</span>
            </div>
            <div class="separator"></div>
            <router-link to="/logged/pratiche/import">
                <div class="link">IMPORT</div>
            </router-link>
            <router-link to="">
                <div class="link">SELECT</div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>