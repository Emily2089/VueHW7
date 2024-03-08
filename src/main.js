import './assets/all.scss';
// import * as bootstrap from 'bootstrap';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// 載入自己定義的函式
import { AccurateDate, AccurateTime } from '@/methods/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// #region note：
// 1. app.config.globalProperties：註冊能夠被應用內所有元件實例存取到的全域屬性的物件。
// 2. 例如，app.config.globalProperties.msg = 'hello' 。
// 3. 則所有元件的實例都可透過 this.msg 取得 hello 字串。
// 2. 這邊設定 $filters 來取用我們在 filters 資料夾定義的函式
// #endregion
app.config.globalProperties.$filters = {
  AccurateDate,
  AccurateTime,
};

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
// app.use(bootstrap);

// 以元件的形式啟用
app.component('VueLoading', Loading);

app.mount('#app');
