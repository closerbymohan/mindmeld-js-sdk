;(function () {

// jQuery
/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
    if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});


// Custom jQuery UI with autocomplete widget
(function(t,e){function n(e,n){var r,s,o,a=e.nodeName.toLowerCase();return"area"===a?(r=e.parentNode,s=r.name,e.href&&s&&"map"===r.nodeName.toLowerCase()?(o=t("img[usemap=#"+s+"]")[0],!!o&&i(o)):!1):(/input|select|textarea|button|object/.test(a)?!e.disabled:"a"===a?e.href||n:n)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}var r=0,s=/^ui-id-\d+$/;t.ui=t.ui||{},t.extend(t.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({focus:function(e){return function(n,i){return"number"==typeof n?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),i&&i.call(e)},n)}):e.apply(this,arguments)}}(t.fn.focus),scrollParent:function(){var e;return e=t.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(t.css(this,"position"))&&/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(t.css(this,"overflow")+t.css(this,"overflow-y")+t.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!e.length?t(document):e},zIndex:function(n){if(n!==e)return this.css("zIndex",n);if(this.length)for(var i,r,s=t(this[0]);s.length&&s[0]!==document;){if(i=s.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(r=parseInt(s.css("zIndex"),10),!isNaN(r)&&0!==r))return r;s=s.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++r)})},removeUniqueId:function(){return this.each(function(){s.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(n){return!!t.data(n,e)}}):function(e,n,i){return!!t.data(e,i[3])},focusable:function(e){return n(e,!isNaN(t.attr(e,"tabindex")))},tabbable:function(e){var i=t.attr(e,"tabindex"),r=isNaN(i);return(r||i>=0)&&n(e,!r)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(n,i){function r(e,n,i,r){return t.each(s,function(){n-=parseFloat(t.css(e,"padding"+this))||0,i&&(n-=parseFloat(t.css(e,"border"+this+"Width"))||0),r&&(n-=parseFloat(t.css(e,"margin"+this))||0)}),n}var s="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(n){return n===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,r(this,n)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,r(this,e,!0,n)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(n){return arguments.length?e.call(this,t.camelCase(n)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.support.selectstart="onselectstart"in document.createElement("div"),t.fn.extend({disableSelection:function(){return this.bind((t.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(t){t.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),t.extend(t.ui,{plugin:{add:function(e,n,i){var r,s=t.ui[e].prototype;for(r in i)s.plugins[r]=s.plugins[r]||[],s.plugins[r].push([n,i[r]])},call:function(t,e,n){var i,r=t.plugins[e];if(r&&t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType)for(i=0;r.length>i;i++)t.options[r[i][0]]&&r[i][1].apply(t.element,n)}},hasScroll:function(e,n){if("hidden"===t(e).css("overflow"))return!1;var i=n&&"left"===n?"scrollLeft":"scrollTop",r=!1;return e[i]>0?!0:(e[i]=1,r=e[i]>0,e[i]=0,r)}})})(jQuery);(function(t,e){var i=0,s=Array.prototype.slice,n=t.cleanData;t.cleanData=function(e){for(var i,s=0;null!=(i=e[s]);s++)try{t(i).triggerHandler("remove")}catch(o){}n(e)},t.widget=function(i,s,n){var o,r,h,a,l={},c=i.split(".")[0];i=i.split(".")[1],o=c+"-"+i,n||(n=s,s=t.Widget),t.expr[":"][o.toLowerCase()]=function(e){return!!t.data(e,o)},t[c]=t[c]||{},r=t[c][i],h=t[c][i]=function(t,i){return this._createWidget?(arguments.length&&this._createWidget(t,i),e):new h(t,i)},t.extend(h,r,{version:n.version,_proto:t.extend({},n),_childConstructors:[]}),a=new s,a.options=t.widget.extend({},a.options),t.each(n,function(i,n){return t.isFunction(n)?(l[i]=function(){var t=function(){return s.prototype[i].apply(this,arguments)},e=function(t){return s.prototype[i].apply(this,t)};return function(){var i,s=this._super,o=this._superApply;return this._super=t,this._superApply=e,i=n.apply(this,arguments),this._super=s,this._superApply=o,i}}(),e):(l[i]=n,e)}),h.prototype=t.widget.extend(a,{widgetEventPrefix:r?a.widgetEventPrefix||i:i},l,{constructor:h,namespace:c,widgetName:i,widgetFullName:o}),r?(t.each(r._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,h,i._proto)}),delete r._childConstructors):s._childConstructors.push(h),t.widget.bridge(i,h)},t.widget.extend=function(i){for(var n,o,r=s.call(arguments,1),h=0,a=r.length;a>h;h++)for(n in r[h])o=r[h][n],r[h].hasOwnProperty(n)&&o!==e&&(i[n]=t.isPlainObject(o)?t.isPlainObject(i[n])?t.widget.extend({},i[n],o):t.widget.extend({},o):o);return i},t.widget.bridge=function(i,n){var o=n.prototype.widgetFullName||i;t.fn[i]=function(r){var h="string"==typeof r,a=s.call(arguments,1),l=this;return r=!h&&a.length?t.widget.extend.apply(null,[r].concat(a)):r,h?this.each(function(){var s,n=t.data(this,o);return n?t.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,a),s!==n&&s!==e?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):e):t.error("no such method '"+r+"' for "+i+" widget instance"):t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var e=t.data(this,o);e?e.option(r||{})._init():t.data(this,o,new n(r,this))}),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this.bindings=t(),this.hoverable=t(),this.focusable=t(),s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,s){var n,o,r,h=i;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof i)if(h={},n=i.split("."),i=n.shift(),n.length){for(o=h[i]=t.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)o[n[r]]=o[n[r]]||{},o=o[n[r]];if(i=n.pop(),1===arguments.length)return o[i]===e?null:o[i];o[i]=s}else{if(1===arguments.length)return this.options[i]===e?null:this.options[i];h[i]=s}return this._setOptions(h),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var o,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=o=t(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,o=this.widget()),t.each(n,function(n,h){function a(){return i||r.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof h?r[h]:h).apply(r,arguments):e}"string"!=typeof h&&(a.guid=h.guid=h.guid||a.guid||t.guid++);var l=n.match(/^(\w+)\s*(.*)$/),c=l[1]+r.eventNamespace,u=l[2];u?o.delegate(u,c,a):s.bind(c,a)})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,o,r=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var r,h=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),r=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),r&&t.effects&&t.effects.effect[h]?s[e](n):h!==e&&s[h]?s[h](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var o,a=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(o!==e)return o;var i,s,n=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=n.children()[0];return t("body").append(n),i=a.offsetWidth,n.css("overflow","scroll"),s=a.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),o=i-s},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var o,p,g,m,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),k=(e.collision||"flip").split(" "),D={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,g=_.height,m=_.offset,v=t.extend({},m),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),D[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=g:"center"===e.at[1]&&(v.top+=g/2),o=i(D.at,p,g),v.left+=o[0],v.top+=o[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),x=u+f+s(this,"marginRight")+w.width,C=d+_+s(this,"marginBottom")+w.height,I=t.extend({},v),P=i(D.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?I.left-=u:"center"===e.my[0]&&(I.left-=u/2),"bottom"===e.my[1]?I.top-=d:"center"===e.my[1]&&(I.top-=d/2),I.left+=P[0],I.top+=P[1],t.support.offsetFractions||(I.left=h(I.left),I.top=h(I.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[k[i]]&&t.ui.position[k[i]][s](I,{targetWidth:p,targetHeight:g,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:x,collisionHeight:C,offset:[o[0]+P[0],o[1]+P[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=m.left-I.left,s=i+p-u,n=m.top-I.top,o=n+g-d,h={target:{element:b,left:m.left,top:m.top,width:p,height:g},element:{element:c,left:I.left,top:I.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>o?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>g&&g>r(n+o)&&(h.vertical="middle"),h.important=a(r(i),r(s))>a(r(n),r(o))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(I,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-o-n;e.collisionWidth>o?h>0&&0>=l?(i=t.left+h+e.collisionWidth-o-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+o-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=a(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,o=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-o-n;e.collisionHeight>o?h>0&&0>=l?(i=t.top+h+e.collisionHeight-o-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+o-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=a(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,a=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-a-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-a-o,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,a=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-a-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-a-o,t.top+p+f+g>c&&(0>s||r(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-h,t.top+p+f+g>u&&(i>0||u>r(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,o,a=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(a?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},a&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)e.style[o]=s[o];e.appendChild(r),i=a||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);(function(t){t.widget("ui.autocomplete",{version:"1.10.4",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,r="input"===n;this.isMultiLine=o?!0:r?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[o||r?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,undefined;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:case o.NUMPAD_ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),undefined;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),undefined):(this._searchTimeout(t),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(t),this._change(t),undefined)}}),this._initSource(),this.menu=t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];t(e.target).closest(".ui-menu-item").length||this._delay(function(){var e=this;this.document.one("mousedown",function(s){s.target===e.element[0]||s.target===i||t.contains(i,s.target)||e.close()})})},menufocus:function(e,i){if(this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",e,{item:s})?e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(t,e){var i=e.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",t,{item:i})&&this._value(i.value),this.term=this._value(),this.close(t),this.selectedItem=i}}),this.liveRegion=t("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertBefore(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):undefined},_search:function(t){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({label:e.label||e.value,value:e.value||e.label},e)})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<a>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[t](e),undefined):(this.search(null,e),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var e;this._superApply(arguments),this.options.disabled||this.cancelSearch||(e=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.text(e))}})})(jQuery);(function(t){t.widget("ui.menu",{version:"1.10.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&t(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,o,a,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",o=String.fromCharCode(e.keyCode),a=!1,clearTimeout(this.filterTimer),o===n?a=!0:o=n+o,r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=a&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(o=String.fromCharCode(e.keyCode),r=RegExp("^"+i(o),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=o,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})})(jQuery);

}());

