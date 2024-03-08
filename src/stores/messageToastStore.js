import { defineStore } from 'pinia';

export default defineStore('toastMessage', {
  state: () => ({
    messages: [],
  }),
  actions: {
    showToast() {
      // note：Array.prototype.shift() 會移除並回傳陣列的第一個元素。此方法會改變陣列的長度。
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    },
    closeToast(index) {
      this.messages.splice(index, 1);
    },
    pushMessage(msgObj) {
      // Q：為何需要先解構
      // A：因為 Vue 禁止修改 computed 的內容，computed 的內容預設是唯讀的。
      // 如果這邊直接將 msgObj push 到陣列中，然後再觸發另外兩個方法去移除陣列元素，這樣就會跳出警告
      const { style = 'success', title, content } = msgObj;
      this.messages.push({ style, title, content });
      this.showToast();
    },
  },
});
