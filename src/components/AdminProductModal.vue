<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    tempProduct: Object,
    updateData: Function,
    is_new: Boolean,
  },
  data() {
    return {
      productModal: '',
      editProduct: {},
    };
  },
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
  },
  watch: {
    tempProduct() {
      // note：tempProduct 的值會一直發生變化，像是新增產品或要對特定產品進行編輯時，
      // 因此，使用 watch 來監聽這個變數，每次它發生變化時，就將這新的值放在 editProduct 中
      this.editProduct = this.tempProduct;
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal, { backdrop: 'static' });
    // note：因為不能直接使用 v-model 去修改傳入的值 tempProduct，
    // 因此先將傳入的值放在 editProduct ，然後再去做修改
    this.editProduct = this.tempProduct;
  },
};
</script>

<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1"
    aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="is_new">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="mainImg" class="form-label">主要圖片</label>
                  <!-- note：這邊的 v-model="tempProduct.mainImg" 會報錯是因為 ESLint 禁止修改傳入的值，
                    因此在 data 新增變數 editProduct -->
                  <input type="text" id="mainImg" class="form-control" placeholder="請輸入圖片連結"
                    v-model="editProduct.mainImg">
                </div>
                <img class="img-fluid" :src="editProduct.mainImg" alt="">
              </div>
              <h3>多圖新增</h3>
              <!-- note： Array.isArray() 可用來確認傳入的內容是否為一個陣列-->
              <template v-if="Array.isArray(editProduct.demoImg)">
                <div class="mb-3">
                  <div v-for="(image, key) in editProduct.demoImg" :key="key + 1912" class="mb-3">
                    <div class="mb-3">
                      <label :for="'demoImg'+key" class="form-label">圖片網址</label>
                      <input type="text" :id="'demoImg'+key" class="form-control"
                        placeholder="請輸入圖片連結" v-model="editProduct.demoImg[key]">
                    </div>
                    <img class="img-fluid" :src="image" alt="">
                  </div>
                  <!-- note：跳出視窗後，因為 tempProduct 的 demoImg 仍是空陣列，所以 !tempProduct.demoImg.length 的
                      結果為 true，因此顯示 "新增圖片" 的按鈕。第一次按下 "新增圖片" 後，會在 demoImg 產生一個第0筆資
                      料其 value 為空字串，等輸入文字後，透過 v-model 將輸入的文字綁定進去，第0筆資料就完成了，
                      有 key 有 value，因此 tempProduct.demoImg[tempProduct.demoImg.length - 1] 就會存在，
                      結果為 true -->
                  <template v-if="!editProduct.demoImg.length ||
                    editProduct.demoImg[editProduct.demoImg.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="editProduct.demoImg.push('')">
                      新增圖片
                    </button>
                  </template>
                  <template v-else>
                    <!-- note：Array.prototype.pop() 會移除並回傳陣列的最後一個元素。此方法會改變陣列的長度。 -->
                    <button class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="editProduct.demoImg.pop()">
                      刪除圖片
                    </button>
                  </template>
                </div>
              </template>
              <div v-else>
                <button class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="editProduct.demoImg.pop()">
                  刪除圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model="editProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="editProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                    v-model="editProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control"
                    placeholder="請輸入原價" v-model.number="editProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model.number="editProduct.price">
                </div>
              </div>

              <div class="mb-4">
                <label for="intro" class="form-label">遊戲簡介</label>
                <textarea id="intro" type="text" class="form-control"
                  placeholder="請輸入產品描述" v-model="editProduct.intro">
                </textarea>
              </div>

              <div class="mb-4">
                <h5>遊戲特色</h5>
                <!-- note：ESLint 規定 template 標籤不可同時使用 v-if 和 class 屬性，因此新增一個 div 在 template 內層 -->
                <template v-if="Array.isArray(editProduct.features)">
                  <div class="mb-3">
                    <div v-for="(feature, key) in editProduct.features" :key="key + 2841"
                      class="mb-3">
                      <label :for="'feature'+key" class="form-label">特色 {{ key+1 }}</label>
                      <textarea :id="'feature'+key" type="text" class="form-control"
                        placeholder="請輸入說明內容" v-model="editProduct.features[key]">
                      </textarea>
                    </div>
                    <template v-if="!editProduct.features.length ||
                      editProduct.features[editProduct.features.length -1]">
                      <button class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="editProduct.features.push('')">新增遊戲特色</button>
                    </template>
                    <template v-else>
                      <button class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="editProduct.features.pop()">刪除遊戲特色</button>
                    </template>
                  </div>
                </template>
                <template v-else>
                  <button class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="editProduct.features.pop()">
                    刪除遊戲特色
                  </button>
                </template>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="true"
                    :false-value="false" v-model="editProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateData">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
