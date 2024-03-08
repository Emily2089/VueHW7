<script>
import PaginationComponent from '@/components/tools/PaginationComponent.vue';
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

import AdminCouponModal from '@/components/AdminCouponModal.vue';
import AdminDelModal from '@/components/AdminDelModal.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        due_date: '',
        percent: '',
        is_enabled: 0,
      },
      is_new: true,
      pages: {},
      obj: 'coupon',
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    MessageToast,
    AdminCouponModal,
    AdminDelModal,
  },
  methods: {
    ...mapActions(messageToastStore, ['pushMessage']),
    // 取得優惠券資訊
    getCoupons(page = 1) {
      this.isLoading = true;
      this.axios.get(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/coupons?page=${page}`)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pages = res.data.pagination;
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功取得優惠券資訊',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得優惠券資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    // 打開 modal
    openModal(action, item) {
      if (action === '新增') {
        this.$refs.cModal.openModal();
        this.is_new = true;
        // note：
        // 1. 在新增優惠券時，若不對 due_date 的值做額外設定，則它預設值會是一個空值。
        // 2. 此空值在觸發優惠券元件中的 tempCoupon() 時，會變成 1970-01-01。
        // 3. 因此為了避免此狀況，預先在新增優惠券時將 due_date 的值設為當天的日期。
        // 4. Date.prototype.getTime() 會回傳自 1970 年 1 月 1 日 00:00:00 UTC 起經過的毫秒數，為了轉換成時間戳，要除以 1000。
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else if (action === '編輯') {
        this.$refs.cModal.openModal();
        this.is_new = false;
        this.tempCoupon = { ...item };
      } else if (action === '刪除') {
        this.$refs.dModal.openModal();
        this.tempCoupon = { ...item };
      }
    },
    updateCoupon() {
      this.isLoading = true;

      // 新增優惠券
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/coupon`;
      let http = 'post';

      if (this.is_new === false) {
        // 編輯優惠券
        // note：當 is_new 的值為 false 時，代表要編輯資料，所以使用 put，apiUrl 須加上參數 id
        apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/coupon/${this.tempCoupon.id}`;
        http = 'put';
      }

      this.axios[http](apiUrl, { data: this.tempCoupon })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功更新優惠券資訊',
            content: res.data.message,
          });
          this.$refs.cModal.closeModal();
          this.getCoupons();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '更新優惠券資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    // 刪除單筆資料
    deleteCoupon() {
      this.isLoading = true;
      this.axios.delete(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/coupon/${this.tempCoupon.id}`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功刪除優惠券資訊',
            content: res.data.message,
          });
          this.$refs.dModal.closeModal();
          this.getCoupons();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '刪除優惠券資訊失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>

<template>
  <div>
    <VueLoading :active="isLoading"></VueLoading>
    <MessageToast></MessageToast>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('新增')">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4 align-middle">
      <thead>
        <tr>
          <th class="text-top">名稱</th>
          <th class="text-center">優惠碼</th>
          <th class="text-center">折扣百分比</th>
          <th class="text-center">到期日</th>
          <th class="text-center">是否啟用</th>
          <th class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon, key) in coupons" :key="'coupon' + key">
          <td class="text-top">{{ coupon.title }}</td>
          <td class="text-center">{{ coupon.code }}</td>
          <td class="text-center">{{ coupon.percent }}%</td>
          <td class="text-center">{{ $filters.AccurateDate(coupon.due_date) }}</td>
          <td class="text-center">
            <span v-if="coupon.is_enabled" class="text-success">啟用</span>
            <span v-else></span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('編輯', coupon)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('刪除', coupon)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pages" :get-data="getCoupons"></PaginationComponent>
    <AdminCouponModal ref="cModal" :temp-coupon="tempCoupon" :is_new="is_new"
      @update-coupon="updateCoupon"></AdminCouponModal>
    <AdminDelModal ref="dModal" :obj="obj" :item="tempCoupon"
      @delete-item="deleteCoupon"></AdminDelModal>
  </div>
</template>
