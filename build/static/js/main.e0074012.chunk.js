(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(14),a=t.n(r),u=(t(19),t(3)),o=t(0),s=function(e){var n=e.searchHandle;return Object(o.jsxs)(o.Fragment,{children:["filter show with ",Object(o.jsx)("input",{type:"text",onChange:n})]})},i=function(e){var n=e.message,t=Object(c.useState)(!0),r=Object(u.a)(t,2),a=r[0],s=r[1];return Object(c.useEffect)((function(){if(null===n[0]||""===n[0])return null;s(!0);var e=setTimeout((function(){s(!1)}),3e3);return function(){clearTimeout(e)}}),[n]),a?Object(o.jsx)("div",{className:n[1],children:n[0]}):null},j=function(e){var n=e.submitHandle,t=e.nameChange,c=e.numberChange;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h3",{children:"add a new"}),Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{type:"text",onChange:t})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{type:"text",onChange:c})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{children:"add"})})]})]})},b=t(4),d=t.n(b),h="https://sheltered-gorge-43407.herokuapp.com/api/persons",l=function(e){var n=e.person;return Object(o.jsx)("div",{children:Object(o.jsxs)("p",{children:[n.name," ",n.number," ",Object(o.jsx)("button",{onClick:function(){var e;window.confirm("Delete ".concat(n.name))&&(e=n.id,d.a.delete("".concat(h,"/").concat(e)))},children:"delete"})]})})},m=function(e){var n=e.persons;return Object(o.jsx)(o.Fragment,{children:n.map((function(e){return Object(o.jsx)("div",{children:Object(o.jsx)(l,{person:e})},e.name)}))})},f=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),b=Object(u.a)(a,2),l=b[0],f=b[1],O=Object(c.useState)(""),x=Object(u.a)(O,2),p=x[0],v=x[1],g=Object(c.useState)(""),C=Object(u.a)(g,2),w=C[0],k=C[1],S=Object(c.useState)([]),y=Object(u.a)(S,2),E=y[0],H=y[1];Object(c.useEffect)((function(){d.a.get(h).then((function(e){var n=e.data;return r(n)}))}),[t]);var F=[];return t.length>0&&(F=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}))),Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(i,{message:E}),Object(o.jsx)(s,{searchHandle:function(e){k(e.target.value)}}),Object(o.jsx)(j,{submitHandle:function(e){e.preventDefault();var n,c=t.filter((function(e){return e.name===l}));if(c.length>0&&c[0].number===p)return alert("".concat(l," is already added to fonebook"));c.length>0&&c[0].number!==p?(n={id:c[0].id,name:l,number:p},d.a.put("".concat(h,"/").concat(n.id),n).then((function(e){return e.data})).catch((function(e){return e}))).then((function(e){H(["Edited ".concat(e.name),"success"])})):function(e){var n=e.name,t=e.number;return d.a.post(h,{name:n,number:t}).then((function(e){return e.data}))}({name:l,number:p}).then((function(e){H(["Added ".concat(e.name),"success"])})).catch((function(e){console.log(e)}))},nameChange:function(e){f(e.target.value)},numberChange:function(e){v(e.target.value)}}),Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)(m,{persons:F})]})};a.a.render(Object(o.jsx)(f,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.e0074012.chunk.js.map