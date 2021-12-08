(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04918552"],{"99e7":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("v-form",[o("v-container",[o("v-row",[o("v-col",{attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{color:"accent",label:"Title",hint:"The course title",required:""},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),o("v-col",{attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{color:"accent",label:"Code",hint:"The course code",required:""},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1),o("v-col",{attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{color:"accent",label:"Level",hint:"The QQI level of the course",required:"",type:"number"},model:{value:e.form.level,callback:function(t){e.$set(e.form,"level",t)},expression:"form.level"}})],1),o("v-col",{attrs:{cols:"12",md:"6"}},[o("v-text-field",{attrs:{color:"accent",label:"Points Required",hint:"The points required to get into the course",required:"",type:"number"},model:{value:e.form.points,callback:function(t){e.$set(e.form,"points",t)},expression:"form.points"}})],1),o("v-col",{attrs:{cols:"12",md:"12"}},[o("v-textarea",{attrs:{color:"accent",label:"Description",hint:"The description of the course",required:""},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1)],1),o("v-row",[o("v-spacer"),o("v-col",{attrs:{cols:"2",md:"2"}},[o("v-btn",{staticClass:"black--text",attrs:{block:"",color:"accent"},on:{click:function(t){return e.submitForm()}}},[e._v(" Submit ")])],1),o("v-spacer"),o("v-col",{attrs:{cols:"2",md:"2"}},[o("v-btn",{staticClass:"accent--text",attrs:{block:"",color:"black"},on:{click:function(t){return e.cancelForm()}}},[e._v(" Cancel ")])],1),o("v-spacer")],1)],1)],1)},c=[],a=(o("a4d3"),o("e01a"),o("8647")),n={name:"CourseEdit",components:{},data:function(){return{form:{title:"",code:"",level:"",points:"",description:""}}},mounted:function(){this.getData()},methods:{getData:function(){var e=this,t=localStorage.getItem("token");a["a"].get("courses/".concat(this.$route.params.id),{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){console.log("getData() response: ",t.data.data);var o=t.data.data;e.form.title=o.title,e.form.description=o.description,e.form.code=o.code,e.form.points=o.points,e.form.level=o.level})).catch((function(e){return console.log("getData() error caught: ",e)}))},submitForm:function(){var e=this,t=localStorage.getItem("token");a["a"].put("courses/".concat(this.$route.params.id),this.form,{headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){console.log("submitForm() response: ",t.data.data),e.$router.push({name:"Course Viewer",params:{id:e.$route.params.id}})})).catch((function(e){console.log("submitForm() error message: ",e.response.data.message),console.log("All error data: ",e)}))},cancelForm:function(){this.$router.go(-1)}}},i=n,s=o("2877"),l=Object(s["a"])(i,r,c,!1,null,null,null);t["default"]=l.exports},e01a:function(e,t,o){"use strict";var r=o("23e7"),c=o("83ab"),a=o("da84"),n=o("e330"),i=o("1a2d"),s=o("1626"),l=o("3a9b"),u=o("577e"),d=o("9bf2").f,m=o("e893"),f=a.Symbol,v=f&&f.prototype;if(c&&s(f)&&(!("description"in v)||void 0!==f().description)){var p={},h=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:u(arguments[0]),t=l(v,this)?new f(e):void 0===e?f():f(e);return""===e&&(p[t]=!0),t};m(h,f),h.prototype=v,v.constructor=h;var b="Symbol(test)"==String(f("test")),g=n(v.toString),k=n(v.valueOf),x=/^Symbol\((.*)\)[^)]+$/,$=n("".replace),w=n("".slice);d(v,"description",{configurable:!0,get:function(){var e=k(this),t=g(e);if(i(p,e))return"";var o=b?w(t,7,-1):$(t,x,"$1");return""===o?void 0:o}}),r({global:!0,forced:!0},{Symbol:h})}}}]);
//# sourceMappingURL=chunk-04918552.b9c250a4.js.map