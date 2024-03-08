<script>
import PaginationComponent from '@/components/tools/PaginationComponent.vue';
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

import AdminOrderModal from '@/components/AdminOrderModal.vue';
import AdminDelModal from '@/components/AdminDelModal.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
      },
      pages: {},
      obj: 'order',
      isLoading: false,
    };
  },
  components: {
    PaginationComponent,
    AdminOrderModal,
    MessageToast,
    AdminDelModal,
  },
  methods: {
    ...mapActions(messageToastStore, ['pushMessage']),
    // 取得後台訂單資料
    getOrders(page = 1) {
      this.isLoading = true;
      this.axios.get(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/orders?page=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.pages = res.data.pagination;
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功取得訂單資訊',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得訂單資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    // 修改訂單資料
    updateOrder() {
      this.isLoading = true;
      this.axios.put(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/order/${this.tempOrder.id}`, { data: this.tempOrder })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功更新訂單資訊',
            content: res.data.message,
          });
          this.$refs.oModal.closeModal();
          this.getOrders();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '更新產品資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    // 打開元件
    openModal(action, item) {
      this.tempOrder = { ...item };
      if (action === '檢視') {
        this.$refs.oModal.openModal();
      } else if (action === '刪除') {
        this.$refs.dModal.openModal();
      }
    },
    // 刪除單筆 or 全部訂單
    deleteOrder() {
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/order/${this.tempOrder.id}`;
      if (!this.tempOrder.id) {
        apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/orders/all`;
      }
      this.isLoading = true;
      this.axios.delete(apiUrl)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '刪除訂單',
            content: res.data.message,
          });
          this.$refs.dModal.closeModal();
          this.getOrders();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '刪除訂單失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<template>
  <div>
    <VueLoading :active="isLoading"></VueLoading>
    <MessageToast></MessageToast>
    <div class="text-end mt-4">
      <button class="btn btn-danger" @click="openModal('刪除')">
        刪除全部訂單
      </button>
    </div>
    <table class="table mt-4 align-middle">
      <thead>
        <tr>
          <th width="100" class="text-center">
            下單日期
          </th>
          <th width="100" class="text-center">訂單編號</th>
          <th width="120" class="text-center">
            訂購者
          </th>
          <th width="50" class="text-center">
            金額
          </th>
          <th width="100" class="text-center">
            訂單狀態
          </th>
          <th width="100" class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="text-center">
            <ul class="list-unstyled mb-0">
              <li class="mb-1">{{ $filters.AccurateDate(order.create_at) }}</li>
              <li class="text-muted">{{ $filters.AccurateTime(order.create_at) }}</li>
            </ul>
          </td>
          <td class="text-center">{{ order.id }}</td>
          <td class="text-center">
            {{ order.user.name }}
          </td>
          <td class="text-end">{{ order.total }}</td>
          <td class="text-center">
            <span :class="order.is_paid ? 'text-success' : 'text-danger'"
              >{{ order.is_paid ? '已付款' : '未付款' }}</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('檢視', order)"
              >
                檢視
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('刪除', order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pages" :get-data="getOrders"></PaginationComponent>
    <AdminOrderModal ref="oModal" :temp-order="tempOrder"
      @update-order="updateOrder"></AdminOrderModal>
    <AdminDelModal ref="dModal" :obj="obj" :item="tempOrder"
      @delete-item="deleteOrder"></AdminDelModal>
  </div>
</template>
