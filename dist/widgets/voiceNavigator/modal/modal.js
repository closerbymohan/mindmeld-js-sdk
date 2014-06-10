/*! jQuery v1.10.1 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.1",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=lt(),k=lt(),E=lt(),S=!1,A=function(){return 0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=bt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+xt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return At(e.replace(z,"$1"),t,n,i)}function st(e){return K.test(e+"")}function lt(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function ut(e){return e[b]=!0,e}function ct(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function pt(e,t,n){e=e.split("|");var r,i=e.length,a=n?null:t;while(i--)(r=o.attrHandle[e[i]])&&r!==t||(o.attrHandle[e[i]]=a)}function ft(e,t){var n=e.getAttributeNode(t);return n&&n.specified?n.value:e[t]===!0?t.toLowerCase():null}function dt(e,t){return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}function ht(e){return"input"===e.nodeName.toLowerCase()?e.defaultValue:t}function gt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function mt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function yt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function vt(e){return ut(function(t){return t=+t,ut(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.parentWindow;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.frameElement&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ct(function(e){return e.innerHTML="<a href='#'></a>",pt("type|href|height|width",dt,"#"===e.firstChild.getAttribute("href")),pt(B,ft,null==e.getAttribute("disabled")),e.className="i",!e.getAttribute("className")}),r.input=ct(function(e){return e.innerHTML="<input>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}),pt("value",ht,r.attributes&&r.input),r.getElementsByTagName=ct(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ct(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ct(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=st(n.querySelectorAll))&&(ct(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ct(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=st(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ct(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=st(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},r.sortDetached=ct(function(e){return 1&e.compareDocumentPosition(n.createElement("div"))}),A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return gt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?gt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:ut,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=bt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?ut(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ut(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?ut(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ut(function(e){return function(t){return at(e,t).length>0}}),contains:ut(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:ut(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:vt(function(){return[0]}),last:vt(function(e,t){return[t-1]}),eq:vt(function(e,t,n){return[0>n?n+t:n]}),even:vt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:vt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:vt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:vt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=mt(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=yt(n);function bt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function xt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function wt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function Tt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Ct(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function Nt(e,t,n,r,i,o){return r&&!r[b]&&(r=Nt(r)),i&&!i[b]&&(i=Nt(i,o)),ut(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||St(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:Ct(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=Ct(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=Ct(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function kt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=wt(function(e){return e===t},s,!0),p=wt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[wt(Tt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return Nt(l>1&&Tt(f),l>1&&xt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&kt(e.slice(l,r)),i>r&&kt(e=e.slice(r)),i>r&&xt(e))}f.push(n)}return Tt(f)}function Et(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=Ct(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?ut(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=bt(e)),n=t.length;while(n--)o=kt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Et(i,r))}return o};function St(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function At(e,t,n,i){var a,s,u,c,p,f=bt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&xt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}o.pseudos.nth=o.pseudos.eq;function jt(){}jt.prototype=o.filters=o.pseudos,o.setFilters=new jt,r.sortStable=b.split("").sort(A).join("")===b,p(),[0,0].sort(A),r.detectDuplicates=S,x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!l||i&&!u||(n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)
}),n=s=l=u=r=o=null,t}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=x(this),l=t,u=e.match(T)||[];while(o=u[a++])l=r?l:!s.hasClass(o),s[l?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);

/*!
 * Isotope PACKAGED v2.0.0
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==n.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var o=0,s=r.length;s>o;o++){var a=r[o];a()}}}function o(o){return o.bind(n,"DOMContentLoaded",i),o.bind(n,"readystatechange",i),o.bind(t,"load",i),e}var n=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],o)):t.docReady=o(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function o(t){function o(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var o=r(t);if("none"===o.display)return i();var n={};n.width=t.offsetWidth,n.height=t.offsetHeight;for(var h=n.isBorderBox=!(!p||!o[p]||"border-box"!==o[p]),f=0,c=s.length;c>f;f++){var d=s[f],l=o[d];l=a(t,l);var y=parseFloat(l);n[d]=isNaN(y)?0:y}var m=n.paddingLeft+n.paddingRight,g=n.paddingTop+n.paddingBottom,v=n.marginLeft+n.marginRight,_=n.marginTop+n.marginBottom,I=n.borderLeftWidth+n.borderRightWidth,L=n.borderTopWidth+n.borderBottomWidth,z=h&&u,S=e(o.width);S!==!1&&(n.width=S+(z?0:m+I));var b=e(o.height);return b!==!1&&(n.height=b+(z?0:g+L)),n.innerWidth=n.width-(m+I),n.innerHeight=n.height-(g+L),n.outerWidth=n.width+v,n.outerHeight=n.height+_,n}}function a(t,e){if(n||-1===e.indexOf("%"))return e;var i=t.style,o=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=o,s&&(r.left=s),e}var u,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var o=r(t);u=200===e(o.width),i.removeChild(t)}}(),o}var n=t.getComputedStyle,r=n?function(t){return n(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function o(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){o(t);for(var i=t.parentNode.querySelectorAll(e),n=0,r=i.length;r>n;n++)if(i[n]===t)return!0;return!1}function r(t,e){return o(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),p=i(u,"div");s=p?i:r}else s=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function n(t,n,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),p=r("transform"),h=u&&p,f=!!r("perspective"),c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],d=["transform","transition","transitionDuration","transitionProperty"],l=function(){for(var t={},e=0,i=d.length;i>e;e++){var o=d[e],n=r(o);n&&n!==o&&(t[o]=n)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=l[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var a=this.layout.size;n-=i?a.paddingLeft:a.paddingRight,r-=o?a.paddingTop:a.paddingBottom,this.position.x=n,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=h?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&o(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(c,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(c,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],n):(t.Outlayer={},t.Outlayer.Item=n(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=d(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,d,l,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!c(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var o=++g;this.element.outlayerGUID=o,v[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,f.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},m.prototype._filterFindItemElements=function(t){t=o(t);for(var e=this.options.itemSelector,i=[],n=0,r=t.length;r>n;n++){var s=t[n];if(c(s))if(e){l(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,p=a.length;p>u;u++)i.push(a[u])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=d(this.element)},m.prototype._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):c(o)&&(i=o),this[t]=i?d(i)[e]:o):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},m.prototype._layoutItems=function(t,e){function i(){o.emitEvent("layoutComplete",[o,t])}var o=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,n.push(u)}this._processLayoutQueue(n)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},m.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=h,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function o(){return n++,n===r&&i.call(s),!0}for(var n=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var p=t[a];p.on(e,o)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n(o,this.stamps),this.unignore(o)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=h,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=d(t),n={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return n},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=d(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],r=this.getItem(n);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),n(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function o(){m.apply(this,arguments)}return Object.create?o.prototype=Object.create(m.prototype):e(o.prototype,m.prototype),o.prototype.constructor=o,o.defaults=e({},m.defaults),e(o.defaults,i),o.prototype.settings={},o.namespace=t,o.data=m.data,o.Item=function(){y.apply(this,arguments)},o.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),n="data-"+e+"-options",s=0,h=i.length;h>s;s++){var f,c=i[s],d=c.getAttribute(n);try{f=d&&JSON.parse(d)}catch(l){u&&u.error("Error parsing "+n+" on "+c.nodeName.toLowerCase()+(c.id?"#"+c.id:"")+": "+l);continue}var y=new o(c,f);p&&p.data(c,t,y)}}),p&&p.bridget&&p.bridget(t,o),o},m.Item=y,m}var a=t.document,u=t.console,p=t.jQuery,h=function(){},f=Object.prototype.toString,c="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},d=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t){function e(){t.Item.apply(this,arguments)}return e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}},e}"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window),function(t){function e(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!==this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window),function(t){function e(t,e){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++){var n=t[i];if(n===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i){var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;e(o.prototype,i.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],i):i(t.Isotope.LayoutMode,t.Masonry)}(window),function(t){function e(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0},e.prototype._getItemLayoutPosition=function(t){t.getSize(),0!==this.x&&t.size.outerWidth+this.x>this.isotope.size.innerWidth&&(this.x=0,this.y=this.maxY);var e={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=t.size.outerWidth,e},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===h.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t,i,r,u,h){function f(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var c=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});c.Item=u,c.LayoutMode=h,c.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var e in h.modes)this._initLayoutMode(e)},c.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},c.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,o=e.length;o>i;i++){var n=e[i];n.id=this.itemGUID++}return this._updateItemsSortData(e),e},c.prototype._initLayoutMode=function(t){var i=h.modes[t],o=this.options[t]||{};this.options[t]=i.options?e(i.options,o):o,this.modes[t]=new i(this)},c.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},c.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},c.prototype.arrange=function(t){this.option(t),this._getIsInstant(),this.filteredItems=this._filter(this.items),this._sort(),this._layout()},c.prototype._init=c.prototype.arrange,c.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},c.prototype._filter=function(t){function e(){f.reveal(n),f.hide(r)}var i=this.options.filter;i=i||"*";for(var o=[],n=[],r=[],s=this._getFilterTest(i),a=0,u=t.length;u>a;a++){var p=t[a];if(!p.isIgnored){var h=s(p);h&&o.push(p),h&&p.isHidden?n.push(p):h||p.isHidden||r.push(p)}}var f=this;return this._isInstant?this._noTransition(e):e(),o},c.prototype._getFilterTest=function(t){return s&&this.options.isJQueryFiltering?function(e){return s(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return r(e.element,t)}},c.prototype.updateSortData=function(t){this._getSorters(),t=o(t);var e=this.getItems(t);e=e.length?e:this.items,this._updateItemsSortData(e)
},c.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=d(i)}},c.prototype._updateItemsSortData=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];o.updateSortData()}};var d=function(){function t(t){if("string"!=typeof t)return t;var i=a(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),u=c.sortDataParsers[i[1]];return t=u?function(t){return t&&u(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&p(i)}}return t}();c.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},c.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=f(e,this.options.sortAscending);this.filteredItems.sort(i),t!==this.sortHistory[0]&&this.sortHistory.unshift(t)}},c.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},c.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},c.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},c.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},c.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},c.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},c.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},c.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps();var o=this._filterRevealAdded(e);this.layoutItems(i),this.filteredItems=o.concat(this.filteredItems)}},c.prototype._filterRevealAdded=function(t){var e=this._noTransition(function(){return this._filter(t)});return this.layoutItems(e,!0),this.reveal(e),t},c.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e);for(this._noTransition(function(){this.hide(r)}),i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var l=c.prototype.remove;return c.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(l.call(this,t),e&&e.length)for(var i=0,r=e.length;r>i;i++){var s=e[i];n(s,this.filteredItems)}},c.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},c}var s=t.jQuery,a=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},u=document.documentElement,p=u.textContent?function(t){return t.textContent}:function(t){return t.innerText},h=Object.prototype.toString,f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],r):t.Isotope=r(t.Outlayer,t.getSize,t.matchesSelector,t.Isotope.Item,t.Isotope.LayoutMode)}(window);

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.2
 *
 */
