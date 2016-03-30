/*! 7.0.14 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="7.0.14",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(a,b,c){function d(d){d.method=d.method||"POST",d.headers=d.headers||{};var e=b.defer(),f=e.promise;return d.headers.__setXHR_=function(){return function(a){a&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,e.notify?e.notify(a):f.progressFunc&&c(function(){f.progressFunc(a)})},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,e.notify?e.notify(a):f.progressFunc&&c(function(){f.progressFunc(a)}))},!1))}},a(d).then(function(a){e.resolve(a)},function(a){e.reject(a)},function(a){e.notify(a)}),f.success=function(a){return f.then(function(b){a(b.data,b.status,b.headers,d)}),f},f.error=function(a){return f.then(null,function(b){a(b.data,b.status,b.headers,d)}),f},f.progress=function(a){return f.progressFunc=a,f.then(null,null,function(b){a(b)}),f},f.abort=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),f},f.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(f,arguments),a.apply(f,arguments)}}(d.xhrFn),f},f}this.upload=function(a){function b(c,d,e){if(void 0!==d)if(angular.isDate(d)&&(d=d.toISOString()),angular.isString(d))c.append(e,d);else if("form"===a.sendFieldsAs)if(angular.isObject(d))for(var f in d)d.hasOwnProperty(f)&&b(c,d[f],e+"["+f+"]");else c.append(e,d);else d=angular.isString(d)?d:angular.toJson(d),"json-blob"===a.sendFieldsAs?c.append(e,new Blob([d],{type:"application/json"})):c.append(e,d)}return a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(c){var d,e=new FormData,f={};for(d in a.fields)a.fields.hasOwnProperty(d)&&(f[d]=a.fields[d]);c&&(f.data=c);for(d in f)if(f.hasOwnProperty(d)){var g=f[d];a.formDataAppender?a.formDataAppender(e,d,g):b(e,g,d)}if(null!=a.file){var h=a.fileFormDataName||"file";if(angular.isArray(a.file))for(var i=angular.isString(h),j=0;j<a.file.length;j++)e.append(i?h:h[j],a.file[j],a.fileName&&a.fileName[j]||a.file[j].name);else e.append(h,a.file,a.fileName||a.file.name)}return e}),d(a)},this.http=function(b){return b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof Blob?b:a.defaults.transformRequest[0].apply(this,arguments)},d(b)},this.setDefaults=function(a){this.defaults=a||{}},this.defaults={},this.version=ngFileUpload.version}]),function(){ngFileUpload.service("Upload",["$parse","$timeout","$compile","UploadValidate",function(a,b,c,d){var e=d;return e.getAttrWithDefaults=function(a,b){return null!=a[b]?a[b]:null==e.defaults[b]?e.defaults[b]:e.defaults[b].toString()},e.attrGetter=function(b,c,d,e){if(!d)return this.getAttrWithDefaults(c,b);try{return e?a(this.getAttrWithDefaults(c,b))(d,e):a(this.getAttrWithDefaults(c,b))(d)}catch(f){if(b.search(/min|max|pattern/i))return this.getAttrWithDefaults(c,b);throw f}},e.updateModel=function(c,d,f,g,h,i,j){function k(){var b=e.attrGetter("ngfKeep",d,f);if(b===!0){if(!h||!h.length)return;var j=(c&&c.$modelValue||d.$$ngfPrevFiles||[]).slice(0),k=!1;if(e.attrGetter("ngfKeepDistinct",d,f)===!0){for(var l=j.length,m=0;m<h.length;m++){for(var n=0;l>n&&h[m].name!==j[n].name;n++);n===l&&(j.push(h[m]),k=!0)}if(!k)return;h=j}else h=j.concat(h)}d.$$ngfPrevFiles=h;var o=h&&h.length?h[0]:null;if(c){var p=!e.attrGetter("ngfMultiple",d,f)&&!e.attrGetter("multiple",d)&&!b;a(e.attrGetter("ngModel",d)).assign(f,p?o:h)}var q=e.attrGetter("ngfModel",d);q&&a(q).assign(f,h),g&&a(g)(f,{$files:h,$file:o,$event:i})}j?k():e.validate(h,c,d,f,e.attrGetter("ngfValidateLater",d),function(){b(function(){k()})})},e}])}(),function(){function a(a,c,d,e,f,g,h,i){function j(){return"input"===c[0].tagName.toLowerCase()&&d.type&&"file"===d.type.toLowerCase()}function k(){return u("ngfChange")||u("ngfSelect")}function l(b){for(var c=b.__files_||b.target&&b.target.files,f=[],g=0;g<c.length;g++)f.push(c[g]);i.updateModel(e,d,a,k(),f.length?f:null,b)}function m(a){if(c!==a)for(var b=0;b<c[0].attributes.length;b++){var d=c[0].attributes[b];"type"!==d.name&&"class"!==d.name&&"id"!==d.name&&"style"!==d.name&&((null==d.value||""===d.value)&&("required"===d.name&&(d.value="required"),"multiple"===d.name&&(d.value="multiple")),a.attr(d.name,d.value))}}function n(){if(j())return c;var a=angular.element('<input type="file">');return m(a),a.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),b.push({el:c,ref:a}),document.body.appendChild(a[0]),a}function o(b){if(c.attr("disabled")||u("ngfSelectDisabled",a))return!1;var d=p(b);return null!=d?d:(r(b),q(navigator.userAgent)?setTimeout(function(){x[0].click()},0):x[0].click(),!1)}function p(a){var b=a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches;if("touchstart"===a.type)return w=b?b[0].clientY:0,!0;if(a.stopPropagation(),a.preventDefault(),"touchend"===a.type){var c=b?b[0].clientY:0;if(Math.abs(c-w)>20)return!1}}function q(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);if(b&&b.length>2){var c=i.defaults.androidFixMinorVersion||4;return parseInt(b[1])<4||parseInt(b[1])===c&&parseInt(b[2])<c}return-1===a.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(a)}function r(b){x.val()&&(x.val(null),i.updateModel(e,d,a,k(),null,b,!0))}function s(a){if(x&&!x.attr("__ngf_ie10_Fix_")){if(!x[0].parentNode)return void(x=null);a.preventDefault(),a.stopPropagation(),x.unbind("click");var b=x.clone();return x.replaceWith(b),x=b,x.attr("__ngf_ie10_Fix_","true"),x.bind("change",l),x.bind("click",s),x[0].click(),!1}x.removeAttr("__ngf_ie10_Fix_")}function t(a,b){return a===b||Boolean(16&a.compareDocumentPosition(b))}var u=function(a,b){return i.attrGetter(a,d,b)},v=[];v.push(a.$watch(u("ngfMultiple"),function(){x.attr("multiple",u("ngfMultiple",a))})),v.push(a.$watch(u("ngfCapture"),function(){x.attr("capture",u("ngfCapture",a))})),d.$observe("accept",function(){x.attr("accept",u("accept"))}),v.push(function(){d.$$observers&&delete d.$$observers.accept});var w=0,x=c;j()||(x=n()),x.bind("change",l),j()?c.bind("click",r):c.bind("click touchstart touchend",o),i.registerValidators(e,x,d,a),-1!==navigator.appVersion.indexOf("MSIE 10")&&x.bind("click",s),a.$on("$destroy",function(){j()||x.remove(),angular.forEach(v,function(a){a()})});for(var y=0;y<b.length;y++){var z=b[y];t(document,z.el[0])||(b.splice(y,1),z.ref.remove())}window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(c,x,l)}var b=[];ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(b,c,d,e){return{restrict:"AEC",require:"?ngModel",link:function(f,g,h,i){a(f,g,h,i,b,c,d,e)}}}])}(),function(){function a(a){return"img"===a.tagName.toLowerCase()?"image":"audio"===a.tagName.toLowerCase()?"audio":"video"===a.tagName.toLowerCase()?"video":/\./}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(a,b,c){var d=a;return d.dataUrl=function(a,d){if(d&&null!=a.dataUrl||!d&&null!=a.blobUrl){var e=c.defer();return b(function(){e.resolve(d?a.dataUrl:a.blobUrl)}),e.promise}var f=d?a.$ngfDataUrlPromise:a.$ngfBlobUrlPromise;if(f)return f;var g=c.defer();return b(function(){if(window.FileReader&&a&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||a.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||a.size<4e6)){var c=window.URL||window.webkitURL;if(c&&c.createObjectURL&&!d){var e;try{e=c.createObjectURL(a)}catch(f){return void b(function(){a.blobUrl="",g.reject()})}b(function(){a.blobUrl=e,e&&g.resolve(e)})}else{var h=new FileReader;h.onload=function(c){b(function(){a.dataUrl=c.target.result,g.resolve(c.target.result)})},h.onerror=function(){b(function(){a.dataUrl="",g.reject()})},h.readAsDataURL(a)}}else b(function(){a[d?"dataUrl":"blobUrl"]="",g.reject()})}),f=d?a.$ngfDataUrlPromise=g.promise:a.$ngfBlobUrlPromise=g.promise,f["finally"](function(){delete a[d?"$ngfDataUrlPromise":"$ngfBlobUrlPromise"]}),f},d}]);var b=angular.element("<style>.ngf-hide{display:none !important}</style>");document.getElementsByTagName("head")[0].appendChild(b[0]),ngFileUpload.directive("ngfSrc",["$compile","$timeout","Upload",function(b,c,d){return{restrict:"AE",link:function(b,e,f){c(function(){b.$watch(f.ngfSrc,function(g){if(angular.isString(g))return e.removeClass("ngf-hide"),e.attr("src",g);if(g&&0===g.type.indexOf(a(e[0]))){var h=d.attrGetter("ngfNoObjectUrl",f,b);d.dataUrl(g,h)["finally"](function(){c(function(){h&&g.dataUrl||!h&&g.blobUrl?(e.removeClass("ngf-hide"),e.attr("src",h?g.dataUrl:g.blobUrl)):e.addClass("ngf-hide")})})}else e.addClass("ngf-hide")})})}}}]),ngFileUpload.directive("ngfBackground",["Upload","$compile","$timeout",function(a,b,c){return{restrict:"AE",link:function(b,d,e){c(function(){b.$watch(e.ngfBackground,function(f){if(angular.isString(f))return d.css("background-image","url('"+f+"')");if(f&&0===f.type.indexOf("image")){var g=a.attrGetter("ngfNoObjectUrl",e,b);a.dataUrl(f,g)["finally"](function(){c(function(){g&&f.dataUrl||!g&&f.blobUrl?d.css("background-image","url('"+(g?f.dataUrl:f.blobUrl)+"')"):d.css("background-image","")})})}else d.css("background-image","")})})}}}]),ngFileUpload.config(["$compileProvider",function(a){a.imgSrcSanitizationWhitelist&&a.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|local|file|data|blob):/),a.aHrefSanitizationWhitelist&&a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|local|file|data|blob):/)}]),ngFileUpload.filter("ngfDataUrl",["UploadDataUrl","$sce",function(a,b){return function(c,d){return angular.isString(c)?b.trustAsResourceUrl(c):c&&!c.dataUrl?(void 0===c.dataUrl&&angular.isObject(c)&&(c.dataUrl=null,a.dataUrl(c,d)),""):(c&&c.dataUrl?b.trustAsResourceUrl(c.dataUrl):c)||""}}])}(),function(){function a(b){if(b.length>2&&"/"===b[0]&&"/"===b[b.length-1])return b.substring(1,b.length-1);var c=b.split(","),d="";if(c.length>1)for(var e=0;e<c.length;e++)d+="("+a(c[e])+")",e<c.length-1&&(d+="|");else 0===b.indexOf(".")&&(b="*"+b),d="^"+b.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",d=d.replace(/\\\*/g,".*").replace(/\\\?/g,".");return d}function b(a){if(angular.isString(a)){if(a.search(/kb/i)===a.length-2)return parseFloat(1e3*a.substring(0,a.length-2));if(a.search(/mb/i)===a.length-2)return parseFloat(1e6*a.substring(0,a.length-2));if(a.search(/gb/i)===a.length-2)return parseFloat(1e9*a.substring(0,a.length-2));if(a.search(/b/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/s/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/m/i)===a.length-1)return parseFloat(60*a.substring(0,a.length-1));if(a.search(/h/i)===a.length-1)return parseFloat(3600*a.substring(0,a.length-1))}return a}ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(c,d,e){var f=c;return f.registerValidators=function(a,b,c,d){function e(a){angular.forEach(a.$ngfValidations,function(b){a.$setValidity(b.name,b.valid)})}a&&(a.$ngfValidations=[],a.$formatters.push(function(g){return f.attrGetter("ngfValidateLater",c,d)||!a.$$ngfValidated?(f.validate(g,a,c,d,!1,function(){e(a),a.$$ngfValidated=!1}),g&&0===g.length&&(g=null),!b||null!=g&&0!==g.length||b.val()&&b.val(null)):(e(a),a.$$ngfValidated=!1),g}))},f.validatePattern=function(b,c){if(!c)return!0;var d=new RegExp(a(c),"gi");return null!=b.type&&d.test(b.type.toLowerCase())||null!=b.name&&d.test(b.name.toLowerCase())},f.validate=function(a,c,d,e,g,h){function i(b,d,e){if(a){for(var f="ngf"+b[0].toUpperCase()+b.substr(1),g=a.length,h=null;g--;){var i=a[g],j=k(f,{$file:i});null==j&&(j=d(k("ngfValidate")||{}),h=null==h?!0:h),null!=j&&(e(i,j)||(i.$error=b,i.$errorParam=j,a.splice(g,1),h=!1))}null!==h&&c.$ngfValidations.push({name:b,valid:h})}}function j(b,d,e,f,g){if(a){var i=0,j=!1,m="ngf"+b[0].toUpperCase()+b.substr(1);a=void 0===a.length?[a]:a,angular.forEach(a,function(a){if(0!==a.type.search(e))return!0;var n=k(m,{$file:a})||d(k("ngfValidate",{$file:a})||{});n&&(l++,i++,f(a,n).then(function(c){g(c,n)||(a.$error=b,a.$errorParam=n,j=!0)},function(){k("ngfValidateForce",{$file:a})&&(a.$error=b,a.$errorParam=n,j=!0)})["finally"](function(){l--,i--,i||c.$ngfValidations.push({name:b,valid:!j}),l||h.call(c,c.$ngfValidations)}))})}}c=c||{},c.$ngfValidations=c.$ngfValidations||[],angular.forEach(c.$ngfValidations,function(a){a.valid=!0});var k=function(a,b){return f.attrGetter(a,d,e,b)};if(g)return void h.call(c);if(c.$$ngfValidated=!0,null==a||0===a.length)return void h.call(c);if(a=void 0===a.length?[a]:a.slice(0),i("pattern",function(a){return a.pattern},f.validatePattern),i("minSize",function(a){return a.size&&a.size.min},function(a,c){return a.size>=b(c)}),i("maxSize",function(a){return a.size&&a.size.max},function(a,c){return a.size<=b(c)}),i("validateFn",function(){return null},function(a,b){return b===!0||null===b||""===b}),!a.length)return void h.call(c,c.$ngfValidations);var l=0;j("maxHeight",function(a){return a.height&&a.height.max},/image/,this.imageDimensions,function(a,b){return a.height<=b}),j("minHeight",function(a){return a.height&&a.height.min},/image/,this.imageDimensions,function(a,b){return a.height>=b}),j("maxWidth",function(a){return a.height&&a.width.max},/image/,this.imageDimensions,function(a,b){return a.width<=b}),j("minWidth",function(a){return a.height&&a.width.min},/image/,this.imageDimensions,function(a,b){return a.width>=b}),j("maxDuration",function(a){return a.height&&a.duration.max},/audio|video/,this.mediaDuration,function(a,c){return a<=b(c)}),j("minDuration",function(a){return a.height&&a.duration.min},/audio|video/,this.mediaDuration,function(a,c){return a>=b(c)}),j("validateAsyncFn",function(){return null},/./,function(a,b){return b},function(a){return a===!0||null===a||""===a}),l||h.call(c,c.$ngfValidations)},f.imageDimensions=function(a){if(a.width&&a.height){var b=d.defer();return e(function(){b.resolve({width:a.width,height:a.height})}),b.promise}if(a.$ngfDimensionPromise)return a.$ngfDimensionPromise;var c=d.defer();return e(function(){return 0!==a.type.indexOf("image")?void c.reject("not image"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].clientWidth,d=h[0].clientHeight;h.remove(),a.width=b,a.height=d,c.resolve({width:b,height:d})}function f(){h.remove(),c.reject("load error")}function g(){e(function(){h[0].parentNode&&(h[0].clientWidth?d():i>10?f():g())},1e3)}var h=angular.element("<img>").attr("src",b).css("visibility","hidden").css("position","fixed");h.on("load",d),h.on("error",f);var i=0;g(),angular.element(document.getElementsByTagName("body")[0]).append(h)},function(){c.reject("load error")})}),a.$ngfDimensionPromise=c.promise,a.$ngfDimensionPromise["finally"](function(){delete a.$ngfDimensionPromise}),a.$ngfDimensionPromise},f.mediaDuration=function(a){if(a.duration){var b=d.defer();return e(function(){b.resolve(a.duration)}),b.promise}if(a.$ngfDurationPromise)return a.$ngfDurationPromise;var c=d.defer();return e(function(){return 0!==a.type.indexOf("audio")&&0!==a.type.indexOf("video")?void c.reject("not media"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].duration;a.duration=b,h.remove(),c.resolve(b)}function f(){h.remove(),c.reject("load error")}function g(){e(function(){h[0].parentNode&&(h[0].duration?d():i>10?f():g())},1e3)}var h=angular.element(0===a.type.indexOf("audio")?"<audio>":"<video>").attr("src",b).css("visibility","none").css("position","fixed");h.on("loadedmetadata",d),h.on("error",f);var i=0;g(),angular.element(document.body).append(h)},function(){c.reject("load error")})}),a.$ngfDurationPromise=c.promise,a.$ngfDurationPromise["finally"](function(){delete a.$ngfDurationPromise}),a.$ngfDurationPromise},f}])}(),function(){function a(a,c,d,e,f,g,h,i){function j(){return c.attr("disabled")||n("ngfDropDisabled",a)}function k(a,b,c,d){var e=n("ngfDragOverClass",a,{$event:c}),f=n("ngfDragOverClass")||"dragover";if(angular.isString(e))return void d(e);if(e&&(e.delay&&(r=e.delay),e.accept||e.reject)){var g=c.dataTransfer.items;if(null!=g)for(var h=n("ngfPattern",a,{$event:c}),j=0;j<g.length;j++)if("file"===g[j].kind||""===g[j].kind){if(!i.validatePattern(g[j],h)){f=e.reject;break}f=e.accept}}d(f)}function l(a,b,c,d){function e(a,b,c){if(null!=b)if(b.isDirectory){var d=(c||"")+b.name;a.push({name:b.name,type:"directory",path:d});var f=b.createReader(),g=[];i++;var h=function(){f.readEntries(function(d){try{if(d.length)g=g.concat(Array.prototype.slice.call(d||[],0)),h();else{for(var f=0;f<g.length;f++)e(a,g[f],(c?c:"")+b.name+"/");i--}}catch(j){i--,console.error(j)}},function(){i--})};h()}else i++,b.file(function(b){try{i--,b.path=(c?c:"")+b.name,a.push(b)}catch(d){i--,console.error(d)}},function(){i--})}var f=[],i=0,j=a.dataTransfer.items;if(j&&j.length>0&&"file"!==h.protocol())for(var k=0;k<j.length;k++){if(j[k].webkitGetAsEntry&&j[k].webkitGetAsEntry()&&j[k].webkitGetAsEntry().isDirectory){var l=j[k].webkitGetAsEntry();if(l.isDirectory&&!c)continue;null!=l&&e(f,l)}else{var m=j[k].getAsFile();null!=m&&f.push(m)}if(!d&&f.length>0)break}else{var n=a.dataTransfer.files;if(null!=n)for(var o=0;o<n.length&&(f.push(n.item(o)),d||!(f.length>0));o++);}var p=0;!function q(a){g(function(){if(i)10*p++<2e4&&q(10);else{if(!d&&f.length>1){for(k=0;"directory"===f[k].type;)k++;f=[f[k]]}b(f)}},a||0)}()}var m=b(),n=function(a,b,c){return i.attrGetter(a,d,b,c)};if(n("dropAvailable")&&g(function(){a[n("dropAvailable")]?a[n("dropAvailable")].value=m:a[n("dropAvailable")]=m}),!m)return void(n("ngfHideOnDropNotAvailable",a)===!0&&c.css("display","none"));i.registerValidators(e,null,d,a);var o,p=null,q=f(n("ngfStopPropagation")),r=1;c[0].addEventListener("dragover",function(b){if(!j()){if(b.preventDefault(),q(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var e=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===e||"linkMove"===e?"move":"copy"}g.cancel(p),o||(o="C",k(a,d,b,function(a){o=a,c.addClass(o)}))}},!1),c[0].addEventListener("dragenter",function(b){j()||(b.preventDefault(),q(a)&&b.stopPropagation())},!1),c[0].addEventListener("dragleave",function(){j()||(p=g(function(){c.removeClass(o),o=null},r||1))},!1),c[0].addEventListener("drop",function(b){j()||(b.preventDefault(),q(a)&&b.stopPropagation(),c.removeClass(o),o=null,l(b,function(c){i.updateModel(e,d,a,n("ngfChange")||n("ngfDrop"),c,b)},n("ngfAllowDir",a)!==!1,n("multiple")||n("ngfMultiple",a)))},!1),c[0].addEventListener("paste",function(b){if(!j()){var c=[],f=b.clipboardData||b.originalEvent.clipboardData;if(f&&f.items){for(var g=0;g<f.items.length;g++)-1!==f.items[g].type.indexOf("image")&&c.push(f.items[g].getAsFile());i.updateModel(e,d,a,n("ngfChange")||n("ngfDrop"),c,b)}}},!1)}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location","Upload",function(b,c,d,e){return{restrict:"AEC",require:"?ngModel",link:function(f,g,h,i){a(f,g,h,i,b,c,d,e)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(a,c,d){return function(e,f,g){if(b()){var h=a(d.attrGetter("ngfDropAvailable",g));c(function(){h(e),h.assign&&h.assign(e,!0)})}}}])}();
!function (e, t) {
    var n = e.createElement("style");
    if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet)n.styleSheet.disabled || (n.styleSheet.cssText = t); else try {
        n.innerHTML = t
    } catch (a) {
        n.innerText = t
    }
}(document, ".selected_date_full {\n  color: #387EF5;\n  font-weight: bold;\n  text-align: center;\n  padding-bottom: 5px;\n}\n\n.color_blue {\n  color: rgb(56, 126, 245) !important;\n}\n\n.bg_color_blue {\n  background-color: rgb(56, 126, 245);\n}\n\n.date_col:hover {\n  background-color: rgba(56, 126, 245, 0.5);\n  cursor: pointer;\n}\n\n.date_col:active {\n  background-color: rgba(56, 126, 245, 1);\n  cursor: pointer;\n}\n\n.no_padding {\n  padding: 0;\n}\n\n.date_cell {\n  padding: 5px;\n}\n\n.date_selected {\n  background-color: rgba(56, 126, 245, 1) !important;\n}\n\n.today {\n  background-color: rgba(186, 186, 186, 1);\n}\n\n.pointer_events_none {\n  pointer-events: none !important;\n  color: #AAAAAA;\n}\n\n.select_section {\n  padding: 0;\n}\n\n.select_section label {\n  padding: 12px;\n}\n\n.select_section select {\n  font-size: 12px;\n  font-weight: bold;\n  padding: 2px 10px;\n  direction: ltr;\n  left: 0;\n  width: 100%;\n  max-width: 100%;\n}\n\n.select_section .item-select:after {\n  right: 4px;\n  border-top: 4px solid;\n  border-right: 4px solid rgba(0, 0, 0, 0);\n  border-left: 4px solid rgba(0, 0, 0, 0);\n}\n\n.left_arrow {\n  direction: rtl;\n}\n\n.right_arrow {\n\n}\n.ionic_datepicker_modal_content .selected_date_full {\n  font-size: 20px;\n}\n.font_22px {\n  font-size: 22px;\n}\n.ionic_datepicker_modal_content {\n  padding-top: 10%;\n}\n.ionic_datepicker_modal_content .selected_date_full{\n  padding: 20px;\n}\n@media (min-width: 680px) {\n  .ionic_datepicker_modal_content {\n    padding-top: 0;\n  }\n  .ionic_datepicker_modal_content .selected_date_full {\n    font-size: inherit;\n  }\n  .ionic_datepicker_modal_content .selected_date_full{\n    padding: 10px 0 0 0;\n  }\n}"), function (e) {
    try {
        e = angular.module("ionic-datepicker.templates")
    } catch (t) {
        e = angular.module("ionic-datepicker.templates", [])
    }
    e.run(["$templateCache", function (e) {
        e.put("ionic-datepicker-modal.html", '<ion-modal-view class=ionic_datepicker_modal><ion-header-bar ng-class=modalHeaderColor><h1 class=title>{{titleLabel}}</h1></ion-header-bar><ion-content class=ionic_datepicker_modal_content><div class=ionic_datepicker><div class=selected_date_full>{{selectedDateFull | date:"dd-MM-yyyy"}}</div><div class=row><div class="col col-10 left_arrow" ng-click=prevMonth() ng-class="{\'pointer_events_none\':(enableDatesFrom.isSet && enableDatesFrom.epoch > currentMonthFirstDayEpoch)}"><button class="button-clear font_22px" ng-class="{\'color_blue\':((enableDatesFrom.isSet && enableDatesFrom.epoch < currentMonthFirstDayEpoch) || (!enableDatesFrom.isSet))}"><i class="icon ion-chevron-left"></i></button></div><div class="col col-80 drop_down"><div class="row select_section"><div class="col col-50 month_dropdown"><div class=list><label class="item item-input item-select"><select ng-model=currentMonth ng-change=monthChanged(currentMonth) class=month_select><option value={{month}} ng-repeat="month in monthsList" ng-selected="month == currentMonthSelected">{{month}}</option></select></label></div></div><div class="col col-50 year_dropdown"><div class=list><label class="item item-input item-select"><select ng-model=currentYear ng-change=yearChanged(currentYear) class=year_select><option value={{year}} ng-repeat="year in yearsList" ng-selected="year == currentYearSelected">{{year}}</option></select></label></div></div></div></div><div class="col col-10 right_arrow" ng-click=nextMonth() ng-class="{\'pointer_events_none\':(enableDatesTo.isSet && enableDatesTo.epoch < currentMonthLastDayEpoch)}"><button class="button-clear font_22px" ng-class="{\'color_blue\':((enableDatesTo.isSet && enableDatesTo.epoch > currentMonthLastDayEpoch) || (!enableDatesTo.isSet))}"><i class="icon ion-chevron-right"></i></button></div></div><div class=calendar_grid><div class=row><div class="col text-center" ng-repeat="weekName in weekNames track by $index" style="font-weight: bold">{{ weekName }}</div></div><div><div class=row ng-repeat="row in rows track by $index" style="text-align: center;"><div class="col no_padding" ng-repeat="col in cols track by $index" ng-class="{\'date_col\': (dayList[$parent.$index * numColumns + $index].day != undefined), \'date_selected\': (dayList[$parent.$index * numColumns + $index].dateString === selctedDateStringCopy && dayList[$parent.$index * numColumns + $index].day != undefined) , \'today\' : (dayList[$parent.$index * numColumns + $index].date == today.date && dayList[$parent.$index * numColumns + $index].month == today.month && dayList[$parent.$index * numColumns + $index].year == today.year)}"><div class=date_cell ng-click="dateSelected(dayList[$parent.$index * numColumns + $index])" ng-class="{\'pointer_events_none\':(disabledDates.indexOf(dayList[$parent.$index * numColumns + $index].epochLocal) > -1) || (enableDatesFrom.isSet && enableDatesFrom.epoch > dayList[$parent.$index * numColumns + $index].epochLocal) || (enableDatesTo.isSet && enableDatesTo.epoch < dayList[$parent.$index * numColumns + $index].epochLocal)}">{{ dayList[$parent.$index * numColumns + $index].date }}</div></div></div></div></div><div class="error_msg padding-horizontal" ng-show="date_selection.submitted === true && date_selection.selected === false">{{errorMsgLabel}}</div></div></ion-content><ion-footer-bar ng-class=modalFooterColor><div class="row no_padding"><div class="col-33 text-center" ng-click=closeIonicDatePickerModal()><button class="button button-clear">{{closeLabel}}</button></div><div class="col-34 text-center" ng-click=setIonicDatePickerTodayDate()><button class="button button-clear">{{todayLabel}}</button></div><div class="col-33 text-center" ng-click=setIonicDatePickerDate()><button class="button button-clear">{{setLabel}}</button></div></div></ion-footer-bar></ion-modal-view>')
    }])
}(), function (e) {
    try {
        e = angular.module("ionic-datepicker.templates")
    } catch (t) {
        e = angular.module("ionic-datepicker.templates", [])
    }
    e.run(["$templateCache", function (e) {
        e.put("ionic-datepicker-popup.html", '<div class=ionic-datepicker><div class=selected_date_full>{{selectedDateFull | date:"dd-MM-yyyy"}}</div><div class="row no_padding"><div class="col col-10 left_arrow" ng-click=prevMonth() ng-class="{\'pointer_events_none\':(enableDatesFrom.isSet && enableDatesFrom.epoch > currentMonthFirstDayEpoch)}"><button class=button-clear ng-class="{\'color_blue\':((enableDatesFrom.isSet && enableDatesFrom.epoch < currentMonthFirstDayEpoch) || (!enableDatesFrom.isSet))}"><i class="icon ion-chevron-left"></i></button></div><div class="col col-80 drop_down no_padding"><div class="row select_section"><div class="col col-50 month_dropdown"><div class=list><label class="item item-input item-select"><select ng-model=currentMonth ng-change=monthChanged(currentMonth) class=month_select><option value={{month}} ng-repeat="month in monthsList" ng-selected="month == currentMonthSelected">{{month}}</option></select></label></div></div><div class="col col-50 year_dropdown"><div class=list><label class="item item-input item-select"><select ng-model=currentYear ng-change=yearChanged(currentYear) class=year_select><option value={{year}} ng-repeat="year in yearsList" ng-selected="year == currentYearSelected">{{year}}</option></select></label></div></div></div></div><div class="col col-10 right_arrow" ng-click=nextMonth() ng-class="{\'pointer_events_none\':(enableDatesTo.isSet && enableDatesTo.epoch < currentMonthLastDayEpoch)}"><button class=button-clear ng-class="{\'color_blue\':((enableDatesTo.isSet && enableDatesTo.epoch > currentMonthLastDayEpoch) || (!enableDatesTo.isSet))}"><i class="icon ion-chevron-right"></i></button></div></div><div class=calendar_grid><div class=row><div class=col ng-repeat="weekName in weekNames track by $index" style="font-weight: bold">{{ weekName }}</div></div><div style="height: 180px;"><div class=row ng-repeat="row in rows track by $index" style="text-align: center;"><div class="col no_padding" ng-repeat="col in cols track by $index" ng-class="{\'date_col\': (dayList[$parent.$index * numColumns + $index].day != undefined), \'date_selected\': (dayList[$parent.$index * numColumns + $index].dateString === selctedDateStringCopy && dayList[$parent.$index * numColumns + $index].day != undefined) , \'today\' : (dayList[$parent.$index * numColumns + $index].date == today.date && dayList[$parent.$index * numColumns + $index].month == today.month && dayList[$parent.$index * numColumns + $index].year == today.year)}"><div class=date_cell ng-click="dateSelected(dayList[$parent.$index * numColumns + $index])" ng-class="{\'pointer_events_none\':(disabledDates.indexOf(dayList[$parent.$index * numColumns + $index].epochLocal) > -1) || (enableDatesFrom.isSet && enableDatesFrom.epoch > dayList[$parent.$index * numColumns + $index].epochLocal) || (enableDatesTo.isSet && enableDatesTo.epoch < dayList[$parent.$index * numColumns + $index].epochLocal)}">{{ dayList[$parent.$index * numColumns + $index].date }}</div></div></div></div></div><div class="error_msg padding-horizontal" ng-show="date_selection.submitted === true && date_selection.selected === false">{{errorMsgLabel}}</div></div>')
    }])
}(), function () {
    "use strict";
    angular.module("ionic-datepicker", ["ionic", "ionic-datepicker.templates"])
}(), function () {
    "use strict";
    function e(e, t, n) {
        return {
            restrict: "AE", replace: !0, scope: {inputObj: "=inputObj"}, link: function (a, o, i) {
                function l() {
                    a.date_selection.submitted = !0, a.date_selection.selected === !0 && a.inputObj.callback(a.date_selection.selectedDate)
                }

                function s() {
                    var e = new Date;
                    e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0);
                    var t = new Date(e.getFullYear(), e.getMonth(), e.getDate()), n = {
                        date: e.getDate(),
                        month: e.getMonth(),
                        year: e.getFullYear(),
                        day: e.getDay(),
                        dateString: e.toString(),
                        epochLocal: t.getTime(),
                        epochUTC: t.getTime() + 60 * t.getTimezoneOffset() * 1e3
                    };
                    a.selctedDateString = n.dateString, a.selctedDateStringCopy = angular.copy(a.selctedDateString), a.date_selection.selected = !0, a.date_selection.selectedDate = new Date(n.dateString), p(new Date)
                }

                a.currentMonth = "", a.currentYear = "", a.disabledDates = [], a.titleLabel = a.inputObj['titleLabel'] ? a.inputObj.titleLabel : "Select Date", a.todayLabel = a.inputObj.todayLabel ? a.inputObj.todayLabel : "今日", a.closeLabel = a.inputObj.closeLabel ? a.inputObj.closeLabel : "关闭", a.setLabel = a.inputObj.setLabel ? a.inputObj.setLabel : "设置", a.errorMsgLabel = a.inputObj.errorMsgLabel ? a.inputObj.errorMsgLabel : "Please select a date.", a.setButtonType = a.inputObj.setButtonType ? a.inputObj.setButtonType : "button-positive", a.todayButtonType = a.inputObj.todayButtonType ? a.inputObj.todayButtonType : "button-stable", a.closeButtonType = a.inputObj.closeButtonType ? a.inputObj.closeButtonType : "button-stable", a.templateType = a.inputObj.templateType ? a.inputObj.templateType : "modal", a.modalHeaderColor = a.inputObj.modalHeaderColor ? a.inputObj.modalHeaderColor : "bar-stable", a.modalFooterColor = a.inputObj.modalFooterColor ? a.inputObj.modalFooterColor : "bar-stable", a.enableDatesFrom = {
                    epoch: 0,
                    isSet: !1
                }, a.enableDatesTo = {
                    epoch: 0,
                    isSet: !1
                }, a.inputObj.from && (a.enableDatesFrom.isSet = !0, a.enableDatesFrom.epoch = a.inputObj.from.getTime()), a.inputObj.to && (a.enableDatesTo.isSet = !0, a.enableDatesTo.epoch = a.inputObj.to.getTime()), a.ipDate = a.inputObj.inputDate ? a.inputObj.inputDate : new Date, a.selectedDateFull = a.ipDate, a.monthsList = [], a.monthsList = a.inputObj.monthList && 12 === a.inputObj.monthList.length ? a.inputObj.monthList : n.monthsList, a.weekNames = a.inputObj.weekDaysList && 7 === a.inputObj.weekDaysList.length ? a.inputObj.weekDaysList : ["日", "一", "二", "三", "四", "五", "六"], a.yearsList = n.yearsList, a.mondayFirst = a.inputObj.mondayFirst ? !0 : !1, a.inputObj.disabledDates && 0 === a.inputObj.disabledDates.length ? a.disabledDates = [] : angular.forEach(a.inputObj.disabledDates, function (e, t) {
                    e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), a.disabledDates.push(e.getTime())
                });
                var c = angular.copy(a.ipDate);
                if (c.setHours(0), c.setMinutes(0), c.setSeconds(0), c.setMilliseconds(0), a.selctedDateString = c.toString(), a.today = {}, a.mondayFirst === !0) {
                    var d = a.weekNames.shift();
                    a.weekNames.push(d)
                }
                var r = new Date, u = new Date(r.getFullYear(), r.getMonth(), r.getDate());
                a.today = {
                    dateObj: r,
                    date: u.getDate(),
                    month: u.getMonth(),
                    year: u.getFullYear(),
                    day: u.getDay(),
                    dateString: u.toString(),
                    epochLocal: u.getTime(),
                    epochUTC: u.getTime() + 60 * u.getTimezoneOffset() * 1e3
                };
                var p = function (e) {
                    e.setHours(0), e.setMinutes(0), e.setSeconds(0), e.setMilliseconds(0), a.selctedDateString = new Date(e).toString(), c = angular.copy(e);
                    var t = new Date(e.getFullYear(), e.getMonth(), 1).getDate(), n = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
                    a.dayList = [];
                    for (var o = t; n >= o; o++) {
                        var i = new Date(e.getFullYear(), e.getMonth(), o);
                        a.dayList.push({
                            date: i.getDate(),
                            month: i.getMonth(),
                            year: i.getFullYear(),
                            day: i.getDay(),
                            dateString: i.toString(),
                            epochLocal: i.getTime(),
                            epochUTC: i.getTime() + 60 * i.getTimezoneOffset() * 1e3
                        })
                    }
                    var l = a.dayList[0].day - a.mondayFirst;
                    l = 0 > l ? 6 : l, a.currentMonthFirstDayEpoch = a.dayList[0].epochLocal, a.currentMonthLastDayEpoch = a.dayList[a.dayList.length - 1].epochLocal;
                    for (var s = 0; l > s; s++)a.dayList.unshift({});
                    a.rows = [], a.cols = [], a.currentMonth = a.monthsList[e.getMonth()], a.currentYear = e.getFullYear(), a.currentMonthSelected = a.currentMonth, a.currentYearSelected = a.currentYear, a.numColumns = 7, a.rows.length = 6, a.cols.length = a.numColumns
                };
                a.monthChanged = function (e) {
                    var t = a.monthsList.indexOf(e);
                    c.setMonth(t), p(c)
                }, a.yearChanged = function (e) {
                    c.setFullYear(e), p(c)
                }, a.prevMonth = function () {
                    1 === c.getMonth() && c.setFullYear(c.getFullYear()), c.setMonth(c.getMonth() - 1), a.currentMonth = a.monthsList[c.getMonth()], a.currentYear = c.getFullYear(), p(c)
                }, a.nextMonth = function () {
                    11 === c.getMonth() && c.setFullYear(c.getFullYear()), c.setMonth(c.getMonth() + 1), a.currentMonth = a.monthsList[c.getMonth()], a.currentYear = c.getFullYear(), p(c)
                }, a.date_selection = {
                    selected: !1,
                    selectedDate: "",
                    submitted: !1
                }, a.date_selection.selected = !0, a.date_selection.selectedDate = a.ipDate, a.dateSelected = function (e) {
                    e && (a.selctedDateString = e.dateString, a.selctedDateStringCopy = angular.copy(a.selctedDateString), a.date_selection.selected = !0, a.date_selection.selectedDate = new Date(e.dateString), a.selectedDateFull = a.date_selection.selectedDate)
                }, a.closeIonicDatePickerModal = function () {
                    a.inputObj.callback(void 0), a.closeModal()
                }, a.setIonicDatePickerTodayDate = function () {
                    s()
                }, a.setIonicDatePickerDate = function () {
                    l(), a.closeModal()
                }, t.fromTemplateUrl("ionic-datepicker-modal.html", {
                    scope: a,
                    animation: "slide-in-up"
                }).then(function (e) {
                    a.modal = e
                }), a.openModal = function () {
                    a.modal.show()
                }, a.closeModal = function () {
                    a.modal.hide()
                }, o.on("click", function () {
                    p(a.date_selection.selectedDate ? a.date_selection.selectedDate : a.ipDate ? angular.copy(a.ipDate) : new Date), "modal" === a.templateType.toLowerCase() ? a.openModal() : e.show({
                        templateUrl: "ionic-datepicker-popup.html",
                        title: a.titleLabel,
                        subTitle: "",
                        scope: a,
                        buttons: [{
                            text: a.closeLabel, type: a.closeButtonType, onTap: function (e) {
                                a.inputObj.callback(void 0)
                            }
                        }, {
                            text: a.todayLabel, type: a.todayButtonType, onTap: function (e) {
                                s(), e.preventDefault()
                            }
                        }, {
                            text: a.setLabel, type: a.setButtonType, onTap: function () {
                                l()
                            }
                        }]
                    })
                })
            }
        }
    }

    angular.module("ionic-datepicker").directive("ionicDatepicker", e), e.$inject = ["$ionicPopup", "$ionicModal", "IonicDatepickerService"]
}(), function () {
    "use strict";
    function e() {
        this.monthsList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            this.yearsList = [1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100]
    }

    angular.module("ionic-datepicker").service("IonicDatepickerService", e), e.$inject = []
}();
!function (t, e) {
    var i = t.createElement("style");
    if (t.getElementsByTagName("head")[0].appendChild(i), i.styleSheet)i.styleSheet.disabled || (i.styleSheet.cssText = e); else try {
        i.innerHTML = e
    } catch (n) {
        i.innerText = e
    }
}(document, "/* Empty. Add your own CSS if you like */\n\n.timePickerColon {\n  padding-top: 40px;\n  text-align: center;\n  font-weight: bold;\n}\n\n.timePickerArrows {\n  width: 100%;\n}\n\n.timePickerBoxText {\n  text-align: center;\n  border: 1px solid #dddddd !important;\n}\n\n.bar.bar-stable, .tabs {\n  box-shadow: 0 0 5px #555;\n}\n\n.overflowShow {\n  white-space: normal !important;\n}"), function (t) {
    try {
        t = angular.module("ionic-timepicker.templates")
    } catch (e) {
        t = angular.module("ionic-timepicker.templates", [])
    }
    t.run(["$templateCache", function (t) {
        t.put("ionic-timepicker-12-hour.html", '<div class=12HourTimePickerChildDiv><div class=row><span class="button-small col col-25"><button type=button class="button button-clear button-small button-dark timePickerArrows marginBottom10" ng-click=increaseHours()><i class="icon ion-chevron-up"></i></button> <input type=text ng-model=time.hours class="ipBoxes timePickerBoxText" disabled> <button type=button class="button button-clear button-small button-dark timePickerArrows marginTop10" ng-click=decreaseHours()><i class="icon ion-chevron-down"></i></button></span> <label class="col col-10 timePickerColon">:</label> <span class="button-small col col-25"><button type=button class="button button-clear button-small button-dark timePickerArrows marginBottom10" ng-click=increaseMinutes()><i class="icon ion-chevron-up"></i></button> <input type=text ng-model=time.minutes class="ipBoxes timePickerBoxText" disabled> <button type=button class="button button-clear button-small button-dark timePickerArrows marginTop10" ng-click=decreaseMinutes()><i class="icon ion-chevron-down"></i></button></span> <label class="col col-10 timePickerColon">:</label> <span class="button-small col col-25"><button type=button class="button button-clear button-small button-dark timePickerArrows marginBottom10" ng-click=changeMeridian()><i class="icon ion-chevron-up"></i></button> <input type=text ng-model=time.meridian class="ipBoxes timePickerBoxText" disabled> <button type=button class="button button-clear button-small button-dark timePickerArrows marginTop10" ng-click=changeMeridian()><i class="icon ion-chevron-down"></i></button></span></div></div>')
    }])
}(), function (t) {
    try {
        t = angular.module("ionic-timepicker.templates")
    } catch (e) {
        t = angular.module("ionic-timepicker.templates", [])
    }
    t.run(["$templateCache", function (t) {
        t.put("ionic-timepicker-24-hour.html", '<div class=24HourTimePickerChildDiv><div class=row><span class="button-small col col-offset-20 col-25"><button type=button class="button button-clear button-small button-dark timePickerArrows marginBottom10" ng-click=increaseHours()><i class="icon ion-chevron-up"></i></button> <input type=text ng-model=time.hours class="ipBoxes timePickerBoxText" disabled> <button type=button class="button button-clear button-small button-dark timePickerArrows marginTop10" ng-click=decreaseHours()><i class="icon ion-chevron-down"></i></button></span> <label class="col col-10 timePickerColon">:</label> <span class="button-small col col-25"><button type=button class="button button-clear button-small button-dark timePickerArrows marginBottom10" ng-click=increaseMinutes()><i class="icon ion-chevron-up"></i></button> <input type=text ng-model=time.minutes class="ipBoxes timePickerBoxText" disabled> <button type=button class="button button-clear button-small button-dark timePickerArrows marginTop10" ng-click=decreaseMinutes()><i class="icon ion-chevron-down"></i></button></span></div></div>')
    }])
}(), function () {
    "use strict";
    angular.module("ionic-timepicker", ["ionic", "ionic-timepicker.templates"])
}(), function () {
    "use strict";
    function t(t) {
        return {
            restrict: "AE", replace: !0, scope: {inputObj: "=inputObj"}, link: function (e, i, n) {
                var o = new Date, s = o.getHours();
                e.inputEpochTime = e.inputObj.inputEpochTime ? e.inputObj.inputEpochTime : 60 * s * 60, e.step = e.inputObj.step ? e.inputObj.step : 15, e.format = e.inputObj.format ? e.inputObj.format : 24, e.titleLabel = e.inputObj.titleLabel ? e.inputObj.titleLabel : "Time Picker", e.setLabel = e.inputObj.setLabel ? e.inputObj.setLabel : "设置", e.closeLabel = e.inputObj.closeLabel ? e.inputObj.closeLabel : "取消", e.setButtonType = e.inputObj.setButtonType ? e.inputObj.setButtonType : "button-positive", e.closeButtonType = e.inputObj.closeButtonType ? e.inputObj.closeButtonType : "button-stable";
                var u = {epochTime: e.inputEpochTime, step: e.step, format: e.format};
                e.time = {hours: 0, minutes: 0, meridian: ""};
                var m = new Date(1e3 * u.epochTime);
                e.increaseHours = function () {
                    e.time.hours = Number(e.time.hours), 12 == u.format && (12 != e.time.hours ? e.time.hours += 1 : e.time.hours = 1), 24 == u.format && (23 != e.time.hours ? e.time.hours += 1 : e.time.hours = 0), e.time.hours = e.time.hours < 10 ? "0" + e.time.hours : e.time.hours
                }, e.decreaseHours = function () {
                    e.time.hours = Number(e.time.hours), 12 == u.format && (e.time.hours > 1 ? e.time.hours -= 1 : e.time.hours = 12), 24 == u.format && (e.time.hours > 0 ? e.time.hours -= 1 : e.time.hours = 23), e.time.hours = e.time.hours < 10 ? "0" + e.time.hours : e.time.hours
                }, e.increaseMinutes = function () {
                    e.time.minutes = Number(e.time.minutes), e.time.minutes != 60 - u.step && e.time.minutes + u.step <= 60 ? e.time.minutes += u.step : e.time.minutes = 0, e.time.minutes = e.time.minutes < 10 ? "0" + e.time.minutes : e.time.minutes
                }, e.decreaseMinutes = function () {
                    e.time.minutes = Number(e.time.minutes), 0 != e.time.minutes && e.time.minutes - u.step > 0 ? e.time.minutes -= u.step : e.time.minutes = 60 - u.step, e.time.minutes = e.time.minutes < 10 ? "0" + e.time.minutes : e.time.minutes
                }, e.changeMeridian = function () {
                    e.time.meridian = "AM" === e.time.meridian ? "PM" : "AM"
                }, i.on("click", function () {
                    e.inputObj.inputEpochTime && (m = new Date(1e3 * e.inputObj.inputEpochTime)), 12 == u.format ? (e.time.meridian = m.getUTCHours() >= 12 ? "PM" : "AM", e.time.hours = m.getUTCHours() > 12 ? m.getUTCHours() - 12 : m.getUTCHours(), e.time.minutes = m.getUTCMinutes(), e.time.hours = e.time.hours < 10 ? "0" + e.time.hours : e.time.hours, e.time.minutes = e.time.minutes < 10 ? "0" + e.time.minutes : e.time.minutes, 0 == e.time.hours && "AM" == e.time.meridian && (e.time.hours = 12), t.show({
                        templateUrl: "ionic-timepicker-12-hour.html",
                        title: e.titleLabel,
                        subTitle: "",
                        scope: e,
                        buttons: [{
                            text: e.closeLabel, type: e.closeButtonType, onTap: function (t) {
                                e.inputObj.callback(void 0)
                            }
                        }, {
                            text: e.setLabel, type: e.setButtonType, onTap: function (t) {
                                e.loadingContent = !0;
                                var i = 0;
                                i = 12 != e.time.hours ? 60 * e.time.hours * 60 + 60 * e.time.minutes : 60 * e.time.minutes, "AM" === e.time.meridian ? i += 0 : "PM" === e.time.meridian && (i += 43200), e.etime = i, e.inputObj.callback(e.etime)
                            }
                        }]
                    })) : 24 == u.format && (e.time.hours = m.getUTCHours(), e.time.minutes = m.getUTCMinutes(), e.time.hours = e.time.hours < 10 ? "0" + e.time.hours : e.time.hours, e.time.minutes = e.time.minutes < 10 ? "0" + e.time.minutes : e.time.minutes, t.show({
                        templateUrl: "ionic-timepicker-24-hour.html",
                        title: e.titleLabel,
                        subTitle: "",
                        scope: e,
                        buttons: [{
                            text: e.closeLabel, type: e.closeButtonType, onTap: function (t) {
                                e.inputObj.callback(void 0)
                            }
                        }, {
                            text: e.setLabel, type: e.setButtonType, onTap: function (t) {
                                e.loadingContent = !0;
                                var i = 0;
                                i = 24 != e.time.hours ? 60 * e.time.hours * 60 + 60 * e.time.minutes : 60 * e.time.minutes, e.etime = i, e.inputObj.callback(e.etime)
                            }
                        }]
                    }))
                })
            }
        }
    }

    angular.module("ionic-timepicker").directive("ionicTimepicker", t), t.$inject = ["$ionicPopup"]
}();
/**
 * Create by Aaron Yuan on 8/28/2015
 */