var MM = window.MM || {};
MM.loader = MM.loader || {};
MM.loader.$jq = jQuery.noConflict(true);
( function ($) {

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
var MM = ( function ($, Faye) {


    /**
     * MM is the primary interface to all MindMeld JavaScript SDK functionality. Call {@link MM#init} before anything
     * else. Next obtain a token via {@link MM#getToken} to start making API calls.
     *
     * @namespace
     */
    var MM = window.MM || {};

    /**
     * MindMeld SDK Version
     *
     * @type {string}
     * @static
     * @private
     */
    Object.defineProperty(MM, 'version', {
        value: '2.3.3',
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
(function ($, MM, undefined) {

    $.widget('mindmeld.mmautocomplete', $.ui.autocomplete,  {
        _truncateText: function (text, length, end) {
            if(end === undefined){
                end = '...';
            }
            if(text.length <= length || text.length - end.length <= length){
                return text;
            }
            else{
                var emIndex = text.indexOf('<em>');
                if (emIndex !== -1 ){ // snippet, need to truncate <em> tags carefully
                    text = this._getTruncatedEmString(text, length - end.length) + end;
                }
                else {
                    text = String(text).substring(0, length - end.length) + end;
                }
                return text;
            }
        },

        // Attempts to return the maximum # of characters containing valid <em> tags
        // within a maxLength
        _getTruncatedEmString: function (string, maxLength) {
            var emRegex = /<em>\S+<\/em>/; // match strings with <em>html tag</em>
            var emMatches = emRegex.exec(string);

            var emIndex = emMatches.index; // index of first match
            var emString = emMatches[0]; // full string match: '<em>html tag</em>
            var emLength = emString.length;
            var remainingLength = maxLength - emLength;
            var startIndex = Math.max(0, emIndex - remainingLength);
            var beforeEmString = string.substr(startIndex, Math.min(remainingLength, emIndex)); // prepend up to maxLength number of characters before <em> tag
            var truncated = beforeEmString + emString;
            if (truncated.length < maxLength) { // we can get more characters!
                remainingLength = maxLength - truncated.length;
                var endFirstEmIndex = emIndex + emLength;
                var nextEmIndex = string.indexOf('<em>', endFirstEmIndex);
                if (nextEmIndex !== -1 ) {
                    truncated += string.substr(endFirstEmIndex, Math.min(remainingLength, nextEmIndex - endFirstEmIndex));
                }
                else {
                    truncated += string.substr(endFirstEmIndex, remainingLength);
                }
            }
            return truncated;
        },

        _renderItem: function (ul, item) {
            var liItem = null;
            if (item.noResult) {
                liItem = $('<li>', {class:'noResultItem'})
                    .append(
                        $('<a>')
                            .append(
                                $('<div>', {class:'noResultContainer'})
                                .append(
                                    $('<span>', {class: 'noResultText'}).html('No results')
                                )
                            )
                    )
            }
            else {
                var textBlurb = item.document.snippet ||
                    item.document.description ||
                    item.document.text;
                var image = null;
                if (item.document.image) {
                    image = item.document.image.thumburl || item.document.image.url || null;
                }

                var itemContent;
                if (this.options.images && image) {
                    itemContent = this._getItemContentWithImage(image, textBlurb);
                }
                else {
                    itemContent = this._getItemContentWithoutImage(textBlurb);
                }
                liItem = $('<li>', {class: 'docListItem'})
                    .append(
                        $('<a>', {href: item.document.originurl})
                            .append(
                                $('<div>', {class: 'docListWrapper'})
                                    .append(
                                        $('<span class="docTitle">' + item.document.title + '</span>')
                                    )
                                    .append(
                                        itemContent
                                )
                            )
                    );
            }
            return liItem.appendTo(ul);
        },

        _getItemContentWithImage: function (imgSrc, textBlurb) {
            textBlurb = this._truncateText(textBlurb, 75);
            return $('<div>', {class: 'docContentWithImage'})
                .append(
                    $('<div>', {class: 'docImg'})
                        .append(
                        $('<img>', {class: 'docImgFile', src: imgSrc})
                    )
                )
                .append(
                    $('<div>', {class: 'docDetails'})
                        .append(
                        $('<p class="textBlurb">' + textBlurb + '</p>')
                    )
                );
        },
        _getItemContentWithoutImage: function (textBlurb) {
            textBlurb = this._truncateText(textBlurb, 130);
            return $('<div>', {class: 'docContentWithoutImage'})
                .append(
                    $('<p class="textBlurb">' + textBlurb + '</p>')
                );
        }
    });

    $.widget('mindmeld.searchwidget', {

        options: {
            images: false,
            voiceNavigatorEnabled: false,
            onMMSearchInitialized: function () {},
            onMMSearchError: function () {}
        },

        _create: function () {
            $('<div id="mm-results" style="position: absolute;"></div>').appendTo('body');
            this.queryCache = {};
            this.numQueriesCached = 0;
            this._initMM();
            this._initialized = false;
        },

        initialized: function () {
            return this._initialized;
        },

        /**
         * Updates this.options with config from MM.widgets.config.search
         * @private
         */
        _setWidgetOptions: function () {
            for (var widgetOption in MM.widgets.config.search) {
                this.options[widgetOption] = MM.widgets.config.search[widgetOption];
            }
        },

        _validateConfig: function () {
            return (! $.isEmptyObject(MM.widgets) && ! ($.isEmptyObject(MM.widgets.config)));
        },

        _initMM: function () {
            if (this._validateConfig()) {
                this._setWidgetOptions();
                var appID = MM.widgets.config.appID;
                if (! this._validateString(appID, 40)) {
                    this.options.onMMSearchError('Please supply a valid appid');
                    return;
                }
                var self = this;
                var config = {
                    appid: appID,
                    onInit: onMMInit
                };
                if (MM.widgets.config.cleanUrl !== undefined) {
                    config.cleanUrl = MM.widgets.config.cleanUrl;
                }
                if (MM.widgets.config.fayeClientUrl !== undefined) {
                    config.fayeClientUrl = MM.widgets.config.fayeClientUrl;
                }
                MM.init(config);

                function onMMInit () {
                    MM.getToken(
                        {
                            anonymous: {
                                userid: 'MMSearchWidgetUserID',
                                name: 'MMSearchWidgetUser',
                                domain: window.location.hostname
                            }
                        },
                        function onGetToken () {
                            self._getOrSetSession();
                        },
                        function onTokenError () {
                            self.options.onMMSearchError('Supplied token is invalid');
                        }
                    );
                }
            }
            else {
                console.log('Invalid search widget config');
            }
        },

        _getOrSetSession: function () {
            var self = this;

            MM.activeUser.sessions.get(null, onGetSessions, onSessionError);

            function onGetSessions () {
                var sessions = MM.activeUser.sessions.json();
                // Sessions exist, use a previous one
                if (sessions.length > 0 ) {
                    MM.setActiveSessionID(sessions[0].sessionid, onSessionSet, onSessionError);
                }
                // No sessions yet, let's create one
                else {
                    var newSessionData = {
                        name: 'search session',
                        privacymode: 'inviteonly'
                    };
                    MM.activeUser.sessions.post(newSessionData, onSessionCreated, onSessionError);

                    function onSessionCreated (response) {
                        MM.setActiveSessionID(response.data.sessionid, onSessionSet, onSessionError);
                    }
                }
            }

            function onSessionSet () {
                self._onInitialized();
            }

            function onSessionError () {
                self.options.onMMSearchError('Error fetching and setting session');
            }
        },

        _onInitialized: function () {
            this._initialized = true;
            this.options.onMMSearchInitialized();
            var self = this;
            this.element.mmautocomplete({
                minLength: 2,
                delay: 100,
                source: function (request, response) {

                    self.queryDocuments(request.term,
                        function (documents) {
                            var results = [];
                            if (documents.length === 0) {
                                results.push({
                                    noResult: true
                                });
                            }
                            else {
                                results = $.map(documents, function (document) {
                                    return {
                                        label: document.title,
                                        document: document
                                    }
                                });
                            }
                            response(results);
                        },
                        function (errorMessage) {
                            self.onMMSearchError(errorMessage);
                            response([]);
                        }
                    );
                },
                appendTo: '#mm-results',
                open: function () {
                    var searchFieldPosition = self.element.offset();
                    var searchFieldHeight = self.element.outerHeight();
                    var searchFieldWidth = self.element.outerWidth();

                    var insetLength = 10;
                    var resultsWidth = searchFieldWidth - insetLength;
                    var resultsTop = searchFieldPosition.top + searchFieldHeight - 1;
                    var resultsLeft = searchFieldPosition.left + insetLength / 2;
                    $('#mm-results > ul.ui-autocomplete')
                        .css( {
                            width: resultsWidth + 'px'
                        })
                        .offset({
                            top: resultsTop,
                            left: resultsLeft
                        });

                },
                select: function (event, ui) {
                    if (ui.item.document) {
                        if (!event.ctrlKey && ! event.metaKey) {
                            window.location.href = ui.item.document.originurl;
                        }
                        self.element.val('');
                    }
                    return false;

                },
                focus: function (event, ui) {
                    if (ui.item.document) {
                        var menu = $(this).data('mindmeldMmautocomplete').menu.element;

                        // Remove 'focused' class from every <li>
                        var lis = menu.find('li');
                        lis.each(function () {
                            $(this).removeClass('focused');
                        });

                        // Add 'focused' class to focused <li>
                        var focused = menu.find("li:has(a.ui-state-focus)");
                        focused.addClass('focused');
                    }
                    return false;
                },
                images: self.options.images
            });

            if (this.options.voiceNavigatorEnabled) {
                this.element.keypress(
                    function onKeyPress (event) {
                        if (event.which === 13) {
                            var currentQuery = self.element.val();
                            self._openVoiceNavigator(currentQuery);
                        }
                    }
                );
            }
        },

        _openVoiceNavigator: function (query) {
            if (MM.voiceNavigator !== undefined) {
                MM.voiceNavigator.showModal(query);
            }
            else {
                MM.loader.widgetLoaded('voice', function () {
                    MM.voiceNavigator.showModal(query);
                });
            }
        },

        _stripEmTags: function (value) {
            value = value.replace(/<em>/g, '');
            value = value.replace(/<\/em>/g, '');
            return value;
        },

        queryDocuments: function (query, onQueryDocuments, onQueryError) {
            var self = this;
            if (this.queryCache[query]) {
                onQueryDocuments(this.queryCache[query]);
            }
            else {
                if (this._initialized) {
                    var wildcardQuery = this._getWildcardQuery(query);
                    var queryParams = {
                        query: wildcardQuery,
                        highlight: 1,
                        limit: 5
                    };
                    queryParams['document-ranking-factors'] = {
                        'relevance':    1,
                        'recency':      0,
                        'popularity':   0,
                        'proximity':    0,
                        'customrank1':  0,
                        'customrank2':  0,
                        'customrank3':  0
                    };
                    MM.activeSession.documents.get(queryParams,
                        function () {
                            var documents = MM.activeSession.documents.json();
                            self.numQueriesCached++;
                            self.queryCache[query] = documents;
                            onQueryDocuments(documents);
                        },
                        function (error) {
                            onQueryError('Error fetching documents: ' + error.message);
                        }
                    );
                    this._cleanQueryCache();
                }
                else {
                    onQueryError('Cannot query documents, MM search widget not initialized');
                }
            }
        },

        _getWildcardQuery: function (query) {
            var queryTerms = query.split(' ');
            var newQuery = '';
            if (queryTerms.length > 0 && query.slice(-1) !== ' ') {
                var lastQueryTermIndex = queryTerms.length - 1;
                queryTerms[lastQueryTermIndex] += '*';
                $.each(queryTerms, function (index, term) {
                   newQuery += term + ' ';
                });
            }
            else {
                newQuery = query;
            }
            return newQuery;
        },

        _cleanQueryCache: function () {
            // queryCache size is 100
            if (this.numQueriesCached > 100) {
                var cachedQueries = Object.keys(this.queryCache);
                // Randomly remove 50 items from query cache
                for (var i = 0; i < 50; i++) {
                    var cachedQuery = cachedQueries[i];
                    delete this.queryCache[cachedQueries[i]];
                    console.log('removing cached query: ' + cachedQuery);
                }
                this.numQueriesCached = Object.keys(this.queryCache).length;
            }
        },

        _validateString: function (string, length) {
            if (string === undefined) {
                return false;
            }
            if (length !== undefined && string.length !== length) {
                return false;
            }
            return true;
        }
    });

}($, MM));
}(MM.loader.$jq));