(function(f){jQuery.fn.extend({slimScroll:function(g){var a=f.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:0.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:0.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},g);this.each(function(){function u(d){if(r){d=d||
window.event;var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);f(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,f,g){k=!1;var e=d,h=b.outerHeight()-c.outerHeight();f&&(e=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),e=Math.min(Math.max(e,0),h),e=0<d?Math.ceil(e):Math.floor(e),c.css({top:e+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
e=l*(b[0].scrollHeight-b.outerHeight());g&&(e=d,d=e/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(e);b.trigger("slimscrolling",~~e);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",u,!1),this.addEventListener("mousewheel",u,!1)):document.attachEvent("onmousewheel",u)}function w(){s=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),D);c.css({height:s+"px"});var a=s==b.outerHeight()?"none":"block";c.css({display:a})}
function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;s>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&r||x||y||(c.fadeOut("slow"),h.fadeOut("slow"))},1E3))}var r,x,y,A,z,s,l,B,D=30,k=!1,b=f(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),c=b.parent().find("."+a.barClass),h=b.parent().find("."+
a.railClass);w();if(f.isPlainObject(g)){if("height"in g&&"auto"==g.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in g)n=parseInt(a.scrollTo);else if("scrollBy"in g)n+=parseInt(a.scrollBy);else if("destroy"in g){c.remove();h.remove();b.unwrap();return}m(n,!1,!0)}}else{a.height="auto"==g.height?b.parent().height():g.height;n=f("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=f("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=f("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};h.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(h);a.railDraggable&&c.bind("mousedown",function(a){var b=f(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});h.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){r=!0;v();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(f(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);
/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {
	

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class EventEmitter Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting EventEmitter class.
	 */
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter',[],function () {
			return EventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = EventEmitter;
	}
	else {
		this.EventEmitter = EventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'eventEmitter/EventEmitter',
      'eventie/eventie'
    ], function( EventEmitter, eventie ) {
      return factory( window, EventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventEmitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EventEmitter,
      window.eventie
    );
  }

})( this,

// --------------------------  factory -------------------------- //

function factory( window, EventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new EventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;

});

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
		} catch(e) {
			return;
		}

		try {
			// If we can't parse the cookie, ignore it, it's unusable.
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash -o ./dist/lodash.compat.js`
 */
;(function(){function n(n,t,e){e=(e||0)-1;for(var r=n?n.length:0;++e<r;)if(n[e]===t)return e;return-1}function t(t,e){var r=typeof e;if(t=t.l,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:b+e;return t=(t=t[r])&&t[u],"object"==r?t&&-1<n(t,e)?0:-1:t?0:-1}function e(n){var t=this.l,e=typeof n;if("boolean"==e||null==n)t[n]=true;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:b+n,t=t[e]||(t[e]={});"object"==e?(t[r]||(t[r]=[])).push(n):t[r]=true
}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.m,r=t.m,u=-1,o=e.length;++u<o;){var a=e[u],i=r[u];if(a!==i){if(a>i||typeof a=="undefined")return 1;if(a<i||typeof i=="undefined")return-1}}return n.n-t.n}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],a=n[r-1];if(u&&typeof u=="object"&&o&&typeof o=="object"&&a&&typeof a=="object")return false;for(u=l(),u["false"]=u["null"]=u["true"]=u.undefined=false,o=l(),o.k=n,o.l=u,o.push=e;++t<r;)o.push(n[t]);return o}function a(n){return"\\"+Y[n]
}function i(){return v.pop()||[]}function l(){return y.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function f(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function c(n){n.length=0,v.length<w&&v.push(n)}function p(n){var t=n.l;t&&p(t),n.k=n.l=n.m=n.object=n.number=n.string=n.o=null,y.length<w&&y.push(n)}function s(n,t,e){t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var u=Array(0>e?0:e);++r<e;)u[r]=n[t+r];
return u}function g(e){function v(n){return n&&typeof n=="object"&&!qe(n)&&we.call(n,"__wrapped__")?n:new y(n)}function y(n,t){this.__chain__=!!t,this.__wrapped__=n}function w(n){function t(){if(r){var n=s(r);je.apply(n,arguments)}if(this instanceof t){var o=nt(e.prototype),n=e.apply(o,n||arguments);return xt(n)?n:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return ze(t,n),t}function Y(n,t,e,r,u){if(e){var o=e(n);if(typeof o!="undefined")return o}if(!xt(n))return n;var a=he.call(n);if(!V[a]||!Le.nodeClass&&f(n))return n;
var l=Te[a];switch(a){case L:case z:return new l(+n);case W:case M:return new l(n);case J:return o=l(n.source,S.exec(n)),o.lastIndex=n.lastIndex,o}if(a=qe(n),t){var p=!r;r||(r=i()),u||(u=i());for(var g=r.length;g--;)if(r[g]==n)return u[g];o=a?l(n.length):{}}else o=a?s(n):Ye({},n);return a&&(we.call(n,"index")&&(o.index=n.index),we.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(a?Xe:tr)(n,function(n,a){o[a]=Y(n,t,e,r,u)}),p&&(c(r),c(u)),o):o}function nt(n){return xt(n)?Se(n):{}}function tt(n,t,e){if(typeof n!="function")return Ht;
if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(Le.funcNames&&(r=!n.name),r=r||!Le.funcDecomp,!r)){var u=be.call(n);Le.funcNames||(r=!A.test(u)),r||(r=B.test(u),ze(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return Mt(n,t)}function et(n){function t(){var n=l?a:this;
if(u){var h=s(u);je.apply(h,arguments)}return(o||c)&&(h||(h=s(arguments)),o&&je.apply(h,o),c&&h.length<i)?(r|=16,et([e,p?r:-4&r,h,null,a,i])):(h||(h=arguments),f&&(e=n[g]),this instanceof t?(n=nt(e.prototype),h=e.apply(n,h),xt(h)?h:n):e.apply(n,h))}var e=n[0],r=n[1],u=n[2],o=n[3],a=n[4],i=n[5],l=1&r,f=2&r,c=4&r,p=8&r,g=e;return ze(t,n),t}function rt(e,r){var u=-1,a=ht(),i=e?e.length:0,l=i>=_&&a===n,f=[];if(l){var c=o(r);c?(a=t,r=c):l=false}for(;++u<i;)c=e[u],0>a(r,c)&&f.push(c);return l&&p(r),f}function ot(n,t,e,r){r=(r||0)-1;
for(var u=n?n.length:0,o=[];++r<u;){var a=n[r];if(a&&typeof a=="object"&&typeof a.length=="number"&&(qe(a)||dt(a))){t||(a=ot(a,t,e));var i=-1,l=a.length,f=o.length;for(o.length+=l;++i<l;)o[f++]=a[i]}else e||o.push(a)}return o}function at(n,t,e,r,u,o){if(e){var a=e(n,t);if(typeof a!="undefined")return!!a}if(n===t)return 0!==n||1/n==1/t;if(n===n&&!(n&&X[typeof n]||t&&X[typeof t]))return false;if(null==n||null==t)return n===t;var l=he.call(n),p=he.call(t);if(l==T&&(l=G),p==T&&(p=G),l!=p)return false;switch(l){case L:case z:return+n==+t;
case W:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case J:case M:return n==ie(t)}if(p=l==$,!p){var s=we.call(n,"__wrapped__"),g=we.call(t,"__wrapped__");if(s||g)return at(s?n.__wrapped__:n,g?t.__wrapped__:t,e,r,u,o);if(l!=G||!Le.nodeClass&&(f(n)||f(t)))return false;if(l=!Le.argsObject&&dt(n)?oe:n.constructor,s=!Le.argsObject&&dt(t)?oe:t.constructor,l!=s&&!(jt(l)&&l instanceof l&&jt(s)&&s instanceof s)&&"constructor"in n&&"constructor"in t)return false}for(l=!u,u||(u=i()),o||(o=i()),s=u.length;s--;)if(u[s]==n)return o[s]==t;
var h=0,a=true;if(u.push(n),o.push(t),p){if(s=n.length,h=t.length,(a=h==s)||r)for(;h--;)if(p=s,g=t[h],r)for(;p--&&!(a=at(n[p],g,e,r,u,o)););else if(!(a=at(n[h],g,e,r,u,o)))break}else nr(t,function(t,i,l){return we.call(l,i)?(h++,a=we.call(n,i)&&at(n[i],t,e,r,u,o)):void 0}),a&&!r&&nr(n,function(n,t,e){return we.call(e,t)?a=-1<--h:void 0});return u.pop(),o.pop(),l&&(c(u),c(o)),a}function it(n,t,e,r,u){(qe(t)?Dt:tr)(t,function(t,o){var a,i,l=t,f=n[o];if(t&&((i=qe(t))||er(t))){for(l=r.length;l--;)if(a=r[l]==t){f=u[l];
break}if(!a){var c;e&&(l=e(f,t),c=typeof l!="undefined")&&(f=l),c||(f=i?qe(f)?f:[]:er(f)?f:{}),r.push(t),u.push(f),c||it(f,t,e,r,u)}}else e&&(l=e(f,t),typeof l=="undefined"&&(l=t)),typeof l!="undefined"&&(f=l);n[o]=f})}function lt(n,t){return n+de(Fe()*(t-n+1))}function ft(e,r,u){var a=-1,l=ht(),f=e?e.length:0,s=[],g=!r&&f>=_&&l===n,h=u||g?i():s;for(g&&(h=o(h),l=t);++a<f;){var v=e[a],y=u?u(v,a,e):v;(r?!a||h[h.length-1]!==y:0>l(h,y))&&((u||g)&&h.push(y),s.push(v))}return g?(c(h.k),p(h)):u&&c(h),s}function ct(n){return function(t,e,r){var u={};
if(e=v.createCallback(e,r,3),qe(t)){r=-1;for(var o=t.length;++r<o;){var a=t[r];n(u,a,e(a,r,t),t)}}else Xe(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function pt(n,t,e,r,u,o){var a=1&t,i=4&t,l=16&t,f=32&t;if(!(2&t||jt(n)))throw new le;l&&!e.length&&(t&=-17,l=e=false),f&&!r.length&&(t&=-33,f=r=false);var c=n&&n.__bindData__;return c&&true!==c?(c=s(c),c[2]&&(c[2]=s(c[2])),c[3]&&(c[3]=s(c[3])),!a||1&c[1]||(c[4]=u),!a&&1&c[1]&&(t|=8),!i||4&c[1]||(c[5]=o),l&&je.apply(c[2]||(c[2]=[]),e),f&&Ee.apply(c[3]||(c[3]=[]),r),c[1]|=t,pt.apply(null,c)):(1==t||17===t?w:et)([n,t,e,r,u,o])
}function st(){Q.h=F,Q.b=Q.c=Q.g=Q.i="",Q.e="t",Q.j=true;for(var n,t=0;n=arguments[t];t++)for(var e in n)Q[e]=n[e];t=Q.a,Q.d=/^[^,]+/.exec(t)[0],n=ee,t="return function("+t+"){",e=Q;var r="var n,t="+e.d+",E="+e.e+";if(!t)return E;"+e.i+";";e.b?(r+="var u=t.length;n=-1;if("+e.b+"){",Le.unindexedChars&&(r+="if(s(t)){t=t.split('')}"),r+="while(++n<u){"+e.g+";}}else{"):Le.nonEnumArgs&&(r+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+e.g+";}}else{"),Le.enumPrototypes&&(r+="var G=typeof t=='function';"),Le.enumErrorProps&&(r+="var F=t===k||t instanceof Error;");
var u=[];if(Le.enumPrototypes&&u.push('!(G&&n=="prototype")'),Le.enumErrorProps&&u.push('!(F&&(n=="message"||n=="name"))'),e.j&&e.f)r+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",u.length&&(r+="if("+u.join("&&")+"){"),r+=e.g+";",u.length&&(r+="}"),r+="}";else if(r+="for(n in t){",e.j&&u.push("m.call(t, n)"),u.length&&(r+="if("+u.join("&&")+"){"),r+=e.g+";",u.length&&(r+="}"),r+="}",Le.nonEnumShadows){for(r+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)r+="n='"+e.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",e.j||(r+="||(!x[n]&&t[n]!==A[n])"),r+="){"+e.g+"}";
r+="}"}return(e.b||Le.nonEnumArgs)&&(r+="}"),r+=e.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+r+"}")(tt,q,ce,we,d,dt,qe,kt,Q.f,pe,X,$e,M,se,he)}function gt(n){return Ve[n]}function ht(){var t=(t=v.indexOf)===zt?n:t;return t}function vt(n){return typeof n=="function"&&ve.test(n)}function yt(n){var t,e;return!n||he.call(n)!=G||(t=n.constructor,jt(t)&&!(t instanceof t))||!Le.argsClass&&dt(n)||!Le.nodeClass&&f(n)?false:Le.ownLast?(nr(n,function(n,t,r){return e=we.call(r,t),false}),false!==e):(nr(n,function(n,t){e=t
}),typeof e=="undefined"||we.call(n,e))}function mt(n){return He[n]}function dt(n){return n&&typeof n=="object"&&typeof n.length=="number"&&he.call(n)==T||false}function bt(n,t,e){var r=We(n),u=r.length;for(t=tt(t,e,3);u--&&(e=r[u],false!==t(n[e],e,n)););return n}function _t(n){var t=[];return nr(n,function(n,e){jt(n)&&t.push(e)}),t.sort()}function wt(n){for(var t=-1,e=We(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function jt(n){return typeof n=="function"}function xt(n){return!(!n||!X[typeof n])
}function Ct(n){return typeof n=="number"||n&&typeof n=="object"&&he.call(n)==W||false}function kt(n){return typeof n=="string"||n&&typeof n=="object"&&he.call(n)==M||false}function Et(n){for(var t=-1,e=We(n),r=e.length,u=Zt(r);++t<r;)u[t]=n[e[t]];return u}function Ot(n,t,e){var r=-1,u=ht(),o=n?n.length:0,a=false;return e=(0>e?Be(0,o+e):e)||0,qe(n)?a=-1<u(n,t,e):typeof o=="number"?a=-1<(kt(n)?n.indexOf(t,e):u(n,t,e)):Xe(n,function(n){return++r<e?void 0:!(a=n===t)}),a}function St(n,t,e){var r=true;if(t=v.createCallback(t,e,3),qe(n)){e=-1;
for(var u=n.length;++e<u&&(r=!!t(n[e],e,n)););}else Xe(n,function(n,e,u){return r=!!t(n,e,u)});return r}function At(n,t,e){var r=[];if(t=v.createCallback(t,e,3),qe(n)){e=-1;for(var u=n.length;++e<u;){var o=n[e];t(o,e,n)&&r.push(o)}}else Xe(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function It(n,t,e){if(t=v.createCallback(t,e,3),!qe(n)){var r;return Xe(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0}),r}e=-1;for(var u=n.length;++e<u;){var o=n[e];if(t(o,e,n))return o}}function Dt(n,t,e){if(t&&typeof e=="undefined"&&qe(n)){e=-1;
for(var r=n.length;++e<r&&false!==t(n[e],e,n););}else Xe(n,t,e);return n}function Nt(n,t,e){var r=n,u=n?n.length:0;if(t=t&&typeof e=="undefined"?t:tt(t,e,3),qe(n))for(;u--&&false!==t(n[u],u,n););else{if(typeof u!="number")var o=We(n),u=o.length;else Le.unindexedChars&&kt(n)&&(r=n.split(""));Xe(n,function(n,e,a){return e=o?o[--u]:--u,t(r[e],e,a)})}return n}function Bt(n,t,e){var r=-1,u=n?n.length:0,o=Zt(typeof u=="number"?u:0);if(t=v.createCallback(t,e,3),qe(n))for(;++r<u;)o[r]=t(n[r],r,n);else Xe(n,function(n,e,u){o[++r]=t(n,e,u)
});return o}function Pt(n,t,e){var u=-1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&qe(n)){e=-1;for(var a=n.length;++e<a;){var i=n[e];i>o&&(o=i)}}else t=null==t&&kt(n)?r:v.createCallback(t,e,3),Xe(n,function(n,e,r){e=t(n,e,r),e>u&&(u=e,o=n)});return o}function Rt(n,t,e,r){var u=3>arguments.length;if(t=v.createCallback(t,r,4),qe(n)){var o=-1,a=n.length;for(u&&(e=n[++o]);++o<a;)e=t(e,n[o],o,n)}else Xe(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function Ft(n,t,e,r){var u=3>arguments.length;
return t=v.createCallback(t,r,4),Nt(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)}),e}function Tt(n){var t=-1,e=n?n.length:0,r=Zt(typeof e=="number"?e:0);return Dt(n,function(n){var e=lt(0,++t);r[t]=r[e],r[e]=n}),r}function $t(n,t,e){var r;if(t=v.createCallback(t,e,3),qe(n)){e=-1;for(var u=n.length;++e<u&&!(r=t(n[e],e,n)););}else Xe(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function Lt(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=-1;for(t=v.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++
}else if(r=t,null==r||e)return n?n[0]:h;return s(n,0,Pe(Be(0,r),u))}function zt(t,e,r){if(typeof r=="number"){var u=t?t.length:0;r=0>r?Be(0,u+r):r||0}else if(r)return r=Kt(t,e),t[r]===e?r:-1;return n(t,e,r)}function qt(n,t,e){if(typeof t!="number"&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=v.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:Be(0,t);return s(n,r)}function Kt(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?v.createCallback(e,r,1):Ht,t=e(t);u<o;)r=u+o>>>1,e(n[r])<t?u=r+1:o=r;
return u}function Wt(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(e=v.createCallback(e,r,3)),ft(n,t,e)}function Gt(){for(var n=1<arguments.length?arguments:arguments[0],t=-1,e=n?Pt(ar(n,"length")):0,r=Zt(0>e?0:e);++t<e;)r[t]=ar(n,t);return r}function Jt(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||qe(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Mt(n,t){return 2<arguments.length?pt(n,17,s(arguments,2),null,t):pt(n,1,null,null,t)
}function Vt(n,t,e){var r,u,o,a,i,l,f,c=0,p=false,s=true;if(!jt(n))throw new le;if(t=Be(0,t)||0,true===e)var g=true,s=false;else xt(e)&&(g=e.leading,p="maxWait"in e&&(Be(t,e.maxWait)||0),s="trailing"in e?e.trailing:s);var v=function(){var e=t-(ir()-a);0<e?l=Ce(v,e):(u&&me(u),e=f,u=l=f=h,e&&(c=ir(),o=n.apply(i,r),l||u||(r=i=null)))},y=function(){l&&me(l),u=l=f=h,(s||p!==t)&&(c=ir(),o=n.apply(i,r),l||u||(r=i=null))};return function(){if(r=arguments,a=ir(),i=this,f=s&&(l||!g),false===p)var e=g&&!l;else{u||g||(c=a);
var h=p-(a-c),m=0>=h;m?(u&&(u=me(u)),c=a,o=n.apply(i,r)):u||(u=Ce(y,h))}return m&&l?l=me(l):l||t===p||(l=Ce(v,t)),e&&(m=true,o=n.apply(i,r)),!m||l||u||(r=i=null),o}}function Ht(n){return n}function Ut(n,t,e){var r=true,u=t&&_t(t);t&&(e||u.length)||(null==e&&(e=t),o=y,t=n,n=v,u=_t(t)),false===e?r=false:xt(e)&&"chain"in e&&(r=e.chain);var o=n,a=jt(o);Dt(u,function(e){var u=n[e]=t[e];a&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,a=[e];if(je.apply(a,arguments),a=u.apply(n,a),r||t){if(e===a&&xt(a))return this;
a=new o(a),a.__chain__=t}return a})})}function Qt(){}function Xt(n){return function(t){return t[n]}}function Yt(){return this.__wrapped__}e=e?ut.defaults(Z.Object(),e,ut.pick(Z,R)):Z;var Zt=e.Array,ne=e.Boolean,te=e.Date,ee=e.Function,re=e.Math,ue=e.Number,oe=e.Object,ae=e.RegExp,ie=e.String,le=e.TypeError,fe=[],ce=e.Error.prototype,pe=oe.prototype,se=ie.prototype,ge=e._,he=pe.toString,ve=ae("^"+ie(he).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),ye=re.ceil,me=e.clearTimeout,de=re.floor,be=ee.prototype.toString,_e=vt(_e=oe.getPrototypeOf)&&_e,we=pe.hasOwnProperty,je=fe.push,xe=pe.propertyIsEnumerable,Ce=e.setTimeout,ke=fe.splice,Ee=fe.unshift,Oe=function(){try{var n={},t=vt(t=oe.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),Se=vt(Se=oe.create)&&Se,Ae=vt(Ae=Zt.isArray)&&Ae,Ie=e.isFinite,De=e.isNaN,Ne=vt(Ne=oe.keys)&&Ne,Be=re.max,Pe=re.min,Re=e.parseInt,Fe=re.random,Te={};Te[$]=Zt,Te[L]=ne,Te[z]=te,Te[K]=ee,Te[G]=oe,Te[W]=ue,Te[J]=ae,Te[M]=ie;var $e={};$e[$]=$e[z]=$e[W]={constructor:true,toLocaleString:true,toString:true,valueOf:true},$e[L]=$e[M]={constructor:true,toString:true,valueOf:true},$e[q]=$e[K]=$e[J]={constructor:true,toString:true},$e[G]={constructor:true},function(){for(var n=F.length;n--;){var t,e=F[n];
for(t in $e)we.call($e,t)&&!we.call($e[t],e)&&($e[t][e]=false)}}(),y.prototype=v.prototype;var Le=v.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},r=[];n.prototype={valueOf:1,y:1};for(var u in new n)r.push(u);for(u in arguments);Le.argsClass=he.call(arguments)==T,Le.argsObject=arguments.constructor==oe&&!(arguments instanceof Zt),Le.enumErrorProps=xe.call(ce,"message")||xe.call(ce,"name"),Le.enumPrototypes=xe.call(n,"prototype"),Le.funcDecomp=!vt(e.WinRTError)&&B.test(g),Le.funcNames=typeof ee.name=="string",Le.nonEnumArgs=0!=u,Le.nonEnumShadows=!/valueOf/.test(r),Le.ownLast="x"!=r[0],Le.spliceObjects=(fe.splice.call(t,0,1),!t[0]),Le.unindexedChars="xx"!="x"[0]+oe("x")[0];
try{Le.nodeClass=!(he.call(document)==G&&!({toString:0}+""))}catch(o){Le.nodeClass=true}}(1),v.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:I,variable:"",imports:{_:v}},Se||(nt=function(){function n(){}return function(t){if(xt(t)){n.prototype=t;var r=new n;n.prototype=null}return r||e.Object()}}());var ze=Oe?function(n,t){U.value=t,Oe(n,"__bindData__",U)}:Qt;Le.argsClass||(dt=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&we.call(n,"callee")&&!xe.call(n,"callee")||false
});var qe=Ae||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&he.call(n)==$||false},Ke=st({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),We=Ne?function(n){return xt(n)?Le.enumPrototypes&&typeof n=="function"||Le.nonEnumArgs&&n.length&&dt(n)?Ke(n):Ne(n):[]}:Ke,Ge={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:We,g:"if(e(t[n],n,g)===false)return E"},Je={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:We,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},Me={i:"if(!B[typeof t])return E;"+Ge.i,b:false},Ve={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},He=wt(Ve),Ue=ae("("+We(He).join("|")+")","g"),Qe=ae("["+We(Ve).join("")+"]","g"),Xe=st(Ge),Ye=st(Je,{i:Je.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),Ze=st(Je),nr=st(Ge,Me,{j:false}),tr=st(Ge,Me);
jt(/x/)&&(jt=function(n){return typeof n=="function"&&he.call(n)==K});var er=_e?function(n){if(!n||he.call(n)!=G||!Le.argsClass&&dt(n))return false;var t=n.valueOf,e=vt(t)&&(e=_e(t))&&_e(e);return e?n==e||_e(n)==e:yt(n)}:yt,rr=ct(function(n,t,e){we.call(n,e)?n[e]++:n[e]=1}),ur=ct(function(n,t,e){(we.call(n,e)?n[e]:n[e]=[]).push(t)}),or=ct(function(n,t,e){n[e]=t}),ar=Bt,ir=vt(ir=te.now)&&ir||function(){return(new te).getTime()},lr=8==Re(j+"08")?Re:function(n,t){return Re(kt(n)?n.replace(D,""):n,t||0)};
return v.after=function(n,t){if(!jt(t))throw new le;return function(){return 1>--n?t.apply(this,arguments):void 0}},v.assign=Ye,v.at=function(n){var t=arguments,e=-1,r=ot(t,true,false,1),t=t[2]&&t[2][t[1]]===n?1:r.length,u=Zt(t);for(Le.unindexedChars&&kt(n)&&(n=n.split(""));++e<t;)u[e]=n[r[e]];return u},v.bind=Mt,v.bindAll=function(n){for(var t=1<arguments.length?ot(arguments,true,false,1):_t(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=pt(n[u],1,null,null,n)}return n},v.bindKey=function(n,t){return 2<arguments.length?pt(t,19,s(arguments,2),null,n):pt(t,3,null,null,n)
},v.chain=function(n){return n=new y(n),n.__chain__=true,n},v.compact=function(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r},v.compose=function(){for(var n=arguments,t=n.length;t--;)if(!jt(n[t]))throw new le;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}},v.constant=function(n){return function(){return n}},v.countBy=rr,v.create=function(n,t){var e=nt(n);return t?Ye(e,t):e},v.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return tt(n,t,e);
if("object"!=r)return Xt(n);var u=We(n),o=u[0],a=n[o];return 1!=u.length||a!==a||xt(a)?function(t){for(var e=u.length,r=false;e--&&(r=at(t[u[e]],n[u[e]],null,true)););return r}:function(n){return n=n[o],a===n&&(0!==a||1/a==1/n)}},v.curry=function(n,t){return t=typeof t=="number"?t:+t||n.length,pt(n,4,null,null,null,t)},v.debounce=Vt,v.defaults=Ze,v.defer=function(n){if(!jt(n))throw new le;var t=s(arguments,1);return Ce(function(){n.apply(h,t)},1)},v.delay=function(n,t){if(!jt(n))throw new le;var e=s(arguments,2);
return Ce(function(){n.apply(h,e)},t)},v.difference=function(n){return rt(n,ot(arguments,true,true,1))},v.filter=At,v.flatten=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=typeof t!="function"&&r&&r[t]===n?null:t,t=false),null!=e&&(n=Bt(n,e,r)),ot(n,t)},v.forEach=Dt,v.forEachRight=Nt,v.forIn=nr,v.forInRight=function(n,t,e){var r=[];nr(n,function(n,t){r.push(t,n)});var u=r.length;for(t=tt(t,e,3);u--&&false!==t(r[u--],r[u],n););return n},v.forOwn=tr,v.forOwnRight=bt,v.functions=_t,v.groupBy=ur,v.indexBy=or,v.initial=function(n,t,e){var r=0,u=n?n.length:0;
if(typeof t!="number"&&null!=t){var o=u;for(t=v.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return s(n,0,Pe(Be(0,u-r),u))},v.intersection=function(){for(var e=[],r=-1,u=arguments.length,a=i(),l=ht(),f=l===n,s=i();++r<u;){var g=arguments[r];(qe(g)||dt(g))&&(e.push(g),a.push(f&&g.length>=_&&o(r?e[r]:s)))}var f=e[0],h=-1,v=f?f.length:0,y=[];n:for(;++h<v;){var m=a[0],g=f[h];if(0>(m?t(m,g):l(s,g))){for(r=u,(m||s).push(g);--r;)if(m=a[r],0>(m?t(m,g):l(e[r],g)))continue n;y.push(g)
}}for(;u--;)(m=a[u])&&p(m);return c(a),c(s),y},v.invert=wt,v.invoke=function(n,t){var e=s(arguments,2),r=-1,u=typeof t=="function",o=n?n.length:0,a=Zt(typeof o=="number"?o:0);return Dt(n,function(n){a[++r]=(u?t:n[t]).apply(n,e)}),a},v.keys=We,v.map=Bt,v.mapValues=function(n,t,e){var r={};return t=v.createCallback(t,e,3),tr(n,function(n,e,u){r[e]=t(n,e,u)}),r},v.max=Pt,v.memoize=function(n,t){if(!jt(n))throw new le;var e=function(){var r=e.cache,u=t?t.apply(this,arguments):b+arguments[0];return we.call(r,u)?r[u]:r[u]=n.apply(this,arguments)
};return e.cache={},e},v.merge=function(n){var t=arguments,e=2;if(!xt(n))return n;if("number"!=typeof t[2]&&(e=t.length),3<e&&"function"==typeof t[e-2])var r=tt(t[--e-1],t[e--],2);else 2<e&&"function"==typeof t[e-1]&&(r=t[--e]);for(var t=s(arguments,1,e),u=-1,o=i(),a=i();++u<e;)it(n,t[u],r,o,a);return c(o),c(a),n},v.min=function(n,t,e){var u=1/0,o=u;if(typeof t!="function"&&e&&e[t]===n&&(t=null),null==t&&qe(n)){e=-1;for(var a=n.length;++e<a;){var i=n[e];i<o&&(o=i)}}else t=null==t&&kt(n)?r:v.createCallback(t,e,3),Xe(n,function(n,e,r){e=t(n,e,r),e<u&&(u=e,o=n)
});return o},v.omit=function(n,t,e){var r={};if(typeof t!="function"){var u=[];nr(n,function(n,t){u.push(t)});for(var u=rt(u,ot(arguments,true,false,1)),o=-1,a=u.length;++o<a;){var i=u[o];r[i]=n[i]}}else t=v.createCallback(t,e,3),nr(n,function(n,e,u){t(n,e,u)||(r[e]=n)});return r},v.once=function(n){var t,e;if(!jt(n))throw new le;return function(){return t?e:(t=true,e=n.apply(this,arguments),n=null,e)}},v.pairs=function(n){for(var t=-1,e=We(n),r=e.length,u=Zt(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u
},v.partial=function(n){return pt(n,16,s(arguments,1))},v.partialRight=function(n){return pt(n,32,null,s(arguments,1))},v.pick=function(n,t,e){var r={};if(typeof t!="function")for(var u=-1,o=ot(arguments,true,false,1),a=xt(n)?o.length:0;++u<a;){var i=o[u];i in n&&(r[i]=n[i])}else t=v.createCallback(t,e,3),nr(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r},v.pluck=ar,v.property=Xt,v.pull=function(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,a=t[e];++o<u;)n[o]===a&&(ke.call(n,o--,1),u--);
return n},v.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);var r=-1;t=Be(0,ye((t-n)/(e||1)));for(var u=Zt(t);++r<t;)u[r]=n,n+=e;return u},v.reject=function(n,t,e){return t=v.createCallback(t,e,3),At(n,function(n,e,r){return!t(n,e,r)})},v.remove=function(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=v.createCallback(t,e,3);++r<u;)e=n[r],t(e,r,n)&&(o.push(e),ke.call(n,r--,1),u--);return o},v.rest=qt,v.shuffle=Tt,v.sortBy=function(n,t,e){var r=-1,o=qe(t),a=n?n.length:0,f=Zt(typeof a=="number"?a:0);
for(o||(t=v.createCallback(t,e,3)),Dt(n,function(n,e,u){var a=f[++r]=l();o?a.m=Bt(t,function(t){return n[t]}):(a.m=i())[0]=t(n,e,u),a.n=r,a.o=n}),a=f.length,f.sort(u);a--;)n=f[a],f[a]=n.o,o||c(n.m),p(n);return f},v.tap=function(n,t){return t(n),n},v.throttle=function(n,t,e){var r=true,u=true;if(!jt(n))throw new le;return false===e?r=false:xt(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),H.leading=r,H.maxWait=t,H.trailing=u,Vt(n,t,H)},v.times=function(n,t,e){n=-1<(n=+n)?n:0;var r=-1,u=Zt(n);
for(t=tt(t,e,1);++r<n;)u[r]=t(r);return u},v.toArray=function(n){return n&&typeof n.length=="number"?Le.unindexedChars&&kt(n)?n.split(""):s(n):Et(n)},v.transform=function(n,t,e,r){var u=qe(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor;e=nt(o&&o.prototype)}return t&&(t=v.createCallback(t,r,4),(u?Xe:tr)(n,function(n,r,u){return t(e,n,r,u)})),e},v.union=function(){return ft(ot(arguments,true,true))},v.uniq=Wt,v.values=Et,v.where=At,v.without=function(n){return rt(n,s(arguments,1))},v.wrap=function(n,t){return pt(t,16,[n])
},v.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(qe(e)||dt(e))var r=r?ft(rt(r,e).concat(rt(e,r))):e}return r||[]},v.zip=Gt,v.zipObject=Jt,v.collect=Bt,v.drop=qt,v.each=Dt,v.eachRight=Nt,v.extend=Ye,v.methods=_t,v.object=Jt,v.select=At,v.tail=qt,v.unique=Wt,v.unzip=Gt,Ut(v),v.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),Y(n,t,typeof e=="function"&&tt(e,r,1))},v.cloneDeep=function(n,t,e){return Y(n,true,typeof t=="function"&&tt(t,e,1))},v.contains=Ot,v.escape=function(n){return null==n?"":ie(n).replace(Qe,gt)
},v.every=St,v.find=It,v.findIndex=function(n,t,e){var r=-1,u=n?n.length:0;for(t=v.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1},v.findKey=function(n,t,e){var r;return t=v.createCallback(t,e,3),tr(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},v.findLast=function(n,t,e){var r;return t=v.createCallback(t,e,3),Nt(n,function(n,e,u){return t(n,e,u)?(r=n,false):void 0}),r},v.findLastIndex=function(n,t,e){var r=n?n.length:0;for(t=v.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;
return-1},v.findLastKey=function(n,t,e){var r;return t=v.createCallback(t,e,3),bt(n,function(n,e,u){return t(n,e,u)?(r=e,false):void 0}),r},v.has=function(n,t){return n?we.call(n,t):false},v.identity=Ht,v.indexOf=zt,v.isArguments=dt,v.isArray=qe,v.isBoolean=function(n){return true===n||false===n||n&&typeof n=="object"&&he.call(n)==L||false},v.isDate=function(n){return n&&typeof n=="object"&&he.call(n)==z||false},v.isElement=function(n){return n&&1===n.nodeType||false},v.isEmpty=function(n){var t=true;if(!n)return t;var e=he.call(n),r=n.length;
return e==$||e==M||(Le.argsClass?e==T:dt(n))||e==G&&typeof r=="number"&&jt(n.splice)?!r:(tr(n,function(){return t=false}),t)},v.isEqual=function(n,t,e,r){return at(n,t,typeof e=="function"&&tt(e,r,2))},v.isFinite=function(n){return Ie(n)&&!De(parseFloat(n))},v.isFunction=jt,v.isNaN=function(n){return Ct(n)&&n!=+n},v.isNull=function(n){return null===n},v.isNumber=Ct,v.isObject=xt,v.isPlainObject=er,v.isRegExp=function(n){return n&&X[typeof n]&&he.call(n)==J||false},v.isString=kt,v.isUndefined=function(n){return typeof n=="undefined"
},v.lastIndexOf=function(n,t,e){var r=n?n.length:0;for(typeof e=="number"&&(r=(0>e?Be(0,r+e):Pe(e,r-1))+1);r--;)if(n[r]===t)return r;return-1},v.mixin=Ut,v.noConflict=function(){return e._=ge,this},v.noop=Qt,v.now=ir,v.parseInt=lr,v.random=function(n,t,e){var r=null==n,u=null==t;return null==e&&(typeof n=="boolean"&&u?(e=n,n=1):u||typeof t!="boolean"||(e=t,u=true)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1?(e=Fe(),Pe(n+e*(t-n+parseFloat("1e-"+((e+"").length-1))),t)):lt(n,t)},v.reduce=Rt,v.reduceRight=Ft,v.result=function(n,t){if(n){var e=n[t];
return jt(e)?n[t]():e}},v.runInContext=g,v.size=function(n){var t=n?n.length:0;return typeof t=="number"?t:We(n).length},v.some=$t,v.sortedIndex=Kt,v.template=function(n,t,e){var r=v.templateSettings;n=ie(n||""),e=Ze({},e,r);var u,o=Ze({},e.imports,r.imports),r=We(o),o=Et(o),i=0,l=e.interpolate||N,f="__p+='",l=ae((e.escape||N).source+"|"+l.source+"|"+(l===I?O:N).source+"|"+(e.evaluate||N).source+"|$","g");n.replace(l,function(t,e,r,o,l,c){return r||(r=o),f+=n.slice(i,c).replace(P,a),e&&(f+="'+__e("+e+")+'"),l&&(u=true,f+="';"+l+";\n__p+='"),r&&(f+="'+((__t=("+r+"))==null?'':__t)+'"),i=c+t.length,t
}),f+="';",l=e=e.variable,l||(e="obj",f="with("+e+"){"+f+"}"),f=(u?f.replace(x,""):f).replace(C,"$1").replace(E,"$1;"),f="function("+e+"){"+(l?"":e+"||("+e+"={});")+"var __t,__p='',__e=_.escape"+(u?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+f+"return __p}";try{var c=ee(r,"return "+f).apply(h,o)}catch(p){throw p.source=f,p}return t?c(t):(c.source=f,c)},v.unescape=function(n){return null==n?"":ie(n).replace(Ue,mt)},v.uniqueId=function(n){var t=++m;return ie(null==n?"":n)+t
},v.all=St,v.any=$t,v.detect=It,v.findWhere=It,v.foldl=Rt,v.foldr=Ft,v.include=Ot,v.inject=Rt,Ut(function(){var n={};return tr(v,function(t,e){v.prototype[e]||(n[e]=t)}),n}(),false),v.first=Lt,v.last=function(n,t,e){var r=0,u=n?n.length:0;if(typeof t!="number"&&null!=t){var o=u;for(t=v.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:h;return s(n,Be(0,u-r))},v.sample=function(n,t,e){return n&&typeof n.length!="number"?n=Et(n):Le.unindexedChars&&kt(n)&&(n=n.split("")),null==t||e?n?n[lt(0,n.length-1)]:h:(n=Tt(n),n.length=Pe(Be(0,t),n.length),n)
},v.take=Lt,v.head=Lt,tr(v,function(n,t){var e="sample"!==t;v.prototype[t]||(v.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&typeof t=="function")?new y(o,u):o})}),v.VERSION="2.4.1",v.prototype.chain=function(){return this.__chain__=true,this},v.prototype.toString=function(){return ie(this.__wrapped__)},v.prototype.value=Yt,v.prototype.valueOf=Yt,Xe(["join","pop","shift"],function(n){var t=fe[n];v.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);
return n?new y(e,n):e}}),Xe(["push","reverse","sort","unshift"],function(n){var t=fe[n];v.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),Xe(["concat","slice","splice"],function(n){var t=fe[n];v.prototype[n]=function(){return new y(t.apply(this.__wrapped__,arguments),this.__chain__)}}),Le.spliceObjects||Xe(["pop","shift","splice"],function(n){var t=fe[n],e="splice"==n;v.prototype[n]=function(){var n=this.__chain__,r=this.__wrapped__,u=t.apply(r,arguments);return 0===r.length&&delete r[0],n||e?new y(u,n):u
}}),v}var h,v=[],y=[],m=0,d={},b=+new Date+"",_=75,w=40,j=" \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",x=/\b__p\+='';/g,C=/\b(__p\+=)''\+/g,E=/(__e\(.*?\)|\b__t\))\+'';/g,O=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,S=/\w*$/,A=/^\s*function[ \n\r\t]+\w/,I=/<%=([\s\S]+?)%>/g,D=RegExp("^["+j+"]*0+(?=.$)"),N=/($^)/,B=/\bthis\b/,P=/['\n\r\t\u2028\u2029\\]/g,R="Array Boolean Date Error Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),F="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),T="[object Arguments]",$="[object Array]",L="[object Boolean]",z="[object Date]",q="[object Error]",K="[object Function]",W="[object Number]",G="[object Object]",J="[object RegExp]",M="[object String]",V={};
V[K]=false,V[T]=V[$]=V[L]=V[z]=V[W]=V[G]=V[J]=V[M]=true;var H={leading:false,maxWait:0,trailing:false},U={configurable:false,enumerable:false,value:null,writable:false},Q={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},X={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},Y={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},Z=X[typeof window]&&window||this,nt=X[typeof exports]&&exports&&!exports.nodeType&&exports,tt=X[typeof module]&&module&&!module.nodeType&&module,et=tt&&tt.exports===nt&&nt,rt=X[typeof global]&&global;
!rt||rt.global!==rt&&rt.window!==rt||(Z=rt);var ut=g();typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Z._=ut, define(function(){return ut})):nt&&tt?et?(tt.exports=ut)._=ut:nt._=ut:Z._=ut}).call(this);
var Faye = (function() {
    'use strict';

    var Faye = {
        VERSION:          '1.0.1',

        BAYEUX_VERSION:   '1.0',
        ID_LENGTH:        160,
        JSONP_CALLBACK:   'jsonpcallback',
        CONNECTION_TYPES: ['long-polling', 'cross-origin-long-polling', 'callback-polling', 'websocket', 'eventsource', 'in-process'],

        MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process'],

        ENV: (typeof window !== 'undefined') ? window : global,

        extend: function(dest, source, overwrite) {
            if (!source) return dest;
            for (var key in source) {
                if (!source.hasOwnProperty(key)) continue;
                if (dest.hasOwnProperty(key) && overwrite === false) continue;
                if (dest[key] !== source[key])
                    dest[key] = source[key];
            }
            return dest;
        },

        random: function(bitlength) {
            bitlength = bitlength || this.ID_LENGTH;
            return csprng(bitlength, 36);
        },

        clientIdFromMessages: function(messages) {
            var connect = this.filter([].concat(messages), function(message) {
                return message.channel === '/meta/connect';
            });
            return connect[0] && connect[0].clientId;
        },

        copyObject: function(object) {
            var clone, i, key;
            if (object instanceof Array) {
                clone = [];
                i = object.length;
                while (i--) clone[i] = Faye.copyObject(object[i]);
                return clone;
            } else if (typeof object === 'object') {
                clone = (object === null) ? null : {};
                for (key in object) clone[key] = Faye.copyObject(object[key]);
                return clone;
            } else {
                return object;
            }
        },

        commonElement: function(lista, listb) {
            for (var i = 0, n = lista.length; i < n; i++) {
                if (this.indexOf(listb, lista[i]) !== -1)
                    return lista[i];
            }
            return null;
        },

        indexOf: function(list, needle) {
            if (list.indexOf) return list.indexOf(needle);

            for (var i = 0, n = list.length; i < n; i++) {
                if (list[i] === needle) return i;
            }
            return -1;
        },

        map: function(object, callback, context) {
            if (object.map) return object.map(callback, context);
            var result = [];

            if (object instanceof Array) {
                for (var i = 0, n = object.length; i < n; i++) {
                    result.push(callback.call(context || null, object[i], i));
                }
            } else {
                for (var key in object) {
                    if (!object.hasOwnProperty(key)) continue;
                    result.push(callback.call(context || null, key, object[key]));
                }
            }
            return result;
        },

        filter: function(array, callback, context) {
            if (array.filter) return array.filter(callback, context);
            var result = [];
            for (var i = 0, n = array.length; i < n; i++) {
                if (callback.call(context || null, array[i], i))
                    result.push(array[i]);
            }
            return result;
        },

        asyncEach: function(list, iterator, callback, context) {
            var n       = list.length,
                i       = -1,
                calls   = 0,
                looping = false;

            var iterate = function() {
                calls -= 1;
                i += 1;
                if (i === n) return callback && callback.call(context);
                iterator(list[i], resume);
            };

            var loop = function() {
                if (looping) return;
                looping = true;
                while (calls > 0) iterate();
                looping = false;
            };

            var resume = function() {
                calls += 1;
                loop();
            };
            resume();
        },

        // http://assanka.net/content/tech/2009/09/02/json2-js-vs-prototype/
        toJSON: function(object) {
            if (!this.stringify) return JSON.stringify(object);

            return this.stringify(object, function(key, value) {
                return (this[key] instanceof Array) ? this[key] : value;
            });
        }
    };

    if (typeof module !== 'undefined')
        module.exports = Faye;
    else if (typeof window !== 'undefined')
        window.Faye = Faye;

    Faye.Class = function(parent, methods) {
        if (typeof parent !== 'function') {
            methods = parent;
            parent  = Object;
        }

        var klass = function() {
            if (!this.initialize) return this;
            return this.initialize.apply(this, arguments) || this;
        };

        var bridge = function() {};
        bridge.prototype = parent.prototype;

        klass.prototype = new bridge();
        Faye.extend(klass.prototype, methods);

        return klass;
    };

    (function() {
        var EventEmitter = Faye.EventEmitter = function() {};

        /*
         Copyright Joyent, Inc. and other Node contributors. All rights reserved.
         Permission is hereby granted, free of charge, to any person obtaining a copy of
         this software and associated documentation files (the "Software"), to deal in
         the Software without restriction, including without limitation the rights to
         use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
         of the Software, and to permit persons to whom the Software is furnished to do
         so, subject to the following conditions:

         The above copyright notice and this permission notice shall be included in all
         copies or substantial portions of the Software.

         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
         SOFTWARE.
         */

        var isArray = typeof Array.isArray === 'function'
                ? Array.isArray
                : function (xs) {
                return Object.prototype.toString.call(xs) === '[object Array]'
            }
            ;
        function indexOf (xs, x) {
            if (xs.indexOf) return xs.indexOf(x);
            for (var i = 0; i < xs.length; i++) {
                if (x === xs[i]) return i;
            }
            return -1;
        }


        EventEmitter.prototype.emit = function(type) {
            // If there is no 'error' event listener then throw.
            if (type === 'error') {
                if (!this._events || !this._events.error ||
                    (isArray(this._events.error) && !this._events.error.length))
                {
                    if (arguments[1] instanceof Error) {
                        throw arguments[1]; // Unhandled 'error' event
                    } else {
                        throw new Error("Uncaught, unspecified 'error' event.");
                    }
                    return false;
                }
            }

            if (!this._events) return false;
            var handler = this._events[type];
            if (!handler) return false;

            if (typeof handler == 'function') {
                switch (arguments.length) {
                    // fast cases
                    case 1:
                        handler.call(this);
                        break;
                    case 2:
                        handler.call(this, arguments[1]);
                        break;
                    case 3:
                        handler.call(this, arguments[1], arguments[2]);
                        break;
                    // slower
                    default:
                        var args = Array.prototype.slice.call(arguments, 1);
                        handler.apply(this, args);
                }
                return true;

            } else if (isArray(handler)) {
                var args = Array.prototype.slice.call(arguments, 1);

                var listeners = handler.slice();
                for (var i = 0, l = listeners.length; i < l; i++) {
                    listeners[i].apply(this, args);
                }
                return true;

            } else {
                return false;
            }
        };

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
        EventEmitter.prototype.addListener = function(type, listener) {
            if ('function' !== typeof listener) {
                throw new Error('addListener only takes instances of Function');
            }

            if (!this._events) this._events = {};

            // To avoid recursion in the case that type == "newListeners"! Before
            // adding it to the listeners, first emit "newListeners".
            this.emit('newListener', type, listener);

            if (!this._events[type]) {
                // Optimize the case of one listener. Don't need the extra array object.
                this._events[type] = listener;
            } else if (isArray(this._events[type])) {
                // If we've already got an array, just append.
                this._events[type].push(listener);
            } else {
                // Adding the second element, need to change to array.
                this._events[type] = [this._events[type], listener];
            }

            return this;
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.once = function(type, listener) {
            var self = this;
            self.on(type, function g() {
                self.removeListener(type, g);
                listener.apply(this, arguments);
            });

            return this;
        };

        EventEmitter.prototype.removeListener = function(type, listener) {
            if ('function' !== typeof listener) {
                throw new Error('removeListener only takes instances of Function');
            }

            // does not use listeners(), so no side effect of creating _events[type]
            if (!this._events || !this._events[type]) return this;

            var list = this._events[type];

            if (isArray(list)) {
                var i = indexOf(list, listener);
                if (i < 0) return this;
                list.splice(i, 1);
                if (list.length == 0)
                    delete this._events[type];
            } else if (this._events[type] === listener) {
                delete this._events[type];
            }

            return this;
        };

        EventEmitter.prototype.removeAllListeners = function(type) {
            if (arguments.length === 0) {
                this._events = {};
                return this;
            }

            // does not use listeners(), so no side effect of creating _events[type]
            if (type && this._events && this._events[type]) this._events[type] = null;
            return this;
        };

        EventEmitter.prototype.listeners = function(type) {
            if (!this._events) this._events = {};
            if (!this._events[type]) this._events[type] = [];
            if (!isArray(this._events[type])) {
                this._events[type] = [this._events[type]];
            }
            return this._events[type];
        };

    })();

    Faye.Namespace = Faye.Class({
        initialize: function() {
            this._used = {};
        },

        exists: function(id) {
            return this._used.hasOwnProperty(id);
        },

        generate: function() {
            var name = Faye.random();
            while (this._used.hasOwnProperty(name))
                name = Faye.random();
            return this._used[name] = name;
        },

        release: function(id) {
            delete this._used[id];
        }
    });

    (function() {
        'use strict';

        var timeout = setTimeout;

        var defer;
        if (typeof setImmediate === 'function')
            defer = function(fn) { setImmediate(fn) };
        else if (typeof process === 'object' && process.nextTick)
            defer = function(fn) { process.nextTick(fn) };
        else
            defer = function(fn) { timeout(fn, 0) };

        var PENDING   = 0,
            FULFILLED = 1,
            REJECTED  = 2;

        var RETURN = function(x) { return x },
            THROW  = function(x) { throw x  };

        var Promise = function(task) {
            this._state     = PENDING;
            this._callbacks = [];
            this._errbacks  = [];

            if (typeof task !== 'function') return;
            var self = this;

            task(function(value)  { fulfill(self, value) },
                function(reason) { reject(self, reason) });
        };

        Promise.prototype.then = function(callback, errback) {
            var next = {}, self = this;

            next.promise = new Promise(function(fulfill, reject) {
                next.fulfill = fulfill;
                next.reject  = reject;

                registerCallback(self, callback, next);
                registerErrback(self, errback, next);
            });
            return next.promise;
        };

        var registerCallback = function(promise, callback, next) {
            if (typeof callback !== 'function') callback = RETURN;
            var handler = function(value) { invoke(callback, value, next) };
            if (promise._state === PENDING) {
                promise._callbacks.push(handler);
            } else if (promise._state === FULFILLED) {
                handler(promise._value);
            }
        };

        var registerErrback = function(promise, errback, next) {
            if (typeof errback !== 'function') errback = THROW;
            var handler = function(reason) { invoke(errback, reason, next) };
            if (promise._state === PENDING) {
                promise._errbacks.push(handler);
            } else if (promise._state === REJECTED) {
                handler(promise._reason);
            }
        };

        var invoke = function(fn, value, next) {
            defer(function() { _invoke(fn, value, next) });
        };

        var _invoke = function(fn, value, next) {
            var called = false, outcome, type, then;

            try {
                outcome = fn(value);
                type    = typeof outcome;
                then    = outcome !== null && (type === 'function' || type === 'object') && outcome.then;

                if (outcome === next.promise)
                    return next.reject(new TypeError('Recursive promise chain detected'));

                if (typeof then !== 'function') return next.fulfill(outcome);

                then.call(outcome, function(v) {
                    if (called) return;
                    called = true;
                    _invoke(RETURN, v, next);
                }, function(r) {
                    if (called) return;
                    called = true;
                    next.reject(r);
                });

            } catch (error) {
                if (called) return;
                called = true;
                next.reject(error);
            }
        };

        var fulfill = Promise.fulfill = Promise.resolve = function(promise, value) {
            if (promise._state !== PENDING) return;

            promise._state    = FULFILLED;
            promise._value    = value;
            promise._errbacks = [];

            var callbacks = promise._callbacks, cb;
            while (cb = callbacks.shift()) cb(value);
        };

        var reject = Promise.reject = function(promise, reason) {
            if (promise._state !== PENDING) return;

            promise._state     = REJECTED;
            promise._reason    = reason;
            promise._callbacks = [];

            var errbacks = promise._errbacks, eb;
            while (eb = errbacks.shift()) eb(reason);
        };

        Promise.defer = defer;

        Promise.deferred = Promise.pending = function() {
            var tuple = {};

            tuple.promise = new Promise(function(fulfill, reject) {
                tuple.fulfill = tuple.resolve = fulfill;
                tuple.reject  = reject;
            });
            return tuple;
        };

        Promise.fulfilled = Promise.resolved = function(value) {
            return new Promise(function(fulfill, reject) { fulfill(value) });
        };

        Promise.rejected = function(reason) {
            return new Promise(function(fulfill, reject) { reject(reason) });
        };

        if (typeof Faye === 'undefined')
            module.exports = Promise;
        else
            Faye.Promise = Promise;

    })();

    Faye.Set = Faye.Class({
        initialize: function() {
            this._index = {};
        },

        add: function(item) {
            var key = (item.id !== undefined) ? item.id : item;
            if (this._index.hasOwnProperty(key)) return false;
            this._index[key] = item;
            return true;
        },

        forEach: function(block, context) {
            for (var key in this._index) {
                if (this._index.hasOwnProperty(key))
                    block.call(context, this._index[key]);
            }
        },

        isEmpty: function() {
            for (var key in this._index) {
                if (this._index.hasOwnProperty(key)) return false;
            }
            return true;
        },

        member: function(item) {
            for (var key in this._index) {
                if (this._index[key] === item) return true;
            }
            return false;
        },

        remove: function(item) {
            var key = (item.id !== undefined) ? item.id : item;
            var removed = this._index[key];
            delete this._index[key];
            return removed;
        },

        toArray: function() {
            var array = [];
            this.forEach(function(item) { array.push(item) });
            return array;
        }
    });

    Faye.URI = {
        isURI: function(uri) {
            return uri && uri.protocol && uri.host && uri.path;
        },

        isSameOrigin: function(uri) {
            var location = Faye.ENV.location;
            return uri.protocol === location.protocol &&
                uri.hostname === location.hostname &&
                uri.port     === location.port;
        },

        parse: function(url) {
            if (typeof url !== 'string') return url;
            var uri = {}, parts, query, pairs, i, n, data;

            var consume = function(name, pattern) {
                url = url.replace(pattern, function(match) {
                    uri[name] = match;
                    return '';
                });
                uri[name] = uri[name] || '';
            };

            consume('protocol', /^[a-z]+\:/i);
            consume('host',     /^\/\/[^\/\?#]+/);

            if (!/^\//.test(url) && !uri.host)
                url = Faye.ENV.location.pathname.replace(/[^\/]*$/, '') + url;

            consume('pathname', /^[^\?#]*/);
            consume('search',   /^\?[^#]*/);
            consume('hash',     /^#.*/);

            uri.protocol = uri.protocol || Faye.ENV.location.protocol;

            if (uri.host) {
                uri.host     = uri.host.substr(2);
                parts        = uri.host.split(':');
                uri.hostname = parts[0];
                uri.port     = parts[1] || '';
            } else {
                uri.host     = Faye.ENV.location.host;
                uri.hostname = Faye.ENV.location.hostname;
                uri.port     = Faye.ENV.location.port;
            }

            uri.pathname = uri.pathname || '/';
            uri.path = uri.pathname + uri.search;

            query = uri.search.replace(/^\?/, '');
            pairs = query ? query.split('&') : [];
            data  = {};

            for (i = 0, n = pairs.length; i < n; i++) {
                parts = pairs[i].split('=');
                data[decodeURIComponent(parts[0] || '')] = decodeURIComponent(parts[1] || '');
            }

            uri.query = data;

            uri.href = this.stringify(uri);
            return uri;
        },

        stringify: function(uri) {
            var string = uri.protocol + '//' + uri.hostname;
            if (uri.port) string += ':' + uri.port;
            string += uri.pathname + this.queryString(uri.query) + (uri.hash || '');
            return string;
        },

        queryString: function(query) {
            var pairs = [];
            for (var key in query) {
                if (!query.hasOwnProperty(key)) continue;
                pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
            }
            if (pairs.length === 0) return '';
            return '?' + pairs.join('&');
        }
    };

    Faye.Error = Faye.Class({
        initialize: function(code, params, message) {
            this.code    = code;
            this.params  = Array.prototype.slice.call(params);
            this.message = message;
        },

        toString: function() {
            return this.code + ':' +
                this.params.join(',') + ':' +
                this.message;
        }
    });

    Faye.Error.parse = function(message) {
        message = message || '';
        if (!Faye.Grammar.ERROR.test(message)) return new this(null, [], message);

        var parts   = message.split(':'),
            code    = parseInt(parts[0]),
            params  = parts[1].split(','),
            message = parts[2];

        return new this(code, params, message);
    };




    Faye.Error.versionMismatch = function() {
        return new this(300, arguments, 'Version mismatch').toString();
    };

    Faye.Error.conntypeMismatch = function() {
        return new this(301, arguments, 'Connection types not supported').toString();
    };

    Faye.Error.extMismatch = function() {
        return new this(302, arguments, 'Extension mismatch').toString();
    };

    Faye.Error.badRequest = function() {
        return new this(400, arguments, 'Bad request').toString();
    };

    Faye.Error.clientUnknown = function() {
        return new this(401, arguments, 'Unknown client').toString();
    };

    Faye.Error.parameterMissing = function() {
        return new this(402, arguments, 'Missing required parameter').toString();
    };

    Faye.Error.channelForbidden = function() {
        return new this(403, arguments, 'Forbidden channel').toString();
    };

    Faye.Error.channelUnknown = function() {
        return new this(404, arguments, 'Unknown channel').toString();
    };

    Faye.Error.channelInvalid = function() {
        return new this(405, arguments, 'Invalid channel').toString();
    };

    Faye.Error.extUnknown = function() {
        return new this(406, arguments, 'Unknown extension').toString();
    };

    Faye.Error.publishFailed = function() {
        return new this(407, arguments, 'Failed to publish').toString();
    };

    Faye.Error.serverError = function() {
        return new this(500, arguments, 'Internal server error').toString();
    };


    Faye.Deferrable = {
        then: function(callback, errback) {
            var self = this;
            if (!this._promise)
                this._promise = new Faye.Promise(function(fulfill, reject) {
                    self._fulfill = fulfill;
                    self._reject  = reject;
                });

            if (arguments.length === 0)
                return this._promise;
            else
                return this._promise.then(callback, errback);
        },

        callback: function(callback, context) {
            return this.then(function(value) { callback.call(context, value) });
        },

        errback: function(callback, context) {
            return this.then(null, function(reason) { callback.call(context, reason) });
        },

        timeout: function(seconds, message) {
            this.then();
            var self = this;
            this._timer = Faye.ENV.setTimeout(function() {
                self._reject(message);
            }, seconds * 1000);
        },

        setDeferredStatus: function(status, value) {
            if (this._timer) Faye.ENV.clearTimeout(this._timer);

            var promise = this.then();

            if (status === 'succeeded')
                this._fulfill(value);
            else if (status === 'failed')
                this._reject(value);
            else
                delete this._promise;
        }
    };

    Faye.Publisher = {
        countListeners: function(eventType) {
            return this.listeners(eventType).length;
        },

        bind: function(eventType, listener, context) {
            var slice   = Array.prototype.slice,
                handler = function() { listener.apply(context, slice.call(arguments)) };

            this._listeners = this._listeners || [];
            this._listeners.push([eventType, listener, context, handler]);
            return this.on(eventType, handler);
        },

        unbind: function(eventType, listener, context) {
            this._listeners = this._listeners || [];
            var n = this._listeners.length, tuple;

            while (n--) {
                tuple = this._listeners[n];
                if (tuple[0] !== eventType) continue;
                if (listener && (tuple[1] !== listener || tuple[2] !== context)) continue;
                this._listeners.splice(n, 1);
                this.removeListener(eventType, tuple[3]);
            }
        }
    };

    Faye.extend(Faye.Publisher, Faye.EventEmitter.prototype);
    Faye.Publisher.trigger = Faye.Publisher.emit;

    Faye.Timeouts = {
        addTimeout: function(name, delay, callback, context) {
            this._timeouts = this._timeouts || {};
            if (this._timeouts.hasOwnProperty(name)) return;
            var self = this;
            this._timeouts[name] = Faye.ENV.setTimeout(function() {
                delete self._timeouts[name];
                callback.call(context);
            }, 1000 * delay);
        },

        removeTimeout: function(name) {
            this._timeouts = this._timeouts || {};
            var timeout = this._timeouts[name];
            if (!timeout) return;
            clearTimeout(timeout);
            delete this._timeouts[name];
        },

        removeAllTimeouts: function() {
            this._timeouts = this._timeouts || {};
            for (var name in this._timeouts) this.removeTimeout(name);
        }
    };

    Faye.Logging = {
        LOG_LEVELS: {
            fatal:  4,
            error:  3,
            warn:   2,
            info:   1,
            debug:  0
        },

        writeLog: function(messageArgs, level) {
            if (!Faye.logger) return;

            var messageArgs = Array.prototype.slice.apply(messageArgs),
                banner      = '[Faye',
                klass       = this.className,

                message = messageArgs.shift().replace(/\?/g, function() {
                    try {
                        return Faye.toJSON(messageArgs.shift());
                    } catch (e) {
                        return '[Object]';
                    }
                });

            for (var key in Faye) {
                if (klass) continue;
                if (typeof Faye[key] !== 'function') continue;
                if (this instanceof Faye[key]) klass = key;
            }
            if (klass) banner += '.' + klass;
            banner += '] ';

            if (typeof Faye.logger[level] === 'function')
                Faye.logger[level](banner + message);
            else if (typeof Faye.logger === 'function')
                Faye.logger(banner + message);
        }
    };

    (function() {
        for (var key in Faye.Logging.LOG_LEVELS)
            (function(level, value) {
                Faye.Logging[level] = function() {
                    this.writeLog(arguments, level);
                };
            })(key, Faye.Logging.LOG_LEVELS[key]);
    })();

    Faye.Grammar = {
        CHANNEL_NAME:     /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
        CHANNEL_PATTERN:  /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
        ERROR:            /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
        VERSION:          /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/
    };

    Faye.Extensible = {
        addExtension: function(extension) {
            this._extensions = this._extensions || [];
            this._extensions.push(extension);
            if (extension.added) extension.added(this);
        },

        removeExtension: function(extension) {
            if (!this._extensions) return;
            var i = this._extensions.length;
            while (i--) {
                if (this._extensions[i] !== extension) continue;
                this._extensions.splice(i,1);
                if (extension.removed) extension.removed(this);
            }
        },

        pipeThroughExtensions: function(stage, message, request, callback, context) {
            this.debug('Passing through ? extensions: ?', stage, message);

            if (!this._extensions) return callback.call(context, message);
            var extensions = this._extensions.slice();

            var pipe = function(message) {
                if (!message) return callback.call(context, message);

                var extension = extensions.shift();
                if (!extension) return callback.call(context, message);

                var fn = extension[stage];
                if (!fn) return pipe(message);

                if (fn.length >= 3) extension[stage](message, request, pipe);
                else                extension[stage](message, pipe);
            };
            pipe(message);
        }
    };

    Faye.extend(Faye.Extensible, Faye.Logging);

    Faye.Channel = Faye.Class({
        initialize: function(name) {
            this.id = this.name = name;
        },

        push: function(message) {
            this.trigger('message', message);
        },

        isUnused: function() {
            return this.countListeners('message') === 0;
        }
    });

    Faye.extend(Faye.Channel.prototype, Faye.Publisher);

    Faye.extend(Faye.Channel, {
        HANDSHAKE:    '/meta/handshake',
        CONNECT:      '/meta/connect',
        SUBSCRIBE:    '/meta/subscribe',
        UNSUBSCRIBE:  '/meta/unsubscribe',
        DISCONNECT:   '/meta/disconnect',

        META:         'meta',
        SERVICE:      'service',

        expand: function(name) {
            var segments = this.parse(name),
                channels = ['/**', name];

            var copy = segments.slice();
            copy[copy.length - 1] = '*';
            channels.push(this.unparse(copy));

            for (var i = 1, n = segments.length; i < n; i++) {
                copy = segments.slice(0, i);
                copy.push('**');
                channels.push(this.unparse(copy));
            }

            return channels;
        },

        isValid: function(name) {
            return Faye.Grammar.CHANNEL_NAME.test(name) ||
                Faye.Grammar.CHANNEL_PATTERN.test(name);
        },

        parse: function(name) {
            if (!this.isValid(name)) return null;
            return name.split('/').slice(1);
        },

        unparse: function(segments) {
            return '/' + segments.join('/');
        },

        isMeta: function(name) {
            var segments = this.parse(name);
            return segments ? (segments[0] === this.META) : null;
        },

        isService: function(name) {
            var segments = this.parse(name);
            return segments ? (segments[0] === this.SERVICE) : null;
        },

        isSubscribable: function(name) {
            if (!this.isValid(name)) return null;
            return !this.isMeta(name) && !this.isService(name);
        },

        Set: Faye.Class({
            initialize: function() {
                this._channels = {};
            },

            getKeys: function() {
                var keys = [];
                for (var key in this._channels) keys.push(key);
                return keys;
            },

            remove: function(name) {
                delete this._channels[name];
            },

            hasSubscription: function(name) {
                return this._channels.hasOwnProperty(name);
            },

            subscribe: function(names, callback, context) {
                if (!callback) return;
                var name;
                for (var i = 0, n = names.length; i < n; i++) {
                    name = names[i];
                    var channel = this._channels[name] = this._channels[name] || new Faye.Channel(name);
                    channel.bind('message', callback, context);
                }
            },

            unsubscribe: function(name, callback, context) {
                var channel = this._channels[name];
                if (!channel) return false;
                channel.unbind('message', callback, context);

                if (channel.isUnused()) {
                    this.remove(name);
                    return true;
                } else {
                    return false;
                }
            },

            distributeMessage: function(message) {
                var channels = Faye.Channel.expand(message.channel);

                for (var i = 0, n = channels.length; i < n; i++) {
                    var channel = this._channels[channels[i]];
                    if (channel) channel.trigger('message', message.data);
                }
            }
        })
    });

    Faye.Envelope = Faye.Class({
        initialize: function(message, timeout) {
            this.id      = message.id;
            this.message = message;

            if (timeout !== undefined) this.timeout(timeout / 1000, false);
        }
    });

    Faye.extend(Faye.Envelope.prototype, Faye.Deferrable);

    Faye.Publication = Faye.Class(Faye.Deferrable);

    Faye.Subscription = Faye.Class({
        initialize: function(client, channels, callback, context) {
            this._client    = client;
            this._channels  = channels;
            this._callback  = callback;
            this._context     = context;
            this._cancelled = false;
        },

        cancel: function() {
            if (this._cancelled) return;
            this._client.unsubscribe(this._channels, this._callback, this._context);
            this._cancelled = true;
        },

        unsubscribe: function() {
            this.cancel();
        }
    });

    Faye.extend(Faye.Subscription.prototype, Faye.Deferrable);

    Faye.Client = Faye.Class({
        UNCONNECTED:          1,
        CONNECTING:           2,
        CONNECTED:            3,
        DISCONNECTED:         4,

        HANDSHAKE:            'handshake',
        RETRY:                'retry',
        NONE:                 'none',

        CONNECTION_TIMEOUT:   60,
        DEFAULT_RETRY:        5,
        MAX_REQUEST_SIZE:     2048,

        DEFAULT_ENDPOINT:     '/bayeux',
        INTERVAL:             0,

        initialize: function(endpoint, options) {
            this.info('New client created for ?', endpoint);

            this._options   = options || {};
            this.endpoint   = Faye.URI.parse(endpoint || this.DEFAULT_ENDPOINT);
            this.endpoints  = this._options.endpoints || {};
            this.transports = {};
            this.cookies    = Faye.CookieJar && new Faye.CookieJar();
            this.headers    = {};
            this.ca         = this._options.ca;
            this._disabled  = [];
            this._retry     = this._options.retry || this.DEFAULT_RETRY;

            for (var key in this.endpoints)
                this.endpoints[key] = Faye.URI.parse(this.endpoints[key]);

            this.maxRequestSize = this.MAX_REQUEST_SIZE;

            this._state     = this.UNCONNECTED;
            this._channels  = new Faye.Channel.Set();
            this._messageId = 0;

            this._responseCallbacks = {};

            this._advice = {
                reconnect: this.RETRY,
                interval:  1000 * (this._options.interval || this.INTERVAL),
                timeout:   1000 * (this._options.timeout  || this.CONNECTION_TIMEOUT)
            };

            if (Faye.Event && Faye.ENV.onbeforeunload !== undefined)
                Faye.Event.on(Faye.ENV, 'beforeunload', function() {
                    if (Faye.indexOf(this._disabled, 'autodisconnect') < 0)
                        this.disconnect();
                }, this);
        },

        disable: function(feature) {
            this._disabled.push(feature);
        },

        setHeader: function(name, value) {
            this.headers[name] = value;
        },

        // Request
        // MUST include:  * channel
        //                * version
        //                * supportedConnectionTypes
        // MAY include:   * minimumVersion
        //                * ext
        //                * id
        //
        // Success Response                             Failed Response
        // MUST include:  * channel                     MUST include:  * channel
        //                * version                                    * successful
        //                * supportedConnectionTypes                   * error
        //                * clientId                    MAY include:   * supportedConnectionTypes
        //                * successful                                 * advice
        // MAY include:   * minimumVersion                             * version
        //                * advice                                     * minimumVersion
        //                * ext                                        * ext
        //                * id                                         * id
        //                * authSuccessful
        handshake: function(callback, context) {
            if (this._advice.reconnect === this.NONE) return;
            if (this._state !== this.UNCONNECTED) return;

            this._state = this.CONNECTING;
            var self = this;

            this.info('Initiating handshake with ?', Faye.URI.stringify(this.endpoint));
            this._selectTransport(Faye.MANDATORY_CONNECTION_TYPES);

            this._send({
                channel:                  Faye.Channel.HANDSHAKE,
                version:                  Faye.BAYEUX_VERSION,
                supportedConnectionTypes: [this._transport.connectionType]

            }, function(response) {

                if (response.successful) {
                    this._state     = this.CONNECTED;
                    this._clientId  = response.clientId;

                    this._selectTransport(response.supportedConnectionTypes);

                    this.info('Handshake successful: ?', this._clientId);

                    this.subscribe(this._channels.getKeys(), true);
                    if (callback) Faye.Promise.defer(function() { callback.call(context) });

                } else {
                    this.info('Handshake unsuccessful');
                    Faye.ENV.setTimeout(function() { self.handshake(callback, context) }, this._advice.interval);
                    this._state = this.UNCONNECTED;
                }
            }, this);
        },

        // Request                              Response
        // MUST include:  * channel             MUST include:  * channel
        //                * clientId                           * successful
        //                * connectionType                     * clientId
        // MAY include:   * ext                 MAY include:   * error
        //                * id                                 * advice
        //                                                     * ext
        //                                                     * id
        //                                                     * timestamp
        connect: function(callback, context) {
            if (this._advice.reconnect === this.NONE) return;
            if (this._state === this.DISCONNECTED) return;

            if (this._state === this.UNCONNECTED)
                return this.handshake(function() { this.connect(callback, context) }, this);

            this.callback(callback, context);
            if (this._state !== this.CONNECTED) return;

            this.info('Calling deferred actions for ?', this._clientId);
            this.setDeferredStatus('succeeded');
            this.setDeferredStatus('unknown');

            if (this._connectRequest) return;
            this._connectRequest = true;

            this.info('Initiating connection for ?', this._clientId);

            this._send({
                channel:        Faye.Channel.CONNECT,
                clientId:       this._clientId,
                connectionType: this._transport.connectionType

            }, this._cycleConnection, this);
        },

        // Request                              Response
        // MUST include:  * channel             MUST include:  * channel
        //                * clientId                           * successful
        // MAY include:   * ext                                * clientId
        //                * id                  MAY include:   * error
        //                                                     * ext
        //                                                     * id
        disconnect: function() {
            if (this._state !== this.CONNECTED) return;
            this._state = this.DISCONNECTED;

            this.info('Disconnecting ?', this._clientId);

            this._send({
                channel:  Faye.Channel.DISCONNECT,
                clientId: this._clientId

            }, function(response) {
                if (!response.successful) return;
                this._transport.close();
                delete this._transport;
            }, this);

            this.info('Clearing channel listeners for ?', this._clientId);
            this._channels = new Faye.Channel.Set();
        },

        // Request                              Response
        // MUST include:  * channel             MUST include:  * channel
        //                * clientId                           * successful
        //                * subscription                       * clientId
        // MAY include:   * ext                                * subscription
        //                * id                  MAY include:   * error
        //                                                     * advice
        //                                                     * ext
        //                                                     * id
        //                                                     * timestamp
        subscribe: function(channel, callback, context) {
            if (channel instanceof Array)
                return Faye.map(channel, function(c) {
                    return this.subscribe(c, callback, context);
                }, this);

            var subscription = new Faye.Subscription(this, channel, callback, context),
                force        = (callback === true),
                hasSubscribe = this._channels.hasSubscription(channel);

            if (hasSubscribe && !force) {
                this._channels.subscribe([channel], callback, context);
                subscription.setDeferredStatus('succeeded');
                return subscription;
            }

            this.connect(function() {
                this.info('Client ? attempting to subscribe to ?', this._clientId, channel);
                if (!force) this._channels.subscribe([channel], callback, context);

                this._send({
                    channel:      Faye.Channel.SUBSCRIBE,
                    clientId:     this._clientId,
                    subscription: channel

                }, function(response) {
                    if (!response.successful) {
                        subscription.setDeferredStatus('failed', Faye.Error.parse(response.error));
                        return this._channels.unsubscribe(channel, callback, context);
                    }

                    var channels = [].concat(response.subscription);
                    this.info('Subscription acknowledged for ? to ?', this._clientId, channels);
                    subscription.setDeferredStatus('succeeded');
                }, this);
            }, this);

            return subscription;
        },

        // Request                              Response
        // MUST include:  * channel             MUST include:  * channel
        //                * clientId                           * successful
        //                * subscription                       * clientId
        // MAY include:   * ext                                * subscription
        //                * id                  MAY include:   * error
        //                                                     * advice
        //                                                     * ext
        //                                                     * id
        //                                                     * timestamp
        unsubscribe: function(channel, callback, context) {
            if (channel instanceof Array)
                return Faye.map(channel, function(c) {
                    return this.unsubscribe(c, callback, context);
                }, this);

            var dead = this._channels.unsubscribe(channel, callback, context);
            if (!dead) return;

            this.connect(function() {
                this.info('Client ? attempting to unsubscribe from ?', this._clientId, channel);

                this._send({
                    channel:      Faye.Channel.UNSUBSCRIBE,
                    clientId:     this._clientId,
                    subscription: channel

                }, function(response) {
                    if (!response.successful) return;

                    var channels = [].concat(response.subscription);
                    this.info('Unsubscription acknowledged for ? from ?', this._clientId, channels);
                }, this);
            }, this);
        },

        // Request                              Response
        // MUST include:  * channel             MUST include:  * channel
        //                * data                               * successful
        // MAY include:   * clientId            MAY include:   * id
        //                * id                                 * error
        //                * ext                                * ext
        publish: function(channel, data) {
            var publication = new Faye.Publication();

            this.connect(function() {
                this.info('Client ? queueing published message to ?: ?', this._clientId, channel, data);

                this._send({
                    channel:  channel,
                    data:     data,
                    clientId: this._clientId

                }, function(response) {
                    if (response.successful)
                        publication.setDeferredStatus('succeeded');
                    else
                        publication.setDeferredStatus('failed', Faye.Error.parse(response.error));
                }, this);
            }, this);

            return publication;
        },

        receiveMessage: function(message) {
            var id = message.id, timeout, callback;

            if (message.successful !== undefined) {
                callback = this._responseCallbacks[id];
                delete this._responseCallbacks[id];
            }

            this.pipeThroughExtensions('incoming', message, null, function(message) {
                if (!message) return;

                if (message.advice) this._handleAdvice(message.advice);
                this._deliverMessage(message);

                if (callback) callback[0].call(callback[1], message);
            }, this);

            if (this._transportUp === true) return;
            this._transportUp = true;
            this.trigger('transport:up');
        },

        messageError: function(messages, immediate) {
            var retry = this._retry,
                self  = this,
                id, message, timeout;

            for (var i = 0, n = messages.length; i < n; i++) {
                message = messages[i];
                id      = message.id;

                if (immediate)
                    this._transportSend(message);
                else
                    Faye.ENV.setTimeout(function() { self._transportSend(message) }, retry * 1000);
            }

            if (immediate || this._transportUp === false) return;
            this._transportUp = false;
            this.trigger('transport:down');
        },

        _selectTransport: function(transportTypes) {
            Faye.Transport.get(this, transportTypes, this._disabled, function(transport) {
                this.debug('Selected ? transport for ?', transport.connectionType, Faye.URI.stringify(transport.endpoint));

                if (transport === this._transport) return;
                if (this._transport) this._transport.close();

                this._transport = transport;
            }, this);
        },

        _send: function(message, callback, context) {
            if (!this._transport) return;
            message.id = message.id || this._generateMessageId();

            this.pipeThroughExtensions('outgoing', message, null, function(message) {
                if (!message) return;
                if (callback) this._responseCallbacks[message.id] = [callback, context];
                this._transportSend(message);
            }, this);
        },

        _transportSend: function(message) {
            if (!this._transport) return;

            var timeout  = 1.2 * (this._advice.timeout || this._retry * 1000),
                envelope = new Faye.Envelope(message, timeout);

            envelope.errback(function(immediate) {
                this.messageError([message], immediate);
            }, this);

            this._transport.send(envelope);
        },

        _generateMessageId: function() {
            this._messageId += 1;
            if (this._messageId >= Math.pow(2,32)) this._messageId = 0;
            return this._messageId.toString(36);
        },

        _handleAdvice: function(advice) {
            Faye.extend(this._advice, advice);

            if (this._advice.reconnect === this.HANDSHAKE && this._state !== this.DISCONNECTED) {
                this._state    = this.UNCONNECTED;
                this._clientId = null;
                this._cycleConnection();
            }
        },

        _deliverMessage: function(message) {
            if (!message.channel || message.data === undefined) return;
            this.info('Client ? calling listeners for ? with ?', this._clientId, message.channel, message.data);
            this._channels.distributeMessage(message);
        },

        _cycleConnection: function() {
            if (this._connectRequest) {
                this._connectRequest = null;
                this.info('Closed connection for ?', this._clientId);
            }
            var self = this;
            Faye.ENV.setTimeout(function() { self.connect() }, this._advice.interval);
        }
    });

    Faye.extend(Faye.Client.prototype, Faye.Deferrable);
    Faye.extend(Faye.Client.prototype, Faye.Publisher);
    Faye.extend(Faye.Client.prototype, Faye.Logging);
    Faye.extend(Faye.Client.prototype, Faye.Extensible);

    Faye.Transport = Faye.extend(Faye.Class({
        MAX_DELAY: 0,
        batching:  true,

        initialize: function(client, endpoint) {
            this._client  = client;
            this.endpoint = endpoint;
            this._outbox  = [];
        },

        close: function() {},

        encode: function(envelopes) {
            return '';
        },

        send: function(envelope) {
            var message = envelope.message;

            this.debug('Client ? sending message to ?: ?',
                this._client._clientId, Faye.URI.stringify(this.endpoint), message);

            if (!this.batching) return this.request([envelope]);

            this._outbox.push(envelope);

            if (message.channel === Faye.Channel.HANDSHAKE)
                return this.addTimeout('publish', 0.01, this.flush, this);

            if (message.channel === Faye.Channel.CONNECT)
                this._connectMessage = message;

            this.flushLargeBatch();
            this.addTimeout('publish', this.MAX_DELAY, this.flush, this);
        },

        flush: function() {
            this.removeTimeout('publish');

            if (this._outbox.length > 1 && this._connectMessage)
                this._connectMessage.advice = {timeout: 0};

            this.request(this._outbox);

            this._connectMessage = null;
            this._outbox = [];
        },

        flushLargeBatch: function() {
            var string = this.encode(this._outbox);
            if (string.length < this._client.maxRequestSize) return;
            var last = this._outbox.pop();
            this.flush();
            if (last) this._outbox.push(last);
        },

        receive: function(envelopes, responses) {
            var n = envelopes.length;
            while (n--) envelopes[n].setDeferredStatus('succeeded');

            responses = [].concat(responses);

            this.debug('Client ? received from ?: ?',
                this._client._clientId, Faye.URI.stringify(this.endpoint), responses);

            for (var i = 0, n = responses.length; i < n; i++)
                this._client.receiveMessage(responses[i]);
        },

        handleError: function(envelopes, immediate) {
            var n = envelopes.length;
            while (n--) envelopes[n].setDeferredStatus('failed', immediate);
        },

        _getCookies: function() {
            var cookies = this._client.cookies;
            if (!cookies) return '';

            return cookies.getCookies({
                domain: this.endpoint.hostname,
                path:   this.endpoint.path,
                secure: this.endpoint.protocol === 'https:'
            }).toValueString();
        },

        _storeCookies: function(setCookie) {
            if (!setCookie || !this._client.cookies) return;
            setCookie = [].concat(setCookie);
            var cookie;

            for (var i = 0, n = setCookie.length; i < n; i++) {
                cookie = this._client.cookies.setCookie(setCookie[i]);
                cookie = cookie[0] || cookie;
                cookie.domain = cookie.domain || this.endpoint.hostname;
            }
        }

    }), {
        get: function(client, allowed, disabled, callback, context) {
            var endpoint = client.endpoint;

            Faye.asyncEach(this._transports, function(pair, resume) {
                var connType     = pair[0], klass = pair[1],
                    connEndpoint = client.endpoints[connType] || endpoint;

                if (Faye.indexOf(disabled, connType) >= 0)
                    return resume();

                if (Faye.indexOf(allowed, connType) < 0) {
                    klass.isUsable(client, connEndpoint, function() {});
                    return resume();
                }

                klass.isUsable(client, connEndpoint, function(isUsable) {
                    if (!isUsable) return resume();
                    var transport = klass.hasOwnProperty('create') ? klass.create(client, connEndpoint) : new klass(client, connEndpoint);
                    callback.call(context, transport);
                });
            }, function() {
                throw new Error('Could not find a usable connection type for ' + Faye.URI.stringify(endpoint));
            });
        },

        register: function(type, klass) {
            this._transports.push([type, klass]);
            klass.prototype.connectionType = type;
        },

        _transports: []
    });

    Faye.extend(Faye.Transport.prototype, Faye.Logging);
    Faye.extend(Faye.Transport.prototype, Faye.Timeouts);

    Faye.Event = {
        _registry: [],

        on: function(element, eventName, callback, context) {
            var wrapped = function() { callback.call(context) };

            if (element.addEventListener)
                element.addEventListener(eventName, wrapped, false);
            else
                element.attachEvent('on' + eventName, wrapped);

            this._registry.push({
                _element:   element,
                _type:      eventName,
                _callback:  callback,
                _context:     context,
                _handler:   wrapped
            });
        },

        detach: function(element, eventName, callback, context) {
            var i = this._registry.length, register;
            while (i--) {
                register = this._registry[i];

                if ((element    && element    !== register._element)   ||
                    (eventName  && eventName  !== register._type)      ||
                    (callback   && callback   !== register._callback)  ||
                    (context      && context      !== register._context))
                    continue;

                if (register._element.removeEventListener)
                    register._element.removeEventListener(register._type, register._handler, false);
                else
                    register._element.detachEvent('on' + register._type, register._handler);

                this._registry.splice(i,1);
                register = null;
            }
        }
    };

    if (Faye.ENV.onunload !== undefined) Faye.Event.on(Faye.ENV, 'unload', Faye.Event.detach, Faye.Event);

    /*
     json2.js
     2013-05-26

     Public Domain.

     NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

     See http://www.JSON.org/js.html


     This code should be minified before deployment.
     See http://javascript.crockford.com/jsmin.html

     USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
     NOT CONTROL.


     This file creates a global JSON object containing two methods: stringify
     and parse.

     JSON.stringify(value, replacer, space)
     value       any JavaScript value, usually an object or array.

     replacer    an optional parameter that determines how object
     values are stringified for objects. It can be a
     function or an array of strings.

     space       an optional parameter that specifies the indentation
     of nested structures. If it is omitted, the text will
     be packed without extra whitespace. If it is a number,
     it will specify the number of spaces to indent at each
     level. If it is a string (such as '\t' or '&nbsp;'),
     it contains the characters used to indent at each level.

     This method produces a JSON text from a JavaScript value.

     When an object value is found, if the object contains a toJSON
     method, its toJSON method will be called and the result will be
     stringified. A toJSON method does not serialize: it returns the
     value represented by the name/value pair that should be serialized,
     or undefined if nothing should be serialized. The toJSON method
     will be passed the key associated with the value, and this will be
     bound to the value

     For example, this would serialize Dates as ISO strings.

     Date.prototype.toJSON = function (key) {
     function f(n) {
     // Format integers to have at least two digits.
     return n < 10 ? '0' + n : n;
     }

     return this.getUTCFullYear()   + '-' +
     f(this.getUTCMonth() + 1) + '-' +
     f(this.getUTCDate())      + 'T' +
     f(this.getUTCHours())     + ':' +
     f(this.getUTCMinutes())   + ':' +
     f(this.getUTCSeconds())   + 'Z';
     };

     You can provide an optional replacer method. It will be passed the
     key and value of each member, with this bound to the containing
     object. The value that is returned from your method will be
     serialized. If your method returns undefined, then the member will
     be excluded from the serialization.

     If the replacer parameter is an array of strings, then it will be
     used to select the members to be serialized. It filters the results
     such that only members with keys listed in the replacer array are
     stringified.

     Values that do not have JSON representations, such as undefined or
     functions, will not be serialized. Such values in objects will be
     dropped; in arrays they will be replaced with null. You can use
     a replacer function to replace those with JSON values.
     JSON.stringify(undefined) returns undefined.

     The optional space parameter produces a stringification of the
     value that is filled with line breaks and indentation to make it
     easier to read.

     If the space parameter is a non-empty string, then that string will
     be used for indentation. If the space parameter is a number, then
     the indentation will be that many spaces.

     Example:

     text = JSON.stringify(['e', {pluribus: 'unum'}]);
     // text is '["e",{"pluribus":"unum"}]'


     text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
     // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

     text = JSON.stringify([new Date()], function (key, value) {
     return this[key] instanceof Date ?
     'Date(' + this[key] + ')' : value;
     });
     // text is '["Date(---current time---)"]'


     JSON.parse(text, reviver)
     This method parses a JSON text to produce an object or array.
     It can throw a SyntaxError exception.

     The optional reviver parameter is a function that can filter and
     transform the results. It receives each of the keys and values,
     and its return value is used instead of the original value.
     If it returns what it received, then the structure is not modified.
     If it returns undefined then the member is deleted.

     Example:

     // Parse the text. Values that look like ISO date strings will
     // be converted to Date objects.

     myData = JSON.parse(text, function (key, value) {
     var a;
     if (typeof value === 'string') {
     a =
     /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
     if (a) {
     return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
     +a[5], +a[6]));
     }
     }
     return value;
     });

     myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
     var d;
     if (typeof value === 'string' &&
     value.slice(0, 5) === 'Date(' &&
     value.slice(-1) === ')') {
     d = new Date(value.slice(5, -1));
     if (d) {
     return d;
     }
     }
     return value;
     });


     This is a reference implementation. You are free to copy, modify, or
     redistribute.
     */

    /*jslint evil: true, regexp: true */

    /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
     call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
     getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
     lastIndex, length, parse, prototype, push, replace, slice, stringify,
     test, toJSON, toString, valueOf
     */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

    if (typeof JSON !== 'object') {
        JSON = {};
    }

    (function () {
        'use strict';

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function () {

                return isFinite(this.valueOf())
                    ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                    : null;
            };

            String.prototype.toJSON      =
                Number.prototype.toJSON  =
                    Boolean.prototype.toJSON = function () {
                        return this.valueOf();
                    };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }


        function str(key, holder) {

// Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

// What happens next depends on the value's type.

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                    return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

                case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                    if (!value) {
                        return 'null';
                    }

// Make an array to hold the partial results of stringifying this object value.

                    gap += indent;
                    partial = [];

// Is the value an array?

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                        v = partial.length === 0
                            ? '[]'
                            : gap
                            ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

// If the replacer is an array, use it to select the members to be stringified.

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof rep[i] === 'string') {
                                k = rep[i];
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

// Otherwise, iterate through all of the keys in the object.

                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                    v = partial.length === 0
                        ? '{}'
                        : gap
                        ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

// If the JSON object does not yet have a stringify method, give it one.

        Faye.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };

        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = Faye.stringify;
        }

// If the JSON object does not yet have a parse method, give it one.

        if (typeof JSON.parse !== 'function') {
            JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function'
                        ? walk({'': j}, '')
                        : j;
                }

// If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            };
        }
    }());

    Faye.Transport.WebSocket = Faye.extend(Faye.Class(Faye.Transport, {
        UNCONNECTED:  1,
        CONNECTING:   2,
        CONNECTED:    3,

        batching:     false,

        isUsable: function(callback, context) {
            this.callback(function() { callback.call(context, true) });
            this.errback(function() { callback.call(context, false) });
            this.connect();
        },

        request: function(envelopes) {
            this._pending = this._pending || new Faye.Set();
            for (var i = 0, n = envelopes.length; i < n; i++) this._pending.add(envelopes[i]);

            this.callback(function(socket) {
                if (!socket) return;
                var messages = Faye.map(envelopes, function(e) { return e.message });
                socket.send(Faye.toJSON(messages));
            }, this);
            this.connect();
        },

        connect: function() {
            if (Faye.Transport.WebSocket._unloaded) return;

            this._state = this._state || this.UNCONNECTED;
            if (this._state !== this.UNCONNECTED) return;
            this._state = this.CONNECTING;

            var socket = this._createSocket();
            if (!socket) return this.setDeferredStatus('failed');

            var self = this;

            socket.onopen = function() {
                if (socket.headers) self._storeCookies(socket.headers['set-cookie']);
                self._socket = socket;
                self._state = self.CONNECTED;
                self._everConnected = true;
                self._ping();
                self.setDeferredStatus('succeeded', socket);
            };

            var closed = false;
            socket.onclose = socket.onerror = function() {
                if (closed) return;
                closed = true;

                var wasConnected = (self._state === self.CONNECTED);
                socket.onopen = socket.onclose = socket.onerror = socket.onmessage = null;

                delete self._socket;
                self._state = self.UNCONNECTED;
                self.removeTimeout('ping');
                self.setDeferredStatus('unknown');

                var pending = self._pending ? self._pending.toArray() : [];
                delete self._pending;

                if (wasConnected) {
                    self.handleError(pending, true);
                } else if (self._everConnected) {
                    self.handleError(pending);
                } else {
                    self.setDeferredStatus('failed');
                }
            };

            socket.onmessage = function(event) {
                var messages  = JSON.parse(event.data),
                    envelopes = [],
                    envelope;

                if (!messages) return;
                messages = [].concat(messages);

                for (var i = 0, n = messages.length; i < n; i++) {
                    if (messages[i].successful === undefined) continue;
                    envelope = self._pending.remove(messages[i]);
                    if (envelope) envelopes.push(envelope);
                }
                self.receive(envelopes, messages);
            };
        },

        close: function() {
            if (!this._socket) return;
            this._socket.close();
        },

        _createSocket: function() {
            var url     = Faye.Transport.WebSocket.getSocketUrl(this.endpoint),
                options = {headers: Faye.copyObject(this._client.headers), ca: this._client.ca};

            options.headers['Cookie'] = this._getCookies();

            if (Faye.WebSocket)        return new Faye.WebSocket.Client(url, [], options);
            if (Faye.ENV.MozWebSocket) return new MozWebSocket(url);
            if (Faye.ENV.WebSocket)    return new WebSocket(url);
        },

        _ping: function() {
            if (!this._socket) return;
            this._socket.send('[]');
            this.addTimeout('ping', this._client._advice.timeout/2000, this._ping, this);
        }

    }), {
        PROTOCOLS: {
            'http:':  'ws:',
            'https:': 'wss:'
        },

        create: function(client, endpoint) {
            var sockets = client.transports.websocket = client.transports.websocket || {};
            sockets[endpoint.href] = sockets[endpoint.href] || new this(client, endpoint);
            return sockets[endpoint.href];
        },

        getSocketUrl: function(endpoint) {
            endpoint = Faye.copyObject(endpoint);
            endpoint.protocol = this.PROTOCOLS[endpoint.protocol];
            return Faye.URI.stringify(endpoint);
        },

        isUsable: function(client, endpoint, callback, context) {
            this.create(client, endpoint).isUsable(callback, context);
        }
    });

    Faye.extend(Faye.Transport.WebSocket.prototype, Faye.Deferrable);
    Faye.Transport.register('websocket', Faye.Transport.WebSocket);

    if (Faye.Event)
        Faye.Event.on(Faye.ENV, 'beforeunload', function() {
            Faye.Transport.WebSocket._unloaded = true;
        });

    Faye.Transport.EventSource = Faye.extend(Faye.Class(Faye.Transport, {
        initialize: function(client, endpoint) {
            Faye.Transport.prototype.initialize.call(this, client, endpoint);
            if (!Faye.ENV.EventSource) return this.setDeferredStatus('failed');

            this._xhr = new Faye.Transport.XHR(client, endpoint);

            endpoint = Faye.copyObject(endpoint);
            endpoint.pathname += '/' + client._clientId;

            var socket = new EventSource(Faye.URI.stringify(endpoint)),
                self   = this;

            socket.onopen = function() {
                self._everConnected = true;
                self.setDeferredStatus('succeeded');
            };

            socket.onerror = function() {
                if (self._everConnected) {
                    self._client.messageError([]);
                } else {
                    self.setDeferredStatus('failed');
                    socket.close();
                }
            };

            socket.onmessage = function(event) {
                self.receive([], JSON.parse(event.data));
            };

            this._socket = socket;
        },

        close: function() {
            if (!this._socket) return;
            this._socket.onopen = this._socket.onerror = this._socket.onmessage = null;
            this._socket.close();
            delete this._socket;
        },

        isUsable: function(callback, context) {
            this.callback(function() { callback.call(context, true) });
            this.errback(function() { callback.call(context, false) });
        },

        encode: function(envelopes) {
            return this._xhr.encode(envelopes);
        },

        request: function(envelopes) {
            this._xhr.request(envelopes);
        }

    }), {
        isUsable: function(client, endpoint, callback, context) {
            var id = client._clientId;
            if (!id) return callback.call(context, false);

            Faye.Transport.XHR.isUsable(client, endpoint, function(usable) {
                if (!usable) return callback.call(context, false);
                this.create(client, endpoint).isUsable(callback, context);
            }, this);
        },

        create: function(client, endpoint) {
            var sockets = client.transports.eventsource = client.transports.eventsource || {},
                id      = client._clientId;

            endpoint = Faye.copyObject(endpoint);
            endpoint.pathname += '/' + (id || '');
            var url = Faye.URI.stringify(endpoint);

            sockets[url] = sockets[url] || new this(client, endpoint);
            return sockets[url];
        }
    });

    Faye.extend(Faye.Transport.EventSource.prototype, Faye.Deferrable);
    Faye.Transport.register('eventsource', Faye.Transport.EventSource);

    Faye.Transport.XHR = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(envelopes) {
            var messages = Faye.map(envelopes, function(e) { return e.message });
            return Faye.toJSON(messages);
        },

        request: function(envelopes) {
            var path = this.endpoint.path,
                xhr  = Faye.ENV.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest(),
                self = this;

            xhr.open('POST', path, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Pragma', 'no-cache');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            var headers = this._client.headers;
            for (var key in headers) {
                if (!headers.hasOwnProperty(key)) continue;
                xhr.setRequestHeader(key, headers[key]);
            }

            var abort = function() { xhr.abort() };
            Faye.Event.on(Faye.ENV, 'beforeunload', abort);

            xhr.onreadystatechange = function() {
                if (!xhr || xhr.readyState !== 4) return;

                var parsedMessage = null,
                    status        = xhr.status,
                    text          = xhr.responseText,
                    successful    = (status >= 200 && status < 300) || status === 304 || status === 1223;

                Faye.Event.detach(Faye.ENV, 'beforeunload', abort);
                xhr.onreadystatechange = function() {};
                xhr = null;

                if (!successful) return self.handleError(envelopes);

                try {
                    parsedMessage = JSON.parse(text);
                } catch (e) {}

                if (parsedMessage)
                    self.receive(envelopes, parsedMessage);
                else
                    self.handleError(envelopes);
            };

            xhr.send(this.encode(envelopes));
        }
    }), {
        isUsable: function(client, endpoint, callback, context) {
            callback.call(context, Faye.URI.isSameOrigin(endpoint));
        }
    });

    Faye.Transport.register('long-polling', Faye.Transport.XHR);

    Faye.Transport.CORS = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(envelopes) {
            var messages = Faye.map(envelopes, function(e) { return e.message });
            return 'message=' + encodeURIComponent(Faye.toJSON(messages));
        },

        request: function(envelopes) {
            var xhrClass = Faye.ENV.XDomainRequest ? XDomainRequest : XMLHttpRequest,
                xhr      = new xhrClass(),
                headers  = this._client.headers,
                self     = this,
                key;

            xhr.open('POST', Faye.URI.stringify(this.endpoint), true);

            if (xhr.setRequestHeader) {
                xhr.setRequestHeader('Pragma', 'no-cache');
                for (key in headers) {
                    if (!headers.hasOwnProperty(key)) continue;
                    xhr.setRequestHeader(key, headers[key]);
                }
            }

            var cleanUp = function() {
                if (!xhr) return false;
                xhr.onload = xhr.onerror = xhr.ontimeout = xhr.onprogress = null;
                xhr = null;
            };

            xhr.onload = function() {
                var parsedMessage = null;
                try {
                    parsedMessage = JSON.parse(xhr.responseText);
                } catch (e) {}

                cleanUp();

                if (parsedMessage)
                    self.receive(envelopes, parsedMessage);
                else
                    self.handleError(envelopes);
            };

            xhr.onerror = xhr.ontimeout = function() {
                cleanUp();
                self.handleError(envelopes);
            };

            xhr.onprogress = function() {};
            xhr.send(this.encode(envelopes));
        }
    }), {
        isUsable: function(client, endpoint, callback, context) {
            if (Faye.URI.isSameOrigin(endpoint))
                return callback.call(context, false);

            if (Faye.ENV.XDomainRequest)
                return callback.call(context, endpoint.protocol === Faye.ENV.location.protocol);

            if (Faye.ENV.XMLHttpRequest) {
                var xhr = new Faye.ENV.XMLHttpRequest();
                return callback.call(context, xhr.withCredentials !== undefined);
            }
            return callback.call(context, false);
        }
    });

    Faye.Transport.register('cross-origin-long-polling', Faye.Transport.CORS);

    Faye.Transport.JSONP = Faye.extend(Faye.Class(Faye.Transport, {
        encode: function(envelopes) {
            var messages = Faye.map(envelopes, function(e) { return e.message });
            var url = Faye.copyObject(this.endpoint);
            url.query.message = Faye.toJSON(messages);
            url.query.jsonp   = '__jsonp' + Faye.Transport.JSONP._cbCount + '__';
            return Faye.URI.stringify(url);
        },

        request: function(envelopes) {
            var messages     = Faye.map(envelopes, function(e) { return e.message }),
                head         = document.getElementsByTagName('head')[0],
                script       = document.createElement('script'),
                callbackName = Faye.Transport.JSONP.getCallbackName(),
                endpoint     = Faye.copyObject(this.endpoint),
                self         = this;

            endpoint.query.message = Faye.toJSON(messages);
            endpoint.query.jsonp   = callbackName;

            Faye.ENV[callbackName] = function(data) {
                if (!Faye.ENV[callbackName]) return false;
                Faye.ENV[callbackName] = undefined;
                try { delete Faye.ENV[callbackName] } catch (e) {}
                script.parentNode.removeChild(script);
                self.receive(envelopes, data);
            };

            script.type = 'text/javascript';
            script.src  = Faye.URI.stringify(endpoint);
            head.appendChild(script);
        }
    }), {
        _cbCount: 0,

        getCallbackName: function() {
            this._cbCount += 1;
            return '__jsonp' + this._cbCount + '__';
        },

        isUsable: function(client, endpoint, callback, context) {
            callback.call(context, true);
        }
    });

    Faye.Transport.register('callback-polling', Faye.Transport.JSONP);
    return Faye;

})();
/**
 * MM is the primary interface to all MindMeld JavaScript SDK functionality. Call {@link MM#init} before anything
 * else. Next obtain a token via {@link MM#getToken} to start making API calls.
 *
 * @namespace
 */
var MM = ( function ($, Faye) {

    var MM = window.MM || {};

    /**
     * MindMeld SDK Version
     *
     * @type {string}
     * @static
     * @private
     */
    Object.defineProperty(MM, 'version', {
        value: '2.3.5',
        writable: false
    });

    /**
     *
     * MindMeld configuration settings
     *
     * @type {object}
     * @property {string}   cleanUrl - URL for MindMeld API
     * @property {string}   fayeClientUrl - URL for MindMeld API Push Server
     * @property {string}   appid - Developer's MindMeld application id
     * @property {function} onInit - Callback called when SDK is initialized
     * @private
     */
    MM.config = {
        cleanUrl: 'https://mindmeldv2.expectlabs.com/',
        fayeClientUrl: 'https://push-west-prod-a.expectlabs.com:443/faye'
    };

    /**
     * Internal functions used by MindMeld SDK
     *
     * @memberOf MM
     * @namespace
     * @private
     */
    MM.Internal = $.extend({}, {

        /**
         * Perform any initialization here that can be done before the DOM loads.
         *
         * @memberOf MM.Internal
         */
        setup: function () {
            MM.activeSessionId = null;
            MM.activeUserId = null;
        },

        /**
         * Perform any initialization here that should be done after the DOM loads.
         *
         * @memberOf MM.Internal
         */
        onReady: function () {
            MM.Internal.initializeModels();

            // Initializes push event handler with faye server URL
            MM.Internal.EventHandler.init(MM.config.fayeClientUrl);

            // Call the onInit handler.
            MM.Util.testAndCall(MM.config.onInit);
        },

        /**
         * Initialize app, user, and session models
         *
         * @memberOf MM.Internal
         */
        initializeModels: function () {
            // App Model
            $.extend(MM, new MM.models.App());
            MM.documents = new MM.models.AppDocumentList();

            // User Models
            MM.activeUser = new MM.models.ActiveUser();
            MM.activeUser.sessions = new MM.models.SessionList();

            // Session Models
            MM.activeSession = new MM.models.ActiveSession();
            MM.activeSession.textentries = new MM.models.TextEntryList();
            MM.activeSession.entities = new MM.models.EntityList();
            MM.activeSession.articles = new MM.models.ArticleList();
            MM.activeSession.documents = new MM.models.SessionDocumentList();
            MM.activeSession.activities = new MM.models.ActivityList();
            MM.activeSession.liveusers = new MM.models.LiveUserList();
            MM.activeSession.invitedusers = new MM.models.InvitedUserList();
        },

        /**
         * Clears active user data from local storage
         *
         * @memberOf MM.Internal
         */
        clearUserData: function () {
            MM.activeUser.clearAllData();
            MM.activeUser.sessions.clearAllData();
        },

        /**
         * Clears active session data
         *
         * @memberOf MM.Internal
         */
        clearSessionData: function () {
            MM.activeSession.clearAllData();
            MM.activeSession.textentries.clearAllData();
            MM.activeSession.entities.clearAllData();
            MM.activeSession.articles.clearAllData();
            MM.activeSession.documents.clearAllData();
            MM.activeSession.activities.clearAllData();
            MM.activeSession.liveusers.clearAllData();
            MM.activeSession.invitedusers.clearAllData();
        },

        /**
         * This method overrides the methods and properties of a given class with the
         * methods and properties specified in the overrides object.
         *
         * @memberOf MM.Internal
         */
        override: function (origclass, overrides) {
            $.extend(origclass.prototype, overrides);
        },

        /**
         * Factory to create new object with the properties and methods specified in the
         * overrides object that inherits from the superclass object.
         *
         * @memberOf MM.Internal
         * @param {Object} superclass
         * @param {Object} overrides
         */
        createSubclass: function (superclass, overrides) {
            var objectConstructor = Object.prototype.constructor;
            var subclass = overrides.constructor;
            var F = function () {
                },
                subclassProto,
                superclassProto = superclass.prototype;
            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;
            if (superclassProto.constructor == objectConstructor) {
                superclassProto.constructor = superclass;
            }
            subclassProto.superclass = subclassProto.supr = (function () {
                return superclassProto;
            });
            subclassProto.proto = subclassProto;
            MM.Internal.override(subclass, overrides);
            return subclass;
        },

        /**
         * Utility method to print a log message.
         *
         * @memberOf MM.Internal
         * @param {string} msg message to log to console
         */
        log: function (msg) {
            window.console && window.console.log(msg);
        },

        /**
         * Event handler service initializes connection with Faye push server, initiates and maintains
         * subscriptions to various channels, and registers/dispatches both default and user-defined events
         *
         * @memberOf MM.Internal
         * @namespace
         * @private
         */
        EventHandler: {

            /**
             * Reference to faye client instance
             *
             * @type {Faye}
             * @memberOf MM.Internal.EventHandler
             */
            fayeClient: null,

            // Dictionary mapping app|user|session channels to Faye channel object
            /**
             * @description Dictionary mapping app|user|session channels to Faye channel object
             * @type {Object.<string, Faye>}
             * @memberOf MM.Internal.EventHandler
             */
            fayeSubscriptions: {},

            /**
             * Dictionary for single event on specific channel
             *
             * @example
             * namedEventHandlers = {
                '/:appid/session/:sessionid': {
                    'textentriesUpdate': (FN onAnySessionEvent)
                 }
             }
             * @memberOf MM.Internal.EventHandler
             */
            namedEventHandlers: {},

            /**
             * Dictionary for event handlers for all events on an app channel
             *
             * @example
             * appChannelHandlers = {
                    '/:appid/:appid': (FN onAnyAppEvent)
                }
             */
            appChannelHandlers: {},

            /**
             * @description Dictionary for event handlers for all events on a user channel
             * @example
             * userChannelHandlers = {
                    '/:appid/user/:userid': (FN onAnyUserEvent)
                }
             */
            userChannelHandlers: {},

            /**
             * Dictionary for event handlers for all events on a session channel
             *
             * @example
             * sessionChannelHandlers = {
                    '/:appid/session/:sessionid': (FN onAnySessionEvent)
                }
             */
            sessionChannelHandlers: {},

            /**
             * Initializes connection with Faye server
             *
             * @param {string} url url of MindMeld push API server
             */
            init: function (url) {
                this.fayeClient = new Faye.Client(url, {
                    'timeout': 120
                });

                var clientAuth = {
                    outgoing: function(message, callback) {
                        if (message.channel !== '/meta/subscribe')
                            return callback(message);
                        if (!message.ext) message.ext = {};
                        message.ext.authToken = MM.token;
                        callback(message);

                    }
                };

                this.fayeClient.addExtension(clientAuth);
            },

            /**
             * Object specifying channel type and channel string
             *
             * @typedef {Object} ChannelConfig
             * @property {string} type type of channel (e.g., app, user, or session)
             * @property {string} channel full channel string (e.g., '/:appid/user/:userid')
             */

            /**
             * Event configuration object containing an event channel, handler, and event name
             *
             * @typedef     {Object}    EventConfig
             * @property    {string}    name    name of the event
             * @property    {function}  handler event handler
             * @property    {ChannelConfig}    channelConfig object specifying channel type and channel string
             */

            /**
             * Given an event config object, which contains event channel, event handler, and either a subscribeAll flag
             * or a specific event name, registers for either the given event or all the events on the channel
             *
             * @param {EventConfig} updateEventConfig config object specifying how which event to subscribe to
             * @param {function} onSuccess called when successfully subscribed to event
             * @param {function} onError called when there was an error subscribing to an event
             */
            subscribe: function (updateEventConfig, onSuccess, onError) {
                var self = MM.Internal.EventHandler;
                var channel = updateEventConfig.channelConfig.channel;
                var channelType = updateEventConfig.channelConfig.type;
                var channelSubscriptionExists = true;

                // Start new faye subscription if none exists
                if (this.fayeSubscriptions[channel] === undefined) {
                    channelSubscriptionExists = false;
                    var channelHandler = function (event) {

                        if (self.namedEventHandlers[channel] !== undefined) {
                            MM.Util.testAndCall(self.namedEventHandlers[channel][event.event], event.payload);
                        }
                        switch (channelType) {
                            case 'app':
                                MM.Util.testAndCall(self.appChannelHandlers[channel], event);
                                break;

                            case 'session':
                                MM.Util.testAndCall(self.sessionChannelHandlers[channel], event);
                                break;

                            case 'user':
                                MM.Util.testAndCall(self.userChannelHandlers[channel], event);
                                break;
                        }
                    };
                    // subscribe to channel
                    var channelSubscription = self.fayeClient.subscribe(channel, channelHandler);
                    self.fayeSubscriptions[channel] = channelSubscription;
                    channelSubscription.then(
                        function () {
                            if (MM.config.debug){
                                MM.Internal.log("SUCCESSFULLY CONNECTED TO CHANNEL: " + updateEventConfig.channel);
                            }
                            MM.Util.testAndCall(onSuccess);
                        },
                        function (error) {
                            MM.Internal.log("COULD NOT CONNECT TO CHANNEL: " + updateEventConfig.channel + '. Error: ' + error.message);
                            MM.Util.testAndCall(onError, error);
                        }
                    );
                }

                // Call onSuccess callback if we already have a valid subscription to the channel
                if (channelSubscriptionExists) {
                    MM.Util.testAndCall(onSuccess, channel);
                }

                var handler = updateEventConfig.handler;
                if (updateEventConfig.subscribeAll) {
                    switch (channelType) {
                        case 'app':
                            self.appChannelHandlers[channel] = handler;
                            break;

                        case 'session':
                            self.sessionChannelHandlers[channel] = handler;
                            break;

                        case 'user':
                            self.userChannelHandlers[channel] = handler;
                            break;
                    }
                }
                else {
                    if (self.namedEventHandlers[channel] === undefined) {
                        self.namedEventHandlers[channel] = {};
                    }
                    self.namedEventHandlers[channel][updateEventConfig.name] = handler;

                }
            },

            /**
             * Unsubscribes from an event. If there are no more handler's for events on the specified Faye channel,
             * unsubscribe from the Faye channel as well
             *
             * @param {EventConfig} updateEventConfig config object specifying how which event to unsubscribe from
             */
            unsubscribe: function (updateEventConfig) {
                var self = MM.Internal.EventHandler;
                var channel = updateEventConfig.channelConfig.channel;
                var channelType = updateEventConfig.channelConfig.type;
                if (updateEventConfig.subscribeAll) {
                    switch (channelType) {
                        case 'app':
                            delete self.appChannelHandlers[channel];
                            break;

                        case 'session':
                            delete self.sessionChannelHandlers[channel];
                            break;

                        case 'user':
                            delete self.userChannelHandlers[channel];
                            break;
                    }
                }
                else {
                    if (this.namedEventHandlers[channel] !== undefined) {
                        delete self.namedEventHandlers[channel][updateEventConfig.name];
                        if ($.isEmptyObject(self.namedEventHandlers[channel])) {
                            delete self.namedEventHandlers[channel];
                        }
                    }
                }

                var shouldCancelSubscription = false;
                var hasNamedEventsOnChannel = self.namedEventHandlers[channel] !== undefined;
                if (! hasNamedEventsOnChannel) {
                    switch (channelType) {
                        case 'app':
                            shouldCancelSubscription = self.appChannelHandlers[channel] === undefined;
                            break;

                        case 'session':
                            shouldCancelSubscription = self.sessionChannelHandlers[channel] === undefined;
                            break;

                        case 'user':
                            shouldCancelSubscription = self.userChannelHandlers[channel] === undefined;
                            break;
                    }
                }

                if (shouldCancelSubscription) {
                    var fayeSubscription = self.fayeSubscriptions[channel];
                    if (fayeSubscription) {
                        fayeSubscription.cancel();
                        delete this.fayeSubscriptions[channel];
                    }
                }
            },

            /**
             * Unsubscribes from all custom events and subscribeAll events on specified channel
             *
             * @param {string} channel full channel string
             * @param {string} channelType channel type (e.g., app, user, session)
             */
            clearAllEventsForChannel: function (channel, channelType) {
                var self = MM.Internal.EventHandler;
                delete self.namedEventHandlers[channel];
                switch (channelType) {
                    case 'app':
                        delete self.appChannelHandlers[channel];
                        break;

                    case 'session':
                        delete self.sessionChannelHandlers[channel];
                        break;

                    case 'user':
                        delete self.userChannelHandlers[channel];
                        break;
                }

                var fayeSubscription = self.fayeSubscriptions[channel];
                if (fayeSubscription) {
                    fayeSubscription.cancel();
                    delete self.fayeSubscriptions[channel];
                }

                if(MM.config.debug) {
                    MM.Internal.log('Cleared all event handlers on ' + channel + ' channel');
                }
            }
        },

        /**
         * Contains common functionality for custom events on all channels. The {@link MM},
         * {@link MM.activeUser}, and {@link MM.activeSession} {@link Model}'s are the only
         * objects that use this mixin
         *
         * @mixin CustomEventHandlers
         */
        customEventHandlers: {
            /**
             * The NamedEventCallBack is used when subscribing to a specific event on a channel, as opposed
             * to subscribing to all events on a channel
             *
             * @callback NamedEventCallBack
             * @param {EventPayload} payload
             */

            /**
             * The AllEventsCallback is used when subscribing to every event on a given channel. The callback
             * takes an 'event' parameter object that contains the event name and the event payload
             *
             * @callback AllEventsCallback
             * @param {Object} eventObject event object received from push server
             * @param {string} eventObject.event    name of the event
             * @param {EventPayload} eventObject.payload    payload from the event
             */

            /**
             * Payload received from MindMeld push server. The payload may be either a string containing
             * a message about the event or a JSON object containing arbitrary data
             *
             * @typedef {(string | Object)} EventPayload
             */


            /**
             * Publish a new custom event
             *
             * @param {string} event event name
             * @param {EventPayload} payload payload for event
             * @instance
             * @memberOf CustomEventHandlers
             */
            _publish: function (event, payload) {
                var eventData = {
                    name: event,
                    payload: payload
                };

                var path = this.path() + '/events';

                this.makeModelRequest('POST', path, eventData);
            },

            /**
             * Uses {@link MM.Internal.EventHandler} to subscribe to a custom event
             *
             * @param eventName {string} name of event to subscribe to
             * @param eventHandler  {NamedEventCallBack} callback for when event is fired
             * @param onSuccess {function} callback for when subscription is successful
             * @param onError   {function} callback for when there is an error subscribing
             * @instance
             * @memberOf CustomEventHandlers
             */
            _subscribe: function (eventName, eventHandler, onSuccess, onError) {
                var eventConfig = {
                    name: eventName,
                    handler: eventHandler,
                    subscribeAll: false
                };
                eventConfig.channelConfig = this.getChannelConfig();

                MM.Internal.EventHandler.subscribe(eventConfig, onSuccess, onError);
            },

            /**
             * Unsubscribe from a named event
             *
             * @param {string} eventName name of event to subscribe from
             * @instance
             * @memberOf CustomEventHandlers
             */
            _unsubscribe: function (eventName) {
                var eventConfig = {
                    name: eventName,
                    subscribeAll: false
                };
                eventConfig.channelConfig = this.getChannelConfig();
                MM.Internal.EventHandler.unsubscribe(eventConfig);
            },

            /**
             * Subscribes to every event on this object's channel
             *
             * @param {AllEventsCallback} eventHandler callback for when an event on this object's channel is fired
             * @param onSuccess {function=} callback for when subscription is successful
             * @param onError   {function=} callback for when there is an error subscribing
             * @instance
             * @memberOf CustomEventHandlers
             */
            _subscribeAll: function (eventHandler, onSuccess, onError) {
                var eventConfig = {
                    subscribeAll: true,
                    handler: eventHandler
                };
                eventConfig.channelConfig = this.getChannelConfig();
                MM.Internal.EventHandler.subscribe(eventConfig, onSuccess, onError);
            },

            /**
             * Unsubscribe from all events on this object's channel
             *
             * @instance
             * @memberOf CustomEventHandlers
             */
            _unsubscribeAll: function () {
                var eventConfig = {
                    subscribeAll: true
                };
                eventConfig.channelConfig = this.getChannelConfig();
                MM.Internal.EventHandler.unsubscribe(eventConfig);
            }
        }
    });


    // Apply the API methods to the MindMeld API object
    $.extend(MM, {

        /**
         *  This method will initialize the MindMeld SDK and must be called before any other
         *  calls to the MM SDK
         *
         * @param {Object} config configuration parameters containing developers' application id and
         *                  onInit callback
         *
         * @param {string} config.appid application id for this MindMeld application
         * @param {function} config.onInit callback for when MindMeld SDK is initialized
         * @memberOf MM
         * @instance
         *
         * @example
         *
         var mindMeldConfig = {
            appid: '<appid>',
            onInit: onMindMeldInit
         };

         function onMindMeldInit () {
            // MindMeld SDK Initialized
         }
         */
        init: function (config) {
            var defaultConfig = MM.config;

            // Allow user to override defaults
            //noinspection JSCheckFunctionSignatures
            MM.config = $.extend({}, defaultConfig, config);

            $(document).ready(function () {
                MM.Internal.onReady();
            });
        },

        /**
         * Requests a new admin or user token from the API and stores it locally. This token is automatically
         * used for all subsequent requests to the API. If we successfully obtain a token, {@link MM#getToken}
         * automatically calls {@link MM#setActiveUserID} with the appropriate user id
         *
         * @param {Object} credentials credentials for obtaining an API token.
         * Please refer to [documentation here](https://developer.expectlabs.com/docs/authentication) for details
         * @param onSuccess {function=} callback for when token obtained successfully
         * @param onError   {function=} callback for when there was an error obtaining token
         * @memberOf MM
         * @instance
         *
         *
         * @example <caption> Example code to get a token </caption>
         *
         var credentials = {...}; // admin credentials, simple user credentials, or user credentials
         MM.getToken(credentials, onGetToken);

         function onGetToken (result) {
            var token = result.token;
         }

         * @example <caption> Example credentials to get an admin token </caption>
         *
         var adminCredentials = {
            appsceret: '<appsecret>'
         };

         * @example <caption> Example credentials to get a simple user token </caption>
         *
         var simpleUserCredentials = {
            appsceret: '<appsecret>',
            simple: {
                userid: 'einstein79',
                name: 'Albert Einstein'
            }
         }

         * @example <caption> Example credentials to get a user token </caption>
         *
         var fbUserId = 'Facebook User Id';
         var fbAuthToken = 'Facebook User Token';
         var userCredentials = {
             facebook: {
                userid: fbUserId,
                token: fbAuthToken
             }
         };
         *
         */
        getToken: function (credentials, onSuccess, onError) {
            var headers = {'X-MindMeld-Appid': MM.config.appid}; // included on every token request
            var isAdminToken = false;
            var params = null;
            if (credentials.facebook || credentials.anonymous) { // User token
                params = {
                    credentials: credentials
                };
                params = JSON.stringify(params);
            }
            else if (credentials.appsecret && credentials.simple) {
                headers['X-MindMeld-Appsecret'] = credentials.appsecret;
                params = {
                    credentials: {'simple': credentials.simple}
                };
                params = JSON.stringify(params);
            }
            else if (credentials.appsecret) { // Admin token
                headers['X-MindMeld-Appsecret'] = credentials.appsecret;
                isAdminToken = true;
            }
            else { // Invalid credentials passed in
                var error = {
                    code: 14,
                    type: 'CredentialsInvalid',
                    message: 'A valid appsecret or either simple or facebook credentials are required.'
                };
                MM.Util.testAndCall(onError, error);
                return;
            }

            MM.callApi('POST', 'tokens', params, onTokenSuccess, onError, headers);

            // Sets MM.token on success
            function onTokenSuccess(response) {
                if (response.data && response.data.token) {
                    MM.token = response.data.token;
                    if (isAdminToken) {
                        // The admin user id is not returned when requesting a new token
                        // It can be found in the app object's 'ownerid' field
                        MM.get( null,
                            function (appResponse) {
                                var adminId = appResponse.data.ownerid;
                                MM.setActiveUserID(adminId);
                                MM.Util.testAndCall(onSuccess, response.data);
                            },
                            function (error) {
                                MM.Util.testAndCall(onError, error);
                            }
                        );
                    }
                    else {
                        // The user id is returned when requesting a new user token
                        if (response.data.user && response.data.user.userid) {
                            MM.setActiveUserID(response.data.user.userid);
                            MM.Util.testAndCall(onSuccess, response.data);
                        }
                    }
                }
                else {
                    MM.Util.testAndCall(onError, response);
                }
            }
        },

        /**
         * Revokes the current API token. Note that subsequent calls to the MindMeld API will not
         * work until a new token is obtained
         *
         * @param onSuccess {function=} callback for when token is successfully revoked
         * @param onError {function=} callback for when there was an error revoking token
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function revokeTokenExample () {
            // First, get a token. In this example, we are getting an admin token
            var credentials = {
                appsecret: '<appsecret>'
            };
            MM.getToken(credentials, onGetToken);
         }
         function onGetToken () {
            // Now that we have a token, try an API request
            MM.get(null, onGetApplicationInfo);
         }
         function onGetApplicationInfo (result) {
            // Request succeeds because we have a token
            var applicationInfo = result.data;
            // Now, let's revoke the token
            MM.revokeToken (onRevokeToken);
         }
         function onRevokeToken () {
            // Now that we have revoked the token, try an API Request
            MM.get(null, onGetApplicationInfo, onGetApplicationError);
         }
         function onGetApplicationError (error) {
            console.log('Call failed. Error code ' + error.code + ': ' + error.message);
            // "Call failed. Error code 8: No token parameter was included in the api request"
         }
         */
        revokeToken: function (onSuccess, onError) {
            MM.callApi('DELETE', 'token/' + MM.token, null, onRevokeTokenSuccess, onError);

            // Clears MM.token on success
            function onRevokeTokenSuccess(response) {
                if (MM.config.debug) MM.Internal.log('SUCCESSFULLY REVOKED TOKEN: ' + MM.token);
                MM.token = '';
                if (response.data) {
                    MM.Util.testAndCall(onSuccess, response);
                }
                else {
                    MM.Util.testAndCall(onError, response);
                }
            }
        },

        /**
         * Sets the active session to a specified session id. {@link MM#setActiveSessionID} also tries to fetch the session
         * object and clears all event handlers from the previous session. You must call setActiveSessionID before calling
         * any of the functions in the {@link MM.activeSession} namespace
         *
         * @param {string} sessionid session id to set active session to
         * @param onSuccess {APISuccessCallback=} callback for when session data was successfully fetched
         * @param onError   {APIErrorCallback=} callback for when there was an error fetching session data
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function testSetActiveSessionID () {
            MM.setActiveSessionID('<session id>');
         }
         */
        setActiveSessionID: function (sessionid, onSuccess, onError) {
            var sessionEventChannel = MM.config.appid + '/session/' + MM.activeSessionId;
            MM.Internal.EventHandler.clearAllEventsForChannel(sessionEventChannel, 'session');
            MM.activeSessionId = sessionid;
            MM.Internal.clearSessionData();
            MM.activeSession.get(null, onSuccess, onError);
        },

        /**
         * Deprecated function for setting active session id. Use {@link MM#setActiveSessionID} instead
         *
         * @memberOf MM
         * @instance
         * @deprecated
         * @private
         */
        setActiveSession: function (sessionid, onSuccess, onError) {
            MM.setActiveSessionID(sessionid, onSuccess, onError);
        },

        /**
         * Sets the active user to a specified user id. {@link MM#setActiveUserID} also tries to fetch the user object
         * and clears all event handlers from the previous user. {@link MM#setActiveUserID} is automatically called
         * after successfully calling {@link MM#getToken}. You should only to call this method if you are using an
         * admin token and want to impersonate other users, or if you call {@link MM#setToken} with an existing token
         * and already know the corresponding user id
         *
         * @param {string} userid
         * @param onSuccess {APISuccessCallback=} callback for when user data successfully fetched
         * @param onError   {APIErrorCallback=} callback for when there was an error fetching user data
         * @memberOf MM
         * @instance
         *
         * @example
         *
         var userToken = '<known user token>';
         MM.setToken(userToken, onTokenValid);

         function onTokenValid () {
            MM.setActiveUserID('<known mindmeld user  id>', onGetUserInfo);
         }
         function onGetUserInfo (response) {
            var userInfo = response.data;
         }
         */
        setActiveUserID: function (userid, onSuccess, onError) {
            var userEventChannel = MM.config.appid + '/user/' + MM.activeUserId;
            MM.Internal.EventHandler.clearAllEventsForChannel(userEventChannel, 'user');
            MM.activeUserId = userid;
            MM.Internal.clearUserData();
            MM.activeUser.get(null, onSuccess, onError);
        },

        /**
         * Deprecated function for setting active user id. Use {@link MM#setActiveUserID} instead
         *
         * @memberOf MM
         * @instance
         * @deprecated
         * @private
         */
        setActiveUser: function (userid, onSuccess, onError) {
            MM.setActiveUserID(userid, onSuccess, onError);
        },

        /**
         * Set the MM token directly instead of calling {@link MM#getToken}. This function also
         * provides valid/invalid callbacks to determine if the given token is valid or not.
         * Regardless of the token being valid, {@link MM#setToken} always sets the token
         * used by MM. Unlike {@link MM#getToken}, {@link MM#setToken} does not automatically
         * call {@link MM#setActiveUserID}
         *
         * @param {string} token token to be used by SDK
         * @param {function=} onTokenValid callback for when given token is valid
         * @param {function=} onTokenInvalid callback for when given token is invalid
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function setToken () {
            MM.setToken('<token>', onTokenValid, onTokenInvalid);
         }
         function onTokenValid () {
            // token is valid
         }
         function onTokenInvalid () {
            // token is invalid
         }
         */
        setToken: function (token, onTokenValid, onTokenInvalid) {
            MM.token = token;
            MM.get(null,
                function onTokenSuccess () {
                    MM.Util.testAndCall(onTokenValid);
                },
                function onTokenError () {
                    MM.Util.testAndCall(onTokenInvalid);
                }
            );
        },

        /**
         * The APISuccessCallback handles successful responses from the API. Every response from the MindMeld API conforms
         * to the same format
         *
         * @callback APISuccessCallback
         * @param {Object} result result object containing response from the API
         * @param {(Object | Array)} result.data data returned from the API. For object endpoints (e.g., "/user/:userid"), data is an Object,
         * but for collection endpoints (e.g., "/documents"), data is an Array of Objects
         * @param {Object} result.request contains information about the request made
         * @param {string} result.timestamp timestamp of the request
         * @param {number} result.responsetime amount of time the API call took in seconds
         * @param {string} result.etag  ETag for request. Please refer to our [documentation here](https://developer.expectlabs.com/docs/sendingRequest) for more information on ETags
         */

        /**
         * The APIErrorCallback handles unsuccessful response from the API. Every error response from the api conforms
         * to the same format
         *
         * @callback APIErrorCallback
         * @param {Object} error error object containing information about an API Error
         * @param {number} error.code API error code
         * @param {string} error.message API error message
         * @param {string} error.type API error type
         */

        /**
         * A QueryParameter Object has one or more fields that allow you to narrow down the list of
         * items returned from a collection. A QueryParameter object looks like the following:
         *
         * @example
         * var queryParams = {
         *      query: "san francisco", // return items that match the string 'san francisco'
         *      start: 4,   // return items starting at the 4th index
         *      limit: 10,  // limit the number of returned items to 10
         *      since: "last Monday",   // return items created since last Monday
         *      until: "yesterday"     // return items that were crated before yesterday
         * }
         *
         * @typedef {Object} QueryParameters
         * @property {string=} query search query string to retrieve specific objects that match the query. See the
         * documentation on [search query syntax](https://developer.expectlabs.com/docs/searchQuerySyntax)
         * for more information
         * @property {number=} start The index of the first object in the returned list of objects. This can
         * be used for paging through large collections of objects.
         * @property {number=} limit The maximum number of individual objects to be returned in the response.
         * If not specified, the default is 10. The maximum allowed value is 50.
         * @property {(number|string)=} since A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value that specifies the
         * start of a range of time-based data. Only objects created after this timestamp will be
         * returned in the response.
         * @property {(number|string)=} until A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value that specifies the end
         * of a range of time-based data. Only objects created before this timestamp will be
         * returned in the response.
         */

        /**
         * Makes a call directly to the MindMeld API. This method can be used to make calls to any path of
         * the MindMeld API that are not part of the namespaces
         *
         * @param {string}                          method      HTTP method to use for API call ('GET', 'POST', or 'DELETE')
         * @param {string}                          path        API endpoint path (e.g., 'session/:sessionid/textentries')
         * @param {QueryParameters=}                params      Parameters to be sent to MindMeld API. Params are URL
         * encoded for GET and DELETE requests
         *                                                      and are sent as POST data for POST requests
         * @param {APISuccessCallback=}             success     A callback function to be called if the API request succeeds.
         * The function receives one argument containing the data returned from the server
         * @param {qAPIErrorCallback=}               error       A callback function to be called if the API request fails.
         * The function receives one argument, the error message returned from the server
         * @memberOf MM
         * @instance
         *
         * @example <caption> Example GET request
         * to the
         * [session text entries endpoint](https://developer.expectlabs.com/docs/endpointSession#getSessionSessionidTextentries)
         * </caption>
         *
         function callAPI () {
            MM.callApi('GET', 'session/47978/textentries', null, onGetTextEntries);
         }
         function onGetTextEntries (response) {
            var responseData = response.data;
         }

         * @example <caption> Example POST request to the application's
         * [publish event endpoint](https://developer.expectlabs.com/docs/endpointApp#postEvents) </caption>
         *
         function callAPI () {
            var eventData = {
                name: 'custom event name',
                payload: 'test payload'
            };
            MM.callApi('POST', 'events', eventData, onPublishEvent);
         }
         function onPublishEvent (response) {
            var responseData = response.data;
         }
         */
        callApi: function (method, path, params, success, error, headers) {
            var modSince = false;
            if (params && params['if-modified-since']) {
                modSince = true;
                delete params['if-modified-since'];
            }

            headers = headers || {'X-MINDMELD-ACCESS-TOKEN': MM.token};
            var fullUrl = MM.config.cleanUrl + path;
            if (MM.config.debug) MM.Internal.log('Calling MindMeld API with: ' + method + ' and URL: ' + fullUrl + ' and Params: ' + JSON.stringify(params));
            // Now call the API using AJAX.
            $.ajax({
                type: method,
                url: fullUrl,
                data: params,
                dataType: 'json',
                headers: headers,
                ifModified: modSince,
                success: function (result, status) {
                    if (MM.config.debug) MM.Internal.log('The MindMeld request returned: ' + JSON.stringify(result));
                    if (status === 'notmodified') {
                        MM.Util.testAndCall(error, status);
                    }
                    else if (result) {
                        if (result.data) {
                            MM.Util.testAndCall(success, result);
                        }
                        else if (result.error) {
                            MM.Util.testAndCall(error, result.error);
                        }
                    }
                    else {
                        MM.Util.testAndCall(error, result);
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    var text = 'Ajax Request Error: ' + 'XMLHTTPRequestObject status: (' + xhr.status + ', ' + xhr.statusText + '), ' +
                        'text status: (' + textStatus + '), error thrown: (' + errorThrown + ')';
                    MM.Internal.log('The MindMeld AJAX request failed with the error: ' + text);
                    MM.Internal.log(xhr.responseText);
                    MM.Internal.log(xhr.getAllResponseHeaders());
                    var errorObj = {
                        code: 0,
                        type: 'Failed Ajax Request',
                        message: ''+errorThrown
                    };
                    MM.Util.testAndCall(error, errorObj);
                }
            });
        }
    });

    /**
     * Collection MindMeld object models
     *
     * @namespace
     * @memberOf MM
     * @private
     */
    MM.models = {};

    MM.models.Model = MM.Internal.createSubclass(Object, {
        /**
         * Object specifying a location object containing a latitude and longitude
         *
         * @example
         * location = {
         *  latitude: 33.53,
         *  longitude: -7.59
         * }
         *
         * @typedef {Object} Location
         * @property {number} latitude latitude of the location
         * @property {number} longitude longitude of the location
         */

        /**
         * Constructor for Model class
         *
         * @constructs Model
         * @classdesc This is the base class for all the API objects. This is where the functionality for getting and pushing
         * data to the API is located. This class is never used directly, however; it's always one of the child classes that
         * is used (e.g., ActiveUser, TextEntryList)
         * @private
         */
        constructor: function () {
            this.result = null;
            this.shouldPersist = true;
            this.updateHandler = null;
            this.eTag = null;
        },

        /**
         * Write object data to [localstorage](http://www.w3schools.com/html/html5_webstorage.asp) (if available)
         *
         * @memberOf Model
         * @instance
         * @private
         */
        backupData: function () {
            if (MM.support.localStorage) {
                localStorage[this.localStoragePath()] = JSON.stringify(this.result);
            }
        },

        /**
         * Clears both stored result data and localStorage data
         *
         * @memberOf Model
         * @instance
         * @private
         */
        clearAllData: function () {
            this.result = null;
            this.clearLocalData();
        },

        /**
         * Clears local storage data
         *
         * @memberOf Model
         * @instance
         * @private
         */
        clearLocalData: function () {
            if (MM.support.localStorage) {
                localStorage.removeItem(this.localStoragePath());
            }
        },


        /**
         * Internal method for Model class used by every Model to reload all data
         * from the MindMeld API for this object
         *
         * @param {Object=} params optional query parameters when GET-ing collection
         * @param {function=} onSuccess callback for when GET-ing data from collection was successful
         * @param {function=} onFail callback for when GET-ing data from collection failed
         * @memberOf Model
         * @private
         * @instance
         */
        _get: function (params, onSuccess, onFail) {
            this.makeModelRequest('GET', this.path(), params, onGetSuccess, onFail);

            var updateHandler = this.updateHandler; // Closures FTW
            // Call onUpdate handler before callback if specified
            function onGetSuccess(response) {
                MM.Util.testAndCall(updateHandler, response);
                MM.Util.testAndCall(onSuccess, response);
            }
        },

        /**
         * Restores data from local storage
         *
         * @param {function=} onSuccess callback for when object data was successfully restored from localstorage
         * @param {function=} onFail callback for when restoring object data from localstorage failed
         * @memberOf Model
         * @instance
         * @private
         */
        restore: function (onSuccess, onFail) {
            if (MM.support.localStorage) {
                var storedData = localStorage[this.localStoragePath()];
                if (storedData) {
                    storedData = JSON.parse(storedData);
                    if (storedData) {
                        this.result = storedData;
                        MM.Util.testAndCall(onSuccess);
                        return;
                    }
                }
            }
            MM.Util.testAndCall(onFail);
        },

        /**
         * Internal helper function returns the data portion of the response from a GET request
         *
         * @returns {?Object}
         * @memberOf Model
         * @instance
         */
        _json: function () {
            if (this.result && this.result.data) {
                return this.result.data;
            }
            else {
                return null;
            }
        },

        /**
         * Use {@link MM#callApi} to GET, POST, or DELETE data. {@link Model#makeModelRequest} (by default) saves data returned from
         * GET requests to localstorage. It also records the ETag returned from the API responses. Note, this is an internal
         * function, and not needed to use the SDK
         *
         * @param {string} method HTTP method to use for API call
         * @param {string} path API endpoint path
         * @param {Object=} params query parameters or data to be sent API
         * @param {APISuccessCallback=} success callback for when {@link Model} request is successful
         * @param {APIErrorCallback=} error callback for when there is an error with {@link Model} request
         * @private
         * @memberOf Model
         * @instance
         */
        makeModelRequest: function (method, path, params, success, error) {
            var me = this;
            var callback = function (result) {
                if (result.request && result.request.method && result.request.method.toUpperCase() == 'GET') {
                    me.result = result;
                    if (me.shouldPersist) {
                        me.backupData();
                    }
                    if (result.etag) {
                        me.eTag = result.etag;
                    }
                }
                if (result.data) {
                    MM.Util.testAndCall(success, result);
                }
                else {
                    MM.Util.testAndCall(error, result);
                }
            };
            var headers = {'X-MINDMELD-ACCESS-TOKEN': MM.token};
            if (params) {
                if (params['if-none-match'] && this.eTag !== null) {
                    headers['if-none-match'] = this.eTag;
                    delete params['if-none-match'];
                }
            }
            MM.callApi(method, path, params, callback, error, headers);
        },

        /**
         * Obtains the channel config for this object, using this model's channelType field.
         *
         * @private
         * @memberOf Model
         * @instance
         * @returns {ChannelConfig} channelConfig object specifying channel type and full channel string
         */
        getChannelConfig: function () {
            var channelConfig = {};
            var channelString = '/' + MM.config.appid;
            switch (this.channelType) {
                case 'app':
                    channelConfig['type'] = this.channelType;
                    channelConfig['channel'] = channelString;
                    break;

                case 'session':
                    channelConfig['type'] = this.channelType;
                    channelConfig['channel'] = channelString + '/session/' + MM.activeSessionId;
                    break;

                case 'user':
                    channelConfig['type'] = this.channelType;
                    channelConfig['channel'] = channelString + '/user/' + MM.activeUserId;
                    break;
            }
            return channelConfig;
        },

        /**
         * Internal function that sets this model's onUpdate handler. If no handler is passed in
         * onUpdate unsubscribes from push events
         *
         * @param {?NamedEventCallBack} updateHandler callback for when this {@link Model}'s collection updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf Model
         * @instance
         */
        _onUpdate: function (updateHandler, onSuccess, onError) {
            this.updateHandler = updateHandler;
            if (this.updateEventName && this.channelType) {
                var eventConfig = {
                    name: this.updateEventName,
                    subscribeAll: false
                };
                eventConfig.channelConfig = this.getChannelConfig();
                if (updateHandler) {
                    var self = this;
                    eventConfig.handler = function () { // Closures strike again!
                        self.get();
                    };
                    MM.Internal.EventHandler.subscribe(eventConfig, onSuccess, onError);
                }
                else {
                    MM.Internal.EventHandler.unsubscribe(eventConfig);
                }
            }
            else {
                MM.Util.testAndCall(onError);
            }
        },

        /**
         * Returns this {@link Model}'s unique local storage path.
         *
         * @private
         * @memberOf Model
         * @instance
         * @returns {string}
         */
        localStoragePath: function () {
            return '';
        },

        /**
         * Returns this {@link Model}'s unique API endpoint path
         *
         * @private
         * @memberOf Model
         * @instance
         * @returns {string}
         */
        path: function () {
            return '';
        }
    });

    MM.models.App = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * Constructor for App
         *
         * @constructs App
         * @classdesc The App class represents the data for the current application. It can be accessed via
         * 'MM'. The global MM object is an instance of class App and has access to all the same methods
         * as each of the other {@link Model} classes. The App object is used to fetch data for the current
         * app and publish / subscribe to app channel events.
         * @augments Model
         * @private
         */
        constructor: function () {
            MM.models.App.superclass.constructor.apply(this, arguments);
            $.extend(this, MM.Internal.customEventHandlers); // adds support for custom events on app channel
        },
        localStoragePath: function () {
            return 'MM.app'
        },
        path: function () {
            return('');
        },
        /**
         * Helper function returns the JSON data for the current application. You must have called {@link MM#get}
         * first, before {@link MM#json} returns any data.
         *
         *
         * @returns {Object}
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function getApplicationInfo () {
            MM.get(null, onGetApplicationInfo);
         }
         function onGetApplicationInfo () {
            var applicationInfo = MM.json();
            // MM.json() returns a JSON object containing data received from MM.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the app object's onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. If the updateHandler has been set, it
         * is automatically called when application info is fetched (e.g. {@link MM#get})
         *
         * @param {APISuccessCallback=} updateHandler callback for when the app object updates
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function getApplicationInfo () {
            MM.onUpdate(onGetApplicationInfo); // Set the updateHandler
            MM.get(); // Fetch application info
         }
         function onGetApplicationInfo (response) {
            var applicationInfo = response.data;
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler, null, null);
        },
        /**
         * Get information about the application. User privileges
         * allow access to basic application information. Admin privileges allow access
         * to extended information about the application. Note that, if an onUpdate handler
         * has already been specified for this object, the onUpdate handler will be invoked
         * first, followed by any specified 'onSuccess' callback.
         * @param {QueryParameters=} params query parameters when fetching the application object
         * @param {APISuccessCallback=} onSuccess callback for when getting application data was successful
         * @param {APIErrorCallback=} onFail callback for when getting application data failed
         * @memberOf MM
         * @instance
         *
         * @example
         *
         function getApplicationInfo () {
            MM.get(null, onGetApplicationInfo);
         }
         function onGetApplicationInfo (response) {
            var applicationInfo = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(null, onSuccess, onFail);
        },
        /**
         * Update application information. This function requires an admin token
         *
         * @param {Object} appData
         * @param {APISuccessCallback=} onSuccess
         * @param {APISuccessCallback=} onFail
         * @memberOf MM
         * @private
         * @instance
         */
        post: function (appData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), appData, onSuccess, onFail);
        },
        /**
         * Publish a new, custom event on the app channel
         *
         * @param {string} event event name
         * @param {EventPayload=} payload payload for event
         * @memberOf MM
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the application channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on application channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        publish: function (event, payload) {
            this._publish(event, payload);
        },
        /**
         * Subscribe to a custom event on the app channel
         *
         * @param eventName {string} name of event to subscribe to
         * @param eventHandler  {NamedEventCallBack} callback for when event is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @memberOf MM
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the application channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on application channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        subscribe: function (eventName, eventHandler, onSuccess, onError) {
            this._subscribe(eventName, eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from a custom event on the app channel
         *
         * @param {string} eventName name of event to subscribe from
         * @instance
         * @memberOf MM
         *
         * @example
         *
         function unsubscribeExample() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on application channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent'
            MM.publish('testEvent');
         }
         function onTestEvent (payload) {
            // onTestEvent will be called once after 'testEvent' is published
            console.log('received test event');
            // Now unsubscribe from 'testEvent'
            MM.unsubscribe('testEvent');
            // Publish 'testEvent' again
            MM.publish('testEvent');
            // Since we unsubscribed, onTestEvent won't be called anymore
         }
         */
        unsubscribe: function (eventName) {
            this._unsubscribe(eventName);
        },
        /**
         * Subscribes to every event on the app channel
         *
         * @param {AllEventsCallback} eventHandler callback for when an event on the app channel is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @instance
         * @memberOf MM
         *
         * @example
         *
         function subscribeAllExample () {
            MM.subscribeAll(onApplicationChannelEvent, onSubscribeApplicationChannel);
         }
         function onSubscribeApplicationChannel () {
            MM.publish('eventA', 'payloadA');
            MM.publish('eventB', 'payloadB');
         }
         function onApplicationChannelEvent (eventObject) {
            var eventName = eventObject.event;
            var eventPayload = eventObject.payload;
            console.log('Received event ' + eventName +
                ' with payload ' + eventPayload);
            // Received event eventA with payload payloadA
            // Received event eventB with payload payloadB
         }
         */
        subscribeAll: function (eventHandler, onSuccess, onError) {
            this._subscribeAll(eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from all events on the app channel
         *
         * @instance
         * @memberOf MM
         *
         * @example
         *
         function unsubscribeAllExample () {
            // First subscribe to all events on app channel
            MM.subscribeAll(onApplicationEvent, onSubscribeApplicationChannel);
         }
         function onSubscribeApplicationChannel () {
            // publish the event 'testEvent'
            MM.publish('testEvent');
         }
         function onApplicationEvent (eventObject) {
            var eventName = eventObject.event;
            console.log('Received event ' + eventName);
            // Now unsubscribe from application events
            MM.unsubscribeAll();
            MM.publish('testEvent');
            // onApplicationEvent won't be called because we are unsubscribed
            // from all application level events
         }
         */
        unsubscribeAll: function () {
            this._unsubscribeAll();
        },
        channelType: 'app'
    });

    MM.models.ActiveUser = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeUser is a namespace that represents the currently active user. It can only be used after
         * {@link MM#setActiveUserID} has been called. All API calls requiring a user's context use the activeUser's
         * userid. This namespace provides methods to subscribe to user's push events and interface to the
         * user's session list via {@link MM.activeUser.sessions}
         *
         * @namespace MM.activeUser
         * @memberOf MM
         */
        constructor: function () {
            MM.models.ActiveUser.superclass.constructor.apply(this, arguments);
            $.extend(this, MM.Internal.customEventHandlers); // adds support for custom events on user channel
        },
        localStoragePath: function () {
            return 'MM.activeUser'
        },
        path: function () {
            return('user/' + MM.activeUserId);
        },
        /**
         * Helper function returns the JSON data for the activeUser object
         *
         * @returns {Object}
         * @memberOf MM.activeUser
         * @instance
         *
         * @example
         *
         function getUserInfo () {
            MM.activeUser.get(null, onGetUserInfo);
         }
         function onGetUserInfo () {
            var userInfo = MM.activeUser.json();
            // MM.activeUser.json() returns a JSON object containing
            // data received from MM.activeUser.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeUser's onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. If the updateHandler has been set, it
         * is automatically called when active user info is fetched (e.g. {@link MM.activeUser#get})
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeUser object updates
         * @memberOf MM.activeUser
         * @instance
         *
         * @example
         *
         function getUserInfo () {
            MM.activeUser.onUpdate(onGetUserInfo); // Set the updateHandler
            MM.activeUser.get(); // Fetch active user info
         }
         function onGetUserInfo (response) {
            var userInfo = response.data;
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler, null, null);
        },
        /**
         * Get information about the user with the specified userid. For a token with user privileges,
         * the request will only allow access for the user associated with the token. For a token
         * with admin privileges, this request is permitted for any user of the app.
         *
         * @param {QueryParameters=} params query parameters when fetching the user object
         * @param {APISuccessCallback=} onSuccess callback for when getting user data was successful
         * @param {APIErrorCallback=} onFail callback for when getting user data failed
         * @memberOf MM.activeUser
         * @instance
         *
         * @example
         *
         function getUserInfo () {
            MM.activeUser.get(null, onGetUserInfo);
         }
         function onGetUserInfo (response) {
            var userInfo = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(null, onSuccess, onFail);
        },
        /**
         * Modify information about the active user
         *
         * @param {Object} userInfo Object containing updated user data. Currently, this function permits
         * the 'location' attribute for the user to be updated. Please see User endpoints documentation
         * [here](https://developer.expectlabs.com/docs/endpointUser#postUserUserid) for more info
         * @param {Location} userInfo.location location object containing lat/long
         * @param {APISuccessCallback=} onSuccess callback for when updating user info was successful
         * @param {APIErrorCallback=} onFail callback for when updating user info failed
         * @memberOf MM.activeUser
         * @instance
         *
         * @example
         *
         function updateUserLocation () {
            var newUserInfo = {
                location: {
                    latitude: 33.53,
                    longitude: -7.59
                }
            };
            MM.activeUser.post(newUserInfo, onUpdateUserInfo);
         }
         function onUpdateUserInfo (response) {
            // User location updated
         }
         */
        post: function (userInfo, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), userInfo, onSuccess, onFail);
        },
        /**
         * Publish a new, custom event on the active user's channel
         *
         * @param {string} event event name
         * @param {EventPayload=} payload payload for event
         * @memberOf MM.activeUser
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the active user's channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeUser.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on user channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.activeUser.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        publish: function (event, payload) {
            this._publish(event, payload);
        },
        /**
         * Subscribe to a custom event on the active user's channel
         *
         * @param eventName {string} name of event to subscribe to
         * @param eventHandler  {NamedEventCallBack} callback for when event is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @memberOf MM.activeUser
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the active user's channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeUser.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on user channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.activeUser.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        subscribe: function (eventName, eventHandler, onSuccess, onError) {
            this._subscribe(eventName, eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from a custom event on the active user's channel
         *
         * @param {string} eventName name of event to subscribe from
         * @instance
         * @memberOf MM.activeUser
         *
         * @example
         *
         function unsubscribeExample() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeUser.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on user channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent'
            MM.activeUser.publish('testEvent');
         }
         function onTestEvent (payload) {
            // onTestEvent will be called once after 'testEvent' is published
            console.log('received test event');
            // Now unsubscribe from 'testEvent'
            MM.activeUser.unsubscribe('testEvent');
            // Publish 'testEvent' again
            MM.activeUser.publish('testEvent');
            // Since we unsubscribed, onTestEvent won't be called anymore
         }
         */
        unsubscribe: function (eventName) {
            this._unsubscribe(eventName);
        },
        /**
         * Subscribes to every event on the active user's channel
         *
         * @param {AllEventsCallback} eventHandler callback for when an event on the user channel is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @instance
         * @memberOf MM.activeUser
         *
         * @example
         *
         function subscribeAllExample () {
            MM.activeUser.subscribeAll(onUserChannelEvent, onSubscribeUserChannel);
         }
         function onSubscribeUserChannel () {
            MM.activeUser.publish('eventA', 'payloadA');
            MM.activeUser.publish('eventB', 'payloadB');
         }
         function onUserChannelEvent (eventObject) {
            var eventName = eventObject.event;
            var eventPayload = eventObject.payload;
            console.log('Received event ' + eventName +
                ' with payload ' + eventPayload);
            // Received event eventA with payload payloadA
            // Received event eventB with payload payloadB
         }
         */
        subscribeAll: function (eventHandler, onSuccess, onError) {
            this._subscribeAll(eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from all events on the active user's channel
         *
         * @instance
         * @memberOf MM.activeUser
         *
         * @example
         *
         function unsubscribeAllExample () {
            // First subscribe to all events on active user channel
            MM.activeUser.subscribeAll(onUserChannelEvent, onSubscribeUserChannel);
         }
         function onSubscribeUserChannel () {
            // publish the event 'testEvent'
            MM.activeUser.publish('testEvent');
         }
         function onUserChannelEvent (eventObject) {
            var eventName = eventObject.event;
            console.log('Received event ' + eventName);
            // Now unsubscribe from user channel events
            MM.activeUser.unsubscribeAll();
            MM.activeUser.publish('testEvent');
            // onUserChannelEvent won't be called because we are unsubscribed
            // from all user channel events
         }
         */
        unsubscribeAll: function () {
            this._unsubscribeAll();
        },
        channelType: 'user'
    });

    MM.models.SessionList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeUser.sessions represents the user's sessions collection in the MindMeld API.
         *
         * @namespace MM.activeUser.sessions
         * @memberOf MM.activeUser
         */
        constructor: function () {
            MM.models.SessionList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeUser.sessions'
        },
        path: function () {
            return('user/' + MM.activeUserId + '/sessions');
        },
        /**
         * Helper function returns the JSON data for the sessions collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeUser.sessions
         * @instance
         *
         * @example
         *
         function getSessions () {
            MM.activeUser.sessions.get(null, onGetSessions);
         }
         function onGetSessions (response) {
            var sessions = MM.activeUser.sessions.json();
            // MM.activeUser.sessions.json() returns a JSON object
            // containing data received from MM.activeUser.sessions.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeUser.session's onUpdate handler. If no handler is passed in, onUpdate unsubscribes from push events
         *
         * @param {APISuccessCallback=} updateHandler callback for when the active user's session list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeUser.sessions
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, creating a new session, and
         * obtaining the latest session list </caption>
         *
         function sessionsOnUpdateExample () {
            // set the onUpdate handler for the sessions list
            MM.activeUser.sessions.onUpdate(onSessionsUpdate, onSubscribedToSessionsUpdates);
         }
         function onSubscribedToSessionsUpdates () {
            // successfully subscribed to updates to the user's sessions list

            // now, create a new session
            createNewSession();
         }
         function onSessionsUpdate () {
            // there was an update to the sessions list
            var sessions = MM.activeUser.sessions.json();
            // sessions contains the latest list of sessions
         }
         function createNewSession () {
            var newSessionData = {
                name: 'new session name',
                privacymode: 'inviteonly'
            };
            MM.activeUser.sessions.post(newSessionData);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterSessionListOnUpdate () {
            MM.activeUser.sessions.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get the list of sessions that can be accessed by the specified user. A request made with a user token is permitted
         * to get the session list for only the user associated with the token. A request made with an admin token
         * can get the session list for any user of your application.
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the sessions returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointUser#getUserUseridSessions) for more details
         * @param {APISuccessCallback=} onSuccess callback for when getting the session list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the session list failed
         * @memberOf MM.activeUser.sessions
         * @instance
         *
         * @example
         *
         function getSessions () {
            MM.activeUser.sessions.get(null, onGetSessions);
         }
         function onGetSessions (response) {
            var sessions = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Creates a new session for currently active user. This will create a new session, and the specified
         * user will be set as the session organizer, as indicated by the 'organizer' attribute of the session object.
         * A request made with a user token is permitted to post to the session list for only the user associated
         * with the token. A request made with an admin token is permitted to create a new session on behalf
         * of any user of the application.
         *
         * @param {Object} sessionInfo Object containing new session data. Please refer to documentation for creating sessions
         * [here](https://developer.expectlabs.com/docs/endpointUser#postUserUseridSessions) for more info
         * @param {string} sessionInfo.name name of the new session
         * @param {string} sessionInfo.privacymode the privacy mode for the session. The supported privacy modes
         * are 'friendsonly', 'inviteonly', and 'public'.  Sessions that are 'inviteonly' can be accessed only
         * by the session organizer and any user on the inviteduser list for the session. Sessions that
         * are 'friendsonly' can be accessed by users who are in the friends collection of the session
         * organizer. Sessions that are 'public' can be accessed by all users of your application.
         * @param {APISuccessCallback=} onSuccess callback for when creating new session was successful
         * @param {APIErrorCallback=} onFail callback for when creating new session failed
         * @memberOf MM.activeUser.sessions
         * @instance
         *
         * @example
         *
         function createNewSession () {
            var newSessionData = {
                name: 'new session name',
                privacymode: 'inviteonly'
            };
            MM.activeUser.sessions.post(newSessionData, onCreateNewSession);
         }
         function onCreateNewSession (result) {
            console.log(result);
         }
         */
        post: function (sessionInfo, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), sessionInfo, onSuccess, onFail);
        },
        /**
         * Delete a session from the application and the user's session list
         *
         * @param {string} sessionid id of the session to delete
         * @param {APISuccessCallback=} onSuccess callback for when deleting object was successful
         * @param {APIErrorCallback=} onFail callback for when deleting object failed
         * @memberOf MM.activeUser.sessions
         * @instance
         *
         * @example
         *
         function deleteSession () {
            MM.activeUser.sessions.delete('72798', onSessionDeleted);
         }
         function onSessionDeleted (response) {
            // session deleted
         }
         */
        delete: function (sessionid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', 'session/' + sessionid, null, onSuccess, onFail);
        },
        channelType: 'user',
        updateEventName: 'sessionsUpdate'
    });

    MM.models.TextEntryList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.textentries represents the TextEntries collection in the MindMeld API. The history
         * of TextEntry objects posted to the Session objects that can be accessed by the User.
         *
         * @namespace MM.activeSession.textentries
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.TextEntryList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.textentries'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/textentries');
        },
        /**
         * Helper function returns the JSON data for the textentries collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.textentries
         * @instance
         *
         * @example
         *
         function getTextEntries () {
            MM.activeSession.textentries.get(null, onGetTextEntries);
         }
         function onGetTextEntries (response) {
            var textentries = MM.activeSession.textentries.json();
            // MM.activeSession.textentries.json() returns a JSON object
            // containing data received from MM.activeSession.textentries.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession.textentries' onUpdate handler. If no handler is passed in,
         * onUpdate unsubscribes from push events
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's text entry list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeSession.textentries
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, creating a new text entry, and
         * obtaining the latest text entry list </caption>
         *
         function textEntriesOnUpdateExample () {
            // set the onUpdate handler for the text entries list
            MM.activeSession.textentries.onUpdate(onTextEntriesUpdate, onSubscribedToTextEntriesUpdates);
         }
         function onSubscribedToTextEntriesUpdates () {
            // successfully subscribed to updates to the session's textentries list

            // now, create a new text entry
            createNewTextEntry();
         }
         function onTextEntriesUpdate () {
            // there was an update to the textentries list
            var textentries = MM.activeSession.textentries.json();
            // textentries contains the latest list of textentries
         }
         function createNewTextEntry () {
            var textEntryData = {
                text: 'my new text segment',
                type: 'voice-spoken',
                weight: 0.5

            };
            MM.activeSession.textentries.post(textEntryData);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterTextEntriesOnUpdate () {
            MM.activeSession.textentries.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get the history of text entries that are associated with the specified session.
         * Each text entry is a segment of human-language text that is analyzed to infer
         * the context associated with this session. This endpoint can be used to retrieve
         * and search across the full history of text entries that have been posted to this
         * session. A request with a user token can access this collection only if the
         * associated user is permitted to access the session object itself. A request
         * with an admin token can access this collection for any session associated
         * with your application.
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the text entries returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointSession#getSessionSessionidTextentries) for more details
         * @param {APISuccessCallback=} onSuccess callback for when getting the text entry list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the text entry list failed
         * @memberOf MM.activeSession.textentries
         * @instance
         *
         * @example
         *
         function getTextEntries () {
            MM.activeSession.textentries.get(null, onGetTextEntries);
         }
         function onGetTextEntries (response) {
            var textentries = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Create a new text entry for the specified session. A text entry is a segment of human-language
         * text that will be analyzed to model the context of the current session. A text segment
         * typically represents information that a user has written, read, spoken or heard. A text
         * entry exists at a specific point in time, and it can be assigned a numerical weight indicating
         * its relative importance in the overall contextual stream. Typical text entries are one or two
         * sentences in length; the maximum size for a single text entry is 5000 characters. Once created,
         * textentry objects can be deleted but not modified.
         *
         * @param {Object} textEntryData Object containing new text entry data.
         * @param {string} textEntryData.text A segment of human-language text containing contextual
         * information about the session. This string is typically one or two sentences but can be
         * as long as 5000 characters. This text will be analyzed to understand the semantic concepts
         * pertinent to the session over time.
         * @param {string} textEntryData.type A short string that can be used to categorize text
         * entries into different buckets. You may choose to categorize text entries based on the
         * content the user has written, read, spoken or heard. For example, possible 'type'
         * values could be 'email-written', 'email-read', 'sms-written', 'sms-read',
         * 'post-written', 'post-read', 'tweet-written', 'tweet-read', 'voice-spoken', 'voice-heard',
         * etc. Subsequent searches on the textentries collection can use this 'type' field
         * to filter textentries by type.
         * @param {number} textEntryData.weight A decimal number between 0 and 1 indicating the
         * relative importance of this text entry in the overall history of text entries for the
         * session. A value of 0 indicates that this text entry will be ignored in modeling the
         * context of the session. A value of 1 indicates that any contextual information
         * contained in the text entry will have the maximum amount of influence over
         * document ranking and recommendations.
         * @param {APISuccessCallback=} onSuccess callback for when creating new session was successful
         * @param {APIErrorCallback=} onFail callback for when creating new session failed
         * @memberOf MM.activeSession.textentries
         * @instance
         *
         * @example
         *
         function createNewTextEntry () {
            var textEntryData = {
                text: 'my new text segment',
                type: 'voice-spoken',
                weight: 0.5

            };
            MM.activeSession.textentries.post(textEntryData, onCreateNewTextEntry);
         }
         function onCreateNewTextEntry (response) {
            // new text entry posted
         }
         */
        post: function (textEntryData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), textEntryData, onSuccess, onFail);
        },
        /**
         * Delete a text entry from the active session
         *
         * @param {string} textentryid id of the text entry to delete
         * @param {APISuccessCallback=} onSuccess callback for when deleting the text entry was successful
         * @param {APIErrorCallback=} onFail callback for when deleting the text entry failed
         * @memberOf MM.activeSession.textentries
         * @instance
         *
         * @example
         *
         function deleteTextEntry () {
            MM.activeSession.textentries.delete('76643', onTextEntryDeleted);
         }
         function onTextEntryDeleted (response) {
            // text entry deleted
         }
         */
        delete: function (textentryid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', 'textentry/' + textentryid, null, onSuccess, onFail);
        },
        channelType: 'session',
        updateEventName: 'textentriesUpdate'
    });

    MM.models.EntityList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.entities represents the Entities collection in the MindMeld API. The history of
         * Entity objects, which are derived from TextEntries or directly posted to the Session
         * objects that can be accessed by the User
         *
         * @namespace MM.activeSession.entities
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.EntityList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.entities'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/entities');
        },
        /**
         * Helper function returns the JSON data for the entities collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.entities
         * @instance
         *
         * @example
         *
         function getEntities () {
            MM.activeSession.entities.get(null, onGetEntities);
         }
         function onGetEntities () {
            var entities =  MM.activeSession.entities.json();
            // MM.activeSession.entities.json() returns a JSON object
            // containing data received from MM.activeSession.entities.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession.entities' onUpdate handler. If no handler is passed in,
         * onUpdate unsubscribes from push events
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's entity list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeSession.entities
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, creating a new entity, and
         * obtaining the latest entity list </caption>
         *
         function entitiesOnUpdateExample () {
            // set the onUpdate handler for the entities list
            MM.activeSession.entities.onUpdate(onEntitiesUpdate, onSubscribedToEntitiesUpdates);
         }
         function onSubscribedToEntitiesUpdates () {
            // successfully subscribed to updates to the session's entities list

            // now, create a new entity
            createEntity();
         }
         function onEntitiesUpdate () {
            // there was an update to the entities list
            var entities = MM.activeSession.entities.json();
            // entities contains the latest list of entities
         }
         function createEntity () {
            var newEntityData = {
                text: 'Diplo',
                entitytype: 'person',
                score: 0.9
            };
            MM.activeSession.entities.post(newEntityData, onCreateNewEntity);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterEntitiesOnUpdate () {
            MM.activeSession.entities.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get the history of entities that are associated with the specified session. Each
         * entity represents an individual logical concept that occurs at a point in time
         * during a session. For example, an entity could be a proper noun, such as the
         * name of a person or company, or it could also be any noun phrase representing
         * a distinct concept. Entities can be posted directly to a session or be
         * automatically derived from posted text entries. This endpoint can be used to
         * retrieve and search across the full history of entities associated with this
         * session. A request with a user token can access this collection only if the associated
         * user is permitted to access the session object itself. A request with an admin
         * token can access this collection for any session associated with your application.
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the entities returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointSession#getSessionSessionidEntities) for more details
         * @param {APISuccessCallback=} onSuccess callback for when getting the entity list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the entity list failed
         * @memberOf MM.activeSession.entities
         * @instance
         *
         * @example
         *
         function getEntities () {
            MM.activeSession.entities.get(null, onGetEntities);
         }
         function onGetEntities (response) {
            var entities =  response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Adds a new entity to the active session. Each entity represents an individual
         * logical concept that occurs at a point in time during the session. For example,
         * an entity can be a proper noun, such as the name of a person or place
         * (e.g. 'Barack Obama', 'Paris'), or it could be a noun phrase representing a distinct
         * concept (e.g. 'minestrone soup'). Entities are automatically derived from submitted
         * text entries, however this endpoint can be used to explicitly post entities to a session.
         * Refer to documentation [here](https://developer.expectlabs.com/docs/endpointSession#postSessionSessionidEntities)
         * for more information
         *
         *
         * @param {Object} entityData Object containing new entity data
         * @param {string} entityData.text The text of the entity. This is typically a proper
         * noun or a noun phrase representing a distinct logical concept. For example,
         * "Winston Churchill", "great wall of china", "Citizen Kane", "baseball playoffs", etc.
         * @param {string} entityData.entitytype A short string that can be used to categorize entities
         * by type. This can be an arbitrary string that can be used in subsequent searches on
         * the entities collection to filter entities by type. There are several entitytype
         * values, however, that the MindMeld platform uses. They are listed
         * [here](https://developer.expectlabs.com/docs/reservedEntityTypes)
         * @param {number} entityData.score A decimal number between 0 and 1 indicating the relative importance of
         * this entity in the overall context of the session. A value of 0 indicates that this entity has no
         * impact on the session context. A value of 1 indicates that this entity is very important
         * in interpreting the overall context of the session and therefore also important in
         * determining search ranking and recommendations.
         * @param {APISuccessCallback=} onSuccess callback for when creating new entity was successful
         * @param {APIErrorCallback=} onFail callback for when creating new entity failed
         * @memberOf MM.activeSession.entities
         * @instance
         *
         * @example
         *
         function createEntity () {
            var newEntityData = {
                text: 'Diplo',
                entitytype: 'person',
                score: 0.9
            };
            MM.activeSession.entities.post(newEntityData, onCreateNewEntity);
         }
         function onCreateNewEntity () {
            // New entity created
         }
         */
        post: function (entityData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), entityData, onSuccess, onFail);
        },
        /**
         * Delete an entity from the active session
         *
         * @param {string} entityid id of the entity to delete
         * @param {APISuccessCallback=} onSuccess callback for when deleting the entity was successful
         * @param {APIErrorCallback=} onFail callback for when deleting the entity failed
         * @memberOf MM.activeSession.entities
         * @instance
         *
         * @example
         *
         function deleteEntity () {
            MM.activeSession.entities.delete('<entity id>', onEntityDeleted);
         }
         function onEntityDeleted () {
            // entity deleted
         }
         */
        delete: function (entityid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', 'entity/' + entityid, null, onSuccess, onFail);
        },
        channelType: 'session',
        updateEventName: 'entitiesUpdate'
    });

    MM.models.ArticleList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.articles represents the Articles collection in the MindMeld API. This searchable collection
         * contains Article objects that are relevant to the contextual history of the active session
         * (Available for Enterprise developer accounts only).
         *
         * @namespace MM.activeSession.articles
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.ArticleList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.articles'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/articles');
        },
        /**
         * Helper function returns the JSON data for the articles collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.articles
         * @instance
         *
         * @example
         *
         function getArticles () {
            MM.activeSession.articles.get(null, onGetArticles);
         }
         function onGetArticles () {
            var articles =  MM.activeSession.articles.json();
            // MM.activeSession.articles.json() returns a JSON object
            // containing data received from MM.activeSession.articles.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession's articles' onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. Note that there are no push events for the articles
         * collection so it must be polled instead. The update handler will be called automatically when
         * calling {@link MM.activeSession.articles#get}
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's article list updates.
         *
         * @memberOf MM.activeSession.articles
         * @instance
         *
         * @example
         *
         function getArticles () {
            MM.activeSession.articles.onUpdate(onGetArticles); // Set the updateHandler
            MM.activeSession.articles.get(); // Fetch articles
         }
         function onGetArticles (response) {
            var articles = response.data;
            console.log(articles);
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler, null, null);
        },
        /**
         * Get a list of articles from third-party data sources that are relevant to the context
         * of the session. Articles typically include web pages, images, videos, and documents
         * from data sources on the Internet. For example, articles might include pages from
         * Wikipedia, videos from YouTube, or local business listings from Yelp. When enabled,
         * relevant articles are automatically identified based on the contextual history of
         * the session. Article sources can be configured for each application. A request with
         * a user token can retrieve articles only if the associated user is permitted to access
         * the session object itself. A request with an admin token can retrieve articles for
         * any session associated with your application. Custom configuration of article
         * sources is available for Enterprise developer accounts only.
         *
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the articles returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointSession#getSessionSessionidArticles) for more details
         * For this function, the following additional parameters are also available:
         * @param {(string[]|string)=} params.entityids An array of entityid values or a single entityid value
         * If specified, only articles related to the specified entities will be returned in the response.
         * @param {number=} params.numentities The number of most recent entities to include in the request. If specified,
         * only articles related to the specified number of most recent entities will be returned in the response.
         * @param {(string[]|string)=} params.textentryids An array of textentryid values or a single textentryid
         * value. If specified, only articles related to the specified text entries will be returned in the response
         * @param {APISuccessCallback=} onSuccess callback for when getting the article list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the article list failed
         * @memberOf MM.activeSession.articles
         * @instance
         *
         * @example
         *
         function getArticles () {
            var queryParams = {
                limit: 5, // only return 5 articles
                entityids: "[54321, 432432]" // only return articles related to these 2 entities
                                             // note that the entityids array is a JSON string
            };
            MM.activeSession.articles.get(queryParams, onGetArticles);
         }
         function onGetArticles (response) {
            var articles = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        }
    });

    MM.models.SessionDocumentList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.documents represents the Documents collection related to a session in the MindMeld API.
         * The searchable corpus of Document objects that are contextually related to the Session.
         *
         * @namespace MM.activeSession.documents
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.SessionDocumentList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.documents'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/documents');
        },
        /**
         * Helper function returns the JSON data for the session documents collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            MM.activeSession.documents.get(null, onGetDocuments);
         }
         function onGetDocuments () {
            var documents = MM.activeSession.documents.json();
            // MM.activeSession.documents.json() returns a JSON object
            // containing data received from MM.activeSession.documents.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession's documents' onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. Note that there are no push events for the documents
         * collection so it must be polled instead. The update handler will be called automatically when
         * calling {@link MM.activeSession.documents#get}
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's document list updates.
         * @memberOf MM.activeSession.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            MM.activeSession.documents.onUpdate(onGetDocuments);
            MM.activeSession.documents.get();
         }
         function onGetDocuments () {
            var documents = MM.activeSession.documents.json();
            console.log(documents);
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler, null, null);
        },
        /**
         * Get and search across all documents indexed for your application. In addition to providing
         * faceted search and filtering across your collection of documents, this endpoint also provides
         * the capability to deliver relevant document results based on the contextual history of your
         * session. A request with a user token can retrieve documents only if the associated user is
         * permitted to access the session object itself. A request with an admin token can retrieve
         * documents for any session associated with your application.
         *
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the documents returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointSession#getSessionSessionidDocuments)
         * for more details
         * For this function, the following additional parameters are also available:
         * @param {(string[]|string)=} params.entityids An array of entityid values or a single entityid value.
         * If specified, only documents related to the specified entities will be returned in the response.
         * @param {number=} params.numentities The number of most recent entities to include in the request. If
         * specified, only documents related to the specified number of most recent entities will be returned
         * in the response.
         * @param {(string[]|string)=} params.textentryids An array of textentryid values or a single textentryid
         * value. If specified, only documents related to the specified text entries will be returned in the response
         * @param {string=} params.query A search query string to retrieve specific
         * objects that match the query. See the documentation on [search query
         * syntax](https://developer.expectlabs.com/docs/customRankingFactors)
         * for more information.
         * @param {string=} params.document-ranking-factors A JSON string containing custom factors that will be
         * used to rank the documents returned by this request. Read the section on
         * [custom ranking factors](https://developer.expectlabs.com/docs/customRankingFactors) to learn more about how you can adjust the search ranking factors to customize the document results for your application.
         * @param {(number|string)=} params.history-since A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value that specifies the beginning of
         * the contextual history time window that will be used to influence the document results. Any contextual
         * data uploaded prior to the start of this window will be ignored in the calculation to determine
         * contextually relevant document results. If not specified, the value defaults to the latest contextual
         * history of the session.
         * @param {(number|string)=} params.history-until A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value that specifies the end of the
         * contextual history time window that will be used to influence the document results. Any contextual
         * data uploaded after the end of this window will be ignored in the calculation to determine contextually
         * relevant document results. If not specified, the value defaults to the latest contextual history of the session
         * @param {number=} params.start The index of the first object in the
         * returned list of objects. This can be used for paging through large
         * collections of objects.
         * @param {number=} params.limit The maximum number of individual objects
         * to be returned in the response. If not specified, the default is 10. The
         * maximum allowed value is 50.
         * @param {(number|string)=} params.since A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value
         * that specifies the start of a range of time-based data. Only documents
         * with publication date after this timestamp will be returned in the
         * response.
         * @param {(number|string)=} params.until A Unix timestamp or
         * [strtotime](http://php.net/manual/en/function.strtotime.php) date value
         * that specifies the end of a range of time-based data. Only documents
         * with publication date before this timestamp will be returned in the
         * response.
         * @param {APISuccessCallback=} onSuccess callback for when getting the session document list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the session document list failed
         * @memberOf MM.activeSession.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            var queryParams = {
                numentities: 4
            };
            // add custom ranking factors to this query
            queryParams['document-ranking-factors'] = {
                recency: 0.5,
                popularity: 0.7,
                relevance: 0,
                proximity: 0.2,
                customrank1: 0.3
            };
            queryParams['history-since'] = 'yesterday';
            MM.activeSession.documents.get(queryParams, onGetDocuments);
         }
         function onGetDocuments (response) {
            var documents = response.data;
            console.log(documents);
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        }
    });


    MM.models.AppDocumentList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.documents represents the whole Documents collection that are part of a
         * particular application. These Documents are not related to a particular Session.
         *
         * @namespace MM.documents
         * @memberOf MM
         */
        constructor: function () {
            MM.models.AppDocumentList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.documents'
        },
        path: function () {
            return('documents');
        },
        /**
         * Helper function returns the JSON data from the application's document collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            MM.documents.onUpdate(onGetDocuments);
            MM.documents.get();
         }
         function onGetDocuments () {
            var documents = MM.documents.json();
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the MM documents' onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. Note that there are no push events for the documents
         * collection so it must be polled instead. The update handler will be called automatically when
         * calling {@link MM.documents#get}
         *
         * @param {APISuccessCallback=} updateHandler callback for when the app's document list updates.
         * @memberOf MM.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            MM.documents.onUpdate(onGetDocuments);
            MM.documents.get();
         }
         function onGetDocuments () {
            var documents = MM.documents.json();
            console.log(documents);
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler, null, null);
        },
        /**
         * Get and search across all documents indexed for your application. This endpoint will let you access
         * all documents that have been crawled from your website as well as all documents that you have posted
         * to the documents collection for this application. User privileges do not permit access to this
         * object; admin privileges are required
         *
         *
         * @param {QueryParameters=} params A {@link QueryParameters} object allowing you to filter the documents returned.
         * See documentation [here](https://developer.expectlabs.com/docs/endpointApp#getDocuments) for more details. For
         * this function, the following additional parameters are also available:
         * @param {string=} params.document-ranking-factors A JSON string containing custom factors that will be
         * used to rank the documents returned by this request. Read the section on
         * [custom ranking factors](https://developer.expectlabs.com/docs/customRankingFactors) to learn more about
         * how you can adjust the search ranking factors to customize the document results for your application
         * @param {APISuccessCallback=} onSuccess callback for when getting the application document list was successful
         * @param {APIErrorCallback=} onFail callback for when getting the application document list failed
         * @memberOf MM.documents
         * @instance
         *
         * @example
         *
         function getDocuments () {
            var queryParams = {
                query: 'san francisco' // get documents matching the string 'san francisco'
            };
            // add custom ranking factors to this query
            queryParams['document-ranking-factors'] = {
                recency: 0.5,
                popularity: 0.7,
                relevance: 0,
                proximity: 0.2,
                customrank1: 0.3
            };
            MM.documents.get(queryParams, onGetDocuments);
         }
         function onGetDocuments (response) {
            var documents = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Upload a document to the application. This requires an admin token
         *
         * @param {Object} document object containing document data. The only required parameters are 'title'
         * and 'originurl'. Please see Document documentation
         * [here](https://developer.expectlabs.com/docs/endpointApp#postDocuments) for more info
         * @param {string} document.title The title of the document
         * @param {string} document.originurl The fully qualified link to the webpage containing the
         * original document. Note that this url will be stored, but not returned in subsequent GET
         * requests to this document object. Instead, the 'originurl' field value will contain a
         * wrapper url which, when loaded in a browser, will record a page view for this document
         * and then redirect to the originurl value provided here. This mechanism enables the view
         * count to be tracked and used to influence the document ranking calculation
         *
         * @param {string=} document.description A short text description of the contents of the document
         * @param {string=} document.text The full text contents of the document
         * @param {string=} document.sections The text from the header sections of the document. This
         * includes any text contained in the h1, h2, h3, h4 and h5 tags, if your document is a webpage
         * @param {number=} document.pubdate The Unix timestamp reflecting the date when this document
         * was originally published
         * @param {string=} document.language The 3-letter [ISO-639-2](http://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)
         * language code indicating the language of this document (e.g. 'eng', 'spa', 'ger', etc.)
         * @param {Object=} document.image An object specifying information about an image related to the document
         * @param {string=} document.image.url The URL for the image associated with this document
         * @param {string=} document.image.thumburl The URL for a small-format image, if available. This is typically
         * a thumbnail of a larger image and it should have a maximum dimension of around 500 pixels or less
         * @param {number=} document.image.width The width of the full image in pixels
         * @param {number=} document.image.height The height of the full image in pixels
         * @param {Object=} document.source An object specifying information about the source of this document
         * @param {string=} document.source.name A text string suitable for display containing the name of the source
         * of the document (e.g. 'The New York Times')
         * @param {string=} document.source.url The website for the document source homepage (e.g. 'www.nyt.com')
         * @param {string=} document.source.icon The url for an icon, typically a favicon, representing the source
         * @param {Location=} document.location The location associated with this document
         * @param {number=} document.customrank1 A custom numerical rank value that can be used in the document ranking
         * calculation. See the documentation on
         * [custom ranking factors](https://developer.expectlabs.com/docs/customRankingFactors) for more information
         * @param {number=} document.customrank2 A custom numerical rank value that can be used in the document ranking
         * calculation. See the documentation on
         * [custom ranking factors](https://developer.expectlabs.com/docs/customRankingFactors) for more information
         * @param {number=} document.customrank3 A custom numerical rank value that can be used in the document ranking
         * calculation. See the documentation on
         * [custom ranking factors](https://developer.expectlabs.com/docs/customRankingFactors) for more information
         *
         * @param {APISuccessCallback=} onSuccess callback for when posting data to collection was successful
         * @param {APIErrorCallback=} onFail callback for when posting data to collection failed
         * @memberOf MM.documents
         * @instance
         *
         * @example
         *
         function addDocument () {
            var newDocumentData = {
                title: 'new document title',
                originurl: 'www.expectlabs.com'
            };
            MM.documents.post(newDocumentData, onDocumentAdded);
         }
         function onDocumentAdded () {
            // new document added
         }
         */
        post: function (document, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), document, onSuccess, onFail);
        },
        /**
         * Delete a document from the application. This requires an admin token
         *
         * @param {string} documentid id of the document to delete
         * @param {APISuccessCallback=} onSuccess callback for when deleting object was successful
         * @param {APIErrorCallback=} onFail callback for when deleting object failed
         * @memberOf MM.documents
         * @instance
         *
         * @example
         *
         function deleteDocument () {
            MM.documents.delete('381c21d853faf6db58a0ab7d7d12e604', onDocumentDeleted);
         }
         function onDocumentDeleted (response) {
            // document with documentid response.data.documentid deleted
         }
         */
        delete: function (documentid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', 'document/' + documentid, null, onSuccess, onFail);
        }
    });

    MM.models.LiveUserList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.liveusers represents the LiveUsers collection in the MindMeld API. The list
         * of User objects who are currently using the Session
         *
         * @namespace MM.activeSession.liveusers
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.LiveUserList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.liveusers'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/liveusers');
        },
        /**
         * Helper function returns the JSON data for the live users list
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.liveusers
         * @instance
         *
         * @example
         *
         function getLiveUsers () {
            MM.activeSession.liveusers.get(null, onGetLiveUsers);
         }
         function onGetLiveUsers () {
            var liveUsers = MM.activeSession.liveusers.json();
            // MM.activeSession.liveusers.json() returns a JSON object
            // containing data received from MM.activeSession.liveusers.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession.liveusers' onUpdate handler. If no handler is passed in,
         * onUpdate unsubscribes from push events
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's live users list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeSession.liveusers
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, creating a new activity, and
         * obtaining the latest activities list </caption>
         *
         function liveUsersOnUpdateExample () {
            // set the onUpdate handler for the liveusers list
            MM.activeSession.liveusers.onUpdate(onLiveUsersUpdate, onSubscribedToLiveUsersUpdates);
         }
         function onSubscribedToLiveUsersUpdates () {
            // successfully subscribed to updates to the session's liveusers list
            console.log('subscribed');
            // now, add a live user
            addLiveUser();
         }
         function onLiveUsersUpdate () {
            // there was an update to the liveusers list
            var liveusers = MM.activeSession.liveusers.json();
            console.log(liveusers);
            // liveusers contains the latest list of liveusers
         }
         function addLiveUser () {
            var liveUserData = {
                userid: '365'
            };
            MM.activeSession.liveusers.post(liveUserData);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterLiveUsersOnUpdate () {
            MM.activeSession.liveusers.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get the list of users that are currently active users of the specified session. A request with a
         * user token can get the liveusers list only if the associated user is permitted to access the session
         * object itself. A request with an admin token can get the liveusers list for any session associated
         * with your application.
         *
         * @param {QueryParameters=} params query parameters when fetching the live user list
         * @param {APISuccessCallback=} onSuccess callback for when getting live user list was successful
         * @param {APIErrorCallback=} onFail callback for when getting live user list failed
         * @memberOf MM.activeSession.liveusers
         * @instance
         *
         * @example
         *
         function getLiveUsers () {
            MM.activeSession.liveusers.get(null, onGetLiveUsers);
         }
         function onGetLiveUsers (response) {
            var liveUsers = response.data;
            console.log(liveUsers);
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Adds a new user to the list of active users for the active session
         *
         * @param {Object} newLiveUserData object specifying userid of user to be added to live user list
         * @param {string} newLiveUserData.userid The MindMeld userid for the user to add to the liveusers list for the session
         * @param {APISuccessCallback=} onSuccess callback for when adding live user was successful
         * @param {APIErrorCallback=} onFail callback for when adding live user failed
         * @memberOf MM.activeSession.liveusers
         * @instance
         *
         * @example
         *
         function addLiveUser () {
            var liveUserData = {
                userid: '365'
            };
            MM.activeSession.liveusers.post(liveUserData, onLiveUserAdded);
         }
         function onLiveUserAdded (response) {
            // New live user added
         }
         */
        post: function (newLiveUserData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), newLiveUserData, onSuccess, onFail);
        },
        /**
         * Deletes a user from the list of active users for the active session
         *
         * @param {string} liveuserid id of the user to remove from active user list
         * @param {APISuccessCallback=} onSuccess callback for when removing user from active users list was successful
         * @param {APIErrorCallback=} onFail callback for when removing user from active users list failed
         * @memberOf MM.activeSession.liveusers
         * @instance
         *
         * @example
         *
         function removeLiveUser () {
            MM.activeSession.liveusers.delete('365', onLiveUserRemoved);
         }
         function onLiveUserRemoved () {
            // live user removed
         }
         */
        delete: function (liveuserid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', this.path() + '/' + liveuserid, null, onSuccess, onFail);
        },
        channelType: 'session',
        updateEventName: 'liveusersUpdate'
    });

    MM.models.InvitedUserList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.invitedusers represents the InvitedUsers collection in the MindMeld API.
         * The list of User objects who have been invited to join the Session.
         *
         * @namespace MM.activeSession.invitedusers
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.InvitedUserList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.invitedusers'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/invitedusers');
        },
        /**
         * Helper function returns the JSON data for the invited users list
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.invitedusers
         * @instance
         *
         * @example
         *
         function getInvitedUsers () {
            MM.activeSession.invitedusers.get(null, onGetInvitedUsers);
         }
         function onGetInvitedUsers (response) {
            var invitedUsers = MM.activeSession.invitedusers.json();
            // MM.activeSession.invitedusers.json() returns a JSON object
            // containing data received from MM.activeSession.invitedusers.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession.invitedusers' onUpdate handler. If no handler is passed in,
         * onUpdate unsubscribes from push events
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's invited users list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeSession.invitedusers
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, adding a new invited user, and
         * obtaining the latest invited users list </caption>
         *
         function invitedUsersOnUpdateExample () {
            // set the onUpdate handler for the invitedusers list
            MM.activeSession.invitedusers.onUpdate(onInvitedUsersUpdate, onSubscribedToInvitedUsersUpdates);
         }
         function onSubscribedToInvitedUsersUpdates () {
            // successfully subscribed to updates to the session's invitedusers list
            // now, invite a new user
            inviteNewUser();
         }
         function onInvitedUsersUpdate () {
            // there was an update to the invitedusers list
            var invitedusers = MM.activeSession.invitedusers.json();
            // invitedusers contains the latest list of invitedusers
         }
         function inviteNewUser () {
            var newInvitedUserData = {
                provider: 'simple',
                userid: 'einstein79',
                name: 'Albert Einstein'
            };
            MM.activeSession.invitedusers.post(newInvitedUserData);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterInvitedUsersOnUpdate () {
            MM.activeSession.invitedusers.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get the list of users that have been added to the invitedusers collection for this session. A request
         * with a user token can get the invitedusers list only if the associated user is permitted to access the
         * session object itself. A request with an admin token can get the invitedusers list for any session
         * associated with your application.
         *
         * @param {QueryParameters=} params query parameters when fetching the invited user list
         * @param {APISuccessCallback=} onSuccess callback for when getting invited user list was successful
         * @param {APIErrorCallback=} onFail callback for when getting invited user list failed
         * @memberOf MM.activeSession.invitedusers
         * @instance
         *
         * @example
         *
         function getInvitedUsers () {
            MM.activeSession.invitedusers.get(null, onGetInvitedUsers);
         }
         function onGetInvitedUsers (response) {
            var invitedUsers = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Invite a new user to the active session
         *
         * @param {Object} newInvitedUserData object specifying userid of user to be added to active session
         * @param {string} newInvitedUserData.provider The name of the authentication provider that you are using in your
         * application. This should be 'simple' for Simple User Authentication. For third-party authentication,
         * this should be the name of the third-party provider, such as 'facebook'
         * @param {string} newInvitedUserData.userid The userid for the user to invite. This should be the user
         * id value provided by your authentication service. This should not be the MindMeld userid
         * @param {string} newInvitedUserData.name The name of the user to invite
         * @param {APISuccessCallback=} onSuccess callback for when adding user to session was successful
         * @param {APIErrorCallback=} onFail callback for when adding live user to session failed
         * @memberOf MM.activeSession.invitedusers
         * @instance
         *
         * @example
         *
         function inviteUser () {
            var newInvitedUserData = {
                provider: 'simple',
                userid: 'einstein79',
                name: 'Albert Einstein'
            };
            MM.activeSession.invitedusers.post(newInvitedUserData, onInviteNewUser);
         }
         function onInviteNewUser (response) {
            // New user invited to session
         }
         */
        post: function (newInvitedUserData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), newInvitedUserData, onSuccess, onFail);
        },
        /**
         * Uninvite the specified user from the specified session
         *
         * @param {string} inviteduserid The MindMeld userid of the user to remove from invited user list
         * @param {APISuccessCallback=} onSuccess callback for when removing a user from the session was successful
         * @param {APIErrorCallback=} onFail callback for when removing a user from the session failed
         * @memberOf MM.activeSession.invitedusers
         * @instance
         *
         * @example
         *
         function removeUserFromSession () {
            MM.activeSession.invitedusers.delete('<mindmeld user id>', onRemoveUserFromSession);
         }
         function onRemoveUserFromSession (response) {
            // invited user removed from session
         }
         */
        delete: function (inviteduserid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', this.path() + '/' + inviteduserid, null, onSuccess, onFail);
        },
        channelType: 'session',
        updateEventName: 'invitedusersUpdate'
    });

    MM.models.ActivityList = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * MM.activeSession.activities represents the Activities collection in the MindMeld API. This collection captures
         * the history of user actions and other non-text contextual signals associated with the active session
         *
         * @namespace MM.activeSession.activities
         * @memberOf MM.activeSession
         */
        constructor: function () {
            MM.models.ActivityList.superclass.constructor.apply(this, arguments);
        },
        localStoragePath: function () {
            return 'MM.activeSession.activities'
        },
        path: function () {
            return('session/' + MM.activeSessionId + '/activities');
        },
        /**
         * Helper function returns the JSON data for the activities collection
         *
         * @returns {Array.<Object>}
         * @memberOf MM.activeSession.activities
         * @instance
         *
         * @example
         *
         function getActivities () {
            MM.activeSession.activities.get(null, onGetActivities);
         }
         function onGetActivities () {
            var activities =  MM.activeSession.activities.json();
            // MM.activeSession.activities.json() returns a JSON object
            // containing data received from MM.activeSession.activities.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession's activities' onUpdate handler. The onUpdate handler is called once
         * there is an update to the active session's activities list AND the latest
         * activities list is fetched successfully. If no updateHandler is passed in,
         * {@link MM.activeSession.activities#onUpdate} unsubscribes from push events.
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession's activity list updates
         * @param {function=} onSuccess callback for when subscription to onUpdate event succeeds
         * @param {function=} onError callback for when subscription to onUpdate event fails
         * @memberOf MM.activeSession.activities
         * @instance
         *
         * @example <caption> Setting the onUpdate handler, creating a new activity, and
         * obtaining the latest activities list </caption>
         *
         function activitiesOnUpdateExample () {
            // set the onUpdate handler for the activities list
            MM.activeSession.activities.onUpdate(onActivitiesUpdate, onSubscribedToActivitiesUpdates);
         }
         function onSubscribedToActivitiesUpdates () {
            // successfully subscribed to updates to the session's activities list

            // now, create a new activity
            createNewActivity();
         }
         function onActivitiesUpdate () {
            // there was an update to the activities list
            var activities = MM.activeSession.activities.json();
            // activities contains the latest list of activities
         }
         function createNewActivity () {
            var newActivityData = {
                activitytype: 'status update',
                title: 'hello world'
            };
            MM.activeSession.activities.post(newActivityData);
         }
         *
         * @example <caption> Deregistering the onUpdate handler </caption>
         *
         function deregisterActivitiesOnUpdate () {
            MM.activeSession.activities.onUpdate(null);
         }
         */
        onUpdate: function (updateHandler, onSuccess, onError) {
            this._onUpdate(updateHandler,  onSuccess, onError);
        },
        /**
         * Get and search through the activity stream for the specified session. The activity stream is designed to
         * capture non-text contextual signals important to your application. For example, the activity stream could
         * be used keep track of the location history for a given user; it could be used to log the time when a user
         * joins or leaves a session; or it could be used to track when users select certain documents, articles or
         * entities. Currently, the activites collection provides a consistent data representation to capture and search
         * through a history of non-text contextual signals. As we enhance the MindMeld Platform in the coming months,
         * we will add capabilities to recognize patterns and make recommendations based on commonly observed
         * activity histories. A request with a user token can retrieve activites only if the associated user
         * is permitted to access the session object itself. A request with an admin token can retrieve activites
         * for any session associated with your application.
         *
         * @param {QueryParameters=} params query parameters when fetching the activities list
         * @param {APISuccessCallback=} onSuccess callback for when getting activities list was successful
         * @param {APIErrorCallback=} onFail callback for when getting activities list failed
         * @memberOf MM.activeSession.activities
         * @instance
         *
         * @example
         *
         function getActivities () {
            MM.activeSession.activities.get(null, onGetActivities);
         }
         function onGetActivities (response) {
            var activities = response.data;
            console.log(activities);
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(params, onSuccess, onFail);
        },
        /**
         * Adds a new activity to the activity stream of the active session. The activity
         * stream is designed to capture non-text contextual signals important to your
         * application. This endpoint can be used to create new activities when your
         * users take specific actions in your app
         *
         * @param {Object} activityData Object containing new activity data.
         * @param {string} activityData.activitytype A short string
         * identifying the type of activity this object represents. For example, if the activity
         * corresponds to a user selecting an entity, this attribute could be set to 'select entity'.
         * If the activity is an update in user status, such as joining or leaving a session,
         * this attribute could be 'user status update'
         * @param {string} activityData.title A short text string that can be displayed as the title for the activity
         * @param {Location=} activityData.location A location object containing the longitude and
         * latitude coordinates associated with the activity. This can be used to keep track
         * of location history for a user
         * @param {string=} activityData.documentid The id of a document, if any, associated with the activity
         * @param {string=} activityData.articleid The id of an article, if any, associated with the activity
         * @param {string=} activityData.entityid The id of an entity, if any, associated with the activity
         * @param {string=} activityData.textentryid The id of a textentry, if any, associated with the activity
         * @param {APISuccessCallback=} onSuccess callback for when creating new activity was successful
         * @param {APIErrorCallback=} onFail callback for when creating new activity failed
         * @memberOf MM.activeSession.activities
         * @instance
         *
         * @example
         *
         function createNewActivity () {
            var newActivityData = {
                activitytype: 'status update',
                title: 'hello world'
            };
            MM.activeSession.activities.post(newActivityData, onCreateNewActivity);
         }
         function onCreateNewActivity () {
            // New activity created
         }
         */
        post: function (activityData, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), activityData, onSuccess, onFail);
        },
        /**
         * Delete an activity from the active session
         *
         * @param {string} activityid id of the activity to delete
         * @param {APISuccessCallback=} onSuccess callback for when deleting the activity was successful
         * @param {APIErrorCallback=} onFail callback for when deleting the activity failed
         * @memberOf MM.activeSession.activities
         * @instance
         *
         * @example
         *
         function deleteActivity () {
            MM.activeSession.activities.delete('<activity id>', onActivityDeleted);
         }
         function onActivityDeleted () {
            // activity deleted
         }
         */
        delete: function (activityid, onSuccess, onFail) {
            this.makeModelRequest('DELETE', 'activity/' + activityid, null, onSuccess, onFail);
        },
        channelType: 'session',
        updateEventName: 'activitiesUpdate'
    });

    MM.models.ActiveSession = MM.Internal.createSubclass(MM.models.Model, {
        /**
         * The MM.activeSession object represents the currently active session. It can only be used after
         * {@link MM#setActiveSessionID} has been called. This object is a container for capturing a history of contextual
         * information for one or more users interacting with an application. The activeSession contains
         * several child object collections that can be used to upload contextual information and
         * display relevant search results to your users. The activeSession object is also used to
         * publish / subscribe session-level push events
         *
         * @namespace MM.activeSession
         * @memberOf MM
         */
        constructor: function () {
            MM.models.ActiveSession.superclass.constructor.apply(this, arguments);
            var session = this;

            /**
             * A session's listener is automatically configured to post text entries with type 'speech' and weight of 0.5
             * when it receives a final {@link ListenerResult} object. Use {@link MM.activeSession#setListenerConfig} to
             * register callbacks. Before using a Listener, check that it is supported with {@link MM.support}.
             *
             * @name listener
             * @memberOf MM.activeSession
             * @type {MM.Listener}
             * @instance
             * @example
             if (MM.support.speechRecognition) {
                 MM.activeSession.setListenerConfig({
                     onResult: function(result) {
                         // update UI
                     }
                 });
                 MM.activeSession.listener.start();
             }
             */
            this.listener = new MM.Listener({
                interimResults: true,
                onResult: function(result, resultIndex, results, event) {
                    // post a text entry for finalized results
                    if (result.final) {
                        postListenerResult(result.transcript);
                    }
                    // notify handler
                    MM.Util.testAndCallThis(session._onListenerResult, session.listener, result, resultIndex, results, event);
                },
                onStart: function(event) {
                    MM.Util.testAndCallThis(session._onListenerStart, session.listener, event);
                },
                onEnd: function(event) {
                    // Add last result if it was not final
                    var results = this.results;
                    var lastResult = null;
                    if (results.length > 0) {
                        lastResult = results[results.length - 1];
                        if (!lastResult.final) {
                            postListenerResult(lastResult.transcript);
                        }
                    }
                    MM.Util.testAndCallThis(session._onListenerEnd, session.listener, event);
                },
                onError: function(error) {
                    MM.Util.testAndCallThis(session._onListenerError, session.listener, error);
                }
            });

            function postListenerResult(transcript) {
                session.textentries.post({
                    text: transcript,
                    type: 'speech',
                    weight: 0.5
                }, function(response) {
                    MM.Util.testAndCallThis(session._onTextEntryPosted, session.listener, response);
                });
            }

            $.extend(this, MM.Internal.customEventHandlers); // adds support for custom events on session channel
        },
        localStoragePath: function () {
            return 'MM.activeSession'
        },
        path: function () {
            return('session/' + MM.activeSessionId);
        },
        /**
         * Helper function returns the JSON data for the activeSession object
         *
         * @returns {Object}
         * @memberOf MM.activeSession
         * @instance
         *
         * @example
         *
         function getSessionInfo () {
            MM.activeSession.get(null, onGetSessionInfo);
         }
         function onGetSessionInfo () {
            var sessionInfo = MM.activeSession.json();
            // MM.activeSession.json() returns a JSON object containing data received from MM.activeSession.get()
         }
         */
        json: function () {
            return this._json();
        },
        /**
         * Sets the activeSession's onUpdate handler. Pass null as the updateHandler parameter to
         * deregister a previously set updateHandler. If the updateHandler has been set, it
         * is automatically called when active session info is fetched (e.g. {@link MM.activeSession#get})
         *
         * @param {APISuccessCallback=} updateHandler callback for when the activeSession object updates
         * @memberOf MM.activeSession
         * @instance
         *
         * @example
         *
         function getSessionInfo () {
            MM.activeSession.onUpdate(onGetSessionInfo); // Set the updateHandler
            MM.activeSession.get(); // Fetch active session info
         }
         function onGetSessionInfo (response) {
            var sessionInfo = response.data;
            console.log(sessionInfo);
         }
         */
        onUpdate: function (updateHandler) {
            this._onUpdate(updateHandler,  null, null);
        },
        /**
         * Sets the listener configuration of the active session. Pass null for callback fields to remove previous callbacks.
         * See {@link MM.Listener#setConfig} for more details.
         *
         * @param {ListenerConfig} config an object containing listener configuration properties
         * @memberOf MM.activeSession
         * @instance
         */
        setListenerConfig: function (config) {
            var configProperties = {
                onResult: '_onListenerResult',
                onStart: '_onListenerStart',
                onEnd: '_onListenerEnd',
                onError: '_onListenerError',
                onTextEntryPosted: '_onTextEntryPosted'
            };

            for (var configProperty in configProperties) { // only look at safe properties
                if (config.hasOwnProperty(configProperty)) { // only update property if it is in the config object
                    this[configProperties[configProperty]] = config[configProperty];
                    delete config[configProperty]; // remove from config
                }
            }

            this.listener.setConfig(config); // pass other configuration settings to listener
        },
        /**
         * Get information about the active session. User privileges may allow access to this object
         * depending on the privacymode of the session:
         * If the privacymode is 'public', a user token will allow access.
         * If the privacymode is 'friendsonly', a user token will allow access only if the user is in the friends collection of the session organizer.
         * If the privacymode is 'inviteonly', a user token will allow access only if the user is on the invitedusers list associated with this session.
         * If the user token belongs to the session organizer, it will be allowed to access the session.
         * Admin privileges allow access to all sessions associated with your application.
         * @param {QueryParameters=} params query parameters when fetching the session object
         * @param {APISuccessCallback=} onSuccess callback for when getting session data was successful
         * @param {APIErrorCallback=} onFail callback for when getting session data failed
         * @memberOf MM.activeSession
         * @instance
         *
         * @example
         *
         function getSessionInfo () {
            MM.activeSession.get(null, onGetSessionInfo);
         }
         function onGetSessionInfo (response) {
            var sessionInfo = response.data;
         }
         */
        get: function (params, onSuccess, onFail) {
            this._get(null, onSuccess, onFail);
        },
        /**
         * Updates information about the ActiveSession
         *
         * @param {Object} sessionInfo Object containing updated session data. The only fields
         * that can be updated are 'name' and 'privacymode'. Please see the Session endpoints
         * documentation [here](https://developer.expectlabs.com/docs/endpointSession#postSessionSessionid)
         * for more info
         * @param {string=} sessionInfo.name updated name of active session
         * @param {string=} sessionInfo.privacymode update privacy mode of the active session. The supported privacy modes
         * are 'friendsonly', 'inviteonly', and 'public'
         *
         * @param {APISuccessCallback=} onSuccess callback for when updating session info was successful
         * @param {APIErrorCallback=} onFail callback for when updating session info failed
         * @memberOf MM.activeSession
         * @instance
         *
         * @example
         *
         function updateSessionInfo () {
            var newSessionData = {
                name: 'updated session name',
                privacymode: 'public' // privacy mode will be updated to 'public'
            };
            MM.activeSession.post(newSessionData, onUpdateSessionSuccess);
         }
         function onUpdateSessionSuccess () {
            // Session data updated
         }
         */
        post: function (sessionInfo, onSuccess, onFail) {
            this.makeModelRequest('POST', this.path(), sessionInfo, onSuccess, onFail);
        },
        /**
         * Publish a new, custom event on the active session's channel
         *
         * @param {string} event event name
         * @param {EventPayload=} payload payload for event
         * @memberOf MM.activeSession
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the active session's channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeSession.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on session channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.activeSession.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        publish: function (event, payload) {
            this._publish(event, payload);
        },
        /**
         * Subscribe to a custom event on the active session's channel
         *
         * @param eventName {string} name of event to subscribe to
         * @param eventHandler  {NamedEventCallBack} callback for when event is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @memberOf MM.activeSession
         * @instance
         *
         * @example <caption> Code snippet to subscribe and publish a
         * custom event on the active session's channel </caption>
         *
         function publishEvent() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeSession.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on session channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent' with the payload containing the string
            // 'custom payload'
            MM.activeSession.publish('testEvent', 'custom payload');
         }
         function onTestEvent (payload) {
            // the payload parameter is 'custom payload'
            console.log('Received testEvent with payload: ' + payload);
         }
         */
        subscribe: function (eventName, eventHandler, onSuccess, onError) {
            this._subscribe(eventName, eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from a custom event on the active session's channel
         *
         * @param {string} eventName name of event to subscribe from
         * @instance
         * @memberOf MM.activeSession
         *
         * @example
         *
         function unsubscribeExample() {
            // First subscribe to an event. In this case we are
            // subscribing to an event named 'testEvent'
            MM.activeSession.subscribe('testEvent', onTestEvent, onTestEventSubscribed);
         }
         function onTestEventSubscribed () {
            console.log('Successfully subscribed to testEvent on session channel');
            // Now that we have successfully subscribed to the 'testEvent' event,
            // publish a 'testEvent'
            MM.activeSession.publish('testEvent');
         }
         function onTestEvent (payload) {
            // onTestEvent will be called once after 'testEvent' is published
            console.log('received test event');
            // Now unsubscribe from 'testEvent'
            MM.activeSession.unsubscribe('testEvent');
            // Publish 'testEvent' again
            MM.activeSession.publish('testEvent');
            // Since we unsubscribed, onTestEvent won't be called anymore
         }
         */
        unsubscribe: function (eventName) {
            this._unsubscribe(eventName);
        },
        /**
         * Subscribes to every event on the active session's channel
         *
         * @param {AllEventsCallback} eventHandler callback for when an event on the active session's channel is fired
         * @param onSuccess {function=} callback for when subscription is successful
         * @param onError   {function=} callback for when there is an error subscribing
         * @instance
         * @memberOf MM.activeSession
         *
         * @example
         *
         function subscribeAllExample () {
            MM.activeSession.subscribeAll(onSessionChannelEvent, onSubscribeSessionChannel);
         }
         function onSubscribeSessionChannel () {
            MM.activeSession.publish('eventA', 'payloadA');
            MM.activeSession.publish('eventB', 'payloadB');
         }
         function onSessionChannelEvent (eventObject) {
            var eventName = eventObject.event;
            var eventPayload = eventObject.payload;
            console.log('Received event ' + eventName +
                ' with payload ' + eventPayload);
            // Received event eventA with payload payloadA
            // Received event eventB with payload payloadB
         }
         */
        subscribeAll: function (eventHandler, onSuccess, onError) {
            this._subscribeAll(eventHandler, onSuccess, onError);
        },
        /**
         * Unsubscribe from all events on the active session's channel
         *
         * @instance
         * @memberOf MM.activeSession
         *
         * @example
         *
         function unsubscribeAllExample () {
            // First subscribe to all events on active session channel
            MM.activeSession.subscribeAll(onSessionChannelEvent, onSubscribeSessionChannel);
         }
         function onSubscribeSessionChannel () {
            // publish the event 'testEvent'
            MM.activeSession.publish('testEvent');
         }
         function onSessionChannelEvent (eventObject) {
            var eventName = eventObject.event;
            console.log('Received event ' + eventName);
            // Now unsubscribe from session channel events
            MM.activeSession.unsubscribeAll();
            MM.activeSession.publish('testEvent');
            // onSessionChannelEvent won't be called because we are unsubscribed
            // from all session channel events
         }
         */
        unsubscribeAll: function () {
            this._unsubscribeAll();
        },
        channelType: 'session'
    });

    /**
     * The Util namespace which contains utility methods
     *
     * @memberOf MM
     * @namespace
     * @private
     */
    MM.Util = $.extend({}, {

        /**
         * Tests whether given parameter is a function, and if so calls it
         *
         * @param {?function} func object to test if it is a function
         * @memberOf MM.Util
         *
         * @example
         var func = function(arg1, arg2) {
            console.log('Argument 1: ' + arg1);
            console.log('Argument 2: ' + arg2);
         };

         MM.Util.testAndCall(func, 'a', 'b');
         // Argument 1: a
         // Argument 2: b

         */
        testAndCall: function (func) {
            if($.isFunction(func)){
                // args will be the arguments to be passed to func
                // arguments[0] is a reference to func, so we call
                // slice to remove it from the arguments list
                var args = Array.prototype.slice.call(arguments, 1);
                func.apply(this, args);
            }
        },

        /**
         * Tests whether given parameter is a function, and if so calls it
         * with a given 'this' value
         *
         * @param {?function} func object to test if it is a function
         * @param {Object} thisArg value for 'this' when func is called
         * @memberOf MM.Util
         *
         * @example
         var func = function(arg1, arg2) {
            console.log('This.prop: ' + this.prop);
            console.log('Argument 1: ' + arg1);
            console.log('Argument 2: ' + arg2);
         };

         var self = {
            prop: 'property'
         };

         MM.Util.testAndCallThis(func, self, 'a', 'b');
         // This.prop: property
         // Argument 1: a
         // Argument 2: b
         */
        testAndCallThis: function (func, thisArg) {
            if($.isFunction(func)){
                // args will be the arguments to be passed to func
                // arguments[0] is a reference to func, so we call
                // slice to remove it from the arguments list
                var args = Array.prototype.slice.call(arguments, 2);
                func.apply(thisArg, args);
            }
        }
    });

    MM.Listener = (function () {
        var Listener = MM.Internal.createSubclass(Object, {
            /**
             * An object representing the text result from the speech recognition API.
             *
             * @typedef  {Object}  ListenerResult
             * @property {string}  transcript the text of the speech that was processed
             * @property {boolean} final      indicates whether the result is final or interim
             */

            /**
             * An object representing the configuration of a {@link MM.Listener}
             *
             * @typedef  {Object}  ListenerConfig
             * @property {boolean} [continuous=false]        whether the listener should continue listening until stop() is called.
             *                                               If false, recording will continue until the speech recognition provider
             *                                               recognizes a sufficient pause in speech.
             * @property {boolean} [interimResults=false]    whether the listener should provide interim results
             * @property {string} [lang=""]                  the 'Simple language sub tag' or 'Language-Region tag' of the [BCP 47](http://tools.ietf.org/html/bcp47)
             *                                               code for the language the listener should recognize (e.g. 'ko' for Korean,
             *                                               'en-US' for American English, and 'de-DE' for German). When set to the empty
             *                                               string "" or unspecified, the listener attempts to use the lang attribute
             *                                               of the root html element (document.documentElement.lang). A "language-not-supported"
             *                                               error will be thrown for unsupported languages. Language support depends on
             *                                               the browser. For Chrome, no official list of supported languages exists.
             *                                               There is however, a good unofficial list in this question on
             *                                               [Stack Overflow](http://stackoverflow.com/questions/14257598/what-are-language-codes-for-voice-recognition-languages-in-chromes-implementati).
             * @property {ListenerResultCallback} [onResult] the callback that will process listener results. This property must be
             *                                               provided when creating a new {@link MM.Listener}.
             * @property {function} [onStart=null]           the event handler which is called when a listening session begins.
             * @property {function} [onEnd=null]             the event handler which is called when a listening session ends.
             * @property {function} [onError=null]           the event handler which is called when errors are received.
             * @property {APISuccessCallback} [onTextEntryPosted=null] the event handler which is called when text entries are posted.
             *                                                         Note: This is only called when using the activeSession's listener
             */

            /**
             * The ListenerResultCallback handles results from the Speech Recognition API. A ListenerResultCallback should at
             * minimum handle the result parameter.
             *
             * @callback ListenerResultCallback
             * @param {ListenerResult} result result object containing speech recognition result
             * @param {number} resultIndex the index of the provided result in the results array
             * @param {Array} results an array of {@link ListenerResult} objects received during the current speech recognition session
             * @param {Event} event the original event received from the underlying SpeechRecognition instance
             */

            /**
             * Constructor for Listener class
             *
             * @constructs MM.Listener
             * @param {ListenerConfig} config an object containing the listener's configuration properties. Any properties that
             *                         are omitted default to either null or false.
             *
             * @classdesc This is the class for the MindMeld speech recognition API. Before using a Listener, check that it
             *            is supported with {@link MM.support}. Currently the known browsers which support MM.Listener are
             *            Google Chrome for Desktop (versions 25+) and Android (versions 31+). The MM.Listener class relies
             *            upon the speech recognition portion of the Web Speech API (https://dvcs.w3.org/hg/speech-api/raw-file/tip/webspeechapi.html)
             *            which has not yet been implemented by all major browsers. Note that listening won't work when accessing
             *            locally hosted JavaScript and HTML. Speech recognition is only supported when your JavaScript and
             *            HTML are served from a web server.
             *
             * @property {boolean} listening      indicates whether or not the listener is active. Readonly.
             * @property {Array} results          array of {@link ListenerResult} objects received during the current or most
             *                                    recent listening session. Readonly.
             * @property {boolean} interimResults indicates whether or not interimResults are enabled. Defaults to false.
             * @property {boolean} continuous     indicates whether or not continuous recognition is enabled. Defaults to false.
             * @property {string} lang            the 'Simple language sub tag' or 'Language-Region tag' of the [BCP 47](http://tools.ietf.org/html/bcp47)
             *                                    code for the language the listener should recognize (e.g. 'ko' for Korean, 'en-US'
             *                                    for American English, and 'de-DE' for German). When set to the empty string "" or
             *                                    unspecified, the listener attempts to use the lang attribute of the root html
             *                                    element (document.documentElement.lang). A "language-not-supported" error will
             *                                    be thrown for unsupported languages. Language support depends on the browser. For
             *                                    Chrome, no official list of supported languages exists. There is however, a good
             *                                    unofficial list in this question on
             *                                    [Stack Overflow](http://stackoverflow.com/questions/14257598/what-are-language-codes-for-voice-recognition-languages-in-chromes-implementati).
             *
             * @example
             function postTextEntry(text) {
                 MM.activeSession.textentries.post({
                     text: text,
                     type: 'speech',
                     weight: '0.5'
                 });
             }

             if (MM.support.speechRecognition) {
                 var myListener = new MM.Listener({
                     continuous: true,
                     interimResults: true,
                     lang: 'es-ES' // listen for European Spanish
                     onResult: function(result) {
                         if (result.final) {
                             // post text entry for final results
                             postTextEntry(result.transcript);

                             // update UI to show final result
                         } else {
                             // update UI to show interim result
                         }
                     },
                     onStart: function(event) {
                         // update ui to show listening
                     },
                     onEnd: function(event) {
                         var results = this.results;
                         var lastResult = null;
                         if (results.length > 0) {
                             lastResult = results[results.length - 1];
                         }

                         if (!lastResult.final) { // wasn't final when last received onResult
                             // post for the last result
                             postTextEntry(lastResult.transcript);
                             // update UI to show final result
                         }
                     },
                     onError: function(event) {
                         console.log('listener encountered error: ' + event.error);
                         // notify user of error if applicable
                     }
                 });
                 myListener.start();
             }
             */
            constructor: function(config) {
                this.setConfig(config);
            },
            /**
             * Sets the listener object's configuration. Pass null for callback fields to deregister previous callbacks.
             *
             * @param {ListenerConfig} config an object containing the listener's configuration properties
             * @memberOf MM.Listener
             * @instance
             */
            setConfig: function(config) {
                var configProperties = {
                    onResult: '_onResult',
                    onStart: '_onStart',
                    onEnd: '_onEnd',
                    onError: '_onError',
                    onTextEntryPosted: '_onTextEntryPosted',
                    continuous: 'continuous',
                    interimResults: 'interimResults',
                    lang: 'lang'
                };

                for (var configProperty in configProperties) { // only look at safe properties
                    if (config.hasOwnProperty(configProperty)) { // only update property if it is in the config object
                        this[configProperties[configProperty]] = config[configProperty];
                    }
                }
            },
            /**
             * The time the listener last begin listening. Defaults to 0.
             *
             * @memberOf MM.Listener
             * @instance
             * @private
             */
            _lastStartTime: 0,
            /**
             * Starts a speech recognition session. The onResult callback will begin receiving results as the user's speech
             * is recognized.
             *
             * @throws When speech recognition is not supported in the browser, an error is thrown.
             * @memberOf MM.Listener
             * @instance
             */
            start: function() {
                if (!MM.support.speechRecognition) {
                    MM.Internal.log('Speech recognition is not supported');
                    throw new Error('Speech recognition is not supported');
                }

                var listener = this;
                if (Date.now() - listener._lastStartTime < 1000) {
                    // TODO(jj): should we throw an error here, or call onError?
                    return;
                }

                var abortTimeout = 0;
                function setAbortTimeout() {
                    clearTimeout(abortTimeout);
                    abortTimeout = setTimeout(function(event) {
                        recognizer.abort();
                    }, 2000, event); // abort if the recognition fails to call onEnd (chrome bug hack)
                }

                var recognizer = this._recognizer;
                if (typeof recognizer === 'undefined') {
                    recognizer = this._recognizer = new SpeechRecognition();
                    recognizer.onresult = function(event) {
                        var result = {
                            final: false,
                            transcript: ''
                        };
                        var resultIndex = event.resultIndex;
                        var results = listener._results;

                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            var transcript = event.results[i][0].transcript;

                            if (event.results[i].isFinal) {
                                result.final = true;
                                result.transcript = transcript;
                                break;
                            } else {
                                result.transcript += transcript; // collapse multiple pending results into one
                            }
                        }
                        results[resultIndex] = result;

                        if (abortTimeout != 0) {
                            setAbortTimeout();
                        }

                        MM.Util.testAndCallThis(listener._onResult, listener, result, resultIndex, results, event);
                    };
                    recognizer.onstart = function(event) {
                        listener._listening = true;
                        listener._lastStartTime = Date.now();
                        MM.Util.testAndCallThis(listener._onStart, listener, event);
                    };
                    recognizer.onend = function(event) {
                        clearTimeout(abortTimeout);
                        abortTimeout = 0;
                        listener._listening = false;
                        MM.Util.testAndCallThis(listener._onEnd, listener, event);
                    };
                    recognizer.onerror = function(event) {
                        MM.Util.testAndCallThis(listener._onError, listener, event);
                    };
                    recognizer.onaudioend = function(event) {
                        if (!recognizer.continuous) {
                            setAbortTimeout();
                        }
                    }
                }
                recognizer.continuous = this.continuous;
                recognizer.interimResults = this.interimResults;
                var lang = (function () {
                    var language = '';
                    if (listener.lang !== '') {
                        language = listener.lang;
                    } else if (typeof document !== 'undefined' && document.documentElement !== null && document.documentElement.lang !== '') {
                        // attempt to retrieve from html element
                        language = document.documentElement.lang;
                    }
                    return language;
                })();
                recognizer.lang = lang;
                listener._results = []; // clear previous results

                recognizer.start();
            },
            /**
             * Stops the active speech recognition session. One more result may be send to the onResult callback.
             *
             * @memberOf MM.Listener
             * @instance
             */
            stop: function() {
                if (this._recognizer) {
                    this._recognizer.stop();
                }
            },
            /**
             * Cancels the active speech recognition session. No further results will be sent to the onResult callback.
             *
             * @memberOf MM.Listener
             * @instance
             */
            cancel: function() {
                if (this._recognizer) {
                    this._recognizer.abort();
                }
            }
        });


        Listener.prototype._listening = false;
        Listener.prototype._results = [];
        Listener.prototype.continuous = false;
        Listener.prototype.lang = "";
        Listener.prototype.interimResults = false;
        Object.defineProperties(Listener.prototype, {
            listening: {
                get: function() {
                    return this._listening;
                }
            },
            results: {
                get: function() {
                    return JSON.parse(JSON.stringify(this._results));
                }
            }
        });
        return Listener;
    })();

    /**
     * An overview of features supported in the browser.
     *
     * @memberOf MM
     * @namespace
     *
     * @property {boolean} speechRecognition whether speech recognition is supported in the current browser
     * @property {boolean} localStorage      whether local storage is supported in the current browser
     */
    MM.support = (function(window) {
        var support = {};

        var localStorage = false;
        var speechRecognition = false;

        Object.defineProperties(support, {
            localStorage: {
                get: function() { return localStorage; }
            },
            speechRecognition: {
                get: function() { return speechRecognition; }
            }
        });
        try {
            speechRecognition = (function(window) {
                'use strict';
                window = window || {};
                var SpeechRecognition = window.webkitSpeechRecognition ||
    //                window.mozSpeechRecognition || // TODO: add these as they become supported, and update MM.Listener docs
    //                window.msSpeechRecognition ||
    //                window.oSpeechRecognition ||
                    window.SpeechRecognition;
                window.SpeechRecognition = SpeechRecognition; // now we can use one!
                return (typeof(SpeechRecognition) !== 'undefined');
            })(window);
        } catch (e) {
            // TODO: maybe add something here?
        }
        try {
            var localStorage = (function(window) {
                'use strict';
                window = window || {};
                return (typeof(window.Storage) !== 'undefined');
            })(window);
        } catch (e) {
            // TODO: maybe add something here?
        }

        return support;
    })(window);


    // Setup MM SDK
    MM.Internal.setup();
    return MM;

}($, Faye));
/**
 * Created by jj on 4/18/14.
 */

;(function() {

  // This method takes a list of hypothesis entity candidates, the list of known reference entities as
  // well as the original text.  It this identifies all true positive, false positive, and false
  // entityList: hypothesis entity candidates
  // originalText: the original text
  //  {
  //     matchlist:      [ { index: <char position in text matching entity>, entity: <entity json object> } ],
  //     markup:         <html string fragment containing text with markup to show matching entities>,
  //     unrecognized:   [<entity json object>, <entity json object>, ...],
  //     overlapping:    [<entity json object>, <entity json object>, ...]
  //  }
  //
  // Note that each each entity object is an object that can contain a variety of different data fields,
  // depending on what is returned by the entity extraction provider.  Typical fields are 'text',
  // 'entitytype', 'url', etc.  Also note that 'unrecognized' entities are ones that are returned by
  // the provider but cannot be found in the text; 'overlapping' entities are ones that occurred in the
  // same text range as another entity.
  function highlightEntities(entityList, originalText) {
    if (!entityList || entityList.length === 0 ||
        !originalText || originalText.length === 0) {
      return {
        matchlist: {},
        markup: originalText || '',
        unrecognized: entityList || [],
        overlapping: []
      };
    }
    var i, j, stats = {}, allMatches = [];

    // For each entity, find all of the possible matches in the text.
    var unrecognized = [];
    for (i = 0; i < entityList.length; i++) {
      var matches = getMatches(originalText, entityList[i].text);
      if (matches.length > 0) {
        allMatches.push({
          'entity': entityList[i],
          'matches': matches
        });
      } else {
        unrecognized.push(entityList[i]);
      }
    }
    stats.unrecognized = unrecognized; // These are entities that did not match anywhere in the text.

    // For all the possible matches, identify the most likely unique match for each entity using the algorithm below.
    var finalMatches = []; // entities that match something in the given text
    var overlapping = [];
    var entity;
    var finalMatchesOverlaps = [];// entities that match something in the given text and overlap with other matches
    while (allMatches.length > 0) {
      allMatches.sort(matchSort); //sort on number of possible matches
      if (allMatches[0].matches.length === 0) {
        continue;
      }

      var remainingMatches = allMatches.slice(1);
      entity = allMatches[0].entity;
      for (i = 0; i < allMatches[0].matches.length; i++) {
        var indexStart = allMatches[0].matches[i]; // start index of possible match
        var indexEnd = indexStart + entity.text.length;
        finalMatches.push({
          'entity': entity,
          'index': indexStart
        });
        var overlaps = purgeIndexRange(indexStart, indexEnd, remainingMatches); // remove other entities that may match with given entity
        for (j = 0; j < overlaps.length; j++) {
          overlapping.push(overlaps[j]);
          var matchesForOverlap = getMatches(originalText, overlaps[j].text);
          finalMatchesOverlaps.push({
            'entity': overlaps[j],
            'matches': matchesForOverlap
          });
        }
      }
      allMatches = remainingMatches;
    }

    // From the overlapping matches, remove from the list of possible matches, the indexes that are already matched to
    // the entity in final matches
    for (i = 0; i < finalMatches.length; i++) {
      for (j = 0; j < finalMatchesOverlaps.length; j++) {
        if (finalMatches[i].entity.text === finalMatchesOverlaps[j].entity.text) {
          var idx = finalMatches[i].index;
          var overlapIdx = finalMatchesOverlaps[j].matches.indexOf(idx);
          if (overlapIdx != -1) {
            finalMatchesOverlaps[j].matches.splice(overlapIdx, 1);
          }
         }
      }
    }
    finalMatches.sort(indexSort);
    stats.overlapping = overlapping;
    stats.overlappingWithMatches = finalMatchesOverlaps;

    stats.matchlist = finalMatches;

    // Create marked-up text based on the matched true positives and false positives.  Highlight
    // the character ranges corresponding to false positives.
    var markup = '', pointer = 0;
    for (i = 0; i < stats.matchlist.length; i++) {
      var start = stats.matchlist[i].index;
      entity = stats.matchlist[i].entity;
      markup += originalText.substring(pointer, start); // any text between matches
      var entityText = entity.text;
      var end = start + entityText.length;
      var tag = "<a href='#' class='tag' data-entity-id='" + entity.entityid + "'>" + entityText + "</a>";
      markup += tag;
      pointer = end;
    }
    markup += originalText.substring(pointer); // the rest of the text
    stats.markup = markup;
    return stats;
  }

// Checks if an entity at a given index is a substring of a word in the document
  function isEntitySubstr(entity, index, text) {
    var patt1 = /[\w']/;
    var end = index + entity.length - 1; //last character of entity
    var nextChar = text.charAt(end + 1); //next character after entity
    var matchChar = nextChar.match(patt1);
    //if (entity == 'Nokia')
    //	console.log(!matchChar);
    if (!matchChar) {
      return false;
    } else {
      return true;
    }
  }

//checks if 2 ranges [start1, end1] and [start2,end2] overlap
  function doRangesOverlap(start1, end1, start2, end2) {
    if ((start1 >= start2) && (start1 < end2)) {
      return true;
    }
    if ((start2 >= start1) && (start2 < end1)) {
      return true;
    }
    return false;
  }

  // This removes any index values in matchedEntityArray that lie between the start and end values.  The matchedEntityArray is of the
  // form [{'entity':{'text': 'Jones'}, 'matches':[22, 47, 108]}, {'entity':{'text': 'Smith'}, 'matches':[59, 254]}, ...]
  function purgeIndexRange(start, end, matchedEntityArray) {
    var overlapping = [];
    for (var i = matchedEntityArray.length - 1; i >= 0; i--) {
      var matchedEntity = matchedEntityArray[i];
      var matches = matchedEntity.matches;
      for (var j = matches.length - 1; j >= 0; j--) {
        var matchIndexStart = matches[j];
        var matchIndexEnd = matchIndexStart + matchedEntity.entity.text.length;

        // remove all possible matches that may overlap with current entities
        if (doRangesOverlap(matchIndexStart, matchIndexEnd, start, end)) {
          matches.splice(j, 1);
        }
      }
      if (matches.length === 0) {
        overlapping.push(matchedEntity.entity);
        matchedEntityArray.splice(i, 1);
      }
    }
    return overlapping;
  }

  function compareEntityNames(e1, e2) {
    return (e1.toLowerCase() === e2.toLowerCase());
  }

  function matchSort(a, b) {
    // Sort first on the number of appearances in the text and then on the length of the entity (

    if (a.matches.length !== b.matches.length) {
      return a.matches.length - b.matches.length;
//    } else if (a.entity.score !== b.entity.score) {
//      return b.entity.score - a.entity.score; // TODO: should we use score here?
    } else { // if matches length are equal, sort on reverse order of length of entity
      return b.entity.text.length - a.entity.text.length;
    }
  }

// Sort based on the 'index' key.
  function indexSort(a, b) {
    return a.index - b.index;
  }

// This method takes a given text string, needle, and finds all of its occurances in the text haystack.
// An array is returned containing the start index for each match.
  function getMatches(haystack, needle) {
    if (needle && haystack) {
      var matches = [], ind = 0, l = needle.length;
      var t = haystack.toLowerCase();
      var regex = new RegExp('\\b' + needle.toLowerCase() + '\\b');
      while (true) {
        var localIndex = t.search(regex);
        if (localIndex == -1) { break; }
        t = t.slice(localIndex + l);
        ind += localIndex;
        matches.push(ind);
        ind += l;
      }
      return matches;
    }
    return [];
  }

  window.highlightEntities = highlightEntities;
})();

;(function() {
    var UTIL = {
        addLeadingZeros: function (number, digits) {
            var base = Math.pow(10, digits);
            number += base;
            number = number.toString();
            return number.substring(number.length - digits);
        },
        timestamp: function () {
            var date = new Date();
            return UTIL.addLeadingZeros(date.getFullYear(), 4) + '.'
                + UTIL.addLeadingZeros(date.getMonth() + 1, 2) + '.'
                + UTIL.addLeadingZeros(date.getDate(), 2) + ' ' + date.toTimeString();
        },
        log: function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, UTIL.timestamp());
            console.log.apply(console, args);
        }
    };

    /* Manage the state of the UI */
    var MMVoice = {
        is_init : false,
        is_locked : false,
        _lockWhileRecording: false,
        status : false,
        is_first_start : true,
        is_results : false,

        is_voice_ready  : false,

        config: {},

        _recordings: [],
        recordings_length: 0,
        confirmedRecording : {},
        pendingRecording : {},
        selectedEntityMap : {},
        currentEntities: [],
        results_length : -1,
        _entityMap : {},
        _similarEntityMap : {},
        _textEntryMap: {},
        _currentTextEntries: [],
        _height : 0,

        $body : $(),

        $window : $(),
        $cards : $(),
        $mm : $(),
        $mm_parent : $(),
        $mm_close : $(),
        $mm_button : $(),
        $mm_button_icon : $(),
        $mm_pulser : $(),
        $mm_alert : $(),
        $mm_alert_dismiss : $(),
        $tags : $(),
        $history : $(),
        $historyList : $(),
        $results : $(),
        $historyData : $(),
        $historyButton : $(),

        $editable : $(),

        $input : $(),

        // TODO: figure out a better name for this
        makeNewRecordings : function(confirmedTranscript) {
            var previousTranscript = this.confirmedRecording.transcript || '';
            if (previousTranscript.length > 0) {
                this.appendHistory(this.confirmedRecording);
            }
            this.confirmedRecording = this._newRecording(confirmedTranscript);
            this.pendingRecording = this._newRecording();
        },

        _newRecording : function(transcript) {
            transcript = transcript || '';
            return {
                transcript: transcript,
                textEntryID: false
            };
        },

        init : function() {
            var self = this;

            this.$body = $('body');

            this.$window = $(window);
            this.$mm = $('#mindmeld');
            this.$mm_button = $('#mm-button');
            this.$mm_close = $('#close, #mindmeld-overlay');
            this.$mm_pulser = $('#mm-pulser');
            this.$mm_button_icon = $('#mm-button-icon');
            this.$mm_parent = $('#mindmeld-parent');
            this.$mm_alert_dismiss = $('#mm-alert-dismiss');
            this.$mm_alert = $('#mindmeld-alert');
            this.$cards = $('#cards');
            this.$tags = $('#tags');
            this.$history = $('#history');
            this.$historyList = this.$history.find('ul');
            this.$input = this.$historyList.find('.on');
            this.$results = $('#results');
            this.$historyData = $('#history-data');
            this.$historyButton = $('#history-button');

            this.$editable = $('.editable');

            this.makeNewRecordings();

            // Make tags clickable
            function onTagClick() {
                var entityID = $(this).data('entityId');
                self.toggleEntitySelected(entityID);
            }
            this.$tags.on('click', '.tag', onTagClick);
            this.$historyList.on('click', '.tag', onTagClick);

            // Scrollbars
            $('.inner-content-div').slimScroll({
                height: '100%',
                distance: '6px'
            });

            // Resize
            self.$window.on('resize', function(){ self.resize(); });
            self.resize();

            self.setupEditable(true); // true = allow typing into the box

            // Alert dismiss
            self.$mm_alert_dismiss.click(function(e) {
                e.preventDefault();
                self.$mm_alert.removeClass('on');
            });

            // History button
            self.$historyButton.click(function(e) {
                e.preventDefault();

                // Toggle the open/closed-ness of history
                var history_open = self.$history.hasClass('open');
                self.$history.toggleClass('open', !history_open);

                if(!history_open) {
                    var scrollHeight = self._historyHeight(self.$historyData[0].scrollHeight);
                    self.$history.css(self._prefix('transform'), 'translateY('+scrollHeight+'px)');
                    self.$historyButton.text('Close History');
                } else {
                    self.$history.css(self._prefix('transform'), '');
                    self.$historyButton.text('Expand History');
                }

                // Snap to the bottom
                self.scrollHistory();
            });


            // Listen to post messages
            $(window).on('message', function(e) {
                var event = e.originalEvent;
                var action = event.data.action;
                if (event.data.source != 'mindmeld') {
                    return;
                }

                if (action === 'open') {
                    self.config = event.data.data;
                    self.onConfig();
                    self.$mm_parent.addClass('open');
                    if (self.config.startQuery === null && self.config.listeningMode) {
                        self._do_on_voice_ready(function() {
                            MMVoice.listen(self.config.listeningMode == 'continuous');
                        });
                    }
                }
            });

            // Close the modal
            self.$mm_close.click(function(e) {
                e.preventDefault();
                self.close();
            });

            if (!MM.support.speechRecognition) {
                self.$mm_button.hide();
                self.$mm_pulser.hide();
                self.$input.hide();

                self.$body.addClass('no-speech');

                var $text_input = $('<li>', {'class':'text-input'});
                var $form = $('<form>');
                var $input = $('<input>', {
                    type: 'text',
                    class: 'search',
                    placeholder: 'Search query'
                });
                var $button = $('<button>', {
                    html: '&nbsp;<span></span>',
                    type: 'submit',
                    class: 'mm-button-background mm-button-border'
                });

                $form.submit(function(e) {
                    e.preventDefault();
                    var text = $input.val();

                    $input.val("").focus();
                    $input.attr("placeholder", text);
                    self.appendHistory({transcript: text});

                    // Submit!
                    self.submitText(text);
                });

                $text_input.append($form);
                $form.append($input);
                $form.append($button);
                self.$historyList.append($text_input);

                $input.focus();
                return;
            }

            // Button Actions
            var button_status = {
                mousedown : false,
                locked : false,
                just_locked : true
            };

            self.$mm_button_icon.on('mousedown', function(e) {
                button_status.mousedown = true;
                button_status.just_locked = false;
                setTimeout(function() {
                    if(button_status.mousedown) {
                        button_status.locked = true;
                        button_status.just_locked = true;
                        self.listen(true);
                    }
                }, 300);
            });

            self.$mm_button_icon.on('mouseup', function(e) {
                e.preventDefault();
                button_status.mousedown = false;
                if(!button_status.locked) {
                    self.listen(false);
                }

                if(button_status.locked && !button_status.just_locked) {
                    button_status.locked = false;
                    button_status.mousedown = false;
                    self.listen(false);
                }

                button_status.just_locked = false;
            });

            // clicking documents
            this.$cards.on('click', '.card', function(e) {

                if (self.config.preventLinks) {
                    e.preventDefault();
                }
            });

            this.is_init = true;
        },


        close : function() {
            var self = this;

            self.stopListening();
            self.$mm_parent.removeClass('open results');
            self.$body.removeClass('results');
            self.is_results = false;
            self.results_length = -1;
            setTimeout(function() {
                self.postMessage('close');
            }, 500);
        },

        _do_on_voice_ready : function(fn) {
            var self = this;
            if(self.is_voice_ready) {
                fn();
            } else {
                self.do_on_voice_ready_fn = fn;
            }
        },

        listen : function(lock) {
            if(!MM.support.speechRecognition) return;

            var self = this;
            var statusIsPending = (self.status === 'pending');
            var statusIsListening= (self.status === 'listening');
            if (!lock) {
                if (statusIsPending || statusIsListening) {
                    self.stopListening();
                } else {
                    self.startListening();
                }
            } else {
                if (!self.is_locked && (statusIsPending || statusIsListening)) {
                    self._lockWhileRecording = true;
                    self.is_locked = true;
                } else if (self.is_locked) {
                    self.stopListening();
                } else {
                    self.startListening(true);
                }
            }
            this._updateUI();
        },

        pulse : function(volume) {
            var self = this;
            var scale = ((volume / 100) * 0.5) + 1.4;
            self.$mm_pulser.css('transform', 'scale(' + scale + ')');
        },

        postMessage : function(action, data) {
            parent.postMessage({
                action: action,
                source: 'mindmeld',
                data: data
            }, "*");
        },

        _historyHeight : function(scrollHeight) {
            if(scrollHeight > this._height * 0.8) scrollHeight = this._height * 0.8;
            if(scrollHeight < 270) scrollHeight = 270;
            return scrollHeight;
        },

        setupEditable : function(allowManualEntry) {
            var self = this;
            self.$historyList.on('click', '.on .tag', function() {
                var $this = $(this);
                var entityID = $this.data('entityId');
                var newValue = !(!!self.selectedEntityMap[entityID]);
                $this.toggleClass('selected', newValue);

                // don't focus on text
                self.$editable.blur();
                clearTimeout(self._textFocusTimeout);

                return false; // don't bubble up
            });

            self.$editable.hide();

            if (allowManualEntry) {

                self.$historyList.on('click', '.on', function() {
                    // Not already doing something, and not a prompt
                    var $prompt = self.$input.find('.mm-prompt');

                    if (!self.status && ($prompt.hasClass('mm-prompt-error') || !$prompt.length)) {
                        self.$editable.height(self.$input.height());
                        self.$input.hide();
                        $prompt.empty();
                        var text = self.$input.text().trim();
                        self.$editable.show();
                        self.$editable.focus();
                        self.$editable.val(text);
                    }
                });

                self.$editable.focusin(function() {
                    if (!self.status) {
                        // delay so we know it's not an entity click
                        self._textFocusTimeout = setTimeout(function() {
                            self.status = 'editing';
                        }, 300);
                    } else {
                        self.$editable.blur();
                        self.status = false;
                    }
                    return false;
                });

                self.$editable.focusout(function() {
                    self.$editable.hide();
                    self.$input.show();
                    self.status = false;
                });

                self.$editable.keypress(function (e) {
                    var keyCode = e.originalEvent.keyCode;
                    if (keyCode !== 13) {
                        // Update styling?
                        return;
                    }

                    // User pressed return
                    var text = self.$editable.val().trim();
                    self.$editable.blur();
                    self.$input.text(text);
                    self.submitText(text);

                    return false;
                });
            }
        },

        _prefix_raw : '',
        _prefix : function(rule) {
            if(!this._prefix_raw) {
                var styles = window.getComputedStyle(document.documentElement, ''),
                    pre = (Array.prototype.slice
                        .call(styles)
                        .join('')
                        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                        )[1];
                this._prefix_raw = (pre ? '-' + pre + '-' : '') + rule;
            }
            return this._prefix_raw;
        },

        submitText: function(text) {
            var self = this;
            self.status = false;

            var recording = self.confirmedRecording;
            if (recording.textEntryID) {
                MM.activeSession.textentries.delete(recording.textEntryID);
            }
            recording.transcript = text;
            self.$cards.addClass('loading');
            MM.activeSession.textentries.post({
                text: text,
                type: 'text',
                weight: 0.5
            }, function (response) {
                self.onTextEntryPosted(response);
            });
        },

        /*
         resizeResults: function(size) {
         this._height = size;
         this.$results.outerHeight(size);
         this.$history.outerHeight(this._historyHeight(size));
         },
         */

        lockWhileRecording : function() {
            this.is_locked = true;
            this._lockWhileRecording = false;
            MM.activeSession.setListenerConfig({ 'continuous': this.is_locked });
        },

        startListening : function(is_locked) {
            this.is_locked = !!is_locked;
            this.status = 'pending';
            this.is_first_start = true;
            this._currentTextEntries = [];
            MM.activeSession.setListenerConfig({ 'continuous': this.is_locked });
            MM.activeSession.listener.start();

            this._updateUI();
        },

        stopListening : function() {
            if(MM.support.speechRecognition) {
                MM.activeSession.listener.cancel();
                this.is_locked = false;
            }
            this._updateUI();
        },

        showResults : function(data) {
            this.results_length = data.length;
            this._updateCards(data);
            this._updateUI();
        },

        setTextEntries : function(data) {
            var self = this;
            $.each(data, function(k, textEntry) {
                if (typeof self._textEntryMap[textEntry.textentryid] === 'undefined') {
                    textEntry.entityIDs = [];
                    self._textEntryMap[textEntry.textentryid] = textEntry;
                }
            });
        },

        toggleEntitySelected : function(entityID) {
            var self = this;

            var entityText = self._entityMap[entityID].text;
            var similarEntities = self._similarEntityMap[entityText];
            for (var i = 0, l = similarEntities.length; i < l; i++) {
                var similarEntityID = similarEntities[i];
                var $tagsToToggle = $('.tag[data-entity-id="' + similarEntityID + '"]');
                if (self.selectedEntityMap[similarEntityID]) {
                    delete self.selectedEntityMap[similarEntityID];
                    $tagsToToggle.removeClass('selected');
                } else {
                    self.selectedEntityMap[similarEntityID] = true;
                    $tagsToToggle.addClass('selected');
                }
            }

            self._updateUI();
            self.getDocuments();
        },

        setEntities : function(data) {
            var self = this;
            var i = 0;

            self.$tags.empty();
            self._similarEntityMap = {};

            $.each(data, function(k, entity) {
                if (entity.entitytype === 'segment' ||
                    entity.entitytype === 'keyphrase') {
                    return; // ignore these entities
                }

                var text = entity.text;
                if (text.split(' ').length > 10) {
                    return; // ignore long entities
                }

                if (self._currentTextEntries.indexOf(entity.textentryid) === -1) {
                    return; // ignore entities from past text entries
                }

                var textEntry = self._textEntryMap[entity.textentryid];
                if (typeof textEntry !== 'undefined') {
                    textEntry.entityIDs.push(entity.entityid);
                } else {
                    UTIL.log('did not find text entry for entity');
                }
                self._entityMap[entity.entityid] = entity;

                // TODO(jj): should we look at type here as well as text
                var similarEntities = self._similarEntityMap[entity.text];
                if (typeof similarEntities === 'undefined') {
                    similarEntities = self._similarEntityMap[entity.text] = [];

                    // only create tag for first version of an entity
                    var $a = $('<a>', {
                        href: '#',
                        class: 'tag',
                        text: entity.text
                    });
                    self.$tags.append($a);
                    i++;
                    $a.attr('data-entity-id', entity.entityid);
                    self._entityMap[entity.entityid] = entity;

                    if (self.selectedEntityMap[entity.entityid]) {
                        $a.addClass('selected');
                    }
                }
                similarEntities.push(entity.entityid);
            });

            self.$tags.toggle(!!i);

            self.currentEntities = self.entitiesForTextEntry(self.confirmedRecording.textEntryID);
            self._restyleHistory();
        },

        entitiesForTextEntry : function(textEntryID, entities) {
            if (typeof textEntryID === 'undefined') {
                return [];
            }

            var self = this;
            var textEntry = self._textEntryMap[textEntryID];
            if (typeof entities === 'undefined') {
                entities = [];
            }
            if (typeof textEntry === 'undefined') {
                return entities;
            }
            for (var i = 0; i < textEntry.entityIDs.length; i++) {
                var entityID = textEntry.entityIDs[i];
                var entity = self._entityMap[entityID];
                entities.push(entity);
            }
            return entities;
        },

        _isotope_config : {
            itemSelector: '.card',
            sortBy: 'sort',
            layoutMode: 'masonry',
            filter: ':not(.removed)',
            getSortData: {
                sort: '[data-sort] parseInt'
            }
        },

        _createCard : function(doc) {
            var self = this;
            var $card = $('<a>', {
                class: 'card new',
                id: 'doc_' + doc.documentid,
                href: doc.originurl,
                target: self.config.cardAnchorTarget || '_parent'
            });
            $card.attr('data-document-id', doc.documentid);

            if (self.config.cardLayout === 'custom') {
                var html = self.cardTemplate(doc);
                $card.html(html);
            } else {
                var $title = $('<h2>', {
                    class: 'title',
                    html: doc.title
                });
                $card.append($title);

                var imageURL = false;
                if (typeof doc.image !== 'undefined') {
                    if (typeof doc.image.url !== 'undefined') {
                        imageURL = doc.image.url;
                    } else if (typeof doc.image.thumburl !== 'undefined') {
                        imageURL = doc.image.thumburl;
                    }
                }
                if (imageURL) {
                    var $image = $('<p>', {
                        class: 'image not-loaded'
                    });

                    $image.append($('<img>', {
                        src: imageURL
                    }));
                    $card.append($image);
                }

                var description;
                if (typeof doc.description === 'string') {
                    description = doc.description.substr(0, 150) + (doc.description.length > 150 ? "&hellip;" : "");
                } else {
                    description = "No description";
                }
                $card.append($('<p>', {
                    html: description,
                    class: 'description'
                }));

                // fields
                if (typeof self.config.cardFields !== 'undefined') {
                    function getFormattedString(format, value) {
                        switch (format) {
                            case 'date':
                                var date = new Date(value * 1000);
                                return (date.getMonth() + 1) + '/' + date.getDay() + '/' + date.getFullYear();
                            default:
                                return value.substr(0, 100) + (value.length > 100 ? "&hellip;" : "");
                        }
                    }

                    var cardFields = self.config.cardFields;
                    $.each(cardFields, function(k2, field) {
                        var value = doc[field.key] || field.placeholder;
                        if (typeof value !== 'undefined' && value !== '') {
                            // If a label is specified, add a label
                            if (typeof field.label !== 'undefined' && field.label !== '') {
                                var $label = $('<span>', {
                                    class: 'label',
                                    html: field.label
                                });
                            }
                            var $value = $('<span>', {
                                class: 'value'
                            });
                            // if we aren't using placeholder, format the string
                            if (value !== field.placeholder) {
                                value = getFormattedString(field.format, value);
                            } else {
                                $value.addClass('placeholder'); // other wise add placeholder class
                            }
                            $value.text(value);
                            var $field = $('<p>', {
                                class: 'mm-doc-field'
                            });
                            if (typeof field.class !== 'undefined' && field.class !== '') {
                                $field.addClass(field.class);
                            }
                            $field.append($label).append($value);
                            $card.append($field);
                        }
                    });
                }
            }
            return $card;
        },

        _updateCards : function(data) {
            var self = this;
            var newCards = [];

            // Remove the "No results" message if present
            $('.no-results', this.$cards).remove(); // TODO: animate this nicely?

            // Remove the cards filtered out last time
            // Leave one card to prevent the single column isotope bug
            $('.card.removed:not(.single-column-fix)', this.$cards).remove();

            // Mark current to be deleted; we'll un-mark them if they exist
            $('.card', this.$cards).each(function(k, card) {
                var $card = $(card);
                $card.addClass('to-delete');
                $card.attr('data-sort', k + 1000);
            });

            $.each(data, function(k, doc) {
                // Card exists, so update sort order and keep it
                if ($('#doc_' + doc.documentid).length) {
                    $('#doc_' + doc.documentid).removeClass('to-delete').attr('data-sort', k);
                    return true;
                }

                // Card doesn't exist, so create it. (TODO: Maybe use a templating system?)
                var $card = self._createCard(doc);
                $card.attr('data-sort', k);
                newCards.push($card);
            });

            // Filter out unused cards (we don't delete yet b/c we want them to fade out)
            $('.card.to-delete', this.$cards).removeClass('to-delete').addClass('removed');

            var $newCards = $.makeArray(newCards);

            if (!$('.card:not(.single-column-fix)', self.$cards).length) {
                if (self.$cards.hasClass('isotope')) {
                    self.$cards.isotope('destroy');
                }

                // No isotope instance yet; create it.

                self.$cards.append($newCards);
                self.$cards.isotope(self._isotope_config);
                self.$cards.removeClass('loading');
                self.$cards.imagesLoaded(function() {
                    $('.not-loaded').removeClass('not-loaded');
                    setTimeout(function() {
                        self.$cards.isotope(self._isotope_config);
                    }, 10);
                });
            } else {
                // Isotope already exists, append cards to it

                this.$cards.append( $newCards );

                // Single out the new cards, and 'append' them to isotope (they're already in the DOM)
                $newCards = $('.new', self.$cards);
                self.$cards.isotope( 'appended' , $newCards );
                self.$cards.isotope( 'updateSortData' ).isotope(self._isotope_config);
                self.$cards.removeClass('loading');
                self.$cards.imagesLoaded(function() {
                    $('.not-loaded').removeClass('not-loaded');
                    setTimeout(function() {
                        self.$cards.isotope(self._isotope_config);
                    }, 10);
                });
            }

            // TODO: animate this nicely?
            if ($('.card:not(.removed)', this.$cards).length === 0) {
                this.$cards.append($('<div>', {
                    class: 'no-results',
                    html: 'No results'
                }));
            }

            $('.new', this.$cards).removeClass('new');
        },

        appendHistory : function(recording) {
            if (recording.transcript) {
                this._recordings.push(recording);

                // Append to the history
                var $new_history = $('<li>', {
                    data: {
                        'recording': recording,
                    },
                    html: this.$input.html(),
                });

                this.$input.before($new_history);
                console.log($new_history);

                // Create the new one
                this.$input.html("&nbsp;");

                var self = this;
                setTimeout(function() {
                    self.$input.removeClass('hide');
                    self.scrollHistory();
                }, 100);

                this._restyleHistory();
                this._updateUI();
            }
        },

        lettering : function($el, text, parentClass) {
            $el.empty();
            text = text.split('');
            var $el_parent = $('<div>', {'class': parentClass});
            for(var i=0; i < text.length; i++) {
                $el_parent.append($('<span>', { text: text[i] }));
            }
            $el.append($el_parent);
        },

        _restyleHistory: function () {
            var self = this, i;
            //this.$historyList.empty();
            this.$historyList.find('li').each(function() {
                var recording = $(this).data('recording');
                if(!recording) return;

                // entities for recording
                var entities = self.entitiesForTextEntry(recording.textEntryID);

                var stats = highlightEntities(entities, recording.transcript);
                var $div = $('<div>', {'html': stats.markup});

                var $li = $(this);
                $li.empty();
                $li.append($div);
                $li.attr('data-text-entry-id', recording.textEntryID);

                $li.find('.tag').each(function(k, $tag) {
                    var $this = $(this);
                    var entityID = $this.data('entityId');
                    if (self.selectedEntityMap[entityID]) {
                        $this.addClass('selected');
                    } else {
                        $this.removeClass('selected');
                    }
                });

                if (i === self._recordings.length - 1 && self.recordings_length !== self._recordings.length) {
                    (function($div) {
                        setTimeout(function () {
                            $div.addClass('on');
                        }, 100);
                    })($div);
                } else {
                    $div.addClass('old');
                }
            });

            self.scrollHistory();

            // So we can tell if there's a new one
            this.recordings_length = this._recordings.length;
        },

        scrollHistory : function() {
            var self = this;
            self.$historyData.scrollTop(self.$historyData[0].scrollHeight);
        },

        _documentLock : {
            canRequestDocuments: function() {
                return (this.lastDocumentsRequest + 500 < Date.now());
            },
            lastDocumentsRequest: 0
        },

        _documentsCache: {},

        _numColumns : function () {
            var self = this;
            var cardWidth = 218;
            var cardPadding = 20;
            var widthRemaining = self.$cards.width() - cardPadding;
            var numCols = 0;
            while (widthRemaining >= 0) {
                numCols++;
                widthRemaining -= cardWidth + cardPadding;
            }
            return numCols;
        },

        _numDocuments : function () {
            var self = this;
            if (typeof self.config.numResults !== 'undefined') {
                return self.config.numResults;
            }

            var numCols = self._numColumns();
            var numDocs = Math.max(numCols * 2, 8);
            if (numDocs % numCols !== 0) {
                numDocs += numCols - (numDocs % numCols);
            }
            return numDocs;
        },

        getDocuments : function() {
            UTIL.log('getting documents');
            var self = this;

            var queryParams = { limit: self.config.numResults || 14 };
            var requestKey = 'default';
            var selectedEntityIDs = Object.keys(MMVoice.selectedEntityMap);
            if (selectedEntityIDs.length > 0) {
                requestKey = JSON.stringify(selectedEntityIDs);
                queryParams.entityids = requestKey;
            } else {
                queryParams.textentryids = JSON.stringify(self._currentTextEntries);
            }

            // Return cached response if it exists and has not expired (expire time of 10 minutes)
            if (self._documentsCache.hasOwnProperty(requestKey) &&
                Date.now() - self._documentsCache[requestKey].requestTime < 600000) {
                onSuccess(self._documentsCache[requestKey].result, true);
                return;
            }

            if (!self._documentLock.canRequestDocuments()) {
                return;
            }

            var requestTime = this._documentLock.lastDocumentsRequest = Date.now();
            function onSuccess(result, cached) {
                cached = !!cached;

                if (!cached) {
                    self._documentsCache[requestKey] = {
                        result: result,
                        requestTime: requestTime
                    };
                    UTIL.log("Got documents");
                } else {
                    UTIL.log("Got documents from cache");
                }

                var numDocuments = self._numDocuments();
                if (result.data.length > numDocuments) {
                    result.data.splice(numDocuments, result.data.length - numDocuments);
                }
                MMVoice.showResults(result.data);
            }

            function onError(error) {
                UTIL.log("Error getting documents:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.activeSession.documents.get(queryParams, onSuccess, onError);
        },

        resize : function(e) {
            if(this.is_results) {
                var size = this.$mm_parent.height();
                this._height = size;
                this.$results.outerHeight(size);
                this.$history.outerHeight(this._historyHeight(size));
            }
        },

        update_text : function() {
            var self = this;

            var fullText = self.confirmedRecording.transcript + self.pendingRecording.transcript;

            if (fullText.length) {
                this.$input.empty();
            }

            // TODO: animate transition to highlighted entities ?
            var confirmedStats = highlightEntities(this.currentEntities, this.confirmedRecording.transcript);
            this.$input.append($('<span>', {
                html: confirmedStats.markup
            }));
            this.$input.append($('<span>', {
                class: 'pending',
                html: self.pendingRecording.transcript
            }));
            this.$input.attr('data-text', fullText);
        },

        onTextEntryPosted: function(response) {
            var self = MMVoice;
            UTIL.log('text entry posted');
            var textEntryID = MMVoice.confirmedRecording.textEntryID = response.data.textentryid;
            self.$input.data('textentryid', textEntryID);
            self._currentTextEntries.push(textEntryID);
            delete self._documentsCache['default'];
            self.selectedEntityMap = {};
            MMVoice.getDocuments();
        },

        _listenerConfig : {
            onResult: function(result /*, resultIndex, results, event  <-- unused */) {
                UTIL.log("Listener: onResult", result);
                if (result.final) {
                    MMVoice.makeNewRecordings(result.transcript);
                } else {
                    MMVoice.pendingRecording.transcript = result.transcript;
                }
                MMVoice._updateUI();
            },
            onStart: function(event) {
                UTIL.log("Listener: onStart");
                if (MMVoice.is_first_start) {
                    MMVoice.makeNewRecordings();
                    MMVoice.is_first_start = false;
                    MMVoice.status = 'listening';
                    MMVoice._updateUI();
                    startVolumeMonitor();
                    MMVoice.$cards.addClass('loading');
                }
            },
            onEnd: function(event) {
                UTIL.log("Listener: onEnd");
                var self = this;
                var pendingTranscript = MMVoice.pendingRecording.transcript;
                if (pendingTranscript.length > 0) {
                    MMVoice.makeNewRecordings(pendingTranscript);
                } else {
                    MMVoice.$cards.removeClass('loading');
                }
                if (MMVoice.is_locked) {
                    if (MMVoice._lockWhileRecording) {
                        MMVoice.lockWhileRecording();
                    }
                    MM.activeSession.listener.start();
                } else {
                    MMVoice.status = false;

                    var fullText = MMVoice.confirmedRecording.transcript + MMVoice.pendingRecording.transcript;
                    if(!fullText.length) {
                        MMVoice.lettering(MMVoice.$input, 'Whoops, we didn\'t get that...', 'mm-prompt mm-prompt-error');
                    }

                    UTIL.log('full text', fullText);

                    // Play the sound
                    $('#audio-done')[0].play();
                }

                MMVoice._updateUI();
            },
            onError: function(event) {
                if (event.error === 'aborted') {
                    return; // ignore aborted errors
                }
                UTIL.log("Listener: onError - ", event.error, event.message);
                switch (event.error) {
                    case 'not-allowed':
                    case 'service-not-allowed':
                        // TODO: do something here
                        break;

                    case 'language-not-supported':
                    // TODO: handle this when we allow setting language

                    // Ignore the rest for now
                    case 'bad-grammar':
                    case 'network':
                    case "no-speech":
                    case 'audio-capture':
                    case 'service-not-allowed':
                        break;
                    default:
                        break;
                }

            },
            onTextEntryPosted: function(response) {
                MMVoice.onTextEntryPosted(response);
            }
        },

        _changed_cached : {},

        // This will broadcast updated variables to the modal
        _isChanged : function(name) {
            var currentValue = this[name];
            if (typeof this[name] === 'object') {
                currentValue = JSON.stringify(this[name]);
            }
            if (this._changed_cached[name] != currentValue) {
                this._changed_cached[name] = currentValue;
                return true;
            }
            return false;
        },

        // Do a dirty check of all variables to see what changed
        _getUpdated : function(items) {
            var self = this;
            var updated = {};
            $.each(items, function(k, v) {
                if (typeof v !== 'function' && k[0] != "_" && k[0] != "$") {
                    if (self._isChanged(k)) {
                        updated[k] = v;
                    }
                }
            });
            return updated;
        },

        // Update the UI to reflect the site
        _updateUI : function() {
            var self = this;
            var updates = self._getUpdated(this);

            if('recordings_length' in updates) {
                if(updates.recordings_length == 1) {
                    self.$body.addClass('hashistory');
                    self.$historyButton.show();
                }
                if(updates.recordings_length >= 1) {
                    self.$mm_button.addClass('shadow');
                }
            }

            if('is_voice_ready' in updates) {
                if(self.do_on_voice_ready_fn) {
                    self.do_on_voice_ready_fn();
                    delete self.do_on_voice_ready_fn;
                }
            }

            if('results_length' in updates) {
                if(updates.results_length >= 0 && !self.is_results) {
                    self.$body.addClass('results');
                    self.$mm_parent.addClass('results');
                    self.is_results = true;
                    self.resize();
                }
            }

            if('status' in updates) {
                self.$mm_button.removeClass('status-pending');
                self.$mm_button.removeClass('status-listening');
                self.status = updates.status;
                if (updates.status !== false) {
                    self.$mm_button.addClass('status-' + updates.status);
                }
                if (updates.status === 'listening') {
                    self.$input.empty();
                    self.lettering(self.$input, 'Start speaking now...', 'mm-prompt');
                    //this.$mm.addClass('open');
                }
                if (updates.status === false) {
                    self.$mm_pulser.css('transform', 'scale(0)');
                }

                setTimeout(function() {
                    self.$mm_alert.toggleClass('on', updates.status === 'pending');
                }, 10);
            }

            if('is_locked' in updates) {
                self.$mm_button.toggleClass('lock', updates.is_locked);
            }

            var textNeedsUpdate = false;
            if ('currentEntities' in updates) {
                self.currentEntities = updates.currentEntities;
                textNeedsUpdate = true;
            }

            var hasConfirmedRecording = 'confirmedRecording' in updates;
            var hasPendingRecording = 'pendingRecording' in updates;
            if (hasConfirmedRecording) {
                self.confirmedRecording = updates.confirmedRecording;
            }
            if (hasPendingRecording) {
                self.pendingRecording = updates.pendingRecording;
            }
            textNeedsUpdate = textNeedsUpdate || hasConfirmedRecording || hasPendingRecording;

            if (textNeedsUpdate && self.status !== 'editing') {
                self.update_text();
            }

        }

    };

    MMVoice.onConfig = function() {
        MMVoice._currentTextEntries = [];

        var voiceNavOptions = MMVoice.config;

        var initialText;
        if (voiceNavOptions.startQuery === null) {
            initialText = 'Enable the microphone...';
        }
        else {
            initialText = voiceNavOptions.startQuery;
        }
        $('#initialText').text(initialText);

        if (MMVoice.is_voice_ready && voiceNavOptions.startQuery !== null) { // we have init before
            MMVoice.submitText(voiceNavOptions.startQuery);
            MMVoice._updateUI();
        }
        else {
            if (typeof MMVoice.config.baseZIndex !== 'undefined') {
                var baseZIndex = parseInt(MMVoice.config.baseZIndex);
                MMVoice.$mm_button.css('z-index', baseZIndex + 100);
                MMVoice.$mm_button.find('#icon-microphone, #icon-mute, #icon-lock').css('z-index', baseZIndex + 10);
                MMVoice.$mm_alert.css('z-index', baseZIndex + 1000);
            }

            if (MMVoice.config.resetCardsCSS) {
                $('#cards-css').remove();
            }

            if (typeof MMVoice.config.customCSSURL !== 'undefined') {
                var cssLink = document.createElement('link');
                cssLink.href = MMVoice.config.customCSSURL;
                cssLink.rel = 'stylesheet';
                cssLink.type = 'text/css';
                document.head.appendChild(cssLink);
            }

            if (typeof MMVoice.config.customCSS !== 'undefined') {
                var cssStyle = document.createElement('style');
                cssStyle.type = 'text/css';
                cssStyle.innerHTML = MMVoice.config.customCSS;
                document.head.appendChild(cssStyle);
            }

            if (MMVoice.config.cardLayout === 'custom') {
                try {
                    MMVoice.cardTemplate = _.template(MMVoice.config.cardTemplate);
                } catch (e) {
                    UTIL.log('Voice Navigator was unable to parse card template');
                    MMVoice.config.cardLayout = 'default';
                }
            }

            var MM_USER_ID_PREFIX = 'vnu';
            var MM_USER_NAME = 'Voice Navigator User';
            var MM_USER_ID_COOKIE = 'voice_navigator_user_id';

            var MM_CONFIG = {
                appid: voiceNavOptions.appID,
                onInit: onMMInit
            };
            if (typeof voiceNavOptions.cleanUrl !== 'undefined') {
                MM_CONFIG.cleanUrl = voiceNavOptions.cleanUrl;
            }
            if (typeof voiceNavOptions.fayeClientUrl !== 'undefined') {
                MM_CONFIG.fayeClientUrl = voiceNavOptions.fayeClientUrl;
            }
            MM.init(MM_CONFIG);
        }

        function onMMInit () {
            if (voiceNavOptions.mmCredentials) {
                // No need to fetch token, user, or create session
                MM.setToken(voiceNavOptions.mmCredentials.token);
                MM.setActiveUserID(voiceNavOptions.mmCredentials.userID);
                MM.setActiveSessionID(voiceNavOptions.mmCredentials.sessionID);
                onSessionStart();
            }
            else {
                getToken();
            }
        }

        function guid() {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            }));
        }

        function getUserID() {
            // get user id cookie
            var userID = $.cookie(MM_USER_ID_COOKIE);
            if (typeof userID === 'undefined') {
                userID = MM_USER_ID_PREFIX + '-' + guid();
                $.cookie(MM_USER_ID_COOKIE, userID);
            }
            return userID;
        }

        function getToken() {
            function onSuccess(result) {
                UTIL.log('Successfully got token');
                setUser(result.user.userid);
            }
            function onError (error) {
                UTIL.log('Token was not valid');
            }

            var userID = getUserID();
            MM.getToken({
                anonymous: {
                    userid: userID,
                    name: MM_USER_NAME,
                    domain: window.location.hostname
                }
                //*/
            }, onSuccess, onError);
        }

        function setUser(userID) {
            function onSuccess(result) {
                createSession();
            }
            function onError (error) {
                UTIL.log("Error setting user session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveUserID(userID, onSuccess, onError);
        }

        function createSession() {
            function onSuccess(result) {
                setSession(result.data.sessionid);
            }
            function onError (error) {
                UTIL.log("Error creating new session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            var date = new Date();
            var sessionName = "Voice Navigator - " + date.toTimeString() + " " + date.toDateString();
            MM.activeUser.sessions.post({
                name: sessionName,
                privacymode: 'inviteonly'
            }, onSuccess, onError);
        }

        function setSession(sessionID) {
            function onError (error) {
                UTIL.log("Error setting session:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.setActiveSessionID(sessionID, onSessionStart, onError);
        }

        function onSessionStart () {
            subscribeToTextEntries();
            subscribeToEntities();
            setupSessionListener();
            MMVoice.is_voice_ready = true;
            MMVoice._updateUI();
        }

        function subscribeToTextEntries() {
            function onSuccess(result) {
                UTIL.log("Subscribed to text entries!");
                // Optionally submit start query
                if (voiceNavOptions.startQuery !== null) {
                    MMVoice.submitText(voiceNavOptions.startQuery);
                }
            }
            function onError() {
                UTIL.log("Error subscribing to text entries:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.activeSession.textentries.onUpdate(function(result) {
                MMVoice.setTextEntries(result.data);
            }, onSuccess, onError);
        }
        function subscribeToEntities() {
            function onSuccess(result) {
                UTIL.log("Subscribed to entities!");
            }
            function onError (error) {
                UTIL.log("Error subscribing to entities:  (Type " + error.code +
                    " - " + error.type + "): " + error.message);
            }
            MM.activeSession.entities.onUpdate(function(result) {
                UTIL.log('Received entities update');
                MMVoice.setEntities(result.data);
            }, onSuccess, onError);
        }

        function setupSessionListener() {
            MM.activeSession.setListenerConfig(MMVoice._listenerConfig);
        }
    };

    $(function () {
        MMVoice.init();
    });

    var a = {
        stream : false,
        context : false,
        analyzer : false,
        frequencies : false,
        times : false,
        audio_started : false
    };
    function startVolumeMonitor() {
        if (!a.audio_started) {
            // GETUSERMEDIA INPUT
            navigator.getMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            window.AudioContext = window.AudioContext || window.webkitAudioContext;

            a.context = new AudioContext();
            a.analyzer = a.context.createAnalyser();
            a.analyzer.smoothingTimeConstant = 0.18;
            a.analyzer.fftSize = 256;

            a.frequencies = new Uint8Array( a.analyzer.frequencyBinCount );
            a.times = new Uint8Array( a.analyzer.frequencyBinCount );

            navigator.getMedia ( { audio: true }, microphoneReady, function(err) {
                UTIL.log("The following error occured: " + err);
            });

            a.audio_started = true;

        } else {
            loop();
        }

        function microphoneReady(stream) {
            a.stream = stream;
            var stream_source = a.context.createMediaStreamSource( stream );
            stream_source.connect( a.analyzer );
            loop();
        }

        function loop() {
            if (!MMVoice.status || status === 'editing') {
                // stop recording
                a.stream.stop();
                a.audio_started = false;
                return;
            }

            a.analyzer.getByteFrequencyData( a.frequencies );
            a.analyzer.getByteTimeDomainData( a.times );

            MMVoice.pulse(getVolume());

            setTimeout(loop, 75);
        }

        function getVolume() {
            return parseInt( getFreqencyRange( 0, a.analyzer.frequencyBinCount - 1 ), 10 );
        }

        function getFreqencyRange(from, to) {
            var volume = 0;

            for ( var i = from; i < to; i++ ) {
                volume += a.frequencies[i];
            }

            return volume / ( to - from );
        }
    }
})();