var missfresh;
(function (missfresh) {
    'use strict';
    var tipDom = null, msgDom = null, timeTag = null;
    var timeValue = {
        'ex_short': 500,
        'short': 1000,
        'long': 3000
    };
    var Toast = (function () {
        function Toast() {
        }

        Toast.prototype.show = function (message, duration, position) {
            this._createDialog(message, position || 'center');
            if (tipDom.style.display == 'block') {
                clearTimeout(timeTag);
                this._close(duration || 'short');
                return null;
            }
            tipDom.style.display = "block";
            this._close(duration || 'short');
        };
        Toast.prototype.showExShortTop = function (message) {
            this.show(message, "ex_short", "top");
        };
        Toast.prototype.showExShortCenter = function (message) {
            this.show(message, "ex_short", "center");
        };
        Toast.prototype.showExShortBottom = function (message) {
            this.show(message, "ex_short", "bottom");
        };
        Toast.prototype.showShortTop = function (message) {
            this.show(message, "short", "top");
        };
        Toast.prototype.showShortCenter = function (message) {
            this.show(message, "short", "center");
        };
        Toast.prototype.showShortBottom = function (message) {
            this.show(message, "short", "bottom");
        };
        Toast.prototype.showLongTop = function (message) {
            this.show(message, "long", "top");
        };
        Toast.prototype.showLongCenter = function (message) {
            this.show(message, "long", "center");
        };
        Toast.prototype.showLongBottom = function (message) {
            this.show(message, "long", "bottom");
        };
        Toast.prototype._createDialog = function (message, position) {
            if (!tipDom) {
                tipDom = document.createElement('div');
                tipDom.classList.add('toastWrap');
                tipDom.style.display = 'none';
                msgDom = document.createElement('span');
                tipDom.appendChild(msgDom);
                document.body.appendChild(tipDom);
            }
            msgDom.innerHTML = message;
            var p = this._initPostion(position);
            if (p.top > -1) {
                tipDom.style.top = p.top + 'px';
            }
            if (p.left > -1) {
                tipDom.style.left = p.left + 'px';
            }
        };
        Toast.prototype._close = function (duration) {
            timeTag = setTimeout(function () {
                tipDom.style.display = 'none';
            }, timeValue[duration]);
        };
        Toast.prototype._replace = function (data) {
            return '';
        };
        Toast.prototype._initPostion = function (pos) {
            var height = window.innerHeight, point = {top: -1, left: -1}, width = window.innerWidth;
            switch (pos) {
                case 'top':
                    point.top = 10;
                    break;
                case 'bottom':
                    point.top = height - 30;
                    break;
                case 'center':
                default:
                    point.top = height / 2 - 15;
                    break;
            }
            return point;
        };
        return Toast;
    })();
    window.plugins = window.plugins || {};
    window.plugins.toast = new Toast();
})(missfresh || (missfresh = {}));
//# sourceMappingURL=toast.js.map
/*! ng-clip 16-12-2014 */
!function(a,b){"use strict";b.module("ngClipboard",[]).provider("ngClip",function(){var a=this;return this.path="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf",{setPath:function(b){a.path=b},setConfig:function(b){a.config=b},$get:function(){return{path:a.path,config:a.config}}}}).run(["ngClip",function(a){var c={swfPath:a.path,trustedDomains:["*"],allowScriptAccess:"always",forceHandCursor:!0};ZeroClipboard.config(b.extend(c,a.config||{}))}]).directive("clipCopy",["ngClip",function(){return{scope:{clipCopy:"&",clipClick:"&",clipClickFallback:"&"},restrict:"A",link:function(a,c,d){if(ZeroClipboard.isFlashUnusable())return void c.bind("click",function(b){a.$apply(a.clipClickFallback({$event:b,copy:a.$eval(a.clipCopy)}))});var e=new ZeroClipboard(c);""===d.clipCopy&&(a.clipCopy=function(){return c[0].previousElementSibling.innerText}),e.on("ready",function(){e.on("copy",function(b){var c=b.clipboardData;c.setData(d.clipCopyMimeType||"text/plain",a.$eval(a.clipCopy))}),e.on("aftercopy",function(){b.isDefined(d.clipClick)&&a.$apply(a.clipClick)}),a.$on("$destroy",function(){e.destroy()})})}}}])}(window,window.angular);
/*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2009-2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.2.0
 */
