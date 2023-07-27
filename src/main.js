import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.mount('#app');

// export function postApi(funName, callback) {
//   const apiUrl = `${process.env.VUE_APP_API}${funName}`;
//   console.log(apiUrl);
//   this.$http.post(apiUrl, this.user).then((res) => {
//     callback(res);
//   });
// }
