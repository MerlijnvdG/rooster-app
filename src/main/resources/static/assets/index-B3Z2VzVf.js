(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},oe=(e,t)=>!l(e,t),se={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??oe)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[p(`elementProperties`)]=new Map,h[p(`finalized`)]=new Map,ae?.({ReactiveElement:h}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var ce=globalThis,le=e=>e,g=ce.trustedTypes,ue=g?g.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,de=`$lit$`,_=`lit$${Math.random().toFixed(9).slice(2)}$`,fe=`?`+_,pe=`<${fe}>`,v=document,y=()=>v.createComment(``),b=e=>e===null||typeof e!=`object`&&typeof e!=`function`,x=Array.isArray,me=e=>x(e)||typeof e?.[Symbol.iterator]==`function`,S=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ge=/>/g,w=RegExp(`>|${S}(?:([^\\s"'>=/]+)(${S}*=${S}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),_e=/'/g,ve=/"/g,ye=/^(?:script|style|textarea|title)$/i,be=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),T=be(1),E=be(2),D=Symbol.for(`lit-noChange`),O=Symbol.for(`lit-nothing`),xe=new WeakMap,k=v.createTreeWalker(v,129);function Se(e,t){if(!x(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ue===void 0?t:ue.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=C;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===C?c[1]===`!--`?o=he:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=w):(ye.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=w):o=ge:o===w?c[0]===`>`?(o=i??C,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?w:c[3]===`"`?ve:_e):o===ve||o===_e?o=w:o===he||o===ge?o=C:(o=w,i=void 0);let d=o===w&&e[t+1].startsWith(`/>`)?` `:``;a+=o===C?n+pe:l>=0?(r.push(s),n.slice(0,l)+de+n.slice(l)+_+d):n+_+(l===-2?t:d)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},we=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),k.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=k.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(de)){let t=u[o++],n=i.getAttribute(e).split(_),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?ke:j}),i.removeAttribute(e)}else e.startsWith(_)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ye.test(i.tagName)){let e=i.textContent.split(_),t=e.length-1;if(t>0){i.textContent=g?g.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],y()),k.nextNode(),c.push({type:2,index:++a});i.append(e[t],y())}}}else if(i.nodeType===8)if(i.data===fe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(_,e+1))!==-1;)c.push({type:7,index:a}),e+=_.length-1}a++}}static createElement(e,t){let n=v.createElement(`template`);return n.innerHTML=e,n}};function A(e,t,n=e,r){if(t===D)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=b(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=A(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??v).importNode(t,!0);k.currentNode=r;let i=k.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ee(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ae(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=k.nextNode(),a++)}return k.currentNode=v,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),b(e)?e===O||e==null||e===``?(this._$AH!==O&&this._$AR(),this._$AH=O):e!==this._$AH&&e!==D&&this._(e):e._$litType$===void 0?e.nodeType===void 0?me(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==O&&b(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=we.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new we(e)),t}k(t){x(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(y()),this.O(y()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=le(e).nextSibling;le(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=O,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=O}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=A(this,e,t,0),a=!b(e)||e!==this._$AH&&e!==D,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=A(this,r[n+o],t,o),s===D&&(s=this._$AH[o]),a||=!b(s)||s!==this._$AH[o],s===O?e=O:e!==O&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===O?void 0:e}},Oe=class extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==O)}},ke=class extends j{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??O)===D)return;let n=this._$AH,r=e===O&&n!==O||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==O&&(n===O||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}},je=ce.litHtmlPolyfillSupport;je?.(we,Ee),(ce.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ee(t.insertBefore(y(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,M=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}};M._$litElement$=!0,M.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:M});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:M}),(Ne.litElementVersions??=[]).push(`4.2.2`);var N=new class extends EventTarget{constructor(){super();let e=localStorage.getItem(`auth`);this._user=e?JSON.parse(e):null}get user(){return this._user}get isLoggedIn(){return!!this._user}get isEmployer(){return this._user?.role===`EMPLOYER`}setUser(e){this._user=e,e?(localStorage.setItem(`token`,e.token),localStorage.setItem(`auth`,JSON.stringify(e))):(localStorage.removeItem(`token`),localStorage.removeItem(`auth`)),this.dispatchEvent(new CustomEvent(`change`))}logout(){this.setUser(null)}},P=`/api`;function Fe(){return localStorage.getItem(`token`)}function F(){return{"Content-Type":`application/json`,Authorization:`Bearer ${Fe()}`}}async function I(e){if(!e.ok){let t=await e.text();throw Error(t||`${e.status} ${e.statusText}`)}return e.status===204?null:e.json()}var Ie=(e,t)=>fetch(`${P}/auth/login`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e,password:t})}).then(I),Le=()=>fetch(`${P}/locations`,{headers:F()}).then(I),Re=(e,t)=>fetch(`${P}/shifts/my?from=${e}&to=${t}`,{headers:F()}).then(I),ze=(e,t,n)=>fetch(`${P}/shifts/location/${e}?from=${t}&to=${n}`,{headers:F()}).then(I),Be=(e,t,n)=>fetch(`${P}/shifts/team/${e}?from=${t}&to=${n}`,{headers:F()}).then(I),Ve=e=>fetch(`${P}/shifts`,{method:`POST`,headers:F(),body:JSON.stringify(e)}).then(I),He=(e,t)=>fetch(`${P}/shifts/${e}`,{method:`PUT`,headers:F(),body:JSON.stringify(t)}).then(I),Ue=e=>fetch(`${P}/shifts/${e}`,{method:`DELETE`,headers:F()}).then(I),We=()=>fetch(`${P}/users`,{headers:F()}).then(I),Ge=()=>fetch(`${P}/users/employees`,{headers:F()}).then(I),Ke=e=>fetch(`${P}/users`,{method:`POST`,headers:F(),body:JSON.stringify(e)}).then(I),qe=(e,t)=>fetch(`${P}/users/${e}`,{method:`PUT`,headers:F(),body:JSON.stringify(t)}).then(I),Je=e=>fetch(`${P}/users/${e}`,{method:`DELETE`,headers:F()}).then(I),Ye=e=>fetch(`${P}/leave-requests`,{method:`POST`,headers:F(),body:JSON.stringify(e)}).then(I),L=()=>fetch(`${P}/leave-requests/my`,{headers:F()}).then(I),Xe=e=>fetch(`${P}/leave-requests/employee/${e}`,{headers:F()}).then(I),Ze=()=>fetch(`${P}/leave-requests`,{headers:F()}).then(I),Qe=e=>fetch(`${P}/leave-requests/${e}/approve`,{method:`PUT`,headers:F()}).then(I),$e=(e,t)=>fetch(`${P}/leave-requests/${e}/reject`,{method:`PUT`,headers:F(),body:JSON.stringify({rejectionReason:t})}).then(I),et=e=>fetch(`${P}/leave-requests/${e}`,{method:`DELETE`,headers:F()}).then(I),tt=()=>fetch(`${P}/notifications`,{headers:F()}).then(I),nt=()=>fetch(`${P}/notifications/unread-count`,{headers:F()}).then(I),rt=()=>fetch(`${P}/notifications/mark-read`,{method:`POST`,headers:F()}).then(I),it=(e,t)=>fetch(`${P}/shifts/monthly-summary?year=${e}&month=${t}`,{headers:F()}).then(I),at=(e,t,n)=>fetch(`${P}/shifts/employee/${e}?from=${t}&to=${n}`,{headers:F()}).then(I),ot=(e=36)=>T`<svg
  width="${e}" height="${e}" viewBox="0 0 100 100"
  aria-hidden="true" style="display:inline-block;vertical-align:middle;flex-shrink:0">
  ${E`
    <g transform="scale(0.1953125)"><rect width="512" height="512" rx="112" fill="#1F5F5B"/> <g fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="6"> <path d="M128 112v288M224 112v288M320 112v288M416 112v288"/> </g> <rect x="96" y="142" width="232" height="58" rx="10" fill="#fff"/> <rect x="176" y="227" width="240" height="58" rx="10" fill="#FCE68A"/> <rect x="128" y="312" width="176" height="58" rx="10" fill="#fff"/></g>
  `}
</svg>`,R=(e,t)=>T`<svg
  width="${e}" height="${e}" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"
  style="display:inline-block;vertical-align:middle;flex-shrink:0"
>${t}</svg>`,st=(e=18)=>R(e,E`<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`),ct=(e=18)=>R(e,E`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`),z=(e=18)=>R(e,E`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`),lt=(e=18)=>R(e,E`<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`),B=(e=18)=>R(e,E`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`),ut=(e=18)=>R(e,E`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`),V=(e=18)=>R(e,E`<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`),H=(e=18)=>R(e,E`<polyline points="15 18 9 12 15 6"/>`),dt=(e=18)=>R(e,E`<polyline points="9 18 15 12 9 6"/>`),ft=(e=18)=>R(e,E`<polyline points="6 9 12 15 18 9"/>`),pt=(e=18)=>R(e,E`<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`),mt=(e=18)=>R(e,E`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`),ht=(e=18)=>R(e,E`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`),gt=(e=18)=>R(e,E`<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>`),U=(e=18)=>R(e,E`<polyline points="20 6 9 17 4 12"/>`),_t=(e=18)=>R(e,E`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`),vt=(e=18)=>R(e,E`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>`),yt=(e=18)=>R(e,E`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`),W=(e=18)=>R(e,E`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`),G=(e=18)=>R(e,E`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`),K=(e=18)=>R(e,E`<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`),bt=(e=18)=>R(e,E`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`),xt=(e=18)=>R(e,E`<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>`),St=(e=18)=>R(e,E`<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`),Ct=(e=18)=>R(e,E`<rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>`),wt=(e=18)=>R(e,E`<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`),q=(e=18)=>R(e,E`<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/>`),Tt=(e=18)=>R(e,E`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`),Et=(e=18)=>R(e,E`<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`),Dt=class extends M{static properties={_loading:{state:!0},_error:{state:!0},_pwVisible:{state:!0}};static styles=o`
    :host {
      display: flex;
      min-height: 100vh;
      max-width: 100vw;
      overflow: hidden;
      background: var(--app-blue, #0F2537);
    }

    .left {
      display: none;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 2.5rem;
      background: var(--app-blue, #0F2537);
      position: relative;
      overflow: hidden;
    }

    .left::before {
      content: '';
      position: absolute;
      width: 400px; height: 400px; border-radius: 50%;
      background: rgba(37,99,235,0.08);
      top: -80px; right: -80px;
    }

    .left::after {
      content: '';
      position: absolute;
      width: 250px; height: 250px; border-radius: 50%;
      background: rgba(37,99,235,0.05);
      bottom: -40px; left: -40px;
    }

    @media (min-width: 720px) { .left { display: flex; } }

    .brand-big { font-size: 4rem; font-weight: 900; color: var(--app-accent, #2563EB); letter-spacing: -3px; }
    .brand-tagline { color: rgba(255,255,255,0.55); font-size: 1rem; margin-bottom: 2.5rem; margin-top: 0.35rem; }

    .feature-list { list-style: none; width: 100%; max-width: 280px; }
    .feature-list li {
      color: rgba(255,255,255,0.75); font-size: 0.88rem;
      padding: 0.65rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex; align-items: center; gap: 0.75rem;
    }
    .feature-list li::before {
      content: '✓'; width: 20px; height: 20px;
      background: rgba(37,99,235,0.25); color: var(--app-accent, #2563EB);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; flex-shrink: 0; text-align: center; line-height: 20px; font-weight: 700;
    }

    .right {
      flex: 0 0 100%;
      display: flex; align-items: center; justify-content: center;
      padding: 1.25rem 2rem;
      min-height: 100vh;
      background: var(--app-blue, #0F2537);
      box-sizing: border-box;
      overflow: hidden;
    }

    @media (min-width: 720px) { .right { flex: 0 0 440px; } }

    .card {
      background: #fff;
      border-radius: 16px;
      padding: 1.75rem 1.5rem;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      border: 1px solid var(--app-border, #DCDFE3);
      box-sizing: border-box;
    }

    .logo-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.75rem; }
    .logo-badge {
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--app-blue, #0F2537);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .logo-text-wrap .logo-name { font-size: 1.15rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A); line-height: 1.1; }
    .logo-text-wrap .logo-sub { font-size: 0.75rem; color: var(--app-text-muted, #626B74); }

    h2 { font-size: 1.5rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A); margin-bottom: 0.25rem; }
    .subtitle { font-size: 0.85rem; color: var(--app-text-muted, #626B74); margin-bottom: 1.75rem; }

    .field { margin-bottom: 1rem; }

    label {
      display: block;
      font-size: 0.78rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.6px;
      color: var(--app-text-muted, #626B74);
      margin-bottom: 0.45rem;
    }

    input {
      width: 100%;
      padding: 0.85rem 1rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
      color: var(--app-text-dark, #1A1A1A);
      background: var(--app-bg-light, #F4F6F8);
      -webkit-appearance: none;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    input:focus {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
      background: #fff;
    }

    .error {
      display: flex; align-items: center; gap: 0.5rem;
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 10px;
      padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;
    }

    .pw-wrap { position: relative; }
    .pw-wrap input { padding-right: 3rem; }
    .pw-toggle {
      position: absolute; right: 0.6rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted, #626B74); padding: 0.3rem;
      display: flex; align-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    .pw-toggle:hover { color: var(--app-text-dark); }

    .btn {
      width: 100%; padding: 0.95rem;
      background: var(--app-accent, #2563EB); color: #fff;
      border: none; border-radius: 10px;
      font-size: 1rem; font-weight: 700; cursor: pointer;
      transition: background 0.18s, transform 0.1s;
      margin-top: 0.5rem; min-height: 52px;
      -webkit-appearance: none;
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .btn:hover:not(:disabled) { background: var(--app-accent-hover, #1D4ED8); }
    .btn:active:not(:disabled) { transform: scale(0.99); }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }

    .hint {
      margin-top: 1.5rem; padding: 0.9rem 1rem;
      background: var(--app-bg-light, #F4F6F8);
      border-radius: 10px; font-size: 0.78rem;
      color: var(--app-text-muted, #626B74); line-height: 1.75;
    }
    .hint strong { display: block; color: var(--app-text-dark, #1A1A1A); font-weight: 700; margin-bottom: 0.25rem; }
  `;constructor(){super(),this._loading=!1,this._error=``,this._pwVisible=!1}async _submit(e){e.preventDefault(),this._error=``,this._loading=!0;let t=e.target;try{let e=await Ie(t.elements.code.value.trim(),t.elements.password.value);N.setUser(e)}catch{this._error=`Ongeldige inlogcode of wachtwoord.`}finally{this._loading=!1}}render(){return T`
      <div class="left">
        <div class="brand-big">Rooster</div>
        <div class="brand-tagline">Roosterbeheer voor alle filialen</div>
        <ul class="feature-list">
          <li>Weekrooster plannen per filiaal</li>
          <li>Medewerkers beheren en toevoegen</li>
          <li>Diensten eenvoudig aanpassen</li>
          <li>Urenstatistieken per medewerker</li>
          <li>Altijd beschikbaar op je telefoon</li>
        </ul>
      </div>

      <div class="right">
        <div class="card">
          <div class="logo-row">
            <div class="logo-badge">${ot(34)}</div>
            <div class="logo-text-wrap">
              <div class="logo-name">Rooster</div>
            </div>
          </div>

          <h2>Inloggen</h2>
          <p class="subtitle">Vul je inlogcode en wachtwoord in</p>

          ${this._error?T`<div class="error">${_t(15)} ${this._error}</div>`:``}

          <form @submit=${this._submit}>
            <div class="field">
              <label>Inlogcode</label>
              <input
                name="code"
                type="text"
                inputmode="numeric"
                maxlength="6"
                placeholder="000000"
                autocomplete="username"
                required
                ?disabled=${this._loading}
              >
            </div>
            <div class="field">
              <label>Wachtwoord</label>
              <div class="pw-wrap">
                <input
                  name="password"
                  type=${this._pwVisible?`text`:`password`}
                  autocomplete="current-password"
                  placeholder="••••••••"
                  required
                  ?disabled=${this._loading}
                >
                <button type="button" class="pw-toggle"
                  @click=${()=>this._pwVisible=!this._pwVisible}>
                  ${this._pwVisible?gt(16):ht(16)}
                </button>
              </div>
            </div>
            <button class="btn" type="submit" ?disabled=${this._loading}>
              ${this._loading?`Bezig...`:T`Inloggen ${K(16)}`}
            </button>
          </form>

          <div class="hint">
            <strong>Demo-accounts — wachtwoord: Welkom@123</strong>
            Manager: 000001 &bull; Admin: 000002<br>
            Thomas: 000003 &bull; Lisa: 000004 &bull; Bas: 000005<br>
            Mike: 000006 &bull; Anna: 000007 &bull; Kevin: 000008<br>
            Sander: 000009 &bull; Femke: 000010 &bull; Roos: 000011
          </div>
        </div>
      </div>
    `}};customElements.define(`login-page`,Dt);var Ot=[`Ma`,`Di`,`Wo`,`Do`,`Vr`,`Za`,`Zo`],kt=[`Maandag`,`Dinsdag`,`Woensdag`,`Donderdag`,`Vrijdag`,`Zaterdag`,`Zondag`],At=[`januari`,`februari`,`maart`,`april`,`mei`,`juni`,`juli`,`augustus`,`september`,`oktober`,`november`,`december`];function J(e=0){let t=new Date,n=t.getDay()||7;return t.setDate(t.getDate()-n+1+e*7),t.setHours(0,0,0,0),t}function Y(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}function X(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function Z(e){return e===X(new Date)}function jt(e){return e<X(new Date)}function Q(e,t){let[n,r]=e.slice(0,5).split(`:`).map(Number),[i,a]=t.slice(0,5).split(`:`).map(Number);return(i*60+a-(n*60+r))/60}var Mt=[`jan`,`feb`,`mrt`,`apr`,`mei`,`jun`,`jul`,`aug`,`sep`,`okt`,`nov`,`dec`];function Nt(e){let t=J(e),n=Y(t,6);return`${t.getDate()} ${Mt[t.getMonth()]} – ${n.getDate()} ${Mt[n.getMonth()]}`}function Pt(e=0){let t=J(e),n=new Date(t.getFullYear(),0,4),r=new Date(n);return r.setDate(n.getDate()-(n.getDay()+6)%7),Math.round((t-r)/(7*864e5))+1}function Ft(e){let t=J(e);return Array.from({length:7},(e,n)=>{let r=Y(t,n);return{date:r,iso:X(r),dayShort:Ot[n],dayFull:kt[n]}})}var It=[`#1976D2`,`#388E3C`,`#7B1FA2`,`#F57C00`,`#00838F`,`#C62828`,`#2E7D32`,`#AD1457`,`#0277BD`,`#558B2F`];function $(e){return It[(e-1)%It.length]}var Lt=class extends M{static properties={options:{type:Array},value:{type:String},placeholder:{type:String},name:{type:String},required:{type:Boolean},searchable:{type:Boolean},_open:{state:!0},_query:{state:!0}};static styles=o`
    :host { display: block; position: relative; -webkit-tap-highlight-color: transparent; }

    .trigger {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 2.2rem 0.7rem 0.85rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 8px;
      font-size: 0.92rem;
      outline: none;
      color: var(--app-text-dark, #1A1A1A);
      background: #fafbfc;
      cursor: pointer;
      text-align: left;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    .trigger:focus, .trigger.open {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      background: #fff;
    }

    .trigger-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .trigger-label.placeholder { color: var(--app-text-muted, #626B74); }

    .chevron { flex-shrink: 0; color: var(--app-text-muted, #626B74); transition: transform 0.18s; }
    .chevron.open { transform: rotate(180deg); }

    .dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0; right: 0;
      background: #fff;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 1000;
      overflow: hidden;
    }

    .search-wrap {
      padding: 0.55rem 0.6rem;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .search-wrap input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.88rem;
      color: var(--app-text-dark, #1A1A1A);
      background: transparent;
      -webkit-tap-highlight-color: transparent;
    }

    .search-icon { color: var(--app-text-muted, #626B74); display: flex; align-items: center; flex-shrink: 0; }

    .options-list {
      max-height: 220px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .option {
      padding: 0.65rem 0.9rem;
      font-size: 0.91rem;
      cursor: pointer;
      color: var(--app-text-dark, #1A1A1A);
      transition: background 0.12s;
      -webkit-tap-highlight-color: transparent;
    }

    .option:hover, .option.focused { background: var(--app-bg-light, #F4F6F8); }
    .option.selected { color: var(--app-accent, #2563EB); font-weight: 600; }

    .no-results {
      padding: 0.85rem;
      font-size: 0.88rem;
      color: var(--app-text-muted, #626B74);
      text-align: center;
    }
  `;constructor(){super(),this.options=[],this.value=``,this.placeholder=`Selecteer...`,this.name=``,this.required=!1,this.searchable=!1,this._open=!1,this._query=``}get _selected(){return this.options.find(e=>String(e.value)===String(this.value))}get _filtered(){if(!this._query)return this.options;let e=this._query.toLowerCase();return this.options.filter(t=>t.label.toLowerCase().includes(e))}_toggle(){this._open?this._close():this._openDropdown()}_openDropdown(){this._open=!0,this._query=``,this.updateComplete.then(()=>{this.shadowRoot.querySelector(`.search-wrap input`)?.focus()})}_close(){this._open=!1,this._query=``}_select(e){this.value=String(e.value),this._close(),this.dispatchEvent(new CustomEvent(`change`,{detail:{value:this.value},bubbles:!0,composed:!0}))}_handleOutside(e){this.shadowRoot.contains(e.composedPath()[0])||this._close()}connectedCallback(){super.connectedCallback(),document.addEventListener(`pointerdown`,this._handleOutside.bind(this))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`pointerdown`,this._handleOutside.bind(this))}render(){let e=this._selected,t=this._filtered;return T`
      <button type="button" class="trigger ${this._open?`open`:``}"
        @click=${this._toggle}>
        <span class="trigger-label ${e?``:`placeholder`}">
          ${e?e.label:this.placeholder}
        </span>
        <span class="chevron ${this._open?`open`:``}">${ft(14)}</span>
      </button>

      ${this._open?T`
        <div class="dropdown">
          ${this.searchable?T`
            <div class="search-wrap">
              <span class="search-icon">${lt(14)}</span>
              <input
                type="text"
                placeholder="Zoeken..."
                .value=${this._query}
                @input=${e=>this._query=e.target.value}
                @keydown=${e=>e.key===`Escape`&&this._close()}>
            </div>
          `:``}
          <div class="options-list">
            ${t.length===0?T`<div class="no-results">Geen resultaten</div>`:t.map(e=>T`
                <div class="option ${String(e.value)===String(this.value)?`selected`:``}"
                  @pointerdown=${()=>this._select(e)}>
                  ${e.label}
                </div>
              `)}
          </div>
        </div>
      `:``}
    `}};customElements.define(`searchable-select`,Lt);var Rt=class extends M{static properties={open:{type:Boolean},shift:{type:Object},employees:{type:Array},locationId:{type:Number},_saving:{state:!0},_error:{state:!0},_employeeId:{state:!0},_startTime:{state:!0},_endTime:{state:!0}};static styles=o`
    :host { -webkit-tap-highlight-color: transparent; }

    .overlay {
      position: fixed; inset: 0;
      background: rgba(15,37,55,0.6);
      display: flex; align-items: center; justify-content: center;
      z-index: 200; padding: 1rem;
      backdrop-filter: blur(2px);
    }

    .modal {
      background: #fff;
      border-radius: 16px;
      padding: 0;
      width: 100%;
      max-width: 480px;
      box-shadow: var(--shadow-lg, 0 12px 32px rgba(0,0,0,0.14));
      overflow: hidden;
    }

    .modal-header {
      background: var(--app-blue, #0F2537);
      color: #fff;
      padding: 1.1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h3 { font-size: 1rem; font-weight: 700; }

    .close-btn {
      background: rgba(255,255,255,0.1);
      border: none; color: #fff;
      width: 30px; height: 30px;
      border-radius: 6px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }

    .close-btn:hover { background: rgba(255,255,255,0.2); }

    .modal-body { padding: 1.25rem 1.25rem 0.5rem; }

    .field { margin-bottom: 0.9rem; }

    label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--app-text-muted, #626B74);
      margin-bottom: 0.35rem;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 0.85rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 8px;
      font-size: 0.92rem;
      outline: none;
      color: var(--app-text-dark, #1A1A1A);
      background: #fafbfc;
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-tap-highlight-color: transparent;
    }

    input:focus {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      background: #fff;
    }

    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; }
    .row .field { margin-bottom: 0; }

    .error {
      background: #ffebee;
      border: 1px solid rgba(211,47,47,0.3);
      color: #D32F2F;
      border-radius: 8px;
      padding: 0.6rem 0.9rem;
      font-size: 0.84rem;
      margin-bottom: 1rem;
    }

    .modal-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--app-border, #DCDFE3);
      display: flex;
      gap: 0.65rem;
      justify-content: flex-end;
      background: var(--app-bg-light, #F4F6F8);
    }

    .btn {
      padding: 0.65rem 1.4rem;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.18s;
      -webkit-tap-highlight-color: transparent;
    }

    .btn-cancel {
      background: #fff;
      color: var(--app-text-dark, #1A1A1A);
      border: 1.5px solid var(--app-border, #DCDFE3);
    }

    .btn-cancel:hover { background: var(--app-bg-light, #F4F6F8); }

    .btn-save {
      background: var(--app-accent, #2563EB);
      color: #fff;
    }

    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover, #1D4ED8); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  `;constructor(){super(),this.open=!1,this.shift=null,this.employees=[],this._saving=!1,this._error=``,this._employeeId=``,this._date=``,this._startTime=`09:00`,this._endTime=`18:00`}_defaultTimes(e){return e&&new Date(e).getDay()===6?{start:`09:00`,end:`17:00`}:{start:`09:00`,end:`18:00`}}willUpdate(e){if(e.has(`shift`)||e.has(`open`)){this._employeeId=this.shift?.employeeId?String(this.shift.employeeId):``,this._date=this.shift?.date||``;let e=this._defaultTimes(this._date);this._startTime=this.shift?.startTime?.slice(0,5)||e.start,this._endTime=this.shift?.endTime?.slice(0,5)||e.end}}_onDateChange(e){if(this._date=e.target.value,!this.shift?.startTime){let e=this._defaultTimes(this._date);this._startTime=e.start,this._endTime=e.end}}_close(){this.dispatchEvent(new CustomEvent(`close`))}async _submit(e){if(e.preventDefault(),this._error=``,!this._employeeId){this._error=`Selecteer een medewerker.`;return}if(this._date&&new Date(this._date).getDay()===0){this._error=`Zondag is het filiaal gesloten.`;return}this._saving=!0;let t=e.target,n={employeeId:Number(this._employeeId),locationId:this.locationId,date:t.elements.date.value,startTime:t.elements.startTime.value+`:00`,endTime:t.elements.endTime.value+`:00`,note:t.elements.note.value||null};this.dispatchEvent(new CustomEvent(`save`,{detail:{id:this.shift?.id,data:n}})),this._saving=!1}render(){if(!this.open)return T``;let e=this.shift,t=this.employees.map(e=>({value:String(e.id),label:e.fullName})),n=this._date?new Date(this._date).getDay()===0:!1;return T`
      <div class="overlay" @click=${e=>e.target===e.currentTarget&&this._close()}>
        <div class="modal">
          <div class="modal-header">
            <h3>${e?.id?`Dienst bewerken`:`Nieuwe dienst toevoegen`}</h3>
            <button class="close-btn" @click=${this._close}>${G(14)}</button>
          </div>
          <div class="modal-body">
            ${this._error?T`<div class="error">${this._error}</div>`:``}
            ${n?T`<div class="error">Zondag is het filiaal gesloten.</div>`:``}
            <form id="shift-form" @submit=${this._submit}>
              <div class="field">
                <label>Medewerker</label>
                <searchable-select
                  .options=${t}
                  .value=${this._employeeId}
                  placeholder="Kies een medewerker..."
                  searchable
                  @change=${e=>this._employeeId=e.detail.value}>
                </searchable-select>
              </div>
              <div class="field">
                <label>Datum</label>
                <input type="date" name="date" required .value=${this._date}
                  @change=${this._onDateChange}>
              </div>
              <div class="row">
                <div class="field">
                  <label>Begintijd</label>
                  <input type="time" name="startTime" required
                    .value=${this._startTime}
                    @change=${e=>this._startTime=e.target.value}>
                </div>
                <div class="field">
                  <label>Eindtijd</label>
                  <input type="time" name="endTime" required
                    .value=${this._endTime}
                    @change=${e=>this._endTime=e.target.value}>
                </div>
              </div>
              <div class="field">
                <label>Notitie (optioneel)</label>
                <input type="text" name="note" .value=${e?.note||``} placeholder="bijv. kassa, magazijn, klantservice...">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click=${this._close}>Annuleren</button>
            <button class="btn btn-save" form="shift-form" type="submit" ?disabled=${this._saving||n}>
              ${this._saving?`Opslaan...`:`Dienst opslaan`}
            </button>
          </div>
        </div>
      </div>
    `}};customElements.define(`shift-modal`,Rt);var zt=class extends M{static properties={employee:{},open:{type:Boolean},_shifts:{state:!0},_leave:{state:!0},_loading:{state:!0}};static styles=o`
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 500;
    }
    @media (min-width: 560px) {
      .backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: #fff; border-radius: 20px 20px 0 0;
      width: 100%; max-width: 520px; max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 -4px 40px rgba(0,0,0,0.2);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; max-height: 85vh; }
    }

    .modal-head {
      padding: 1.75rem 1.5rem 1.25rem;
      position: relative;
      border-radius: 20px 20px 0 0;
    }
    @media (min-width: 560px) {
      .modal-head { border-radius: 16px 16px 0 0; }
    }

    .close-btn {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(255,255,255,0.22); border: none; cursor: pointer;
      width: 34px; height: 34px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .close-btn:hover { background: rgba(255,255,255,0.38); }

    .head-avatar {
      width: 68px; height: 68px; border-radius: 18px;
      background: rgba(255,255,255,0.22);
      border: 2.5px solid rgba(255,255,255,0.45);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 800; color: #fff;
      margin-bottom: 0.8rem; flex-shrink: 0;
    }
    .head-name {
      font-size: 1.3rem; font-weight: 800; color: #fff;
      line-height: 1.2; margin-bottom: 0.6rem;
    }
    .head-badges { display: flex; gap: 0.4rem; flex-wrap: wrap; }
    .head-badge {
      font-size: 0.72rem; font-weight: 700; padding: 0.22rem 0.65rem;
      border-radius: 20px; background: rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.95); letter-spacing: 0.3px;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .modal-body { padding: 1.25rem 1.5rem 2rem; }

    .section { margin-bottom: 1.5rem; }
    .section-title {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted, #626B74);
      margin-bottom: 0.65rem;
    }

    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; }
    .stat-card {
      background: var(--app-bg-light, #F4F6F8);
      border-radius: 10px; padding: 0.8rem 0.5rem; text-align: center;
    }
    .stat-val { font-size: 1.4rem; font-weight: 900; color: var(--app-text-dark, #1A1A1A); }
    .stat-val.accent { color: var(--app-accent, #2563EB); }
    .stat-lbl { font-size: 0.65rem; color: var(--app-text-muted, #626B74); margin-top: 0.2rem; }

    .shift-row {
      display: flex; align-items: center; gap: 0.65rem;
      padding: 0.55rem 0; border-bottom: 1px solid var(--app-border, #DCDFE3);
    }
    .shift-row:last-child { border-bottom: none; }
    .shift-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .shift-date { font-size: 0.78rem; color: var(--app-text-muted); width: 80px; flex-shrink: 0; }
    .shift-time { font-size: 0.88rem; font-weight: 600; flex: 1; }
    .shift-hrs { font-size: 0.78rem; font-weight: 700; color: var(--app-accent, #2563EB); white-space: nowrap; }

    .leave-pills { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 0.85rem; }
    .leave-pill {
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0.28rem 0.7rem; border-radius: 20px;
      font-size: 0.76rem; font-weight: 600;
    }
    .pill-total    { background: var(--app-bg-light, #F4F6F8); color: var(--app-text-dark, #1A1A1A); }
    .pill-pending  { background: #FEF3C7; color: #92400E; }
    .pill-approved { background: #D1FAE5; color: #065F46; }
    .pill-rejected { background: #FEE2E2; color: #991B1B; }

    .leave-card {
      border-radius: 9px; padding: 0.7rem 0.9rem; margin-bottom: 0.4rem;
      border-left: 3px solid transparent;
    }
    .leave-card.approved { background: #D1FAE5; border-left-color: #10B981; }
    .leave-card.pending  { background: #FEF3C7; border-left-color: #F59E0B; }
    .leave-card.rejected { background: #FEE2E2; border-left-color: #EF4444; }

    .leave-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.2rem; }
    .leave-dates { font-size: 0.85rem; font-weight: 700; }
    .leave-status-badge {
      font-size: 0.66rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.4px; padding: 0.12rem 0.45rem;
      border-radius: 20px; white-space: nowrap;
    }
    .leave-card.approved .leave-status-badge { background: rgba(16,185,129,0.18); color: #065F46; }
    .leave-card.pending  .leave-status-badge { background: rgba(245,158,11,0.2); color: #92400E; }
    .leave-card.rejected .leave-status-badge { background: rgba(239,68,68,0.18); color: #991B1B; }

    .leave-reason { font-size: 0.78rem; opacity: 0.8; }
    .leave-rejection { font-size: 0.76rem; font-style: italic; margin-top: 0.2rem; opacity: 0.75; }

    .empty-note { font-size: 0.83rem; color: var(--app-text-muted, #626B74); }

    .divider { border: none; border-top: 1px solid var(--app-border, #DCDFE3); margin: 0 0 1.5rem; }
  `;constructor(){super(),this._shifts=[],this._leave=[],this._loading=!1}updated(e){e.has(`open`)&&this.open&&this.employee&&this._loadData()}async _loadData(){this._loading=!0;let e=J(0),t=Y(e,6);try{[this._shifts,this._leave]=await Promise.all([at(this.employee.id,X(e),X(t)),Xe(this.employee.id)])}catch{this._shifts=[],this._leave=[]}finally{this._loading=!1}}_initials(e){return(e||``).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}_fmtDate(e){return new Date(e).toLocaleDateString(`nl-NL`,{day:`numeric`,month:`short`})}_statusLabel(e){return{PENDING:`In behandeling`,APPROVED:`Goedgekeurd`,REJECTED:`Afgewezen`}[e]||e}render(){if(!this.open||!this.employee)return T``;let e=this.employee,t=$(e.id),n=[...this._shifts||[]].sort((e,t)=>e.date.localeCompare(t.date)||e.startTime.localeCompare(t.startTime)),r=n.reduce((e,t)=>e+Q(t.startTime,t.endTime),0),i=this._leave.filter(e=>e.status===`PENDING`).length,a=this._leave.filter(e=>e.status===`APPROVED`).length,o=this._leave.filter(e=>e.status===`REJECTED`).length,s=[`zo`,`ma`,`di`,`wo`,`do`,`vr`,`za`];return T`
      <div class="backdrop" @click=${e=>e.target===e.currentTarget&&this._close()}>
        <div class="modal">

          <div class="modal-head" style="background: linear-gradient(140deg, ${t} 0%, ${t}bb 100%)">
            <button class="close-btn" @click=${this._close}>${G(14)}</button>
            <div class="head-avatar">${this._initials(e.name)}</div>
            <div class="head-name">${e.name}</div>
            <div class="head-badges">
              <span class="head-badge">${e.role===`EMPLOYER`?`Manager`:`Medewerker`}</span>
              ${e.locationName?T`<span class="head-badge">${Ct(11)} ${e.locationName}</span>`:``}
              <span class="head-badge">Code: ${String(e.id).padStart(6,`0`)}</span>
            </div>
          </div>

          <div class="modal-body">

            ${this._loading?``:T`
              <div class="section">
                <div class="section-title">Deze week</div>
                <div class="stats-row">
                  <div class="stat-card">
                    <div class="stat-val accent">${r.toFixed(1)}</div>
                    <div class="stat-lbl">Uren ingepland</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-val">${n.length}</div>
                    <div class="stat-lbl">Diensten</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-val">${n.length>0?(r/n.length).toFixed(1):`–`}</div>
                    <div class="stat-lbl">Gem. per dienst</div>
                  </div>
                </div>
              </div>

              ${n.length>0?T`
                <div class="section">
                  <div class="section-title">Diensten</div>
                  ${n.map(e=>T`
                    <div class="shift-row">
                      <div class="shift-dot" style="background:${t}"></div>
                      <div class="shift-date">${s[new Date(e.date).getDay()]} ${this._fmtDate(e.date)}</div>
                      <div class="shift-time">${e.startTime.slice(0,5)} – ${e.endTime.slice(0,5)}</div>
                      <div class="shift-hrs">${Q(e.startTime,e.endTime).toFixed(1)}u</div>
                    </div>
                  `)}
                </div>
              `:``}

              <hr class="divider">
            `}

            <div class="section">
              <div class="section-title">Verlof</div>
              ${this._loading?T`<p class="empty-note">Laden...</p>`:T`
                <div class="leave-pills">
                  <span class="leave-pill pill-total">${q(12)} ${this._leave.length} totaal</span>
                  ${i>0?T`<span class="leave-pill pill-pending">${i} openstaand</span>`:``}
                  ${a>0?T`<span class="leave-pill pill-approved">${a} goedgekeurd</span>`:``}
                  ${o>0?T`<span class="leave-pill pill-rejected">${o} afgewezen</span>`:``}
                </div>
                ${this._leave.length===0?T`<p class="empty-note">Geen verlofaanvragen.</p>`:this._leave.slice(0,10).map(e=>T`
                    <div class="leave-card ${e.status.toLowerCase()}">
                      <div class="leave-head">
                        <div class="leave-dates">
                          ${this._fmtDate(e.startDate)}${e.startDate===e.endDate?``:` – ${this._fmtDate(e.endDate)}`}
                        </div>
                        <span class="leave-status-badge">${this._statusLabel(e.status)}</span>
                      </div>
                      <div class="leave-reason">${e.reason}</div>
                      ${e.rejectionReason?T`<div class="leave-rejection">Afwijzing: ${e.rejectionReason}</div>`:``}
                    </div>
                  `)}
              `}
            </div>

          </div>
        </div>
      </div>
    `}_close(){this.dispatchEvent(new CustomEvent(`close`,{bubbles:!0,composed:!0}))}};customElements.define(`employee-detail-modal`,zt);var Bt=class extends M{static properties={open:{type:Boolean},title:{},message:{},confirmLabel:{},danger:{type:Boolean}};static styles=o`
    .backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 700;
    }
    @media (min-width: 480px) {
      .backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: #fff; border-radius: 16px 16px 0 0;
      width: 100%; max-width: 400px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 32px rgba(0,0,0,0.18);
    }
    @media (min-width: 480px) {
      .modal { border-radius: 14px; padding: 1.75rem; }
    }

    .modal-head {
      display: flex; align-items: flex-start; gap: 0.9rem; margin-bottom: 0.75rem;
    }
    .icon-wrap {
      width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .icon-wrap.danger { background: #FEE2E2; color: #DC2626; }
    .icon-wrap.info   { background: #FEF3C7; color: #D97706; }

    .modal-title {
      font-size: 1rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A);
      line-height: 1.25; margin-top: 0.4rem;
    }
    .modal-message {
      font-size: 0.85rem; color: var(--app-text-muted, #626B74);
      margin-bottom: 1.25rem; line-height: 1.5;
    }

    .actions { display: flex; gap: 0.65rem; }
    .btn {
      flex: 1; padding: 0.75rem; border-radius: 9px; font-size: 0.9rem;
      font-weight: 700; cursor: pointer; border: none; transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-cancel {
      background: var(--app-bg-light, #F4F6F8);
      color: var(--app-text-dark, #1A1A1A);
    }
    .btn-cancel:hover { background: var(--app-border, #DCDFE3); }
    .btn-danger {
      background: #EF4444; color: #fff;
    }
    .btn-danger:hover { background: #DC2626; }
  `;_confirm(){this.dispatchEvent(new CustomEvent(`confirm`,{bubbles:!0,composed:!0}))}_cancel(){this.dispatchEvent(new CustomEvent(`cancel`,{bubbles:!0,composed:!0}))}render(){if(!this.open)return T``;let e=this.confirmLabel||`Verwijderen`;return T`
      <div class="backdrop" @click=${e=>e.target===e.currentTarget&&this._cancel()}>
        <div class="modal">
          <div class="modal-head">
            <div class="icon-wrap ${this.danger===!1?`info`:`danger`}">
              ${V(18)}
            </div>
            <div class="modal-title">${this.title||`Weet je het zeker?`}</div>
          </div>
          ${this.message?T`<p class="modal-message">${this.message}</p>`:``}
          <div class="actions">
            <button class="btn btn-cancel" @click=${this._cancel}>Annuleren</button>
            <button class="btn btn-danger" @click=${this._confirm}>${e}</button>
          </div>
        </div>
      </div>
    `}};customElements.define(`confirm-modal`,Bt);var Vt=class extends M{static properties={_locations:{state:!0},_activeLocationId:{state:!0},_weekOffset:{state:!0},_shifts:{state:!0},_employees:{state:!0},_modalOpen:{state:!0},_editShift:{state:!0},_loading:{state:!0},_error:{state:!0},_empDetail:{state:!0},_confirmModal:{state:!0}};static styles=o`
    :host { display: block; }

    /* Toolbar */
    .toolbar {
      background: #fff;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      position: sticky; top: 0; z-index: 50;
    }

    /* Location tabs row */
    .toolbar-tabs {
      display: flex; align-items: center; gap: 0.35rem;
      padding: 0.6rem 1rem 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .toolbar-tabs::-webkit-scrollbar { display: none; }

    .tab {
      padding: 0.4rem 1rem;
      border-radius: 20px;
      border: 1.5px solid var(--app-border, #DCDFE3);
      background: transparent;
      font-size: 0.85rem; font-weight: 500;
      cursor: pointer; color: var(--app-text-muted, #626B74);
      transition: all 0.15s; white-space: nowrap;
      flex-shrink: 0;
    }
    .tab.active {
      background: var(--app-accent, #2563EB);
      border-color: var(--app-accent, #2563EB);
      color: #fff; font-weight: 600;
    }
    .tab:hover:not(.active) { border-color: var(--app-accent, #2563EB); color: var(--app-accent, #2563EB); }

    /* Week navigation row */
    .toolbar-nav {
      display: flex; align-items: center; gap: 0.25rem;
      padding: 0.45rem 1rem;
    }

    .week-nav {
      display: flex; align-items: center;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px; background: #fff;
      overflow: hidden; flex-shrink: 0;
    }

    .nav-arrow {
      width: 34px; height: 36px; border: none; background: none;
      cursor: pointer; color: var(--app-text-muted);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s; flex-shrink: 0;
    }
    .nav-arrow:hover { background: var(--app-bg-light, #F4F6F8); color: var(--app-text-dark); }

    .week-center {
      padding: 0.25rem 0.7rem; text-align: center;
      border-left: 1px solid var(--app-border, #DCDFE3);
      border-right: 1px solid var(--app-border, #DCDFE3);
      min-width: 130px;
    }
    .week-num { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--app-accent, #2563EB); letter-spacing: 0.5px; line-height: 1; }
    .week-range { font-size: 0.8rem; font-weight: 600; color: var(--app-text-dark); white-space: nowrap; line-height: 1.3; }

    .nav-spacer { flex: 1; }

    .add-btn {
      display: flex; align-items: center; gap: 0.35rem;
      background: var(--app-accent, #2563EB); color: #fff;
      border: none; border-radius: 8px;
      padding: 0.45rem 0.9rem;
      font-size: 0.85rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
      white-space: nowrap; flex-shrink: 0;
    }
    .add-btn:hover { background: var(--app-accent-hover, #1D4ED8); }

    /* Error */
    .error-bar {
      margin: 0.75rem 1rem;
      padding: 0.7rem 1rem;
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 8px; font-size: 0.84rem;
    }

    /* Day grid */
    .week-grid {
      padding: 1rem;
      box-sizing: border-box;
      display: flex; flex-direction: column; gap: 0.65rem;
    }

    .day-card {
      background: #fff;
      border-radius: 12px;
      border: 1.5px solid var(--app-border, #DCDFE3);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .day-card.today {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 2px rgba(37,99,235,0.12);
    }

    .day-card.closed { opacity: 0.5; }
    .day-card.closed .day-header { background: var(--app-bg-light, #F4F6F8); }

    .day-header {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.65rem 1rem;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      background: var(--app-bg-light, #F4F6F8);
    }

    .day-card.today .day-header { background: rgba(37,99,235,0.06); }

    .day-label { display: flex; align-items: baseline; gap: 0.4rem; flex: 1; min-width: 0; }

    .day-name {
      font-size: 0.9rem; font-weight: 700; color: var(--app-text-dark);
      white-space: nowrap;
    }
    .day-card.today .day-name { color: var(--app-accent, #2563EB); }

    .day-date-str { font-size: 0.78rem; color: var(--app-text-muted); white-space: nowrap; }

    .day-meta { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }

    .staff-pill {
      background: var(--app-accent, #2563EB);
      color: #fff; font-size: 0.7rem; font-weight: 700;
      padding: 0.18rem 0.5rem; border-radius: 20px;
      white-space: nowrap;
    }

    .add-day-btn {
      height: 30px; flex-shrink: 0;
      background: var(--app-bg-light, #F4F6F8);
      border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted);
      border-radius: 7px;
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0 0.65rem;
      cursor: pointer; transition: all 0.15s;
      font-size: 0.8rem; font-weight: 600; white-space: nowrap;
    }
    .add-day-btn:hover {
      border-color: var(--app-accent, #2563EB);
      color: var(--app-accent, #2563EB);
      background: #fff;
    }
    .add-day-label { display: none; }
    @media (min-width: 601px) { .add-day-label { display: inline; } }

    /* Shifts inside day */
    .day-shifts {
      padding: 0.65rem 1rem;
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      min-height: 52px; align-items: flex-start;
    }

    .empty-day {
      color: var(--app-text-muted); font-size: 0.82rem;
      font-style: italic; align-self: center; padding: 0.25rem 0;
    }

    .shift-card {
      display: flex; align-items: center; gap: 0.55rem;
      padding: 0.5rem 0.75rem;
      border-radius: 8px; border: 1px solid transparent;
      flex: 1 1 200px; min-width: 0;
      transition: box-shadow 0.15s; cursor: pointer;
    }
    @media (max-width: 480px) { .shift-card { flex: 1 1 100%; } }
    .shift-card:hover { box-shadow: var(--shadow-sm); }

    .emp-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

    .shift-info { flex: 1; min-width: 0; }

    .shift-name {
      font-size: 0.88rem; font-weight: 600; color: var(--app-text-dark);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .shift-time { font-size: 0.76rem; color: var(--app-text-muted); margin-top: 0.05rem; }
    .shift-note { font-size: 0.72rem; color: var(--app-text-muted); font-style: italic; }

    .hours-pill {
      font-size: 0.72rem; font-weight: 700;
      background: var(--app-bg-light, #F4F6F8);
      padding: 0.18rem 0.45rem; border-radius: 5px;
      white-space: nowrap; flex-shrink: 0;
    }

    .shift-actions { display: flex; gap: 0.3rem; flex-shrink: 0; }

    .icon-btn {
      width: 36px; height: 36px; border: none;
      background: rgba(0,0,0,0.07); border-radius: 7px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted); transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .icon-btn:hover { background: rgba(0,0,0,0.13); color: var(--app-text-dark); }
    .icon-btn.del:hover { background: #ffebee; color: #C62828; }

    /* Skeleton */
    .skeleton { padding: 1rem; display: flex; flex-direction: column; gap: 0.65rem; }
    .skel { height: 90px; border-radius: 12px; background: linear-gradient(90deg, #f0f2f4 25%, #e8eaec 50%, #f0f2f4 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    @media (max-width: 600px) {
      .week-grid { padding: 0.75rem; }
      .day-shifts { padding: 0.6rem 0.75rem; }
      .day-header { padding: 0.55rem 0.75rem; }
      .toolbar-tabs { padding: 0.5rem 0.75rem 0; }
      .toolbar-nav { padding: 0.4rem 0.75rem; }
      .week-center { min-width: 110px; }
    }
  `;constructor(){super(),this._locations=[],this._activeLocationId=null,this._weekOffset=0,this._shifts=[],this._employees=[],this._modalOpen=!1,this._editShift=null,this._loading=!0,this._error=``,this._empDetail=null,this._confirmModal=null}async connectedCallback(){super.connectedCallback();try{this._locations=await Le(),this._activeLocationId=this._locations[0]?.id,await this._loadData()}catch{this._error=`Kon locaties niet laden.`,this._loading=!1}}async _loadData(){if(this._activeLocationId){this._loading=!0,this._error=``;try{let e=J(this._weekOffset),t=Y(e,6);[this._shifts,this._employees]=await Promise.all([ze(this._activeLocationId,X(e),X(t)),Ge()])}catch{this._error=`Kon roosterdata niet laden.`}finally{this._loading=!1}}}_setLocation(e){this._activeLocationId=e,this._loadData()}_prevWeek(){this._weekOffset--,this._loadData()}_nextWeek(){this._weekOffset++,this._loadData()}_thisWeek(){this._weekOffset=0,this._loadData()}_openAdd(e=null){this._editShift=e?{date:e}:null,this._modalOpen=!0}_openEdit(e){this._editShift={...e},this._modalOpen=!0}_closeModal(){this._modalOpen=!1,this._editShift=null}async _handleSave({detail:{id:e,data:t}}){try{e?await He(e,t):await Ve(t),this._closeModal(),await this._loadData()}catch(e){this._error=e.message||`Opslaan mislukt.`}}_handleDelete(e){this._confirmModal={title:`Dienst verwijderen?`,message:`Deze actie kan niet ongedaan worden gemaakt.`,confirmLabel:`Verwijderen`,onConfirm:async()=>{this._confirmModal=null;try{await Ue(e),await this._loadData()}catch{this._error=`Verwijderen mislukt.`}}}}_isToday(e){return e===X(new Date)}render(){let e=Ft(this._weekOffset);return T`
      <div class="toolbar">
        <div class="toolbar-tabs">
          ${this._locations.map(e=>T`
            <button class="tab ${this._activeLocationId===e.id?`active`:``}"
              @click=${()=>this._setLocation(e.id)}>${e.name}</button>
          `)}
        </div>
        <div class="toolbar-nav">
          <div class="week-nav">
            <button class="nav-arrow" @click=${this._prevWeek}>${H(14)}</button>
            <div class="week-center">
              <div class="week-num">Week ${Pt(this._weekOffset)}</div>
              <div class="week-range">${Nt(this._weekOffset)}</div>
            </div>
            <button class="nav-arrow" @click=${this._nextWeek}>${dt(14)}</button>
          </div>
          <div class="nav-spacer"></div>
          <button class="add-btn" @click=${()=>this._openAdd()}>${B(15)} Dienst</button>
        </div>
      </div>

      ${this._error?T`<div class="error-bar">${this._error}</div>`:``}

      ${this._loading?T`
        <div class="skeleton">${[0,1,2,3,4,5,6].map(()=>T`<div class="skel"></div>`)}</div>
      `:T`
        <div class="week-grid">
          ${e.map(({iso:e,dayFull:t,date:n})=>{let r=this._shifts.filter(t=>t.date===e),i=this._isToday(e),a=n.getDay()===0;return T`
              <div class="day-card ${i?`today`:``} ${a?`closed`:``}">
                <div class="day-header">
                  <div class="day-label">
                    <span class="day-name">${t}</span>
                    <span class="day-date-str">${n.getDate()} ${n.toLocaleString(`nl`,{month:`long`})}</span>
                  </div>
                  <div class="day-meta">
                    ${r.length>0?T`
                      <span class="staff-pill">${r.length} dienst${r.length===1?``:`en`}</span>
                    `:``}
                    ${a?``:T`
                      <button class="add-day-btn" title="Dienst toevoegen" @click=${()=>this._openAdd(e)}>
                        ${B(13)}<span class="add-day-label">Dienst toevoegen</span>
                      </button>
                    `}
                  </div>
                </div>
                <div class="day-shifts">
                  ${a?T`
                    <span class="empty-day">Gesloten</span>
                  `:r.length===0?T`
                    <span class="empty-day">Geen diensten, klik op "+ Dienst toevoegen" om te plannen</span>
                  `:r.map(e=>{let t=$(e.employeeId),n=Q(e.startTime,e.endTime);return T`
                      <div class="shift-card" style="background:${t}12; border-color:${t}28;"
                        @click=${()=>{let t=this._employees.find(t=>t.id===e.employeeId);this._empDetail={id:e.employeeId,name:e.employeeName,role:t?.role,locationName:t?.locationName}}}>
                        <div class="emp-dot" style="background:${t};"></div>
                        <div class="shift-info">
                          <div class="shift-name">${e.employeeName}</div>
                          <div class="shift-time">${e.startTime.slice(0,5)} – ${e.endTime.slice(0,5)}</div>
                          ${e.note?T`<div class="shift-note">${e.note}</div>`:``}
                        </div>
                        <span class="hours-pill">${n.toFixed(1)}u</span>
                        <div class="shift-actions" @click=${e=>e.stopPropagation()}>
                          <button class="icon-btn" title="Bewerken" @click=${()=>this._openEdit(e)}>${ut(16)}</button>
                          <button class="icon-btn del" title="Verwijderen" @click=${()=>this._handleDelete(e.id)}>${V(16)}</button>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `})}
        </div>
      `}

      <shift-modal
        .open=${this._modalOpen}
        .shift=${this._editShift}
        .employees=${this._employees}
        .locationId=${this._activeLocationId}
        @close=${this._closeModal}
        @save=${this._handleSave}
      ></shift-modal>

      <employee-detail-modal
        .open=${!!this._empDetail}
        .employee=${this._empDetail}
        @close=${()=>this._empDetail=null}
      ></employee-detail-modal>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title||``}
        .message=${this._confirmModal?.message||``}
        .confirmLabel=${this._confirmModal?.confirmLabel||`Verwijderen`}
        danger
        @confirm=${()=>this._confirmModal?.onConfirm?.()}
        @cancel=${()=>this._confirmModal=null}
      ></confirm-modal>
    `}};customElements.define(`schedule-page`,Vt);var Ht=class extends M{static properties={open:{type:Boolean},user:{type:Object},locations:{type:Array},_saving:{state:!0},_error:{state:!0},_role:{state:!0},_locationId:{state:!0}};static styles=o`
    .overlay {
      position: fixed; inset: 0; background: rgba(15,37,55,0.6);
      display: flex; align-items: center; justify-content: center;
      z-index: 200; padding: 1rem; backdrop-filter: blur(2px);
    }
    .modal { background: #fff; border-radius: 16px; width: 100%; max-width: 460px; overflow: hidden; box-shadow: var(--shadow-lg, 0 12px 32px rgba(0,0,0,0.14)); }
    .modal-header { background: var(--app-blue, #0F2537); color: #fff; padding: 1.1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
    .modal-header h3 { font-size: 1rem; font-weight: 700; }
    .close-btn { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    .close-btn:hover { background: rgba(255,255,255,0.2); }
    .modal-body { padding: 1.5rem; }
    .field { margin-bottom: 1rem; }
    label { display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--app-text-muted, #626B74); margin-bottom: 0.4rem; }
    input { box-sizing: border-box; width: 100%; padding: 0.75rem 0.9rem; border: 1.5px solid var(--app-border, #DCDFE3); border-radius: 8px; font-size: 0.92rem; outline: none; color: var(--app-text-dark, #1A1A1A); background: #fafbfc; transition: border-color 0.18s, box-shadow 0.18s; }
    input:focus, select:focus { border-color: var(--app-accent, #2563EB); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); background: #fff; }
    .hint { font-size: 0.78rem; color: var(--app-text-muted, #626B74); margin-top: 0.3rem; }
    .error { background: #ffebee; border: 1px solid rgba(211,47,47,0.3); color: #D32F2F; border-radius: 8px; padding: 0.6rem 0.9rem; font-size: 0.84rem; margin-bottom: 1rem; }
    .modal-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--app-border, #DCDFE3); display: flex; gap: 0.75rem; justify-content: flex-end; background: var(--app-bg-light, #F4F6F8); }
    .btn { padding: 0.65rem 1.4rem; border-radius: 8px; font-size: 0.88rem; font-weight: 600; cursor: pointer; border: none; transition: all 0.18s; }
    .btn-cancel { background: #fff; color: var(--app-text-dark, #1A1A1A); border: 1.5px solid var(--app-border, #DCDFE3); }
    .btn-cancel:hover { background: #f4f6f8; }
    .btn-save { background: var(--app-accent, #2563EB); color: #fff; }
    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover, #1D4ED8); }
    .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  `;constructor(){super(),this.open=!1,this.user=null,this.locations=[],this._saving=!1,this._error=``,this._role=`EMPLOYEE`,this._locationId=``}updated(e){(e.has(`user`)||e.has(`open`))&&(this._role=this.user?.role||`EMPLOYEE`,this._locationId=this.user?.locationId?String(this.user.locationId):this.locations[0]?String(this.locations[0].id):``),e.has(`locations`)&&!this._locationId&&this.locations.length&&(this._locationId=String(this.locations[0].id))}_close(){this.dispatchEvent(new CustomEvent(`close`))}async _submit(e){e.preventDefault(),this._error=``,this._saving=!0;let t=e.target,n=t.elements.fullName.value.trim(),r={fullName:n,role:this._role,locationId:this._locationId?Number(this._locationId):null,password:t.elements.password.value||void 0};this.user||(r.username=n.toLowerCase().replace(/\s+/g,`.`)),this.dispatchEvent(new CustomEvent(`save`,{detail:{id:this.user?.id,data:r}})),this._saving=!1}render(){if(!this.open)return T``;let e=this.user;return T`
      <div class="overlay" @click=${e=>e.target===e.currentTarget&&this._close()}>
        <div class="modal">
          <div class="modal-header">
            <h3>${e?`Medewerker bewerken`:`Nieuwe gebruiker aanmaken`}</h3>
            <button class="close-btn" @click=${this._close}>${G(14)}</button>
          </div>
          <div class="modal-body">
            ${this._error?T`<div class="error">${this._error}</div>`:``}
            <form id="user-form" @submit=${this._submit}>
              <div class="field">
                <label>Volledige naam</label>
                <input name="fullName" type="text" required .value=${e?.fullName||``} placeholder="bijv. Jan Pietersen">
              </div>
              <div class="field">
                <label>Rol</label>
                <searchable-select
                  .options=${[{value:`EMPLOYEE`,label:`Medewerker`},{value:`EMPLOYER`,label:`Manager`}]}
                  .value=${this._role}
                  @change=${e=>this._role=e.detail.value}>
                </searchable-select>
              </div>
              ${this._role===`EMPLOYER`?T`
              <div class="field">
                <label>Filiaal</label>
                <searchable-select
                  .options=${[{value:``,label:`Geen vaste locatie`},...this.locations.map(e=>({value:String(e.id),label:e.name}))]}
                  .value=${this._locationId}
                  @change=${e=>this._locationId=e.detail.value}>
                </searchable-select>
              </div>`:``}
              <div class="field">
                <label>${e?`Nieuw wachtwoord (leeg = niet wijzigen)`:`Wachtwoord`}</label>
                <input name="password" type="password" ?required=${!e} minlength="6" placeholder="${e?`Leeg laten om te behouden`:`Minimaal 6 tekens`}">
                <div class="hint">Minimaal 6 tekens.</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" @click=${this._close}>Annuleren</button>
            <button class="btn btn-save" form="user-form" type="submit" ?disabled=${this._saving}>
              ${this._saving?`Opslaan...`:e?`Wijzigingen opslaan`:`Gebruiker aanmaken`}
            </button>
          </div>
        </div>
      </div>
    `}};customElements.define(`user-modal`,Ht);var Ut=class extends M{static properties={_users:{state:!0},_locations:{state:!0},_loading:{state:!0},_error:{state:!0},_modalOpen:{state:!0},_editUser:{state:!0},_search:{state:!0},_roleFilter:{state:!0},_profileUser:{state:!0},_confirmModal:{state:!0}};static styles=o`
    :host { display: block; overflow-x: hidden; }

    .toolbar {
      background: #fff;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      position: sticky; top: 0; z-index: 50;
    }

    .toolbar-row {
      display: flex; align-items: center; gap: 0.4rem;
      padding: 0.55rem 1.25rem 0;
    }
    .toolbar-row.filters { padding-top: 0.35rem; padding-bottom: 0.55rem; }

    .search-wrap { position: relative; flex: 1; min-width: 0; }
    .search-wrap input {
      box-sizing: border-box;
      width: 100%; padding: 0.48rem 0.85rem 0.48rem 2.1rem;
      border: 1.5px solid var(--app-border, #DCDFE3); border-radius: 8px;
      font-size: 0.85rem; outline: none; transition: border-color 0.18s;
      background: var(--app-bg-light, #F4F6F8);
    }
    .search-wrap input:focus { border-color: var(--app-accent, #2563EB); background: #fff; }
    .search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--app-text-muted, #626B74); display: flex; align-items: center; pointer-events: none; }

    searchable-select.filter { flex: 1; min-width: 0; }

    .add-btn {
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      background: var(--app-accent, #2563EB); color: #fff;
      border: none; border-radius: 8px;
      cursor: pointer; flex-shrink: 0;
      transition: background 0.18s;
    }
    .add-btn:hover { background: var(--app-accent-hover, #1D4ED8); }

    .content { padding: 1.5rem; }

    .stats-bar {
      display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap;
    }

    .stat-card {
      background: #fff; border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 10px; padding: 0.65rem 1rem;
      display: flex; align-items: center; gap: 0.65rem;
      box-shadow: var(--shadow-sm);
      flex: 1; min-width: 110px;
    }

    .stat-icon { display: flex; align-items: center; color: var(--app-text-muted, #626B74); }
    .stat-val { font-size: 1.4rem; font-weight: 800; color: var(--app-blue, #0F2537); line-height: 1; }
    .stat-lbl { font-size: 0.75rem; color: var(--app-text-muted, #626B74); }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.75rem;
    }

    .user-card {
      background: #fff;
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      display: flex; align-items: center; gap: 0.9rem;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.18s, transform 0.1s;
    }

    .user-card:hover { box-shadow: var(--shadow-md); }

    .avatar {
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; font-weight: 700; color: #fff;
      flex-shrink: 0;
    }

    .user-info { flex: 1; min-width: 0; }

    .user-name {
      font-size: 0.95rem; font-weight: 700;
      color: var(--app-text-dark, #1A1A1A);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .user-username { font-size: 0.78rem; color: var(--app-text-muted, #626B74); }

    .user-tags { display: flex; gap: 0.4rem; margin-top: 0.35rem; flex-wrap: wrap; }

    .tag {
      font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem;
      border-radius: 20px; white-space: nowrap;
    }

    .tag-role-employer { background: var(--app-blue-faint, #e8edf2); color: var(--app-blue, #0F2537); }
    .tag-role-employee { background: rgba(46,125,50,0.1); color: var(--app-success, #2E7D32); }
    .tag-loc { background: var(--app-bg-light, #F4F6F8); color: var(--app-text-muted, #626B74); }

    .user-actions { display: flex; gap: 0.3rem; }

    .icon-btn {
      width: 32px; height: 32px; border: none;
      background: var(--app-bg-light, #F4F6F8);
      border-radius: 7px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.9rem; transition: background 0.18s;
    }

    .icon-btn:hover { background: var(--app-border, #DCDFE3); }
    .icon-btn.del:hover { background: var(--app-discount-light, #ffebee); color: var(--app-discount, #D32F2F); }

    .empty { text-align: center; padding: 3rem; color: var(--app-text-muted, #626B74); }
    .error-bar { background: #ffebee; border: 1px solid rgba(211,47,47,0.3); color: #D32F2F; border-radius: 8px; padding: 0.6rem 1rem; margin-bottom: 1rem; font-size: 0.85rem; }

    @media (max-width: 600px) {
      .toolbar-row { padding-left: 1rem; padding-right: 1rem; }
      .content { padding: 1rem; }
      .stat-card { padding: 0.5rem 0.75rem; }
      .stat-val { font-size: 1.2rem; }
    }
  `;constructor(){super(),this._users=[],this._locations=[],this._loading=!0,this._error=``,this._modalOpen=!1,this._editUser=null,this._search=``,this._roleFilter=``,this._profileUser=null,this._confirmModal=null}async connectedCallback(){super.connectedCallback(),await this._load()}async _load(){this._loading=!0;try{[this._users,this._locations]=await Promise.all([We(),Le()])}catch{this._error=`Kon gebruikers niet laden.`}finally{this._loading=!1}}_openAdd(){this._editUser=null,this._modalOpen=!0}_openEdit(e){this._editUser=e,this._modalOpen=!0}_closeModal(){this._modalOpen=!1,this._editUser=null}async _handleSave({detail:{id:e,data:t}}){try{e?await qe(e,t):await Ke(t),this._closeModal(),await this._load()}catch(e){this._error=e.message||`Opslaan mislukt.`}}_handleDelete(e,t){this._confirmModal={title:`Gebruiker verwijderen?`,message:`"${t}" en alle bijbehorende diensten worden definitief verwijderd.`,confirmLabel:`Verwijderen`,onConfirm:async()=>{this._confirmModal=null;try{await Je(e),await this._load()}catch(e){this._error=e.message||`Verwijderen mislukt.`}}}}_filtered(){return this._users.filter(e=>{let t=this._search.toLowerCase();return!(t&&!e.fullName.toLowerCase().includes(t)||this._roleFilter&&e.role!==this._roleFilter)})}_initials(e){return e.split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}render(){let e=this._filtered(),t=this._users.filter(e=>e.role===`EMPLOYEE`).length,n=this._users.filter(e=>e.role===`EMPLOYER`).length;return T`
      <div class="toolbar">
        <div class="toolbar-row">
          <div class="search-wrap">
            <span class="search-icon">${lt(14)}</span>
            <input placeholder="Zoek op naam of gebruikersnaam..."
              .value=${this._search}
              @input=${e=>this._search=e.target.value}>
          </div>
          <button class="add-btn" @click=${this._openAdd} title="Toevoegen">${B(18)}</button>
        </div>
        <div class="toolbar-row filters">
          <searchable-select class="filter"
            .options=${[{value:``,label:`Alle rollen`},{value:`EMPLOYEE`,label:`Medewerkers`},{value:`EMPLOYER`,label:`Managers`}]}
            .value=${this._roleFilter}
            @change=${e=>this._roleFilter=e.detail.value}>
          </searchable-select>
        </div>
      </div>

      <div class="content">
        ${this._error?T`<div class="error-bar">${this._error}</div>`:``}

        <div class="stats-bar">
          <div class="stat-card"><span class="stat-icon">${ct(20)}</span><div><div class="stat-val">${this._users.length}</div><div class="stat-lbl">Totaal gebruikers</div></div></div>
          <div class="stat-card"><span class="stat-icon">${wt(20)}</span><div><div class="stat-val">${t}</div><div class="stat-lbl">Medewerkers</div></div></div>
          <div class="stat-card"><span class="stat-icon">${xt(20)}</span><div><div class="stat-val">${n}</div><div class="stat-lbl">Managers</div></div></div>
        </div>

        ${this._loading?T`<div class="empty">Laden...</div>`:e.length===0?T`<div class="empty">Geen gebruikers gevonden.</div>`:T`
          <div class="user-grid">
            ${e.map(e=>T`
                <div class="user-card">
                  <div class="avatar" style="background:${$(e.id)}">${this._initials(e.fullName)}</div>
                  <div class="user-info">
                    <div class="user-name">${e.fullName}</div>
                    <div class="user-username">${e.loginCode}</div>
                    <div class="user-tags">
                      <span class="tag ${e.role===`EMPLOYER`?`tag-role-employer`:`tag-role-employee`}">
                        ${e.role===`EMPLOYER`?`Manager`:`Medewerker`}
                      </span>
                      ${e.locationName?T`<span class="tag tag-loc">${e.locationName}</span>`:``}
                    </div>
                  </div>
                  <div class="user-actions">
                    <button class="icon-btn" title="Profiel bekijken"
                      @click=${()=>this._profileUser={id:e.id,name:e.fullName,role:e.role,locationName:e.locationName}}>
                      ${ht(14)}
                    </button>
                    <button class="icon-btn" title="Bewerken" @click=${()=>this._openEdit(e)}>${ut(14)}</button>
                    <button class="icon-btn del" title="Verwijderen" @click=${()=>this._handleDelete(e.id,e.fullName)}>${V(14)}</button>
                  </div>
                </div>
              `)}
          </div>
        `}
      </div>

      <user-modal
        .open=${this._modalOpen}
        .user=${this._editUser}
        .locations=${this._locations}
        @close=${this._closeModal}
        @save=${this._handleSave}
      ></user-modal>

      <employee-detail-modal
        .open=${!!this._profileUser}
        .employee=${this._profileUser}
        @close=${()=>this._profileUser=null}
      ></employee-detail-modal>

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title||``}
        .message=${this._confirmModal?.message||``}
        .confirmLabel=${this._confirmModal?.confirmLabel||`Verwijderen`}
        danger
        @confirm=${()=>this._confirmModal?.onConfirm?.()}
        @cancel=${()=>this._confirmModal=null}
      ></confirm-modal>
    `}};customElements.define(`users-page`,Ut);var Wt=class extends M{static properties={_saving:{state:!0},_success:{state:!0},_error:{state:!0},_pwVisible:{state:!0}};static styles=o`
    :host { display: block; background: var(--app-bg-light, #F4F6F8); min-height: calc(100vh - 60px); }

    .page { max-width: 640px; margin: 0 auto; padding: 1.25rem 1rem; }

    /* Profile hero */
    .profile-hero {
      background: var(--app-blue, #0F2537);
      border-radius: 16px;
      padding: 1.75rem 1.5rem;
      display: flex; align-items: center; gap: 1.25rem;
      margin-bottom: 1.25rem;
      color: #fff;
      box-shadow: 0 4px 16px rgba(15,37,55,0.15);
    }

    .avatar-big {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(255,255,255,0.25);
      border: 3px solid rgba(255,255,255,0.5);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; font-weight: 900; color: #fff;
      flex-shrink: 0;
    }

    .profile-info { flex: 1; min-width: 0; }

    .profile-name {
      font-size: 1.3rem; font-weight: 800; line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .profile-tags { display: flex; gap: 0.4rem; margin-top: 0.6rem; flex-wrap: wrap; }

    .ptag {
      background: rgba(255,255,255,0.22);
      border-radius: 20px; padding: 0.2rem 0.65rem;
      font-size: 0.72rem; font-weight: 600; white-space: nowrap;
      display: inline-flex; align-items: center; gap: 0.3rem;
    }

    /* Cards */
    .card {
      background: #fff;
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 14px;
      margin-bottom: 1rem;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .card-header {
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      background: var(--app-bg-light, #F4F6F8);
      display: flex; align-items: center; gap: 0.6rem;
    }

    .card-header h3 {
      font-size: 0.9rem; font-weight: 700;
      color: var(--app-text-dark, #1A1A1A);
    }

    .card-icon { display: flex; align-items: center; color: var(--app-text-muted); }

    .card-body { padding: 1.25rem; }

    /* Info rows */
    .info-row {
      display: flex; align-items: center;
      padding: 0.6rem 0;
      border-bottom: 1px solid var(--app-bg-light, #F4F6F8);
      gap: 0.75rem;
    }

    .info-row:last-child { border-bottom: none; }

    .info-label {
      font-size: 0.78rem; color: var(--app-text-muted);
      font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px;
      min-width: 110px; flex-shrink: 0;
    }

    .info-value {
      font-size: 0.9rem; color: var(--app-text-dark);
      font-weight: 500; flex: 1;
    }

    .role-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      padding: 0.2rem 0.65rem; border-radius: 20px;
      font-size: 0.75rem; font-weight: 700;
    }

    .role-employer { background: rgba(37,99,235,0.1); color: var(--app-accent, #2563EB); }
    .role-employee { background: rgba(46,125,50,0.1); color: #2E7D32; }

    /* Form */
    .field { margin-bottom: 1rem; }

    label {
      display: block;
      font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--app-text-muted);
      margin-bottom: 0.4rem;
    }

    .pw-wrap { position: relative; }

    /* 16px prevents iOS zoom */
    input {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px;
      font-size: 16px;
      outline: none;
      color: var(--app-text-dark);
      background: var(--app-bg-light, #F4F6F8);
      transition: border-color 0.18s, box-shadow 0.18s;
      -webkit-appearance: none;
      box-sizing: border-box;
    }

    input:focus {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
      background: #fff;
    }

    .pw-wrap input { padding-right: 3rem; }

    .pw-toggle {
      position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted); font-size: 1rem; padding: 0.25rem;
    }

    .hint-text {
      font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.3rem;
    }

    .btn-save {
      background: var(--app-accent, #2563EB);
      color: #fff; border: none;
      border-radius: 10px; padding: 0.85rem 1.5rem;
      font-size: 0.92rem; font-weight: 700;
      cursor: pointer; transition: background 0.15s;
      width: 100%; min-height: 48px;
      -webkit-appearance: none;
    }

    .btn-save:hover:not(:disabled) { background: var(--app-accent-hover, #1D4ED8); }
    .btn-save:disabled { opacity: 0.55; cursor: not-allowed; }

    .success-msg {
      display: flex; align-items: center; gap: 0.5rem;
      background: #e8f5e9; border: 1px solid rgba(46,125,50,0.25);
      color: #2E7D32; border-radius: 8px;
      padding: 0.7rem 1rem; font-size: 0.84rem; margin-bottom: 1rem;
    }

    .error-msg {
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 8px;
      padding: 0.7rem 1rem; font-size: 0.84rem; margin-bottom: 1rem;
    }

    /* Logout */
    .btn-logout {
      width: 100%; padding: 0.85rem;
      background: none; border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px; font-size: 0.9rem; font-weight: 600;
      color: var(--app-text-muted); cursor: pointer;
      transition: all 0.15s; min-height: 48px;
    }

    .btn-logout:hover {
      border-color: #C62828; color: #C62828;
      background: #ffebee;
    }

    @media (max-width: 480px) {
      .profile-hero { flex-direction: column; text-align: center; padding: 1.25rem 1rem; }
      .profile-tags { justify-content: center; }
      .info-label { min-width: 90px; }
    }
  `;constructor(){super(),this._saving=!1,this._success=``,this._error=``,this._pwVisible=!1}_initials(){return(N.user?.fullName||``).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}async _savePassword(e){e.preventDefault();let t=e.target,n=t.elements.password.value;if(n!==t.elements.password2.value){this._error=`Wachtwoorden komen niet overeen.`;return}if(n.length<6){this._error=`Wachtwoord moet minimaal 6 tekens zijn.`;return}this._saving=!0,this._error=``,this._success=``;try{let e=N.user;await qe(e.id||e.userId,{fullName:e.fullName,role:e.role,locationId:e.locationId,password:n}),this._success=`Wachtwoord succesvol gewijzigd!`,t.reset()}catch(e){this._error=e.message||`Opslaan mislukt.`}finally{this._saving=!1}}render(){let e=N.user;return e?($(1),T`
      <div class="page">
        <!-- Hero -->
        <div class="profile-hero">
          <div class="avatar-big">${this._initials()}</div>
          <div class="profile-info">
            <div class="profile-name">${e.fullName}</div>
            <div class="profile-tags">
              <span class="ptag">${e.role===`EMPLOYER`?T`${bt(12)} Manager`:T`${z(12)} Medewerker`}</span>
            </div>
          </div>
        </div>

        <!-- Account info -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">${St(16)}</span>
            <h3>Accountgegevens</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="info-label">Naam</span>
              <span class="info-value">${e.fullName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Rol</span>
              <span class="info-value">
                <span class="role-badge ${e.role===`EMPLOYER`?`role-employer`:`role-employee`}">
                  ${e.role===`EMPLOYER`?`Manager`:`Medewerker`}
                </span>
              </span>
            </div>
          </div>
        </div>

        <!-- Change password -->
        <div class="card">
          <div class="card-header">
            <span class="card-icon">${mt(16)}</span>
            <h3>Wachtwoord wijzigen</h3>
          </div>
          <div class="card-body">
            ${this._success?T`<div class="success-msg">${U(15)} ${this._success}</div>`:``}
            ${this._error?T`<div class="error-msg">${this._error}</div>`:``}
            <form @submit=${this._savePassword}>
              <div class="field">
                <label>Nieuw wachtwoord</label>
                <div class="pw-wrap">
                  <input
                    name="password"
                    type=${this._pwVisible?`text`:`password`}
                    placeholder="Minimaal 6 tekens"
                    minlength="6"
                    required
                    autocomplete="new-password"
                  >
                  <button type="button" class="pw-toggle"
                    @click=${()=>this._pwVisible=!this._pwVisible}>
                    ${this._pwVisible?gt(16):ht(16)}
                  </button>
                </div>
              </div>
              <div class="field">
                <label>Herhaal wachtwoord</label>
                <input
                  name="password2"
                  type=${this._pwVisible?`text`:`password`}
                  placeholder="Zelfde wachtwoord opnieuw"
                  minlength="6"
                  required
                  autocomplete="new-password"
                >
                <p class="hint-text">Wachtwoord moet minimaal 6 tekens bevatten.</p>
              </div>
              <button class="btn-save" type="submit" ?disabled=${this._saving}>
                ${this._saving?`Opslaan...`:`Wachtwoord opslaan`}
              </button>
            </form>
          </div>
        </div>

        <!-- Logout -->
        <div class="card">
          <div class="card-body">
            <button class="btn-logout" @click=${()=>N.logout()}
              style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
              ${vt(16)} Uitloggen
            </button>
          </div>
        </div>
      </div>
    `):T``}};customElements.define(`profile-page`,Wt);var Gt=class extends M{static properties={_requests:{state:!0},_loading:{state:!0},_rejectModal:{state:!0},_rejectReason:{state:!0},_saving:{state:!0},_error:{state:!0}};static styles=o`
    :host { display: block; padding: 1.25rem; max-width: 800px; margin: 0 auto; }

    .page-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    .page-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--app-text-muted, #626B74); }

    .archive-link {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: var(--app-bg-light, #F4F6F8);
      border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-dark, #1A1A1A); border-radius: 8px;
      padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .archive-link:hover { border-color: var(--app-accent, #2563EB); color: var(--app-accent, #2563EB); background: #fff; }

    .alert {
      display: flex; align-items: flex-start; gap: 0.5rem;
      border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.85rem; margin-bottom: 1rem;
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25); color: #C62828;
    }

    .employee-group { margin-bottom: 1.5rem; }
    .employee-header {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.88rem; font-weight: 700; color: var(--app-text-dark, #1A1A1A);
      padding: 0.55rem 0; border-bottom: 2px solid var(--app-border, #DCDFE3);
      margin-bottom: 0.55rem;
    }
    .emp-code {
      font-size: 0.7rem; background: var(--app-bg-light, #F4F6F8);
      color: var(--app-text-muted, #626B74);
      border-radius: 20px; padding: 0.15rem 0.5rem; font-weight: 600; font-family: monospace;
    }

    .request-card {
      background: #fff; border: 1px solid var(--app-border, #DCDFE3);
      border-left: 3px solid #F59E0B;
      border-radius: 10px; padding: 1rem 1.15rem; margin-bottom: 0.55rem;
      display: flex; gap: 1rem; align-items: center;
    }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark, #1A1A1A); }
    .request-reason { font-size: 0.82rem; color: var(--app-text-muted, #626B74); margin-top: 0.2rem; word-break: break-word; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap; }
    .badge-time { font-size: 0.72rem; color: var(--app-text-muted, #626B74); display: flex; align-items: center; gap: 0.2rem; }

    .actions { display: flex; gap: 0.35rem; flex-shrink: 0; }
    .btn-approve, .btn-reject {
      display: inline-flex; align-items: center; gap: 0.3rem;
      border: none; border-radius: 7px; padding: 0.45rem 0.8rem;
      font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.15s;
      white-space: nowrap; -webkit-tap-highlight-color: transparent;
    }
    .btn-approve { background: #D1FAE5; color: #065F46; }
    .btn-approve:hover { background: #10B981; color: #fff; }
    .btn-reject  { background: #FEE2E2; color: #991B1B; }
    .btn-reject:hover  { background: #EF4444; color: #fff; }
    .btn-approve:disabled, .btn-reject:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Reject modal (bottom sheet) */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 600; padding: 0;
    }
    @media (min-width: 560px) {
      .modal-backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: #fff; border-radius: 20px 20px 0 0;
      width: 100%; max-width: 480px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 40px rgba(0,0,0,0.18);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; padding: 2rem; }
    }

    .modal-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;
    }
    .modal-title { font-size: 1.1rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A); }
    .modal-close {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--app-bg-light, #F4F6F8); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted, #626B74); -webkit-tap-highlight-color: transparent;
    }
    .modal-sub { font-size: 0.83rem; color: var(--app-text-muted, #626B74); margin-bottom: 1.25rem; }

    .modal label {
      display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted, #626B74); margin-bottom: 0.4rem;
    }
    .modal textarea {
      width: 100%; padding: 0.75rem 1rem; box-sizing: border-box;
      border: 1.5px solid var(--app-border, #DCDFE3); border-radius: 10px;
      font-size: 0.92rem; font-family: inherit; resize: vertical; min-height: 90px;
      outline: none; background: var(--app-bg-light, #F4F6F8);
      color: var(--app-text-dark, #1A1A1A); transition: border-color 0.15s, box-shadow 0.15s;
    }
    .modal textarea:focus {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12); background: #fff;
    }

    .modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; }
    .btn-cancel {
      background: none; border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74); border-radius: 9px;
      padding: 0.7rem 1.2rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-danger {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: #EF4444; color: #fff; border: none; border-radius: 9px;
      padding: 0.7rem 1.4rem; font-size: 0.9rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; flex: 1; justify-content: center;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-danger:hover { background: #DC2626; }
    .btn-danger:disabled { opacity: 0.55; cursor: not-allowed; }

    .empty-state { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted, #626B74); }
  `;constructor(){super(),this._requests=[],this._loading=!0,this._rejectModal=null,this._rejectReason=``,this._saving=!1,this._error=``}connectedCallback(){super.connectedCallback(),this._load()}async _load(){this._loading=!0;try{let e=await Ze();this._requests=e.filter(e=>e.status===`PENDING`)}catch{this._requests=[]}finally{this._loading=!1}}async _approve(e){this._saving=!0;try{await Qe(e),await this._load()}catch(e){this._error=e.message||`Fout bij goedkeuren.`}finally{this._saving=!1}}async _confirmReject(e){if(e.preventDefault(),this._rejectModal){this._saving=!0;try{await $e(this._rejectModal.id,this._rejectReason),this._rejectModal=null,await this._load()}catch(e){this._error=e.message||`Fout bij afwijzen.`}finally{this._saving=!1}}}_fmtDate(e){return new Date(e).toLocaleDateString(`nl-NL`,{day:`numeric`,month:`long`,year:`numeric`})}_groupByEmployee(e){let t=new Map;for(let n of e)t.has(n.employeeId)||t.set(n.employeeId,{name:n.employeeName,code:n.employeeCode,items:[]}),t.get(n.employeeId).items.push(n);return[...t.values()]}render(){let e=this._groupByEmployee(this._requests);return T`
      <div class="page-header">
        <span class="page-title">Openstaand (${this._requests.length})</span>
        <button class="archive-link"
          @click=${()=>this.dispatchEvent(new CustomEvent(`show-archive`,{bubbles:!0,composed:!0}))}>
          Archief ${K(13)}
        </button>
      </div>

      ${this._error?T`<div class="alert">${_t(15)} ${this._error}</div>`:``}

      ${this._loading?T`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>`:``}

      ${!this._loading&&e.length===0?T`
        <div class="empty-state">
          ${Et(40)}
          <p>Geen openstaande verlofaanvragen.</p>
        </div>
      `:``}

      ${e.map(e=>T`
        <div class="employee-group">
          <div class="employee-header">
            ${z(14)} ${e.name}
            <span class="emp-code">${e.code}</span>
          </div>
          ${e.items.map(e=>T`
            <div class="request-card">
              <div class="request-body">
                <div class="request-dates">
                  ${this._fmtDate(e.startDate)}
                  ${e.startDate===e.endDate?``:T` &ndash; ${this._fmtDate(e.endDate)}`}
                </div>
                <div class="request-reason">${e.reason}</div>
                <div class="request-meta">
                  <span class="badge-time">${W(11)} ${new Date(e.createdAt).toLocaleDateString(`nl-NL`)}</span>
                </div>
              </div>
              <div class="actions">
                <button class="btn-approve" @click=${()=>this._approve(e.id)} ?disabled=${this._saving}>
                  ${U(13)} Goed
                </button>
                <button class="btn-reject"
                  @click=${()=>{this._rejectModal=e,this._rejectReason=``}}
                  ?disabled=${this._saving}>
                  ${G(13)} Wijs af
                </button>
              </div>
            </div>
          `)}
        </div>
      `)}

      ${this._rejectModal?T`
        <div class="modal-backdrop" @click=${e=>e.target===e.currentTarget&&(this._rejectModal=null)}>
          <div class="modal">
            <div class="modal-header">
              <span class="modal-title">Aanvraag afwijzen</span>
              <button class="modal-close" @click=${()=>this._rejectModal=null}>${G(14)}</button>
            </div>
            <p class="modal-sub">
              ${this._rejectModal.employeeName} &bull;
              ${this._fmtDate(this._rejectModal.startDate)}
              ${this._rejectModal.startDate===this._rejectModal.endDate?``:T` &ndash; ${this._fmtDate(this._rejectModal.endDate)}`}
            </p>
            <form @submit=${this._confirmReject}>
              <label>Reden voor afwijzing</label>
              <textarea
                placeholder="Geef een reden op voor de medewerker..."
                .value=${this._rejectReason}
                @input=${e=>this._rejectReason=e.target.value}
                required
                autofocus
              ></textarea>
              <div class="modal-actions">
                <button type="button" class="btn-cancel" @click=${()=>this._rejectModal=null}>Annuleren</button>
                <button type="submit" class="btn-danger" ?disabled=${this._saving}>
                  ${G(14)} Afwijzen
                </button>
              </div>
            </form>
          </div>
        </div>
      `:``}
    `}};customElements.define(`leave-requests-manager`,Gt);var Kt={APPROVED:`Goedgekeurd`,REJECTED:`Afgewezen`},qt=class extends M{static properties={_all:{state:!0},_loading:{state:!0},_filter:{state:!0},_search:{state:!0}};static styles=o`
    :host { display: block; padding: 1.25rem; max-width: 800px; margin: 0 auto; }

    .back-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted, #626B74); font-size: 0.88rem; font-weight: 600;
      padding: 0; margin-bottom: 1.25rem; transition: color 0.15s;
    }
    .back-btn:hover { color: var(--app-accent, #2563EB); }

    .filter-row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.1rem; }

    .search-wrap { position: relative; flex: 1; min-width: 160px; }
    .search-wrap input {
      width: 100%; padding: 0.55rem 0.9rem 0.55rem 2.2rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 8px; font-size: 0.88rem; outline: none; box-sizing: border-box;
      background: #fff; color: var(--app-text-dark, #1A1A1A);
      transition: border-color 0.15s;
    }
    .search-wrap input:focus { border-color: var(--app-accent, #2563EB); }
    .search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--app-text-muted, #626B74); pointer-events: none; }

    .tab {
      background: none; border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74); border-radius: 20px;
      padding: 0.4rem 1rem; font-size: 0.82rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; white-space: nowrap;
    }
    .tab.active { background: var(--app-accent, #2563EB); border-color: var(--app-accent, #2563EB); color: #fff; }
    .tab:hover:not(.active) { border-color: #999; color: var(--app-text-dark, #1A1A1A); }

    .empty-state { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted, #626B74); }

    /* Manager: grouped by employee */
    .employee-group { margin-bottom: 1.4rem; }
    .employee-header {
      display: flex; align-items: center; gap: 0.5rem;
      font-size: 0.88rem; font-weight: 700; color: var(--app-text-dark, #1A1A1A);
      padding: 0.5rem 0; border-bottom: 2px solid var(--app-border, #DCDFE3);
      margin-bottom: 0.5rem;
    }
    .emp-code { font-size: 0.7rem; background: var(--app-bg-light, #F4F6F8); color: var(--app-text-muted, #626B74); border-radius: 20px; padding: 0.15rem 0.5rem; font-weight: 600; font-family: monospace; }
    .emp-count { font-size: 0.7rem; color: var(--app-text-muted, #626B74); }

    .request-card {
      background: #fff; border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 10px; padding: 0.9rem 1.15rem; margin-bottom: 0.5rem;
      display: flex; gap: 0.85rem; align-items: flex-start;
    }
    .request-card.approved { border-left: 3px solid #10B981; }
    .request-card.rejected { border-left: 3px solid #EF4444; }

    .status-icon-wrap {
      width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; color: #fff; margin-top: 1px;
    }
    .status-icon-wrap.approved { background: #10B981; }
    .status-icon-wrap.rejected { background: #EF4444; }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.9rem; font-weight: 700; color: var(--app-text-dark, #1A1A1A); }
    .request-reason { font-size: 0.8rem; color: var(--app-text-muted, #626B74); margin-top: 0.15rem; }
    .rejection-note { font-size: 0.78rem; color: #C62828; margin-top: 0.25rem; font-style: italic; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.35rem; flex-wrap: wrap; }

    .badge {
      font-size: 0.7rem; font-weight: 700; padding: 0.18rem 0.5rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px;
    }
    .badge.approved { background: #D1FAE5; color: #065F46; }
    .badge.rejected { background: #FEE2E2; color: #991B1B; }
    .badge-time { font-size: 0.72rem; color: var(--app-text-muted, #626B74); display: flex; align-items: center; gap: 0.2rem; }
  `;constructor(){super(),this._all=[],this._loading=!0,this._filter=`ALL`,this._search=``}connectedCallback(){super.connectedCallback(),this._load()}get _isManager(){return N.user?.role===`EMPLOYER`}async _load(){this._loading=!0;try{let e=this._isManager?await Ze():await L();this._all=e.filter(e=>e.status!==`PENDING`)}catch{this._all=[]}finally{this._loading=!1}}_filtered(){let e=this._all;if(this._filter!==`ALL`&&(e=e.filter(e=>e.status===this._filter)),this._search.trim()&&this._isManager){let t=this._search.toLowerCase();e=e.filter(e=>e.employeeName.toLowerCase().includes(t))}return e}_groupByEmployee(e){let t=new Map;for(let n of e)t.has(n.employeeId)||t.set(n.employeeId,{name:n.employeeName,code:n.employeeCode,items:[]}),t.get(n.employeeId).items.push(n);return[...t.values()]}_fmtDate(e){return new Date(e).toLocaleDateString(`nl-NL`,{day:`numeric`,month:`short`,year:`numeric`})}_renderCard(e){let t=e.status.toLowerCase();return T`
      <div class="request-card ${t}">
        <div class="status-icon-wrap ${t}">
          ${e.status===`APPROVED`?U(14):G(14)}
        </div>
        <div class="request-body">
          <div class="request-dates">
            ${this._fmtDate(e.startDate)}
            ${e.startDate===e.endDate?``:T` &ndash; ${this._fmtDate(e.endDate)}`}
          </div>
          <div class="request-reason">${e.reason}</div>
          ${e.status===`REJECTED`&&e.rejectionReason?T`<div class="rejection-note">Reden: ${e.rejectionReason}</div>`:``}
          <div class="request-meta">
            <span class="badge ${t}">${Kt[e.status]}</span>
            <span class="badge-time">${W(11)} ${new Date(e.createdAt).toLocaleDateString(`nl-NL`)}</span>
          </div>
        </div>
      </div>
    `}render(){let e=this._filtered(),t=this._isManager?this._groupByEmployee(e):null;return T`
      <button class="back-btn" @click=${()=>this.dispatchEvent(new CustomEvent(`back`,{bubbles:!0,composed:!0}))}>
        ${H(16)} Terug
      </button>

      <div class="filter-row">
        ${this._isManager?T`
          <div class="search-wrap">
            <span class="search-icon">${lt(14)}</span>
            <input type="search" placeholder="Zoek medewerker..."
              .value=${this._search} @input=${e=>this._search=e.target.value}>
          </div>
        `:``}
        ${[`ALL`,`APPROVED`,`REJECTED`].map(e=>T`
          <button class="tab ${this._filter===e?`active`:``}" @click=${()=>this._filter=e}>
            ${{ALL:`Alle`,APPROVED:`Goedgekeurd`,REJECTED:`Afgewezen`}[e]}
          </button>
        `)}
      </div>

      ${this._loading?T`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>`:``}

      ${!this._loading&&e.length===0?T`<div class="empty-state"><p>Geen resultaten gevonden.</p></div>`:``}

      ${this._isManager?t.map(e=>T`
            <div class="employee-group">
              <div class="employee-header">
                ${z(14)} ${e.name}
                <span class="emp-code">${e.code}</span>
                <span class="emp-count">${e.items.length} aanvra${e.items.length===1?`ag`:`gen`}</span>
              </div>
              ${e.items.map(e=>this._renderCard(e))}
            </div>
          `):e.map(e=>this._renderCard(e))}
    `}};customElements.define(`leave-archive-page`,qt);var Jt={LEAVE_REQUEST:`verlof`,LEAVE_APPROVED:`verlof`,LEAVE_REJECTED:`verlof`},Yt={LEAVE_REQUEST:`#F59E0B`,LEAVE_APPROVED:`#10B981`,LEAVE_REJECTED:`#EF4444`},Xt={LEAVE_REQUEST:q,LEAVE_APPROVED:U,LEAVE_REJECTED:G},Zt=class extends M{static properties={_open:{state:!0},_count:{state:!0},_items:{state:!0},_loading:{state:!0}};static styles=o`
    :host { position: relative; display: inline-flex; align-items: center; }

    .bell-btn {
      position: relative;
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted, #626B74);
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s;
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }
    .bell-btn:hover, .bell-btn.open {
      background: var(--app-bg-light, #F4F6F8);
      color: var(--app-text-dark, #1A1A1A);
    }

    .badge {
      position: absolute; top: 0px; right: 0px;
      background: var(--app-accent, #2563EB); color: #fff;
      font-size: 0.58rem; font-weight: 900; border-radius: 8px;
      min-width: 15px; height: 15px; padding: 0 3px;
      display: flex; align-items: center; justify-content: center;
      line-height: 1; pointer-events: none; border: 1.5px solid #fff;
    }

    .dropdown {
      position: absolute; top: calc(100% + 10px); right: -4px;
      background: #fff;
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 14px; width: 310px;
      max-height: 400px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.16);
      z-index: 500; overflow: hidden;
      display: flex; flex-direction: column;
    }

    @media (max-width: 420px) {
      .dropdown { right: -44px; width: 280px; }
    }

    .dd-header {
      padding: 0.9rem 1rem 0.7rem;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: space-between;
    }
    .dd-title { font-size: 0.88rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A); }
    .dd-count {
      font-size: 0.7rem; background: var(--app-accent, #2563EB); color: #fff;
      border-radius: 10px; padding: 0.1rem 0.5rem; font-weight: 700;
    }

    .list { overflow-y: auto; flex: 1; }

    .empty {
      padding: 2.5rem 1rem; text-align: center;
      color: var(--app-text-muted, #626B74); font-size: 0.83rem;
    }

    .notif-item {
      display: flex; gap: 0.65rem; align-items: center;
      padding: 0.75rem 0.9rem;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      cursor: pointer; transition: background 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .notif-item:last-child { border-bottom: none; }
    .notif-item.unread { background: rgba(37,99,235,0.035); }
    .notif-item:hover { background: var(--app-bg-light, #F4F6F8); }
    .notif-item:active { background: rgba(0,0,0,0.06); }

    .notif-icon-wrap {
      width: 34px; height: 34px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; color: #fff;
    }

    .notif-body { flex: 1; min-width: 0; }
    .notif-title {
      font-size: 0.82rem; font-weight: 700;
      color: var(--app-text-dark, #1A1A1A); line-height: 1.3;
    }
    .notif-msg {
      font-size: 0.75rem; color: var(--app-text-muted, #626B74);
      margin-top: 0.15rem; line-height: 1.35;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .notif-time {
      font-size: 0.68rem; color: var(--app-text-muted, #626B74);
      margin-top: 0.2rem;
    }

    .notif-arrow { color: var(--app-text-muted, #626B74); flex-shrink: 0; }

    .unread-dot {
      position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%);
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--app-accent, #2563EB);
    }
  `;constructor(){super(),this._open=!1,this._count=0,this._items=[],this._loading=!1,this._intervalId=null}connectedCallback(){super.connectedCallback(),this._fetchCount(),this._intervalId=setInterval(()=>this._fetchCount(),3e4),document.addEventListener(`pointerdown`,this._onOutside)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this._intervalId),document.removeEventListener(`pointerdown`,this._onOutside)}_onOutside=e=>{this._open&&!this.shadowRoot.contains(e.composedPath()[0])&&(this._open=!1)};async _fetchCount(){try{let e=await nt();this._count=e.count||0}catch{}}async _toggle(){if(this._open=!this._open,this._open){this._loading=!0;try{this._items=await tt(),this._count>0&&(await rt(),this._count=0)}catch{}finally{this._loading=!1}}}_navigate(e){let t=Jt[e]||null;t&&(this._open=!1,this.dispatchEvent(new CustomEvent(`navigate`,{detail:{page:t},bubbles:!0,composed:!0})))}_relativeTime(e){let t=Date.now()-new Date(e).getTime(),n=Math.floor(t/6e4);if(n<1)return`Zojuist`;if(n<60)return`${n}m geleden`;let r=Math.floor(n/60);return r<24?`${r}u geleden`:`${Math.floor(r/24)}d geleden`}render(){let e=this._items.filter(e=>!e.read).length;return T`
      <button class="bell-btn ${this._open?`open`:``}" @click=${this._toggle} title="Meldingen">
        ${Tt(17)}
        ${this._count>0?T`<span class="badge">${this._count>9?`9+`:this._count}</span>`:``}
      </button>

      ${this._open?T`
        <div class="dropdown">
          <div class="dd-header">
            <span class="dd-title">Meldingen</span>
            ${e>0?T`<span class="dd-count">${e} nieuw</span>`:``}
          </div>
          <div class="list">
            ${this._loading?T`<div class="empty">Laden...</div>`:``}
            ${!this._loading&&this._items.length===0?T`<div class="empty">Geen meldingen</div>`:``}
            ${this._items.map(e=>{let t=Yt[e.type]||`#626B74`,n=Xt[e.type];return T`
                <div class="notif-item ${e.read?``:`unread`}" @click=${()=>this._navigate(e.type)}>
                  <div class="notif-icon-wrap" style="background:${t}">
                    ${n?n(15):Tt(15)}
                  </div>
                  <div class="notif-body">
                    <div class="notif-title">${e.title}</div>
                    <div class="notif-msg">${e.message}</div>
                    <div class="notif-time">${this._relativeTime(e.createdAt)}</div>
                  </div>
                  <div class="notif-arrow">${K(14)}</div>
                </div>
              `})}
          </div>
        </div>
      `:``}
    `}};customElements.define(`notification-bell`,Zt);var Qt=[`Januari`,`Februari`,`Maart`,`April`,`Mei`,`Juni`,`Juli`,`Augustus`,`September`,`Oktober`,`November`,`December`],$t=class extends M{static properties={_year:{state:!0},_month:{state:!0},_data:{state:!0},_loading:{state:!0},_error:{state:!0}};static styles=o`
    :host { display: block; padding: 1.25rem; max-width: 900px; margin: 0 auto; }

    .top-bar {
      display: flex; align-items: center; gap: 0.75rem;
      margin-bottom: 1.5rem; flex-wrap: wrap;
    }

    .month-nav {
      display: flex; align-items: center; gap: 0.4rem; flex: 1;
    }
    .month-label {
      font-size: 1rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A);
      flex: 1; text-align: center; white-space: nowrap;
    }
    .nav-arrow {
      width: 34px; height: 34px;
      border: 1.5px solid var(--app-border, #DCDFE3);
      background: #fff; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted, #626B74);
      transition: all 0.15s; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .nav-arrow:hover { border-color: var(--app-accent, #2563EB); color: var(--app-accent, #2563EB); }
    .nav-arrow:disabled { opacity: 0.35; cursor: not-allowed; }

    .export-btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: #fff; border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74); border-radius: 8px;
      padding: 0.45rem 0.9rem; font-size: 0.82rem; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .export-btn:hover { border-color: var(--app-accent, #2563EB); color: var(--app-accent, #2563EB); }

    /* Table */
    .table-wrap {
      background: #fff;
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }

    table {
      width: 100%; border-collapse: collapse;
    }

    thead tr {
      background: var(--app-bg-light, #F4F6F8);
      border-bottom: 2px solid var(--app-border, #DCDFE3);
    }

    th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-size: 0.7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--app-text-muted, #626B74);
      white-space: nowrap;
    }
    th.right { text-align: right; }

    tbody tr {
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      transition: background 0.12s;
    }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:hover { background: #fafbfc; }

    td {
      padding: 0.8rem 1rem;
      font-size: 0.9rem; color: var(--app-text-dark, #1A1A1A);
    }
    td.right { text-align: right; }
    td.muted  { color: var(--app-text-muted, #626B74); }
    td.net    { font-weight: 700; }

    /* Total row */
    tfoot tr {
      background: var(--app-bg-light, #F4F6F8);
      border-top: 2px solid var(--app-border, #DCDFE3);
    }
    tfoot td {
      padding: 0.75rem 1rem;
      font-size: 0.88rem; font-weight: 700;
      color: var(--app-text-dark, #1A1A1A);
    }
    tfoot td.right { text-align: right; }

    /* Hide break column on small screens */
    @media (max-width: 520px) {
      .col-break { display: none; }
      th, td { padding-left: 0.75rem; padding-right: 0.75rem; }
    }

    .empty { text-align: center; padding: 3rem 1rem; color: var(--app-text-muted, #626B74); font-size: 0.9rem; }
    .error-bar {
      background: #ffebee; border: 1px solid rgba(211,47,47,0.2);
      color: #C62828; border-radius: 8px; padding: 0.75rem 1rem;
      font-size: 0.84rem; margin-bottom: 1rem;
    }
    .loading { padding: 2rem; text-align: center; color: var(--app-text-muted, #626B74); }
  `;constructor(){super();let e=new Date;this._year=e.getFullYear(),this._month=e.getMonth()+1,this._data=[],this._loading=!0,this._error=``}connectedCallback(){super.connectedCallback(),this._load()}async _load(){this._loading=!0,this._error=``;try{let e=await it(this._year,this._month);this._data=[...e].sort((e,t)=>e.employeeName.localeCompare(t.employeeName,`nl`))}catch(e){this._error=e.message||`Kon overzicht niet laden.`}finally{this._loading=!1}}_prevMonth(){this._month===1?(this._year--,this._month=12):this._month--,this._load()}_nextMonth(){this._isCurrentMonth()||(this._month===12?(this._year++,this._month=1):this._month++,this._load())}_isCurrentMonth(){let e=new Date;return this._year===e.getFullYear()&&this._month===e.getMonth()+1}_hhmm(e){let t=Math.round(e*60),n=Math.floor(t/60),r=t%60;return`${n}:${String(r).padStart(2,`0`)}`}_exportCSV(){`${Qt[this._month-1]}${this._year}`;let e=[`Naam`,`Filiaal`,`Diensten`,`Bruto (u:m)`,`Pauze (u:m)`,`Netto (u:m)`],t=this._data.map(e=>[e.employeeName,e.locationName||``,e.shiftCount,this._hhmm(e.grossHours),this._hhmm(e.breakHours),this._hhmm(e.netHours)]),n=this._data.reduce((e,t)=>e+t.grossHours,0),r=this._data.reduce((e,t)=>e+t.breakHours,0),i=this._data.reduce((e,t)=>e+t.netHours,0),a=this._data.reduce((e,t)=>e+t.shiftCount,0);t.push([`Totaal`,``,a,this._hhmm(n),this._hhmm(r),this._hhmm(i)]);let o=[e,...t].map(e=>e.map(e=>`"${e}"`).join(`;`)).join(`
`),s=new Blob([`﻿`+o],{type:`text/csv;charset=utf-8;`}),c=URL.createObjectURL(s),l=document.createElement(`a`);l.href=c,l.download=`uren-${this._year}-${String(this._month).padStart(2,`0`)}.csv`,l.click(),URL.revokeObjectURL(c)}render(){let e=this._data.reduce((e,t)=>e+t.shiftCount,0),t=this._data.reduce((e,t)=>e+t.grossHours,0),n=this._data.reduce((e,t)=>e+t.breakHours,0),r=this._data.reduce((e,t)=>e+t.netHours,0);return T`
      <div class="top-bar">
        <div class="month-nav">
          <button class="nav-arrow" @click=${this._prevMonth}>${H(15)}</button>
          <div class="month-label">${Qt[this._month-1]} ${this._year}</div>
          <button class="nav-arrow" @click=${this._nextMonth} ?disabled=${this._isCurrentMonth()}>
            ${dt(15)}
          </button>
        </div>
        ${!this._loading&&this._data.length>0?T`
          <button class="export-btn" @click=${this._exportCSV}>Exporteer CSV</button>
        `:``}
      </div>

      ${this._error?T`<div class="error-bar">${this._error}</div>`:``}

      <div class="table-wrap">
        ${this._loading?T`<div class="loading">Laden...</div>`:this._data.length===0?T`<div class="empty">Geen diensten gevonden in ${Qt[this._month-1]} ${this._year}.</div>`:T`
          <table>
            <thead>
              <tr>
                <th>Medewerker</th>
                <th class="right">Diensten</th>
                <th class="right">Bruto</th>
                <th class="right col-break">Pauze</th>
                <th class="right">Netto</th>
              </tr>
            </thead>
            <tbody>
              ${this._data.map(e=>T`
                <tr>
                  <td>
                    <div>${e.employeeName}</div>
                    ${e.locationName?T`<div style="font-size:0.76rem;color:var(--app-text-muted,#626B74)">${e.locationName}</div>`:``}
                  </td>
                  <td class="right muted">${e.shiftCount}</td>
                  <td class="right muted">${this._hhmm(e.grossHours)}</td>
                  <td class="right muted col-break">-${this._hhmm(e.breakHours)}</td>
                  <td class="right net">${this._hhmm(e.netHours)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr>
                <td>Totaal</td>
                <td class="right">${e}</td>
                <td class="right">${this._hhmm(t)}</td>
                <td class="right col-break">-${this._hhmm(n)}</td>
                <td class="right">${this._hhmm(r)}</td>
              </tr>
            </tfoot>
          </table>
        `}
      </div>
    `}};customElements.define(`monthly-summary-page`,$t);var en=class extends M{static properties={_page:{state:!0}};static styles=o`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    header {
      background: #fff;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      display: flex;
      align-items: center;
      padding: 0 1.25rem;
      height: 60px;
      gap: 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }

    .brand {
      display: flex; align-items: center; gap: 0.55rem;
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--app-text-dark, #1A1A1A);
      letter-spacing: -0.5px;
      flex-shrink: 0;
    }

    nav { display: flex; gap: 0.15rem; flex: 1; }

    .nav-btn {
      background: none;
      border: none;
      color: var(--app-text-muted, #626B74);
      font-size: 0.88rem;
      font-weight: 500;
      padding: 0.45rem 0.9rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .nav-btn:hover { color: var(--app-text-dark, #1A1A1A); background: var(--app-bg-light, #F4F6F8); }
    .nav-btn.active { color: var(--app-accent, #2563EB); background: rgba(37,99,235,0.07); font-weight: 700; }

    .user-area { display: flex; align-items: center; gap: 0.65rem; flex-shrink: 0; }

    @media (max-width: 600px) {
      .user-area { margin-left: auto; }
    }

    .user-name { font-size: 0.82rem; color: var(--app-text-muted, #626B74); display: none; }
    @media (min-width: 560px) { .user-name { display: block; } }

    .avatar-btn {
      width: 34px; height: 34px; border-radius: 50%;
      background: var(--app-accent, #2563EB);
      border: 2px solid transparent;
      color: #fff; font-size: 0.78rem; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }

    .avatar-btn:hover { opacity: 0.85; }
    .avatar-btn.active { border-color: var(--app-accent, #2563EB); background: #fff; color: var(--app-accent, #2563EB); }

    .logout-btn {
      background: none;
      border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74);
      padding: 0.35rem 0.8rem;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.15s;
    }

    .logout-btn:hover { border-color: var(--app-text-muted); color: var(--app-text-dark); }

    main { flex: 1; }

    /* Mobile bottom nav */
    .bottom-nav {
      display: none;
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: #fff;
      border-top: 1px solid var(--app-border, #DCDFE3);
      padding: 0.4rem 0 max(0.4rem, env(safe-area-inset-bottom));
      z-index: 100;
      box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
    }

    @media (max-width: 600px) {
      nav { display: none; }
      .bottom-nav { display: flex; }
      main { padding-bottom: 64px; }
    }

    .bn-btn {
      flex: 1;
      display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
      background: none; border: none;
      color: var(--app-text-muted, #626B74);
      font-size: 0.65rem; padding: 0.4rem 0.25rem; cursor: pointer;
      transition: color 0.15s;
    }

    .bn-btn.active { color: var(--app-accent, #2563EB); }
    .bn-icon { font-size: 1.25rem; line-height: 1; }
  `;constructor(){super(),this._page=`rooster`}_initials(){return(N.user?.fullName||``).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}render(){let e=[{id:`rooster`,label:`Rooster`,icon:st(18)},{id:`medewerkers`,label:`Medewerkers`,icon:ct(18)},{id:`verlof`,label:`Verlof`,icon:Et(18)},{id:`uren`,label:`Uren`,icon:W(18)},{id:`profiel`,label:`Profiel`,icon:z(18)}];return T`
      <header>
        <div class="brand">${ot(30)} Rooster</div>
        <nav>
          ${e.map(e=>T`
            <button class="nav-btn ${this._page===e.id?`active`:``}" @click=${()=>this._page=e.id}>
              ${e.label}
            </button>
          `)}
        </nav>
        <div class="user-area">
          <span class="user-name">${N.user?.fullName}</span>
          <notification-bell @navigate=${e=>this._page=e.detail.page}></notification-bell>
          <button class="avatar-btn ${this._page===`profiel`?`active`:``}"
            @click=${()=>this._page=`profiel`} title="Mijn profiel">
            ${this._initials()}
          </button>
          <button class="logout-btn" @click=${()=>N.logout()}>${vt(15)}</button>
        </div>
      </header>

      <main>
        ${this._page===`rooster`?T`<schedule-page></schedule-page>`:``}
        ${this._page===`medewerkers`?T`<users-page></users-page>`:``}
        ${this._page===`verlof`?T`<leave-requests-manager @show-archive=${()=>this._page=`archief`}></leave-requests-manager>`:``}
        ${this._page===`archief`?T`<leave-archive-page @back=${()=>this._page=`verlof`}></leave-archive-page>`:``}
        ${this._page===`uren`?T`<monthly-summary-page></monthly-summary-page>`:``}
        ${this._page===`profiel`?T`<profile-page></profile-page>`:``}
      </main>

      <div class="bottom-nav">
        ${e.map(e=>T`
          <button class="bn-btn ${this._page===e.id?`active`:``}" @click=${()=>this._page=e.id}>
            <span class="bn-icon">${e.icon}</span>${e.label}
          </button>
        `)}
      </div>
    `}};customElements.define(`employer-shell`,en);var tn=class extends M{static properties={_weekOffset:{state:!0},_shifts:{state:!0},_teamShifts:{state:!0},_leaveRequests:{state:!0},_loading:{state:!0},_error:{state:!0},_view:{state:!0}};static styles=o`
    :host { display: block; background: var(--app-bg-light, #F4F6F8); overflow-x: hidden; }

    /* Hero */
    .hero {
      background: var(--app-blue, #0F2537);
      padding: 1.25rem 1rem 1.5rem;
      color: #fff;
    }

    .hero-top {
      display: flex; align-items: flex-start;
      justify-content: space-between; gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .greeting { font-size: 1.35rem; font-weight: 800; line-height: 1.2; }
    .greeting-sub { font-size: 0.82rem; opacity: 0.8; margin-top: 0.25rem; }

    .view-toggle {
      display: flex; gap: 0.2rem;
      background: rgba(255,255,255,0.2);
      border-radius: 8px; padding: 0.2rem;
      flex-shrink: 0;
    }

    .view-btn {
      padding: 0.35rem 0.8rem;
      border: none; background: none;
      color: rgba(255,255,255,0.75);
      font-size: 0.8rem; font-weight: 500;
      border-radius: 6px; cursor: pointer;
      transition: all 0.15s; min-height: 34px;
    }

    .view-btn.active {
      background: #fff;
      color: var(--app-accent, #2563EB);
      font-weight: 700;
    }

    /* Stats row */
    .stats-row { display: flex; gap: 0.6rem; }

    .stat {
      flex: 1;
      background: rgba(255,255,255,0.18);
      border-radius: 10px;
      padding: 0.7rem 0.75rem;
      text-align: center;
    }

    .stat-val { font-size: 1.5rem; font-weight: 900; line-height: 1; }
    .stat-lbl { font-size: 0.68rem; opacity: 0.8; margin-top: 0.2rem; }

    /* Week nav bar */
    .week-bar {
      background: #fff;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      padding: 0.5rem 1rem;
      display: flex; align-items: center; justify-content: center;
      position: sticky; top: 0; z-index: 50;
    }

    .week-nav {
      display: flex; align-items: center;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px; background: #fff;
      overflow: hidden;
    }

    .nav-arrow {
      width: 36px; height: 38px; border: none; background: none;
      cursor: pointer; color: var(--app-text-muted);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s, color 0.15s; flex-shrink: 0;
    }

    .nav-arrow:hover { background: var(--app-bg-light, #F4F6F8); color: var(--app-text-dark); }

    .week-center {
      padding: 0.3rem 0.85rem; text-align: center;
      border-left: 1px solid var(--app-border, #DCDFE3);
      border-right: 1px solid var(--app-border, #DCDFE3);
      min-width: 140px;
    }
    .week-num { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--app-accent, #2563EB); letter-spacing: 0.5px; line-height: 1; }
    .week-range { font-size: 0.82rem; font-weight: 600; color: var(--app-text-dark); white-space: nowrap; line-height: 1.3; }

    /* Content */
    .content { padding: 1rem; }

    .error-bar {
      background: #ffebee; border: 1px solid rgba(211,47,47,0.25);
      color: #C62828; border-radius: 8px; padding: 0.7rem 1rem;
      margin-bottom: 0.75rem; font-size: 0.84rem;
    }

    /* === WEEK VIEW === */
    .day-list { display: flex; flex-direction: column; gap: 0.6rem; }

    .day-card {
      background: #fff;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 12px; overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .day-card.today-card { border-color: var(--app-accent, #2563EB); }

    .day-row {
      display: flex; align-items: center; gap: 0.85rem;
      padding: 0.9rem 1rem;
    }

    .day-indicator {
      width: 46px; height: 46px; border-radius: 10px; flex-shrink: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: var(--app-bg-light, #F4F6F8);
    }

    .day-indicator.today-ind { background: var(--app-accent, #2563EB); color: #fff; }
    .day-indicator.past-ind { opacity: 0.45; }

    .day-num { font-size: 1.15rem; font-weight: 900; line-height: 1; }
    .day-short { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0.1rem; }

    .day-info { flex: 1; min-width: 0; }
    .day-full { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark); }
    .day-month { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.05rem; }

    .free-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      background: var(--app-bg-light, #F4F6F8);
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 6px; padding: 0.3rem 0.65rem;
      font-size: 0.78rem; color: var(--app-text-muted); white-space: nowrap;
      flex-shrink: 0;
    }

    .leave-banner {
      padding: 0.45rem 1rem;
      font-size: 0.78rem; font-weight: 600;
      display: flex; align-items: center; gap: 0.4rem;
    }
    .leave-banner.approved { background: #D1FAE5; color: #065F46; border-top: 1px solid #A7F3D0; }
    .leave-banner.pending  { background: #FEF3C7; color: #92400E; border-top: 1px solid #FDE68A; }

    /* Shift block */
    .shift-block {
      border-top: 1px solid var(--app-border, #DCDFE3);
      padding: 0.75rem 1rem;
    }

    .shift-inner {
      display: flex; align-items: center; gap: 0.85rem;
      background: rgba(37,99,235,0.05);
      border: 1px solid rgba(37,99,235,0.2);
      border-radius: 10px;
      padding: 0.85rem 1rem;
    }

    .shift-time-big {
      font-size: 1.05rem; font-weight: 800;
      color: var(--app-text-dark);
      white-space: nowrap; flex-shrink: 0;
    }

    .shift-meta { flex: 1; min-width: 0; }
    .shift-loc { font-size: 0.8rem; color: var(--app-text-muted); margin-top: 0.1rem; display: flex; align-items: center; gap: 0.25rem; }
    .shift-note { font-size: 0.75rem; color: var(--app-text-muted); font-style: italic; }

    .hours-badge {
      background: var(--app-accent, #2563EB);
      color: #fff; font-size: 0.8rem; font-weight: 700;
      padding: 0.3rem 0.7rem; border-radius: 6px; white-space: nowrap; flex-shrink: 0;
    }

    .now-badge {
      display: inline-flex; align-items: center; gap: 0.3rem;
      background: #e8f5e9; color: #2E7D32;
      border-radius: 4px; padding: 0.15rem 0.5rem;
      font-size: 0.72rem; font-weight: 700; margin-top: 0.25rem;
    }

    .now-dot { width: 6px; height: 6px; border-radius: 50%; background: #2E7D32; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

    /* === AGENDA VIEW === */
    .agenda-empty {
      text-align: center; padding: 3rem 1rem;
      color: var(--app-text-muted);
    }

    .agenda-empty .big-icon { display: flex; justify-content: center; margin-bottom: 0.75rem; color: var(--app-border, #DCDFE3); }
    .agenda-empty p { font-size: 0.9rem; }

    .agenda-list { display: flex; flex-direction: column; gap: 1rem; }

    .agenda-date-header {
      display: flex; align-items: center; gap: 0.75rem;
      margin-top: 0.5rem;
    }

    .agenda-date-pill {
      background: var(--app-accent, #2563EB);
      color: #fff; border-radius: 8px;
      padding: 0.35rem 0.85rem;
      font-size: 0.82rem; font-weight: 700; white-space: nowrap;
    }

    .agenda-date-pill.today-pill { background: var(--app-accent, #2563EB); }
    .agenda-date-pill.future-pill { background: var(--app-blue, #0F2537); }

    .agenda-line { flex: 1; height: 1px; background: var(--app-border, #DCDFE3); }

    .agenda-card {
      background: #fff;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 12px; padding: 1rem;
      box-shadow: var(--shadow-sm);
      display: flex; gap: 1rem; align-items: center;
    }

    .agenda-card.today-agenda { border-color: var(--app-accent, #2563EB); }

    .agenda-time-col { text-align: center; flex-shrink: 0; }
    .agenda-time { font-size: 1rem; font-weight: 800; color: var(--app-text-dark); }
    .agenda-time-end { font-size: 0.75rem; color: var(--app-text-muted); }

    .agenda-divider { width: 1px; background: var(--app-border, #DCDFE3); align-self: stretch; flex-shrink: 0; }

    .agenda-detail { flex: 1; min-width: 0; }
    .agenda-loc { font-size: 0.82rem; color: var(--app-text-muted); margin-top: 0.15rem; }
    .agenda-note { font-size: 0.75rem; color: var(--app-text-muted); font-style: italic; margin-top: 0.1rem; }

    .agenda-hours { font-size: 0.9rem; font-weight: 800; color: var(--app-accent, #2563EB); flex-shrink: 0; }

    .empty-week { text-align: center; padding: 2.5rem 1rem; color: var(--app-text-muted); font-size: 0.88rem; }

    /* === TEAM VIEW === */
    .team-day { margin-bottom: 0.6rem; }

    .team-day-header {
      display: flex; align-items: center; gap: 0.6rem;
      padding: 0.35rem 0; margin-bottom: 0.4rem;
    }

    .team-day-name {
      font-size: 0.82rem; font-weight: 700;
      color: var(--app-text-dark); white-space: nowrap;
    }

    .team-day-date { font-size: 0.75rem; color: var(--app-text-muted); }
    .team-day-line { flex: 1; height: 1px; background: var(--app-border, #DCDFE3); }

    .team-day-today .team-day-name { color: var(--app-accent, #2563EB); }

    .team-card {
      display: flex; align-items: center; gap: 0.75rem;
      background: #fff;
      border: 1px solid var(--app-border, #DCDFE3);
      border-radius: 10px; padding: 0.7rem 1rem;
      margin-bottom: 0.4rem;
      box-shadow: var(--shadow-sm);
    }

    .team-card.is-me {
      border-color: var(--app-accent, #2563EB);
      background: rgba(37,99,235,0.03);
    }

    .team-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 0.72rem; font-weight: 700; color: #fff;
      flex-shrink: 0;
    }

    .team-name { font-size: 0.88rem; font-weight: 600; color: var(--app-text-dark); }
    .team-time { font-size: 0.75rem; color: var(--app-text-muted); margin-top: 0.05rem; }

    .team-me-badge {
      margin-left: auto;
      background: var(--app-accent, #2563EB); color: #fff;
      font-size: 0.68rem; font-weight: 700;
      padding: 0.18rem 0.55rem; border-radius: 20px;
      white-space: nowrap; flex-shrink: 0;
    }

    .team-hours {
      margin-left: auto;
      font-size: 0.78rem; font-weight: 700;
      color: var(--app-text-muted);
      white-space: nowrap; flex-shrink: 0;
    }

    .team-free-day {
      text-align: center; padding: 0.6rem;
      color: var(--app-text-muted); font-size: 0.78rem; font-style: italic;
    }

    @media (max-width: 600px) {
      .hero { padding: 1rem 0.9rem 1.25rem; }
      .content { padding: 0.75rem; }
      .week-bar { top: 60px; padding: 0.45rem 0.75rem; }
      .week-center { min-width: 120px; }
      .shift-inner { flex-wrap: wrap; gap: 0.5rem; }
      .shift-time-big { font-size: 0.95rem; }
    }
  `;constructor(){super(),this._weekOffset=0,this._shifts=[],this._teamShifts=[],this._leaveRequests=[],this._loading=!0,this._error=``,this._view=`week`}async connectedCallback(){super.connectedCallback(),await this._load()}async _load(){this._loading=!0,this._error=``;try{let e=J(this._weekOffset),t=Y(e,6),n=await Re(X(e),X(t));this._shifts=n;let r=[...new Set(n.map(e=>e.locationId).filter(Boolean))],[i,a]=await Promise.all([Promise.all(r.map(n=>Be(n,X(e),X(t)))),L()]);this._teamShifts=i.flat(),this._leaveRequests=a}catch{this._error=`Kon rooster niet laden.`}finally{this._loading=!1}}_prevWeek(){this._weekOffset--,this._load()}_nextWeek(){this._weekOffset++,this._load()}_thisWeek(){this._weekOffset=0,this._load()}_totalHours(){return this._shifts.reduce((e,t)=>e+Q(t.startTime,t.endTime),0)}_isNow(e,t,n){if(!Z(e))return!1;let r=new Date,i=r.getHours()*60+r.getMinutes(),[a,o]=t.slice(0,5).split(`:`).map(Number),[s,c]=n.slice(0,5).split(`:`).map(Number);return i>=a*60+o&&i<s*60+c}_leaveForDay(e){return this._leaveRequests.find(t=>e>=t.startDate&&e<=t.endDate&&(t.status===`APPROVED`||t.status===`PENDING`))}_greeting(){let e=new Date().getHours();return e<12?`Goedemorgen`:e<18?`Goedemiddag`:`Goedenavond`}_renderWeekView(e){return T`
      <div class="day-list">
        ${e.map(({iso:e,dayShort:t,dayFull:n,date:r})=>{let i=this._shifts.filter(t=>t.date===e),a=Z(e),o=jt(e)&&!a;return T`
            <div class="day-card ${a?`today-card`:``}">
              <div class="day-row">
                <div class="day-indicator ${a?`today-ind`:o?`past-ind`:``}">
                  <div class="day-num">${r.getDate()}</div>
                  <div class="day-short">${t}</div>
                </div>
                <div class="day-info">
                  <div class="day-full">${n}</div>
                  <div class="day-month">${At[r.getMonth()]}</div>
                </div>
                ${i.length===0?T`<div class="free-badge">${yt(14)} Vrij</div>`:``}
              </div>
              ${(()=>{let t=this._leaveForDay(e);return t?T`<div class="leave-banner ${t.status===`APPROVED`?`approved`:`pending`}">${t.status===`APPROVED`?`Verlof goedgekeurd`:`Verlof aangevraagd (in behandeling)`}</div>`:``})()}
              ${i.map(t=>{let n=Q(t.startTime,t.endTime),r=this._isNow(e,t.startTime,t.endTime);return T`
                  <div class="shift-block">
                    <div class="shift-inner">
                      <div>
                        <div class="shift-time-big">${t.startTime.slice(0,5)} – ${t.endTime.slice(0,5)}</div>
                        ${r?T`<div class="now-badge"><div class="now-dot"></div> Nu aan het werk</div>`:``}
                      </div>
                      <div class="shift-meta">
                        <div class="shift-loc">${pt(12)} ${t.locationName}</div>
                        ${t.note?T`<div class="shift-note">${t.note}</div>`:``}
                      </div>
                      <div class="hours-badge">${n.toFixed(1)}u</div>
                    </div>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}_renderAgendaView(){let e=[...this._shifts].sort((e,t)=>e.date.localeCompare(t.date)||e.startTime.localeCompare(t.startTime));if(e.length===0)return T`
        <div class="agenda-empty">
          <div class="big-icon">${st(48)}</div>
          <p>Geen diensten gepland deze week.<br>Kijk een andere week of vraag je manager.</p>
        </div>
      `;let t=e.reduce((e,t)=>((e[t.date]=e[t.date]||[]).push(t),e),{});return T`
      <div class="agenda-list">
        ${Object.entries(t).map(([e,t])=>{let n=new Date(e),r=Z(e),i=[`Zondag`,`Maandag`,`Dinsdag`,`Woensdag`,`Donderdag`,`Vrijdag`,`Zaterdag`][n.getDay()];return T`
            <div>
              <div class="agenda-date-header">
                <div class="agenda-date-pill ${r?`today-pill`:`future-pill`}">
                  ${r?`Vandaag`:i} ${n.getDate()} ${At[n.getMonth()]}
                </div>
                <div class="agenda-line"></div>
              </div>
              ${t.map(t=>{let n=Q(t.startTime,t.endTime),i=this._isNow(e,t.startTime,t.endTime);return T`
                  <div class="agenda-card ${r?`today-agenda`:``}">
                    <div class="agenda-time-col">
                      <div class="agenda-time">${t.startTime.slice(0,5)}</div>
                      <div class="agenda-time-end">t/m ${t.endTime.slice(0,5)}</div>
                    </div>
                    <div class="agenda-divider"></div>
                    <div class="agenda-detail">
                      <strong style="font-size:0.9rem">${t.locationName}</strong>
                      ${i?T`<div class="now-badge" style="margin-top:0.25rem"><div class="now-dot"></div> Nu actief</div>`:``}
                      ${t.note?T`<div class="agenda-note">${t.note}</div>`:``}
                    </div>
                    <div class="agenda-hours">${n.toFixed(1)}u</div>
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}_initials(e){return(e||``).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}_renderTeamView(e){let t=N.user?.id,n=[`Zondag`,`Maandag`,`Dinsdag`,`Woensdag`,`Donderdag`,`Vrijdag`,`Zaterdag`];return T`
      <div>
        ${e.map(({iso:e,date:r})=>{let i=[...this._teamShifts.filter(t=>t.date===e)].sort((e,t)=>e.startTime.localeCompare(t.startTime)),a=Z(e),o=jt(e)&&!a;return T`
            <div class="team-day ${a?`team-day-today`:``}">
              <div class="team-day-header">
                <span class="team-day-name">${n[r.getDay()]}</span>
                <span class="team-day-date">${r.getDate()} ${At[r.getMonth()]}</span>
                <div class="team-day-line"></div>
                ${a?T`<span style="font-size:0.72rem;font-weight:700;color:var(--app-accent,#2563EB);white-space:nowrap">Vandaag</span>`:``}
              </div>
              ${i.length===0?T`
                <div class="team-free-day">Niemand ingepland</div>
              `:i.map(e=>{let n=e.employeeId===t,r=$(e.employeeId),i=Q(e.startTime,e.endTime);return T`
                  <div class="team-card ${n?`is-me`:``}" style="opacity:${o?.6:1}">
                    <div class="team-avatar" style="background:${r}">${this._initials(e.employeeName)}</div>
                    <div style="flex:1;min-width:0">
                      <div class="team-name">${e.employeeName}</div>
                      <div class="team-time">${e.startTime.slice(0,5)} – ${e.endTime.slice(0,5)}</div>
                    </div>
                    ${n?T`<span class="team-me-badge">Jij</span>`:T`<span class="team-hours">${i.toFixed(1)}u</span>`}
                  </div>
                `})}
            </div>
          `})}
      </div>
    `}render(){let e=N.user,t=Ft(this._weekOffset),n=this._totalHours(),r=t.filter(e=>this._shifts.some(t=>t.date===e.iso)).length;return T`
      <div class="hero">
        <div class="hero-top">
          <div>
            <div class="greeting">${this._greeting()}, ${e?.fullName?.split(` `)[0]||``}!</div>
            <div class="greeting-sub">Mijn rooster</div>
          </div>
          <div class="view-toggle">
            <button class="view-btn ${this._view===`week`?`active`:``}" @click=${()=>this._view=`week`}>Week</button>
            <button class="view-btn ${this._view===`agenda`?`active`:``}" @click=${()=>this._view=`agenda`}>Agenda</button>
            <button class="view-btn ${this._view===`team`?`active`:``}" @click=${()=>this._view=`team`}>${ct(14)}</button>
          </div>
        </div>
        <div class="stats-row">
          <div class="stat">
            <div class="stat-val">${r}</div>
            <div class="stat-lbl">Werkdagen</div>
          </div>
          <div class="stat">
            <div class="stat-val">${n.toFixed(1)}</div>
            <div class="stat-lbl">Uren</div>
          </div>
          <div class="stat">
            <div class="stat-val">${this._shifts.length>0?(n/this._shifts.length).toFixed(1):`–`}</div>
            <div class="stat-lbl">Gem. per dienst</div>
          </div>
        </div>
      </div>

      <div class="week-bar">
        <div class="week-nav">
          <button class="nav-arrow" @click=${this._prevWeek}>${H(14)}</button>
          <div class="week-center">
            <div class="week-num">Week ${Pt(this._weekOffset)}</div>
            <div class="week-range">${Nt(this._weekOffset)}</div>
          </div>
          <button class="nav-arrow" @click=${this._nextWeek}>${dt(14)}</button>
        </div>
      </div>

      <div class="content">
        ${this._error?T`<div class="error-bar">${this._error}</div>`:``}
        ${this._loading?T`<div class="empty-week">Laden...</div>`:this._view===`week`?this._renderWeekView(t):this._view===`agenda`?this._renderAgendaView():this._renderTeamView(t)}
      </div>
    `}};customElements.define(`employee-dashboard`,tn);var nn=class extends M{static properties={_requests:{state:!0},_loading:{state:!0},_showForm:{state:!0},_saving:{state:!0},_error:{state:!0},_success:{state:!0},_confirmModal:{state:!0}};static styles=o`
    :host { display: block; padding: 1.25rem; max-width: 680px; margin: 0 auto; }

    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .archive-btn {
      display: inline-flex; align-items: center; gap: 0.35rem;
      background: var(--app-bg-light, #F4F6F8);
      border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-dark, #1A1A1A); border-radius: 8px;
      padding: 0.5rem 1rem; font-size: 0.85rem; font-weight: 600; cursor: pointer;
      transition: all 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .archive-btn:hover { border-color: var(--app-accent, #2563EB); color: var(--app-accent, #2563EB); background: #fff; }

    .btn-new {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--app-accent, #2563EB); color: #fff;
      border: none; border-radius: 8px; padding: 0.55rem 1.1rem;
      font-size: 0.88rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; -webkit-tap-highlight-color: transparent;
    }
    .btn-new:hover { background: #1D4ED8; }

    /* Modal */
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.48);
      display: flex; align-items: flex-end; justify-content: center;
      z-index: 600; padding: 0;
    }
    @media (min-width: 560px) {
      .modal-backdrop { align-items: center; padding: 1rem; }
    }

    .modal {
      background: #fff;
      border-radius: 20px 20px 0 0;
      width: 100%; max-width: 520px;
      padding: 1.5rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 40px rgba(0,0,0,0.18);
    }
    @media (min-width: 560px) {
      .modal { border-radius: 16px; padding: 2rem; }
    }

    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .modal-title { font-size: 1.15rem; font-weight: 800; color: var(--app-text-dark, #1A1A1A); }
    .modal-close {
      width: 32px; height: 32px; border-radius: 8px;
      background: var(--app-bg-light, #F4F6F8); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--app-text-muted, #626B74); transition: background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .modal-close:hover { background: var(--app-border, #DCDFE3); }

    .date-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.1rem; }
    @media (max-width: 400px) { .date-row { grid-template-columns: 1fr; } }

    .field { display: flex; flex-direction: column; gap: 0.4rem; }
    label {
      font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted, #626B74);
    }

    input[type="date"], textarea {
      padding: 0.75rem 1rem;
      border: 1.5px solid var(--app-border, #DCDFE3);
      border-radius: 10px; font-size: 0.95rem; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      background: var(--app-bg-light, #F4F6F8);
      color: var(--app-text-dark, #1A1A1A);
      width: 100%; box-sizing: border-box;
      -webkit-appearance: none;
    }
    input[type="date"]:focus, textarea:focus {
      border-color: var(--app-accent, #2563EB);
      box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
      background: #fff;
    }

    textarea {
      resize: vertical; min-height: 90px;
      font-family: inherit; font-size: 0.92rem;
      margin-bottom: 1.1rem;
    }

    .alert {
      display: flex; align-items: flex-start; gap: 0.5rem;
      border-radius: 9px; padding: 0.75rem 1rem;
      font-size: 0.84rem; margin-bottom: 1rem;
    }
    .alert.error   { background: #ffebee; border: 1px solid rgba(211,47,47,0.2); color: #C62828; }
    .alert.success { background: #e8f5e9; border: 1px solid rgba(56,142,60,0.2); color: #2E7D32; }

    .modal-actions {
      display: flex; gap: 0.75rem; justify-content: flex-end;
      padding-top: 0.25rem;
    }
    .btn-cancel {
      background: none; border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74); border-radius: 9px;
      padding: 0.7rem 1.2rem; font-size: 0.9rem; font-weight: 600; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-submit {
      display: inline-flex; align-items: center; gap: 0.4rem;
      background: var(--app-accent, #2563EB); color: #fff;
      border: none; border-radius: 9px; padding: 0.7rem 1.4rem;
      font-size: 0.9rem; font-weight: 700; cursor: pointer;
      transition: background 0.15s; -webkit-tap-highlight-color: transparent;
      flex: 1;
    }
    .btn-submit:hover:not(:disabled) { background: #1D4ED8; }
    .btn-submit:disabled { opacity: 0.55; cursor: not-allowed; }

    /* List */
    .section-title {
      font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px; color: var(--app-text-muted, #626B74);
      margin-bottom: 0.6rem;
    }

    .empty-state {
      text-align: center; padding: 3rem 1rem;
      color: var(--app-text-muted, #626B74);
    }

    .request-card {
      background: #fff; border: 1px solid var(--app-border, #DCDFE3);
      border-left: 3px solid #F59E0B;
      border-radius: 10px; padding: 1rem 1.15rem; margin-bottom: 0.55rem;
      display: flex; gap: 1rem; align-items: center;
    }

    .request-body { flex: 1; min-width: 0; }
    .request-dates { font-size: 0.92rem; font-weight: 700; color: var(--app-text-dark, #1A1A1A); }
    .request-reason { font-size: 0.82rem; color: var(--app-text-muted, #626B74); margin-top: 0.15rem; }
    .request-meta { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap; }

    .badge {
      font-size: 0.68rem; font-weight: 700; padding: 0.18rem 0.5rem;
      border-radius: 20px; text-transform: uppercase; letter-spacing: 0.4px;
      background: #FEF3C7; color: #92400E;
    }
    .badge-time {
      font-size: 0.72rem; color: var(--app-text-muted, #626B74);
      display: flex; align-items: center; gap: 0.2rem;
    }

    .btn-delete {
      background: none; border: none; cursor: pointer;
      color: var(--app-text-muted, #626B74); padding: 0.35rem;
      border-radius: 6px; display: flex; align-items: center; flex-shrink: 0;
      transition: color 0.15s, background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .btn-delete:hover { color: #EF4444; background: #FEE2E2; }
  `;constructor(){super(),this._requests=[],this._loading=!0,this._showForm=!1,this._saving=!1,this._error=``,this._success=``,this._confirmModal=null}connectedCallback(){super.connectedCallback(),this._load()}async _load(){this._loading=!0;try{let e=await L();this._requests=e.filter(e=>e.status===`PENDING`)}catch{this._requests=[]}finally{this._loading=!1}}_openForm(){this._showForm=!0,this._error=``,this._success=``}_closeForm(){this._showForm=!1,this._error=``,this.shadowRoot.querySelector(`form`)?.reset()}async _submit(e){e.preventDefault(),this._error=``,this._saving=!0;let t=e.target,n=t.elements.startDate.value,r=t.elements.endDate.value;if(r<n){this._error=`Einddatum mag niet voor startdatum liggen.`,this._saving=!1;return}try{await Ye({startDate:n,endDate:r,reason:t.elements.reason.value.trim()}),this._success=`Verlofaanvraag ingediend!`,this._showForm=!1,await this._load()}catch(e){this._error=e.message||`Fout bij indienen.`}finally{this._saving=!1}}_delete(e){this._confirmModal={title:`Aanvraag verwijderen?`,message:`De verlofaanvraag wordt definitief verwijderd.`,confirmLabel:`Verwijderen`,onConfirm:async()=>{this._confirmModal=null;try{await et(e),await this._load()}catch(e){this._error=e.message||`Kon aanvraag niet verwijderen.`}}}}_fmtDate(e){return new Date(e).toLocaleDateString(`nl-NL`,{day:`numeric`,month:`long`,year:`numeric`})}render(){return T`
      <div class="toolbar">
        <button class="archive-btn"
          @click=${()=>this.dispatchEvent(new CustomEvent(`show-archive`,{bubbles:!0,composed:!0}))}>
          Archief ${K(13)}
        </button>
        <button class="btn-new" @click=${this._openForm}>
          ${B(15)} Nieuw
        </button>
      </div>

      ${this._success?T`<div class="alert success">${U(15)} ${this._success}</div>`:``}

      ${this._loading?T`<p style="color:var(--app-text-muted,#626B74)">Laden...</p>`:``}

      ${!this._loading&&this._requests.length===0?T`
        <div class="empty-state">
          ${q(40)}
          <p>Geen openstaande verlofaanvragen.<br>Druk op "Nieuw" om verlof aan te vragen.</p>
        </div>
      `:``}

      ${this._requests.length>0?T`
        <div class="section-title">Openstaand (${this._requests.length})</div>
      `:``}

      ${this._requests.map(e=>T`
        <div class="request-card">
          <div class="request-body">
            <div class="request-dates">
              ${this._fmtDate(e.startDate)}
              ${e.startDate===e.endDate?``:T` &ndash; ${this._fmtDate(e.endDate)}`}
            </div>
            <div class="request-reason">${e.reason}</div>
            <div class="request-meta">
              <span class="badge">In behandeling</span>
              <span class="badge-time">${W(11)} ${new Date(e.createdAt).toLocaleDateString(`nl-NL`)}</span>
            </div>
          </div>
          <button class="btn-delete" @click=${()=>this._delete(e.id)} title="Verwijderen">
            ${V(15)}
          </button>
        </div>
      `)}

      ${this._showForm?T`
        <div class="modal-backdrop" @click=${e=>e.target===e.currentTarget&&this._closeForm()}>
          <div class="modal">
            <div class="modal-header">
              <span class="modal-title">Verlof aanvragen</span>
              <button class="modal-close" @click=${this._closeForm}>${G(14)}</button>
            </div>

            ${this._error?T`<div class="alert error">${_t(15)} ${this._error}</div>`:``}

            <form @submit=${this._submit}>
              <div class="date-row">
                <div class="field">
                  <label>Startdatum</label>
                  <input type="date" name="startDate" required>
                </div>
                <div class="field">
                  <label>Einddatum</label>
                  <input type="date" name="endDate" required>
                </div>
              </div>
              <div class="field">
                <label>Reden</label>
                <textarea name="reason" placeholder="Omschrijf de reden voor je verlof..." required></textarea>
              </div>
              <div class="modal-actions">
                <button type="button" class="btn-cancel" @click=${this._closeForm}>Annuleren</button>
                <button type="submit" class="btn-submit" ?disabled=${this._saving}>
                  ${this._saving?`Bezig...`:T`${U(15)} Indienen`}
                </button>
              </div>
            </form>
          </div>
        </div>
      `:``}

      <confirm-modal
        .open=${!!this._confirmModal}
        .title=${this._confirmModal?.title||``}
        .message=${this._confirmModal?.message||``}
        .confirmLabel=${this._confirmModal?.confirmLabel||`Verwijderen`}
        danger
        @confirm=${()=>this._confirmModal?.onConfirm?.()}
        @cancel=${()=>this._confirmModal=null}
      ></confirm-modal>
    `}};customElements.define(`leave-request-page`,nn);var rn=class extends M{static properties={_page:{state:!0}};static styles=o`
    :host { display: flex; flex-direction: column; min-height: 100vh; }

    header {
      background: #fff;
      border-bottom: 1px solid var(--app-border, #DCDFE3);
      display: flex; align-items: center;
      padding: 0 1.25rem; height: 60px; gap: 1rem;
      position: sticky; top: 0; z-index: 100;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }

    .brand { display: flex; align-items: center; gap: 0.55rem; font-size: 1.1rem; font-weight: 900; color: var(--app-text-dark, #1A1A1A); letter-spacing: -0.5px; flex: 1; }

    .user-area { display: flex; align-items: center; gap: 0.65rem; }

    .user-name { font-size: 0.82rem; color: var(--app-text-muted, #626B74); display: none; }
    @media (min-width: 400px) { .user-name { display: block; } }

    .avatar-btn {
      width: 34px; height: 34px; border-radius: 50%;
      background: var(--app-accent, #2563EB);
      border: 2px solid transparent;
      color: #fff; font-size: 0.78rem; font-weight: 700;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.15s;
    }

    .avatar-btn:hover { opacity: 0.85; }
    .avatar-btn.active { background: #fff; color: var(--app-accent, #2563EB); border-color: var(--app-accent, #2563EB); }

    .logout-btn {
      background: none;
      border: 1.5px solid var(--app-border, #DCDFE3);
      color: var(--app-text-muted, #626B74); padding: 0.4rem 0.85rem;
      border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: all 0.15s;
    }

    .logout-btn:hover { border-color: var(--app-text-muted); color: var(--app-text-dark); }

    main { flex: 1; }

    .bottom-nav {
      display: flex;
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #fff;
      border-top: 1px solid var(--app-border, #DCDFE3);
      padding: 0.4rem 0 max(0.4rem, env(safe-area-inset-bottom));
      z-index: 100;
      box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
    }

    main { padding-bottom: 64px; }

    .bn-btn {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
      background: none; border: none; color: var(--app-text-muted, #626B74);
      font-size: 0.65rem; padding: 0.4rem 0.25rem; cursor: pointer; transition: color 0.15s;
      min-height: 48px;
    }

    .bn-btn.active { color: var(--app-accent, #2563EB); }
    .bn-icon { font-size: 1.25rem; line-height: 1; }
  `;constructor(){super(),this._page=`rooster`}_initials(){return(N.user?.fullName||``).split(` `).map(e=>e[0]).join(``).slice(0,2).toUpperCase()}render(){let e=[{id:`rooster`,label:`Rooster`,icon:st(18)},{id:`verlof`,label:`Verlof`,icon:q(18)},{id:`profiel`,label:`Profiel`,icon:z(18)}];return T`
      <header>
        <div class="brand">${ot(30)} Rooster</div>
        <div class="user-area">
          <span class="user-name">${N.user?.fullName}</span>
          <notification-bell @navigate=${e=>this._page=e.detail.page}></notification-bell>
          <button class="avatar-btn ${this._page===`profiel`?`active`:``}"
            @click=${()=>this._page=`profiel`}>${this._initials()}</button>
          <button class="logout-btn" @click=${()=>N.logout()} title="Uitloggen">${vt(15)}</button>
        </div>
      </header>

      <main>
        ${this._page===`rooster`?T`<employee-dashboard></employee-dashboard>`:``}
        ${this._page===`verlof`?T`<leave-request-page @show-archive=${()=>this._page=`archief`}></leave-request-page>`:``}
        ${this._page===`archief`?T`<leave-archive-page role="employee" @back=${()=>this._page=`verlof`}></leave-archive-page>`:``}
        ${this._page===`profiel`?T`<profile-page></profile-page>`:``}
      </main>

      <div class="bottom-nav">
        ${e.map(e=>T`
          <button class="bn-btn ${this._page===e.id?`active`:``}" @click=${()=>this._page=e.id}>
            <span class="bn-icon">${e.icon}</span>${e.label}
          </button>
        `)}
      </div>
    `}};customElements.define(`employee-shell`,rn);var an=class extends M{static properties={_user:{state:!0}};static styles=o`:host { display: block; min-height: 100vh; }`;constructor(){super(),this._user=N.user,N.addEventListener(`change`,()=>{this._user=N.user})}render(){return this._user?this._user.role===`EMPLOYER`?T`<employer-shell></employer-shell>`:T`<employee-shell></employee-shell>`:T`<login-page></login-page>`}};customElements.define(`rooster-app`,an);