!function(a,b){"use strict";var c,d,e,f=a,g=f.document,h=f.navigator,i=f.setTimeout,j=f.clearTimeout,k=f.setInterval,l=f.clearInterval,m=f.getComputedStyle,n=f.encodeURIComponent,o=f.ActiveXObject,p=f.Error,q=f.Number.parseInt||f.parseInt,r=f.Number.parseFloat||f.parseFloat,s=f.Number.isNaN||f.isNaN,t=f.Date.now,u=f.Object.keys,v=f.Object.defineProperty,w=f.Object.prototype.hasOwnProperty,x=f.Array.prototype.slice,y=function(){var a=function(a){return a};if("function"==typeof f.wrap&&"function"==typeof f.unwrap)try{var b=g.createElement("div"),c=f.unwrap(b);1===b.nodeType&&c&&1===c.nodeType&&(a=f.unwrap)}catch(d){}return a}(),z=function(a){return x.call(a,0)},A=function(){var a,c,d,e,f,g,h=z(arguments),i=h[0]||{};for(a=1,c=h.length;c>a;a++)if(null!=(d=h[a]))for(e in d)w.call(d,e)&&(f=i[e],g=d[e],i!==g&&g!==b&&(i[e]=g));return i},B=function(a){var b,c,d,e;if("object"!=typeof a||null==a||"number"==typeof a.nodeType)b=a;else if("number"==typeof a.length)for(b=[],c=0,d=a.length;d>c;c++)w.call(a,c)&&(b[c]=B(a[c]));else{b={};for(e in a)w.call(a,e)&&(b[e]=B(a[e]))}return b},C=function(a,b){for(var c={},d=0,e=b.length;e>d;d++)b[d]in a&&(c[b[d]]=a[b[d]]);return c},D=function(a,b){var c={};for(var d in a)-1===b.indexOf(d)&&(c[d]=a[d]);return c},E=function(a){if(a)for(var b in a)w.call(a,b)&&delete a[b];return a},F=function(a,b){if(a&&1===a.nodeType&&a.ownerDocument&&b&&(1===b.nodeType&&b.ownerDocument&&b.ownerDocument===a.ownerDocument||9===b.nodeType&&!b.ownerDocument&&b===a.ownerDocument))do{if(a===b)return!0;a=a.parentNode}while(a);return!1},G=function(a){var b;return"string"==typeof a&&a&&(b=a.split("#")[0].split("?")[0],b=a.slice(0,a.lastIndexOf("/")+1)),b},H=function(a){var b,c;return"string"==typeof a&&a&&(c=a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]?b=c[1]:(c=a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/),c&&c[1]&&(b=c[1]))),b},I=function(){var a,b;try{throw new p}catch(c){b=c}return b&&(a=b.sourceURL||b.fileName||H(b.stack)),a},J=function(){var a,c,d;if(g.currentScript&&(a=g.currentScript.src))return a;if(c=g.getElementsByTagName("script"),1===c.length)return c[0].src||b;if("readyState"in c[0])for(d=c.length;d--;)if("interactive"===c[d].readyState&&(a=c[d].src))return a;return"loading"===g.readyState&&(a=c[c.length-1].src)?a:(a=I())?a:b},K=function(){var a,c,d,e=g.getElementsByTagName("script");for(a=e.length;a--;){if(!(d=e[a].src)){c=null;break}if(d=G(d),null==c)c=d;else if(c!==d){c=null;break}}return c||b},L=function(){var a=G(J())||K()||"";return a+"ZeroClipboard.swf"},M=function(){return null==a.opener&&(!!a.top&&a!=a.top||!!a.parent&&a!=a.parent)}(),N={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,sandboxed:null,unavailable:null,degraded:null,deactivated:null,overdue:null,ready:null},O="11.0.0",P={},Q={},R=null,S=0,T=0,U={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-sandboxed":"Attempting to run Flash in a sandboxed iframe, which is impossible","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-degraded":"Flash is unable to preserve data fidelity when communicating with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.","flash-overdue":"Flash communication was established but NOT within the acceptable time limit","version-mismatch":"ZeroClipboard JS version number does not match ZeroClipboard SWF version number","clipboard-error":"At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard","config-mismatch":"ZeroClipboard configuration does not match Flash's reality","swf-not-found":"The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity"}},V=["flash-unavailable","flash-degraded","flash-overdue","version-mismatch","config-mismatch","clipboard-error"],W=["flash-disabled","flash-outdated","flash-sandboxed","flash-unavailable","flash-degraded","flash-deactivated","flash-overdue"],X=new RegExp("^flash-("+W.map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Y=new RegExp("^flash-("+W.slice(1).map(function(a){return a.replace(/^flash-/,"")}).join("|")+")$"),Z={swfPath:L(),trustedDomains:a.location.host?[a.location.host]:[],cacheBust:!0,forceEnhancedClipboard:!1,flashLoadTimeout:3e4,autoActivate:!0,bubbleEvents:!0,containerId:"global-zeroclipboard-html-bridge",containerClass:"global-zeroclipboard-container",swfObjectId:"global-zeroclipboard-flash-bridge",hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",forceHandCursor:!1,title:null,zIndex:999999999},$=function(a){if("object"==typeof a&&null!==a)for(var b in a)if(w.call(a,b))if(/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b))Z[b]=a[b];else if(null==N.bridge)if("containerId"===b||"swfObjectId"===b){if(!nb(a[b]))throw new Error("The specified `"+b+"` value is not valid as an HTML4 Element ID");Z[b]=a[b]}else Z[b]=a[b];{if("string"!=typeof a||!a)return B(Z);if(w.call(Z,a))return Z[a]}},_=function(){return Tb(),{browser:C(h,["userAgent","platform","appName"]),flash:D(N,["bridge"]),zeroclipboard:{version:Vb.version,config:Vb.config()}}},ab=function(){return!!(N.disabled||N.outdated||N.sandboxed||N.unavailable||N.degraded||N.deactivated)},bb=function(a,d){var e,f,g,h={};if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&Vb.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,P[a]||(P[a]=[]),P[a].push(d);if(h.ready&&N.ready&&Vb.emit({type:"ready"}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]===!0){Vb.emit({type:"error",name:W[e]});break}c!==b&&Vb.version!==c&&Vb.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return Vb},cb=function(a,b){var c,d,e,f,g;if(0===arguments.length)f=u(P);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&Vb.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=P[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return Vb},db=function(a){var b;return b="string"==typeof a&&a?B(P[a])||null:B(P)},eb=function(a){var b,c,d;return a=ob(a),a&&!vb(a)?"ready"===a.type&&N.overdue===!0?Vb.emit({type:"error",name:"flash-overdue"}):(b=A({},a),tb.call(this,b),"copy"===a.type&&(d=Db(Q),c=d.data,R=d.formatMap),c):void 0},fb=function(){var a=N.sandboxed;if(Tb(),"boolean"!=typeof N.ready&&(N.ready=!1),N.sandboxed!==a&&N.sandboxed===!0)N.ready=!1,Vb.emit({type:"error",name:"flash-sandboxed"});else if(!Vb.isFlashUnusable()&&null===N.bridge){var b=Z.flashLoadTimeout;"number"==typeof b&&b>=0&&(S=i(function(){"boolean"!=typeof N.deactivated&&(N.deactivated=!0),N.deactivated===!0&&Vb.emit({type:"error",name:"flash-deactivated"})},b)),N.overdue=!1,Bb()}},gb=function(){Vb.clearData(),Vb.blur(),Vb.emit("destroy"),Cb(),Vb.off()},hb=function(a,b){var c;if("object"==typeof a&&a&&"undefined"==typeof b)c=a,Vb.clearData();else{if("string"!=typeof a||!a)return;c={},c[a]=b}for(var d in c)"string"==typeof d&&d&&w.call(c,d)&&"string"==typeof c[d]&&c[d]&&(Q[d]=c[d])},ib=function(a){"undefined"==typeof a?(E(Q),R=null):"string"==typeof a&&w.call(Q,a)&&delete Q[a]},jb=function(a){return"undefined"==typeof a?B(Q):"string"==typeof a&&w.call(Q,a)?Q[a]:void 0},kb=function(a){if(a&&1===a.nodeType){d&&(Lb(d,Z.activeClass),d!==a&&Lb(d,Z.hoverClass)),d=a,Kb(a,Z.hoverClass);var b=a.getAttribute("title")||Z.title;if("string"==typeof b&&b){var c=Ab(N.bridge);c&&c.setAttribute("title",b)}var e=Z.forceHandCursor===!0||"pointer"===Mb(a,"cursor");Rb(e),Qb()}},lb=function(){var a=Ab(N.bridge);a&&(a.removeAttribute("title"),a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px"),d&&(Lb(d,Z.hoverClass),Lb(d,Z.activeClass),d=null)},mb=function(){return d||null},nb=function(a){return"string"==typeof a&&a&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)},ob=function(a){var b;if("string"==typeof a&&a?(b=a,a={}):"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(b=a.type),b){b=b.toLowerCase(),!a.target&&(/^(copy|aftercopy|_click)$/.test(b)||"error"===b&&"clipboard-error"===a.name)&&(a.target=e),A(a,{type:b,target:a.target||d||null,relatedTarget:a.relatedTarget||null,currentTarget:N&&N.bridge||null,timeStamp:a.timeStamp||t()||null});var c=U[a.type];return"error"===a.type&&a.name&&c&&(c=c[a.name]),c&&(a.message=c),"ready"===a.type&&A(a,{target:null,version:N.version}),"error"===a.type&&(X.test(a.name)&&A(a,{target:null,minimumVersion:O}),Y.test(a.name)&&A(a,{version:N.version})),"copy"===a.type&&(a.clipboardData={setData:Vb.setData,clearData:Vb.clearData}),"aftercopy"===a.type&&(a=Eb(a,R)),a.target&&!a.relatedTarget&&(a.relatedTarget=pb(a.target)),qb(a)}},pb=function(a){var b=a&&a.getAttribute&&a.getAttribute("data-clipboard-target");return b?g.getElementById(b):null},qb=function(a){if(a&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)){var c=a.target,d="_mouseover"===a.type&&a.relatedTarget?a.relatedTarget:b,e="_mouseout"===a.type&&a.relatedTarget?a.relatedTarget:b,h=Nb(c),i=f.screenLeft||f.screenX||0,j=f.screenTop||f.screenY||0,k=g.body.scrollLeft+g.documentElement.scrollLeft,l=g.body.scrollTop+g.documentElement.scrollTop,m=h.left+("number"==typeof a._stageX?a._stageX:0),n=h.top+("number"==typeof a._stageY?a._stageY:0),o=m-k,p=n-l,q=i+o,r=j+p,s="number"==typeof a.movementX?a.movementX:0,t="number"==typeof a.movementY?a.movementY:0;delete a._stageX,delete a._stageY,A(a,{srcElement:c,fromElement:d,toElement:e,screenX:q,screenY:r,pageX:m,pageY:n,clientX:o,clientY:p,x:o,y:p,movementX:s,movementY:t,offsetX:0,offsetY:0,layerX:0,layerY:0})}return a},rb=function(a){var b=a&&"string"==typeof a.type&&a.type||"";return!/^(?:(?:before)?copy|destroy)$/.test(b)},sb=function(a,b,c,d){d?i(function(){a.apply(b,c)},0):a.apply(b,c)},tb=function(a){if("object"==typeof a&&a&&a.type){var b=rb(a),c=P["*"]||[],d=P[a.type]||[],e=c.concat(d);if(e&&e.length){var g,h,i,j,k,l=this;for(g=0,h=e.length;h>g;g++)i=e[g],j=l,"string"==typeof i&&"function"==typeof f[i]&&(i=f[i]),"object"==typeof i&&i&&"function"==typeof i.handleEvent&&(j=i,i=i.handleEvent),"function"==typeof i&&(k=A({},a),sb(i,j,[k],b))}return this}},ub=function(a){var b=null;return(M===!1||a&&"error"===a.type&&a.name&&-1!==V.indexOf(a.name))&&(b=!1),b},vb=function(a){var b=a.target||d||null,f="swf"===a._source;switch(delete a._source,a.type){case"error":var g="flash-sandboxed"===a.name||ub(a);"boolean"==typeof g&&(N.sandboxed=g),-1!==W.indexOf(a.name)?A(N,{disabled:"flash-disabled"===a.name,outdated:"flash-outdated"===a.name,unavailable:"flash-unavailable"===a.name,degraded:"flash-degraded"===a.name,deactivated:"flash-deactivated"===a.name,overdue:"flash-overdue"===a.name,ready:!1}):"version-mismatch"===a.name&&(c=a.swfVersion,A(N,{disabled:!1,outdated:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:!1,ready:!1})),Pb();break;case"ready":c=a.swfVersion;var h=N.deactivated===!0;A(N,{disabled:!1,outdated:!1,sandboxed:!1,unavailable:!1,degraded:!1,deactivated:!1,overdue:h,ready:!h}),Pb();break;case"beforecopy":e=b;break;case"copy":var i,j,k=a.relatedTarget;!Q["text/html"]&&!Q["text/plain"]&&k&&(j=k.value||k.outerHTML||k.innerHTML)&&(i=k.value||k.textContent||k.innerText)?(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i),j!==i&&a.clipboardData.setData("text/html",j)):!Q["text/plain"]&&a.target&&(i=a.target.getAttribute("data-clipboard-text"))&&(a.clipboardData.clearData(),a.clipboardData.setData("text/plain",i));break;case"aftercopy":wb(a),Vb.clearData(),b&&b!==Jb()&&b.focus&&b.focus();break;case"_mouseover":Vb.focus(b),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseenter",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseover"})));break;case"_mouseout":Vb.blur(),Z.bubbleEvents===!0&&f&&(b&&b!==a.relatedTarget&&!F(a.relatedTarget,b)&&xb(A({},a,{type:"mouseleave",bubbles:!1,cancelable:!1})),xb(A({},a,{type:"mouseout"})));break;case"_mousedown":Kb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mouseup":Lb(b,Z.activeClass),Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_click":e=null,Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}));break;case"_mousemove":Z.bubbleEvents===!0&&f&&xb(A({},a,{type:a.type.slice(1)}))}return/^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)?!0:void 0},wb=function(a){if(a.errors&&a.errors.length>0){var b=B(a);A(b,{type:"error",name:"clipboard-error"}),delete b.success,i(function(){Vb.emit(b)},0)}},xb=function(a){if(a&&"string"==typeof a.type&&a){var b,c=a.target||null,d=c&&c.ownerDocument||g,e={view:d.defaultView||f,canBubble:!0,cancelable:!0,detail:"click"===a.type?1:0,button:"number"==typeof a.which?a.which-1:"number"==typeof a.button?a.button:d.createEvent?0:1},h=A(e,a);c&&d.createEvent&&c.dispatchEvent&&(h=[h.type,h.canBubble,h.cancelable,h.view,h.detail,h.screenX,h.screenY,h.clientX,h.clientY,h.ctrlKey,h.altKey,h.shiftKey,h.metaKey,h.button,h.relatedTarget],b=d.createEvent("MouseEvents"),b.initMouseEvent&&(b.initMouseEvent.apply(b,h),b._source="js",c.dispatchEvent(b)))}},yb=function(){var a=Z.flashLoadTimeout;if("number"==typeof a&&a>=0){var b=Math.min(1e3,a/10),c=Z.swfObjectId+"_fallbackContent";T=k(function(){var a=g.getElementById(c);Ob(a)&&(Pb(),N.deactivated=null,Vb.emit({type:"error",name:"swf-not-found"}))},b)}},zb=function(){var a=g.createElement("div");return a.id=Z.containerId,a.className=Z.containerClass,a.style.position="absolute",a.style.left="0px",a.style.top="-9999px",a.style.width="1px",a.style.height="1px",a.style.zIndex=""+Sb(Z.zIndex),a},Ab=function(a){for(var b=a&&a.parentNode;b&&"OBJECT"===b.nodeName&&b.parentNode;)b=b.parentNode;return b||null},Bb=function(){var a,b=N.bridge,c=Ab(b);if(!b){var d=Ib(f.location.host,Z),e="never"===d?"none":"all",h=Gb(A({jsVersion:Vb.version},Z)),i=Z.swfPath+Fb(Z.swfPath,Z);c=zb();var j=g.createElement("div");c.appendChild(j),g.body.appendChild(c);var k=g.createElement("div"),l="activex"===N.pluginType;k.innerHTML='<object id="'+Z.swfObjectId+'" name="'+Z.swfObjectId+'" width="100%" height="100%" '+(l?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+i+'"')+">"+(l?'<param name="movie" value="'+i+'"/>':"")+'<param name="allowScriptAccess" value="'+d+'"/><param name="allowNetworking" value="'+e+'"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="'+h+'"/><div id="'+Z.swfObjectId+'_fallbackContent">&nbsp;</div></object>',b=k.firstChild,k=null,y(b).ZeroClipboard=Vb,c.replaceChild(b,j),yb()}return b||(b=g[Z.swfObjectId],b&&(a=b.length)&&(b=b[a-1]),!b&&c&&(b=c.firstChild)),N.bridge=b||null,b},Cb=function(){var a=N.bridge;if(a){var d=Ab(a);d&&("activex"===N.pluginType&&"readyState"in a?(a.style.display="none",function e(){if(4===a.readyState){for(var b in a)"function"==typeof a[b]&&(a[b]=null);a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d)}else i(e,10)}()):(a.parentNode&&a.parentNode.removeChild(a),d.parentNode&&d.parentNode.removeChild(d))),Pb(),N.ready=null,N.bridge=null,N.deactivated=null,c=b}},Db=function(a){var b={},c={};if("object"==typeof a&&a){for(var d in a)if(d&&w.call(a,d)&&"string"==typeof a[d]&&a[d])switch(d.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":b.text=a[d],c.text=d;break;case"text/html":case"html":case"air:html":case"flash:html":b.html=a[d],c.html=d;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":b.rtf=a[d],c.rtf=d}return{data:b,formatMap:c}}},Eb=function(a,b){if("object"!=typeof a||!a||"object"!=typeof b||!b)return a;var c={};for(var d in a)if(w.call(a,d))if("errors"===d){c[d]=a[d]?a[d].slice():[];for(var e=0,f=c[d].length;f>e;e++)c[d][e].format=b[c[d][e].format]}else if("success"!==d&&"data"!==d)c[d]=a[d];else{c[d]={};var g=a[d];for(var h in g)h&&w.call(g,h)&&w.call(b,h)&&(c[d][b[h]]=g[h])}return c},Fb=function(a,b){var c=null==b||b&&b.cacheBust===!0;return c?(-1===a.indexOf("?")?"?":"&")+"noCache="+t():""},Gb=function(a){var b,c,d,e,g="",h=[];if(a.trustedDomains&&("string"==typeof a.trustedDomains?e=[a.trustedDomains]:"object"==typeof a.trustedDomains&&"length"in a.trustedDomains&&(e=a.trustedDomains)),e&&e.length)for(b=0,c=e.length;c>b;b++)if(w.call(e,b)&&e[b]&&"string"==typeof e[b]){if(d=Hb(e[b]),!d)continue;if("*"===d){h.length=0,h.push(d);break}h.push.apply(h,[d,"//"+d,f.location.protocol+"//"+d])}return h.length&&(g+="trustedOrigins="+n(h.join(","))),a.forceEnhancedClipboard===!0&&(g+=(g?"&":"")+"forceEnhancedClipboard=true"),"string"==typeof a.swfObjectId&&a.swfObjectId&&(g+=(g?"&":"")+"swfObjectId="+n(a.swfObjectId)),"string"==typeof a.jsVersion&&a.jsVersion&&(g+=(g?"&":"")+"jsVersion="+n(a.jsVersion)),g},Hb=function(a){if(null==a||""===a)return null;if(a=a.replace(/^\s+|\s+$/g,""),""===a)return null;var b=a.indexOf("//");a=-1===b?a:a.slice(b+2);var c=a.indexOf("/");return a=-1===c?a:-1===b||0===c?null:a.slice(0,c),a&&".swf"===a.slice(-4).toLowerCase()?null:a||null},Ib=function(){var a=function(a){var b,c,d,e=[];if("string"==typeof a&&(a=[a]),"object"!=typeof a||!a||"number"!=typeof a.length)return e;for(b=0,c=a.length;c>b;b++)if(w.call(a,b)&&(d=Hb(a[b]))){if("*"===d){e.length=0,e.push("*");break}-1===e.indexOf(d)&&e.push(d)}return e};return function(b,c){var d=Hb(c.swfPath);null===d&&(d=b);var e=a(c.trustedDomains),f=e.length;if(f>0){if(1===f&&"*"===e[0])return"always";if(-1!==e.indexOf(b))return 1===f&&b===d?"sameDomain":"always"}return"never"}}(),Jb=function(){try{return g.activeElement}catch(a){return null}},Kb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList)for(c=0,d=f.length;d>c;c++)a.classList.add(f[c]);else if(a.hasOwnProperty("className")){for(e=" "+a.className+" ",c=0,d=f.length;d>c;c++)-1===e.indexOf(" "+f[c]+" ")&&(e+=f[c]+" ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Lb=function(a,b){var c,d,e,f=[];if("string"==typeof b&&b&&(f=b.split(/\s+/)),a&&1===a.nodeType&&f.length>0)if(a.classList&&a.classList.length>0)for(c=0,d=f.length;d>c;c++)a.classList.remove(f[c]);else if(a.className){for(e=(" "+a.className+" ").replace(/[\r\n\t]/g," "),c=0,d=f.length;d>c;c++)e=e.replace(" "+f[c]+" "," ");a.className=e.replace(/^\s+|\s+$/g,"")}return a},Mb=function(a,b){var c=m(a,null).getPropertyValue(b);return"cursor"!==b||c&&"auto"!==c||"A"!==a.nodeName?c:"pointer"},Nb=function(a){var b={left:0,top:0,width:0,height:0};if(a.getBoundingClientRect){var c=a.getBoundingClientRect(),d=f.pageXOffset,e=f.pageYOffset,h=g.documentElement.clientLeft||0,i=g.documentElement.clientTop||0,j=0,k=0;if("relative"===Mb(g.body,"position")){var l=g.body.getBoundingClientRect(),m=g.documentElement.getBoundingClientRect();j=l.left-m.left||0,k=l.top-m.top||0}b.left=c.left+d-h-j,b.top=c.top+e-i-k,b.width="width"in c?c.width:c.right-c.left,b.height="height"in c?c.height:c.bottom-c.top}return b},Ob=function(a){if(!a)return!1;var b=m(a,null),c=r(b.height)>0,d=r(b.width)>0,e=r(b.top)>=0,f=r(b.left)>=0,g=c&&d&&e&&f,h=g?null:Nb(a),i="none"!==b.display&&"collapse"!==b.visibility&&(g||!!h&&(c||h.height>0)&&(d||h.width>0)&&(e||h.top>=0)&&(f||h.left>=0));return i},Pb=function(){j(S),S=0,l(T),T=0},Qb=function(){var a;if(d&&(a=Ab(N.bridge))){var b=Nb(d);A(a.style,{width:b.width+"px",height:b.height+"px",top:b.top+"px",left:b.left+"px",zIndex:""+Sb(Z.zIndex)})}},Rb=function(a){N.ready===!0&&(N.bridge&&"function"==typeof N.bridge.setHandCursor?N.bridge.setHandCursor(a):N.ready=!1)},Sb=function(a){if(/^(?:auto|inherit)$/.test(a))return a;var b;return"number"!=typeof a||s(a)?"string"==typeof a&&(b=Sb(q(a,10))):b=a,"number"==typeof b?b:"auto"},Tb=function(b){var c,d,e,f=N.sandboxed,g=null;if(b=b===!0,M===!1)g=!1;else{try{d=a.frameElement||null}catch(h){e={name:h.name,message:h.message}}if(d&&1===d.nodeType&&"IFRAME"===d.nodeName)try{g=d.hasAttribute("sandbox")}catch(h){g=null}else{try{c=document.domain||null}catch(h){c=null}(null===c||e&&"SecurityError"===e.name&&/(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(e.message.toLowerCase()))&&(g=!0)}}return N.sandboxed=g,f===g||b||Ub(o),g},Ub=function(a){function b(a){var b=a.match(/[\d]+/g);return b.length=3,b.join(".")}function c(a){return!!a&&(a=a.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a)||"chrome.plugin"===a.slice(-13))}function d(a){a&&(i=!0,a.version&&(l=b(a.version)),!l&&a.description&&(l=b(a.description)),a.filename&&(k=c(a.filename)))}var e,f,g,i=!1,j=!1,k=!1,l="";if(h.plugins&&h.plugins.length)e=h.plugins["Shockwave Flash"],d(e),h.plugins["Shockwave Flash 2.0"]&&(i=!0,l="2.0.0.11");else if(h.mimeTypes&&h.mimeTypes.length)g=h.mimeTypes["application/x-shockwave-flash"],e=g&&g.enabledPlugin,d(e);else if("undefined"!=typeof a){j=!0;try{f=new a("ShockwaveFlash.ShockwaveFlash.7"),i=!0,l=b(f.GetVariable("$version"))}catch(m){try{f=new a("ShockwaveFlash.ShockwaveFlash.6"),i=!0,l="6.0.21"}catch(n){try{f=new a("ShockwaveFlash.ShockwaveFlash"),i=!0,l=b(f.GetVariable("$version"))}catch(o){j=!1}}}}N.disabled=i!==!0,N.outdated=l&&r(l)<r(O),N.version=l||"0.0.0",N.pluginType=k?"pepper":j?"activex":i?"netscape":"unknown"};Ub(o),Tb(!0);var Vb=function(){return this instanceof Vb?void("function"==typeof Vb._createClient&&Vb._createClient.apply(this,z(arguments))):new Vb};v(Vb,"version",{value:"2.2.0",writable:!1,configurable:!0,enumerable:!0}),Vb.config=function(){return $.apply(this,z(arguments))},Vb.state=function(){return _.apply(this,z(arguments))},Vb.isFlashUnusable=function(){return ab.apply(this,z(arguments))},Vb.on=function(){return bb.apply(this,z(arguments))},Vb.off=function(){return cb.apply(this,z(arguments))},Vb.handlers=function(){return db.apply(this,z(arguments))},Vb.emit=function(){return eb.apply(this,z(arguments))},Vb.create=function(){return fb.apply(this,z(arguments))},Vb.destroy=function(){return gb.apply(this,z(arguments))},Vb.setData=function(){return hb.apply(this,z(arguments))},Vb.clearData=function(){return ib.apply(this,z(arguments))},Vb.getData=function(){return jb.apply(this,z(arguments))},Vb.focus=Vb.activate=function(){return kb.apply(this,z(arguments))},Vb.blur=Vb.deactivate=function(){return lb.apply(this,z(arguments))},Vb.activeElement=function(){return mb.apply(this,z(arguments))};var Wb=0,Xb={},Yb=0,Zb={},$b={};A(Z,{autoActivate:!0});var _b=function(a){var b=this;b.id=""+Wb++,Xb[b.id]={instance:b,elements:[],handlers:{}},a&&b.clip(a),Vb.on("*",function(a){return b.emit(a)}),Vb.on("destroy",function(){b.destroy()}),Vb.create()},ac=function(a,d){var e,f,g,h={},i=Xb[this.id],j=i&&i.handlers;if(!i)throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");if("string"==typeof a&&a)g=a.toLowerCase().split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof d)for(e in a)w.call(a,e)&&"string"==typeof e&&e&&"function"==typeof a[e]&&this.on(e,a[e]);if(g&&g.length){for(e=0,f=g.length;f>e;e++)a=g[e].replace(/^on/,""),h[a]=!0,j[a]||(j[a]=[]),j[a].push(d);if(h.ready&&N.ready&&this.emit({type:"ready",client:this}),h.error){for(e=0,f=W.length;f>e;e++)if(N[W[e].replace(/^flash-/,"")]){this.emit({type:"error",name:W[e],client:this});break}c!==b&&Vb.version!==c&&this.emit({type:"error",name:"version-mismatch",jsVersion:Vb.version,swfVersion:c})}}return this},bc=function(a,b){var c,d,e,f,g,h=Xb[this.id],i=h&&h.handlers;if(!i)return this;if(0===arguments.length)f=u(i);else if("string"==typeof a&&a)f=a.split(/\s+/);else if("object"==typeof a&&a&&"undefined"==typeof b)for(c in a)w.call(a,c)&&"string"==typeof c&&c&&"function"==typeof a[c]&&this.off(c,a[c]);if(f&&f.length)for(c=0,d=f.length;d>c;c++)if(a=f[c].toLowerCase().replace(/^on/,""),g=i[a],g&&g.length)if(b)for(e=g.indexOf(b);-1!==e;)g.splice(e,1),e=g.indexOf(b,e);else g.length=0;return this},cc=function(a){var b=null,c=Xb[this.id]&&Xb[this.id].handlers;return c&&(b="string"==typeof a&&a?c[a]?c[a].slice(0):[]:B(c)),b},dc=function(a){if(ic.call(this,a)){"object"==typeof a&&a&&"string"==typeof a.type&&a.type&&(a=A({},a));var b=A({},ob(a),{client:this});jc.call(this,b)}return this},ec=function(a){if(!Xb[this.id])throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");a=kc(a);for(var b=0;b<a.length;b++)if(w.call(a,b)&&a[b]&&1===a[b].nodeType){a[b].zcClippingId?-1===Zb[a[b].zcClippingId].indexOf(this.id)&&Zb[a[b].zcClippingId].push(this.id):(a[b].zcClippingId="zcClippingId_"+Yb++,Zb[a[b].zcClippingId]=[this.id],Z.autoActivate===!0&&lc(a[b]));var c=Xb[this.id]&&Xb[this.id].elements;-1===c.indexOf(a[b])&&c.push(a[b])}return this},fc=function(a){var b=Xb[this.id];if(!b)return this;var c,d=b.elements;a="undefined"==typeof a?d.slice(0):kc(a);for(var e=a.length;e--;)if(w.call(a,e)&&a[e]&&1===a[e].nodeType){for(c=0;-1!==(c=d.indexOf(a[e],c));)d.splice(c,1);var f=Zb[a[e].zcClippingId];if(f){for(c=0;-1!==(c=f.indexOf(this.id,c));)f.splice(c,1);0===f.length&&(Z.autoActivate===!0&&mc(a[e]),delete a[e].zcClippingId)}}return this},gc=function(){var a=Xb[this.id];return a&&a.elements?a.elements.slice(0):[]},hc=function(){Xb[this.id]&&(this.unclip(),this.off(),delete Xb[this.id])},ic=function(a){if(!a||!a.type)return!1;if(a.client&&a.client!==this)return!1;var b=Xb[this.id],c=b&&b.elements,d=!!c&&c.length>0,e=!a.target||d&&-1!==c.indexOf(a.target),f=a.relatedTarget&&d&&-1!==c.indexOf(a.relatedTarget),g=a.client&&a.client===this;return b&&(e||f||g)?!0:!1},jc=function(a){var b=Xb[this.id];if("object"==typeof a&&a&&a.type&&b){var c=rb(a),d=b&&b.handlers["*"]||[],e=b&&b.handlers[a.type]||[],g=d.concat(e);if(g&&g.length){var h,i,j,k,l,m=this;for(h=0,i=g.length;i>h;h++)j=g[h],k=m,"string"==typeof j&&"function"==typeof f[j]&&(j=f[j]),"object"==typeof j&&j&&"function"==typeof j.handleEvent&&(k=j,j=j.handleEvent),"function"==typeof j&&(l=A({},a),sb(j,k,[l],c))}}},kc=function(a){return"string"==typeof a&&(a=[]),"number"!=typeof a.length?[a]:a},lc=function(a){if(a&&1===a.nodeType){var b=function(a){(a||(a=f.event))&&("js"!==a._source&&(a.stopImmediatePropagation(),a.preventDefault()),delete a._source)},c=function(c){(c||(c=f.event))&&(b(c),Vb.focus(a))};a.addEventListener("mouseover",c,!1),a.addEventListener("mouseout",b,!1),a.addEventListener("mouseenter",b,!1),a.addEventListener("mouseleave",b,!1),a.addEventListener("mousemove",b,!1),$b[a.zcClippingId]={mouseover:c,mouseout:b,mouseenter:b,mouseleave:b,mousemove:b}}},mc=function(a){if(a&&1===a.nodeType){var b=$b[a.zcClippingId];if("object"==typeof b&&b){for(var c,d,e=["move","leave","enter","out","over"],f=0,g=e.length;g>f;f++)c="mouse"+e[f],d=b[c],"function"==typeof d&&a.removeEventListener(c,d,!1);delete $b[a.zcClippingId]}}};Vb._createClient=function(){_b.apply(this,z(arguments))},Vb.prototype.on=function(){return ac.apply(this,z(arguments))},Vb.prototype.off=function(){return bc.apply(this,z(arguments))},Vb.prototype.handlers=function(){return cc.apply(this,z(arguments))},Vb.prototype.emit=function(){return dc.apply(this,z(arguments))},Vb.prototype.clip=function(){return ec.apply(this,z(arguments))},Vb.prototype.unclip=function(){return fc.apply(this,z(arguments))},Vb.prototype.elements=function(){return gc.apply(this,z(arguments))},Vb.prototype.destroy=function(){return hc.apply(this,z(arguments))},Vb.prototype.setText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/plain",a),this},Vb.prototype.setHtml=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("text/html",a),this},Vb.prototype.setRichText=function(a){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData("application/rtf",a),this},Vb.prototype.setData=function(){if(!Xb[this.id])throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.setData.apply(this,z(arguments)),this},Vb.prototype.clearData=function(){if(!Xb[this.id])throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.clearData.apply(this,z(arguments)),this},Vb.prototype.getData=function(){if(!Xb[this.id])throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");return Vb.getData.apply(this,z(arguments))},"function"==typeof define&&define.amd?define(function(){return Vb}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports?module.exports=Vb:a.ZeroClipboard=Vb}(function(){return this||window}());

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'VKHttp', 'ngFileUpload','ngClipboard'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function (ngClipProvider, $stateProvider, $urlRouterProvider,$ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');
        ngClipProvider.setPath('../lib/ng-clip/ZeroClipboard.swf');
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppController'
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent': {
                        templateUrl: "templates/home.html",
                        controller: 'HomeController'
                    }
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.chatlist', {
                url: "/chatlist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chatlists.html",
                        controller: 'ChatListsController'
                    }
                }
            })

            .state('app.chat-datail', {
                url: "/chatlist/:chatId/:chatName",
                views: {
                    'menuContent': {
                        templateUrl: "templates/chat-detail.html",
                        controller: 'ChatDatailController'
                    }
                }
            })
            .state('login', {
                url: "/login",

                templateUrl: "templates/login.html",
                controller: 'LoginController'
            })
            .state('app.eventlist', {
                url: "/home/:eventtype",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eventlist.html",
                        controller: 'EventListController'
                    }
                }
            })
            .state('app.eventdetail', {
                url: "/eventlist/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eventdetail.html",
                        controller: 'EventDetailController'
                    }
                }
            })
            .state('app.activity', {
                url: "/activity",
                views: {
                    'menuContent': {
                        templateUrl: "templates/activitylist.html",
                        controller: 'ActivityController'
                    }
                }
            })

            .state('app.schoolmatelist', {
                url: "/schoolmatelist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/schoolmatelist.html",
                        controller: 'SchoolmateListsController'
                    }
                }
            })
            .state('app.schoolmate-detail', {
                url: "/schoolmatelist/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/schoolmate-detail.html",
                        controller: 'SchoolmateDetailController'
                    }
                }
            })
            .state('app.setting', {
                url: "/setting",
                views: {
                    'menuContent': {
                        templateUrl: "templates/setting.html",
                        controller: 'SettingController'
                    }
                }
            })
            .state('app.person', {
                url: "/person",
                views: {
                    'menuContent': {
                        templateUrl: "templates/person.html",
                        controller: 'PersonController'
                    }
                }
            })
            .state('app.minegroup', {
                url: "/minegroup",
                views: {
                    'menuContent': {
                        templateUrl: "templates/minegrouplist.html",
                        controller: 'MineGroupListController'
                    }
                }
            })
            .state('app.minegroupdetail', {
                url: "/minegroup/:id/:title",
                views: {
                    'menuContent': {
                        templateUrl: "templates/minegroupdetail.html",
                        controller: 'MineGroupDetailController'
                    }
                }
            })
            .state('app.allgrouplist', {
                url: "/allgrouplist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/allgrouplist.html",
                        controller: 'AllGroupListController'
                    }
                }
            })
            .state('app.groupinfo', {
                url: "/allgrouplist/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/groupinfo.html",
                        controller: 'GroupInfoController'
                    }
                }
            })
            .state('app.releaseevent', {
                url: "/releaseevent",
                views: {
                    'menuContent': {
                        templateUrl: "templates/releaseevent.html",
                        controller: 'ReleaseEventController'
                    }
                }
            })
            .state('app.releaseactivity', {
                url: "/releaseactivity",
                views: {
                    'menuContent': {
                        templateUrl: "templates/releaseactivity.html",
                        controller: 'ReleaseActivityController'
                    }
                }
            })
            .state('app.activitydetail', {
                url: "/activity/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/activitydetail.html",
                        controller: 'ActivityDetailController'
                    }
                }
            })
            .state('app.activitymyjoin', {
                url: "/setting/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/activitymyjoin.html",
                        controller: 'ActivityMyJoinController'
                    }
                }
            })
            .state('app.eventmyreleaselist', {
                url: "/eventmyreleaselist",
                views: {
                    'menuContent': {
                        templateUrl: "templates/eventmyreleaselist.html",
                        controller: 'EventMyReleaseListController'
                    }
                }
            })
            .state('app.invite', {
                url: "/invite",
                views: {
                    'menuContent': {
                        templateUrl: "templates/invite.html",
                        controller: 'InviteOthersController'

                    }
                }
            })
            .state('app.changephone', {
                url: "/changephone/:phone",
                views: {
                    'menuContent': {
                        templateUrl: "templates/changephone.html",
                        controller: 'ChangepPhoneController'
                    }
                }
            })
            .state('app.report', {
                url: "/report/:id/:title/:type",
                views: {
                    'menuContent': {
                        templateUrl: "templates/report.html",
                        controller: 'ReportController'

                    }
                }
            })
            .state('app.menu', {
                url: "/menu",
                views: {
                    'menuContent': {
                        //templateUrl: "menu.html",
                        controller: 'MenuController'

                    }
                }
            })
            .state('app.member', {
                url: "/member/:id",
                views: {
                    'menuContent': {
                        templateUrl: "templates/activitymember.html",
                        controller: 'ActivityMemberController'

                    }
                }
            })
        ;

// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
//  $urlRouterProvider.otherwise('/login');
//        $urlRouterProvider.otherwise('/app/releaseactivity');

    });

angular.module('starter.controllers', ['HomeController', 'AppController', 'EventListController', 'ChatListsController', 'ChatDatailController', 'SchoolmateListsController', 'SchoolmateDetailController', 'SettingController', 'ActivityController', 'PersonController', 'ReleaseEventController', 'LoginController', 'MineGroupListController', 'MineGroupDetailController', 'AllGroupListController', 'GroupInfoController', 'EventDetailController', 'ReleaseEventController', 'ReleaseActivityController', 'ActivityDetailController', 'ActivityMyJoinController', 'EventMyReleaseListController', 'InviteOthersController', 'ChangepPhoneController', 'ReportController', 'MenuController', 'MessageModalCtrl','ActivityMemberController']);

angular.module('starter.services', [])
  .factory('Storage', function() {
    "use strict";
    return {
      set: function(key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function(key) {

        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function(key) {
        return window.localStorage.removeItem(key);
      },
      clear: function() {
        return window.localStorage.clear();
      },
      accessToken: function(key){
        if(key){
          window.localStorage.setItem('access_token',key);
        }else{
          return window.localStorage.getItem('access_token')
        }
      }
    };
  })
  .factory('Chats', function() {
    return {
      connectCallback: function()
      {
        var dfd = $q.defer();

        RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
            switch (status) {
              //链接成功
              case RongIMClient.ConnectionStatus.CONNECTED:
                dfd.resolve("");
                break;
              //正在链接
              case RongIMClient.ConnectionStatus.CONNECTING:
                break;
              //重新链接
              case RongIMClient.ConnectionStatus.RECONNECT:
                break;
              //其他设备登陆
              case RongIMClient.ConnectionStatus.OTHER_DEVICE_LOGIN:
              //连接关闭
              case RongIMClient.ConnectionStatus.CLOSURE:
              //未知错误
              case RongIMClient.ConnectionStatus.UNKNOWN_ERROR:
              //登出
              case RongIMClient.ConnectionStatus.LOGOUT:
              //用户已被封禁
              case RongIMClient.ConnectionStatus.BLOCK:
                break;
            }
          }});

        return dfd.promise;

      }
    };
  })
  .factory('User', function(VKHttp, $state) {

    var stations = [];
    var nearbyStations = [];
    var stationDetail = [];
    return {
      userLogin : function(requestUrl,param,data) {
        return VKHttp.httpPostRequest(requestUrl,param,data).then(function(response){
          return response.data;
        });
      },
      userSendCode : function(requestUrl,param,data) {
        return VKHttp.httpPostRequest(requestUrl,param,data).then(function(response){
          if(response['data'] && response.data.code == '122'){
            window.plugins.toast.showLongCenter('登陆信息过期，请重新登陆');
            $state.go('login');
            return response;
          }else if(response.data.data==""||response.data.data==null||response.data.data==undefined){
            //登陆失败
            return response.data;
          }
          return response.data.data;
        });

      },
      imagePost : function(url,params,imagePath) {
        return VKHttp.httpPostImage(url,params,imagePath).then(function(response){
          if(response.data.data==""||response.data.data==null||response.data.data==undefined){
            return response.data;
          }
          return response.data.data;
        });
      },

      userChangepwd : function(longitude,latitude){
        var param =
        {
          distance:100000,
          longitude:118.063854,//longitude
          latitude:90.031352,//latitude
          page:1
        };
        var requestUrl = 'api/station/nearby?appkey=380a41396ed63dca';
        return VKHttp.postRequest(requestUrl,param).then(function(response){
          nearbyStations = response.data;
          return nearbyStations;
        });
      },
      userRegister : function(stationid){
        var param =
        {
          station_id:stationid,
          page:1
        };
        var requestUrl = 'api/station/detail?appkey=380a41396ed63dca';
        return VKHttp.postRequest(requestUrl,param).then(function(response){
          stationDetail = response.data;
          return stationDetail;
        });
      }
    }
  }).factory('imageUpload', function($q, Upload){
    return {
      upload: function(args, progressFn) {
        var deferred = $q.defer();
        Upload.upload({
          url: "http://205.177.85.238:8088/jdb/mobile/"+args.url,
          fields:args.fields,
          file: args.file
        }).progress(function(evt){
          progressFn && progressFn(evt);
        }).success(function(data,status,header,config){
          deferred.resolve({
            data: data,
            status: status,
            header: header,
            config: config
          });
        }).error(function(data,status,header,config){
          deferred.reject({
            data: data,
            status: status,
            header: header,
            config: config
          })
        });
        return deferred.promise;
      }
    };

  })
