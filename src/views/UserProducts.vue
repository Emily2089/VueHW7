<script>
import UserProductModal from '../components/UserProductModal.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      status: {
        addToCartLoading: '',
        cartQtyLoading: '',
      },
      carts: {
        carts: {},
        total: 0,
        final_total: 0,
      },
    };
  },
  components: {
    UserProductModal,
  },
  methods: {
    getProducts() {
      this.axios.get(`${VITE_API_URL}/api/${VITE_API_NAME}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => alert(err.response.data.message));
    },
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userModal.open();
    },
    addToCart(id, qty = 1) {
      const order = {
        product_id: id,
        qty,
      };
      this.status.addToCartLoading = id;
      this.axios.post(`${VITE_API_URL}/api/${VITE_API_NAME}/cart`, { data: order })
        .then(() => {
          // this.getCart();
          this.status.addToCartLoading = '';
          this.$refs.userModal.close();
        })
        .catch((err) => alert(err.response.data.message));
    },
  },
  mounted() {
    this.getProducts();
    // this.getCart();
  },
};
</script>

<template>
  <h1>產品列表</h1>
  <UserProductModal :temp-product="tempProduct" :add-to-cart="addToCart" ref="userModal"
    ></UserProductModal>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div style="height: 100px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${ product.mainImg })` }">
          </div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <div class="h5" v-if="product.origin_price === product.price">{{ product.price }} 元</div>
          <div v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5 text-danger">現在只要 {{ product.price }} 元</div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="openModal(product)">
              <i class="fas fa-spinner fa-pulse"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger"
              :disabled="product.id === status.addToCartLoading" @click="addToCart(product.id)">
              <span v-if="product.id === status.addToCartLoading"
                class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <i class="fas fa-spinner fa-pulse"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
