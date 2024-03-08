import{m as k,P as $,A}from"./AdminDelModal-CfsCCkbR.js";import{_ as p,o as n,c as o,a as t,t as d,g as L,F as g,e as b,f as C,j as D,m as w,r as _,b as h,k as V}from"./index-DAU5l-VP.js";import{M as E,m as I}from"./MessageToast-CAALy9c9.js";import"./bootstrap.esm-Ceob_0pG.js";const T={props:{tempOrder:Object},data(){return{editOrder:{}}},emits:["update-order"],mixins:[k],watch:{tempOrder(){this.editOrder=this.tempOrder}},mounted(){this.editOrder=this.tempOrder}},P={class:"modal fade",id:"orderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},j={class:"modal-dialog modal-xl",role:"document"},U={class:"modal-content border-0"},N=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),R={class:"modal-body"},S={class:"row"},B={class:"col-md-4"},F=t("h3",null,"用戶資料",-1),q={class:"table"},z={key:0},H=t("th",{style:{width:"100px"}},"姓名",-1),W=t("th",null,"Email",-1),G=t("th",null,"電話",-1),J=t("th",null,"地址",-1),K={class:"col-md-8"},Q=t("h3",null,"訂單細節",-1),X={class:"table"},Y=t("th",{style:{width:"100px"}},"訂單編號",-1),Z=t("th",null,"下單時間",-1),tt={class:"me-3"},et={class:"text-muted"},st=t("th",null,"付款時間",-1),dt={key:0},at={key:1},nt=t("th",null,"付款狀態",-1),ot={key:0,class:"text-success"},lt={key:1,class:"text-danger"},it=t("th",null,"總金額",-1),rt=t("h3",null,"選購商品",-1),ct={class:"table"},_t=t("thead",null,[t("tr")],-1),ht={class:"text-end"},ut={class:"d-flex justify-content-end"},mt={class:"form-check"},pt={class:"form-check-label",for:"flexCheckDefault"},gt={key:0,class:"text-success"},bt={key:1,class:"text-danger"},ft={class:"modal-footer"},Ot=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function xt(e,s,a,f,i,c){return n(),o("div",P,[t("div",j,[t("div",U,[N,t("div",R,[t("div",S,[t("div",B,[F,t("table",q,[a.tempOrder.user?(n(),o("tbody",z,[t("tr",null,[H,t("td",null,d(a.tempOrder.user.name),1)]),t("tr",null,[W,t("td",null,d(a.tempOrder.user.email),1)]),t("tr",null,[G,t("td",null,d(a.tempOrder.user.tel),1)]),t("tr",null,[J,t("td",null,d(a.tempOrder.user.address),1)])])):L("",!0)])]),t("div",K,[Q,t("table",X,[t("tbody",null,[t("tr",null,[Y,t("td",null,d(a.tempOrder.id),1)]),t("tr",null,[Z,t("td",null,[t("span",tt,d(e.$filters.AccurateDate(a.tempOrder.create_at)),1),t("span",et,d(e.$filters.AccurateTime(a.tempOrder.create_at)),1)])]),t("tr",null,[st,t("td",null,[a.tempOrder.paid_date?(n(),o("span",dt,d(e.$filters.AccurateDate(a.tempOrder.paid_date)),1)):(n(),o("span",at,"時間不正確"))])]),t("tr",null,[nt,t("td",null,[a.tempOrder.is_paid?(n(),o("strong",ot,"已付款")):(n(),o("span",lt,"尚未付款"))])]),t("tr",null,[it,t("td",null,d(a.tempOrder.total),1)])])]),rt,t("table",ct,[_t,t("tbody",null,[(n(!0),o(g,null,b(a.tempOrder.products,r=>(n(),o("tr",{key:r.id},[t("th",null,d(r.product.title),1),t("td",null,d(r.qty)+" / "+d(r.product.unit),1),t("td",ht,d(r.final_total),1)]))),128))])]),t("div",ut,[t("div",mt,[C(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":s[0]||(s[0]=r=>i.editOrder.is_paid=r)},null,512),[[D,i.editOrder.is_paid]]),t("label",pt,[i.editOrder.is_paid?(n(),o("span",gt,"已付款")):(n(),o("span",bt,"未付款"))])])])])])]),t("div",ft,[Ot,t("button",{type:"button",class:"btn btn-primary",onClick:s[1]||(s[1]=r=>e.$emit("update-order",a.tempOrder))}," 修改付款狀態 ")])])])],512)}const Mt=p(T,[["render",xt]]);var yt={VITE_API_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_NAME:"emily-apitest",BASE_URL:"/VueHW7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API_URL:u,VITE_API_NAME:m}=yt,vt={data(){return{orders:[],tempOrder:{},pages:{},obj:"order",isLoading:!1}},components:{PaginationComponent:$,AdminOrderModal:Mt,MessageToast:E,AdminDelModal:A},methods:{...w(I,["pushMessage"]),getOrders(e=1){this.isLoading=!0,this.axios.get(`${u}/api/${m}/admin/orders?page=${e}`).then(s=>{this.orders=s.data.orders,this.pages=s.data.pagination,this.isLoading=!1,this.pushMessage({style:"success",title:"成功取得訂單資訊",content:s.data.message})}).catch(s=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"取得訂單資訊失敗",content:s.response.data.message})})},updateOrder(){this.isLoading=!0,this.axios.put(`${u}/api/${m}/admin/order/${this.tempOrder.id}`,{data:this.tempOrder}).then(e=>{this.isLoading=!1,this.pushMessage({style:"success",title:"成功更新訂單資訊",content:e.data.message}),this.$refs.oModal.closeModal(),this.getOrders()}).catch(e=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"更新產品資訊失敗",content:e.response.data.message})})},openModal(e,s){this.tempOrder={...s},e==="檢視"?this.$refs.oModal.openModal():e==="刪除"&&this.$refs.dModal.openModal()},deleteOrder(){let e=`${u}/api/${m}/admin/order/${this.tempOrder.id}`;this.tempOrder.id||(e=`${u}/api/${m}/admin/orders/all`),this.isLoading=!0,this.axios.delete(e).then(s=>{this.isLoading=!1,this.pushMessage({style:"success",title:"刪除訂單",content:s.data.message}),this.$refs.dModal.closeModal(),this.getOrders()}).catch(s=>{this.isLoading=!1,this.pushMessage({style:"danger",title:"刪除訂單失敗",content:s.response.data.message})})}},mounted(){this.getOrders()}},kt={class:"text-end mt-4"},$t={class:"table mt-4 align-middle"},At=t("thead",null,[t("tr",null,[t("th",{width:"100",class:"text-center"}," 下單日期 "),t("th",{width:"100",class:"text-center"},"訂單編號"),t("th",{width:"120",class:"text-center"}," 訂購者 "),t("th",{width:"50",class:"text-center"}," 金額 "),t("th",{width:"100",class:"text-center"}," 訂單狀態 "),t("th",{width:"100",class:"text-center"}," 付款日期 "),t("th",{width:"100",class:"text-center"}," 編輯 ")])],-1),Lt={class:"text-center"},Ct={class:"list-unstyled mb-0"},Dt={class:"mb-1"},wt={class:"text-muted"},Vt={class:"text-center"},Et={class:"text-center"},It={class:"text-end"},Tt={class:"text-center"},Pt=t("td",{class:"text-center"},null,-1),jt={class:"text-center"},Ut={class:"btn-group"},Nt=["onClick"],Rt=["onClick"];function St(e,s,a,f,i,c){const r=_("VueLoading"),O=_("MessageToast"),x=_("PaginationComponent"),M=_("AdminOrderModal"),y=_("AdminDelModal");return n(),o("div",null,[h(r,{active:i.isLoading},null,8,["active"]),h(O),t("div",kt,[t("button",{class:"btn btn-danger",onClick:s[0]||(s[0]=l=>c.openModal("刪除"))}," 刪除全部訂單 ")]),t("table",$t,[At,t("tbody",null,[(n(!0),o(g,null,b(i.orders,l=>(n(),o("tr",{key:l.id},[t("td",Lt,[t("ul",Ct,[t("li",Dt,d(e.$filters.AccurateDate(l.create_at)),1),t("li",wt,d(e.$filters.AccurateTime(l.create_at)),1)])]),t("td",Vt,d(l.id),1),t("td",Et,d(l.user.name),1),t("td",It,d(l.total),1),t("td",Tt,[t("span",{class:V(l.is_paid?"text-success":"text-danger")},d(l.is_paid?"已付款":"未付款"),3)]),Pt,t("td",jt,[t("div",Ut,[t("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:v=>c.openModal("檢視",l)}," 檢視 ",8,Nt),t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:v=>c.openModal("刪除",l)}," 刪除 ",8,Rt)])])]))),128))])]),h(x,{pages:i.pages,"get-data":c.getOrders},null,8,["pages","get-data"]),h(M,{ref:"oModal","temp-order":i.tempOrder,onUpdateOrder:c.updateOrder},null,8,["temp-order","onUpdateOrder"]),h(y,{ref:"dModal",obj:i.obj,item:i.tempOrder,onDeleteItem:c.deleteOrder},null,8,["obj","item","onDeleteItem"])])}const Ht=p(vt,[["render",St]]);export{Ht as default};