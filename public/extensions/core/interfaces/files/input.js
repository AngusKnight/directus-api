parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"QdEO":[function(require,module,exports) {
module.exports={props:{name:{type:String,required:!0},value:{type:null,default:null},type:{type:String,required:!0},length:{type:[String,Number],default:null},readonly:{type:Boolean,default:!1},required:{type:Boolean,default:!1},options:{type:Object,default:function(){return{}}},newItem:{type:Boolean,default:!1},relation:{type:Object,default:null},fields:{type:Object,default:null},values:{type:Object,default:null}}};
},{}],"xPq6":[function(require,module,exports) {
"use strict";function t(t){return"application/pdf"===t?"picture_as_pdf":t.startsWith("application")?"insert_drive_file":t.startsWith("image")?"crop_original":t.startsWith("video")?"videocam":t.startsWith("code")?"code":t.startsWith("audio")?"audiotrack":"save"}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=t;
},{}],"WbR1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("../../../mixins/interface")),t=n(require("./get-icon")),i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(e){return s(e)||l(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function s(e){if(Array.isArray(e)){for(var t=0,i=new Array(e.length);t<e.length;t++)i[t]=e[t];return i}}var a={mixins:[e.default],data:function(){return{newFile:!1,existing:!1,editExisting:!1,selectionSaving:!1,viewOptionsOverride:{},viewTypeOverride:null,viewQueryOverride:{},filtersOverride:[],editThisFile:{},edits:{}}},computed:{junctionFieldName:function(){return this.relation.junction.field_many.field},relatedCollectionFields:function(){return console.log(this.relation.junction.collection_one.fields),this.relation.junction.collection_one.fields},junctionPrimaryKey:function(){return this.$lodash.find(this.relation.collection_many.fields,{primary_key:!0}).field},files:function(){var e=this;return this.value?this.value.filter(function(e){return!e.$delete}).map(function(i){var n=i[e.junctionFieldName];return{id:n[e.relatedPrimaryKeyField.field],title:n.title,subtitle:n.filename.split(".").pop()+" • "+e.$d(new Date(n.uploaded_on),"short"),src:n.type&&n.type.startsWith("image")?n.data.thumbnails[0].url:null,icon:n.type&&!n.type.startsWith("image")?(0,t.default)(n.type):null,href:n.type&&"application/pdf"===n.type?n.data.full_url:null}}):[]},relatedPrimaryKeyField:function(){return this.$lodash.find(this.relation.junction.collection_one.fields,{primary_key:!0})},selection:function(){var e=this;return this.value?this.value.filter(function(e){return!e.$delete}).map(function(t){return t[e.junctionFieldName]}):[]},viewOptions:function(){var e=this.options.viewOptions;return i({},e,this.viewOptionsOverride)},viewType:function(){return this.viewTypeOverride?this.viewTypeOverride:this.options.viewType},viewQuery:function(){var e=this.options.viewQuery;return i({},e,this.viewQueryOverride)},filters:function(){return[].concat(o(this.options.filters),o(this.fileTypeFilters),o(this.filtersOverride))},fileTypeFilters:function(){return!this.options.accept||this.filtersOverride.length>0||this.options.filters.some(function(e){return"type"===e.field})?[]:[{field:"type",operator:"in",value:this.options.accept.trim().split(/,\s*/)}]}},methods:{saveUpload:function(e){this.$emit("input",[].concat(o(this.value),[r({},this.junctionFieldName,e.data)]))},selectItems:function(e){var t=this,n=this.value||[],u=n.map(function(e){return e[t.junctionFieldName]}),l=this.relatedPrimaryKeyField.field,s=u.map(function(e){return e[l]}),a=e.map(function(e){return e[l]}),c=s.filter(function(e){return!1===a.includes(e)}),d=n.filter(function(e){return c.includes(e[t.junctionFieldName][l])}).map(function(e){return i({},e,{$delete:!0})}),f=e.map(function(e){return r({},t.junctionFieldName,e)});this.$emit("input",[].concat(o(d),o(f)))},deleteFile:function(e){var t=this,n=this.value.map(function(n){return n[t.junctionFieldName][t.relatedPrimaryKeyField.field]===e?i({},n,{$delete:!0}):n});this.$emit("input",n)},editFile:function(e){this.editExisting=this.value[e]},stageValue:function(e){var t=e.field,i=e.value;this.$set(this.edits,t,i)},saveEdits:function(){var e=this;this.$emit("input",o((this.value||[]||[]).map(function(t){return t.id===e.editExisting[e.junctionPrimaryKey]?i({},t,r({},e.junctionFieldName,i({},t[e.junctionFieldName],e.edits))):t}))),this.edits={},this.editExisting=!1},setViewOptions:function(e){this.viewOptionsOverride=i({},this.viewOptionsOverride,e)},setViewQuery:function(e){this.viewQueryOverride=i({},this.viewQueryOverride,e)},onSearchInput:function(e){this.setViewQuery({q:e})}},created:function(){this.onSearchInput=this.$lodash.debounce(this.onSearchInput,200)}};exports.default=a;
(function(){var t=exports.default||module.exports;"function"==typeof t&&(t=t.options),Object.assign(t,{render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"input-single-file"},[t.value?i("div",{staticClass:"preview"},t._l(t.files,function(e,s){return i("v-card",{key:e.id,staticClass:"card",attrs:{title:e.title,subtitle:e.subtitle,src:e.src,icon:e.icon,href:e.href,options:{remove:{text:t.$t("delete"),icon:"delete"},edit:{text:t.$t("interfaces-files-edit_item"),icon:"edit"}}},on:{remove:function(i){return t.deleteFile(e[t.relatedPrimaryKeyField.field])},edit:function(e){return t.editFile(s)}}})}),1):t._e(),t._v(" "),i("v-button",{attrs:{type:"button",disabled:t.readonly},on:{click:function(e){t.newFile=!0}}},[i("i",{staticClass:"material-icons"},[t._v("add")]),t._v(t._s(t.$t("new_file"))+" ")]),i("v-button",{attrs:{type:"button",disabled:t.readonly},on:{click:function(e){t.existing=!0}}},[i("i",{staticClass:"material-icons"},[t._v("playlist_add")]),t._v(t._s(t.$t("existing"))+" ")]),t._v(" "),t.newFile?i("portal",{attrs:{to:"modal"}},[i("v-modal",{attrs:{buttons:{done:{text:t.$t("done")}},title:t.$t("file_upload")},on:{close:function(e){t.newFile=!1},done:function(e){t.newFile=!1}}},[i("div",{staticClass:"body"},[i("v-upload",{attrs:{multiple:!0,accept:t.options.accept},on:{upload:t.saveUpload}})],1)])],1):t._e(),t._v(" "),t.existing?i("portal",{attrs:{to:"modal"}},[i("v-modal",{attrs:{title:t.$t("choose_one"),buttons:{done:{text:t.$t("done")}},"action-required":""},on:{close:function(e){t.existing=!1},done:function(e){t.existing=!1}}},[i("div",{staticClass:"search"},[i("v-input",{staticClass:"search-input",attrs:{type:"search",placeholder:t.$t("search")},on:{input:t.onSearchInput}})],1),t._v(" "),i("v-items",{staticClass:"items",attrs:{collection:t.relation.junction.collection_one.collection,"view-type":t.viewType,selection:t.selection,filters:t.filters,"view-query":t.viewQuery,"view-options":t.viewOptions},on:{options:t.setViewOptions,query:t.setViewQuery,select:t.selectItems}})],1)],1):t._e(),t._v(" "),t.editExisting?i("portal",{staticClass:"edit-modal",attrs:{to:"modal"}},[i("v-modal",{attrs:{title:t.$t("editing_item"),buttons:{save:{text:"save",color:"accent",loading:t.selectionSaving}}},on:{close:function(e){t.editExisting=!1},save:t.saveEdits}},[i("div",{staticClass:"edit-modal-body"},[i("v-form",{attrs:{fields:t.relatedCollectionFields,values:t.editExisting[t.junctionFieldName]},on:{"stage-value":t.stageValue}})],1)])],1):t._e()],1)},staticRenderFns:[],_compiled:!0,_scopeId:"data-v-18270a",functional:void 0});})();
},{"../../../mixins/interface":"QdEO","./get-icon":"xPq6"}]},{},["WbR1"], "__DirectusExtension__")