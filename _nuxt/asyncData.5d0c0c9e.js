import{c as y,R as g,S as P,e as m,K as w,u as v,E as x,U as b,V as C}from"./entry.7252b578.js";import{o as O}from"./ready.bb3cddb5.js";const k=()=>null;function M(...n){const u=typeof n[n.length-1]=="string"?n.pop():void 0;typeof n[0]!="string"&&n.unshift(u);let[a,l,r={}]=n;if(typeof a!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof l!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");r.server=r.server??!0,r.default=r.default??k,r.lazy=r.lazy??!1,r.immediate=r.immediate??!0;const e=v(),f=()=>e.isHydrating?e.payload.data[a]:e.static.data[a],d=()=>f()!==void 0;e._asyncData[a]||(e._asyncData[a]={data:y(f()??r.default()),pending:y(!d()),error:g(e.payload._errors,a),status:y("idle")});const t={...e._asyncData[a]};t.refresh=t.execute=(o={})=>{if(e._asyncDataPromises[a]){if(o.dedupe===!1)return e._asyncDataPromises[a];e._asyncDataPromises[a].cancelled=!0}if((o._initial||e.isHydrating&&o._initial!==!1)&&d())return f();t.pending.value=!0,t.status.value="pending";const c=new Promise((s,i)=>{try{s(l(e))}catch(_){i(_)}}).then(s=>{if(c.cancelled)return e._asyncDataPromises[a];let i=s;r.transform&&(i=r.transform(s)),r.pick&&(i=B(i,r.pick)),t.data.value=i,t.error.value=null,t.status.value="success"}).catch(s=>{if(c.cancelled)return e._asyncDataPromises[a];t.error.value=s,t.data.value=x(r.default()),t.status.value="error"}).finally(()=>{c.cancelled||(t.pending.value=!1,e.payload.data[a]=t.data.value,t.error.value&&(e.payload._errors[a]=b(t.error.value)),delete e._asyncDataPromises[a])});return e._asyncDataPromises[a]=c,e._asyncDataPromises[a]};const p=()=>t.refresh({_initial:!0}),D=r.server!==!1&&e.payload.serverRendered;{const o=C();if(o&&!o._nuxtOnBeforeMountCbs){o._nuxtOnBeforeMountCbs=[];const s=o._nuxtOnBeforeMountCbs;o&&(P(()=>{s.forEach(i=>{i()}),s.splice(0,s.length)}),m(()=>s.splice(0,s.length)))}D&&e.isHydrating&&d()?(t.pending.value=!1,t.status.value=t.error.value?"error":"success"):o&&(e.payload.serverRendered&&e.isHydrating||r.lazy)&&r.immediate?o._nuxtOnBeforeMountCbs.push(p):r.immediate&&p(),r.watch&&w(r.watch,()=>t.refresh());const c=e.hook("app:data:refresh",s=>{if(!s||s.includes(a))return t.refresh()});o&&m(c)}const h=Promise.resolve(e._asyncDataPromises[a]).then(()=>t);return Object.assign(h,t),h}async function R(n){await new Promise(a=>O(a));const u=n?Array.isArray(n)?n:[n]:void 0;await v().hooks.callHookParallel("app:data:refresh",u)}function B(n,u){const a={};for(const l of u)a[l]=n[l];return a}export{R as r,M as u};
