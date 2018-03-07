import Vue from "vue"

import app from "./app.vue"
import metaMq from "src/index.js"

Vue.use(metaMq,{
    
});

new Vue({
    el:"#app",
    render(h){
        return h(app);
    },
    components:{
        app
    },
})