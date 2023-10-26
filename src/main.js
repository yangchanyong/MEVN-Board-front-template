import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueCookies from 'vue-cookies'
// Nucleo Icons
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import materialKit from "./material-kit";
import axios from "axios";
axios.defaults.withCredentials = true;
const app = createApp(App);
app.use(VueCookies);
// Vue.$cookies.config('1d')
// app.$cookies.config('1d')
app.use(createPinia());
app.use(router);
app.use(materialKit);
app.mount("#app");
