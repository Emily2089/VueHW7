<script>
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    MessageToast,
  },
  methods: {
    ...mapActions(messageToastStore, ['pushMessage']),
    // 驗證登入
    checkAdmin() {
      this.axios.post(`${VITE_API_URL}/api/user/check`)
        .then((res) => {
          // note：
          // 1. 原本這邊是寫 res.data.success，故意改成 res.data.message，結果會是沒有值
          // 2. 如此一來，在 MessageToast 的樣板中，content 那段的 div 就不會顯示，因為 v-if 的值為 false
          this.pushMessage({
            style: 'success',
            title: '驗證身分成功',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '驗證身分失敗',
            content: err.response.data.message,
          });
          this.$router.push('/login');
        });
    },
    logout() {
      this.isLoading = true;
      this.axios.post(`${VITE_API_URL}/logout`)
        .then((res) => {
          document.cookie = 'emilyToken=; expires=;';
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '登出成功',
            content: res.data.message,
          });
          this.$router.push('/login');
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '登出失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  created() {
    // 將 cookie 裡的 token 夾在 headers 裡
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)emilyToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 bg-dark p-3" style="height: 100vh">
        <ul class="nav flex-column nav-pills" role="navbar">
          <li>
            <RouterLink to="/" class="nav-link fs-3 mb-2">Gamer Station</RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/products" class="nav-link">產品列表</RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/orders" class="nav-link">訂單列表</RouterLink>
          </li>
          <li>
            <RouterLink to="/admin/coupons" class="nav-link">優惠券列表</RouterLink>
          </li>
        </ul>
      </div>
      <div class="col-10 p-3" style="height: 100vh">
        <div class="container-fluid">
          <VueLoading :active="isLoading"></VueLoading>
          <MessageToast></MessageToast>
          <div class="text-end">
            <button class="btn btn-outline-primary" @click="logout">登出</button>
          </div>
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.nav-link {
  color: white;
}
</style>