;
angular.module("ioniclub.config", [])
    .constant("ENV", {
        // "name": "production",
        "accessToken": '',
        "debug": false,
        "api": "http://ionichina.com/api/v1",
        // "api": "http://localhost:3000/api/v1",
        "appleId": 'id981408438',
        'version':'1.0.1'
    })
;

angular.module('VKHttp', ['starter.services'])
  .config(function($provide,$httpProvider){

    var httpInterceptor = function(Storage){
      return {
        request: function(config){
          config.headers['x-access-token'] = Storage.accessToken();
          return config;
        },
        response: function(response){
          var ak = response.headers('x-access-token');
          Storage.accessToken(ak);
          return response;
        }
      };
    };

    //httpInterceptor.$inject = ['$q'];
    $provide.factory('interceptor', httpInterceptor);
    //
    $httpProvider.interceptors.push('interceptor');

  })
  .factory('VKHttp', function ($http, $rootScope, Storage, Upload) {
//      var server_domain = "http://205.177.85.238:8080/jdb/mobile/";
      var server_domain = "http://192.168.0.100:8000/jdb/mobile/";

      $rootScope.server_pic = server_domain + "image/showimage?picpath=";
      $rootScope.headPicPath = "";

      return {
          postRequest: function (url, bodyjson) {
              var requestUrl = server_domain + url;
              return $http.post(requestUrl, bodyjson).then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
          },
          getRequest: function (url) {
              var requestUrl = server_domain + url;
              return $http.get(requestUrl, {}).then(function (response) {
                    return response.data;
                },
                function (response) {
                    return response.data;
                });
          },

          httpPostRequest: function (url, param, datas) {
              var requestUrl = server_domain + url;
              return $http({method: 'POST', params: param, data: datas, url: requestUrl})
                  //回调可以不用要
                .success(function (response, status, headers, config) {
                    return response;
                })
                .error(function (response, status, headers, config) {
                    return response;
                });
          },
          httpPostImage: function (url, params, file) {
              var requestUrl = server_domain + url;
              return Upload.upload({
                  url: requestUrl,
                  fields: params,
                  file: file
              }).progress(function (evt) {
              }).success(function (data, status, header, config) {
                  return data;
              }).error(function (data, status, header, config) {
              });
          }
      }
  });


