import{_ as r,o as n,c as i,a,l,h as o,F as c,e as g,t as _}from"./index-DIGYjml1.js";const d={props:{pages:Object,getData:Function}},p={"aria-label":"Page navigation example"},u={class:"pagination"},h=a("span",{"aria-hidden":"true"},"«",-1),m=[h],k=["onClick"],v=a("span",{"aria-hidden":"true"},"»",-1),f=[v];function b(x,s,e,C,D,P){return n(),i("nav",p,[a("ul",u,[a("li",{class:l(["page-item",{disabled:!e.pages.has_pre}])},[a("a",{class:"page-link",href:"",onClick:s[0]||(s[0]=o(t=>e.getData(e.pages.current_page-1),["prevent"])),"aria-label":"Previous"},m)],2),(n(!0),i(c,null,g(e.pages.total_pages,t=>(n(),i("li",{class:l(["page-item",{active:t===e.pages.current_page}]),key:"page"+t},[a("a",{class:"page-link",href:"",onClick:o(B=>e.getData(t),["prevent"])},_(t),9,k)],2))),128)),a("li",{class:l(["page-item",{disabled:!e.pages.has_next}])},[a("a",{class:"page-link",href:"",onClick:s[1]||(s[1]=o(t=>e.getData(e.pages.current_page+1),["prevent"])),"aria-label":"Next"},f)],2)])])}const y=r(d,[["render",b]]);export{y as P};