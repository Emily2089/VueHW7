<script>
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

const { VITE_API_URL } = import.meta.env;

export default {
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
  <h1>這是後台</h1>
  <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/orders">訂單列表</RouterLink>|
    <RouterLink to="/admin/coupons">優惠券列表</RouterLink>|
    <RouterLink to="/">回到前台頁面</RouterLink>
  </nav>
  <div class="container">
    <MessageToast></MessageToast>
    <RouterView></RouterView>
  </div>
</template>
