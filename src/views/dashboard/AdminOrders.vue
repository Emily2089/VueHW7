<script>
import PaginationComponent from '@/components/tools/PaginationComponent.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      orders: [],
      tempOrder: {
      },
      pages: {},
    };
  },
  components: {
    PaginationComponent,
  },
  methods: {
    // 取得後台訂單資料
    // pagination 物件中有幾個重要的 key
    // current_page、has_next、has_pre、total_pages
    getOrders(page = 1) {
      this.axios.get(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/orders?pages=${page}`)
        .then((res) => {
          this.orders = res.data.orders;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<template>
  <!-- <AdminProductModal ref="pModal" :temp-product="tempProduct" :update-data="updateData"
    :is_new="is_new"></AdminProductModal> -->
  <!-- <AdminDelProductModal ref="dModal" :temp-product="tempProduct" :delete-data="deleteData"
    ></AdminDelProductModal> -->
  <!-- <div class="text-end mt-4">
    這個欄位好像很適合放跳出 toast 的元件
  </div> -->
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120" class="text-center">
          下單日期
        </th>
        <th width="300" class="text-center">訂單編號</th>
        <th class="text-center">
          購買款項
        </th>
        <th width="80" class="text-center">
          金額
        </th>
        <th width="120" class="text-center">
          訂單狀態
        </th>
        <th width="120" class="text-center">
          付款日期
        </th>
        <th width="120" class="text-center">
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td class="text-center">{{ order.create_at }}</td>
        <td class="text-center">{{ order.id }}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="(item, key) in order.products" :key="'item' + key ">
            {{ item.product.title }} 數量：{{ item.qty }} {{ item.product.unit }}</li>
          </ul>
        </td>
        <td class="text-end">{{ order.total }}</td>
        <td class="text-center">
          <span :class="order.is_paid ? 'text-success' : 'none'"
            >{{ order.is_paid ? '已付款' : '未付款' }}</span>
        </td>
        <td class="text-center"></td>
        <td class="text-center">
          <div class="btn-group">
            <button type="button" class="btn btn-outline-primary btn-sm"
              >
              查看訂單
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm"
              >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationComponent class="flex-center" :pages="pages"
  :get-data="getOrders"></PaginationComponent>
</template>
