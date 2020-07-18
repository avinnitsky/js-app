import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import {compentFactory} from './components/componentFactory'

//import './styles.css'
import './less/styles.less'

new Vue({
    vuetify,
    created() {},
    render: h => h(App)
}).$mount('#app')
