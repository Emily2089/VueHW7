<script>
import PaginationComponent from '@/components/tools/PaginationComponent.vue';
import AdminProductModal from '@/components/AdminProductModal.vue';
import AdminDelProductModal from '@/components/AdminDelProductModal.vue';

const { VITE_API_URL, VITE_API_NAME } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        demoImg: [],
        features: [],
      },
      // note：建立屬性 is_new 來切換"新增"和"編輯"的狀態
      is_new: true,
      productModal: '',
      delProductModal: '',
      // note：根據 API 文件顯示，使用路徑 /v2/api/{api_path}/admin/products ，
      // 連線成功後所取得的結果中會有一個 pagination 物件，裡面會有總頁數、目前頁碼位置
      // 、有無上一頁、有無下一頁、類別為何的資訊，預計將這些資料取出存放在這個 page 物件。
      pages: {},
    };
  },
  components: {
    AdminProductModal,
    AdminDelProductModal,
    PaginationComponent,
  },
  methods: {
    // 取得後台產品資料
    getData(page = 1) {
      // note：路徑有 all 代表全部資料，沒有 all 代表是有分頁的。另外，根據文件說明，若是使用 "含分頁" 的路徑，須另外帶入參數 1. page 2. category
      this.axios.get(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 新增產品
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
      // 新增資料
      let apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/product`;
      let http = 'post';

      if (this.is_new === false) {
        // 編輯資料
        // note：當 is_new 的值為 false 時，代表要編輯資料，所以使用 put，apiUrl 須加上參數 id
        apiUrl = `${VITE_API_URL}/api/${VITE_API_NAME}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      this.axios[http](apiUrl, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$refs.pModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 刪除資料
    deleteData() {
      this.axios.delete(`${VITE_API_URL}/api/${VITE_API_NAME}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.dModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<template>
  <div>
    <AdminProductModal ref="pModal" :temp-product="tempProduct" :update-data="updateData"
    :is_new="is_new"></AdminProductModal>
    <AdminDelProductModal ref="dModal" :temp-product="tempProduct" :delete-data="deleteData"
      ></AdminDelProductModal>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('新增')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
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
              >{{ product.is_enabled ? '啟用' : '未啟用' }}</span>
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
  </div>
</template>
