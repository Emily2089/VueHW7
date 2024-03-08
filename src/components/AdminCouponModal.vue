<script>
import modalMixin from '@/methods/modalMixin';

export default {
  props: {
    tempCoupon: Object,
    is_new: Boolean,
  },
  data() {
    return {
      editCoupon: {},
      due_date: '',
    };
  },
  emits: ['update-coupon'],
  mixins: [modalMixin],
  watch: {
    // note：
    // 1. 當我點擊 "編輯" 或 "新增優惠券" 時就會使 tempCoupon 的值發生變化，觸發此函式。
    // 2 為了方便轉為時間戳，這邊不使用 $filters.AccurateDate() 來取得 年-月-日 的日期格式。
    // 3. 改成先取得 ISO 格式的字串，然後再轉換成時間戳。
    // 4. 這邊優惠券的時間只需取到日期即可，不需要精確的時間，所以加上[0]。
    tempCoupon() {
      this.editCoupon = this.tempCoupon;
      // const dateAndTime = new Date(this.editCoupon.due_date * 1000).toISOString();
      const dateAndTime = new Date(this.editCoupon.due_date * 1000).toISOString().split('T')[0];
      this.due_date = dateAndTime;
      // this.due_date = this.$filters.AccurateDate(this.editCoupon.due_date);
    },
    // note：
    // 1. 綁定 v-model="new_date"，這樣當這個值發生變化時就觸發此函式。
    // 2. due_date 的值會是一個 ISO 格式的字串，且只取前面 年-月-日 的部分。
    // 3. 使用 new Date(dateString) 來建立一個 Date 物件來指向某個時間點，它會基於世界標準時間（UTC） 1970 年 1 月 1 日開始的毫秒數值來儲存時間。
    // 4. 然後，因為時間戳的單位是秒，所以將取得的毫秒除以 1000 。
    due_date() {
      this.editCoupon.due_date = new Date(this.due_date) / 1000;
    },
  },
  mounted() {
    this.editCoupon = this.tempCoupon;
  },
};
</script>

<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
    aria-labelledby="couponModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="couponModalLabel">
            <span v-if="is_new">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title"
              v-model="editCoupon.title"  placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code"
              v-model="editCoupon.code"  placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
              v-model="this.due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price" min="0"
              v-model="editCoupon.percent" placeholder="請輸入折扣百分比 Ex.85折>85">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                v-model="editCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary">
            <span v-if="is_new" @click="$emit('update-coupon', tempCoupon)">新增優惠券</span>
            <span v-else @click="$emit('update-coupon', tempCoupon)">更新優惠券</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
