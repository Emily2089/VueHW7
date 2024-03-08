// #region note：
// 1. 因為 modal 相關的方法 show() 和 hide() 會在各元件(如 AdminProductModal、AdminOrderModal 等等)中使用到
// 2. 因此將這些重複使用到的內容放在此 js 檔
// 3. 然後在需要使用這些內容的元件中使用 mixins 引入
// #endregion
import { Modal } from 'bootstrap';

export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
