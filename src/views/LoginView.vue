<script>
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  components: {
    MessageToast,
  },
  methods: {
    ...mapActions(messageToastStore, ['pushMessage']),
    login() {
      this.axios.post(`${VITE_API_URL}/admin/signin`, this.user)
        .then((res) => {
          // 存取 token 到 cookie
          const { expired, token } = res.data;
          document.cookie = `emilyToken=${token}; expires=${new Date(expired)};`;
          this.pushMessage({
            style: 'success',
            title: '登入成功',
            content: res.data.msg,
          });
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '登入失敗',
            content: err.response.data.message,
          });
        });
    },
  },
};
</script>

<template>
  <MessageToast></MessageToast>
  <div id="login">
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal">
          請先登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username"
                placeholder="name@example.com" required autofocus v-model="user.username">
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password"
                placeholder="Password" required v-model="user.password">
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" id="login">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted">
        &copy; 2023~∞ - 六角學院
      </p>
    </div>
  </div>
</template>

<style lang="scss">
#login {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
