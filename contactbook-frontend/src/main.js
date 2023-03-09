import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;
app.mount("#app");
