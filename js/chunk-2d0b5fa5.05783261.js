(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5fa5"],{"1acb":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-container",{attrs:{fluid:""}},[o("v-row",[o("v-text-field",{staticClass:"ml-3 mr-3",attrs:{label:"Search Courses",color:"accent"},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),o("v-btn",{staticClass:"addBtn mr-3 mt-4 float-right",on:{click:function(t){return e.add()}}},[e._v("Add")])],1),o("v-row",e._l(e.filtered,(function(t,a){return o("v-col",{key:t.id,attrs:{cols:"12",sm:"6",md:"4",lg:"3",xl:"2"}},[o("v-card",{attrs:{elevation:"2",outlined:"",color:"secondary"}},[o("v-img",{attrs:{src:"https://via.placeholder.com/600x200/000/999/?text="+t.title,height:"200px"}}),o("v-item-group",{staticClass:"d-flex justify-space-between btnGroup pa-2"},[o("v-btn",{staticClass:"v-btn--outlined viewBtn",on:{click:function(o){return e.view(t)}}},[e._v("View")]),o("v-btn",{staticClass:"v-btn--outlined editBtn",on:{click:function(o){return e.edit(t)}}},[e._v("Edit")]),o("v-btn",{staticClass:"v-btn--outlined deleteBtn",on:{click:function(o){return e.delDialog(t,a)}}},[e._v("Delete")])],1)],1)],1)})),1),o("v-row",{attrs:{justify:"center"}},[o("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("v-card",[o("v-card-title",{staticClass:"text-h5"},[e._v("Are you sure? 😬")]),o("v-card-text",[e._v("This will permanently delete the "+e._s(e.clickedCourse.title)+" course from the API...")]),o("v-card-actions",[o("v-spacer"),o("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" Go back! ")]),o("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:function(t){e.dialog=!1,e.del(e.clickedCourse,e.clickedIndex)}}},[e._v(" Delete it! ")])],1)],1)],1)],1)],1)},n=[],r=(o("4de4"),o("d3b7"),o("caad"),o("2532"),o("a434"),o("8647")),c={name:"CoursesIndex",components:{},data:function(){return{courses:[],searchQuery:"",dialog:!1,clickedCourse:{},clickedIndex:null}},computed:{filtered:function(){var e=this;return this.courses.filter((function(t){return t.title.toLowerCase().includes(e.searchQuery.toLowerCase())}))}},mounted:function(){this.getData()},methods:{getData:function(){var e=this,t=localStorage.getItem("token");r["a"].get("courses",{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){console.log("getData() response: ",t.data.data),e.courses=t.data.data})).catch((function(e){return console.log("getData() error caught: ",e)}))},view:function(e){this.$router.push({name:"Course Viewer",params:{id:e.id}})},edit:function(e){this.$router.push({name:"Course Editor",params:{id:e.id}})},delDialog:function(e,t){this.dialog=!this.dialog,this.clickedCourse=e,this.clickedIndex=t},del:function(e,t){var o=this;console.log("del() Course data: ",e),console.log("del() Index data: ",t);var a=localStorage.getItem("token");r["a"].delete("courses/".concat(e.id),{headers:{Authorization:"Bearer ".concat(a)}}).then((function(a){console.log("del() response: ",a.data.data),o.courses.splice(t,1),alert("Course ".concat(e.title," has been deleted successfully!"))})).catch((function(t){console.log("del() error caught: ",t),alert("Course ".concat(e.title," failed to be deleted."))}))},add:function(){this.$router.push({name:"Add Course"})}}},s=c,i=o("2877"),l=Object(i["a"])(s,a,n,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b5fa5.05783261.js.map