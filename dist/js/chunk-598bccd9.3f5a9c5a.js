(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-598bccd9"],{"1acb":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-text-field",{staticClass:"ml-3 mr-3",attrs:{label:"Search Courses",color:"accent"},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}}),n("v-btn",{staticClass:"addBtn mt-4 float-right"},[t._v("Add Course")])],1),n("v-row",t._l(t.filtered,(function(e){return n("v-col",{key:e.id,attrs:{cols:"12",sm:"6",md:"4",lg:"3",xl:"2"}},[n("v-card",{attrs:{elevation:"2",outlined:"",color:"secondary"}},[n("v-img",{attrs:{src:"https://via.placeholder.com/600x200/000/999/?text="+e.title,height:"200px"}}),n("v-item-group",{staticClass:"d-flex justify-space-between btnGroup pa-2"},[n("v-btn",{staticClass:"v-btn--outlined viewBtn",on:{click:function(n){return t.view(e)}}},[t._v("View")]),n("v-btn",{staticClass:"v-btn--outlined editBtn",on:{click:function(n){return t.edit(e)}}},[t._v("Edit")]),n("v-btn",{staticClass:"v-btn--outlined deleteBtn",on:{click:function(n){return t.del(e)}}},[t._v("Delete")])],1)],1)],1)})),1)],1)],1)},a=[],o=(n("4de4"),n("d3b7"),n("caad"),n("2532"),n("8647")),c={name:"CoursesIndex",components:{},data:function(){return{courses:[],searchQuery:""}},computed:{filtered:function(){var t=this;return this.courses.filter((function(e){return e.title.toLowerCase().includes(t.searchQuery.toLowerCase())}))}},mounted:function(){this.getData()},methods:{getData:function(){var t=this,e=localStorage.getItem("token");o["a"].get("courses",{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){console.log("getData() response: ",e.data.data),t.courses=e.data.data})).catch((function(t){return console.log("getData() error caught: ",t)}))},view:function(t){this.$router.push({name:"Course Viewer",params:{id:t.id}})},edit:function(t){this.$router.push({name:"Course Editor",params:{id:t.id}})},del:function(){}}},i=c,s=n("2877"),u=Object(s["a"])(i,r,a,!1,null,null,null);e["default"]=u.exports},2532:function(t,e,n){"use strict";var r=n("23e7"),a=n("e330"),o=n("5a34"),c=n("1d80"),i=n("577e"),s=n("ab13"),u=a("".indexOf);r({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~u(i(c(this)),i(o(t)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,n){var r=n("861d"),a=n("c6b6"),o=n("b622"),c=o("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==a(t))}},"5a34":function(t,e,n){var r=n("da84"),a=n("44e7"),o=r.TypeError;t.exports=function(t){if(a(t))throw o("The method doesn't accept regular expressions");return t}},ab13:function(t,e,n){var r=n("b622"),a=r("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[a]=!1,"/./"[t](e)}catch(r){}}return!1}},caad:function(t,e,n){"use strict";var r=n("23e7"),a=n("4d64").includes,o=n("44d2");r({target:"Array",proto:!0},{includes:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),o("includes")}}]);
//# sourceMappingURL=chunk-598bccd9.3f5a9c5a.js.map