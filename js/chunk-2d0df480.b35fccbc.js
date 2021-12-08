(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0df480"],{"88f0":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{staticClass:"mt-10"},[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{color:"accent",label:"Name",readonly:""},model:{value:t.lecturer.name,callback:function(e){t.$set(t.lecturer,"name",e)},expression:"lecturer.name"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{color:"accent",label:"Lecturer",readonly:""},model:{value:t.lecturer.email,callback:function(e){t.$set(t.lecturer,"email",e)},expression:"lecturer.email"}})],1),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-text-field",{attrs:{color:"accent",label:"Phone",readonly:""},model:{value:t.lecturer.phone,callback:function(e){t.$set(t.lecturer,"phone",e)},expression:"lecturer.phone"}})],1),r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-textarea",{attrs:{color:"accent",label:"Address","auto-grow":"",readonly:""},model:{value:t.lecturer.address,callback:function(e){t.$set(t.lecturer,"address",e)},expression:"lecturer.address"}})],1)],1),r("h3",{staticClass:"ml-3 mb-5"},[t._v("Enrolments")]),r("v-row",{staticClass:"mb-4"},t._l(t.lecturer.enrolments,(function(e){return r("v-col",{key:e.id,attrs:{cols:"12",md:"6",lg:"4",xl:"3"}},[r("v-card",{attrs:{elevation:"3",shaped:""}},[r("v-card-title",[r("router-link",{staticClass:"accent--text",attrs:{to:{name:"Enrolment Viewer",params:{id:e.id}}}},[t._v(" "+t._s(e.course.title)+" ")])],1),r("v-card-subtitle",[t._v(t._s(e.status))])],1)],1)})),1),r("v-row",[r("v-spacer"),r("v-col",{attrs:{cols:"2",md:"2"}},[r("v-btn",{staticClass:"accent--text",attrs:{block:"",color:"black"},on:{click:function(e){return t.backToAll()}}},[t._v(" Lecturers ")])],1),r("v-spacer"),r("v-col",{attrs:{cols:"2",md:"2"}},[r("v-btn",{staticClass:"black--text",attrs:{block:"",color:"accent"},on:{click:function(e){return t.edit()}}},[t._v(" Edit ")])],1),r("v-spacer")],1)],1)},c=[],l=r("8647"),o={name:"LecturerView",components:{},data:function(){return{lecturer:{}}},mounted:function(){this.getData()},methods:{getData:function(){var t=this,e=localStorage.getItem("token");l["a"].get("lecturers/".concat(this.$route.params.id),{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){console.log("getData() response: ",e.data.data),t.lecturer=e.data.data})).catch((function(t){return console.log("getData() error caught: ",t)}))},backToAll:function(){this.$router.push({name:"All Lecturers"})},edit:function(){this.$router.push({name:"Lecturer Editor",params:{id:this.lecturer.id}})}}},s=o,n=r("2877"),u=Object(n["a"])(s,a,c,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0df480.b35fccbc.js.map