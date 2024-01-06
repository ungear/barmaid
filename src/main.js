import { createApp } from 'vue'
import Root from "./components/root.vue";
import router from "./routing";
import store from "./store";

const app = createApp(Root);
app.use(router);
app.use(store);
app.mount('#app');


