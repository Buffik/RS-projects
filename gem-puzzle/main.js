(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var a=n.getElementsByTagName("script");a.length&&(t=a[a.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=function(e,t){for(var n=[],a=t;a;)n.push([]),a--;for(var r=0,o=0,i=0;i<e.length;i++)o>=t&&(r++,o=0),n[r][o]=e[i],o++;return n},n=function(e,t,n){e.style.transform="translate3D(".concat(100*t,"%, ").concat(100*n,"%, 0)")},a=function(e,t){for(var a=0;a<e.length;a++)for(var r=0;r<e[a].length;r++){var o=t[e[a][r]-1];n(o,r,a)}},r=function(e){return e.map((function(e){return{value:e,sort:Math.random()}})).sort((function(e,t){return e.sort-t.sort})).map((function(e){return e.value}))},o=function(e,t){for(var n=0;n<t.length;n++)for(var a=0;a<t[n].length;a++)if(t[n][a]===e)return{x:a,y:n}},i=function(e,t){for(var n=e.flat(),a=Math.pow(t,2),r=o(a,e),i=0,c=0;c<n.length;c++)for(var s=n[c],d=c;d<n.length;d++){var l=n[d];l<s&&s!==a&&l!==a&&i++}if(t%2){var u=i;return i=0,!(u%2)}var m=i;return i=0,!((m+r.y)%2)},c=e.p+"4e7487331143c43c19c9.wav";var s,d,l,u=[3,4,5,6,7,8],m=[],p=document.createElement("div"),f=document.createElement("div"),v=document.createElement("select"),h=document.createElement("button"),g=document.createElement("div"),y=document.createElement("div"),x=document.createElement("div"),L=document.createElement("div"),b=document.createElement("audio"),T=document.createElement("label"),w=document.createElement("input"),E=0,_=[],M=[],P=0;function S(){60==(s=Math.floor((Date.now()-d)/1e3))&&(d=Date.now(),P++),s<10&&(s="0"+s),x.innerHTML="Time: ".concat(P<10?"0"+P:P," : ").concat(s)}b.src=c,document.body.append(b),T.classList.add("template__sound"),T.innerText="Sound?",w.type="checkbox",T.append(w),g.classList.add("container"),y.classList.add("template__count"),y.innerText="Moves: ".concat(E),x.classList.add("template__timer"),x.innerText="Time: 00 : 00",L.classList.add("popup"),L.classList.add("hidden"),p.append(L),g.append(y,x,T),p.append(g);var k=new Array(16).fill(0).map((function(e,t){return t+1}));p.classList.add("wrapper"),document.body.append(p),f.classList.add("field"),p.append(f);for(var A=0;A<k.length;A++){var D=k[A],H=document.createElement("button");H.classList.add("item"),H.classList.add("item_4x4"),H.dataset.itemPosition=D,H.innerText=D,f.append(H),m.push(H)}var z=t(m.map((function(e){return Number(e.dataset.itemPosition)})),4);m[m.length-1].style.display="none",z=t(r(k),4),v.classList.add("options__field"),p.append(v),function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0,r=0;r<a.length;r++){var o=a[r],i=document.createElement(t);i.classList.add(n),i.innerText=o,i.value=o,e.append(i)}}(v,"option","options__option",u),h.innerText="shuffle and start",h.classList.add("btn","btn__shuffle"),p.append(h),a(z,m),h.addEventListener("click",(function(e){L.classList.remove("hidden"),L.classList.add("hidden");var n=v.value,o=new Array(n*n).fill(0).map((function(e,t){return t+1}));M=o;var c=function(e,t,n){e.innerHTML="";for(var a=[],r=0;r<n.length;r++){var o=n[r],i=document.createElement("button");i.classList.add("item"),i.classList.add("item_"+t+"x"+t),i.dataset.itemPosition=o,i.innerText=o,e.append(i),a.push(i)}return a}(f,n,o);for((_=c)[_.length-1].style.display="none",z=t(r(o),n);!i(z,n);)z=t(r(o),n);a(z,_),E=0,y.innerText="Moves: ".concat(E),d=Date.now(),P=0,l=setInterval(S,500)})),f.addEventListener("click",(function(e){var t,n,r,i,c=e.target.closest(".item");if(c){var d=Math.pow(v.value,2),u=Number(c.dataset.itemPosition),m=o(u,z),p=o(d,z),f=(t=m,n=p,r=Math.abs(t.x-n.x),i=Math.abs(t.y-n.y),!(1!==r&&1!==i||t.x!==n.x&&t.y!==n.y));s||(L.innerText="Hey mate! This is the onload state of the game! Press shuffle to start and don't forget to choose field's Size. All combinations are winnable!",L.classList.remove("hidden")),f&&(s&&w.checked&&b.play(),function(e,t,n){var a=n[e.y][e.x];n[e.y][e.x]=n[t.y][t.x],n[t.y][t.x]=a}(p,m,z),a(z,_),E++,y.innerText="Moves: ".concat(E)),function(e,t){for(var n=e.flat(),a=0;a<t.length;a++)if(n[a]!==t[a])return!1;return!0}(z,M)&&(s&&(L.innerText="Hooray! You solved the puzzle in ".concat(P<10?"0"+P:P,":").concat(s," and ").concat(E," moves!"),L.classList.remove("hidden")),clearInterval(l),x.innerText="Time: 00 : 00")}}))})();