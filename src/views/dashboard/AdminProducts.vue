<script>
import PaginationComponent from '@/components/tools/PaginationComponent.vue';
import { mapActions } from 'pinia';
import messageToastStore from '@/stores/messageToastStore';
import MessageToast from '@/components/tools/MessageToast.vue';

import AdminProductModal from '@/components/AdminProductModal.vue';
import AdminDelModal from '@/components/AdminDelModal.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      categoryList: ['解謎', '角色扮演', '視覺小說', '休閒', '節奏'],
      tempProduct: {
        demoImg: [],
        features: [],
      },
      tempCategory: '',
      is_new: true,
      pages: {}, // 總頁數、目前頁碼位置、有無上下一頁、類別等資訊
      obj: 'product',
      isLoading: false,
      isFilter: false,
    };
  },
  components: {
    AdminProductModal,
    PaginationComponent,
    MessageToast,
    AdminDelModal,
  },
  methods: {
    ...mapActions(messageToastStore, ['pushMessage']),
    // 取得後台產品資料
    getData(page = 1) {
      this.isLoading = true;
      // note：路徑有 all 代表全部資料，沒有 all 代表是有分頁的。另外，根據文件說明，若是使用 "含分頁" 的路徑，須另外帶入參數 1. page 2. category
      // 參數 category 的夾帶範例： &category=解謎
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/products?page=${page}`;

      if (this.isFilter === true) {
        apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/products?category=${this.tempCategory}&page=${page}`;
      }

      this.axios.get(apiUrl)
        .then((res) => {
          console.log(apiUrl);
          this.products = res.data.products;
          this.pages = res.data.pagination;
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功取得產品資訊',
            content: res.data.message,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '取得產品資訊失敗',
            content: err.response.data.message,
          });
        });
    },
    // 打開 modal
    openModal(action, item) {
      if (action === '新增') {
        this.$refs.pModal.openModal();
        this.is_new = true;
        this.tempProduct = {
          demoImg: [],
          features: [],
        };
      } else if (action === '編輯') {
        this.$refs.pModal.openModal();
        this.is_new = false;
        this.tempProduct = { ...item };
      } else if (action === '刪除') {
        this.$refs.dModal.openModal();
        this.tempProduct = { ...item };
      }
    },
    updateData() {
      this.isLoading = true;
      // 新增產品資料
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/product`;
      let http = 'post';

      if (this.is_new === false) {
        // 編輯產品資料
        // note：當 is_new 的值為 false 時，代表要編輯資料，所以使用 put，apiUrl 須加上參數 id
        apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      this.axios[http](apiUrl, { data: this.tempProduct })
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功更新產品資訊',
            content: res.data.message,
          });
          this.$refs.pModal.closeModal();
          this.getData();
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
    // 刪除單筆資料
    deleteData() {
      this.isLoading = true;
      this.axios.delete(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'success',
            title: '成功刪除產品資訊',
            content: res.data.message,
          });
          this.$refs.dModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          this.isLoading = false;
          this.pushMessage({
            style: 'danger',
            title: '刪除產品資訊失敗',
            content: err.response.data.message,
          });
        });
    },
  },
  watch: {
    tempCategory() {
      if (this.tempCategory === '') {
        this.isFilter = false;
      }
      this.isFilter = true;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<template>
  <div>
    <VueLoading :active="isLoading"></VueLoading>
    <MessageToast></MessageToast>
    <div class="d-flex justify-content-between my-4">
      <div class="text-start">
        <select class="form-select" aria-label="Default select example"
          v-model="this.tempCategory" @change="getData(page, this.tempCategory)">
          <option selected :value="''">全部商品</option>
          <option :value="category" v-for="(category, key) in this.categoryList"
            :key="'category2911' + key">{{ category }}</option>
        </select>
      </div>
      <div class="text-end">
        <button class="btn btn-primary" @click="openModal('新增')">
          建立新的產品
        </button>
      </div>
    </div>
    <table class="table mt-4 align-middle">
      <thead>
        <tr>
          <th width="120" class="text-center">
            分類
          </th>
          <th class="text-center">產品名稱</th>
          <th width="80" class="text-center">
            原價
          </th>
          <th width="80" class="text-center">
            售價
          </th>
          <th width="120" class="text-center">
            是否啟用
          </th>
          <th width="120" class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td class="text-center">
            <span :class="product.is_enabled ? 'text-success' : 'none'"
              >{{ product.is_enabled ? '啟用' : '' }}</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('編輯', product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('刪除', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationComponent :pages="pages" :get-data="getData"></PaginationComponent>
    <AdminProductModal ref="pModal" :temp-product="tempProduct" @update-data="updateData"
    :is_new="is_new"></AdminProductModal>
    <AdminDelModal ref="dModal" :obj="obj" :item="tempProduct"
      @delete-item="deleteData"></AdminDelModal>
  </div>
</template>
