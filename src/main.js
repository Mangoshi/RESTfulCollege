// Default imports
import Vue from "vue";
import App from "./App.vue";

// Vue libraries
import router from "./router";
import store from "./store"

// Vue mixins
import titleMixin from './mixins/titleMixin'
Vue.mixin(titleMixin)

// Vue plugins
import vuetify from './plugins/vuetify.js'

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount("#app");
