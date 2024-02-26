<script>
const { VITE_API_URL } = import.meta.env;

export default {
  methods: {
    // 驗證登入
    checkAdmin() {
      this.axios.post(`${VITE_API_URL}/api/user/check`)
        .then((res) => {
          console.log('驗證成功:', res.data.success);
          // this.getData();
        })
        .catch((err) => {
          alert('驗證失敗', err.response.data.message);
          this.$router.push('/login');
        });
    },
  },
  mounted() {
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
  <body>
    <RouterView></RouterView>
  </body>
</template>
