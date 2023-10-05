import{d as Y,r as j,u as O,a as ee,b as W,c as $,o as te,_ as ne,e as oe,f as q,g as L,n as ie,F as se,h as w,i as K,j as J,w as B,T as D,t as ae,k as z,p as re,l as de,m as ce,q as pe,s as H,v as U,x as E,y as V,z as le,A as ue,B as F}from"./entry.7252b578.js";import{r as fe}from"./asyncData.5d0c0c9e.js";import{u as ve}from"./utils.f47d9b9d.js";import{q as we}from"./query.92398883.js";import"./ready.bb3cddb5.js";import"./preview.51f3785b.js";const _e={},me=Y(_e);function Z(){const i=O();return i._appConfig||(i._appConfig=j(me)),i._appConfig}const b=i=>(re("data-v-2b9f80bf"),i=i(),de(),i),he=b(()=>w("svg",{viewBox:"0 0 90 90",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[w("path",{d:"M50.0016 71.0999h29.2561c.9293.0001 1.8422-.241 2.6469-.6992.8047-.4582 1.4729-1.1173 1.9373-1.9109.4645-.7936.7088-1.6939.7083-2.6102-.0004-.9162-.2455-1.8163-.7106-2.6095L64.192 29.713c-.4644-.7934-1.1325-1.4523-1.937-1.9105-.8046-.4581-1.7173-.6993-2.6463-.6993-.9291 0-1.8418.2412-2.6463.6993-.8046.4582-1.4726 1.1171-1.937 1.9105l-5.0238 8.5861-9.8224-16.7898c-.4648-.7934-1.1332-1.4522-1.938-1.9102-.8047-.4581-1.7176-.6992-2.6468-.6992-.9292 0-1.842.2411-2.6468.6992-.8048.458-1.4731 1.1168-1.9379 1.9102L6.56062 63.2701c-.46512.7932-.71021 1.6933-.71061 2.6095-.00041.9163.24389 1.8166.70831 2.6102.46443.7936 1.1326 1.4527 1.93732 1.9109.80473.4582 1.71766.6993 2.64686.6992h18.3646c7.2763 0 12.6422-3.1516 16.3345-9.3002l8.9642-15.3081 4.8015-8.1925 14.4099 24.6083H54.8058l-4.8042 8.1925ZM29.2077 62.899l-12.8161-.0028L35.603 30.0869l9.5857 16.4047-6.418 10.9645c-2.4521 3.9894-5.2377 5.4429-9.563 5.4429Z",fill:"currentColor"})],-1)),ye=b(()=>w("span",null,"Preview mode enabled",-1)),ge={key:0},ke=b(()=>w("div",{id:"__preview_background"},null,-1)),Ce=b(()=>w("svg",{id:"__preview_loading_icon",width:"32",height:"32",viewBox:"0 0 24 24"},[w("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"})],-1)),Ie=b(()=>w("p",null,"Initializing the preview...",-1)),Pe={key:0},xe=b(()=>w("div",{id:"__preview_background"},null,-1)),Se={id:"__preview_loader"},Te=ee({__name:"ContentPreviewMode",props:{previewToken:{type:String,required:!0},apiURL:{type:String,required:!0},syncPreview:{type:Function,required:!0},requestPreviewSyncAPI:{type:Function,required:!0}},setup(i){const s=i,c=["__nuxt_preview","__preview_enabled"],f=O(),h=W(),r=$(!0),g=$(!1),o=$(!1),p=$("");let a;const m=async()=>{z("previewToken").value="",window.sessionStorage.removeItem("previewToken"),await h.replace({query:{preview:void 0}}),window.location.reload()},A=async S=>{const _=await s.syncPreview(S);if(o.value!==!0){if(!_){setTimeout(()=>A(S),1e3);return}z("previewToken").value&&(o.value=!0,await h.replace({query:{}}),f.callHook("nuxt-studio:preview:ready"),window.parent&&window.self!==window.parent&&a.disconnect())}};return te(async()=>{a=(await ne(()=>import("./index.17e44084.js"),[],import.meta.url)).connect(`${s.apiURL}/preview`,{transports:["websocket","polling"],auth:{token:s.previewToken}});let _;a.on("connect",()=>{_=setTimeout(()=>{o.value||(_=setTimeout(()=>{p.value="Preview sync timed out",o.value=!1},3e4),a.emit("draft:requestSync"))},3e4)});const I=()=>{_&&(clearTimeout(_),_=null)};a.on("draft:sync",async P=>{if(I(),!P){try{a.once("draft:ready",()=>{a.emit("draft:requestSync")}),await s.requestPreviewSyncAPI()}catch(R){switch(I(),R.response.status){case 404:p.value="Preview draft not found",o.value=!1;break;default:p.value="An error occurred while syncing preview",o.value=!1}}return}A(P)}),a.on("draft:unauthorized",()=>{I(),p.value="Unauthorized preview token",o.value=!1}),a.on("disconnect",()=>{I()}),document.body.classList.add(...c),a.on("draft:update",P=>{g.value=!0,s.syncPreview(P),g.value=!1})}),oe(()=>{document.body.classList.remove(...c)}),(S,_)=>(q(),L("div",null,[r.value?(q(),L("div",{key:0,id:"__nuxt_preview",class:ie({__preview_ready:o.value,__preview_refreshing:g.value})},[o.value?(q(),L(se,{key:0},[he,ye,w("button",{onClick:m}," Close ")],64)):K("",!0)],2)):K("",!0),J(D,{name:"preview-loading"},{default:B(()=>[r.value&&!o.value&&!p.value?(q(),L("div",ge,[ke,w("div",{id:"__preview_loader"},[Ce,Ie,w("button",{onClick:m}," Cancel ")])])):K("",!0)]),_:1}),J(D,{name:"preview-loading"},{default:B(()=>[p.value?(q(),L("div",Pe,[xe,w("div",Se,[w("p",null,ae(p.value),1),w("button",{onClick:m}," Exit preview ")])])):K("",!0)]),_:1})]))}});const be=ce(Te,[["__scopeId","data-v-2b9f80bf"]]),Ae=(i=[],s,c)=>{const f=[...s||[]],h=[...c||[]],r=JSON.parse(JSON.stringify(i));for(const o of f)if(o.oldPath)if(h.splice(h.findIndex(a=>a.path===o.oldPath),1),f.find(a=>a.path===o.oldPath))r.push({path:o.path,parsed:o.parsed});else{const a=r.find(m=>m.path===o.oldPath);a&&(a.path=o.path,o.parsed?a.parsed=o.parsed:o.pathMeta&&["_file","_path","_id","_locale"].forEach(m=>{a.parsed[m]=o.pathMeta[m]}))}else if(o.new)r.push({path:o.path,parsed:o.parsed});else{const p=r.find(a=>a.path===o.path);p&&Object.assign(p,{path:o.path,parsed:o.parsed})}for(const o of h)r.splice(r.findIndex(p=>p.path===o.path),1);const g=new Intl.Collator(void 0,{numeric:!0});return r.sort((o,p)=>g.compare(o.path,p.path)),r},C={appConfig:"app.config.ts",tokensConfig:"tokens.config.ts"},Re=i=>{let s;return(...c)=>(s||(s=i()),s)};function G(i,s){for(const c in i){const f=s[c];c in s||delete i[c],f!==null&&typeof f=="object"&&G(i[c],s[c])}}function Q(i,s){for(const c in s){const f=s[c];f!==null&&typeof f=="object"?(i[c]=i[c]||{},Q(i[c],f)):i[c]=f}}const qe=Re(()=>JSON.parse(JSON.stringify(Z()))),Oe=()=>{const i=O(),{studio:s,content:c}=pe().public,f=qe();let h;const r=H("studio-client-db",()=>null),g=H("studio-preview-db-files",()=>[]);r.value||(i.hook("content:storage",e=>{r.value=e}),we("/non-existing-path").findOne());const o=async(e,n,d=!0)=>{const u=window.sessionStorage.getItem("previewToken"),v=await e.getKeys(`${u}:`);await Promise.all(v.map(l=>e.removeItem(l)));const t=new Set(n.map(l=>l.parsed._id.split(":").shift()));await e.setItem(`${u}$`,JSON.stringify({ignoreSources:Array.from(t)})),await Promise.all(n.map(l=>e.setItem(`${u}:${l.parsed._id}`,JSON.stringify(l.parsed))))},p=e=>{const n=E(i,Z);Q(n,V(e,f)),e||G(n,f)},a=e=>{var d,u,v,t;const n=(t=(v=(u=(d=i==null?void 0:i.vueApp)==null?void 0:d._context)==null?void 0:u.config)==null?void 0:v.globalProperties)==null?void 0:t.$pinceauTheme;!n||!(n!=null&&n.updateTheme)||(h||(h=JSON.parse(JSON.stringify((n==null?void 0:n.theme.value)||{}))),E(i,n.updateTheme,[V(e,h)]))},m=async e=>{if(g.value=e.files=e.files||g.value||[],!r.value)return!1;const n=Ae(e.files,e.additions,e.deletions),d=n.filter(t=>![C.appConfig,C.tokensConfig].includes(t.path));await o(r.value,d,(e.files||[]).length!==0);const u=n.find(t=>t.path===C.appConfig);p(u==null?void 0:u.parsed);const v=n.find(t=>t.path===C.tokensConfig);return a(v==null?void 0:v.parsed),R(),!0},A=async()=>{const e=window.sessionStorage.getItem("previewToken");await $fetch("api/projects/preview/sync",{baseURL:s==null?void 0:s.apiURL,method:"POST",params:{token:e}})},S=()=>{const e=window.sessionStorage.getItem("previewToken"),n=document.createElement("div");n.id="__nuxt_preview_wrapper",document.body.appendChild(n),le(be,{previewToken:e,apiURL:s==null?void 0:s.apiURL,syncPreview:m,requestPreviewSyncAPI:A}).mount(n)},_=async e=>{var u,v,t;const n=window.sessionStorage.getItem("previewToken");if(!e)return null;e=e.replace(/\/$/,"");let d=await((u=r.value)==null?void 0:u.getItem(`${n}:${e}`));return d||(d=await((v=r.value)==null?void 0:v.getItem(`cached:${e}`))),d||(d=d=await((t=r.value)==null?void 0:t.getItem(e))),d},I=e=>{var d;const n=window.sessionStorage.getItem("previewToken");r.value&&r.value.setItem(`${n}:${(d=e.parsed)==null?void 0:d._id}`,JSON.stringify(e.parsed))},P=async e=>{var d;const n=window.sessionStorage.getItem("previewToken");await((d=r.value)==null?void 0:d.removeItem(`${n}:${e}`))},R=async()=>{if(c!=null&&c.documentDriven){const{pages:e}=E(i,ve);for(const n in e.value)e.value[n]&&(e.value[n]=await _(e.value[n]._id))}ue(()=>{E(i,fe)})};return{apiURL:s==null?void 0:s.apiURL,contentStorage:r,syncPreviewFiles:o,syncPreviewAppConfig:p,syncPreviewTokensConfig:a,requestPreviewSynchronization:A,findContentWithId:_,updateContent:I,removeContentWithId:P,requestRerender:R,mountPreviewUI:S,initiateIframeCommunication:X};function X(){if(!window.parent||window.self===window.parent)return;const e=W(),n=U(),d=$(""),u=t=>({path:t.path,query:F(t.query),params:F(t.params),fullPath:t.fullPath,meta:F(t.meta)});window.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey||t.altKey||t.shiftKey)&&window.parent.postMessage({type:"nuxt-studio:preview:keydown",payload:{key:t.key,metaKey:t.metaKey,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,altKey:t.altKey}},"*")}),window.addEventListener("message",async t=>{if(!["https://nuxt.studio","https://dev.nuxt.studio"].includes(t.origin))return;const{type:l,payload:T={}}=t.data||{};switch(l){case"nuxt-studio:editor:file-selected":{const y=await _(T.path);y&&(y._partial||y._path!==U().path&&(d.value=y._path,e.push(y._path)));break}case"nuxt-studio:editor:file-changed":{const{additions:y=[],deletions:N=[]}=T;for(const k of y)await I(k);for(const k of N)await P(k.path);R();break}case"nuxt-studio:preview:sync":{m(T);break}case"nuxt-studio:config:file-changed":{const{additions:y=[],deletions:N=[]}=T,k=y.find(x=>x.path===C.appConfig);k&&p(k==null?void 0:k.parsed),N.find(x=>x.path===C.appConfig)&&p(void 0);const M=y.find(x=>x.path===C.tokensConfig);M&&a(M==null?void 0:M.parsed),N.find(x=>x.path===C.tokensConfig)&&a(void 0);break}}}),i.hook("page:finish",()=>{v()}),i.hook("content:document-driven:finish",({route:t,page:l})=>{t.meta.studio_page_contentId=l==null?void 0:l._id}),i.hook("nuxt-studio:preview:ready",()=>{window.parent.postMessage({type:"nuxt-studio:preview:ready",payload:u(U())},"*"),setTimeout(()=>{v()},100)});function v(){const t=Array.from(window.document.querySelectorAll("[data-content-id]")).map(T=>T.getAttribute("data-content-id")),l=Array.from(new Set([n.meta.studio_page_contentId,...t])).filter(Boolean);if(d.value===l[0]){d.value="";return}window.openContentInStudioEditor(l,{navigate:!0,pageContentId:n.meta.studio_page_contentId})}window.openContentInStudioEditor=(t,l={})=>{window.parent.postMessage({type:"nuxt-studio:preview:navigate",payload:{...u(n),contentIds:t,...l}},"*")}}};export{Oe as useStudio};
