!function(q,u){function P(a,c,h){return caches.open(r).then(function(b){var e={};return c.headers.forEach(function(a,b){e[b]=a}),e["x-abtf-sw"]=n(),h&&h.max_age&&(e["x-abtf-sw-expire"]=h.max_age),c.blob().then(function(f){f=new Response(f,{status:c.status,statusText:c.statusText,headers:e});return b.put(a,f)})})}function G(a){if(a)return"string"==typeof a&&(a=new Request(a,{mode:"no-cors"})),x(a).then(function(c){return c?c:(console.info("Abtf.sw() \u27a4 preload",a.url),v(a,{conditions:null},!1,
!0))})}function x(a){var c=m.start(1E3);return caches.open(r).then(function(h){return h.match(a).then(function(b){if(b){var e=b.headers.get("x-abtf-sw-expire");if(e)var f=b.headers.get("x-abtf-sw");var d=b.headers.get("expire");d&&(d=B(d));e&&f<n()-e?(b=!1,console.info("Abtf.sw() \u27a4 cache expired by policy",a.url,"max age:",e)):d&&d<n()&&(b=!1,console.info("Abtf.sw() \u27a4 cache expired by HTTP expire",a.url,b.headers.get("expire")))}return m.complete(c),b})})}function H(a,c){return a=new Request(a),
x(a).then(function(a){return a?a.blob().then(function(b){return new Response(b,{status:503,statusText:"Offline",headers:a.headers})}):u(c)["catch"](function(a){setTimeout(function(){throw a;})})})}function Q(a,c,h,b){var e=h.headers.get("etag"),f=B(h.headers.get("last-modified"));if(e||f){var d=m.start(1E3);h=new Request(a.url,{method:"HEAD",headers:a.headers,mode:"no-cors"});u(h).then(function(g){var k=!1,L=g.headers.get("etag");g=B(g.headers.get("last-modified"));return(L&&L!==e?k=!0:g&&g!==f&&
(k=!0),k)?(console.info("Abtf.sw() \u27a4 HEAD \u27a4 update",a.url),k=v(a,c),k=k.then(function(a){return m.complete(d),a}),b&&(k=k.then(b)),k):(m.complete(d),null)})["catch"](function(){var g=v(a,c);return g=g.then(function(a){return m.complete(d),a}),b&&(g=g.then(b)),g})}else console.warn("Abtf.sw() \u27a4 HEAD \u27a4 no etag or last-modified",a.url),h=v(a,c),b&&(h=h.then(b))}function v(a,c,h,b){var e=m.start(1E3);return R(a.headers.get("accept")).then(function(f){function d(a){a in l&&(l[a]&&l[a][2]&&
clearTimeout(l[a][2]),l[a]=!1,delete l[a])}var g=new Request(a);g.headers.set("x-pagespeed-sw",1);f&&g.headers.set("cache-digest",f);var k=g.url;if(!b&&l&&k in l&&l[k]&&l[k][0]>n()-5)return console.info("Abtf.sw() \u27a4 hook into preload initiated request",k),l[k][1];f=u(g).then(function(a){d(k);var b=!1;if(a.ok&&400>a.status){var f=a.headers.get("link");f&&(f instanceof Array||(f=[f]),m.f(function(){caches.open(r+":push").then(function(a){f.forEach(function(b){b.split(",").forEach(function(b){if(/rel=preload/.test(b)){var g=
b.match(/<([^>]+)>/);g&&g[1]&&a.match(g[1]).then(function(b){b||a.put(g[1],new Response(null,{status:204}))})}})})})},1E3));c&&(b=!0,c.conditions&&(c.conditions.forEach(function(c){if(b)switch(c.type){case "url":c.regex?(e=C(c.pattern))?(f=e.test(g.url),c.not?f&&(b=!1):f||(b=!1)):b=!1:(f=-1!==g.url.indexOf(c.pattern),c.not?f&&(b=!1):f||(b=!1));break;case "header":var d=a.headers.get(c.name);if(d)if(c.regex){var e=C(c.pattern);e?(f=e.test(d),c.not?f&&(b=!1):f||(b=!1)):b=!1}else if("object"==typeof c.pattern)if(c.pattern.operator)if(d=
parseFloat(d),e=parseFloat(c.pattern.value),isNaN(d)||isNaN(e))b=!1;else{switch(c.pattern.operator){case "<":f=d<e;break;case ">":f=d>e;break;case "=":var f=d===e;break;default:b=!1}b&&(c.not?f&&(b=!1):f||(b=!1))}else b=!1;else-1===d.indexOf(c.pattern)&&(b=!1);else b=!1}}),b?console.info("Abtf.sw() \u27a4 cache condition \u27a4 cache",g.url,c.conditions):console.info("Abtf.sw() \u27a4 cache condition \u27a4 no cache",g.url,c.conditions)),b&&P(g,a.clone(),c).then(function(){m.complete(e)}))}return b||
m.complete(e),a})["catch"](function(a){return d(k),m.complete(e),h?h(g,null,a):null});return b&&(l[k]=[n(),f],l[k][2]=setTimeout(function(){l[k]=!1;delete l[k]},5E3)),f})}function M(){I||(!J||J<n()-10)&&(I=!0,J=n(),caches.keys().then(function(a){return a&&0!==a.length?Promise.all(a.map(function(a){if(0!==a.indexOf(r))return console.info("Abtf.sw() \u27a4 old cache deleted",a),caches["delete"](a);caches.open(a).then(function(c){c.keys().then(function(b){if(console.info("Abtf.sw() \u27a4 prune cache",
a,"size:",b.length,z),!(b.length<z)){var e=[],f=[],d=[];return b.forEach(function(a){f.push(a);d.push(c.match(a))}),Promise.all(d).then(function(a){var b=n();a.forEach(function(a,g){if(a&&a.headers){var d=a.headers.get("x-abtf-sw");if(d){var k=a.headers.get("x-abtf-sw-expire");if(k&&d&&d<n()-k)return console.info("Abtf.sw() \u27a4 cache \u27a4 expired",a.url),void c["delete"](f[g])}else d=b;!1!==e&&e.push({t:d,r:f[g]})}});e&&e.length>z&&(e.sort(function(a,b){return a.t>b.t?-1:a.t<b.t?1:0}),e.slice(z).forEach(function(a){c["delete"](a.r)}))})}})})})).then(function(){I=
!1}):Promise.resolve()}))}function C(a){if(a=a.match(S)){try{var c=new RegExp(a[1],a[2])}catch(h){}return c||!1}}function B(a){if(a)return isNaN(parseInt(a))?(a=Date.parse(a),isNaN(a)?void 0:Math.round(a/1E3)):a}function n(){return Math.round(Date.now()/1E3)}function D(){return w?Promise.resolve():(N(),w=!0,u(E+"?"+Math.round(Date.now()/1E3),{mode:"no-cors"}).then(function(a){if(w=!1,a&&a.ok&&400>a.status)return a.json().then(function(a){if(console.info("Abtf.sw() \u27a4 config "+(p?"updated":"loaded"),
a),a){a instanceof Array&&(a={policy:a});r="abtf";a.cache_version&&(r=r+":"+a.cache_version);a.policy&&(p=a.policy,A=n());var c=[],b=[];return a.start_url&&b.push(G(a.start_url)),a.policy&&a.policy.forEach(function(a){a.offline&&-1===c.indexOf(a.offline)&&c.push(a.offline)}),a.preload&&a.preload.forEach(function(a){-1===c.indexOf(a)&&c.push(a)}),preloadPromises=[],c.forEach(function(a){preloadPromises.push(G(a))}),a.i&&(b=b.concat(preloadPromises)),Promise.all(b)}});throw p=!1,Error("service worker config not found: "+
E);})["catch"](function(a){p=w=!1;setTimeout(function(){throw a;})}))}function O(a){(new Promise(function(c){if(!p||!A||a&&a>A){var h=!p;D().then(function(){h&&c(p?p:!1)})["catch"](function(){h&&c(!1)})}else if(!w&&A<n()-300){N();w=!0;var b=new Request(E+"?"+Math.round(Date.now()/1E3),{method:"HEAD",mode:"no-cors"});u(b).then(function(a){w=!1;var b=!0;a&&a.ok&&(a=B(a.headers.get("last-modified")))&&a<=A&&(b=!1);b&&D()})["catch"](function(){w=!1;D()})}else c(p)}))["catch"](function(a){setTimeout(function(){throw a;
})})}function R(a){return a&&a.includes("text/html")?new Promise(function(a){caches.open(r+":push").then(function(c){c.keys().then(function(b){if(0===b.length)return a(null);var c=[];b.forEach(function(a){c.push(x(a))});Promise.all(c).then(function(c){var d=[];b.forEach(function(a,b){"undefined"!==c[b]&&c[b]&&d.push(a.url)});0===d.length?a(null):T(d,Math.pow(2,7)).then(function(b){a(b)})})})})}):Promise.resolve(null)}function N(){var a=new URL(location);(K=a.searchParams.get("path"))||(K="/");(a=
a.searchParams.get("config"))||(a="abtf-pwa-config.json");E=K+a}var K,E,r,p=!1,A=!1,z=1E3,l={};q.addEventListener("install",function(a){a.waitUntil(D().then(function(){q.skipWaiting()})["catch"](function(){q.skipWaiting()}))});q.addEventListener("activate",function(){q.clients.claim()});CacheStorage.prototype.match||(CacheStorage.prototype.match=function(a,c){var h=this;return this.keys().then(function(b){var e;return b.reduce(function(b,d){return b.then(function(){return e||h.open(d).then(function(b){return b.match(a,
c)}).then(function(a){return e=a})})},Promise.resolve())})});var w,T=function(){function a(){this.value=[];this.a=0}function c(a,b){return a-b}function h(a,c,e){return new Promise(function(d){var g=b(a);crypto.subtle.digest("SHA-256",f.encode(g)).then(function(a){a=(new DataView(a)).getUint32(0);var b=Math.log2(c*e);if(31<b)throw Error("This implementation only supports up to 31 bit hash values");d(a>>32-b&(1<<b)-1)})})}function b(a){return a.replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16)})}
function b(a){return a.replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16)})}function e(b,g){if(g>=Math.pow(2,32))throw Error('Invalid probability: "${p}" must be smaller than 2**32');if(!(0<g&&(g&1+~g)===g))throw Error('Invalid probability: "${p}" must be a power of 2');var d,f=Math.min(Math.pow(2,Math.round(Math.log2(b.length))),Math.pow(2,31)),e=[];return new Promise(function(k){Promise.all(b.map(function(a){return h(a,f,g)})).then(function(){e=e.concat().sort(c);d=Uint8Array.from((new a).c(Math.log2(f),
5).c(Math.log2(g),5).g(e,Math.log2(g)).value);var b;b="";for(var h=d.byteLength,t=0;t<h;t++)b+=String.fromCharCode(d[t]);b=btoa(b).replace(/=+$/,"");k(b)})})}a.prototype.b=function(a){0==this.a&&(this.value.push(0),this.a=8);--this.a;a&&(this.value[this.value.length-1]|=1<<this.a)};a.prototype.c=function(a,b){if(0!=b){do--b,this.b(a&1<<b);while(0!=b)}return this};a.prototype.g=function(a,b){for(var c=-1,d=0;d!=a.length;++d)if(c!=a[d]){for(var c=a[d]-c-1,f=c>>b;0!=f;--f)this.b(0);this.b(1);this.c(c,
b);c=a[d]}return this};var f=new TextEncoder("utf-8");return function(a,b){return e(a,b)}}(),m=function(){function a(e,f,d){var g=!1,k=Object.keys(c);if(0<k.length){var h=Date.now();k.forEach(function(a){if(!g)if(c[a][0]<h-c[a][1])try{delete c[a]}catch(V){}else g=!0})}if(g){if(0!==f){var t;if(d){var y=!1;b.forEach(function(a,b){y||a[2]==d&&(y=b)});y&&(b[y][1]&&clearTimeout(b[y][1]),t=y)}t||(t=b.push([])-1);b[t]=[e,setTimeout(function(c,d){delete b[c];d();0<b.length&&a(null,0)},f,t,e),d]}}else if(e&&
b.push([e]),0<b.length)for(e=b.shift();e;){if(e instanceof Array){e[1]&&clearTimeout(e[1]);try{e[0]()}catch(U){}}e=b.shift()}}var c={},h=0,b=[];return{start:function(a){var b=++h;return c[b]=[Date.now(),a],b},complete:function(e){try{delete c[e]}catch(f){}0<b.length&&a(null,0)},f:a}}(),S=/^\/(.*)\/([gimuy]+)?$/,J=!1,I=!1,F=!1;q.addEventListener("fetch",function(a){if("GET"===a.request.method){var c=!1;if(["wp-admin/","wp-login.php"].forEach(function(b){c||(b=new RegExp("^([^/]+)?//"+q.location.host+
"(:[0-9]+)?/"+b),(b.test(a.request.url)||a.request.referrer&&b.test(a.request.referrer))&&(c=!0))}),!(c||a.request.url.match(/\&preview=true/)||a.request.url.match(/\&preview_nonce=/))&&(O(),p&&r)){var h=function(a,c){if(!c||0===c.length)return!1;var b=!1;if(c.forEach(function(c){if(!b&&c.match&&0!==c.match.length){var d=!0;c.match.forEach(function(b){if(d)switch(b.type){case "url":if(b.regex)(g=C(b.pattern))?(f=g.test(a.request.url),b.not?f&&(d=!1):f||(d=!1)):d=!1;else if(b.pattern instanceof Array){var c=
!1;b.pattern.forEach(function(b){c||-1!==a.request.url.indexOf(b)&&(c=!0)});b.not?c&&(d=!1):c||(d=!1)}else f=-1!==a.request.url.indexOf(b.pattern),b.not?f&&(d=!1):f||(d=!1);break;case "header":switch(b.name.toLowerCase()){case "referer":case "referrer":e=a.request.referrer;break;default:var e=a.request.headers.get(b.name)}if(e)if(b.regex){var g=C(b.pattern);g?(f=g.test(e),b.not?f&&(d=!1):f||(d=!1)):d=!1}else{var f=-1!==e.indexOf(b.pattern);b.not?f&&(d=!1):f||(d=!1)}else b.not||(d=!1)}});d&&(b=c)}}),
!b)return console.info("Abtf.sw() \u27a4 policy \u27a4 no match",a.request.url),!1;switch(console.info("Abtf.sw() \u27a4 policy \u27a4 match",a.request.url,b),F&&clearTimeout(F),F=setTimeout(function(){m.f(M,1E4,"clean-cache");F=!1},100),b.strategy){case "never":return!1;case "cache":return x(a.request).then(function(c){if(c){var d=!0,e=b.cache.update_interval?!isNaN(parseInt(b.cache.update_interval))&&parseInt(b.cache.update_interval):!1;if(e){var f=c.headers.get("x-abtf-sw");f&&parseInt(f)>n()-
e&&(d=!1)}return d&&function(a,c){setTimeout(function(){var d;if(b.cache.h&&(d=function(){clients.matchAll().then(function(b){b.forEach(function(b){b.postMessage([2,a.url])})})}),b.cache.head_update)console.info("Abtf.sw() \u27a4 HEAD \u27a4 verify",a.url),Q(a,b.cache,c,d);else{console.info("Abtf.sw() \u27a4 update cache",a.url);var e=v(a,b.cache);d&&e.then(d)}},10)}(a.request.clone(),c.clone()),console.info("Abtf.sw() \u27a4 from cache",a.request.url),c}return v(a.request,b.cache,function(c,d,e){return b.offline?
(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",c.url),H(b.offline,c.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",c.url,d,e),d||u(a.request.clone())["catch"](function(a){setTimeout(function(){throw a;})}))})});case "event":return x(a.request).then(function(c){return c?(console.info("Abtf.sw() \u27a4 from cache",a.request.url),c):v(a.request,null,function(c,d){return b.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 offline page",
c.url),H(b.offline,c.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 network failed \u27a4 empty 404 response",c.url,d),d||u(a.request)["catch"](function(a){setTimeout(function(){throw a;})}))})});default:return v(a.request,b.cache,function(c,e,f){return console.warn("Abtf.sw() \u27a4 network failed",c.url,e||f),x(c).then(function(d){return d?(console.info("Abtf.sw() \u27a4 fallback from cache",c.url),d):b.offline?(console.warn("Abtf.sw() \u27a4 no cache \u27a4 offline page",c.url),H(b.offline,
c.clone())):(console.warn("Abtf.sw() \u27a4 no cache \u27a4 empty 404 response",c.url),e||u(a.request)["catch"](function(a){setTimeout(function(){throw a;})}))})})}}(a,p);if(!1!==h)return a.respondWith(h)}}});q.addEventListener("message",function(a){if(a&&a.data&&a.data instanceof Array){if(1===a.data[0]&&(a.data[1]&&!isNaN(parseInt(a.data[1]))&&O(parseInt(a.data[1])),a.data[3]&&!isNaN(parseInt(a.data[3]))&&(z=parseInt(a.data[3])),m.f(M,1E4,"clean-cache")),2===a.data[0]||3===a.data[0])var c=a.ports[0]?
function(b,c){a.ports[0].postMessage({error:b,status:c})}:!1;if(2===a.data[0])if(a.data[1]){var h;if("string"==typeof a.data[1]||a.data[1]instanceof Request?h=[a.data[1]]:a.data[1]instanceof Array&&(h=a.data[1]),h){var b=[];h.forEach(function(a){b.push(G(a))});c&&Promise.all(b).then(function(a){var b=[];a.forEach(function(a){var c={url:a.url,status:a.status,statusText:a.statusText};a=a.headers.get("content-length");c.size=isNaN(parseInt(a))?-1:parseInt(a);b.push(c)});c(null,b)})["catch"](function(a){console.error("Abtf.sw() \u27a4 preload",
a)})}else c&&c("invalid-data")}else c&&c("no-urls");3===a.data[0]&&(q.registration.showNotification(a.data[1],a.data[2]),c&&c(null,"sent"))}})}(self,self.fetch,Cache);
