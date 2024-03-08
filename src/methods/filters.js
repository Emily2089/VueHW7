// #region note：關於時間戳的轉換
// 1. 傳入的 time 是一個時間戳，需使用 new Date() 來建構日期。
// 2. new Date() 的參數須為毫秒數，因此將傳入的秒數 * 1000。
//
// 法1. 轉換成自定義的時間格式
// 1. 將建構好的日期存在 date 變數，之後就可搭配 getFullYear()、getMonth() 等方法來取得年月日等資訊。
// 2. 可以自己按喜歡的格式將這些資訊串接起來。
// 3. 用這種方法須注意，假設取得的月份是 1~9 月，除非有先做額外設定，不然取得的資料形式就真的只會是個位數，不會在前面補0。同理，日期也是 。
// 4. 另外，在取得月份時，他會從0開始算，所以1月對應的數字是0，2月對應1，以此類推。
// 資料參考：https://ithelp.ithome.com.tw/articles/10225167
// 資料參考：https://www.runoob.com/w3cnote/js-timestamp2date.html
//
// 例如. 取得年-月-日
// export const AccurateDate = (time) => {
//   const date = new Date(time * 1000);
//   const y = date.getFullYear();
//   const m = date.getMonth() + 1;
//   const d = date.getDate();
//   return `${y}-${m}-${d}`;
// };
// 例如. 取得時:分:秒
// export const AccurateTime = (time) => {
//   const date = new Date(time * 1000);
//   const h = date.getHours();
//   const m = date.getMinutes();
//   const s = date.getSeconds();
//   return `${h}:${m}:${s}`;
// };
//
// 法2. 轉換成 ISO 格式的字串
// 1. 將建構好的日期存在 date 變數，之後搭配 toISOString() 的方法來取得 ISO 格式的字串，他長得像這樣 YYYY-MM-DDTHH:mm:ss.sssZ 。
// 2. 取得 ISO格式字串後，可以再搭配 split() 方法，將這個字串按自己設的規則去分割成一個有序的列表。
// 3. 例如這邊輸入 date.split('T')，若將此印出應該會取得類似這樣的結果 Array ["2011-10-05", "14:48:00.000Z"]
// 4. 因此這邊輸入 date.split('T')[0] 就可獲得 年-月-日 的內容。
// 5. 輸入 date.split('T')[1].split('.')[0] 就可獲得 時:分:秒 的內容。
// 6. 使用這種方法須注意，它的時區是世界標準時間(UTC)，因此才會在時間的結尾有個Z表示，如果想要顯示台北時間的話，就不能用這種方法。
// #endregion

// #region note：時間戳的觀念
// 1. 可以把時間戳想像成時間的絕對值，不管在哪個時區，當下算出的時間戳都會是同樣的數值。
// 3. 時間戳的單位是秒。
// #endregion

// 取得年/月/日
export const AccurateDate = (time) => {
  const date = new Date(time * 1000);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m < 10) {
    m = `0${m}`;
  }
  if (d < 10) {
    d = `0${d}`;
  }
  return `${y}-${m}-${d}`;
};

// 取得時:分:秒
export const AccurateTime = (time) => {
  const date = new Date(time * 1000);
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${h}:${m}:${s}`;
};
