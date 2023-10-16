import { createApp } from "vue";
// import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import loginStore from "./loginStore";
import Vuex from "vuex";
// Nucleo Icons

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import materialKit from "./material-kit";


const app = createApp(App);
// app.use(createPinia());
app.use(router);
app.use(materialKit);
app.use(loginStore);
app.mount("#app");

