import Vue from "vue";
import App from "./App.vue";
import { BaklavaVuePlugin } from "@baklavajs/plugin-renderer-vue";
import "@baklavajs/plugin-renderer-vue/dist/styles.css";

Vue.use(BaklavaVuePlugin);

import "./assets/main.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
