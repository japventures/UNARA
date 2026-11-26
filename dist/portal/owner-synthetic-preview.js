import {createOwnerPreviewUI} from './owner-preview-369.js?v=3.6.9-r1';
const ENDPOINT='https://vgksadeprdrrvllknqul.supabase.co/functions/v1/unara-owner-synthetic-preview';
const ISSUER='https://vgksadeprdrrvllknqul.supabase.co/auth/v1';
const ORIGIN='https://unara.mx';
const OPTIONS=Object.freeze([['amssi','admin','Admin · AMSSI'],['dafaly','admin','Admin · Dafaly'],['amssi','client-amssi','Cliente simulado · AMSSI'],['dafaly','client-dafaly','Cliente simulado · Dafaly']]);
const allowed=(id,view)=>OPTIONS.some(o=>o[0]===id&&o[1]===view);
const bounded=(s,max)=>typeof s==='string'&&s.trim().length>0&&s.length<=max;
export function validateOwnerPreview(value,id,view){
 if(!allowed(id,view)||!value||typeof value!=='object'||Array.isArray(value)||Object.getPrototypeOf(value)!==Object.prototype)throw Error('INVALID');
 const keys=Object.keys(value), expected=['id','name','stage','simulation','nextStep','progress','stages','tasks','documents'];
 if(!expected.every(k=>Object.hasOwn(value,k))||keys.some(k=>!expected.includes(k)&&!(view==='admin'&&k==='internalNote')))throw Error('INVALID');
 if(view==='admin'&&!Object.hasOwn(value,'internalNote'))throw Error('INVALID');
 if(value.id!==id||value.simulation!==true||!bounded(value.name,200)||!bounded(value.stage,300)||('internalNote' in value&&!bounded(value.internalNote,1200)))throw Error('INVALID');
 if(!bounded(value.nextStep,500)||!Number.isInteger(value.progress)||value.progress<0||value.progress>100)throw Error('INVALID');
 const statuses=['pending','in-progress','done'];
 const list=(items,key)=>{
    if(!Array.isArray(items)||items.length>40)throw Error('INVALID');
    return Object.freeze(items.map(item=>{
       if(!item||Object.getPrototypeOf(item)!==Object.prototype||Object.keys(item).length!==2||!Object.hasOwn(item,key)||!Object.hasOwn(item,'status')||!bounded(item[key],250)||!statuses.includes(item.status))throw Error('INVALID');
       if(view!=='admin'&&key==='label'&&item[key].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes('revision interna'))throw Error('INVALID');
       return Object.freeze({[key]:item[key],status:item.status});
    }));
 };
 return Object.freeze({id:value.id,name:value.name,stage:value.stage,simulation:true,nextStep:value.nextStep,progress:value.progress,stages:list(value.stages,'name'),tasks:list(value.tasks,'label'),documents:list(value.documents,'label'),...(view==='admin'?{internalNote:value.internalNote}:{})});
}
export function mountOwnerSyntheticPreview({root,client,subject,isActive,revalidate,publishableKey,fetcher=globalThis.fetch.bind(globalThis),origin=location.origin,doc=document,now=Date.now}){
 const element=(tag,text)=>{const n=doc.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
 const panel=element('section');panel.className='owner-preview-v35';panel.dataset.testid='owner-synthetic-preview';
 const status=element('p','Verificando acceso…');status.className='owner-preview-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 root.append(panel);
 let disposed=false,version=0,pending=null,ui=null,selection={id:'amssi',view:'admin'};
 const active=n=>!disposed&&n===version&&isActive();
 function clear(){++version;pending?.abort();pending=null;ui?.loading(selection);return version}
 function dispose(){if(disposed)return;disposed=true;clear();ui?.dispose();status.textContent='';panel.remove()}
 if(origin!==ORIGIN||!subject||typeof publishableKey!=='string'||!publishableKey.startsWith('sb_publishable_')||!isActive()){dispose();return{dispose};}
 ui=createOwnerPreviewUI({root:panel,doc,options:OPTIONS,onOpen:(id,view)=>{void open(id,view)},isActive:()=>!disposed&&isActive()});
 panel.append(status);
 async function verifiedToken(){
   if(!await revalidate())throw Error('DENIED');
   const s=await client.auth.getSession(), session=s.data?.session;
   if(s.error||!session||typeof session.access_token!=='string'||session.user?.id!==subject)throw Error('DENIED');
   const result=await client.auth.getClaims(session.access_token), claims=result.data?.claims;
   if(result.error||!claims||claims.sub!==subject||claims.role!=='authenticated'||claims.aal!=='aal2'||claims.iss!==ISSUER||!Number.isFinite(claims.exp)||claims.exp*1000<=now())throw Error('DENIED');
   return session.access_token;
 }
 async function open(id,view){
   if(!allowed(id,view)||!isActive()){dispose();return;}
   selection={id,view};
   const n=clear(), request=new AbortController();pending=request;status.textContent='Verificando acceso…';
   try{
      const token=await verifiedToken();if(!active(n))return;
      const response=await fetcher(ENDPOINT,{method:'POST',redirect:'error',cache:'no-store',credentials:'omit',signal:request.signal,headers:{Authorization:'Bearer '+token,apikey:publishableKey,'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({id,view})});
      if(!active(n))return;
      if(!response.ok||response.status!==200)throw Error('DENIED');
      const data=validateOwnerPreview(await response.json(),id,view);
      if(!active(n))return;
      const finalToken=await verifiedToken();
      if(!active(n))return;
      if(finalToken!==token)throw Error('DENIED');
      ui.show({data,id,view});
      status.textContent='Sesión verificada · piloto privado 3.5. No se guardaron cambios reales.';
   }catch{if(active(n)){ui.error();status.textContent='No se pudo verificar el acceso al piloto. No se mostraron datos.';}}
   finally{if(pending===request)pending=null;}
 }
 void open('amssi','admin');
 return{dispose};
}

