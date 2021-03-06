/*! nice Validator 0.8.1
 * (c) 2012-2015 Jony Zhang <zj86@live.cn>, MIT Licensed
 * http://niceue.com/validator/
 */
!function(e){"function"==typeof define&&(define.amd||define.cmd)?define([],function(){return e}):e(jQuery)}(function(e,t){"use strict";function i(t,n){function s(){a._init(a.$el[0],n)}var a=this;return a instanceof i?(a.$el=e(t),void(a.$el.length?i.loading?e(window).on("validatorready",s):s():X(t)&&(ee[t]=n))):new i(t,n)}function n(e,t){if(z(e)){var i,s=t?t===!0?this:t:n.prototype;for(i in e)m(i)&&(s[i]=a(e[i]))}}function s(e,t){if(z(e)){var i,n=t?t===!0?this:t:s.prototype;for(i in e)n[i]=e[i]}}function a(t){switch(e.type(t)){case"function":return t;case"array":var i=function(e){return t.msg=t[1],t[0].test(Y(e))||t[1]||!1};return i.msg=t[1],i;case"regexp":return function(e){return t.test(Y(e))}}}function r(t){var i,n,s;if(t&&t.tagName){switch(t.tagName){case"INPUT":case"SELECT":case"TEXTAREA":case"BUTTON":case"FIELDSET":i=t.form||e(t).closest("."+M);break;case"FORM":i=t;break;default:i=e(t).closest("."+M)}for(n in ee)if(e(i).is(n)){s=ee[n];break}return e(i).data(_)||e(i)[_](s).data(_)}}function l(e,t){var i,n=t||e.currentTarget;n.form&&null===K(n.form,N)&&(i=r(n),i?(i._parse(n),i._focusin(e),t&&i._focusout(e,t)):K(n,V,null))}function o(e,t){var i=J(K(e,V+"-"+t));if(i)return i=new Function("return "+i)(),i?a(i):void 0}function u(e,t,i){var n=t.msg,s=t._r;return z(n)&&(n=n[s]),X(n)||(n=K(e,C+"-"+s)||K(e,C)||(i?X(i)?i:i[s]:"")),n}function d(e){var t;return e&&(t=L.exec(e)),t&&t[1]}function c(e){return X(e)||z(e)&&("error"in e||"ok"in e)?e:void 0}function f(e){return"INPUT"===e.tagName&&"checkbox"===e.type||"radio"===e.type}function g(e){return Date.parse(e.replace(/\.|\-/g,"/"))}function m(e){return/^[\w\d]+$/.test(e)}function p(e){return"#"===e.charAt(0)?e.replace(/(:|\.|\[|\])/g,"\\$1"):'[name="'+e+'"]:input'}var h,v,_="validator",y="."+_,k=".rule",w=".field",b=".form",M="nice-"+_,$="msg-box",x="aria-required",O="aria-invalid",V="data-rule",C="data-msg",F="data-tip",T="data-ok",A="data-timely",E="data-target",j="data-display",R="data-must",N="novalidate",S=":verifiable",D=/(&)?(!)?\s?(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\||&)?/g,q=/(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,I=/(?:([^:;\(\[]*):)?(.*)/,B=/[^\x00-\xff]/g,L=/^.*(top|right|bottom|left).*$/,U=/(?:(post|get):)?(.+)/i,H=/[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gim,P=e.noop,W=e.proxy,J=e.trim,Q=e.isFunction,X=function(e){return"string"==typeof e},z=function(e){return e&&"[object Object]"===Object.prototype.toString.call(e)},G=document.documentMode||+(navigator.userAgent.match(/MSIE (\d+)/)&&RegExp.$1),K=function(e,i,n){return e&&e.tagName?n===t?e.getAttribute(i):void(null===n?e.removeAttribute(i):e.setAttribute(i,""+n)):null},Y=function(t){return e(t).val()},Z=window.console||{log:P,info:P},ee={},te={debug:0,timely:1,theme:"default",ignore:"",focusInvalid:!0,beforeSubmit:P,msgWrapper:"span",msgMaker:function(t){var i;return i='<span role="alert" class="msg-wrap n-'+t.type+'">'+t.arrow,t.result?e.each(t.result,function(e,n){i+='<span class="help-block n-'+n.type+'">'+t.icon+'<span class="n-msg help-block">'+n.msg+"</span></span>"}):i+=t.icon+'<span class="help-block n-msg">'+t.msg+"</span>",i+="</span>"},msgArrow:"",msgIcon:'<span class="n-icon help-block"></span>',msgClass:"",validClass:"n-valid",invalidClass:"n-invalid"},ie={"default":{formClass:"n-default",msgClass:"n-right"}};e.fn[_]=function(t){var n=this,s=arguments;return n.is(":input")?n:(!n.is("form")&&(n=this.find("form")),!n.length&&(n=this),n.each(function(){var n=e(this).data(_);if(n)if(X(t)){if("_"===t.charAt(0))return;n[t].apply(n,Array.prototype.slice.call(s,1))}else t&&(n._reset(!0),n._init(this,t));else new i(this,t)}),this)},e.fn.isValid=function(e,t){var i,n,s=r(this[0]),a=Q(e);return s?(s.checkOnly=!!t,n=s.options,i=s._multiValidate(this.is(":input")?this:this.find(S),function(t){t||!n.focusInvalid||s.checkOnly||s.$el.find("["+O+"]:input:first").focus(),a&&e.call(null,t),s.checkOnly=!1}),a?this:i):!0},e.expr[":"].verifiable=function(e){var t=e.nodeName.toLowerCase();return("input"===t&&!{submit:1,button:1,reset:1,image:1}[e.type]||"select"===t||"textarea"===t)&&e.disabled===!1},e.expr[":"].filled=function(e){return!!J(Y(e))},i.prototype={_init:function(t,i){var a,r,l,o=this;Q(i)&&(i={valid:i}),i=i||{},l=K(t,"data-"+_+"-option"),l=l&&"{"===l.charAt(0)?new Function("return "+l)():{},r=ie[i.theme||l.theme||te.theme],a=o.options=e.extend({},te,r,o.options,i,l),o.rules=new n(a.rules,!0),o.messages=new s(a.messages,!0),o.elements=o.elements||{},o.deferred={},o.errors={},o.fields={},o._initFields(a.fields),o.msgOpt={type:"error",pos:d(a.msgClass),wrapper:a.msgWrapper,cls:a.msgClass,style:a.msgStyle,arrow:a.msgArrow,icon:a.msgIcon,show:a.msgShow,hide:a.msgHide},X(a.target)&&o.$el.find(a.target).addClass("msg-container"),o.$el.data(_)||(o.$el.data(_,o).addClass(M+" "+a.formClass).on("submit"+y+" validate"+y,W(o,"_submit")).on("reset"+y,W(o,"_reset")).on("showmsg"+y,W(o,"_showmsg")).on("hidemsg"+y,W(o,"_hidemsg")).on("focusin"+y+" click"+y,S,W(o,"_focusin")).on("focusout"+y+" validate"+y,S,W(o,"_focusout")),a.timely&&o.$el.on("keyup"+y+" input"+y,S,W(o,"_focusout")).on("click"+y,":radio,:checkbox","click",W(o,"_focusout")).on("change"+y,'select,input[type="file"]',"change",W(o,"_focusout")),o._novalidate=K(t,N),K(t,N,N))},_guessAjax:function(t){var i=this;if(!(i.isAjaxSubmit=!!i.options.valid)){var n=(e._data||e.data)(t,"events");n&&n.valid&&e.map(n.valid,function(e){return~e.namespace.indexOf("form")?1:null}).length&&(i.isAjaxSubmit=!0)}},_initFields:function(t){var i=this,n=null===t;n&&(t=i.fields),z(t)&&e.each(t,function(e,t){if(null===t||n){var s=i.elements[e];s&&i._resetElement(s,!0),delete i.fields[e]}else i.fields[e]=X(t)?{rule:t}:t}),i.$el.find(S).each(function(){i._parse(this)})},_parse:function(e){var t,i,n=this,s=n.options,a=e.name,r=K(e,V);r&&K(e,V,null),(e.id&&"#"+e.id in n.fields||!e.name)&&(a="#"+e.id),a&&(t=n.fields[a]||{},t.key=a,t.rule=t.rule||r||"",t.display||!(t.display=K(e,j))&&s.display&&(t.display=s.display),t.rule&&((null!==K(e,R)||/match\(|checked/.test(t.rule))&&(t.must=!0),~t.rule.indexOf("required")&&(t.required=!0,K(e,x,!0)),"showOk"in t||(t.showOk=s.showOk),i=K(e,A),i?t.timely=+i:"timely"in t&&K(e,A,+t.timely),t=n._parseRule(t),t.old={}),X(t.target)&&K(e,E,t.target),X(t.tip)&&K(e,F,t.tip),n.fields[a]=t)},_parseRule:function(i){var n=I.exec(i.rule);if(n)return i._i=0,n[1]&&(i.display=n[1]),n[2]&&(i.rules=[],n[2].replace(D,function(){var n=arguments;n[4]=n[4]||n[5],i.rules.push({and:"&"===n[1],not:"!"===n[2],or:"|"===n[6],method:n[3],params:n[4]?e.map(n[4].split(", "),function(e){return J(e)}):t})})),i},_multiValidate:function(i,n){var s=this,a=s.options;return s.hasError=!1,a.ignore&&(i=i.not(a.ignore)),i.each(function(e,t){var i=s.getField(t);return i&&(s._validate(t,i),s.hasError&&a.stopOnError)?!1:void 0}),n&&(s.verifying=!0,e.when.apply(null,e.map(s.deferred,function(e){return e})).done(function(){n.call(s,!s.hasError),s.verifying=!1})),e.isEmptyObject(s.deferred)?!s.hasError:t},_submit:function(i){function n(){var e,t;v=!0,h&&(e=h.name)?(h.name="",t=l.submit,a.$el.append('<input type="hidden" name="'+e+'" value="'+h.value+'">'),t.call(l)):l.submit()}var s,a=this,r=a.options,l=i.target,o=i.isDefaultPrevented();if(i.preventDefault(),!(v&&~(v=!1)||a.submiting||"validate"===i.type&&a.$el[0]!==l||r.beforeSubmit.call(a,l)===!1)){if(a.isAjaxSubmit===t&&a._guessAjax(l),s="submit"===i.type&&!o&&!a.isAjaxSubmit,i.isTrigger&&a.isValid&&s)return void n();r.debug&&Z.log("\n<<< "+(i.isTrigger?"trigger: ":"event: ")+i.type),a._reset(),a.submiting=!0,a._multiValidate(a.$el.find(S),function(t){var i,o=t||2===r.debug?"valid":"invalid";t||(r.focusInvalid&&a.$el.find("["+O+'="true"]:input:first').focus(),i=e.map(a.errors,function(e){return e})),a.submiting=!1,a.isValid=t,Q(r[o])&&r[o].call(a,l,i),a.$el.trigger(o+b,[l,i]),r.debug&&Z.log(">>> "+o),t&&s&&n()})}},_reset:function(e){var t=this;t.errors={},e&&(t.reseting=!0,t.$el.find(S).each(function(e,i){t._resetElement(i)}),delete t.reseting)},_resetElement:function(t,i){var n=this.options;e(t).removeClass(n.validClass+" "+n.invalidClass),this.hideMsg(t),i&&K(t,x,null)},_getTimely:function(e,t){var i=K(e,A);return null!==i?+i:+t.timely},_focusin:function(t){var i,n,s=this,a=s.options,r=t.target;s.verifying||"click"===t.type&&document.activeElement===r||(a.focusCleanup&&"true"===K(r,O)&&(e(r).removeClass(a.invalidClass),s.hideMsg(r)),n=K(r,F),n?s.showMsg(r,{type:"tip",msg:n}):(i=s._getTimely(r,a),(8===i||9===i)&&s._focusout(t)))},_focusout:function(i,n){var s,a,r,l,o,u,d=this,c=d.options,g=i.target,m=i.type,p="focusin"===m,h="validate"===m,v=d.getField(g),_=0;if(v){if(v._e=m,s=v.old,a=Y(g),!n&&f(g)&&(n=d.$el.find('input[name="'+g.name+'"]').get(0)),u=d._getTimely(n||g,c),!h)if("focusout"===m){if(2===u||8===u){if(!a)return;v.isValid&&!s.showOk?d.hideMsg(g):d._makeMsg(g,v,s)}}else{if(!u||2>u&&!i.data)return;if(r=+new Date,r-(g._ts||0)<100||"keyup"===m&&"input"===g._et)return;if(g._ts=r,g._et=m,"keyup"===m){if(l=i.keyCode,o={8:1,9:1,16:1,32:1,46:1},9===l&&!a)return;if(48>l&&!o[l])return}p||(_=u>=100?u:400)}c.ignore&&e(g).is(c.ignore)||(clearTimeout(v._t),u&&(h||!c.ignoreBlank||a||p)?(v.value=a,u!==t&&(v.timely=u),_?v._t=setTimeout(function(){d._validate(g,v)},_):(h&&(v.old={}),d._validate(g,v))):d.hideMsg(g))}},_showmsg:function(t,i,n){var s=this,a=t.target;e(a).is(":input")?s.showMsg(a,{type:i,msg:n}):"tip"===i&&s.$el.find(S+"["+F+"]",a).each(function(){s.showMsg(this,{type:i,msg:n})})},_hidemsg:function(t){var i=e(t.target);i.is(":input")&&this.hideMsg(i)},_validatedField:function(t,i,n){var s=this,a=s.options,r=i.isValid=n.isValid=!!n.isValid,l=r?"valid":"invalid";n.key=i.key,n.ruleName=i._r,n.id=t.id,n.value=Y(t),r?n.type="ok":(s.submiting&&(s.errors[i.key]=n.msg),s.isValid=!1,s.hasError=!0),s.elements[i.key]=n.element=t,s.$el[0].isValid=r?s.isFormValid():r,i.old=n,Q(i[l])&&i[l].call(s,t,n),Q(a.validation)&&a.validation.call(s,t,n),e(t).attr(O,r?null:!0).removeClass(r?a.invalidClass:a.validClass).addClass(n.skip?"":r?a.validClass:a.invalidClass).trigger(l+w,[n,s]),s.$el.triggerHandler("validation",[n,s]),s.checkOnly||s._makeMsg.apply(s,arguments)},_makeMsg:function(t,i,n){(i.msgMaker||this.options.msgMaker)&&(n=e.extend({},n),"focusin"===i._e&&(n.type="tip"),this[n.showOk||n.msg||"tip"===n.type?"showMsg":"hideMsg"](t,n,i))},_validatedRule:function(i,n,s,a){n=n||c.getField(i),a=a||{};var r,l,o,d,c=this,f=c.options,g=n._r,m=n.timely||f.timely,p=9===m||8===m,h=!1;if(null===s)return void c._validatedField(i,n,{isValid:!0,skip:!0});if(s===t?o=!0:s===!0||""===s?h=!0:X(s)?r=s:z(s)&&(s.error?r=s.error:(r=s.ok,h=!0)),l=n.rules[n._i],l.not&&(r=t,h="required"===g||!h),l.or)if(h)for(;n._i<n.rules.length&&n.rules[n._i].or;)n._i++;else o=!0;else l.and&&(n.isValid||(o=!0));o?h=!0:(h&&n.showOk!==!1&&(d=K(i,T),r=null===d?X(n.ok)?n.ok:r:d,!X(r)&&X(n.showOk)&&(r=n.showOk),X(r)&&(a.showOk=h)),(!h||p)&&(r=(u(i,n,r||l.msg||c.messages[g])||c.messages.fallback).replace(/\{0\|?([^\}]*)\}/,function(){return c._getDisplay(i,n.display)||arguments[1]})),h||(n.isValid=h),a.msg=r,e(i).trigger((h?"valid":"invalid")+k,[g,r])),!p||o&&!l.and||(h||n._m||(n._m=r),n._v=n._v||[],n._v.push({type:h?o?"tip":"ok":"error",msg:r||l.msg})),f.debug&&Z.log("   "+n._i+": "+g+" => "+(h||r)),(h||p)&&n._i<n.rules.length-1?(n._i++,c._checkRule(i,n)):(n._i=0,p?(a.isValid=n.isValid,a.result=n._v,a.msg=n._m||"",n.value||"focusin"!==n._e||(a.type="tip")):a.isValid=h,c._validatedField(i,n,a),delete n._m,delete n._v)},_checkRule:function(i,n){var s,a,r,l=this,u=n.key,d=n.rules[n._i],f=d.method,g=Y(i),m=d.params;l.submiting&&l.deferred[u]||(r=n.old,n._r=f,r&&!n.must&&d.result!==t&&r.ruleName===f&&r.id===i.id&&g&&r.value===g?s=d.result:(a=o(i,f)||l.rules[f]||P,s=a.call(l,i,m,n),a.msg&&(d.msg=a.msg)),z(s)&&Q(s.then)?(l.deferred[u]=s,n.isValid=t,!l.checkOnly&&l.showMsg(i,{type:"loading",msg:l.messages.loading},n),s.then(function(s,a,r){var o,u=r.responseText,f=n.dataFilter||l.options.dataFilter||c;/jsonp?/.test(this.dataType)?u=s:"{"===J(u).charAt(0)&&(u=e.parseJSON(u)),o=f.call(this,u,n),o===t&&(o=f.call(this,u.data,n)),d.result=n.old?o:t,l._validatedRule(i,n,o)},function(e,t){l._validatedRule(i,n,l.messages[t]||t)}).always(function(){delete l.deferred[u]})):l._validatedRule(i,n,s))},_validate:function(e,t){if(!e.disabled&&null===K(e,N)){var i=this;if(t=t||i.getField(e),t.isValid=!0,t.rules||i._parse(e),t.rules)return i.options.debug&&Z.info(t.key),t.required||t.must||Y(e)||f(e)?(i._checkRule(e,t),t.isValid):(i._validatedField(e,t,{isValid:!0}),!0)}},test:function(e,i){var n,s,a,r=this,l=q.exec(i);return l&&(s=l[1],s in r.rules&&(a=l[2]||l[3],a=a?a.split(", "):t,n=r.rules[s].call(r,e,a))),n===!0||n===t||null===n},getRangeMsg:function(e,t,i,n){if(t){var s,a=this,r=i.rules[i._i],l=a.messages[r.method]||"",o=t[0].split("~"),u=o[0],d=o[1],c="rg",f=[""],g=J(e)&&+e===+e;return 2===o.length?u&&d?(g&&e>=+u&&+d>=e&&(s=!0),f=f.concat(o)):u&&!d?(g&&e>=+u&&(s=!0),f.push(u),c="gte"):!u&&d&&(g&&+d>=e&&(s=!0),f.push(d),c="lte"):(e===+u&&(s=!0),f.push(u),c="eq"),l&&(n&&l[c+n]&&(c+=n),f[0]=l[c]),s||(r.msg=a.renderMsg.apply(null,f))}},renderMsg:function(){var e=arguments,t=e[0],i=e.length;if(t){for(;--i;)t=t.replace("{"+i+"}",e[i]);return t}},_getDisplay:function(e,t){return X(t)?t:Q(t)?t.call(this,e):""},_getMsgOpt:function(t){return e.extend({},this.msgOpt,X(t)?{msg:t}:t)},_getMsgDOM:function(t,i){var n,s,a,r,l=e(t);if(l.is(":input")?(a=i.target||K(t,E),a&&(a=Q(a)?a.call(this,t):this.$el.find(a),a.length&&(a.is(":input")?t=a.get(0):a.hasClass($)?n=a:r=a)),n||(s=f(t)&&t.name||!t.id?t.name:t.id,n=this.$el.find(i.wrapper+"."+$+'[for="'+s+'"]'))):n=l,!n.length)if(l=this.$el.find(a||t),n=e("<"+i.wrapper+">").attr({"class":$+(i.cls?" "+i.cls:""),style:i.style||"","for":s}),f(t)){var o=l.parent();n.appendTo(o.is("label")?o.parent():o)}else r?n.appendTo(r):n[i.pos&&"right"!==i.pos?"insertBefore":"insertAfter"](l);return n},showMsg:function(t,i,n){if(t){var s,a,r,l=this,o=l.options;if(z(t)&&!t.jquery&&!i)return void e.each(t,function(e,t){var i=l.elements[e]||l.$el.find(p(e))[0];l.showMsg(i,t)});i=l._getMsgOpt(i),t=e(t).get(0),i.msg||"error"===i.type||(a=K(t,"data-"+i.type),null!==a&&(i.msg=a)),X(i.msg)&&(e(t).is(S)&&(n=n||l.getField(t),n&&(i.style=n.msgStyle||i.style,i.cls=n.msgClass||i.cls,i.wrapper=n.msgWrapper||i.wrapper,i.target=n.target||o.target)),(s=(n||{}).msgMaker||o.msgMaker)&&(r=l._getMsgDOM(t,i),!L.test(r[0].className)&&r.addClass(i.cls),6===G&&"bottom"===i.pos&&(r[0].style.marginTop=e(t).outerHeight()+"px"),r.html(s.call(l,i))[0].style.display="",Q(i.show)&&i.show.call(l,r,i.type)))}},hideMsg:function(t,i,n){var s,a=this,r=a.options;t=e(t).get(0),i=a._getMsgOpt(i),e(t).is(S)&&(n=n||a.getField(t),n&&((n.isValid||a.reseting)&&K(t,O,null),i.wrapper=n.msgWrapper||i.wrapper,i.target=n.target||r.target)),s=a._getMsgDOM(t,i),s.length&&(Q(i.hide)?i.hide.call(a,s,i.type):(s[0].style.display="none",s[0].innerHTML=null))},getField:function(e){var t,i=this;return X(e)?t=e:(t=e.id&&"#"+e.id in i.fields||!e.name?"#"+e.id:e.name,K(e,V)&&i._parse(e)),i.fields[t]},setField:function(e,t){var i={};e&&(X(e)?i[e]=t:i=e,this._initFields(i))},isFormValid:function(){var e,t,i=this.fields;for(e in i)if(t=i[e],t.rules&&(t.required||t.must||Y(p(e)))&&!t.isValid)return t.isValid;return!0},holdSubmit:function(e){this.submiting=e===t||e},cleanUp:function(){this._reset(1)},destroy:function(){this._reset(1),this.$el.off(y).removeData(_),K(this.$el[0],N,this._novalidate)}},e(window).on("beforeunload",function(){this.focus()}),e(document).on("focusin","["+V+"]:input",function(e){l(e)}).on("click","input,button",function(e){var t,i,n=this,s=n.name;n.form&&("submit"===n.type?(h=n,t=n.getAttributeNode("formnovalidate"),(t&&null!==t.nodeValue||null!==K(n,N))&&(v=!0)):null===K(n.form,N)&&(s&&f(n)?(i=n.form.elements[s],i.length&&(i=i[0]),K(i,V)&&l(e,i)):l(e)))}).on("submit validate","form",function(t){if(null===K(this,N)){var i,n=e(this);n.data(_)||(i=r(this),e.isEmptyObject(i.fields)?(K(this,N,N),n.off(y).removeData(_)):i._submit(t))}}),new s({fallback:"This field is not valid.",loading:"Validating..."}),new n({required:function(t,i,n){var s=this,a=J(Y(t)),r=!0;if(i)if(1===i.length){if(m(i[0])){if(s.rules[i[0]]){if(!a&&!s.test(t,i[0]))return K(t,x,null),null;K(t,x,!0)}}else if(!a&&!e(i[0],s.$el).length)return null}else if("not"===i[0])e.each(i.slice(1),function(){return r=a!==J(this)});else if("from"===i[0]){var l,o=s.$el.find(i[1]),d="_validated_";return r=o.filter(function(){return!!J(Y(this))}).length>=(i[2]||1),r?a||(l=null):l=u(o[0],n)||!1,e(t).data(d)||o.data(d,1).each(function(){t!==this&&s._checkRule(this,s.getField(this))}).removeData(d),l}return r&&!!a},integer:function(e,t){var i,n="0|",s="[1-9]\\d*",a=t?t[0]:"*";switch(a){case"+":i=s;break;case"-":i="-"+s;break;case"+0":i=n+s;break;case"-0":i=n+"-"+s;break;default:i=n+"-?"+s}return i="^(?:"+i+")$",new RegExp(i).test(Y(e))||this.messages.integer[a]},match:function(t,i,n){if(i){var s,a,r,l,o,u,d,c,f=this,m="eq";if(1===i.length?r=i[0]:(m=i[0],r=i[1]),u=p(r),d=f.$el.find(u)[0]){if(c=f.getField(d),s=Y(t),a=Y(d),n._match||(f.$el.on("valid"+w+y,u,function(){e(t).trigger("validate")}),n._match=c._match=1),!n.required&&""===s&&""===a)return null;if(o=i[2],o&&(/^date(time)?$/i.test(o)?(s=g(s),a=g(a)):"time"===o&&(s=+s.replace(/:/g,""),a=+a.replace(/:/g,""))),"eq"!==m&&!isNaN(+s)&&isNaN(+a))return!0;switch(l=f.messages.match[m].replace("{1}",f._getDisplay(t,c.display||r)),m){case"lt":return+a>+s||l;case"lte":return+a>=+s||l;case"gte":return+s>=+a||l;case"gt":return+s>+a||l;case"neq":return s!==a||l;default:return s===a||l}}}},range:function(e,t,i){return this.getRangeMsg(Y(e),t,i)},checked:function(e,t,i){if(f(e)){var n,s,a=this;return e.name?s=a.$el.find('input[name="'+e.name+'"]').filter(function(){var e=this;return!n&&f(e)&&(n=e),!e.disabled&&e.checked}).length:(n=e,s=n.checked),t?a.getRangeMsg(s,t,i):!!s||u(n,i,"")||a.messages.required}},length:function(e,t,i){var n=Y(e),s=(t[1]?n.replace(B,"xx"):n).length;return this.getRangeMsg(s,t,i,t[1]?"_2":"")},remote:function(t,i){if(i){var n,s=this,a=U.exec(i[0]),r={},l="";return r[t.name]=Y(t),i[1]&&e.map(i.slice(1),function(e){var t,i;~e.indexOf("=")?l+="&"+e:(t=e.split(":"),e=J(t[0]),i=J(t[1])||e,r[e]=s.$el.find(p(i)).val())}),/^https?:/.test(a[2])&&!~a[2].indexOf(location.host)&&(n="jsonp"),e.ajax({url:a[2],type:a[1]||"POST",data:e.param(r)+l,dataType:n,cache:!1})}},validate:function(t,i){var n="_validated_";i&&!e(t).data(n)&&this.$el.find(e.map(i,function(e){return p(e)}).join(",")).data(n,1).trigger("validate").removeData(n)},filter:function(e,t){var i,n=Y(e);i=n.replace(t?new RegExp("["+t[0]+"]","gm"):H,""),i!==n&&(e.value=i)}}),i.config=function(t){e.each(t,function(e,t){"rules"===e?new n(t):"messages"===e?new s(t):te[e]=t})},i.setTheme=function(t,i){z(t)?e.extend(!0,ie,t):X(t)&&z(i)&&(ie[t]=e.extend(ie[t],i))},e[_]=i,function(t){var n,s,a,r,l,o,u=document,d=u.getElementsByTagName("script");if(t)s=d[0],n=t.match(/(.*)\/local\/([\w\-]{2,5})\.js/);else for(a=d.length,r=/(.*validator.js)\?.*local=([\w\-]*)/;a--&&!n;)s=d[a],n=(s.hasAttribute?s.src:s.getAttribute("src",4)||"").match(r);n&&(l=n[0].split("/").slice(0,-1).join("/").replace(/\/(local|src)$/,"")+"/",o=u.createElement("link"),o.rel="stylesheet",o.href=l+"jquery.validator.css",s.parentNode.insertBefore(o,s),t||(i.loading=1,o=u.createElement("script"),o.src=l+"local/"+(n[2]||u.documentElement.lang||"en").replace("_","-")+".js",a="onload"in o?"onload":"onreadystatechange",o[a]=function(){(!o.readyState||/loaded|complete/.test(o.readyState))&&(e(window).trigger("validatorready"),delete i.loading,o=o[a]=null)},s.parentNode.insertBefore(o,s)))}(e._VALIDATOR_URI)});

/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文
 *********************************/
(function(factory) {
    'function' === typeof define && (define.amd || define.cmd) ? define(function(require, exports, module){
        var $ = require('jquery')||jQuery; $._VALIDATOR_URI = module.uri;
        require('../jquery.validator')($);
        factory($);
    }) : factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,
        
        // Custom rules
        rules: {
            digits: [/^\d+$/, "请填写数字"]          
            ,decical:[/^[0-9]+([.]{1}[0-9]+){0,1}$/,"请填写正确的数字"]   //方   增加整数或者小数
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
    		,money: [/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/, "请填写金额信息"]
    		,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            }
            
        },

        // Default error messages
        messages: {
            fallback: "{0}格式不正确",
            loading: "正在验证...",
            error: "网络异常",
            timeout: "请求超时",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请填写整数",
                '+': "请填写正整数",
                '+0': "请填写正整数或0",
                '-': "请填写负整数",
                '-0': "请填写负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}不能大于{1}",
                gte: "{0}不能小于{1}"
            },
            range: {
                rg: "请填写{1}到{2}的数",
                gte: "请填写不小于{1}的数",
                lte: "请填写最大{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "请填写{1}个字符",
                rg: "请填写{1}到{2}个字符",
                gte: "请至少填写{1}个字符",
                lte: "请最多填写{1}个字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        },
        validation: function(form, errors){
        	//console.info(JSON.stringify(errors))
        	if(errors.isValid==true){
        		$("#"+errors.id).closest(".control-group").removeClass("error");
        		$("#"+errors.id).closest(".control-group").addClass("success");
        	}else{
        		$("#"+errors.id).closest(".control-group").removeClass("success");
        		$("#"+errors.id).closest(".control-group").addClass("error");
        	}
        	
        	//alert($("#"+errors.id).attr("placeholder"))
        	//alert($("#"+errors.id).parent("div .control-group").html())
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
            	alert(1)
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
            	alert(1)
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
}));