/*! jQuery v1.8.2 jquery.com | jquery.org/license */
(function(a,b){function G(a){var b=F[a]={};return p.each(a.split(s),function(a,c){b[c]=!0}),b}function J(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(I,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:+d+""===d?+d:H.test(d)?p.parseJSON(d):d}catch(f){}p.data(a,c,d)}else d=b}return d}function K(a){var b;for(b in a){if(b==="data"&&p.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function ba(){return!1}function bb(){return!0}function bh(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function bi(a,b){do a=a[b];while(a&&a.nodeType!==1);return a}function bj(a,b,c){b=b||0;if(p.isFunction(b))return p.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return p.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=p.grep(a,function(a){return a.nodeType===1});if(be.test(b))return p.filter(b,d,!c);b=p.filter(b,d)}return p.grep(a,function(a,d){return p.inArray(a,b)>=0===c})}function bk(a){var b=bl.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function bC(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function bD(a,b){if(b.nodeType!==1||!p.hasData(a))return;var c,d,e,f=p._data(a),g=p._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;d<e;d++)p.event.add(b,c,h[c][d])}g.data&&(g.data=p.extend({},g.data))}function bE(a,b){var c;if(b.nodeType!==1)return;b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?(b.parentNode&&(b.outerHTML=a.outerHTML),p.support.html5Clone&&a.innerHTML&&!p.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):c==="input"&&bv.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text),b.removeAttribute(p.expando)}function bF(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bG(a){bv.test(a.type)&&(a.defaultChecked=a.checked)}function bY(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=bW.length;while(e--){b=bW[e]+c;if(b in a)return b}return d}function bZ(a,b){return a=b||a,p.css(a,"display")==="none"||!p.contains(a.ownerDocument,a)}function b$(a,b){var c,d,e=[],f=0,g=a.length;for(;f<g;f++){c=a[f];if(!c.style)continue;e[f]=p._data(c,"olddisplay"),b?(!e[f]&&c.style.display==="none"&&(c.style.display=""),c.style.display===""&&bZ(c)&&(e[f]=p._data(c,"olddisplay",cc(c.nodeName)))):(d=bH(c,"display"),!e[f]&&d!=="none"&&p._data(c,"olddisplay",d))}for(f=0;f<g;f++){c=a[f];if(!c.style)continue;if(!b||c.style.display==="none"||c.style.display==="")c.style.display=b?e[f]||"":"none"}return a}function b_(a,b,c){var d=bP.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function ca(a,b,c,d){var e=c===(d?"border":"content")?4:b==="width"?1:0,f=0;for(;e<4;e+=2)c==="margin"&&(f+=p.css(a,c+bV[e],!0)),d?(c==="content"&&(f-=parseFloat(bH(a,"padding"+bV[e]))||0),c!=="margin"&&(f-=parseFloat(bH(a,"border"+bV[e]+"Width"))||0)):(f+=parseFloat(bH(a,"padding"+bV[e]))||0,c!=="padding"&&(f+=parseFloat(bH(a,"border"+bV[e]+"Width"))||0));return f}function cb(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=!0,f=p.support.boxSizing&&p.css(a,"boxSizing")==="border-box";if(d<=0||d==null){d=bH(a,b);if(d<0||d==null)d=a.style[b];if(bQ.test(d))return d;e=f&&(p.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+ca(a,b,c||(f?"border":"content"),e)+"px"}function cc(a){if(bS[a])return bS[a];var b=p("<"+a+">").appendTo(e.body),c=b.css("display");b.remove();if(c==="none"||c===""){bI=e.body.appendChild(bI||p.extend(e.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!bJ||!bI.createElement)bJ=(bI.contentWindow||bI.contentDocument).document,bJ.write("<!doctype html><html><body>"),bJ.close();b=bJ.body.appendChild(bJ.createElement(a)),c=bH(b,"display"),e.body.removeChild(bI)}return bS[a]=c,c}function ci(a,b,c,d){var e;if(p.isArray(b))p.each(b,function(b,e){c||ce.test(a)?d(a,e):ci(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&p.type(b)==="object")for(e in b)ci(a+"["+e+"]",b[e],c,d);else d(a,b)}function cz(a){return function(b,c){typeof b!="string"&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(s),h=0,i=g.length;if(p.isFunction(c))for(;h<i;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function cA(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h,i=a[f],j=0,k=i?i.length:0,l=a===cv;for(;j<k&&(l||!h);j++)h=i[j](c,d,e),typeof h=="string"&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=cA(a,c,d,e,h,g)));return(l||!h)&&!g["*"]&&(h=cA(a,c,d,e,"*",g)),h}function cB(a,c){var d,e,f=p.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&p.extend(!0,a,e)}function cC(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);while(j[0]==="*")j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}if(g)return g!==j[0]&&j.unshift(g),d[g]}function cD(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;a.dataFilter&&(b=a.dataFilter(b,a.dataType));if(g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if(e!=="*"){if(h!=="*"&&h!==e){c=i[h+" "+e]||i["* "+e];if(!c)for(d in i){f=d.split(" ");if(f[1]===e){c=i[h+" "+f[0]]||i["* "+f[0]];if(c){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}}}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function cL(){try{return new a.XMLHttpRequest}catch(b){}}function cM(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function cU(){return setTimeout(function(){cN=b},0),cN=p.now()}function cV(a,b){p.each(b,function(b,c){var d=(cT[b]||[]).concat(cT["*"]),e=0,f=d.length;for(;e<f;e++)if(d[e].call(a,b,c))return})}function cW(a,b,c){var d,e=0,f=0,g=cS.length,h=p.Deferred().always(function(){delete i.elem}),i=function(){var b=cN||cU(),c=Math.max(0,j.startTime+j.duration-b),d=1-(c/j.duration||0),e=0,f=j.tweens.length;for(;e<f;e++)j.tweens[e].run(d);return h.notifyWith(a,[j,d,c]),d<1&&f?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:p.extend({},b),opts:p.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:cN||cU(),duration:c.duration,tweens:[],createTween:function(b,c,d){var e=p.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(e),e},stop:function(b){var c=0,d=b?j.tweens.length:0;for(;c<d;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;cX(k,j.opts.specialEasing);for(;e<g;e++){d=cS[e].call(j,a,k,j.opts);if(d)return d}return cV(j,k),p.isFunction(j.opts.start)&&j.opts.start.call(a,j),p.fx.timer(p.extend(i,{anim:j,queue:j.opts.queue,elem:a})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}function cX(a,b){var c,d,e,f,g;for(c in a){d=p.camelCase(c),e=b[d],f=a[c],p.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=p.cssHooks[d];if(g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}}function cY(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],q=a.nodeType&&bZ(a);c.queue||(j=p._queueHooks(a,"fx"),j.unqueued==null&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,p.queue(a,"fx").length||j.empty.fire()})})),a.nodeType===1&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],p.css(a,"display")==="inline"&&p.css(a,"float")==="none"&&(!p.support.inlineBlockNeedsLayout||cc(a.nodeName)==="inline"?m.display="inline-block":m.zoom=1)),c.overflow&&(m.overflow="hidden",p.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b){f=b[d];if(cP.exec(f)){delete b[d];if(f===(q?"hide":"show"))continue;o.push(d)}}g=o.length;if(g){h=p._data(a,"fxshow")||p._data(a,"fxshow",{}),q?p(a).show():l.done(function(){p(a).hide()}),l.done(function(){var b;p.removeData(a,"fxshow",!0);for(b in n)p.style(a,b,n[b])});for(d=0;d<g;d++)e=o[d],i=l.createTween(e,q?h[e]:0),n[e]=h[e]||p.style(a,e),e in h||(h[e]=i.start,q&&(i.end=i.start,i.start=e==="width"||e==="height"?1:0))}}function cZ(a,b,c,d,e){return new cZ.prototype.init(a,b,c,d,e)}function c$(a,b){var c,d={height:a},e=0;b=b?1:0;for(;e<4;e+=2-b)c=bV[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function da(a){return p.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}var c,d,e=a.document,f=a.location,g=a.navigator,h=a.jQuery,i=a.$,j=Array.prototype.push,k=Array.prototype.slice,l=Array.prototype.indexOf,m=Object.prototype.toString,n=Object.prototype.hasOwnProperty,o=String.prototype.trim,p=function(a,b){return new p.fn.init(a,b,c)},q=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,r=/\S/,s=/\s+/,t=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,u=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,y=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,z=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,A=/^-ms-/,B=/-([\da-z])/gi,C=function(a,b){return(b+"").toUpperCase()},D=function(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",D,!1),p.ready()):e.readyState==="complete"&&(e.detachEvent("onreadystatechange",D),p.ready())},E={};p.fn=p.prototype={constructor:p,init:function(a,c,d){var f,g,h,i;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if(typeof a=="string"){a.charAt(0)==="<"&&a.charAt(a.length-1)===">"&&a.length>=3?f=[null,a,null]:f=u.exec(a);if(f&&(f[1]||!c)){if(f[1])return c=c instanceof p?c[0]:c,i=c&&c.nodeType?c.ownerDocument||c:e,a=p.parseHTML(f[1],i,!0),v.test(f[1])&&p.isPlainObject(c)&&this.attr.call(a,c,!0),p.merge(this,a);g=e.getElementById(f[2]);if(g&&g.parentNode){if(g.id!==f[2])return d.find(a);this.length=1,this[0]=g}return this.context=e,this.selector=a,this}return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a)}return p.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),p.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return k.call(this)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=p.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return p.each(this,a,b)},ready:function(a){return p.ready.promise().done(a),this},eq:function(a){return a=+a,a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(a){return this.pushStack(p.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:j,sort:[].sort,splice:[].splice},p.fn.init.prototype=p.fn,p.extend=p.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;typeof h=="boolean"&&(k=h,h=arguments[1]||{},i=2),typeof h!="object"&&!p.isFunction(h)&&(h={}),j===i&&(h=this,--i);for(;i<j;i++)if((a=arguments[i])!=null)for(c in a){d=h[c],e=a[c];if(h===e)continue;k&&e&&(p.isPlainObject(e)||(f=p.isArray(e)))?(f?(f=!1,g=d&&p.isArray(d)?d:[]):g=d&&p.isPlainObject(d)?d:{},h[c]=p.extend(k,g,e)):e!==b&&(h[c]=e)}return h},p.extend({noConflict:function(b){return a.$===p&&(a.$=i),b&&a.jQuery===p&&(a.jQuery=h),p},isReady:!1,readyWait:1,holdReady:function(a){a?p.readyWait++:p.ready(!0)},ready:function(a){if(a===!0?--p.readyWait:p.isReady)return;if(!e.body)return setTimeout(p.ready,1);p.isReady=!0;if(a!==!0&&--p.readyWait>0)return;d.resolveWith(e,[p]),p.fn.trigger&&p(e).trigger("ready").off("ready")},isFunction:function(a){return p.type(a)==="function"},isArray:Array.isArray||function(a){return p.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):E[m.call(a)]||"object"},isPlainObject:function(a){if(!a||p.type(a)!=="object"||a.nodeType||p.isWindow(a))return!1;try{if(a.constructor&&!n.call(a,"constructor")&&!n.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||n.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return!a||typeof a!="string"?null:(typeof b=="boolean"&&(c=b,b=0),b=b||e,(d=v.exec(a))?[b.createElement(d[1])]:(d=p.buildFragment([a],b,c?null:[]),p.merge([],(d.cacheable?p.clone(d.fragment):d.fragment).childNodes)))},parseJSON:function(b){if(!b||typeof b!="string")return null;b=p.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(w.test(b.replace(y,"@").replace(z,"]").replace(x,"")))return(new Function("return "+b))();p.error("Invalid JSON: "+b)},parseXML:function(c){var d,e;if(!c||typeof c!="string")return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&p.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&r.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(A,"ms-").replace(B,C)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||p.isFunction(a);if(d){if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;f<g;)if(c.apply(a[f++],d)===!1)break}else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;f<g;)if(c.call(a[f],f,a[f++])===!1)break;return a},trim:o&&!o.call("﻿ ")?function(a){return a==null?"":o.call(a)}:function(a){return a==null?"":(a+"").replace(t,"")},makeArray:function(a,b){var c,d=b||[];return a!=null&&(c=p.type(a),a.length==null||c==="string"||c==="function"||c==="regexp"||p.isWindow(a)?j.call(d,a):p.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(l)return l.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if(typeof d=="number")for(;f<d;f++)a[e++]=c[f];else while(c[f]!==b)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;c=!!c;for(;f<g;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof p||i!==b&&typeof i=="number"&&(i>0&&a[0]&&a[i-1]||i===0||p.isArray(a));if(j)for(;h<i;h++)e=c(a[h],h,d),e!=null&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),e!=null&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return typeof c=="string"&&(d=a[c],c=a,a=d),p.isFunction(a)?(e=k.call(arguments,2),f=function(){return a.apply(c,e.concat(k.call(arguments)))},f.guid=a.guid=a.guid||p.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=d==null,k=0,l=a.length;if(d&&typeof d=="object"){for(k in d)p.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){i=h===b&&p.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call(p(a),c)}):(c.call(a,e),c=null));if(c)for(;k<l;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),p.ready.promise=function(b){if(!d){d=p.Deferred();if(e.readyState==="complete")setTimeout(p.ready,1);else if(e.addEventListener)e.addEventListener("DOMContentLoaded",D,!1),a.addEventListener("load",p.ready,!1);else{e.attachEvent("onreadystatechange",D),a.attachEvent("onload",p.ready);var c=!1;try{c=a.frameElement==null&&e.documentElement}catch(f){}c&&c.doScroll&&function g(){if(!p.isReady){try{c.doScroll("left")}catch(a){return setTimeout(g,50)}p.ready()}}()}}return d.promise(b)},p.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){E["[object "+b+"]"]=b.toLowerCase()}),c=p(e);var F={};p.Callbacks=function(a){a=typeof a=="string"?F[a]||G(a):p.extend({},a);var c,d,e,f,g,h,i=[],j=!a.once&&[],k=function(b){c=a.memory&&b,d=!0,h=f||0,f=0,g=i.length,e=!0;for(;i&&h<g;h++)if(i[h].apply(b[0],b[1])===!1&&a.stopOnFalse){c=!1;break}e=!1,i&&(j?j.length&&k(j.shift()):c?i=[]:l.disable())},l={add:function(){if(i){var b=i.length;(function d(b){p.each(b,function(b,c){var e=p.type(c);e==="function"&&(!a.unique||!l.has(c))?i.push(c):c&&c.length&&e!=="string"&&d(c)})})(arguments),e?g=i.length:c&&(f=b,k(c))}return this},remove:function(){return i&&p.each(arguments,function(a,b){var c;while((c=p.inArray(b,i,c))>-1)i.splice(c,1),e&&(c<=g&&g--,c<=h&&h--)}),this},has:function(a){return p.inArray(a,i)>-1},empty:function(){return i=[],this},disable:function(){return i=j=c=b,this},disabled:function(){return!i},lock:function(){return j=b,c||l.disable(),this},locked:function(){return!j},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],i&&(!d||j)&&(e?j.push(b):k(b)),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!d}};return l},p.extend({Deferred:function(a){var b=[["resolve","done",p.Callbacks("once memory"),"resolved"],["reject","fail",p.Callbacks("once memory"),"rejected"],["notify","progress",p.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return p.Deferred(function(c){p.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]](p.isFunction(g)?function(){var a=g.apply(this,arguments);a&&p.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return a!=null?p.extend(a,d):d}},e={};return d.pipe=d.then,p.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[a^1][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=k.call(arguments),d=c.length,e=d!==1||a&&p.isFunction(a.promise)?d:0,f=e===1?a:p.Deferred(),g=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?k.call(arguments):d,c===h?f.notifyWith(b,c):--e||f.resolveWith(b,c)}},h,i,j;if(d>1){h=new Array(d),i=new Array(d),j=new Array(d);for(;b<d;b++)c[b]&&p.isFunction(c[b].promise)?c[b].promise().done(g(b,j,c)).fail(f.reject).progress(g(b,i,h)):--e}return e||f.resolveWith(j,c),f.promise()}}),p.support=function(){var b,c,d,f,g,h,i,j,k,l,m,n=e.createElement("div");n.setAttribute("className","t"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=n.getElementsByTagName("*"),d=n.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5";if(!c||!c.length)return{};f=e.createElement("select"),g=f.appendChild(e.createElement("option")),h=n.getElementsByTagName("input")[0],b={leadingWhitespace:n.firstChild.nodeType===3,tbody:!n.getElementsByTagName("tbody").length,htmlSerialize:!!n.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:d.getAttribute("href")==="/a",opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:n.className!=="t",enctype:!!e.createElement("form").enctype,html5Clone:e.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:e.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},h.checked=!0,b.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,b.optDisabled=!g.disabled;try{delete n.test}catch(o){b.deleteExpando=!1}!n.addEventListener&&n.attachEvent&&n.fireEvent&&(n.attachEvent("onclick",m=function(){b.noCloneEvent=!1}),n.cloneNode(!0).fireEvent("onclick"),n.detachEvent("onclick",m)),h=e.createElement("input"),h.value="t",h.setAttribute("type","radio"),b.radioValue=h.value==="t",h.setAttribute("checked","checked"),h.setAttribute("name","t"),n.appendChild(h),i=e.createDocumentFragment(),i.appendChild(n.lastChild),b.checkClone=i.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=h.checked,i.removeChild(h),i.appendChild(n);if(n.attachEvent)for(k in{submit:!0,change:!0,focusin:!0})j="on"+k,l=j in n,l||(n.setAttribute(j,"return;"),l=typeof n[j]=="function"),b[k+"Bubbles"]=l;return p(function(){var c,d,f,g,h="padding:0;margin:0;border:0;display:block;overflow:hidden;",i=e.getElementsByTagName("body")[0];if(!i)return;c=e.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",i.insertBefore(c,i.firstChild),d=e.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",f=d.getElementsByTagName("td"),f[0].style.cssText="padding:0;margin:0;border:0;display:none",l=f[0].offsetHeight===0,f[0].style.display="",f[1].style.display="none",b.reliableHiddenOffsets=l&&f[0].offsetHeight===0,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=d.offsetWidth===4,b.doesNotIncludeMarginInBodyOffset=i.offsetTop!==1,a.getComputedStyle&&(b.pixelPosition=(a.getComputedStyle(d,null)||{}).top!=="1%",b.boxSizingReliable=(a.getComputedStyle(d,null)||{width:"4px"}).width==="4px",g=e.createElement("div"),g.style.cssText=d.style.cssText=h,g.style.marginRight=g.style.width="0",d.style.width="1px",d.appendChild(g),b.reliableMarginRight=!parseFloat((a.getComputedStyle(g,null)||{}).marginRight)),typeof d.style.zoom!="undefined"&&(d.innerHTML="",d.style.cssText=h+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=d.offsetWidth===3,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=d.offsetWidth!==3,c.style.zoom=1),i.removeChild(c),c=d=f=g=null}),i.removeChild(n),c=d=f=g=h=i=n=null,b}();var H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,I=/([A-Z])/g;p.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(p.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?p.cache[a[p.expando]]:a[p.expando],!!a&&!K(a)},data:function(a,c,d,e){if(!p.acceptData(a))return;var f,g,h=p.expando,i=typeof c=="string",j=a.nodeType,k=j?p.cache:a,l=j?a[h]:a[h]&&h;if((!l||!k[l]||!e&&!k[l].data)&&i&&d===b)return;l||(j?a[h]=l=p.deletedIds.pop()||p.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=p.noop));if(typeof c=="object"||typeof c=="function")e?k[l]=p.extend(k[l],c):k[l].data=p.extend(k[l].data,c);return f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[p.camelCase(c)]=d),i?(g=f[c],g==null&&(g=f[p.camelCase(c)])):g=f,g},removeData:function(a,b,c){if(!p.acceptData(a))return;var d,e,f,g=a.nodeType,h=g?p.cache:a,i=g?a[p.expando]:p.expando;if(!h[i])return;if(b){d=c?h[i]:h[i].data;if(d){p.isArray(b)||(b in d?b=[b]:(b=p.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,f=b.length;e<f;e++)delete d[b[e]];if(!(c?K:p.isEmptyObject)(d))return}}if(!c){delete h[i].data;if(!K(h[i]))return}g?p.cleanData([a],!0):p.support.deleteExpando||h!=h.window?delete h[i]:h[i]=null},_data:function(a,b,c){return p.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&p.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),p.fn.extend({data:function(a,c){var d,e,f,g,h,i=this[0],j=0,k=null;if(a===b){if(this.length){k=p.data(i);if(i.nodeType===1&&!p._data(i,"parsedAttrs")){f=i.attributes;for(h=f.length;j<h;j++)g=f[j].name,g.indexOf("data-")||(g=p.camelCase(g.substring(5)),J(i,g,k[g]));p._data(i,"parsedAttrs",!0)}}return k}return typeof a=="object"?this.each(function(){p.data(this,a)}):(d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!",p.access(this,function(c){if(c===b)return k=this.triggerHandler("getData"+e,[d[0]]),k===b&&i&&(k=p.data(i,a),k=J(i,a,k)),k===b&&d[1]?this.data(d[0]):k;d[1]=c,this.each(function(){var b=p(this);b.triggerHandler("setData"+e,d),p.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){p.removeData(this,a)})}}),p.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=p._data(a,b),c&&(!d||p.isArray(c)?d=p._data(a,b,p.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=p.queue(a,b),d=c.length,e=c.shift(),f=p._queueHooks(a,b),g=function(){p.dequeue(a,b)};e==="inprogress"&&(e=c.shift(),d--),e&&(b==="fx"&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return p._data(a,c)||p._data(a,c,{empty:p.Callbacks("once memory").add(function(){p.removeData(a,b+"queue",!0),p.removeData(a,c,!0)})})}}),p.fn.extend({queue:function(a,c){var d=2;return typeof a!="string"&&(c=a,a="fx",d--),arguments.length<d?p.queue(this[0],a):c===b?this:this.each(function(){var b=p.queue(this,a,c);p._queueHooks(this,a),a==="fx"&&b[0]!=="inprogress"&&p.dequeue(this,a)})},dequeue:function(a){return this.each(function(){p.dequeue(this,a)})},delay:function(a,b){return a=p.fx?p.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=p.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};typeof a!="string"&&(c=a,a=b),a=a||"fx";while(h--)d=p._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var L,M,N,O=/[\t\r\n]/g,P=/\r/g,Q=/^(?:button|input)$/i,R=/^(?:button|input|object|select|textarea)$/i,S=/^a(?:rea|)$/i,T=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,U=p.support.getSetAttribute;p.fn.extend({attr:function(a,b){return p.access(this,p.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){p.removeAttr(this,a)})},prop:function(a,b){return p.access(this,p.prop,a,b,arguments.length>1)},removeProp:function(a){return a=p.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if(p.isFunction(a))return this.each(function(b){p(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(s);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{f=" "+e.className+" ";for(g=0,h=b.length;g<h;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=p.trim(f)}}}return this},removeClass:function(a){var c,d,e,f,g,h,i;if(p.isFunction(a))return this.each(function(b){p(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(s);for(h=0,i=this.length;h<i;h++){e=this[h];if(e.nodeType===1&&e.className){d=(" "+e.className+" ").replace(O," ");for(f=0,g=c.length;f<g;f++)while(d.indexOf(" "+c[f]+" ")>=0)d=d.replace(" "+c[f]+" "," ");e.className=a?p.trim(d):""}}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";return p.isFunction(a)?this.each(function(c){p(this).toggleClass(a.call(this,c,this.className,b),b)}):this.each(function(){if(c==="string"){var e,f=0,g=p(this),h=b,i=a.split(s);while(e=i[f++])h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&p._data(this,"__className__",this.className),this.className=this.className||a===!1?"":p._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(O," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];if(!arguments.length){if(f)return c=p.valHooks[f.type]||p.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,typeof d=="string"?d.replace(P,""):d==null?"":d);return}return e=p.isFunction(a),this.each(function(d){var f,g=p(this);if(this.nodeType!==1)return;e?f=a.call(this,d,g.val()):f=a,f==null?f="":typeof f=="number"?f+="":p.isArray(f)&&(f=p.map(f,function(a){return a==null?"":a+""})),c=p.valHooks[this.type]||p.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,f,"value")===b)this.value=f})}}),p.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i=a.type==="select-one";if(f<0)return null;c=i?f:0,d=i?f+1:h.length;for(;c<d;c++){e=h[c];if(e.selected&&(p.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!p.nodeName(e.parentNode,"optgroup"))){b=p(e).val();if(i)return b;g.push(b)}}return i&&!g.length&&h.length?p(h[f]).val():g},set:function(a,b){var c=p.makeArray(b);return p(a).find("option").each(function(){this.selected=p.inArray(p(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(!a||i===3||i===8||i===2)return;if(e&&p.isFunction(p.fn[c]))return p(a)[c](d);if(typeof a.getAttribute=="undefined")return p.prop(a,c,d);h=i!==1||!p.isXMLDoc(a),h&&(c=c.toLowerCase(),g=p.attrHooks[c]||(T.test(c)?M:L));if(d!==b){if(d===null){p.removeAttr(a,c);return}return g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d)}return g&&"get"in g&&h&&(f=g.get(a,c))!==null?f:(f=a.getAttribute(c),f===null?b:f)},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&a.nodeType===1){d=b.split(s);for(;g<d.length;g++)e=d[g],e&&(c=p.propFix[e]||e,f=T.test(e),f||p.attr(a,e,""),a.removeAttribute(U?e:c),f&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(Q.test(a.nodeName)&&a.parentNode)p.error("type property can't be changed");else if(!p.support.radioValue&&b==="radio"&&p.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return L&&p.nodeName(a,"button")?L.get(a,b):b in a?a.value:null},set:function(a,b,c){if(L&&p.nodeName(a,"button"))return L.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(!a||h===3||h===8||h===2)return;return g=h!==1||!p.isXMLDoc(a),g&&(c=p.propFix[c]||c,f=p.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&(e=f.get(a,c))!==null?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):R.test(a.nodeName)||S.test(a.nodeName)&&a.href?0:b}}}}),M={get:function(a,c){var d,e=p.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?p.removeAttr(a,c):(d=p.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},U||(N={name:!0,id:!0,coords:!0},L=p.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(N[c]?d.value!=="":d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=e.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},p.each(["width","height"],function(a,b){p.attrHooks[b]=p.extend(p.attrHooks[b],{set:function(a,c){if(c==="")return a.setAttribute(b,"auto"),c}})}),p.attrHooks.contenteditable={get:L.get,set:function(a,b,c){b===""&&(b="false"),L.set(a,b,c)}}),p.support.hrefNormalized||p.each(["href","src","width","height"],function(a,c){p.attrHooks[c]=p.extend(p.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),p.support.style||(p.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),p.support.optSelected||(p.propHooks.selected=p.extend(p.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),p.support.enctype||(p.propFix.enctype="encoding"),p.support.checkOn||p.each(["radio","checkbox"],function(){p.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),p.each(["radio","checkbox"],function(){p.valHooks[this]=p.extend(p.valHooks[this],{set:function(a,b){if(p.isArray(b))return a.checked=p.inArray(p(a).val(),b)>=0}})});var V=/^(?:textarea|input|select)$/i,W=/^([^\.]*|)(?:\.(.+)|)$/,X=/(?:^|\s)hover(\.\S+|)\b/,Y=/^key/,Z=/^(?:mouse|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=function(a){return p.event.special.hover?a:a.replace(X,"mouseenter$1 mouseleave$1")};p.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,q,r;if(a.nodeType===3||a.nodeType===8||!c||!d||!(g=p._data(a)))return;d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=p.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return typeof p!="undefined"&&(!a||p.event.triggered!==a.type)?p.event.dispatch.apply(h.elem,arguments):b},h.elem=a),c=p.trim(_(c)).split(" ");for(j=0;j<c.length;j++){k=W.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),r=p.event.special[l]||{},l=(f?r.delegateType:r.bindType)||l,r=p.event.special[l]||{},n=p.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&p.expr.match.needsContext.test(f),namespace:m.join(".")},o),q=i[l];if(!q){q=i[l]=[],q.delegateCount=0;if(!r.setup||r.setup.call(a,e,m,h)===!1)a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h)}r.add&&(r.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?q.splice(q.delegateCount++,0,n):q.push(n),p.event.global[l]=!0}a=null},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,q,r=p.hasData(a)&&p._data(a);if(!r||!(m=r.events))return;b=p.trim(_(b||"")).split(" ");for(f=0;f<b.length;f++){g=W.exec(b[f])||[],h=i=g[1],j=g[2];if(!h){for(h in m)p.event.remove(a,h+b[f],c,d,!0);continue}n=p.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(l=0;l<o.length;l++)q=o[l],(e||i===q.origType)&&(!c||c.guid===q.guid)&&(!j||j.test(q.namespace))&&(!d||d===q.selector||d==="**"&&q.selector)&&(o.splice(l--,1),q.selector&&o.delegateCount--,n.remove&&n.remove.call(a,q));o.length===0&&k!==o.length&&((!n.teardown||n.teardown.call(a,j,r.handle)===!1)&&p.removeEvent(a,h,r.handle),delete m[h])}p.isEmptyObject(m)&&(delete r.handle,p.removeData(a,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,f,g){if(!f||f.nodeType!==3&&f.nodeType!==8){var h,i,j,k,l,m,n,o,q,r,s=c.type||c,t=[];if($.test(s+p.event.triggered))return;s.indexOf("!")>=0&&(s=s.slice(0,-1),i=!0),s.indexOf(".")>=0&&(t=s.split("."),s=t.shift(),t.sort());if((!f||p.event.customEvent[s])&&!p.event.global[s])return;c=typeof c=="object"?c[p.expando]?c:new p.Event(s,c):new p.Event(s),c.type=s,c.isTrigger=!0,c.exclusive=i,c.namespace=t.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+t.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,m=s.indexOf(":")<0?"on"+s:"";if(!f){h=p.cache;for(j in h)h[j].events&&h[j].events[s]&&p.event.trigger(c,d,h[j].handle.elem,!0);return}c.result=b,c.target||(c.target=f),d=d!=null?p.makeArray(d):[],d.unshift(c),n=p.event.special[s]||{};if(n.trigger&&n.trigger.apply(f,d)===!1)return;q=[[f,n.bindType||s]];if(!g&&!n.noBubble&&!p.isWindow(f)){r=n.delegateType||s,k=$.test(r+s)?f:f.parentNode;for(l=f;k;k=k.parentNode)q.push([k,r]),l=k;l===(f.ownerDocument||e)&&q.push([l.defaultView||l.parentWindow||a,r])}for(j=0;j<q.length&&!c.isPropagationStopped();j++)k=q[j][0],c.type=q[j][1],o=(p._data(k,"events")||{})[c.type]&&p._data(k,"handle"),o&&o.apply(k,d),o=m&&k[m],o&&p.acceptData(k)&&o.apply&&o.apply(k,d)===!1&&c.preventDefault();return c.type=s,!g&&!c.isDefaultPrevented()&&(!n._default||n._default.apply(f.ownerDocument,d)===!1)&&(s!=="click"||!p.nodeName(f,"a"))&&p.acceptData(f)&&m&&f[s]&&(s!=="focus"&&s!=="blur"||c.target.offsetWidth!==0)&&!p.isWindow(f)&&(l=f[m],l&&(f[m]=null),p.event.triggered=s,f[s](),p.event.triggered=b,l&&(f[m]=l)),c.result}return},dispatch:function(c){c=p.event.fix(c||a.event);var d,e,f,g,h,i,j,l,m,n,o=(p._data(this,"events")||{})[c.type]||[],q=o.delegateCount,r=k.call(arguments),s=!c.exclusive&&!c.namespace,t=p.event.special[c.type]||{},u=[];r[0]=c,c.delegateTarget=this;if(t.preDispatch&&t.preDispatch.call(this,c)===!1)return;if(q&&(!c.button||c.type!=="click"))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||c.type!=="click"){h={},j=[];for(d=0;d<q;d++)l=o[d],m=l.selector,h[m]===b&&(h[m]=l.needsContext?p(m,this).index(f)>=0:p.find(m,this,null,[f]).length),h[m]&&j.push(l);j.length&&u.push({elem:f,matches:j})}o.length>q&&u.push({elem:this,matches:o.slice(q)});for(d=0;d<u.length&&!c.isPropagationStopped();d++){i=u[d],c.currentTarget=i.elem;for(e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++){l=i.matches[e];if(s||!c.namespace&&!l.namespace||c.namespace_re&&c.namespace_re.test(l.namespace))c.data=l.data,c.handleObj=l,g=((p.event.special[l.origType]||{}).handle||l.handler).apply(i.elem,r),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation()))}}return t.postDispatch&&t.postDispatch.call(this,c),c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,f,g,h=c.button,i=c.fromElement;return a.pageX==null&&c.clientX!=null&&(d=a.target.ownerDocument||e,f=d.documentElement,g=d.body,a.pageX=c.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=c.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?c.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0),a}},fix:function(a){if(a[p.expando])return a;var b,c,d=a,f=p.event.fixHooks[a.type]||{},g=f.props?this.props.concat(f.props):this.props;a=p.Event(d);for(b=g.length;b;)c=g[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||e),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,f.filter?f.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){p.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=p.extend(new p.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?p.event.trigger(e,null,b):p.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},p.event.handle=p.event.dispatch,p.removeEvent=e.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]=="undefined"&&(a[d]=null),a.detachEvent(d,c))},p.Event=function(a,b){if(this instanceof p.Event)a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?bb:ba):this.type=a,b&&p.extend(this,b),this.timeStamp=a&&a.timeStamp||p.now(),this[p.expando]=!0;else return new p.Event(a,b)},p.Event.prototype={preventDefault:function(){this.isDefaultPrevented=bb;var a=this.originalEvent;if(!a)return;a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=bb;var a=this.originalEvent;if(!a)return;a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=bb,this.stopPropagation()},isDefaultPrevented:ba,isPropagationStopped:ba,isImmediatePropagationStopped:ba},p.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){p.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj,g=f.selector;if(!e||e!==d&&!p.contains(d,e))a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b;return c}}}),p.support.submitBubbles||(p.event.special.submit={setup:function(){if(p.nodeName(this,"form"))return!1;p.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=p.nodeName(c,"input")||p.nodeName(c,"button")?c.form:b;d&&!p._data(d,"_submit_attached")&&(p.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),p._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&p.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(p.nodeName(this,"form"))return!1;p.event.remove(this,"._submit")}}),p.support.changeBubbles||(p.event.special.change={setup:function(){if(V.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")p.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),p.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),p.event.simulate("change",this,a,!0)});return!1}p.event.add(this,"beforeactivate._change",function(a){var b=a.target;V.test(b.nodeName)&&!p._data(b,"_change_attached")&&(p.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&p.event.simulate("change",this.parentNode,a,!0)}),p._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){return p.event.remove(this,"._change"),!V.test(this.nodeName)}}),p.support.focusinBubbles||p.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){p.event.simulate(b,a.target,p.event.fix(a),!0)};p.event.special[b]={setup:function(){c++===0&&e.addEventListener(a,d,!0)},teardown:function(){--c===0&&e.removeEventListener(a,d,!0)}}}),p.fn.extend({on:function(a,c,d,e,f){var g,h;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(h in a)this.on(h,c,d,a[h],f);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=ba;else if(!e)return this;return f===1&&(g=e,e=function(a){return p().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=p.guid++)),this.each(function(){p.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,f;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,p(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if(typeof a=="object"){for(f in a)this.off(f,c,a[f]);return this}if(c===!1||typeof c=="function")d=c,c=b;return d===!1&&(d=ba),this.each(function(){p.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return p(this.context).on(a,this.selector,b,c),this},die:function(a,b){return p(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length===1?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){p.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return p.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||p.guid++,d=0,e=function(c){var e=(p._data(this,"lastToggle"+a.guid)||0)%d;return p._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){p.fn[b]=function(a,c){return c==null&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Y.test(b)&&(p.event.fixHooks[b]=p.event.keyHooks),Z.test(b)&&(p.event.fixHooks[b]=p.event.mouseHooks)}),function(a,b){function bc(a,b,c,d){c=c||[],b=b||r;var e,f,i,j,k=b.nodeType;if(!a||typeof a!="string")return c;if(k!==1&&k!==9)return[];i=g(b);if(!i&&!d)if(e=P.exec(a))if(j=e[1]){if(k===9){f=b.getElementById(j);if(!f||!f.parentNode)return c;if(f.id===j)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(j))&&h(b,f)&&f.id===j)return c.push(f),c}else{if(e[2])return w.apply(c,x.call(b.getElementsByTagName(a),0)),c;if((j=e[3])&&_&&b.getElementsByClassName)return w.apply(c,x.call(b.getElementsByClassName(j),0)),c}return bp(a.replace(L,"$1"),b,c,d,i)}function bd(a){return function(b){var c=b.nodeName.toLowerCase();return c==="input"&&b.type===a}}function be(a){return function(b){var c=b.nodeName.toLowerCase();return(c==="input"||c==="button")&&b.type===a}}function bf(a){return z(function(b){return b=+b,z(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function bg(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}function bh(a,b){var c,d,f,g,h,i,j,k=C[o][a];if(k)return b?0:k.slice(0);h=a,i=[],j=e.preFilter;while(h){if(!c||(d=M.exec(h)))d&&(h=h.slice(d[0].length)),i.push(f=[]);c=!1;if(d=N.exec(h))f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=d[0].replace(L," ");for(g in e.filter)(d=W[g].exec(h))&&(!j[g]||(d=j[g](d,r,!0)))&&(f.push(c=new q(d.shift())),h=h.slice(c.length),c.type=g,c.matches=d);if(!c)break}return b?h.length:h?bc.error(a):C(a,i).slice(0)}function bi(a,b,d){var e=b.dir,f=d&&b.dir==="parentNode",g=u++;return b.first?function(b,c,d){while(b=b[e])if(f||b.nodeType===1)return a(b,c,d)}:function(b,d,h){if(!h){var i,j=t+" "+g+" ",k=j+c;while(b=b[e])if(f||b.nodeType===1){if((i=b[o])===k)return b.sizset;if(typeof i=="string"&&i.indexOf(j)===0){if(b.sizset)return b}else{b[o]=k;if(a(b,d,h))return b.sizset=!0,b;b.sizset=!1}}}else while(b=b[e])if(f||b.nodeType===1)if(a(b,d,h))return b}}function bj(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function bk(a,b,c,d,e){var f,g=[],h=0,i=a.length,j=b!=null;for(;h<i;h++)if(f=a[h])if(!c||c(f,d,e))g.push(f),j&&b.push(h);return g}function bl(a,b,c,d,e,f){return d&&!d[o]&&(d=bl(d)),e&&!e[o]&&(e=bl(e,f)),z(function(f,g,h,i){if(f&&e)return;var j,k,l,m=[],n=[],o=g.length,p=f||bo(b||"*",h.nodeType?[h]:h,[],f),q=a&&(f||!b)?bk(p,m,a,h,i):p,r=c?e||(f?a:o||d)?[]:g:q;c&&c(q,r,h,i);if(d){l=bk(r,n),d(l,[],h,i),j=l.length;while(j--)if(k=l[j])r[n[j]]=!(q[n[j]]=k)}if(f){j=a&&r.length;while(j--)if(k=r[j])f[m[j]]=!(g[m[j]]=k)}else r=bk(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):w.apply(g,r)})}function bm(a){var b,c,d,f=a.length,g=e.relative[a[0].type],h=g||e.relative[" "],i=g?1:0,j=bi(function(a){return a===b},h,!0),k=bi(function(a){return y.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==l)||((b=c).nodeType?j(a,c,d):k(a,c,d))}];for(;i<f;i++)if(c=e.relative[a[i].type])m=[bi(bj(m),c)];else{c=e.filter[a[i].type].apply(null,a[i].matches);if(c[o]){d=++i;for(;d<f;d++)if(e.relative[a[d].type])break;return bl(i>1&&bj(m),i>1&&a.slice(0,i-1).join("").replace(L,"$1"),c,i<d&&bm(a.slice(i,d)),d<f&&bm(a=a.slice(d)),d<f&&a.join(""))}m.push(c)}return bj(m)}function bn(a,b){var d=b.length>0,f=a.length>0,g=function(h,i,j,k,m){var n,o,p,q=[],s=0,u="0",x=h&&[],y=m!=null,z=l,A=h||f&&e.find.TAG("*",m&&i.parentNode||i),B=t+=z==null?1:Math.E;y&&(l=i!==r&&i,c=g.el);for(;(n=A[u])!=null;u++){if(f&&n){for(o=0;p=a[o];o++)if(p(n,i,j)){k.push(n);break}y&&(t=B,c=++g.el)}d&&((n=!p&&n)&&s--,h&&x.push(n))}s+=u;if(d&&u!==s){for(o=0;p=b[o];o++)p(x,q,i,j);if(h){if(s>0)while(u--)!x[u]&&!q[u]&&(q[u]=v.call(k));q=bk(q)}w.apply(k,q),y&&!h&&q.length>0&&s+b.length>1&&bc.uniqueSort(k)}return y&&(t=B,l=z),x};return g.el=0,d?z(g):g}function bo(a,b,c,d){var e=0,f=b.length;for(;e<f;e++)bc(a,b[e],c,d);return c}function bp(a,b,c,d,f){var g,h,j,k,l,m=bh(a),n=m.length;if(!d&&m.length===1){h=m[0]=m[0].slice(0);if(h.length>2&&(j=h[0]).type==="ID"&&b.nodeType===9&&!f&&e.relative[h[1].type]){b=e.find.ID(j.matches[0].replace(V,""),b,f)[0];if(!b)return c;a=a.slice(h.shift().length)}for(g=W.POS.test(a)?-1:h.length-1;g>=0;g--){j=h[g];if(e.relative[k=j.type])break;if(l=e.find[k])if(d=l(j.matches[0].replace(V,""),R.test(h[0].type)&&b.parentNode||b,f)){h.splice(g,1),a=d.length&&h.join("");if(!a)return w.apply(c,x.call(d,0)),c;break}}}return i(a,m)(d,b,f,c,R.test(a)),c}function bq(){}var c,d,e,f,g,h,i,j,k,l,m=!0,n="undefined",o=("sizcache"+Math.random()).replace(".",""),q=String,r=a.document,s=r.documentElement,t=0,u=0,v=[].pop,w=[].push,x=[].slice,y=[].indexOf||function(a){var b=0,c=this.length;for(;b<c;b++)if(this[b]===a)return b;return-1},z=function(a,b){return a[o]=b==null||b,a},A=function(){var a={},b=[];return z(function(c,d){return b.push(c)>e.cacheLength&&delete a[b.shift()],a[c]=d},a)},B=A(),C=A(),D=A(),E="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",G=F.replace("w","w#"),H="([*^$|!~]?=)",I="\\["+E+"*("+F+")"+E+"*(?:"+H+E+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+G+")|)|)"+E+"*\\]",J=":("+F+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+I+")|[^:]|\\\\.)*|.*))\\)|)",K=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+E+"*((?:-\\d)?\\d*)"+E+"*\\)|)(?=[^-]|$)",L=new RegExp("^"+E+"+|((?:^|[^\\\\])(?:\\\\.)*)"+E+"+$","g"),M=new RegExp("^"+E+"*,"+E+"*"),N=new RegExp("^"+E+"*([\\x20\\t\\r\\n\\f>+~])"+E+"*"),O=new RegExp(J),P=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,Q=/^:not/,R=/[\x20\t\r\n\f]*[+~]/,S=/:not\($/,T=/h\d/i,U=/input|select|textarea|button/i,V=/\\(?!\\)/g,W={ID:new RegExp("^#("+F+")"),CLASS:new RegExp("^\\.("+F+")"),NAME:new RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:new RegExp("^("+F.replace("w","w*")+")"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+J),POS:new RegExp(K,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+E+"*(even|odd|(([+-]|)(\\d*)n|)"+E+"*(?:([+-]|)"+E+"*(\\d+)|))"+E+"*\\)|)","i"),needsContext:new RegExp("^"+E+"*[>+~]|"+K,"i")},X=function(a){var b=r.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},Y=X(function(a){return a.appendChild(r.createComment("")),!a.getElementsByTagName("*").length}),Z=X(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==n&&a.firstChild.getAttribute("href")==="#"}),$=X(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return b!=="boolean"&&b!=="string"}),_=X(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!a.getElementsByClassName||!a.getElementsByClassName("e").length?!1:(a.lastChild.className="e",a.getElementsByClassName("e").length===2)}),ba=X(function(a){a.id=o+0,a.innerHTML="<a name='"+o+"'></a><div name='"+o+"'></div>",s.insertBefore(a,s.firstChild);var b=r.getElementsByName&&r.getElementsByName(o).length===2+r.getElementsByName(o+0).length;return d=!r.getElementById(o),s.removeChild(a),b});try{x.call(s.childNodes,0)[0].nodeType}catch(bb){x=function(a){var b,c=[];for(;b=this[a];a++)c.push(b);return c}}bc.matches=function(a,b){return bc(a,null,null,b)},bc.matchesSelector=function(a,b){return bc(b,null,null,[a]).length>0},f=bc.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(e===1||e===9||e===11){if(typeof a.textContent=="string")return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=f(a)}else if(e===3||e===4)return a.nodeValue}else for(;b=a[d];d++)c+=f(b);return c},g=bc.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?b.nodeName!=="HTML":!1},h=bc.contains=s.contains?function(a,b){var c=a.nodeType===9?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&d.nodeType===1&&c.contains&&c.contains(d))}:s.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){while(b=b.parentNode)if(b===a)return!0;return!1},bc.attr=function(a,b){var c,d=g(a);return d||(b=b.toLowerCase()),(c=e.attrHandle[b])?c(a):d||$?a.getAttribute(b):(c=a.getAttributeNode(b),c?typeof a[b]=="boolean"?a[b]?b:null:c.specified?c.value:null:null)},e=bc.selectors={cacheLength:50,createPseudo:z,match:W,attrHandle:Z?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:d?function(a,b,c){if(typeof b.getElementById!==n&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==n&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==n&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:Y?function(a,b){if(typeof b.getElementsByTagName!==n)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if(a==="*"){var d,e=[],f=0;for(;d=c[f];f++)d.nodeType===1&&e.push(d);return e}return c},NAME:ba&&function(a,b){if(typeof b.getElementsByName!==n)return b.getElementsByName(name)},CLASS:_&&function(a,b,c){if(typeof b.getElementsByClassName!==n&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(V,""),a[3]=(a[4]||a[5]||"").replace(V,""),a[2]==="~="&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),a[1]==="nth"?(a[2]||bc.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*(a[2]==="even"||a[2]==="odd")),a[4]=+(a[6]+a[7]||a[2]==="odd")):a[2]&&bc.error(a[0]),a},PSEUDO:function(a){var b,c;if(W.CHILD.test(a[0]))return null;if(a[3])a[2]=a[3];else if(b=a[4])O.test(b)&&(c=bh(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b;return a.slice(0,3)}},filter:{ID:d?function(a){return a=a.replace(V,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(V,""),function(b){var c=typeof b.getAttributeNode!==n&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return a==="*"?function(){return!0}:(a=a.replace(V,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=B[o][a];return b||(b=B(a,new RegExp("(^|"+E+")"+a+"("+E+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==n&&a.getAttribute("class")||"")}},ATTR:function(a,b,c){return function(d,e){var f=bc.attr(d,a);return f==null?b==="!=":b?(f+="",b==="="?f===c:b==="!="?f!==c:b==="^="?c&&f.indexOf(c)===0:b==="*="?c&&f.indexOf(c)>-1:b==="$="?c&&f.substr(f.length-c.length)===c:b==="~="?(" "+f+" ").indexOf(c)>-1:b==="|="?f===c||f.substr(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d){return a==="nth"?function(a){var b,e,f=a.parentNode;if(c===1&&d===0)return!0;if(f){e=0;for(b=f.firstChild;b;b=b.nextSibling)if(b.nodeType===1){e++;if(a===b)break}}return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":while(c=c.previousSibling)if(c.nodeType===1)return!1;if(a==="first")return!0;c=b;case"last":while(c=c.nextSibling)if(c.nodeType===1)return!1;return!0}}},PSEUDO:function(a,b){var c,d=e.pseudos[a]||e.setFilters[a.toLowerCase()]||bc.error("unsupported pseudo: "+a);return d[o]?d(b):d.length>1?(c=[a,a,"",b],e.setFilters.hasOwnProperty(a.toLowerCase())?z(function(a,c){var e,f=d(a,b),g=f.length;while(g--)e=y.call(a,f[g]),a[e]=!(c[e]=f[g])}):function(a){return d(a,0,c)}):d}},pseudos:{not:z(function(a){var b=[],c=[],d=i(a.replace(L,"$1"));return d[o]?z(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)if(f=g[h])a[h]=!(b[h]=f)}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:z(function(a){return function(b){return bc(a,b).length>0}}),contains:z(function(a){return function(b){return(b.textContent||b.innerText||f(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&!!a.checked||b==="option"&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!e.pseudos.empty(a)},empty:function(a){var b;a=a.firstChild;while(a){if(a.nodeName>"@"||(b=a.nodeType)===3||b===4)return!1;a=a.nextSibling}return!0},header:function(a){return T.test(a.nodeName)},text:function(a){var b,c;return a.nodeName.toLowerCase()==="input"&&(b=a.type)==="text"&&((c=a.getAttribute("type"))==null||c.toLowerCase()===b)},radio:bd("radio"),checkbox:bd("checkbox"),file:bd("file"),password:bd("password"),image:bd("image"),submit:be("submit"),reset:be("reset"),button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&a.type==="button"||b==="button"},input:function(a){return U.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&(!!a.type||!!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:bf(function(a,b,c){return[0]}),last:bf(function(a,b,c){return[b-1]}),eq:bf(function(a,b,c){return[c<0?c+b:c]}),even:bf(function(a,b,c){for(var d=0;d<b;d+=2)a.push(d);return a}),odd:bf(function(a,b,c){for(var d=1;d<b;d+=2)a.push(d);return a}),lt:bf(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:bf(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},j=s.compareDocumentPosition?function(a,b){return a===b?(k=!0,0):(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1}:function(a,b){if(a===b)return k=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,h=b.parentNode,i=g;if(g===h)return bg(a,b);if(!g)return-1;if(!h)return 1;while(i)e.unshift(i),i=i.parentNode;i=h;while(i)f.unshift(i),i=i.parentNode;c=e.length,d=f.length;for(var j=0;j<c&&j<d;j++)if(e[j]!==f[j])return bg(e[j],f[j]);return j===c?bg(a,f[j],-1):bg(e[j],b,1)},[0,0].sort(j),m=!k,bc.uniqueSort=function(a){var b,c=1;k=m,a.sort(j);if(k)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},bc.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},i=bc.compile=function(a,b){var c,d=[],e=[],f=D[o][a];if(!f){b||(b=bh(a)),c=b.length;while(c--)f=bm(b[c]),f[o]?d.push(f):e.push(f);f=D(a,bn(e,d))}return f},r.querySelectorAll&&function(){var a,b=bp,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,e=[":focus"],f=[":active",":focus"],h=s.matchesSelector||s.mozMatchesSelector||s.webkitMatchesSelector||s.oMatchesSelector||s.msMatchesSelector;X(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||e.push("\\["+E+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||e.push(":checked")}),X(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&e.push("[*^$]="+E+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||e.push(":enabled",":disabled")}),e=new RegExp(e.join("|")),bp=function(a,d,f,g,h){if(!g&&!h&&(!e||!e.test(a))){var i,j,k=!0,l=o,m=d,n=d.nodeType===9&&a;if(d.nodeType===1&&d.nodeName.toLowerCase()!=="object"){i=bh(a),(k=d.getAttribute("id"))?l=k.replace(c,"\\$&"):d.setAttribute("id",l),l="[id='"+l+"'] ",j=i.length;while(j--)i[j]=l+i[j].join("");m=R.test(a)&&d.parentNode||d,n=i.join(",")}if(n)try{return w.apply(f,x.call(m.querySelectorAll(n),0)),f}catch(p){}finally{k||d.removeAttribute("id")}}return b(a,d,f,g,h)},h&&(X(function(b){a=h.call(b,"div");try{h.call(b,"[test!='']:sizzle"),f.push("!=",J)}catch(c){}}),f=new RegExp(f.join("|")),bc.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!g(b)&&!f.test(c)&&(!e||!e.test(c)))try{var i=h.call(b,c);if(i||a||b.document&&b.document.nodeType!==11)return i}catch(j){}return bc(c,null,null,[b]).length>0})}(),e.pseudos.nth=e.pseudos.eq,e.filters=bq.prototype=e.pseudos,e.setFilters=new bq,bc.attr=p.attr,p.find=bc,p.expr=bc.selectors,p.expr[":"]=p.expr.pseudos,p.unique=bc.uniqueSort,p.text=bc.getText,p.isXMLDoc=bc.isXML,p.contains=bc.contains}(a);var bc=/Until$/,bd=/^(?:parents|prev(?:Until|All))/,be=/^.[^:#\[\.,]*$/,bf=p.expr.match.needsContext,bg={children:!0,contents:!0,next:!0,prev:!0};p.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if(typeof a!="string")return p(a).filter(function(){for(b=0,c=h.length;b<c;b++)if(p.contains(h[b],this))return!0});g=this.pushStack("","find",a);for(b=0,c=this.length;b<c;b++){d=g.length,p.find(a,this[b],g);if(b>0)for(e=d;e<g.length;e++)for(f=0;f<d;f++)if(g[f]===g[e]){g.splice(e--,1);break}}return g},has:function(a){var b,c=p(a,this),d=c.length;return this.filter(function(){for(b=0;b<d;b++)if(p.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(bj(this,a,!1),"not",a)},filter:function(a){return this.pushStack(bj(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?bf.test(a)?p(a,this.context).index(this[0])>=0:p.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c,d=0,e=this.length,f=[],g=bf.test(a)||typeof a!="string"?p(a,b||this.context):0;for(;d<e;d++){c=this[d];while(c&&c.ownerDocument&&c!==b&&c.nodeType!==11){if(g?g.index(c)>-1:p.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}}return f=f.length>1?p.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?typeof a=="string"?p.inArray(this[0],p(a)):p.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c=typeof a=="string"?p(a,b):p.makeArray(a&&a.nodeType?[a]:a),d=p.merge(this.get(),c);return this.pushStack(bh(c[0])||bh(d[0])?d:p.unique(d))},addBack:function(a){return this.add(a==null?this.prevObject:this.prevObject.filter(a))}}),p.fn.andSelf=p.fn.addBack,p.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return p.dir(a,"parentNode")},parentsUntil:function(a,b,c){return p.dir(a,"parentNode",c)},next:function(a){return bi(a,"nextSibling")},prev:function(a){return bi(a,"previousSibling")},nextAll:function(a){return p.dir(a,"nextSibling")},prevAll:function(a){return p.dir(a,"previousSibling")},nextUntil:function(a,b,c){return p.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return p.dir(a,"previousSibling",c)},siblings:function(a){return p.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return p.sibling(a.firstChild)},contents:function(a){return p.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:p.merge([],a.childNodes)}},function(a,b){p.fn[a]=function(c,d){var e=p.map(this,b,c);return bc.test(a)||(d=c),d&&typeof d=="string"&&(e=p.filter(d,e)),e=this.length>1&&!bg[a]?p.unique(e):e,this.length>1&&bd.test(a)&&(e=e.reverse()),this.pushStack(e,a,k.call(arguments).join(","))}}),p.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),b.length===1?p.find.matchesSelector(b[0],a)?[b[0]]:[]:p.find.matches(a,b)},dir:function(a,c,d){var e=[],f=a[c];while(f&&f.nodeType!==9&&(d===b||f.nodeType!==1||!p(f).is(d)))f.nodeType===1&&e.push(f),f=f[c];return e},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var bl="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",bm=/ jQuery\d+="(?:null|\d+)"/g,bn=/^\s+/,bo=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bp=/<([\w:]+)/,bq=/<tbody/i,br=/<|&#?\w+;/,bs=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,bu=new RegExp("<(?:"+bl+")[\\s/>]","i"),bv=/^(?:checkbox|radio)$/,bw=/checked\s*(?:[^=]|=\s*.checked.)/i,bx=/\/(java|ecma)script/i,by=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,bz={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bA=bk(e),bB=bA.appendChild(e.createElement("div"));bz.optgroup=bz.option,bz.tbody=bz.tfoot=bz.colgroup=bz.caption=bz.thead,bz.th=bz.td,p.support.htmlSerialize||(bz._default=[1,"X<div>","</div>"]),p.fn.extend({text:function(a){return p.access(this,function(a){return a===b?p.text(this):this.empty().append((this[0]&&this[0].ownerDocument||e).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(p.isFunction(a))return this.each(function(b){p(this).wrapAll(a.call(this,b))});if(this[0]){var b=p(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return p.isFunction(a)?this.each(function(b){p(this).wrapInner(a.call(this,b))}):this.each(function(){var b=p(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=p.isFunction(a);return this.each(function(c){p(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){p.nodeName(this,"body")||p(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(a,this),"before",this.selector)}},after:function(){if(!bh(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=p.clean(arguments);return this.pushStack(p.merge(this,a),"after",this.selector)}},remove:function(a,b){var c,d=0;for(;(c=this[d])!=null;d++)if(!a||p.filter(a,[c]).length)!b&&c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),p.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c);return this},empty:function(){var a,b=0;for(;(a=this[b])!=null;b++){a.nodeType===1&&p.cleanData(a.getElementsByTagName("*"));while(a.firstChild)a.removeChild(a.firstChild)}return this},clone:function(a,b){return a=a==null?!1:a,b=b==null?a:b,this.map(function(){return p.clone(this,a,b)})},html:function(a){return p.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(bm,""):b;if(typeof a=="string"&&!bs.test(a)&&(p.support.htmlSerialize||!bu.test(a))&&(p.support.leadingWhitespace||!bn.test(a))&&!bz[(bp.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(bo,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(p.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return bh(this[0])?this.length?this.pushStack(p(p.isFunction(a)?a():a),"replaceWith",a):this:p.isFunction(a)?this.each(function(b){var c=p(this),d=c.html();c.replaceWith(a.call(this,b,d))}):(typeof a!="string"&&(a=p(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;p(this).remove(),b?p(b).before(a):p(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],l=this.length;if(!p.support.checkClone&&l>1&&typeof j=="string"&&bw.test(j))return this.each(function(){p(this).domManip(a,c,d)});if(p.isFunction(j))return this.each(function(e){var f=p(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){e=p.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,g.childNodes.length===1&&(g=f);if(f){c=c&&p.nodeName(f,"tr");for(h=e.cacheable||l-1;i<l;i++)d.call(c&&p.nodeName(this[i],"table")?bC(this[i],"tbody"):this[i],i===h?g:p.clone(g,!0,!0))}g=f=null,k.length&&p.each(k,function(a,b){b.src?p.ajax?p.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):p.error("no ajax"):p.globalEval((b.text||b.textContent||b.innerHTML||"").replace(by,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),p.buildFragment=function(a,c,d){var f,g,h,i=a[0];return c=c||e,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,a.length===1&&typeof i=="string"&&i.length<512&&c===e&&i.charAt(0)==="<"&&!bt.test(i)&&(p.support.checkClone||!bw.test(i))&&(p.support.html5Clone||!bu.test(i))&&(g=!0,f=p.fragments[i],h=f!==b),f||(f=c.createDocumentFragment(),p.clean(a,c,f,d),g&&(p.fragments[i]=h&&f)),{fragment:f,cacheable:g}},p.fragments={},p.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){p.fn[a]=function(c){var d,e=0,f=[],g=p(c),h=g.length,i=this.length===1&&this[0].parentNode;if((i==null||i&&i.nodeType===11&&i.childNodes.length===1)&&h===1)return g[b](this[0]),this;for(;e<h;e++)d=(e>0?this.clone(!0):this).get(),p(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),p.extend({clone:function(a,b,c){var d,e,f,g;p.support.html5Clone||p.isXMLDoc(a)||!bu.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bB.innerHTML=a.outerHTML,bB.removeChild(g=bB.firstChild));if((!p.support.noCloneEvent||!p.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!p.isXMLDoc(a)){bE(a,g),d=bF(a),e=bF(g);for(f=0;d[f];++f)e[f]&&bE(d[f],e[f])}if(b){bD(a,g);if(c){d=bF(a),e=bF(g);for(f=0;d[f];++f)bD(d[f],e[f])}}return d=e=null,g},clean:function(a,b,c,d){var f,g,h,i,j,k,l,m,n,o,q,r,s=b===e&&bA,t=[];if(!b||typeof b.createDocumentFragment=="undefined")b=e;for(f=0;(h=a[f])!=null;f++){typeof h=="number"&&(h+="");if(!h)continue;if(typeof h=="string")if(!br.test(h))h=b.createTextNode(h);else{s=s||bk(b),l=b.createElement("div"),s.appendChild(l),h=h.replace(bo,"<$1></$2>"),i=(bp.exec(h)||["",""])[1].toLowerCase(),j=bz[i]||bz._default,k=j[0],l.innerHTML=j[1]+h+j[2];while(k--)l=l.lastChild;if(!p.support.tbody){m=bq.test(h),n=i==="table"&&!m?l.firstChild&&l.firstChild.childNodes:j[1]==="<table>"&&!m?l.childNodes:[];for(g=n.length-1;g>=0;--g)p.nodeName(n[g],"tbody")&&!n[g].childNodes.length&&n[g].parentNode.removeChild(n[g])}!p.support.leadingWhitespace&&bn.test(h)&&l.insertBefore(b.createTextNode(bn.exec(h)[0]),l.firstChild),h=l.childNodes,l.parentNode.removeChild(l)}h.nodeType?t.push(h):p.merge(t,h)}l&&(h=l=s=null);if(!p.support.appendChecked)for(f=0;(h=t[f])!=null;f++)p.nodeName(h,"input")?bG(h):typeof h.getElementsByTagName!="undefined"&&p.grep(h.getElementsByTagName("input"),bG);if(c){q=function(a){if(!a.type||bx.test(a.type))return d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a)};for(f=0;(h=t[f])!=null;f++)if(!p.nodeName(h,"script")||!q(h))c.appendChild(h),typeof h.getElementsByTagName!="undefined"&&(r=p.grep(p.merge([],h.getElementsByTagName("script")),q),t.splice.apply(t,[f+1,0].concat(r)),f+=r.length)}return t},cleanData:function(a,b){var c,d,e,f,g=0,h=p.expando,i=p.cache,j=p.support.deleteExpando,k=p.event.special;for(;(e=a[g])!=null;g++)if(b||p.acceptData(e)){d=e[h],c=d&&i[d];if(c){if(c.events)for(f in c.events)k[f]?p.event.remove(e,f):p.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,p.deletedIds.push(d))}}}}),function(){var a,b;p.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=p.uaMatch(g.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),p.browser=b,p.sub=function(){function a(b,c){return new a.fn.init(b,c)}p.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function c(c,d){return d&&d instanceof p&&!(d instanceof a)&&(d=a(d)),p.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(e);return a}}();var bH,bI,bJ,bK=/alpha\([^)]*\)/i,bL=/opacity=([^)]*)/,bM=/^(top|right|bottom|left)$/,bN=/^(none|table(?!-c[ea]).+)/,bO=/^margin/,bP=new RegExp("^("+q+")(.*)$","i"),bQ=new RegExp("^("+q+")(?!px)[a-z%]+$","i"),bR=new RegExp("^([-+])=("+q+")","i"),bS={},bT={position:"absolute",visibility:"hidden",display:"block"},bU={letterSpacing:0,fontWeight:400},bV=["Top","Right","Bottom","Left"],bW=["Webkit","O","Moz","ms"],bX=p.fn.toggle;p.fn.extend({css:function(a,c){return p.access(this,function(a,c,d){return d!==b?p.style(a,c,d):p.css(a,c)},a,c,arguments.length>1)},show:function(){return b$(this,!0)},hide:function(){return b$(this)},toggle:function(a,b){var c=typeof a=="boolean";return p.isFunction(a)&&p.isFunction(b)?bX.apply(this,arguments):this.each(function(){(c?a:bZ(this))?p(this).show():p(this).hide()})}}),p.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bH(a,"opacity");return c===""?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":p.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!a||a.nodeType===3||a.nodeType===8||!a.style)return;var f,g,h,i=p.camelCase(c),j=a.style;c=p.cssProps[i]||(p.cssProps[i]=bY(j,i)),h=p.cssHooks[c]||p.cssHooks[i];if(d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];g=typeof d,g==="string"&&(f=bR.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat(p.css(a,c)),g="number");if(d==null||g==="number"&&isNaN(d))return;g==="number"&&!p.cssNumber[i]&&(d+="px");if(!h||!("set"in h)||(d=h.set(a,d,e))!==b)try{j[c]=d}catch(k){}},css:function(a,c,d,e){var f,g,h,i=p.camelCase(c);return c=p.cssProps[i]||(p.cssProps[i]=bY(a.style,i)),h=p.cssHooks[c]||p.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=bH(a,c)),f==="normal"&&c in bU&&(f=bU[c]),d||e!==b?(g=parseFloat(f),d||p.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?bH=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],d===""&&!p.contains(b.ownerDocument,b)&&(d=p.style(b,c)),bQ.test(d)&&bO.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:e.documentElement.currentStyle&&(bH=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return e==null&&f&&f[b]&&(e=f[b]),bQ.test(e)&&!bM.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),e===""?"auto":e}),p.each(["height","width"],function(a,b){p.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth===0&&bN.test(bH(a,"display"))?p.swap(a,bT,function(){return cb(a,b,d)}):cb(a,b,d)},set:function(a,c,d){return b_(a,c,d?ca(a,b,d,p.support.boxSizing&&p.css(a,"boxSizing")==="border-box"):0)}}}),p.support.opacity||(p.cssHooks.opacity={get:function(a,b){return bL.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=p.isNumeric(b)?"alpha(opacity="+b*100+")":"",f=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&p.trim(f.replace(bK,""))===""&&c.removeAttribute){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bK.test(f)?f.replace(bK,e):f+" "+e}}),p(function(){p.support.reliableMarginRight||(p.cssHooks.marginRight={get:function(a,b){return p.swap(a,{display:"inline-block"},function(){if(b)return bH(a,"marginRight")})}}),!p.support.pixelPosition&&p.fn.position&&p.each(["top","left"],function(a,b){p.cssHooks[b]={get:function(a,c){if(c){var d=bH(a,b);return bQ.test(d)?p(a).position()[b]+"px":d}}}})}),p.expr&&p.expr.filters&&(p.expr.filters.hidden=function(a){return a.offsetWidth===0&&a.offsetHeight===0||!p.support.reliableHiddenOffsets&&(a.style&&a.style.display||bH(a,"display"))==="none"},p.expr.filters.visible=function(a){return!p.expr.filters.hidden(a)}),p.each({margin:"",padding:"",border:"Width"},function(a,b){p.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bV[d]+b]=e[d]||e[d-2]||e[0];return f}},bO.test(a)||(p.cssHooks[a+b].set=b_)});var cd=/%20/g,ce=/\[\]$/,cf=/\r?\n/g,cg=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,ch=/^(?:select|textarea)/i;p.fn.extend({serialize:function(){return p.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?p.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ch.test(this.nodeName)||cg.test(this.type))}).map(function(a,b){var c=p(this).val();return c==null?null:p.isArray(c)?p.map(c,function(a,c){return{name:b.name,value:a.replace(cf,"\r\n")}}):{name:b.name,value:c.replace(cf,"\r\n")}}).get()}}),p.param=function(a,c){var d,e=[],f=function(a,b){b=p.isFunction(b)?b():b==null?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=p.ajaxSettings&&p.ajaxSettings.traditional);if(p.isArray(a)||a.jquery&&!p.isPlainObject(a))p.each(a,function(){f(this.name,this.value)});else for(d in a)ci(d,a[d],c,f);return e.join("&").replace(cd,"+")};var cj,ck,cl=/#.*$/,cm=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,cn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,co=/^(?:GET|HEAD)$/,cp=/^\/\//,cq=/\?/,cr=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,cs=/([?&])_=[^&]*/,ct=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,cu=p.fn.load,cv={},cw={},cx=["*/"]+["*"];try{ck=f.href}catch(cy){ck=e.createElement("a"),ck.href="",ck=ck.href}cj=ct.exec(ck.toLowerCase())||[],p.fn.load=function(a,c,d){if(typeof a!="string"&&cu)return cu.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),p.isFunction(c)?(d=c,c=b):c&&typeof c=="object"&&(f="POST"),p.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?p("<div>").append(a.replace(cr,"")).find(e):a)}),this},p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){p.fn[b]=function(a){return this.on(b,a)}}),p.each(["get","post"],function(a,c){p[c]=function(a,d,e,f){return p.isFunction(d)&&(f=f||e,e=d,d=b),p.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),p.extend({getScript:function(a,c){return p.get(a,b,c,"script")},getJSON:function(a,b,c){return p.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?cB(a,p.ajaxSettings):(b=a,a=p.ajaxSettings),cB(a,b),a},ajaxSettings:{url:ck,isLocal:cn.test(cj[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":cx},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":p.parseJSON,"text xml":p.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:cz(cv),ajaxTransport:cz(cw),ajax:function(a,c){function y(a,c,f,i){var k,s,t,u,w,y=c;if(v===2)return;v=2,h&&clearTimeout(h),g=b,e=i||"",x.readyState=a>0?4:0,f&&(u=cC(l,x,f));if(a>=200&&a<300||a===304)l.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(p.lastModified[d]=w),w=x.getResponseHeader("Etag"),w&&(p.etag[d]=w)),a===304?(y="notmodified",k=!0):(k=cD(l,u),y=k.state,s=k.data,t=k.error,k=!t);else{t=y;if(!y||a)y="error",a<0&&(a=0)}x.status=a,x.statusText=(c||y)+"",k?o.resolveWith(m,[s,y,x]):o.rejectWith(m,[x,y,t]),x.statusCode(r),r=b,j&&n.trigger("ajax"+(k?"Success":"Error"),[x,l,k?s:t]),q.fireWith(m,[x,y]),j&&(n.trigger("ajaxComplete",[x,l]),--p.active||p.event.trigger("ajaxStop"))}typeof a=="object"&&(c=a,a=b),c=c||{};var d,e,f,g,h,i,j,k,l=p.ajaxSetup({},c),m=l.context||l,n=m!==l&&(m.nodeType||m instanceof p)?p(m):p.event,o=p.Deferred(),q=p.Callbacks("once memory"),r=l.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,setRequestHeader:function(a,b){if(!v){var c=a.toLowerCase();a=u[c]=u[c]||a,t[a]=b}return this},getAllResponseHeaders:function(){return v===2?e:null},getResponseHeader:function(a){var c;if(v===2){if(!f){f={};while(c=cm.exec(e))f[c[1].toLowerCase()]=c[2]}c=f[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return v||(l.mimeType=a),this},abort:function(a){return a=a||w,g&&g.abort(a),y(0,a),this}};o.promise(x),x.success=x.done,x.error=x.fail,x.complete=q.add,x.statusCode=function(a){if(a){var b;if(v<2)for(b in a)r[b]=[r[b],a[b]];else b=a[x.status],x.always(b)}return this},l.url=((a||l.url)+"").replace(cl,"").replace(cp,cj[1]+"//"),l.dataTypes=p.trim(l.dataType||"*").toLowerCase().split(s),l.crossDomain==null&&(i=ct.exec(l.url.toLowerCase())||!1,l.crossDomain=i&&i.join(":")+(i[3]?"":i[1]==="http:"?80:443)!==cj.join(":")+(cj[3]?"":cj[1]==="http:"?80:443)),l.data&&l.processData&&typeof l.data!="string"&&(l.data=p.param(l.data,l.traditional)),cA(cv,l,c,x);if(v===2)return x;j=l.global,l.type=l.type.toUpperCase(),l.hasContent=!co.test(l.type),j&&p.active++===0&&p.event.trigger("ajaxStart");if(!l.hasContent){l.data&&(l.url+=(cq.test(l.url)?"&":"?")+l.data,delete l.data),d=l.url;if(l.cache===!1){var z=p.now(),A=l.url.replace(cs,"$1_="+z);l.url=A+(A===l.url?(cq.test(l.url)?"&":"?")+"_="+z:"")}}(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",l.contentType),l.ifModified&&(d=d||l.url,p.lastModified[d]&&x.setRequestHeader("If-Modified-Since",p.lastModified[d]),p.etag[d]&&x.setRequestHeader("If-None-Match",p.etag[d])),x.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+(l.dataTypes[0]!=="*"?", "+cx+"; q=0.01":""):l.accepts["*"]);for(k in l.headers)x.setRequestHeader(k,l.headers[k]);if(!l.beforeSend||l.beforeSend.call(m,x,l)!==!1&&v!==2){w="abort";for(k in{success:1,error:1,complete:1})x[k](l[k]);g=cA(cw,l,c,x);if(!g)y(-1,"No Transport");else{x.readyState=1,j&&n.trigger("ajaxSend",[x,l]),l.async&&l.timeout>0&&(h=setTimeout(function(){x.abort("timeout")},l.timeout));try{v=1,g.send(t,y)}catch(B){if(v<2)y(-1,B);else throw B}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var cE=[],cF=/\?/,cG=/(=)\?(?=&|$)|\?\?/,cH=p.now();p.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=cE.pop()||p.expando+"_"+cH++;return this[a]=!0,a}}),p.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&cG.test(j),m=k&&!l&&typeof i=="string"&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&cG.test(i);if(c.dataTypes[0]==="jsonp"||l||m)return f=c.jsonpCallback=p.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(cG,"$1"+f):m?c.data=i.replace(cG,"$1"+f):k&&(c.url+=(cF.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||p.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,cE.push(f)),h&&p.isFunction(g)&&g(h[0]),h=g=b}),"script"}),p.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return p.globalEval(a),a}}}),p.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),p.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=e.head||e.getElementsByTagName("head")[0]||e.documentElement;return{send:function(f,g){c=e.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){if(e||!c.readyState||/loaded|complete/.test(c.readyState))c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||g(200,"success")},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var cI,cJ=a.ActiveXObject?function(){for(var a in cI)cI[a](0,1)}:!1,cK=0;p.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&cL()||cM()}:cL,function(a){p.extend(p.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(p.ajaxSettings.xhr()),p.support.ajax&&p.ajaxTransport(function(c){if(!c.crossDomain||p.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async);if(c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||i.readyState===4)){d=b,g&&(i.onreadystatechange=p.noop,cJ&&delete cI[g]);if(e)i.readyState!==4&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}!h&&c.isLocal&&!c.crossDomain?h=l.text?200:404:h===1223&&(h=204)}}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?i.readyState===4?setTimeout(d,0):(g=++cK,cJ&&(cI||(cI={},p(a).unload(cJ)),cI[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var cN,cO,cP=/^(?:toggle|show|hide)$/,cQ=new RegExp("^(?:([-+])=|)("+q+")([a-z%]*)$","i"),cR=/queueHooks$/,cS=[cY],cT={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=cQ.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){c=+f[2],d=f[3]||(p.cssNumber[a]?"":"px");if(d!=="px"&&h){h=p.css(e.elem,a,!0)||c||1;do i=i||".5",h=h/i,p.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&i!==1&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};p.Animation=p.extend(cW,{tweener:function(a,b){p.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");var c,d=0,e=a.length;for(;d<e;d++)c=a[d],cT[c]=cT[c]||[],cT[c].unshift(b)},prefilter:function(a,b){b?cS.unshift(a):cS.push(a)}}),p.Tween=cZ,cZ.prototype={constructor:cZ,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(p.cssNumber[c]?"":"px")},cur:function(){var a=cZ.propHooks[this.prop];return a&&a.get?a.get(this):cZ.propHooks._default.get(this)},run:function(a){var b,c=cZ.propHooks[this.prop];return this.options.duration?this.pos=b=p.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):cZ.propHooks._default.set(this),this}},cZ.prototype.init.prototype=cZ.prototype,cZ.propHooks={_default:{get:function(a){var b;return a.elem[a.prop]==null||!!a.elem.style&&a.elem.style[a.prop]!=null?(b=p.css(a.elem,a.prop,!1,""),!b||b==="auto"?0:b):a.elem[a.prop]},set:function(a){p.fx.step[a.prop]?p.fx.step[a.prop](a):a.elem.style&&(a.elem.style[p.cssProps[a.prop]]!=null||p.cssHooks[a.prop])?p.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},cZ.propHooks.scrollTop=cZ.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},p.each(["toggle","show","hide"],function(a,b){var c=p.fn[b];p.fn[b]=function(d,e,f){return d==null||typeof d=="boolean"||!a&&p.isFunction(d)&&p.isFunction(e)?c.apply(this,arguments):this.animate(c$(b,!0),d,e,f)}}),p.fn.extend({fadeTo:function(a,b,c,d){return this.filter(bZ).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=p.isEmptyObject(a),f=p.speed(b,c,d),g=function(){var b=cW(this,p.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=a!=null&&a+"queueHooks",f=p.timers,g=p._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&cR.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem===this&&(a==null||f[c].queue===a)&&(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&p.dequeue(this,a)})}}),p.each({slideDown:c$("show"),slideUp:c$("hide"),slideToggle:c$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){p.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),p.speed=function(a,b,c){var d=a&&typeof a=="object"?p.extend({},a):{complete:c||!c&&b||p.isFunction(a)&&a,duration:a,easing:c&&b||b&&!p.isFunction(b)&&b};d.duration=p.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in p.fx.speeds?p.fx.speeds[d.duration]:p.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";return d.old=d.complete,d.complete=function(){p.isFunction(d.old)&&d.old.call(this),d.queue&&p.dequeue(this,d.queue)},d},p.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},p.timers=[],p.fx=cZ.prototype.init,p.fx.tick=function(){var a,b=p.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||p.fx.stop()},p.fx.timer=function(a){a()&&p.timers.push(a)&&!cO&&(cO=setInterval(p.fx.tick,p.fx.interval))},p.fx.interval=13,p.fx.stop=function(){clearInterval(cO),cO=null},p.fx.speeds={slow:600,fast:200,_default:400},p.fx.step={},p.expr&&p.expr.filters&&(p.expr.filters.animated=function(a){return p.grep(p.timers,function(b){return a===b.elem}).length});var c_=/^(?:body|html)$/i;p.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){p.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(!l)return;return(d=l.body)===k?p.offset.bodyOffset(k):(c=l.documentElement,p.contains(c,k)?(typeof k.getBoundingClientRect!="undefined"&&(j=k.getBoundingClientRect()),e=da(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},p.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return p.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(p.css(a,"marginTop"))||0,c+=parseFloat(p.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=p.css(a,"position");d==="static"&&(a.style.position="relative");var e=p(a),f=e.offset(),g=p.css(a,"top"),h=p.css(a,"left"),i=(d==="absolute"||d==="fixed")&&p.inArray("auto",[g,h])>-1,j={},k={},l,m;i?(k=e.position(),l=k.top,m=k.left):(l=parseFloat(g)||0,m=parseFloat(h)||0),p.isFunction(b)&&(b=b.call(a,c,f)),b.top!=null&&(j.top=b.top-f.top+l),b.left!=null&&(j.left=b.left-f.left+m),"using"in b?b.using.call(a,j):e.css(j)}},p.fn.extend({position:function(){if(!this[0])return;var a=this[0],b=this.offsetParent(),c=this.offset(),d=c_.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat(p.css(a,"marginTop"))||0,c.left-=parseFloat(p.css(a,"marginLeft"))||0,d.top+=parseFloat(p.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(p.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||e.body;while(a&&!c_.test(a.nodeName)&&p.css(a,"position")==="static")a=a.offsetParent;return a||e.body})}}),p.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);p.fn[a]=function(e){return p.access(this,function(a,e,f){var g=da(a);if(f===b)return g?c in g?g[c]:g.document.documentElement[e]:a[e];g?g.scrollTo(d?p(g).scrollLeft():f,d?f:p(g).scrollTop()):a[e]=f},a,e,arguments.length,null)}}),p.each({Height:"height",Width:"width"},function(a,c){p.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){p.fn[e]=function(e,f){var g=arguments.length&&(d||typeof e!="boolean"),h=d||(e===!0||f===!0?"margin":"border");return p.access(this,function(c,d,e){var f;return p.isWindow(c)?c.document.documentElement["client"+a]:c.nodeType===9?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?p.css(c,d,e,h):p.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=p,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return p})})(window);

/**
 *  弹窗
 */
function showAlert($ionicPopup,title,message,callback) {
    var popup = $ionicPopup.confirm({
            title: title,
            template: message
    });
    popup.then(function(res) {
        if(res) {
            callback(true);
        } else {
            callback(false);
        }
    });
}
/**
 *  提示
 */
function showLoading($ionicLoading,title,$timeout) {

    $ionicLoading.show({
                       template: title
                       });
    //延时2000ms来模拟载入的耗时行为
    $timeout(function(){
             //隐藏载入指示器
             $ionicLoading.hide();
             },2000);

}
/**
 *  非空判断
 */
function isEmpty(title,$ionicLoading,title,$timeout) {
    if(title==undefined || title=="" ||title==null){
        showLoading($ionicLoading,title,$timeout);
        return false;
    }
    return true;
}
/**
 * 复制对象属性
 */
function copyObject(source) {
    var result={};
    for (var key in source) {
        result[key] = typeof source[key]==='object'? copyObject(source[key]): source[key];
    }
    return result;
}
/**
 *  检测版本更新功能
 */
function checkUpdate($ionicPopup)
{
    //安卓版本检测更新
    if(ionic.Platform.isAndroid()){
        postRequest('api/version/info?appkey=380a41396ed63dca','',function(response,code){
                    if(code == 200){
                    var version = response.data.code;
                    getAppVersion(function(temp){
                                  if(version > temp){
                                  // 确认弹出框
                                  showAlert($ionicPopup,'检测到新版本' + version,response.data.description,function(ret){
                                            if(ret){
                                                //下载更新
                                                installApk(response.results[0].trackViewUrl);
                                            }
                                            });
                                  }
                                  });
                    }
                    });
    }
    //ios检测更新方法
    if(ionic.Platform.isIOS()){
        getRequest('http://itunes.apple.com/lookup?id=874287969',function(response,code){
                   if(code == 200){
                   var version = response.results[0].version;
                   getAppVersion(function(temp){
                                 if(version > temp){
                                 // 确认弹出框
                                 showAlert($ionicPopup,'检测到新版本' + version,response.results[0].releaseNotes,function(ret){
                                           if(ret){
                                           //下载更新
                                           openNativeUrl(response.results[0].trackViewUrl);
                                           }
                                           });
                                 }
                                 });
                   }
                   });
        
    }
}

angular.module('HomeController', [])
    .controller('HomeController', function ($scope, $state, $stateParams, Chats, User, $ionicLoading, $timeout, $http, $ionicSlideBoxDelegate, Storage, $rootScope, $interval, $ionicHistory) {
        var user = Storage.get('user');

        function getData() {
            User.userSendCode('index/indexdata', {
                phone: Storage.get('user').phone,
                focusSize: 6,
                circleSize: 2,
                userSize: 4
            }, "").then(function (resp) {
                $scope.data = resp;
                $timeout(function () {
                    $ionicSlideBoxDelegate.update();
                }, 2000);
            });
        }
        $scope.$root.$on('event:update-home', function (e) {
            getData();
        });

        $rootScope.$on('$locationChangeSuccess', function (e, data, a) {
            user = Storage.get('user');
            if (data.indexOf('/login') == -1) {
                if (!user) {
                    $state.go('login');
                }
            }
        });
        if (!user) {
            $state.go('login');
            return;
        }


        $scope.data = {};
        getData();

        $scope.eventList = function (e) {
            $state.go("app.eventlist", {eventtype: e});
        };
        $scope.goNext = function (index) {
            if ($ionicSlideBoxDelegate.$getByHandle('icon-silde-handler') && $ionicSlideBoxDelegate.$getByHandle('icon-silde-handler')._instances) {
                $ionicSlideBoxDelegate.$getByHandle('icon-silde-handler')._instances[1].slide(index);
            }
        };

        $interval(function () {
            var index = $ionicSlideBoxDelegate.$getByHandle('home-banner-slide').currentIndex();
            if ($scope.data.focusList && index == $scope.data.focusList.length - 1) {
                $timeout(function(){
                    $ionicSlideBoxDelegate.$getByHandle('home-banner-slide').slide(0);
                },2000);
            }
        }, 6000);

        $scope.goDetail = function (obj) {

            if (obj.type == "资讯")
                $state.go("app.eventdetail", {id: obj.refId});
            else if (obj.type = "活动")
                $state.go("app.activitydetail", {id: obj.refId});
        };

        $rootScope.goPreView = function(){
            $ionicHistory.goBack();

        };
    });
angular.module('AppController', [])
  .controller('AppController', function ($scope, $ionicModal, $timeout,Storage) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.imgSrc = "";
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };
    $scope.loginOut = function () {
      Storage.clear();
    };

    //image picker
    $scope.pickImage = function () {
      var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };


  })


;
angular.module('EventListController', [])
  .controller('EventListController', function ($scope, $state, $stateParams, Chats, $timeout, User, $rootScope) {
      $scope.searchData = {};
      var type = $stateParams.eventtype;
      $scope.title = type;

      var curPage = 1;
      $scope.noMoreItemsAvailable = true;
      $scope.news = [];


      $scope.doRefresh = function () {
          curPage = 1;
          $scope.noMoreItemsAvailable = true;
          $scope.searchData = {};
          getNewsList(curPage++,'down');
      };


      $scope.load_more = function () {
          getNewsList(curPage, 'up');
          curPage++;
      };

      function getNewsList(page,direction) {
          $scope.searchData.curPage = page;
          $scope.searchData.type = type;
          User.userSendCode('news/querynews', $scope.searchData, "").then(function (resp) {
              parseNews(resp, direction);
          });
      }

      function parseNews(products,direction) {
          direction = direction || 'down';
          if(products && products.constructor.name != 'Array'){
              products = [];
          }
          if(products.length <= 0){
              $scope.noMoreItemsAvailable = false;
          }
          if(direction == 'down'){
              $scope.news = products;
              $scope.$broadcast("scroll.refreshComplete");
          }else if(direction == 'up'){
              $scope.$broadcast("scroll.infiniteScrollComplete");
              $scope.news = $scope.news.concat(products);

          }
      }

      $scope.search = function () {

          if (!$scope.searchData.queryWords)return;
          curPage = 1;
          $scope.news = [];
          getNewsList(curPage);
      };
      //发布后刷新
      $scope.$root.$on('event:refresh-event', function (e, data) {
          if(data.data.type==$scope.title){
              $scope.news.unshift(data.data);
          }else{
              type = data.data.type;
              $timeout(function(){
                  $scope.title = type;
              },1000);
              curPage = 1;
              getNewsList(curPage, 'down');
          }
      });
  });
angular.module('LoginController', [])
  .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state("home", {
            //templateUrl: "home.html"
        })
        .state("music", {
            templateUrl: "music.html"
            , controller: 'LoginController'
        })
        .state("novel", {
            templateUrl: "novel.html"
            , controller: 'RegisterController'

        })
        .state("info", {
            templateUrl: "info.html"
            , controller: 'InfoController'

        });
  })
  .controller('LoginController', function ($scope, $state, $ionicModal, $stateParams, $timeout, User, $ionicLoading, $ionicPopup, Storage, $q, $interval) {
      $scope.loginData = {};

      var position = {};
      position.latitude = "";
      position.longitude = "";
      Storage.set('position', position);

      $scope.goState = function (s) {
          var data = $scope.loginData;
          //$state.go('app.home');
          //return;
          if (!data.username) {
              showLoading($ionicLoading, "请输入手机号", $timeout);
              return;
          }

          if (!data.password) {
              showLoading($ionicLoading, "请输入密码", $timeout);

              return;
          }
          //坐标请求参数{'alumnus.lat':'xxx','alumnus.lng':'xxx'}
          if (position.latitude != '' && position.longitude != '') {
              data['alumnus.lat'] = position.latitude;
              data['alumnus.lng'] = position.longitude;
          }
          postLogin(data);

      };


      function postLogin(loginData) {
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>登录中...</div>"
          });

          User.userLogin('user/login', loginData, "").then(function (resp) {
              $ionicLoading.hide();
              if (resp.code == 0) {
                  Storage.set('user', resp.data.alumnus);
                  $scope.$root.$emit('event:update-user-info');
                  $timeout(function(){
                      $scope.$root.$emit('event:update-home');
                  },200);
                  window.plugins.toast.showShortCenter('登录成功');
                  $state.go('app.home');
              } else {
                  window.plugins.toast.showShortCenter(resp.error);
              }
          });
      }


      $scope.isSendCode = false;
      $scope.timespan = 60;
      $scope.sendCodeText = '发送验证码';
      $scope.timeID = null;

      $scope.sendCode = function (s) {
          var data = $scope.loginData;
          if ($scope.timeID) {
              return;
          }
          $scope.timespan = 60;
          if (data.username == undefined || data.username == "" || data.username == null) {
              showLoading($ionicLoading, "请输入手机号", $timeout);
              return;
          }
          userIsExist(data.username).then(function (isExists) {
              if (!isExists) {
                  showLoading($ionicLoading, "电话未注册", $timeout);
              } else {
                  sendSMSCode(data);
              }
          });
      };

      function sendSMSCode(data) {
          $scope.sendCodeText = '发送中...';
          $scope.timeID = $interval(function () {
              $scope.sendCodeText = '重新发送(' + $scope.timespan + 's)';
              if ($scope.timespan-- <= 0) {
                  $interval.cancel($scope.timeID);
                  $scope.timeID = null;
                  $scope.sendCodeText = '重新发送';
              }
          }, 1000);
          User.userSendCode('user/verifycode', data, "").then(function (resp) {
              if (resp.code == 0) {
                  showLoading($ionicLoading, "验证码已发送", $timeout);
              }
              else {
                  $scope.timespan = 0;
                  $scope.timeID = null;
                  showLoading($ionicLoading, "电话格式不正确,请确认输入", $timeout);
              }
          }, function (err) {
              $scope.timespan = 0;
              $scope.timeID = null;
              showLoading($ionicLoading, "发送失败，稍后重试", $timeout);
          });

      }


      $scope.changePwd = function (s) {
          var data = $scope.loginData;
          if (!data.username) {
              showLoading($ionicLoading, "请输入手机号", $timeout);
              return;
          }
          if (!data.password || !data.password.match(/^[0-9a-zA-Z]{6,16}$/)) {
              showLoading($ionicLoading, "请输入密码（6-16位数字、字母或下划线）", $timeout);
              return;
          }
          if (!data.configpassword) {
              showLoading($ionicLoading, "请输入确认密码", $timeout);
              return;
          } else if (data.configpassword != data.password) {
              showLoading($ionicLoading, "2次密码不一致,请重新输入", $timeout);

              return;
          }

          if (data.verifyCode == undefined || data.verifyCode == "" || data.verifyCode == null) {
              showLoading($ionicLoading, "请输入验证码", $timeout);

              return;
          }
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>提交中...</div>"
          });
          User.userSendCode('user/resetpwd', data, "").then(function (resp) {
              var result = "";
              $ionicLoading.hide();
              if (resp.code == 0) {
                  $state.go("login");
                  result = "修改密码成功";
              } else {
                  result = resp.error;
              }
              showLoading($ionicLoading, result, $timeout);

          });

      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
      //GPS定位成功
      function onSuccess(position) {
          // 百度地图API功能
          //GPS坐标
          var xx = position.coords.longitude;
          var yy = position.coords.latitude;
          //var gpsPoint = new BMap.Point(xx, yy);
          //BMap.Convertor.translate(gpsPoint, 0, translateCallback);
          var position = {};
          position.longitude = xx;
          position.latitude = yy;
          Storage.set('position', position);

      }

      //GPS定位失败
      function onError(error) {

          //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
          switch (error.code) {
              case 1:
                  //alert('您拒绝了使用位置共享服务!');
                  break;
              default :
                  //alert('获取位置失败!');
                  break;
          }
          var position = {};
          position.latitude = "";
          position.longitude = "";
          Storage.set('position', position);
      }

      function userIsExist(phone) {
          var deferred = $q.defer();
          User.userLogin('user/exist', {phone: phone}, "").then(function (resp) {
              deferred.resolve(resp.data);
          });
          return deferred.promise;
      }
  })
  .controller('RegisterController', function ($scope, $state, $ionicModal, $stateParams, $timeout, User, $ionicLoading, $ionicPopup, Storage,$interval) {
      $scope.loginData = {};
      $scope.isSendCode = false;
      $scope.timespan = 60;
      $scope.sendCodeText = '发送验证码';
      $scope.timeID = null;

      $scope.sendCode = function (s) {
          var data = $scope.loginData;
          if ($scope.timeID) {
              return;
          }
          $scope.timespan = 60;
          if (!data.username) {
              showLoading($ionicLoading, "手机号有误，请重新输入", $timeout);
              return;
          }
          User.userLogin('user/exist', {phone: data.username}, "").then(function (resp) {
              var isExists = resp.data;
              if (isExists) {
                  showLoading($ionicLoading, "该手机号已注册", $timeout);
              } else {
                  sendSMSCode(data);
              }

          });
      };

      function sendSMSCode(data) {
          $scope.sendCodeText = '发送中...';
          $scope.timeID = $interval(function () {
              $scope.sendCodeText = '重新发送(' + $scope.timespan + 's)';
              if ($scope.timespan-- <= 0) {
                  $interval.cancel($scope.timeID);
                  $scope.timeID = null;
                  $scope.sendCodeText = '重新发送';
              }
          }, 1000);
          User.userSendCode('user/verifycode', data, "").then(function (resp) {
              if (resp.code == 0) {
                  showLoading($ionicLoading, "验证码已发送", $timeout);
              }
              else {
                  $scope.timespan = 0;
                  $scope.timeID = null;
                  showLoading($ionicLoading, "电话格式不正确,请确认输入", $timeout);
              }
          }, function (err) {
              $scope.timespan = 0;
              $scope.timeID = null;
              showLoading($ionicLoading, "发送失败，稍后重试", $timeout);
          });

      }

      $scope.goRegister = function (s) {
          var data = $scope.loginData;
          if (!data.username) {
              showLoading($ionicLoading, "手机号有误，请重新输入", $timeout);
              return;
          }
          if (!data.password || !data.password.match(/^[0-9a-za-z]{6,16}$/)) {
              showLoading($ionicLoading, "请输入密码（6-16位数字、字母或下划线）", $timeout);
              return;
          }
          if (!data.configpassword) {
              showLoading($ionicLoading, "请输入确认密码", $timeout);
              return;
          } else if (data.configpassword != data.password) {
              showLoading($ionicLoading, "2次密码不一致,请重新输入", $timeout);
              return;
          }
          if (!data.verifyCode) {
              showLoading($ionicLoading, "请输入验证码", $timeout);
              return;
          }
          if (!data.invitateCode) {
              showLoading($ionicLoading, "请输入邀请码", $timeout);
              return;
          }

          var position = Storage.get('position');
          //坐标请求参数{'alumnus.lat':'xxx','alumnus.lng':'xxx'}
          if (position && position.latitude != '' && position.longitude != '') {
              data['alumnus.lat'] = position.latitude;
              data['alumnus.lng'] = position.longitude;
          }

          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>注册中...</div>"
          });
          User.userSendCode('user/register', data, "").then(function (resp) {
              $ionicLoading.hide();
              var result = "";
              if (resp.code == 0) {
                  result = "注册成功";
                  Storage.set('user', {phone: data.username});
                  $state.go('info');
              } else {
                  result = resp.error;
              }
              showLoading($ionicLoading, result, $timeout);
          });
      };
      $scope.goInfo = function (s) {
          $state.go("info");
      }


  })
  .controller('InfoController', function ($scope, $state, $ionicModal, $stateParams, $timeout, User, $ionicLoading, $ionicPopup, VKHttp, Storage, $rootScope, imageUpload,$ionicActionSheet) {
      $scope.infoData = {};
      $scope.imgSrc = "";
      $scope.infoData = {};

      $scope.goSubmit = function () {
          var res = checkedInput($scope.infoData);
          if(!res){
              return ;
          }
          $scope.infoData.phone = Storage.get('user').phone;
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>上传中...</div>"
          });
          imageUpload.upload({
              url: 'user/uploadheadpic',
              fields: $scope.infoData,
              file: $scope.infoData.file
          }, function (evt) {
              //TODO progress
          }).then(function (result) {
              $ionicLoading.hide();
              if (result.data) {
                  User.userSendCode('user/perfinfo', $scope.infoData, "").then(function (resp) {
                      window.plugins.toast.showShortCenter('上传成功');
                      $rootScope.headPicPath = result.data.data.alumnus.headPicPath;
                      Storage.set('user', resp.data.data.alumnus);
                      $scope.$root.$emit('event:update-user-info');
                      $scope.$root.$emit('event:update-home');
                      $state.go('app.home');
                  });
              }
          }, function (err) {
              $ionicLoading.hide();
              window.plugins.toast.showShortCenter(err);
          });

      };
      function checkedInput(data) {
          if (!data.realName) {
              showLoading($ionicLoading, "请输入姓名", $timeout);
              return false;
          }
          if (data.sex == undefined || data.sex == "" || data.sex == null) {
              showLoading($ionicLoading, "请选择性别", $timeout);
              return false;
          }
          if (!data.school) {
              showLoading($ionicLoading, "请输入学校", $timeout);
              return false;
          }
          if (!data.department) {
              showLoading($ionicLoading, "请输入院系", $timeout);
              return false;
          }
          if (!data.grade) {
              showLoading($ionicLoading, "请输入年级", $timeout);
              return false;
          }
          if (!data.company) {
              showLoading($ionicLoading, "请输入公司", $timeout);
              return false;
          }
          return true;
      }

      $scope.form = {
          userHeadImg: '',
          headImg: ''
      };

      //文件上传
      $scope.uploadFiles = function (file) {
          $scope.infoData.file = file;
      };


      $scope.showImgWhenSelect = function () {
          var file = document.getElementById('upimg');
      };

      // 上传图片
      var span = document.getElementById('img');

      function fileSelect2(e) {
          e = e || window.event;
          var files = this.files;
          var p = document.getElementById('div');
          var f = files[0];
          var reader = new FileReader();
          reader.onload = (function (file) {
              return function (e) {
                  span.src = this.result;
              };
          })(f);
          //读取文件内容
          reader.readAsDataURL(f);
      }
      var schools = [
          {text: '上海交大'},
          {text: '西安交大'},
          {text: '西南交大'},
          {text: '北京交大'},
          {text: '大连交大'},
          {text: '兰州交大'},
          {text: '华东交大'},
          {text: '重庆交大'}
      ];

      $scope.openSchoolList = function () {
          var hideSheet = $ionicActionSheet.show({
              buttons: schools,
              titleText: '请选择学校',
              cancelText: '取消',
              buttonClicked: function(index) {
                  $scope.infoData.school =  schools[index].text;
                  return true;
              }
          });

      };

      document.getElementById('upimg').addEventListener('change', fileSelect2, false);
  });
angular.module('ChatListsController', [])
    .controller('ChatListsController', function ($scope, $state, $stateParams, Chats, Storage, User) {


        var curPage = 1;
        $scope.noMoreItemsAvailable = true;
        $scope.chats = [];
        //          getNewsList(curPage);

        $scope.doRefresh = function () {
            curPage = 1;
            getNewsList(curPage);
        }


        $scope.load_more = function () {
            getNewsList(curPage);
            curPage++;
        }


        function getNewsList(page) {
            User.userSendCode('message/msgnotify', {
                'curPage': page,
                phone: Storage.get('user').phone
            }, "").then(function (resp) {

                if (resp.data != undefined && resp.data.length == 0) {
                    //$scope.chats = [];
                    $scope.$broadcast("scroll.refreshComplete");
                    $scope.noMoreItemsAvailable = false;

                } else {
                    parseNews(resp);
                }
            });
        }

        function parseNews(products) {

            var mys = products.length > 0 ? products.length - 1 : 0;
            if (mys == 0) {
                $scope.noMoreItemsAvailable = false;
                console.log(JSON.stringify(products));
                if (curPage == 1) {
                    $scope.chats = products;
                    $scope.$broadcast("scroll.refreshComplete");
                } else {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.chats = $scope.chats.concat(products);
                }
            } else {

                if (curPage == 1) {
                    $scope.chats = products;
                    $scope.$broadcast("scroll.refreshComplete");
                } else {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.chats = $scope.chats.concat(products);
                }
            }
        }

        $scope.remove = function (chat) {
            $scope.chats.splice($scope.chats.indexOf(chat), 1);
        }

        //刷新圈子报名人数
        $scope.$root.$on('event:refresh-chat', function (e, data) {
            angular.forEach($scope.chats, function (item) {
                if (item.ctcUser.alumnus.realName == data.id) {
                    item.msg=data.content;
                }

            });
        });
    });
angular.module('SchoolmateListsController', [])
    .controller('SchoolmateListsController', function ($scope, $state, $stateParams, Chats, $timeout, User, Storage, $ionicModal ,$rootScope,$ionicHistory) {

        $scope.searchData = {};
        var orderby = "";

        var curPage = 1;
        $scope.noMoreItemsAvailable = true;
        $scope.news = [];
        var orderby = "location";

        $scope.doRefresh = function () {
            curPage = 1;
            $scope.searchData = {};
            $scope.noMoreItemsAvailable = true;
            getNewsList(curPage, orderby, 'down');
        };

        $scope.load_more = function () {
            getNewsList(curPage,orderby,'up');
            curPage++
        };

        function getNewsList(page, order, direction) {
            var obj = $scope.searchData;
                obj.curPage = page;
                obj.phone = Storage.get('user').phone;
                obj.orderby = order;
            User.userSendCode('friend/queryallfriend',obj, "").then(function (resp) {
                parseNews(resp, direction);
            });
        }

        function parseNews(products, direction) {
            direction = direction || 'down';
            if(products && products.constructor.name != 'Array'){
                products = [];
            }
            if(products.length <= 0){
                $scope.noMoreItemsAvailable = false;
            }
            if(direction == 'down'){
                $scope.news = products;
                $scope.$broadcast("scroll.refreshComplete");
            }else if(direction == 'up'){
                $scope.$broadcast("scroll.infiniteScrollComplete");
                $scope.news = $scope.news.concat(products);
            }
        }

        $scope.on_select = function (idx) {
            if (idx == 'location' && orderby == 'location')return;
            if (idx == 'username' && orderby == 'username')return;
            orderby = idx;
            curPage = 1;
            $scope.noMoreItemsAvailable = true;
            $scope.news=[];
            getNewsList(curPage, orderby);

        };

        $ionicModal.fromTemplateUrl("my-modal.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.searchData.school = '选择学校';
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //Cleanup the modal when we are done with it!
        $scope.$on("$destroy", function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on("modal.hidden", function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on("modal.removed", function () {
            // Execute action
        });
        $scope.searchBtn = function () {
            $scope.modal.hide();
            if($scope.searchData.school == '选择学校'){
                $scope.searchData.school = '';
            }
            var obj = $scope.searchData;
            if (obj != null) {
                curPage = 1;
                obj.curPage = curPage;
                obj.phone = Storage.get('user').phone;
                obj.orderby = orderby;
                $scope.news = [];
                $scope.noMoreItemsAvailable = true;
                getNewsList(curPage,orderby);
                //User.userSendCode('friend/queryallfriend', obj, "").then(function (resp) {
                //    parseNews(resp);
                //});
            }
        };
      $rootScope.goPreView = function(){
          $ionicHistory.goBack();

      };

      $scope.getDistance = function(num){
          num = num *1;
          if(num < 1000){
              return num.toFixed(2)+ 'm';
          }else {
              return (num/1000).toFixed(2) + 'km';
          }
          return '0m';
      };

    });
angular.module('SchoolmateDetailController', [])
  .controller("SchoolmateDetailController",function($scope,$state,$stateParams,Chats,$timeout,$ionicPopup,$ionicLoading,$ionicGesture,User,$rootScope,Storage){

    var mateId = $stateParams.id;
    if($scope.mateID){
      mateId = $scope.mateID;
    }

    getNewsDetail(mateId);
    function getNewsDetail(id){
      User.userSendCode('user/viewuser',{phone:id},"").then(function(resp){
        $scope.mate = resp;
      });
    }

    $scope.sendMessage = function(url){
      $scope.cancel();
    };


  });


angular.module('SettingController', [])
    .controller('SettingController', function ($scope, $state, $stateParams, Storage,$rootScope) {

        $scope.user = Storage.get('user');
        $rootScope.headPicPath = $scope.user.headPicPath;
        $scope.loginName = 'kllll';
        var currentUser = new Object();
        currentUser.score = 90;
        $scope.currentUser = currentUser;

        var set = new Object();
        set.version = 1.7;

        $scope.settings = set;
        $scope.loginOut = function () {
            $state.go("login");
            Storage.clear();
        }
        $scope.inviteOthers = function () {
        }

    });
angular.module('ActivityController', [])
  .controller('ActivityController', function ($scope, $stateParams, Chats, User,Storage) {
      $scope.searchData = {};
      var curPage = 1;
      $scope.noMoreItemsAvailable = true;
      $scope.activitys = [];
      $scope.doRefresh = function () {
          curPage = 1;
          $scope.noMoreItemsAvailable = true;
          $scope.searchData = {};
          getNewsList(curPage);
      };

      $scope.load_more = function () {
          getNewsList(curPage);
          curPage++;
      };
      function getNewsList(page) {
          $scope.searchData.curPage = page;
          $scope.searchData.phone = Storage.get('user').phone;

          User.userSendCode('activity/queryactivity', $scope.searchData, "").then(function (resp) {
              parseNews(resp);
          });
      }
      function parseNews(products) {
          var mys = products.length > 0 ? products.length - 1 : 0;
          if (mys == 0) {
              if(curPage == 1&&products.length>0){
                  $scope.activitys = products;
              }else{
                  if(products.length>0){
                      $scope.activitys = $scope.activitys.concat(products);
                  }
                  $scope.noMoreItemsAvailable = false;
              }
          } else {
              if (curPage == 1) {
                  $scope.activitys = products;
                  $scope.$broadcast("scroll.refreshComplete");
              } else {
                  $scope.$broadcast("scroll.infiniteScrollComplete");
                  $scope.activitys = $scope.activitys.concat(products);
              }
          }
      }

      $scope.searchKeyWords = function () {
          if ($scope.searchData.queryWords == "")return;
          $scope.activitys = [];
          curPage = 1;
          getNewsList(curPage);
      };
      //发布后刷新
      $scope.$root.$on('event:refresh-activity', function (e, data) {
          var activity = data.data;
          activity.state='1';
          $scope.activitys.unshift(activity);
      });
  });
angular.module('PersonController', ['ngFileUpload'])
  .controller('PersonController', function ($scope, $state, $ionicModal, $stateParams, $timeout, $ionicPopup, Storage, User, Upload, $rootScope, imageUpload, $ionicActionSheet, $ionicLoading) {
      $scope.allowchange = true;
      getMyInfo();

      $scope.status = {};

      // 显示定制弹出框
      $scope.showPopup = function (title, model) {
          $scope.data = {};
          if(title == '姓名' && $scope.my.alumnus.realName){
              window.plugins.toast.showShortCenter('不可修改');
              return ;
          }
          // 调用$ionicPopup弹出定制弹出框
          $ionicPopup.show({
              template: "<input type='text' ng-model=data." + model + ">",
              title: "请输入" + title,
              subTitle: "",
              scope: $scope,
              buttons: [
                  {text: "取消"},
                  {
                      text: "<b>保存</b>",
                      type: "button-bg",
                      onTap: function (e) {
                          return $scope.data;
                      }
                  }
              ]
          })
            .then(function (res) {
                if (JSON.stringify(res) != "{}" && res != undefined) {
                    res.phone = Storage.get('user').phone;
                    User.userSendCode('user/perfinfo', res, "").then(function (resp) {
                        $scope.mate = resp;
                        getMyInfo();
                    });
                }
            });            // 调用$ionicPopup弹出定制弹出框
      };

      function getMyInfo() {
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>提交中...</div>"
          });
          User.userSendCode('user/viewuser', {phone: Storage.get('user').phone}, "").then(function (resp) {
              $ionicLoading.hide();
              $scope.my = resp;
              $scope.my.alumnus.school = $scope.my.alumnus.school || '上海交大';
              if (resp != "" && resp.alumnus != undefined) {
                  Storage.set('user', resp.alumnus);
                  $scope.$root.$emit('event:update-user-info');
              }
          });
      }


      $scope.form = {
          userHeadImg: '',
          headImg: ''
      };

      //文件上传
      $scope.uploadFiles = function (file) {
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>上传中...</div>"
          });
          imageUpload.upload({
              url: 'user/uploadheadpic',
              fields: {phone: Storage.get('user').phone},
              file: file
          }, function (evt) {
              //TODO progress
          }).then(function (result) {
              $ionicLoading.hide();
              if (result.data) {
                  User.userSendCode('user/perfinfo', $scope.infoData, "").then(function (resp) {
                      window.plugins.toast.showShortCenter('上传成功');
                      $rootScope.headPicPath = result.data.data.alumnus.headPicPath;
                  });
              }
          }, function (err) {
              $ionicLoading.hide();
              window.plugins.toast.showShortCenter(err);
          });

      };

      var schools = [
          {text: '上海交大'},
          {text: '西安交大'},
          {text: '西南交大'},
          {text: '北京交大'},
          {text: '大连交大'},
          {text: '兰州交大'},
          {text: '华东交大'},
          {text: '重庆交大'}
      ];

      $scope.openSchoolList = function () {
          var hideSheet = $ionicActionSheet.show({
              buttons: schools,
              titleText: '请选择学校',
              cancelText: '取消',
              buttonClicked: function(index) {
                  var data = {};
                  data.phone = Storage.get('user').phone;
                  data.school = schools[index].text;
                  User.userSendCode('user/perfinfo', data, "").then(function (resp) {
                      $scope.mate = resp;
                      getMyInfo();
                  });
                  return true;
              }
          });

      };

      $scope.showImgWhenSelect = function () {
          console.log($scope.form.headImg);
          var file = document.getElementById('upimg');
          console.log(file);

      };

      // 上传图片
      var span = document.getElementById('img');

      function fileSelect2(e) {
          e = e || window.event;
          var files = this.files;
          var p = document.getElementById('div');
          var f = files[0];
          var reader = new FileReader();
          reader.onload = (function (file) {
              return function (e) {
                  span.src = this.result;
              };
          })(f);
          //读取文件内容
          reader.readAsDataURL(f);
      }

      document.getElementById('upimg').addEventListener('change', fileSelect2, false);

      $scope.setSex = function () {

          if($scope.my.alumnus.sex){
              window.plugins.toast.showShortCenter('不可修改');
              return ;
          }
          // Show the action sheet
          var hideSheet = $ionicActionSheet.show({
              titleText: "选择性别",
              buttons: [
                  {text: "女"},
                  {text: "男"}
              ],
              buttonClicked: function (index) {
                  var data = {};
                  data.phone = Storage.get('user').phone;
                  data.sex = index;
                  User.userSendCode('user/perfinfo', data, "").then(function (resp) {
                      $scope.mate = resp;
                      getMyInfo();
                  });
                  return true;
              },
              cancelText: "取消",
              cancel: function () {
                  // add cancel code..
              },

          });

          // For example's sake, hide the sheet after two seconds
          $timeout(function () {
              //	hideSheet();
          }, 2000);

      };

  });
angular.module('ReleaseEventController', [])
  .controller('ReleaseEventController', function ($scope, $state, $stateParams, Chats, User, Storage, $http, VKHttp, $rootScope, $ionicLoading, $timeout,imageUpload) {

      $scope.newData = {
          content: '',
          intro: ''
      };
      $scope.image = {};

      var span = document.getElementById('img');

      function fileSelect2(e) {
          e = e || window.event;
          var files = this.files;
          //            for(var i = 0, f; f = files[i]; i++) {
          var f = files[0];
          var reader = new FileReader();
          reader.onload = (function (file) {
              return function (e) {
                  span.src = this.result;
                  $scope.newData.picPath = span.src;
              };
          })(f);
          //读取文件内容
          reader.readAsDataURL(f);
      }
      document.getElementById('upimg').addEventListener('change', fileSelect2, false);


      $scope.uploadFiles = function (file) {
          $scope.image.file = file;

      };


      $scope.goSubmit = function () {
          console.log($scope.newData);
          if (typeof($scope.newData.title) == "undefined") {
              showLoading($ionicLoading, "请输入标题", $timeout);
              return;
          } else if (typeof($scope.newData.type) == "undefined" || $scope.newData.type == '请选择') {
              showLoading($ionicLoading, "请选择类型", $timeout);
              return;
          }

          var data = $scope.newData;
          data.phone = Storage.get('user').phone;
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>上传中...</div>"
          });
          //if(data.content.length > 1000){
          //    showLoading($ionicLoading, "输入内容超过1000字数限制!", $timeout);
          //    return;
          //}

          imageUpload.upload({
              url: 'news/createnews',
              fields: data,
              file: $scope.image.file
          }, function (evt) {
              //TODO progress
          }).then(function (result) {
              $ionicLoading.hide();
              if (result.data.code=="0") {
                  showLoading($ionicLoading, "发布成功", $timeout);
                  history.go(-1);
                  $scope.$root.$emit('event:refresh-event', {data:result.data.data});
              }else{
                  showLoading($ionicLoading, '发布失败，稍后重试', $timeout);
              }
          }, function (err) {
              // TODO erro
              $ionicLoading.hide();
              showLoading($ionicLoading, err, $timeout);
          });
      };

  });
angular.module('MineGroupListController', [])
  .controller('MineGroupListController', function ($scope, $state, $stateParams, Chats, $timeout, User, $rootScope, Storage, $ionicLoading) {
      $scope.searchData = {};

      var curPage = 1;
      $scope.noMoreItemsAvailable = true;
      $scope.group = [];


      $scope.$root.$on('event:refresh-my-group', function(e,data){
          $scope.doRefresh();
      });


      $scope.doRefresh = function () {
          curPage = 1;
          $scope.noMoreItemsAvailable = true;
          $scope.group = [];
          getNewsList(curPage++, 'down');
      };

      $scope.load_more = function () {
          getNewsList(curPage, 'up');
          curPage++;
      };

      function getNewsList(page, direction) {
          $scope.searchData.curPage = page;
          $scope.searchData.phone = Storage.get('user').phone;

          User.userSendCode('circle/querymycircles',$scope.searchData, "").then(function (resp) {
              parseNews(resp, direction);
          });
      }

      function parseNews(products, direction) {
          //console.log(direction);
          if(products && products.constructor.name != 'Array'){
              products = [];
          }
          if(products.length<=0){
              $scope.noMoreItemsAvailable = false;
          }
          if(direction == 'down'){
              $scope.group = products;
              $scope.$broadcast("scroll.refreshComplete");
              $scope.noMoreItemsAvailable = true;
          }
          else if(direction == 'up') {
              $scope.group = $scope.group.concat(products);
              $scope.$broadcast("scroll.infiniteScrollComplete");
          }
      }

      $scope.goJoinGroup = function (groupid) {
          User.userSendCode('circle/join', {
              'id': groupid,
              phone: Storage.get('user').phone
          }, "").then(function (resp) {
              if (resp.code == 0)
                  showLoading($ionicLoading, "加入成功", $timeout);
              else
                  showLoading($ionicLoading, resp.error, $timeout);
          });
      };
      $scope.searchKeyWords = function(){
          $scope.group = [];
          curpage=1;
          getNewsList(curpage);
      }

  });
angular.module('MineGroupDetailController', [])
    .controller('MineGroupDetailController', function ($scope, $state, $stateParams, Chats, $timeout, $ionicPopup, $ionicLoading, $ionicGesture, User, $rootScope, Storage,$ionicModal) {
        $scope.replyData = {};
        var curPage = 1;
        $scope.noMoreItemsAvailable = true;
        $scope.group = [];

        $scope.title = $stateParams.title || '评论';


        $scope.doRefresh = function () {
            curPage = 1;
            getNewsList(curPage);
        };


        $scope.load_more = function () {
            getNewsList(curPage);
            curPage++;
        };


        function getNewsList(page) {
            User.userSendCode('circle/querycircmt', {
                'curPage': page,
                circleid: $stateParams.id
            }, "").then(function (resp) {
                parseNews(resp);
            });
        }
        function parseNews(products) {
            var mys = products.length > 0 ? products.length - 1 : 0;
            if (mys == 0) {
                $scope.noMoreItemsAvailable = false;
                if(products.length>0)
                $scope.group = products;
            } else {

                if (curPage == 1) {
                    //alert(JSON.stringify(products));
                    $scope.group = products;

                    $scope.$broadcast("scroll.refreshComplete");
                } else {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.group = $scope.group.concat(products);
                }
            }
        }

        $scope.saveReply = function (groupid) {
            if($scope.replyData.content)
            User.userSendCode('circle/createcircmt', {
                'circle.id': $stateParams.id,
                phone: Storage.get('user').phone,
                content: $scope.replyData.content
            }, "").then(function (resp) {
                if (resp.code == "0") {
                    showLoading($ionicLoading, "评论成功", $timeout);
                    refreshData();
                    $scope.replyData = {};
                } else {
                    showLoading($ionicLoading, resp.error, $timeout);
                }
            });
        };

        function refreshData() {
            curPage = 1;
            getNewsList(1);
        }

        var personModal = null;
        $scope.openPersonModal = function(id) {
            if(personModal){
                return null;
            }
            personModal = true;

            var subScope = $scope.$root.$new();
            subScope.mateID = id;
            subScope.cancel = function(){
                personModal.remove();
                personModal = null;
            };
            $ionicModal.fromTemplateUrl('./templates/person-info-modal.html',{
                scope: subScope,
                animation: 'slide-in-up'
            }).then(function(modal){
                personModal = modal;
                modal.show();
            });

        };


    });

angular.module('AllGroupListController', [])
  .controller('AllGroupListController', function ($scope, $state, $stateParams, Chats, $timeout, User, $rootScope, Storage, $ionicLoading) {
      $scope.searchData = {};
      var curPage = 1;
      $scope.noMoreItemsAvailable = true;
      $scope.group = [];


      $scope.doRefresh = function () {
          curPage = 1;
          $scope.noMoreItemsAvailable = true;
          $scope.searchData = {};
          getNewsList(curPage++,'down');
      };


      $scope.load_more = function () {
          getNewsList(curPage,'up');
          curPage++;
      };


      function getNewsList(page,direction) {
          $scope.searchData.curPage = page;
          $scope.searchData.phone = Storage.get('user').phone;
          User.userSendCode('circle/querycircles', $scope.searchData, "").then(function (resp) {
              parseNews(resp,direction);
          });
      }

      function parseNews(products,direction) {
          direction = direction || 'down';
          if(products && products.constructor.name != 'Array'){
              products = [];
          }
          if(products.length <= 0){
              $scope.noMoreItemsAvailable = false;
          }
          if(direction == 'down'){
              $scope.group = products;
              $scope.$broadcast("scroll.refreshComplete");
          }else if(direction == 'up'){
              $scope.$broadcast("scroll.infiniteScrollComplete");
              $scope.group = $scope.group.concat(products);
          }
      }

      $scope.goDetail = function(id, name){
          $state.go('app.groupinfo',{id:id, name:name});
      };

      $scope.goJoinGroup = function ($event,group,circle) {

          $event.stopPropagation();
          if(group.join=="1"){
              showLoading($ionicLoading, "已加入", $timeout);
              return;
          }
          User.userSendCode('circle/join', {
              'id': circle.id,
              phone: Storage.get('user').phone
          }, "").then(function (resp) {
              if (resp.code == 0){
                  showLoading($ionicLoading, "加入成功", $timeout);
                  circle.cmtCount += 1;
                  group.join = 1;
                  $scope.$root.$emit('event:refresh-my-group');
              }
              else
                  showLoading($ionicLoading, resp.error, $timeout);
          });

      };
      $scope.searchKeyWords = function () {
          $scope.group = [];
          curpage = 1;
          getNewsList(curpage);
      };

      //刷新圈子报名人数
      $scope.$root.$on('event:refresh-count',function(e,data){
          angular.forEach($scope.group, function(item){
              if(item.circle.id == data.id){
                  item.circle.cmtCount += 1;
                  item.join = 1;
              }
          });
      });

  });
angular.module('GroupInfoController', [])
    .controller('GroupInfoController', function ($scope, $state, $stateParams, Chats, $timeout, $ionicPopup, $ionicLoading, $ionicGesture, User, $rootScope, Storage,$ionicHistory) {
        $scope.groupModel = {
            join: 0
        };

        getGroupDetail($stateParams.id);

        function getGroupDetail(id) {
            User.userSendCode('circle/viewcircle', {
                phone: Storage.get('user').phone,
                id: id
            }, "").then(function (resp) {

                $scope.groupModel = resp;
                console.log($scope.groupModel.join == '1');
            });
        }

        $scope.goJoinGroup = function (groupid, group) {
            if (group.join == '1') {
                showLoading($ionicLoading, "已加入", $timeout);
                return;
            }
            User.userSendCode('circle/join', {
                'id': groupid,
                phone: Storage.get('user').phone
            }, "").then(function (resp) {
                if (resp.code == 0) {
                    showLoading($ionicLoading, "成功加入", $timeout);
                    group.join = 1;
                    $scope.$root.$emit('event:refresh-count', {id: groupid});
                    getGroupDetail($stateParams.id);
                }
                else showLoading($ionicLoading, resp.error, $timeout);
            });

        }
      $rootScope.goPreView = function(){
          $ionicHistory.goBack();

      };


    });

angular.module('EventDetailController', [])
  .controller("EventDetailController", function ($scope, $state, $stateParams, Chats, $timeout, $ionicPopup, $ionicLoading, $ionicGesture, User, $rootScope, Storage) {
      $scope.news = {};
      $scope.comments = {};
      $scope.replyData = {};

      getNewsDetail($stateParams.id);

      function getNewsDetail(id) {
          User.userSendCode('news/viewnews', {phone:Storage.get('user').phone,id: $stateParams.id}, "").then(function (resp) {
              $scope.news = resp.news;
              $scope.comments = resp.comments;
          });
      }

      $scope.saveReply = function (id) {
          $scope.replyData.phone = Storage.get('user').phone;
          var news = {};
          news.id = $stateParams.id;
          $scope.replyData.news = news;
          User.userSendCode('news/createnewscmt', {
              "news.id": $stateParams.id,
              phone: Storage.get('user').phone,
              content: $scope.replyData.content
          }, "").then(function (resp) {
              if (resp.code == 0) {
                  showLoading($ionicLoading, "评论成功", $timeout);
                  refreshData();
                  $scope.replyData = {};
              }
              else
                  showLoading($ionicLoading, resp.error, $timeout);
          });
      };
      $scope.saveLike = function (id) {
          User.userSendCode('news/likenewscmt', {
              "id": id,
              phone: Storage.get("user").phone
          }, "").then(function (resp) {
              if (resp.code == 0) {
                  showLoading($ionicLoading, "已点赞", $timeout);
                  refreshData();
              }
              else
                  showLoading($ionicLoading, resp.error, $timeout);
          });

      };
      $scope.saveReplyOther = function (commentid, userid) {
          if(userid == Storage.get('user').id){
              return ;
          }
          $scope.data = {};
          // 调用$ionicPopup弹出定制弹出框
          $ionicPopup.show({
              template: "<input type='text' ng-model='data.content'>",
              title: "请输入回复内容",
              subTitle: "",
              scope: $scope,
              buttons: [
                  {text: "取消"},
                  {
                      text: "<b>发送</b>",
                      type: "button-bg",
                      onTap: function (e) {
                          return $scope.data.content;
                      }
                  }
              ]
          })
            .then(function (res) {

                if (res) {
                    replyOtherRequest(commentid, res);
                }
            });
      };

      function replyOtherRequest(id, res) {
          $scope.replyData.phone = Storage.get("user").phone;
          var news = {};
          news.id = $stateParams.id;
          $scope.replyData.news = news;
          User.userSendCode('news/createnewscmt', {
              "parentNewsCmt.id": id,
              "news.id": $stateParams.id,
              phone: Storage.get("user").phone,
              content: res
          }, "").then(function (resp) {
              if (resp.code == 0) {
                  showLoading($ionicLoading, "评论成功", $timeout);
                  refreshData();
              } else
                  showLoading($ionicLoading, resp.error, $timeout);
          });
      }

      function refreshData() {
          getNewsDetail($stateParams.id);

      }

  });


angular.module('ReleaseEventController', [])
  .controller('ReleaseEventController', function ($scope, $state, $stateParams, Chats, User, Storage, $http, VKHttp, $rootScope, $ionicLoading, $timeout,imageUpload) {

      $scope.newData = {
          content: '',
          intro: ''
      };
      $scope.image = {};

      var span = document.getElementById('img');

      function fileSelect2(e) {
          e = e || window.event;
          var files = this.files;
          //            for(var i = 0, f; f = files[i]; i++) {
          var f = files[0];
          var reader = new FileReader();
          reader.onload = (function (file) {
              return function (e) {
                  span.src = this.result;
                  $scope.newData.picPath = span.src;
              };
          })(f);
          //读取文件内容
          reader.readAsDataURL(f);
      }
      document.getElementById('upimg').addEventListener('change', fileSelect2, false);


      $scope.uploadFiles = function (file) {
          $scope.image.file = file;

      };


      $scope.goSubmit = function () {
          console.log($scope.newData);
          if (typeof($scope.newData.title) == "undefined") {
              showLoading($ionicLoading, "请输入标题", $timeout);
              return;
          } else if (typeof($scope.newData.type) == "undefined" || $scope.newData.type == '请选择') {
              showLoading($ionicLoading, "请选择类型", $timeout);
              return;
          }

          var data = $scope.newData;
          data.phone = Storage.get('user').phone;
          $ionicLoading.show({
              template: "<ion-spinner icon='bubbles'></ion-spinner><div>上传中...</div>"
          });
          //if(data.content.length > 1000){
          //    showLoading($ionicLoading, "输入内容超过1000字数限制!", $timeout);
          //    return;
          //}

          imageUpload.upload({
              url: 'news/createnews',
              fields: data,
              file: $scope.image.file
          }, function (evt) {
              //TODO progress
          }).then(function (result) {
              $ionicLoading.hide();
              if (result.data.code=="0") {
                  showLoading($ionicLoading, "发布成功", $timeout);
                  history.go(-1);
                  $scope.$root.$emit('event:refresh-event', {data:result.data.data});
              }else{
                  showLoading($ionicLoading, '发布失败，稍后重试', $timeout);
              }
          }, function (err) {
              // TODO erro
              $ionicLoading.hide();
              showLoading($ionicLoading, err, $timeout);
          });
      };

  });
angular.module('ReleaseActivityController', ['ionic-datepicker', 'ionic-timepicker'])
    .controller('ReleaseActivityController', function ($scope, $state, $stateParams, Chats, User, Storage, $http, VKHttp, $rootScope, $ionicLoading, $timeout, imageUpload) {
        $scope.dataActivity = {};
        $scope.image = {};
        $scope.startDatePicker = {
            titleLabel: '选择日期',
            inputDate: new Date(),
            templateType: 'popup',
            callback: function (val) {
                if (val) {
                    val = getNowFormatDate(val);
                    $scope.dataActivity.startDate = val;
                    //$scope.dataActivity.startDate = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();

                }
            }
        };
        $scope.startTimePicker = {
            titleLabel: '选择时间',
            inputEpochTime: (9 * 60 * 60),
            templateType: 'popup',
            callback: function (val) {
                    var selectedTime = new Date(val * 1000);
                    var time = selectedTime.getUTCHours();
                    if(selectedTime.getUTCHours()<10){
                        var time = '0'+selectedTime.getUTCHours();
                    }
                    var second = selectedTime.getUTCMinutes();
                    if(selectedTime.getUTCMinutes()<10){
                        var second = '0'+selectedTime.getUTCMinutes();
                    }

                    $scope.dataActivity.startTime = time + ':' + second;// + ':00';
            }
        };
        $scope.endDatePicker = {
            titleLabel: '选择日期',
            inputDate: new Date(),
            templateType: 'popup',
            callback: function (val) {
                if (val) {
                    val = getNowFormatDate(val);
                    $scope.dataActivity.endDate = val;
                    //$scope.dataActivity.endDate = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();

                }
            }
        };
        $scope.endTimePicker = {
            titleLabel: '选择时间',
            inputEpochTime: ( 17 * 60 * 60),
            templateType: 'popup',
            callback: function (val) {
                //if (val) {
                //    var selectedTime = new Date(val * 1000);
                //    $scope.dataActivity.endTime = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes() + ':00';
                //}
                var selectedTime = new Date(val * 1000);
                var time = selectedTime.getUTCHours();
                if(selectedTime.getUTCHours()<10){
                    var time = '0'+selectedTime.getUTCHours();
                }
                var second = selectedTime.getUTCMinutes();
                if(selectedTime.getUTCMinutes()<10){
                    var second = '0'+selectedTime.getUTCMinutes();
                }

                $scope.dataActivity.endTime = time + ':' + second;// + ':00';
            }
        };

        $scope.closeDatePicker = {
            titleLabel: '选择日期',
            inputDate: new Date(),
            templateType: 'popup',
            callback: function (val) {
                if (val) {
                    val = getNowFormatDate(val);
                    $scope.dataActivity.closeDate = val;
                    //$scope.dataActivity.closeDate = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate();
                }
            }
        };
        $scope.closeTimePicker = {
            titleLabel: '选择时间',
            inputEpochTime: ((new Date()).getHours() * 60 * 60),
            templateType: 'popup',
            callback: function (val) {
                //if (val) {
                //    var selectedTime = new Date(val * 1000);
                //    $scope.dataActivity.closeTime = selectedTime.getUTCHours() + ':' + selectedTime.getUTCMinutes() + ':00';
                //}
                var selectedTime = new Date(val * 1000);
                var time = selectedTime.getUTCHours();
                if(selectedTime.getUTCHours()<10){
                    var time = '0'+selectedTime.getUTCHours();
                }
                var second = selectedTime.getUTCMinutes();
                if(selectedTime.getUTCMinutes()<10){
                    var second = '0'+selectedTime.getUTCMinutes();
                }

                $scope.dataActivity.closeTime = time + ':' + second;// + ':00';
            }
        };


        var span = document.getElementById('img');

        function fileSelect2(e) {
            e = e || window.event;
            var files = this.files;
            var f = files[0];
            var reader = new FileReader();
            reader.onload = (function (file) {
                return function (e) {
                    span.src = this.result;
                    $scope.dataActivity.picPath = span.src;
                };
            })(f);
            //读取文件内容
            reader.readAsDataURL(f);
        }

        document.getElementById('upimg').addEventListener('change', fileSelect2, false);
        $scope.uploadFiles = function (file) {
            $scope.image.file = file;
        };


        $scope.goSubmit = function () {
            var data = $scope.dataActivity;
            if (!data.title) {
                showLoading($ionicLoading, "请输入标题", $timeout);
                return;
            }

            if (!data.contactMan) {
                showLoading($ionicLoading, "请输入联系人", $timeout);
                return;
            }
            if (!data.contactPhone) {
                showLoading($ionicLoading, "请输入联系电话", $timeout);
                return;
            }
            if (!data.personLimit) {
                showLoading($ionicLoading, "请输入人数限制", $timeout);
                return;
            }
            if (!data.address) {
                showLoading($ionicLoading, "请输入地址", $timeout);
                return;
            }
            //ActivitySubmit();
            //return;
            if (!data.startDate) {
                alert("您还未选择举办日期");
                return;
            } else if (!data.startTime) {
                alert("您还未选择举办时间");
                return;
            } else if (!data.endDate) {
                alert("您还未选择结束日期");
                return;
            } else if (!data.endTime) {
                alert("您还未选择结束时间");
                return;
            }
            else if (!data.closeDate) {
                alert("您还未选择报名截止日期");
                return;
            } else if (!data.closeTime) {
                alert("您还未选择报名截止时间");
                return;
            }
            var tempStartDate = new Date(data.startDate + ' ' + data.startTime);
            var tempEndDate = new Date(data.endDate + ' ' + data.endTime);
            var tempCloseDate = new Date(data.closeDate + ' ' + data.closeTime);
            var current = new Date();

            if (tempEndDate < tempStartDate) {
                showLoading($ionicLoading, "结束日期不能早于开始日期", $timeout);
                return;
            }
            if (tempCloseDate > tempStartDate) {
                showLoading($ionicLoading, "报名截止日期不能晚于开始日期", $timeout);
                return;
            }
            if(tempCloseDate< current){
                showLoading($ionicLoading, "报名截止时间必须晚于当前时间", $timeout);
                return;
            }
            if(tempStartDate < current){
                showLoading($ionicLoading, "开始时间必须晚于当前时间", $timeout);
                return;
            }

            data.startTime = data.startDate + ' ' + data.startTime;
            data.endTime = data.endDate + ' ' + data.endTime;
            data.closeTime = data.closeDate + ' ' + data.closeTime;

            data.phone = Storage.get('user').phone;
            $ionicLoading.show({
                template: "<ion-spinner icon='bubbles'></ion-spinner><div>上传中...</div>"
            });
            imageUpload.upload({
                url: 'activity/createactivity',
                fields: data,
                file: $scope.image.file
            }, function (evt) {
                //TODO progress
            }).then(function (result) {
                $ionicLoading.hide();
                if (result.data.code == "0") {
                    showLoading($ionicLoading, "发布成功", $timeout);
                    history.go(-1);
                    $scope.$root.$emit('event:refresh-activity', {data: result.data.data});

                } else {
                    $scope.dataActivity.closeTime = "";
                    $scope.dataActivity.startTime = "";
                    $scope.dataActivity.endTime = "";
                    showLoading($ionicLoading, result.data.error, $timeout);
                }
            }, function (err) {
                $scope.dataActivity.closeTime = "";
                $scope.dataActivity.startTime = "";
                $scope.dataActivity.endTime = "";
                $ionicLoading.hide();
                showLoading($ionicLoading, err, $timeout);
            });
        };

        function getNowFormatDate(date) {
            var day = date;
            var Year = 0;
            var Month = 0;
            var Day = 0;
            var CurrentDate = "";
            //初始化时间
            //Year= day.getYear();//有火狐下2008年显示108的bug
            Year = day.getFullYear();//ie火狐下都可以
            Month = day.getMonth() + 1;
            Day = day.getDate();
            //Hour = day.getHours();
            // Minute = day.getMinutes();
            // Second = day.getSeconds();
            CurrentDate += Year + "-";
            if (Month >= 10) {
                CurrentDate += Month + "-";
            }
            else {
                CurrentDate += "0" + Month + "-";
            }
            if (Day >= 10) {
                CurrentDate += Day;
            }
            else {
                CurrentDate += "0" + Day;
            }
            return CurrentDate;
        }

    });


angular.module('ActivityDetailController', [])
    .controller("ActivityDetailController", function ($scope, $state, $stateParams, Chats, $timeout, $ionicPopup, $ionicLoading, $ionicGesture, User, $rootScope, Storage, $ionicActionSheet) {
        getNewsDetail($stateParams.id);
        $scope.activity = {};
        $scope.comments = {};
        $scope.replyData = {};
        $scope.join = "";
        var isOn = "";
        function getNewsDetail(id) {
            User.userSendCode('activity/viewactivity', {
                phone: Storage.get('user').phone,
                id: $stateParams.id
            }, "").then(function (resp) {
                //alert(JSON.stringify(resp));
                $scope.activity = resp.activity;
                $scope.comments = resp.comments;
                $scope.join = resp.join;
                isOn = resp.state;
            });
        }

        $scope.signUp = function () {
            if ($scope.join == "1") {
                showLoading($ionicLoading, "已报名", $timeout);
                return;
            }else{
                //1 报名中 2 已满员 3 已截止 4 进行中 5 已结束
                if(isOn!="1"){
                    var text="";
                    switch(isOn){
                        case '2':
                            alert(isOn);
                            text = "已满员";
                            break;
                        case '3':
                        case '4':
                        case '5':
                            text = "报名已截止";
                            break;
                    }
                    showLoading($ionicLoading, text, $timeout);
                    return;
                }
            }
            User.userSendCode('activity/signup', {
                "id": $stateParams.id,
                phone: Storage.get('user').phone
            }, "").then(function (resp) {
                if (resp.code == 0) {
                    showLoading($ionicLoading, "报名成功", $timeout);
                    refreshData();
                }
                else
                    showLoading($ionicLoading, resp.error, $timeout);

            });
        }


        $scope.saveReply = function (id) {
            $scope.data = {};
            // 调用$ionicPopup弹出定制弹出框
            $ionicPopup.show({
                template: "<input type='text' ng-model='data.content'>",
                title: "请输入评论内容",
                subTitle: "",
                scope: $scope,
                buttons: [
                    {text: "取消"},
                    {
                        text: "<b>发送</b>",
                        type: "button-bg",
                        onTap: function (e) {
                            return $scope.data.content;
                        }
                    }
                ]
            })
                .then(function (res) {

                    if (res) {
                        createComment(id, res);
                    }
                });


        }


        function createComment(id, res) {

            $scope.replyData.phone = Storage.get('user').phone;
            var news = {};
            news.id = $stateParams.id;
            $scope.replyData.news = news;
            User.userSendCode('activity/createatvcmt', {
                "activity.id": $stateParams.id,
                phone: Storage.get('user').phone,
                content: res
            }, "").then(function (resp) {
                if (resp.code == 0) {
                    showLoading($ionicLoading, "评论成功", $timeout);
                    refreshData();
                }
                else
                    showLoading($ionicLoading, resp.error, $timeout);
            });

        }

        $scope.saveLike = function (id) {
            User.userSendCode('activity/likeatvcmt', {
                "id": id,
                phone: Storage.get('user').phone
            }, "").then(function (resp) {
                if (resp.code == 0) {
                    showLoading($ionicLoading, "已点赞", $timeout);
                    refreshData();
                } else
                    showLoading($ionicLoading, resp.error, $timeout);
            });

        };

        $scope.saveReplyOther = function (commentid,userid) {
            if(userid ==Storage.get('user').id){
                return ;
            }
            $scope.data = {};
            // 调用$ionicPopup弹出定制弹出框
            $ionicPopup.show({
                template: "<input type='text' ng-model='data.content'>",
                title: "请输入回复内容",
                subTitle: "",
                scope: $scope,
                buttons: [
                    {text: "取消"},
                    {
                        text: "<b>发送</b>",
                        type: "button-bg",
                        onTap: function (e) {
                            return $scope.data.content;
                        }
                    }
                ]
            })
                .then(function (res) {

                    if (res) {
                        replyOtherRequest(commentid, res);
                    }
                });
        }
        function replyOtherRequest(id, res) {
            $scope.replyData.phone = Storage.get('user').phone;
            var news = {};
            news.id = $stateParams.id;
            $scope.replyData.news = news;
            User.userSendCode('activity/createatvcmt', {
                "parentAtvCmt.id": id,
                "activity.id": $stateParams.id,
                phone: Storage.get('user').phone,
                content: res
            }, "").then(function (resp) {
                if (resp.code == 0) {
                    showLoading($ionicLoading, "评论成功", $timeout);
                    refreshData();
                } else
                    showLoading($ionicLoading, resp.error, $timeout);
            });
        }

        function refreshData() {
            getNewsDetail($stateParams.id);

        }


        $scope.show = function () {
            var hideSheet = $ionicActionSheet.show({
                titleText: "",
                buttons: [
                    {text: "电话"},
                    {text: "短信"}, {text: "邮件"}


                ],
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:

                            break;

                        case 1:
                            break;
                        case 2:
                            break;
                    }
                    return true;
                },
                cancelText: "取消",
                cancel: function () {
                    // add cancel code..
                },
                destructiveButtonClicked: function () {
                }
            });

            $timeout(function () {
                //	hideSheet();
            }, 2000);
        };
        $scope.goMember = function (users) {
            $state.go('app.member',{id:$stateParams.id});
        };

//            $ionicModal.fromTemplateUrl("my-modal.html", {
//                                        scope: $scope,
//                                        animation: "slide-in-up"
//                                        }).then(function(modal) {
//                                                $scope.modal = modal;
//                                                });
//            $scope.openModal = function() {
//            $scope.modal.show();
//            };
//            $scope.closeModal = function() {
//            $scope.modal.hide();
//            };
//            //Cleanup the modal when we are done with it!
//            $scope.$on("$destroy", function() {
//                       $scope.modal.remove();
//                       });
//            // Execute action on hide modal
//            $scope.$on("modal.hidden", function() {
//                       // Execute action
//                       });
//            // Execute action on remove modal
//            $scope.$on("modal.removed", function() {
//                       // Execute action
//                       });


    });


angular.module('ActivityMyJoinController', [])
    .controller('ActivityMyJoinController', function ($scope, $stateParams, Chats, User, Storage) {
        $scope.searchData = {};
        var type = $stateParams.id;
        if (type == 1) {
            $scope.title = "我发起的活动";
        } else if (type == 2) {
            $scope.title = "我报名的活动";
        }
        var curPage = 1;
        $scope.noMoreItemsAvailable = true;
        $scope.activitys = [];
        //          getNewsList(curPage);

        $scope.doRefresh = function () {
            curPage = 1;
            $scope.searchData = {};
            $scope.noMoreItemsAvailable = true;
            getNewsList(curPage);
        }


        $scope.load_more = function () {
            getNewsList(curPage);
            curPage++;
        }


        function getNewsList(page) {
            $scope.searchData.curPage = page;
            $scope.searchData.phone = Storage.get('user').phone;

            User.userSendCode(type == 1 ? 'activity/querymyactivity' : 'activity/querymyjoinactivity', $scope.searchData, "").then(function (resp) {
                parseNews(resp);
            });
        }

        function parseNews(products) {
            if (products.data != undefined && products.data.length == 0) {
                //$scope.chats = [];
                $scope.$broadcast("scroll.refreshComplete");
                $scope.noMoreItemsAvailable = false;
                return;
            }
            var mys = products.length > 0 ? products.length - 1 : 0;
            if (mys == 0) {
                $scope.noMoreItemsAvailable = false;
                $scope.activitys = products;
                $scope.$broadcast("scroll.refreshComplete");

            } else {

                if (curPage == 1) {
                    //            alert(JSON.stringify(products));
                    $scope.activitys = products;
                    $scope.$broadcast("scroll.refreshComplete");
                } else {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.activitys = $scope.activitys.concat(products);
                }
            }
        }

        $scope.searchKeyWords = function () {
            $scope.activitys = [];
            curPage = 1;
            getNewsList(curPage);
        }

    });
angular.module('EventMyReleaseListController', [])
    .controller('EventMyReleaseListController', function ($scope, $state, $stateParams, Chats, $timeout, User, $rootScope, Storage, $ionicPopover) {
        //            var type =$stateParams.eventtype;
        $scope.title = "我发布的资讯";
        $scope.searchData = {};
        var type = "";
        var curPage = 1;
        $scope.noMoreItemsAvailable = true;
        $scope.news = [];


        $scope.doRefresh = function () {
            $scope.searchData = {};
            curPage = 1;
            $scope.noMoreItemsAvailable = true;
            getNewsList(curPage);
        }


        $scope.load_more = function () {
            getNewsList(curPage);
            curPage++;
        }


        function getNewsList(page) {
            $scope.searchData.curPage = page;
            $scope.searchData.type = type;
            $scope.searchData.phone = Storage.get('user').phone;

            User.userSendCode('news/querymynews', $scope.searchData, "").then(function (resp) {
                if (resp.data != undefined && resp.data.length == 0) {
                    $scope.$broadcast("scroll.refreshComplete");
                    $scope.noMoreItemsAvailable = false;
                } else {
                    parseNews(resp);
                }

            });
        }

        function parseNews(products) {

            var mys = products.length > 0 ? products.length - 1 : 0;

            if (mys == 0) {
                if (curPage == 1 && products.length > 0) {
                    $scope.news = products;
                } else {
                    if (products.length > 0) {
                        $scope.news = $scope.news.concat(products);
                    }
                    //$scope.noMoreItemsAvailable = false;
                }

                $scope.noMoreItemsAvailable = false;
                //$scope.news = products;
                //$scope.$broadcast("scroll.refreshComplete");
            } else {
                if (curPage == 1) {
                    $scope.news = products;
                    $scope.$broadcast("scroll.refreshComplete");
                } else {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.news = $scope.news.concat(products);
                }
            }
        }

        $scope.types = [{
            name: '全部',
        },{
            name: '投融资',
        }, {
            name: '思源创业',
        },
            {
                name: '合作商机',
            },
            {
                name: '互帮互助',
            }, {
                name: '校友企业',
            }, {
                name: '求职招聘',
            }, {
                name: '新闻动态',
            }, {
                name: '在水一方',
            },];
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function ($event) {
            // console.log('show popover');
            $scope.popover.show($event);
        };

        $scope.changeTab = function (tab) {
            if (type == tab)return;

            $scope.news = [];
            curPage = 1;
            type = tab;
            if(tab =='全部')
            {
                type = '';
            }
            getNewsList(curPage);
            $scope.popover.hide();
        };

        $scope.search = function () {
            if (!$scope.searchData.queryWords)return;
            curPage = 1;
            $scope.news = [];
            getNewsList(curPage);
        }
    });
angular.module('InviteOthersController', ['ngClipboard'])
  .config(function(ngClipProvider){
      ngClipProvider.setPath('/lib/ng-clip/ZeroClipboard.swf');
  })
    .controller('InviteOthersController', function ($scope, $stateParams, Storage, User) {
        inviteCode();
        $scope.inviteCode = function () {
            inviteCode();
        };
        $scope.fallback = function (code) {
            window.prompt('请复制下面字母.', code);
        };
        $scope.showMsg = function(){
            console.log(1);

        };
        function inviteCode() {
            User.userLogin('user/makeinvitatecode', {username: Storage.get('user').phone}, "").then(function (resp) {
                if(resp.code==0){
                    $scope.data = resp.data;
                }else{
                    window.plugins.toast.showShortCenter(resp.error);
                }
            });
        }

        function getClipboardText(event) {
            var clipboardData = event.clipboardData || window.clipboardData;
            return clipboardData.getData("text");
        };

        function setClipboardText(event, value) {
            alert(window.clipboardData);
            if (event.clipboardData) {
                return event.clipboardData.setData("text/plain", value);
            } else if (window.clipboardData) {
                return window.clipboardData.setData("text", value);
            }else{
                return window.clipboardData.setData("text", value);
            }
        };


    });
angular.module('ChangepPhoneController', [])
    .controller('ChangepPhoneController', function ($scope, $state, $ionicModal, $stateParams, $timeout, User, $ionicLoading, $ionicPopup, Storage,$interval) {

        $scope.phone = $stateParams.phone;
        $scope.loginData = {};

        $scope.isSendCode = false;
        $scope.timespan = 0;
        $scope.sendCodeText = '发送验证码';
        $scope.timeID = null;


        $scope.goState = function (s) {
            var data = $scope.loginData;

            if (!data.username) {
                showLoading($ionicLoading, "请输入新手机号", $timeout);
                return;
            }

            if (!data.verifyCode) {
                showLoading($ionicLoading, "请输入验证码", $timeout);

                return;
            }


            data.newphone = data.username;
            postLogin(data);
        }

        function postLogin(loginData) {
            loginData.phone = Storage.get('user').phone;
            $ionicLoading.show({
                template: "<ion-spinner icon='bubbles'></ion-spinner><div>提交中...</div>"
            });
            User.userSendCode('user/resetphone', loginData, "").then(function (resp) {
                var result = "";
                $ionicLoading.hide();
                if (resp.code == 0) {
                    result = "更换成功";
                    $state.go('app.person');
                } else {
                    result = resp.error;
                }

                showLoading($ionicLoading, result, $timeout);

            });

        }

        $scope.sendCode = function (s) {

            var data = $scope.loginData;
            if($scope.timeID){
                return;
            }
            $scope.timespan = 30;
            if (!data.username) {
                showLoading($ionicLoading, "请输入新手机号", $timeout);
                return;
            }

            User.userLogin('user/exist', {phone: data.username}, "").then(function (resp) {
                var isExists = resp.data;
                if(isExists){
                    showLoading($ionicLoading, "电话未注册", $timeout);
                }else{
                    sendSMSCode(data);
                }
            });


            function sendSMSCode(data){
                User.userSendCode('user/verifycode', data, "").then(function (resp) {
                    if (resp.code == 0) {
                        showLoading($ionicLoading, "验证码已发送", $timeout);
                        $scope.timeID = $interval(function(){
                            $scope.sendCodeText = '重新发送('+ $scope.timespan + ')';
                            if($scope.timespan-- <=0){
                                $interval.cancel($scope.timeID);
                                $scope.timeID = null;
                                $scope.sendCodeText = '重新发送';
                            }
                        },1000);
                    }
                    else{
                        showLoading($ionicLoading, "电话格式不正确,请确认输入", $timeout);
                    }
                },function(err){
                    showLoading($ionicLoading, "发送失败，稍后重试", $timeout);
                });

            }


        }

    });
angular.module('ChatDatailController', [])
  .controller('ChatDatailController', function ($scope, $stateParams, $ionicScrollDelegate, $timeout, Chats, User, Storage, $ionicModal) {
      $scope.chatName = $stateParams.chatName;
      var curPage = 1;
      getChatDetail(curPage);
      $scope.form = {
          message: ''
      };

      $scope.showMsg = function () {
      };

      $scope.sendMessage = function () {
          sendMessageMethod($scope.form.message);
      };

      $scope.doRefresh = function () {
          curPage++;
          getChatDetail(curPage);

          $scope.$broadcast('scroll.refreshComplete');
      };
      function appendMessage(msg) {
          $scope.$root.$emit('event:refresh-chat', {id:$scope.chatName, content: msg});
          $scope.messageList.push({
              content: msg,
              sender: {
                  username: Storage.get('user').phone,
                  alumnus: {
                      headPicPath: Storage.get('user').headPicPath,
                      realName: Storage.get('user').realName
                  }
              },
              isSender: 1,
              createTime: new Date()
          });
      }


      function scrollBottom(time) {
          time = time || 600;
          $timeout(function () {
              var mainScroll = $ionicScrollDelegate.$getByHandle('mainScroll')._instances;
              angular.forEach(mainScroll, function (wrap) {
                  if (wrap.$$delegateHandle == 'mainScroll') {
                      wrap.scrollBottom();
                  }
              });
          }, time);
      }

      $timeout(function(){
          scrollBottom();
      },1000);

      function scrollTo(time) {
          time = time || 1000;
          $timeout(function () {
              var mainScroll = $ionicScrollDelegate.$getByHandle('mainScroll');
              angular.forEach(mainScroll, function (wrap) {
                  if (wrap.$$delegateHandle == 'mainScroll') {
                      wrap.scrollTop();
                  }
              });
          }, time);
      }

      function getChatDetail(curPage) {
          User.userSendCode('message/query2usermessage', {
              curPage: curPage,
              receiverPhone: Storage.get('user').phone,
              senderPhone: $stateParams.chatId
          }, "").then(function (resp) {
              $scope.myphone = Storage.get('user').phone;
              if (curPage == 1) {

                  var mes = checkMessage(resp);
                  if (mes)
                      $scope.messageList = mes;
              } else {
                  resp = checkMessage(resp);
                  angular.forEach(resp, function (data, index, array) {
                      //data等价于array[index]
                      if (data != 0 && data != "" && data != []) {
                          $scope.messageList.unshift(data);
                      }
                  });
              }
          });
      }

      function checkMessage(resp) {
          if (resp == null || resp.length == 0)return "";
          var currentUserName = Storage.get('user').phone;
          var messList = [];
          angular.forEach(resp, function (item) {
              if (item == "" || item == "[]" || item == "0")return messList;

              if (item.sender.alumnus.phone == currentUserName) {
                  item.isSender = 1;
              }
              messList.push(item);
          });
          return messList;
      }

      function sendMessageMethod(str) {
          User.userSendCode('message/sendmessage', {
              content: str,
              'receiver.username': $stateParams.chatId,
              'sender.username': Storage.get('user').phone
          }, "").then(function (resp) {
              appendMessage($scope.form.message);
              $scope.form.message = '';
              scrollBottom();
          });
      }
      var modalInstance = null;
      $scope.openMsgModal = function(){
          if(modalInstance){
              return;
          }
          var subScope = $scope.$root.$new();

          subScope.cancel = function(){
              modalInstance.remove();
              modalInstance = null;
          };
          modalInstance = $ionicModal.fromTemplateUrl('/templates/message-modal.html',{
              scope: subScope,
              animation: 'slide-in-up'
          }).then(function(modal){
              modalInstance = modal;
              modal.show();
          });
      };

      $scope.$root.$on('event:send-message-done',function(e,data){
          sendMessageMethod(data);
      });

  });
angular.module('ReportController', [])
    .controller('ReportController', function ($scope, $state, $stateParams, Chats, $timeout, $ionicPopup, $ionicLoading, $ionicGesture, User, $rootScope, Storage) {
        $scope.dataReport = {};
        $scope.reportBtn = function () {
            report($stateParams.id, $stateParams.title, $stateParams.type);
        };
        function report(id, title, type) {
            var data = $scope.dataReport;
            if (data.reason == undefined) {
                showLoading($ionicLoading, "请选择原因", $timeout);
                return;
            }
            var reason = ["色情", "欺诈", "诋毁侮辱", "广告骚扰", "政治", "非交大校友", "其他"];
            data.type = type;
            data.assoId = id;
            data.assoName = title;
            data.phone = Storage.get('user').phone;
            if(data.reason == '其他' && !data.otherInfo){
                showLoading($ionicLoading, "请输入原因", $timeout);
                return ;
            }
            User.userSendCode('inform/createinform', data, "").then(function (resp) {
                if (resp.code == 0){
                    showLoading($ionicLoading, "举报成功", $timeout);
                    history.go(-1);
                }
                else showLoading($ionicLoading, resp.error, $timeout);
            });
        }


    });

angular.module('MenuController', [])
    .controller('MenuController', function ($scope, $state, $stateParams, Storage, $ionicSideMenuDelegate, $rootScope) {
        $scope.user = Storage.get('user') || {};
        if(!$scope.user){
            return ;
        }

        $scope.currentMenu = 1;

        $rootScope.headPicPath = $scope.user.headPicPath;
        $scope.loginOut = function () {
            $ionicSideMenuDelegate.toggleLeft();
            $state.go("login");
            Storage.clear();
        };

        $rootScope.$on('event:update-user-info', function(e){
            $scope.user = Storage.get('user');
            $rootScope.headPicPath = $scope.user.headPicPath;
        });

        $scope.changeState = function(num){
            $scope.currentMenu = num;
        };
    });
/**
 * Created by AaronYuan on 9/12/15.
 */
angular.module('MessageModalCtrl', [])
  .controller('MessageModalCtrl', function ($rootScope,$scope, $stateParams,$state, Storage,$timeout) {

    //1 = from chat
    //2 = 回复
    var from = $stateParams.from;
    $scope.viewData = {
      message: ''
    };

    if(!from){
      //todo something
    }


    $scope.sendMessage = function(){

      $scope.$root.$emit('event:send-message-done',$scope.viewData.message);
      $scope.cancel();
    };


  });

angular.module('ActivityMemberController', [])
    .controller('ActivityMemberController', function ($scope, $state, $stateParams, Storage,$rootScope,User) {
        getNewsDetail();
        function getNewsDetail() {
            User.userSendCode('activity/viewactivity', {
                phone: Storage.get('user').phone,
                id: $stateParams.id
            }, "").then(function (resp) {
                $scope.joinUsers = resp.activity.joinUsers;
            console.log(JSON.stringify(resp.activity.joinUsers));
            });
        }

        $scope.sendEmail = function(){


        }

    });
