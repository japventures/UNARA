// Compatibility dispatcher appended to the existing post-MFA entry module.
// The historical ownerSyntheticPreviewEnabled flag keeps the existing Auth
// entry reachable; it does not grant owner rights. Server authority is mandatory.
import {mountOwnerSyntheticPreview as mountOwnerSyntheticPreviewLegacy} from './owner-synthetic-preview.js?v=owner-preview-35-1';
export function mountOwnerSyntheticPreview(options){
 if(globalThis.window?.UNARA_RECOVERY_REVIEW_CONFIG?.operationalAdminEnabled!==true)
  return mountOwnerSyntheticPreviewLegacy(options);
 let disposed=false,child=null;
 const active=()=>!disposed&&options.isActive();
 const dispose=()=>{if(disposed)return;disposed=true;child?.dispose?.();child=null;};
 const ready=(async()=>{
  try{
   if(!active()||!await options.revalidate()||!active())return;
   const module=await import('./operational-admin.js?v=operational-245');
   if(!active())return;
   child=module.mountOperationalPortal({...options,isActive:active});
   await child.ready;
   if(!active())child.dispose();
  }catch{
   child?.dispose?.();child=null;
   if(active()){
    const note=(options.doc||document).createElement('p');note.setAttribute('role','status');
    note.textContent='No se pudo abrir la administración. Verifica tu acceso e intenta de nuevo.';
    options.root.replaceChildren(note);
   }
  }
 })();
 return{ready,dispose};
}
