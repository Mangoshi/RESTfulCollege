(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1584c6fa"],{"1acb":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-text-field",{staticClass:"ml-3 mr-3",attrs:{label:"Search Courses",color:"accent"},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),r("v-btn",{staticClass:"addBtn mt-4 float-right",on:{click:function(t){return e.add()}}},[e._v("Add")])],1),r("v-row",e._l(e.filtered,(function(t,n){return r("v-col",{key:t.id,attrs:{cols:"12",sm:"6",md:"4",lg:"3",xl:"2"}},[r("v-card",{attrs:{elevation:"2",outlined:"",color:"secondary"}},[r("v-img",{attrs:{src:"https://via.placeholder.com/600x200/000/999/?text="+t.title,height:"200px"}}),r("v-item-group",{staticClass:"d-flex justify-space-between btnGroup pa-2"},[r("v-btn",{staticClass:"v-btn--outlined viewBtn",on:{click:function(r){return e.view(t)}}},[e._v("View")]),r("v-btn",{staticClass:"v-btn--outlined editBtn",on:{click:function(r){return e.edit(t)}}},[e._v("Edit")]),r("v-btn",{staticClass:"v-btn--outlined deleteBtn",on:{click:function(r){return e.delDialog(t,n)}}},[e._v("Delete")])],1)],1)],1)})),1),r("v-row",{attrs:{justify:"center"}},[r("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[r("v-card",[r("v-card-title",{staticClass:"text-h5"},[e._v("Are you sure? 😬")]),r("v-card-text",[e._v("This will permanently delete the "+e._s(e.clickedCourse.title)+" course from the API...")]),r("v-card-actions",[r("v-spacer"),r("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" Go back! ")]),r("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(t){e.dialog=!1,e.del(e.clickedCourse,e.clickedIndex)}}},[e._v(" Delete it! ")])],1)],1)],1)],1)],1)},o=[],a=(r("4de4"),r("d3b7"),r("caad"),r("2532"),r("a434"),r("8647")),c={name:"CoursesIndex",components:{},data:function(){return{courses:[],searchQuery:"",dialog:!1,clickedCourse:{},clickedIndex:null}},computed:{filtered:function(){var e=this;return this.courses.filter((function(t){return t.title.toLowerCase().includes(e.searchQuery.toLowerCase())}))}},mounted:function(){this.getData()},methods:{getData:function(){var e=this,t=localStorage.getItem("token");a["a"].get("courses",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){console.log("getData() response: ",t.data.data),e.courses=t.data.data})).catch((function(e){return console.log("getData() error caught: ",e)}))},view:function(e){this.$router.push({name:"Course Viewer",params:{id:e.id}})},edit:function(e){this.$router.push({name:"Course Editor",params:{id:e.id}})},delDialog:function(e,t){this.dialog=!this.dialog,this.clickedCourse=e,this.clickedIndex=t},del:function(e,t){var r=this;console.log("del() Course data: ",e),console.log("del() Index data: ",t);var n=localStorage.getItem("token");a["a"].delete("courses/".concat(e.id),{headers:{Authorization:"Bearer ".concat(n)}}).then((function(n){console.log("del() response: ",n.data.data),r.courses.splice(t,1),alert("Course ".concat(e.title," has been deleted successfully!"))})).catch((function(t){console.log("del() error caught: ",t),alert("Course ".concat(e.title," failed to be deleted."))}))},add:function(){this.$router.push({name:"Add Course"})}}},i=c,s=r("2877"),l=Object(s["a"])(i,n,o,!1,null,null,null);t["default"]=l.exports},2532:function(e,t,r){"use strict";var n=r("23e7"),o=r("e330"),a=r("5a34"),c=r("1d80"),i=r("577e"),s=r("ab13"),l=o("".indexOf);n({target:"String",proto:!0,forced:!s("includes")},{includes:function(e){return!!~l(i(c(this)),i(a(e)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(e,t,r){var n=r("861d"),o=r("c6b6"),a=r("b622"),c=a("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[c])?!!t:"RegExp"==o(e))}},"5a34":function(e,t,r){var n=r("da84"),o=r("44e7"),a=n.TypeError;e.exports=function(e){if(o(e))throw a("The method doesn't accept regular expressions");return e}},a434:function(e,t,r){"use strict";var n=r("23e7"),o=r("da84"),a=r("23cb"),c=r("5926"),i=r("07fa"),s=r("7b0b"),l=r("65f0"),d=r("8418"),u=r("1dde"),f=u("splice"),h=o.TypeError,v=Math.max,g=Math.min,p=9007199254740991,m="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f},{splice:function(e,t){var r,n,o,u,f,b,x=s(this),k=i(x),w=a(e,k),C=arguments.length;if(0===C?r=n=0:1===C?(r=0,n=k-w):(r=C-2,n=g(v(c(t),0),k-w)),k+r-n>p)throw h(m);for(o=l(x,n),u=0;u<n;u++)f=w+u,f in x&&d(o,u,x[f]);if(o.length=n,r<n){for(u=w;u<k-n;u++)f=u+n,b=u+r,f in x?x[b]=x[f]:delete x[b];for(u=k;u>k-n+r;u--)delete x[u-1]}else if(r>n)for(u=k-n;u>w;u--)f=u+n-1,b=u+r-1,f in x?x[b]=x[f]:delete x[b];for(u=0;u<r;u++)x[u+w]=arguments[u+2];return x.length=k-n+r,o}})},ab13:function(e,t,r){var n=r("b622"),o=n("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[o]=!1,"/./"[e](t)}catch(n){}}return!1}},caad:function(e,t,r){"use strict";var n=r("23e7"),o=r("4d64").includes,a=r("44d2");n({target:"Array",proto:!0},{includes:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),a("includes")}}]);
//# sourceMappingURL=chunk-1584c6fa.510e44cf.js.map