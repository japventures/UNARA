const CATALOG={"c1":[],"v1":[{"title":"Contratación y primer pago","state":"closed"},{"title":"Cuestionario y expediente de socios","state":"closed"},{"title":"Asesoría y definición de entidad y estructura","state":"closed"},{"title":"Registro estatal","state":"closed"},{"title":"Obtención del EIN","state":"closed"},{"title":"Revisión de company documents","state":"active"},{"title":"Firma de company documents","state":"waiting"},{"title":"Apertura de cuenta Mercury","state":"waiting","optional":true},{"title":"Entrega y onboarding con contador o preparador de impuestos","state":"waiting"}],"l1":[{"title":"Evaluación de elegibilidad E-2","state":"closed"},{"title":"Estrategia y contratación","state":"closed"},{"title":"Negocio e inversión","state":"closed"},{"title":"Expediente financiero","state":"closed"},{"title":"Plan de negocio y evidencia","state":"active"},{"title":"Expediente jurídico y formularios","state":"waiting"},{"title":"Revisión final con el cliente","state":"waiting"},{"title":"Presentación y citas consulares","state":"waiting"},{"title":"Entrevista y requerimientos","state":"waiting"},{"title":"Resolución y cierre","state":"waiting"}],"n1":[{"title":"Presentación","state":"closed"},{"title":"Contratación, pago y alcance","state":"closed"},{"title":"Opciones y selección de terreno","state":"closed"},{"title":"Validación del expediente Shovel Ready","state":"closed"},{"title":"Apartado, earnest money y compañía de títulos","state":"closed"},{"title":"Compra y cierre del terreno","state":"active"},{"title":"Lender para construcción, cuando aplique","state":"waiting"},{"title":"GC / Amplify: propuesta y contrato","state":"waiting"},{"title":"Autorización de arranque","state":"waiting"},{"title":"Seguimiento de la inversión","state":"waiting"},{"title":"Entrega y salida de la inversión","state":"waiting"}],"n2":[{"title":"Presentación","state":"closed"},{"title":"Contratación, pago y alcance","state":"closed"},{"title":"Opciones y selección de terreno","state":"closed"},{"title":"Validación de expediente y pendientes de desarrollo","state":"closed"},{"title":"Apartado, earnest money y compañía de títulos","state":"active"},{"title":"Compra y cierre del terreno","state":"waiting"},{"title":"Lender para construcción, cuando aplique","state":"waiting"},{"title":"Estudios y factibilidad · Alcance por confirmar","state":"waiting"},{"title":"Definición del desarrollo · Alcance por confirmar","state":"waiting"},{"title":"Replat / subdivisión, si corresponde · Alcance por confirmar","state":"waiting"},{"title":"Arquitectura e ingenierías · Alcance por confirmar","state":"waiting"},{"title":"Permisos y autorizaciones · Alcance por confirmar","state":"waiting"},{"title":"Urbanización, accesos y servicios, si corresponde · Alcance por confirmar","state":"waiting"},{"title":"GC / Amplify: propuesta y contrato","state":"waiting"},{"title":"Autorización de arranque","state":"waiting"},{"title":"Seguimiento de la inversión","state":"waiting"},{"title":"Entrega y salida de la inversión","state":"waiting"}],"a1":[{"title":"Presentación del equipo y recepción del proyecto","state":"closed"},{"title":"Presentación de propuesta","state":"closed"},{"title":"Aprobación y contrato de construcción","state":"closed"},{"title":"Anticipo y condiciones de inicio","state":"closed"},{"title":"Reunión de arranque","state":"active"},{"title":"Inicio real de obra","state":"waiting"},{"title":"Hito de cimentación","state":"waiting"},{"title":"Hito de estructura y cubierta","state":"waiting"},{"title":"Hito de instalaciones","state":"waiting"},{"title":"Hito de acabados","state":"waiting"},{"title":"Recorrido previo a entrega","state":"waiting"},{"title":"Entrega de obra y cierre contractual","state":"waiting"},{"title":"Garantías y atención posterior","state":"waiting"}],"u1":[{"title":"Briefing","state":"closed"},{"title":"Look & Feel","state":"active"},{"title":"Aprobación del Look & Feel","state":"waiting"},{"title":"Propuesta de materiales y acabados","state":"waiting"},{"title":"3D y renders","state":"waiting"},{"title":"Aprobación de propuesta y renders","state":"waiting"},{"title":"Planos de detalle y especificaciones","state":"waiting"},{"title":"Instalación y acabados según alcance","state":"waiting"},{"title":"Entrega y cierre de pendientes","state":"waiting"}],"m1":[{"title":"Día 1 · Brief: formulario y referencias","state":"waiting"},{"title":"Días 1–2 · Logo e identidad: propuestas, selección y ajustes","state":"waiting"},{"title":"Días 2–3 · Web: diseños, selección y sitio bilingüe","state":"waiting"},{"title":"Días 3–4 · Dominio, correo, redes y seis publicaciones","state":"waiting"},{"title":"Día 5 · Lanzamiento y entrega: web, redes y archivos","state":"waiting"}]};
function startPresentation(shadow,doc,sessionActive){
 if(!sessionActive())return;
 const test=false;
const F=[['vision','Vision Accounts','#167345','vision-accounts.png'],['legal','LegalKey','#244bc0','legal-key.png'],['northreach','Northreach','#815c43','northreach.png'],['amplify','Amplify','#34383d','amplify.png'],['umber','UMBER','#8b482f','umber.png'],['marketing','Smartketing','#826329',''],['casa_norte','Casa Norte','#486c73','']];
const T=[['v1','vision','New Entity Formation',0,2],['l1','legal','Visa E-2 · Ruta consular',.5,9.5],['n1','northreach','Shovel Ready',1.5,11],['n2','northreach','Desarrollo desde cero',1.5,12],['a1','amplify','Construcción · GC',4.5,12],['u1','umber','Diseño y acabados',5.5,11],['m1','marketing','Digital Launch',0,0.25],['c1','casa_norte','Renta y administración',null,null]];
const RO={super:'Superadmin',operations:'Operaciones',legal:'Equipo LegalKey',client:'Cliente'},PJ={draft:'Prospecto',active:'Activo',delivered:'Entregado',archived:'Archivado'},SS={waiting:'En espera',active:'En proceso',closed:'Cerrado',blocked:'Requiere seguimiento'},ST={waiting:'En espera',active:'En proceso',closed:'Cerrada',noapp:'No aplica'};
const $=id=>shadow.getElementById(id),E=(tag,txt,cls)=>{const e=doc.createElement(tag);if(txt!=null)e.textContent=String(txt);if(cls)e.className=cls;return e;},cp=x=>JSON.parse(JSON.stringify(x)),firm=id=>F.find(f=>f[0]===id),active=p=>p.services.filter(s=>s.enabled),clean=(s,n=120)=>typeof s==='string'?s.trim().slice(0,n):'';
const taskStats=stages=>{const all=Array.isArray(stages)?stages:[],included=all.filter(x=>x.applicable!==false&&x.state!=='noapp'),done=included.filter(x=>x.state==='closed').length,total=included.length;return{done,total,omitted:all.length-total,percent:total?Math.round(100*done/total):null};};
const progressText=s=>{const x=taskStats(s.stages);return x.percent===null?'—':x.percent+'%';};
const progressCount=s=>{const x=taskStats(s.stages);return x.total?x.done+'/'+x.total+' completadas':'Sin tareas aplicables';};
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'))&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
/* Template provenance and scope are independent of execution state. Local synthetic preview only. */
const TEMPLATE_VERSION='UNARA-2.4-referencia + Digital Launch + Casa Norte (alcance documentado, etapas pendientes)';
const TEMPLATE_SOURCE={
 v1:{status:'Acordado con Jorge',level:'documented',source:'Guía UNARA 2.4 · catálogo NEF (9 etapas). Apertura Mercury opcional.'},
 l1:{status:'Acuerdo histórico · revisión pendiente',level:'review',source:'Guía UNARA 2.4 · recorrido E-2 (10 etapas). La propuesta posterior de 6 iniciales no ha sido aprobada; validar con Abraham.'},
 n1:{status:'Ruta acordada para revisión',level:'review',source:'Guía UNARA 2.4 · Shovel Ready (11 etapas), no SOP definitivo. Propuesta posterior de 15 sin detalle aprobado.'},
 n2:{status:'Propuesta de alcance por validar',level:'pending',source:'Guía UNARA 2.4 · desarrollo desde cero (17 referencias). Seis actividades de desarrollo aún por confirmar, excluidas del avance de muestra.'},
 a1:{status:'Fases acordadas con Jorge',level:'documented',source:'Guía UNARA 2.4 · 10 fases, 13 puntos de seguimiento (cuatro hitos de construcción en la fase 7). Reporte semanal exclusivamente en Buildertrend.'},
 u1:{status:'Pendiente de validar con UMBER',level:'pending',source:'Guía UNARA 2.4 · 9 referencias, revisión por firma. Look & Feel precede materiales, 3D y renders; tiempos y alcance pendientes.'},
 m1:{status:'Documentado por proveedor',level:'documented',source:'PDF DigitalLaunch Smartketing y DigitalLaunch Smartketing 1slide · Brief, Logo, Web, Correo y redes, Lanzamiento (5 días hábiles objetivo, sujeto a respuesta).'},
 c1:{status:'Alcance documentado · etapas pendientes',level:'pending',source:'UNARA V5 — Invertir con dirección y UNARA_recorrido_cliente_y_portal: renta y administración si se conserva el inmueble para renta tras la entrega. Guía 2.2: referencia propuesta de coordinación, sin etapas aprobadas, operador y plazo por confirmar.'}
};
function stageRule(id,i){
 if(id==='v1'&&i===7)return{kind:'optional',key:'mercury',label:'Mercury opcional según alcance'};
 if((id==='n1'||id==='n2')&&i===6)return{kind:'conditional',key:'finance',label:'Lender solo si se incluye financiamiento'};
 if(id==='u1'&&i===7)return{kind:'conditional',key:'umberInstallation',label:'Instalación y acabados según alcance de muestra, pendiente validación UMBER'};
 if(id==='n2'&&i>=7&&i<=12)return{kind:'pending-source',key:'',label:'Alcance por confirmar; no se incorpora al cálculo'};
 return{kind:'required',key:'',label:'Etapa de referencia del recorrido'};
}
function scopeOptions(x){const a=x?.scopeOptions;return{mercury:typeof a?.mercury==='boolean'?a.mercury:true,umberInstallation:typeof a?.umberInstallation==='boolean'?a.umberInstallation:true};}
function stageIncluded(c,rule){if(rule.kind==='pending-source')return false;if(rule.key==='finance')return !!c.finance;if(rule.key)return scopeOptions(c)[rule.key]===true;return true;}
function scopeReason(rule,included){if(rule.kind==='pending-source')return 'Pendiente de validación · fuera del cálculo';if(included)return rule.kind==='required'?'Incluida en recorrido':'Incluida por alcance de muestra';return 'No incluida en alcance de muestra';}
function scopedStage(c,id,x,i,old){
 const rule=stageRule(id,i),stageKey=id+':'+(i+1),applicable=stageIncluded(c,rule);
 const prior=old?.stages?.[i],state=prior&&prior.title===x.title&&(prior.stageKey===stageKey||!prior.stageKey)&&['waiting','active','closed'].includes(prior.state)?prior.state:'waiting';
 return {...x,state,stageKey,optional:rule.kind==='optional'||rule.kind==='conditional',applicable,scopeKind:rule.kind,scopeReason:scopeReason(rule,applicable)};
}
/* Pilot reference metadata, synthetic only. No URLs, credentials, transport or external data. */
const PILOT_PLATFORMS={
 vision:{name:'Canopy',summary:'Documentación, expedientes y trámites corporativos.',handoff:'Consulta documentos, solicitudes y el trámite detallado en Canopy. UNARA presenta la coordinación.',example:'https://canopy.example.invalid/proyecto-de-muestra',syncExample:true},
 amplify:{name:'Buildertrend',summary:'Reportes semanales, avance físico y documentación de obra.',handoff:'Consulta el avance físico y los reportes semanales en Buildertrend. UNARA no sustituye esos reportes ni obtiene datos automáticamente.',example:'https://buildertrend.example.invalid/casa-de-muestra',syncExample:true},
 casa_norte:{name:'Aplicación especializada de Casa Norte · destino por confirmar',summary:'Administración y renta del inmueble si se conserva para renta, después de la entrega.',handoff:'El seguimiento operativo corresponde a Casa Norte; UNARA solo coordina el traspaso y muestra referencias de alcance. Plataforma y acceso para clientes por confirmar.',example:null,syncExample:false}
};
function initialSource(){return{reference:'none',method:'manual',date:'',revision:0};}
function sourceRecord(s){return s.source||initialSource();}
function validSource(s,x){
 const platform=PILOT_PLATFORMS[s.firm];
 if(!x||typeof x!=='object'||Array.isArray(x)||Object.keys(x).sort().join(',')!=='date,method,reference,revision')return false;
 if(!['none','example'].includes(x.reference)||!['manual','sync-demo'].includes(x.method)||!validRevision(x.revision)||(x.date!==''&&!date(x.date)))return false;
 if(x.reference==='example'&&!platform)return false;
 if(x.method==='sync-demo'&&(!platform?.syncExample||x.reference!=='example'||!date(x.date)))return false;
 return true;
}
function sourceMethod(x){return x.method==='sync-demo'?'Ejemplo sincronizado · sin conexión real':'Registro manual en UNARA · muestra';}
function sourceReference(s,x=sourceRecord(s)){const p=PILOT_PLATFORMS[s.firm];return !p?'Sin portal especializado registrado':x.reference==='example'?'Referencia de muestra vinculada · no operativa':'Referencia no configurada';}
function templateLabel(id){return TEMPLATE_SOURCE[id].level==='documented'?'Plantilla documentada':'Plantilla pendiente de validación';}
function sourceMetadata(container,s,p){
 const x=sourceRecord(s),platform=PILOT_PLATFORMS[s.firm],panel=E('div',null,'pilot-source-summary');panel.dataset.sourceService=s.id;
 const top=E('div',null,'pilot-source-top');top.append(E('strong','Fuente del seguimiento'),chip(x.method==='sync-demo'?'Simulación · no conectada':'Manual · muestra',x.method==='sync-demo'?'warn':'blue'));panel.append(top);
 const grid=E('div',null,'pilot-source-grid');hubMeta(grid,'Origen del registro',sourceMethod(x));hubMeta(grid,'Fecha del registro',x.date?hubDate(x.date):'Sin fecha registrada');hubMeta(grid,'Sistema de referencia',platform?platform.name:'Seguimiento UNARA');hubMeta(grid,'Referencia externa',sourceReference(s,x));panel.append(grid);
 if(platform&&x.reference==='example')panel.append(E('small','Referencia ficticia: '+p.id+' / '+s.id+' · no abre un expediente real.','muted'));
 panel.append(E('small','La fecha corresponde al registro de coordinación, no al avance físico ni al cálculo de alcance. No hay sincronización real ni credenciales.','muted'));container.append(panel);return panel;
}
function commitSource(projectId,serviceId,expected,patch){
 const p=P(),s=p&&active(p).find(x=>x.id===serviceId);
 if(!isSuper()||!p||p.id!==projectId||sid!==serviceId||!s||!canEdit(s))return{error:'Esta referencia no puede editarse desde el perfil o expediente actual.'};
 const old=sourceRecord(s);if(old.revision!==expected)return{error:'El registro cambió. Vuelve a abrir la ficha antes de guardar.'};
 const next={reference:patch.reference,method:patch.method,date:patch.date,revision:old.revision+1};
 if(!validSource(s,next))return{error:'Revisa la plataforma, modalidad y fecha. Un ejemplo sincronizado requiere una referencia de muestra vinculada y una fecha válida.'};
 const changes=[];
 for(const [field,b,a] of [['Referencia externa',sourceReference(s,old),sourceReference(s,next)],['Origen de registro',sourceMethod(old),sourceMethod(next)],['Fecha del registro',old.date||'Sin fecha',next.date||'Sin fecha']])if(a!==b)changes.push({field,before:b,after:a});
 if(!changes.length)return{unchanged:true};
 const n={...s,source:next},ev=newEvent('reference',p,'Referencia de seguimiento de '+s.title,{service:s.id,firm:s.firm,revision:next.revision,changes});
 const nextProjects=projects.map(q=>q.id===p.id?{...q,services:q.services.map(y=>y.id===s.id?n:y)}:q),saved=writeDemo(nextProjects,[ev,...history]);if(saved.error)return saved;
 Object.assign(s,n);history.unshift(ev);return{ok:true};
}
function pilotSourcePanel(p,s){
 const panel=E('section',null,'pilot-source-admin');panel.append(E('h3','Referencia y procedencia · '+s.title));sourceMetadata(panel,s,p);
 if(!isSuper()||!canEdit(s)){panel.append(E('p','La configuración de referencia corresponde a Superadmin. Los cambios de avance del equipo se registran como manuales.','muted'));return panel;}
 const record=sourceRecord(s),platform=PILOT_PLATFORMS[s.firm],form=E('form',null,'pilot-source-form'),ref=select(platform?[['none','No configurada'],['example','Vincular referencia ficticia del expediente']]:[['none','No hay plataforma registrada']],record.reference),method=select(platform?.syncExample?[['manual','Registro manual UNARA'],['sync-demo','Ejemplo sincronizado · sin conexión real']]:[['manual','Registro manual UNARA']],record.method),when=input('date',record.date),ack=check('Confirmo que la referencia de muestra corresponde a este expediente',false),error=E('p','','inline-feedback'),save=submit('Guardado no disponible');
 error.setAttribute('role','alert');error.hidden=true;ref.disabled=!platform;method.disabled=!platform?.syncExample;const grid=E('div',null,'pilot-source-grid');grid.append(field('Referencia del expediente (muestra)',ref),field('Tipo de actualización',method),field('Fecha del registro de muestra',when));form.append(grid,ack.node,E('p','Este formulario vincula una referencia de demostración controlada, nunca una URL real. No ingresa al sistema externo, no importa datos ni modifica avance. Si guardas los avances manualmente, el origen se actualizará a manual.','muted'),error,save);
 function refresh(){const linking=ref.value==='example'&&record.reference!=='example';ack.node.hidden=!linking;ack.input.required=linking;when.required=method.value==='sync-demo';const synced=method.querySelector('option[value="sync-demo"]');if(synced)synced.disabled=ref.value==='none';if(ref.value==='none'&&method.value==='sync-demo')method.value='manual';when.required=method.value==='sync-demo';save.disabled=linking&&!ack.input.checked;error.hidden=true;}
 for(const control of [ref,method,when,ack.input]){control.addEventListener('change',refresh);control.addEventListener('input',refresh);}
 form.addEventListener('submit',event=>{event.preventDefault();if(ref.value==='example'&&record.reference!=='example'&&!ack.input.checked){inlineFormError(error,'Confirma la referencia de este expediente de muestra.');return;}if(!form.reportValidity()){inlineFormError(error,'Revisa la fecha y los campos requeridos.');return;}const result=commitSource(p.id,s.id,record.revision,{reference:ref.value,method:method.value,date:when.value});if(result.error){inlineFormError(error,result.error);return;}if(result.unchanged){inlineFormError(error,'');tell('Sin cambios en la referencia de seguimiento.','info');}else tell('Referencia y procedencia de muestra guardadas. No se cambió el avance ni se estableció una conexión externa.','success');focusTitle($('content'),'.pilot-source-admin h3');});
 panel.append(form);refresh();return panel;
}

function build(c,old=[],archive=[]){
 const route=c.route==='shovel'?'n1':c.route==='development'?'n2':null;
 return T.filter(t=>t[1]!=='northreach'||t[0]===route).map(t=>{
  const en=c.enabled.includes(t[1]),o=old.find(s=>s.id===t[0])||archive.find(s=>s.id===t[0]);
  const service=o?{...cp(o),enabled:en}:{id:t[0],firm:t[1],title:t[2],start:t[3],end:t[4],enabled:en,next:t[0]==='m1'?'Completar el brief y enviar referencias.':t[0]==='c1'?'Confirmar alcance y traspaso para renta después de entrega.':'Definir primera actividad.',status:'waiting',owner:firm(t[1])[1],target:'',confirmed:'',action:false,blocked:false};
  service.source=o?.source?cp(o.source):initialSource();
  service.stages=CATALOG[t[0]].map((x,i)=>scopedStage(c,t[0],x,i,o));
  return service;
 });
}
function proposedScope(p,c){
 const arch=p?(p.archive||[]).filter(s=>!p.services.some(q=>q.id===s.id)):[];
 if(p)for(const s of p.services)if(s.firm==='northreach'&&s.id!==(c.route==='shovel'?'n1':c.route==='development'?'n2':null))arch.push(cp(s));
 const services=build(c,p?.services||[],arch),archive=arch.filter(s=>!services.some(q=>q.id===s.id));
 return{services,archive};
}
function scopeSignature(services){return JSON.stringify(services.filter(s=>s.enabled).map(s=>[s.id,s.stages.map(x=>[x.stageKey,x.applicable])]));}
function scopeImpact(p,c,plan=proposedScope(p,c)){
 const current=p?.services||[],oldActive=current.filter(s=>s.enabled),nextActive=plan.services.filter(s=>s.enabled);
 const changed=scopeSignature(current)!==scopeSignature(plan.services);
 const started=!!p&&(publishedProject(p)||[...current,...(p.archive||[])].some(s=>s.stages.some(x=>x.state==='active'||x.state==='closed')));
 const ids=[...new Set([...oldActive.map(s=>s.id),...nextActive.map(s=>s.id)])];
 const rows=ids.map(id=>{
  const before=oldActive.find(s=>s.id===id),after=nextActive.find(s=>s.id===id);
  const historical=current.find(s=>s.id===id)||(p?.archive||[]).find(s=>s.id===id);
  const changes=before&&after?after.stages.filter((x,i)=>x.applicable!==before.stages[i]?.applicable).map(x=>x.title+' · '+(x.applicable?'se incluye':'se excluye')):[];
  return{id,before,after,historical,changes,kind:before&&after?changes.length?'alcance':'keep':after?(historical&&(historical.revision||sourceRecord(historical).revision||historical.stages.some(x=>x.state==='active'||x.state==='closed')||(p?.archive||[]).some(s=>s.id===id))?'reactivate':'add'):'remove'};
 });
 return{changed,started,requiresConfirm:changed&&started,rows,plan};
}
function scopeServiceDescription(s){if(!s)return 'Fuera del alcance activo';return progressText(s)+' · '+progressCount(s)+' · '+s.stages.filter(x=>!x.applicable).length+' excluidas';}
const routeLabel=r=>({shovel:'Shovel Ready',development:'Desarrollo desde cero',none:'Sin Northreach'})[r]||'Sin modalidad';
function scopeHistory(p,c,impact,reason){
 const changes=[];for(const [key,label] of [['name','Nombre del proyecto'],['client','Cliente ficticio'],['start','Fecha inicial'],['deliveryDate','Fecha de entrega registrada'],['status','Estado del proyecto']])if(p[key]!==c[key])changes.push({field:label,before:key==='status'?PJ[p[key]]:p[key]||'Sin fecha',after:key==='status'?PJ[c[key]]:c[key]||'Sin fecha'});
 const beforeServices=active(p).map(s=>s.title).join(', '),afterServices=impact.plan.services.filter(s=>s.enabled).map(s=>s.title).join(', ');if(beforeServices!==afterServices)changes.push({field:'Servicios habilitados',before:beforeServices,after:afterServices});
 if(p.route!==c.route)changes.push({field:'Modalidad Northreach',before:routeLabel(p.route),after:routeLabel(c.route)});
 if(p.finance!==c.finance)changes.push({field:'Financiamiento de muestra',before:p.finance?'Incluido':'No incluido',after:c.finance?'Incluido':'No incluido'});
 for(const [key,label] of [['mercury','Apertura Mercury'],['umberInstallation','Instalación UMBER']])if(scopeOptions(p)[key]!==scopeOptions(c)[key])changes.push({field:'Opción · '+label,before:scopeOptions(p)[key]?'Incluida':'No incluida',after:scopeOptions(c)[key]?'Incluida':'No incluida'});
 for(const r of impact.rows.filter(x=>x.kind!=='keep')){
  const title=r.after?.title||r.before?.title||r.id;
  changes.push({field:'Alcance · '+title,before:scopeServiceDescription(r.before),after:clean(scopeServiceDescription(r.after)+(r.changes.length?' · '+r.changes.join('; '):r.kind==='remove'?' · historial conservado':r.kind==='reactivate'?' · historial recuperado':''),600)});
 }
 if(reason&&impact.requiresConfirm)changes.push({field:'Motivo de cambio de alcance',before:'Alcance anterior conservado',after:reason});
 return changes;
}

const base={name:'Proyecto Horizonte',client:'Inversionista de muestra A',start:'2026-10-01',deliveryDate:'',route:'shovel',finance:true,status:'active',scopeRevision:1,scopeOptions:{mercury:true,umberInstallation:true},enabled:['vision','legal','northreach','amplify','umber','marketing']},other={name:'Proyecto Aurora',client:'Inversionista de muestra B',start:'2026-11-01',deliveryDate:'',route:'development',finance:false,status:'draft',scopeRevision:1,scopeOptions:{mercury:true,umberInstallation:true},enabled:['vision','northreach','amplify','umber']};
const projects=[{...base,id:'horizonte',services:build(base),archive:[]},{...other,id:'aurora',services:build(other),archive:[]}];
const fixture={v1:['Revisar company documents para firma.','2026-12-01',true],l1:['Confirmar puntos de coordinación de ejemplo.','2027-07-16',false],n1:['Confirmar documentación de cierre del terreno.','2027-09-01',false],a1:['Coordinar presupuesto y reunión de arranque.','2027-10-01',false],u1:['Revisar propuesta Look & Feel.','2027-09-01',false],m1:['Entrega de Digital Launch completada.','2026-10-07',false]};
for(const s of active(projects[0])){const v=fixture[s.id];Object.assign(s,{next:v[0],target:v[1],action:v[2],status:s.id==='m1'?'closed':'active',stages:s.stages.map((x,i)=>({...x,state:s.id==='m1'?'closed':CATALOG[s.id][i].state}))});}
projects[0].services.find(s=>s.id==='v1').source={reference:'example',method:'manual',date:'2026-11-25',revision:0};
projects[0].services.find(s=>s.id==='a1').source={reference:'example',method:'sync-demo',date:'2026-11-24',revision:0};
/* Executive scenarios, synthetic only; no changes to earlier review packages. */
for(const s of active(projects[0])){
 if(s.id==='l1')s.target='2026-11-24';
 if(s.id==='n1'){s.target='';s.owner='';}
 if(s.id==='a1'){s.target='2026-11-23';s.blocked=true;}
 if(s.id==='u1')s.target='2026-11-25';
}
const clients=[base.client,other.client];
const users=[{name:'Propietario de muestra',role:'super',project:'*'},{name:'Operaciones de muestra',role:'operations',project:'horizonte'},{name:'Especialista LegalKey de muestra',role:'legal',project:'horizonte'},{name:'Cliente de muestra',role:'client',project:'horizonte'}],invites=[{id:'i1',mail:'invitado@example.invalid',role:'client',project:'horizonte',state:'Pendiente'}],history=[{project:'horizonte',time:'Registro inicial',message:'Expediente de muestra configurado con Shovel Ready y seis servicios.'}];
let pid='horizonte',sid='v1',mode='client',role='super',tab='projects',template='v1',seq=3,inq=2,msg='',showNew=false,showConfig=false;
let preferredProject=pid,noticeKind='info',portalReturn=null;const rememberedServices=new Map([[pid,sid]]),scopeDrafts=new Map();
const isSuper=()=>mode==='admin'&&role==='super',scope=id=>isSuper()||mode==='client'||users.some(u=>u.role===role&&u.project===id),list=()=>projects.filter(p=>scope(p.id)),P=()=>list().find(p=>p.id===pid)||list()[0];
const canEdit=s=>mode==='admin'&&P().status!=='archived'&&s.enabled&&(isSuper()||(scope(P().id)&&((role==='operations'&&s.firm!=='legal')||(role==='legal'&&s.firm==='legal'))));
function log(message,id=pid){history.unshift({project:id,time:new Date().toISOString(),actor:RO[role],message:clean(message,350)});}
function tell(text,kind='info'){msg=text;noticeKind=kind;if(!test)render();}
function clearNotice(){msg='';noticeKind='info';}
function clearOrigin(){inv36Navigation=null;portalReturn=null;const a=$('inv36-announcer');if(a)a.textContent='';}
function rememberSelection(){if(pid&&sid)rememberedServices.set(pid,sid);}
function restoreSelection(p){const preferred=rememberedServices.get(p?.id);sid=p&&active(p).some(s=>s.id===preferred)?preferred:p?active(p)[0]?.id||'':'';}
function focusTitle(root,selector='h2'){const h=root?.querySelector(selector);if(h){h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'start',inline:'nearest'});}}
function openAdminTab(next){if(next===tab)return;clearNotice();execReturn=null;showNew=false;showConfig=false;tab=next;render();}
function toggleProjectForm(kind){if(kind==='new'){showNew=!showNew;showConfig=false;}else{showConfig=!showConfig;showNew=false;}render();if(showNew||showConfig)focusTitle($('content'),'.scope-config-form .scope-form-title');else $('content')?.querySelector('[data-project-form="'+kind+'"]')?.focus();}
function inlineFormError(n,text){n.hidden=!text;n.textContent=text||'';if(text){n.tabIndex=-1;n.focus({preventScroll:true});}}
/* Local fictitious project intake and lifecycle. No real client data, accounts or backend. */
function normalizeProjectLabel(value){return typeof value==='string'?value.normalize('NFC').trim().replace(/\s+/g,' '):'';}
function labelIdentity(value){return normalizeProjectLabel(value).toLocaleLowerCase('es-MX');}
function projectIdentity(client,name){return JSON.stringify([labelIdentity(client),labelIdentity(name)]);}
function publishedProject(p){return !!p&&['active','delivered'].includes(p.status);}
function needsProjectStart(status){return ['active','delivered'].includes(status);}
function projectData(x){
 const fail=(field,error)=>({field,error});if(!x||typeof x!=='object')return fail('name','Completa los datos del expediente de muestra.');
 const name=normalizeProjectLabel(x.name),client=normalizeProjectLabel(x.client),deliveryDate=x.deliveryDate===undefined?'':x.deliveryDate;
 if(!name||name.length>120)return fail('name','Escribe un nombre de proyecto de muestra (1–120 caracteres).');
 if(!client||client.length>120)return fail('client','Escribe un nombre visible de cliente ficticio (1–120 caracteres). No uses datos sensibles.');
 if(!Object.hasOwn(PJ,x.status))return fail('status','Selecciona un estado de expediente válido.');
 if((x.start!==''&&!date(x.start))||(needsProjectStart(x.status)&&!date(x.start)))return fail('start','Indica una fecha inicial válida antes de activar o registrar una entrega. El prospecto puede quedar sin fecha.');
 if((deliveryDate!==''&&!date(deliveryDate))||(x.status==='delivered'&&!date(deliveryDate)))return fail('deliveryDate','Indica una fecha válida de entrega registrada (no una fecha objetivo).');
 if(deliveryDate&&(!date(x.start)||deliveryDate<x.start))return fail('deliveryDate','La entrega registrada no puede ser anterior a la fecha inicial del proyecto.');
 if(deliveryDate&&['draft','active'].includes(x.status))return fail('deliveryDate','La entrega registrada corresponde al estado Entregado o a su historial archivado.');
 if(!['shovel','development','none'].includes(x.route)||!Array.isArray(x.enabled)||new Set(x.enabled).size!==x.enabled.length||x.enabled.some(id=>!F.some(f=>f[0]===id)))return fail('route','Revisa empresas y modalidad de Northreach; el catálogo admite solo los servicios definidos.');
 if((x.route==='none')===x.enabled.includes('northreach'))return fail('route','Northreach requiere seleccionar una sola modalidad; sin Northreach no hay ruta contratada.');
 if(typeof x.finance!=='boolean'||!x.scopeOptions||typeof x.scopeOptions.mercury!=='boolean'||typeof x.scopeOptions.umberInstallation!=='boolean')return fail('finance','Revisa las opciones de alcance contratado.');
 return{value:{name,client,start:x.start,deliveryDate,route:x.route,status:x.status,finance:x.finance,enabled:[...x.enabled],scopeOptions:scopeOptions(x)}};
}
function validate(x){return projectData(x).value||null;}
function projectCheck(x,existing){
 const data=projectData(x);if(data.error)return data;const c=data.value;
 const duplicate=projects.find(p=>p.id!==existing?.id&&projectIdentity(p.client,p.name)===projectIdentity(c.client,c.name));
 if(duplicate)return{field:'name',error:'Ya existe un expediente con este cliente y nombre (incluye archivados). Configura el registro existente; no se creó otro.'};
 if(!existing&&c.status==='archived')return{field:'status',error:'Crea primero el expediente de muestra antes de archivarlo.'};
 if(c.status==='delivered'&&(!existing||!['active','delivered'].includes(existing.status)&&!(existing.status==='archived'&&existing.deliveryDate)))return{field:'status',error:'Activa primero el expediente y registra la entrega desde su configuración. La entrega no es un alta nueva.'};
 if(deliveryNeedsConfirmation(existing,c)&&x.deliveryConfirmed!==true)return{field:'deliveryConfirmed',error:'Confirma explícitamente la entrega registrada de muestra. El avance de los servicios no se cerrará automáticamente.'};
 // Associate an existing fictional client using its canonical display label, not case/spacing variants.
 c.client=clients.find(n=>labelIdentity(n)===labelIdentity(c.client))||c.client;
 return{value:c};
}
function deliveryNeedsConfirmation(existing,c){return c.status==='delivered'&&(!existing||existing.status!=='delivered'||existing.deliveryDate!==c.deliveryDate);}
function projectDisplayDate(value){return value?hubDate(value):'Sin fecha registrada';}
function projectLifecycle(container,p,{proposed=false,services=active(p)}={}){
 const section=E('section',null,'project-lifecycle');section.dataset.lifecycleStatus=p.status;
 const list=E('ol',null,'project-lifecycle-steps');list.setAttribute('aria-label','Recorrido del expediente');
 const rank={draft:0,active:1,delivered:2}[p.status]??-1;
 for(const [i,label] of ['Prospecto','Activo · seguimiento','Entregado'].entries()){const item=E('li',label,rank===i?'life-current':rank>i?'life-completed':'life-future');if(rank===i)item.setAttribute('aria-current','step');list.append(item);}section.append(list);
 const message=p.status==='draft'?'Prospecto guardado: solo preparación administrativa. Los servicios preseleccionados aún no se muestran al inversionista.':p.status==='archived'?'Archivado: fuera de seguimiento y sin vista de cliente. Se conserva el historial.':p.status==='delivered'?'Entrega registrada'+(p.deliveryDate?' · '+projectDisplayDate(p.deliveryDate):' · fecha pendiente de registrar')+'. Los servicios contratados conservan su estado y pueden continuar después de la entrega.':services.length?'Activo: seguimiento disponible en la vista ficticia del inversionista.':'Activo, sin servicios contratados: el expediente está en preparación; no hay Gantt ni porcentaje que calcular.';
 section.append(E('strong',message,'life-main'),E('small','Inicio: '+projectDisplayDate(p.start)+(proposed?' · vista previa sin cambios guardados.':' · registro de muestra.'),'muted'));container.append(section);return section;
}
function clientProjectLabel(p,index){return publishedProject(p)?p.name+' · '+PJ[p.status]:'Expediente de muestra '+(index+1)+' · No disponible';}
function projectSelectorLabel(p,index){if(mode==='client')return clientProjectLabel(p,index);const ambiguous=projects.some(q=>q.id!==p.id&&labelIdentity(q.name)===labelIdentity(p.name));return p.name+(ambiguous?' · '+p.client:'')+' · '+PJ[p.status];}

/* Local synthetic persistence only. Not a source of authorization or live data. */
const DEMO_SCHEMA=1,operationDrafts=new Map();
const seedHistory=cp(history),storedKinds=new Set(['service','project','reference']);
let demoStoreState='fresh',demoStoreMessage='No hay guardado operativo disponible.';
const fieldsFor=r=>r==='super'?['next','owner','target','status','confirmed','action','blocked','start','end','stages']:['next','stages'];
const editedFieldLabels={next:'Próximo paso',owner:'Responsable visible',target:'Fecha objetivo',status:'Estado',confirmed:'Fecha confirmada',action:'Acción del inversionista',blocked:'Bloqueo',start:'Mes inicial',end:'Mes de cierre',stages:'Etapas aplicables'};
const validRevision=x=>Number.isInteger(x)&&x>=0&&x<=1000000;
const timeValid=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(x)&&Number.isFinite(Date.parse(x));
const serviceKey=(project,service,who=role)=>JSON.stringify([project,service,who]);
function displayStore(){
 const n=$('demo-storage-notice');if(!n)return;
 n.textContent=demoStoreMessage;n.dataset.storageState=demoStoreState;n.hidden=demoStoreState==='fresh';
}
function ownedFirm(r,f){return r==='super'||r==='operations'&&f!=='legal'||r==='legal'&&f==='legal';}
function strictText(value,max){return typeof value==='string'&&value.length<=max&&value.trim().length<=max;}
function validatePatch(s,patch,r,{restore=false}={}){
 if(!s||!patch||typeof patch!=='object'||Array.isArray(patch)||!['super','operations','legal'].includes(r))return{error:'Actualización no autorizada en esta demostración.'};
 const allowed=fieldsFor(r);if(Object.keys(patch).some(k=>!allowed.includes(k)))return{error:'Hay campos que este perfil no puede cambiar.'};
 const n={...s};
 for(const [k,v] of Object.entries(patch)){
  if(k==='status'){if(!Object.hasOwn(SS,v))return{error:'Selecciona un estado válido.'};}
  else if(k==='target'||k==='confirmed'){if(v!==''&&!date(v))return{error:'Introduce una fecha válida o déjala sin definir.',field:k};}
  else if(k==='start'||k==='end'){if(v!==null&&(!Number.isFinite(v)||v<0||v>36))return{error:'El mes debe estar entre 0 y 36.',field:k};}
  else if(k==='owner'||k==='next'){const limit=k==='next'?500:120;if(!strictText(v,limit))return{error:'Revisa el texto: límite de '+limit+' caracteres.',field:k};n[k]=v.trim();continue;}
  else if(k==='action'||k==='blocked'){if(typeof v!=='boolean')return{error:'Estado de seguimiento inválido.'};}
  else if(k==='stages'){
   if(!Array.isArray(v)||!Array.isArray(s.stages)||v.length!==s.stages.length||v.some((x,i)=>!x||x.title!==s.stages[i].title||!['waiting','active','closed'].includes(x.state)||x.stageKey&&x.stageKey!==s.stages[i].stageKey||!restore&&(s.stages[i].applicable===false&&x.state!==s.stages[i].state||Object.hasOwn(x,'applicable')&&x.applicable!==s.stages[i].applicable)))return{error:'Revisa los estados y la aplicación de las tareas.',field:'stages'};
   n.stages=s.stages.map((x,i)=>({...x,state:v[i].state}));continue;
  }
  n[k]=v;
 }
 if((n.start===null)!==(n.end===null))return{error:'Define ambos meses o deja ambos sin plazo.',field:n.start===null?'start':'end'};
 if(n.start!==null&&n.end<n.start)return{error:'El mes de cierre no puede ser anterior al mes inicial.',field:'end'};
 if(!restore&&n.action&&!n.next)return{error:'Define el próximo paso cuando el cliente debe actuar.',field:'next'};
 // An imported inconsistency is displayed as "Revisar cierre"; do not introduce a new one.
 if(!restore&&n.status==='closed'&&taskStats(n.stages).percent!==100&&(s.status!=='closed'||taskStats(s.stages).percent===100))return{error:taskStats(n.stages).total?'No se puede cerrar el servicio mientras queden hitos aplicables abiertos.':'No se puede cerrar el servicio: todavía no hay hitos aplicables registrados.',field:'status'};
 return{next:n};
}
function decodeService(raw,template,archived=false){
 if(!raw||raw.id!==template.id||raw.firm!==template.firm||raw.title!==template.title||raw.enabled!==template.enabled)return null;
 const patch={};for(const k of fieldsFor('super')){if(!Object.hasOwn(raw,k))return null;patch[k]=raw[k];}
 const result=validatePatch(template,patch,'super',{restore:true});if(result.error)return null;
 for(let i=0;i<template.stages.length;i++){
  const incoming=raw.stages[i],expected=template.stages[i],rule=stageRule(template.id,i);
  if(incoming.stageKey!==expected.stageKey||typeof incoming.applicable!=='boolean'||rule.kind==='required'&&!incoming.applicable||rule.kind==='pending-source'&&incoming.applicable||!archived&&incoming.applicable!==expected.applicable)return null;
  result.next.stages[i].applicable=incoming.applicable;result.next.stages[i].scopeReason=scopeReason(rule,incoming.applicable);
 }
 if(!validSource(template,raw.source))return null;
 if(raw.revision!==undefined&&!validRevision(raw.revision))return null;
 if(raw.updatedAt!==undefined&&raw.updatedAt!==''&&!timeValid(raw.updatedAt))return null;
 return {...result.next,source:cp(raw.source),revision:raw.revision||0,updatedAt:raw.updatedAt||''};
}
function decodeSnapshot(raw){
 if(!raw||raw.schema!==DEMO_SCHEMA||!Array.isArray(raw.projects)||raw.projects.length<2||raw.projects.length>60||!Array.isArray(raw.events)||raw.events.length>200)return null;
 const checked=[],ids=new Set(),identities=new Set();
 for(const p of raw.projects){
  if(!p||typeof p.id!=='string'||(!['horizonte','aurora'].includes(p.id)&&!/^demo-[1-9]\d{0,5}$/.test(p.id))||ids.has(p.id))return null;
  const c=validate(p),identity=c&&projectIdentity(c.client,c.name);
  if(!c||identities.has(identity)||p.start!==c.start||p.deliveryDate!==c.deliveryDate||!validRevision(p.scopeRevision)||p.scopeRevision<1||!p.scopeOptions||typeof p.scopeOptions.mercury!=='boolean'||typeof p.scopeOptions.umberInstallation!=='boolean'||p.name!==c.name||p.client!==c.client||p.enabled.length!==c.enabled.length||!p.enabled.every(x=>c.enabled.includes(x))||typeof p.finance!=='boolean'||!Array.isArray(p.services)||!Array.isArray(p.archive))return null;
  const templates=build(c);if(templates.length!==p.services.length)return null;
  const services=[];
  for(const t of templates){const rawService=p.services.find(s=>s&&s.id===t.id),item=decodeService(rawService,t);if(!item)return null;services.push(item);}
  if(p.archive.length>2||new Set(p.archive.map(x=>x?.id)).size!==p.archive.length)return null;
  const archive=[];
  for(const item of p.archive){
   if(!item||!['n1','n2'].includes(item.id)||services.some(s=>s.id===item.id)||typeof item.enabled!=='boolean')return null;
   const arConfig={...c,route:item.id==='n1'?'shovel':'development',enabled:item.enabled?[...new Set([...c.enabled,'northreach'])]:c.enabled.filter(x=>x!=='northreach')};
   const decoded=decodeService(item,build(arConfig).find(s=>s.id===item.id),true);if(!decoded)return null;archive.push(decoded);
  }
  ids.add(p.id);identities.add(identity);checked.push({...c,id:p.id,scopeRevision:p.scopeRevision,services,archive});
 }
 if(!ids.has('horizonte')||!ids.has('aurora'))return null;
 const events=[];
 for(const x of raw.events){
  if(!x||!storedKinds.has(x.kind)||!ids.has(x.project)||!timeValid(x.time)||!Object.values(RO).includes(x.actor)||!strictText(x.message,350)||!Array.isArray(x.changes)||x.changes.length>40)return null;
  if(['service','reference'].includes(x.kind)){const template=T.find(t=>t[0]===x.service);if(!template||x.firm!==template[1]||!validRevision(x.revision)||x.revision<1)return null;}
  const changes=[];for(const y of x.changes){if(!y||!strictText(y.field,130)||!strictText(y.before,600)||!strictText(y.after,600))return null;changes.push({field:y.field,before:y.before,after:y.after});}
  events.push({kind:x.kind,project:x.project,service:['service','reference'].includes(x.kind)?x.service:'',firm:['service','reference'].includes(x.kind)?x.firm:'',actor:x.actor,time:x.time,message:x.message,revision:['service','reference'].includes(x.kind)?x.revision:0,changes});
 }
 return{projects:checked,events};
}
function writeDemo(){return{error:'Guardado real no habilitado. La presentación autenticada es de solo consulta.'};}
function loadDemo(){}
function newEvent(kind,p,message,extra={}){return{kind,project:p.id,time:new Date().toISOString(),actor:RO[role],message:clean(message,350),changes:[],...extra};}
function fieldValue(s,k){
 if(k==='stages')return progressText(s)+' · '+progressCount(s);
 if(k==='status')return SS[s.status]||'Sin estado';
 if(k==='action'||k==='blocked')return s[k]?'Sí':'No';
 if(k==='target'||k==='confirmed')return s[k]||'Sin fecha';
 if(k==='owner')return s[k]||'Sin responsable';
 if(k==='next')return s[k]||'Sin próximo paso';
 return String(s[k]??'Sin definir');
}
function changedFields(before,after){
 const changes=[];
 for(const k of fieldsFor('super')){
  if(JSON.stringify(before[k])===JSON.stringify(after[k]))continue;
  if(k==='stages'){
   changes.push({field:'Avance automático',before:fieldValue(before,k),after:fieldValue(after,k)});
   after.stages.forEach((x,i)=>{if(x.state!==before.stages[i]?.state)changes.push({field:'Etapa · '+clean(x.title,112),before:ST[before.stages[i].state],after:ST[x.state]});});
  }else changes.push({field:editedFieldLabels[k],before:clean(fieldValue(before,k),600),after:clean(fieldValue(after,k),600)});
 }
 return changes;
}
function commitService(id,patch,context){
 const p=P(),s=p&&active(p).find(x=>x.id===id);
 if(!p||!s||!canEdit(s)||!context||p.id!==context.project||role!==context.role||sid!==id||!ownedFirm(role,s.firm))return{error:'El servicio o perfil cambió. No se guardaron los cambios. Regresa al proceso para revisar tu borrador.'};
 if((s.revision||0)!==context.revision)return{error:'Hay una revisión más reciente de este proceso. No se guardó tu edición; revisa antes de reintentar.'};
 const checked=validatePatch(s,patch,role);if(checked.error)return checked;
 const n=checked.next,changes=changedFields(s,n);if(!changes.length)return{unchanged:true};
 n.revision=(s.revision||0)+1;n.updatedAt=new Date().toISOString();const oldSource=sourceRecord(s);n.source={...oldSource,method:'manual',date:n.updatedAt.slice(0,10),revision:oldSource.revision+1};
 if(oldSource.method!==n.source.method||oldSource.date!==n.source.date)changes.push({field:'Procedencia del avance',before:sourceMethod(oldSource)+' · '+(oldSource.date||'Sin fecha'),after:sourceMethod(n.source)+' · '+n.source.date});
 const ev=newEvent('service',p,'Actualización de '+s.title,{service:s.id,firm:s.firm,revision:n.revision,changes});
 const nextProjects=projects.map(q=>q.id===p.id?{...q,services:q.services.map(x=>x.id===s.id?n:x)}:q);
 const stored=writeDemo(nextProjects,[ev,...history]);if(stored.error)return stored;
 Object.assign(s,n);history.unshift(ev);return{ok:true,revision:n.revision,updatedAt:n.updatedAt};
}
// Compatibility for the local model harness. UI uses commitService with a captured revision.
function update(id,patch){const p=P(),s=p&&active(p).find(x=>x.id===id);if(!s)return false;return !commitService(id,patch,{project:p.id,role,revision:s.revision||0}).error;}
function create(x){
 if(!isSuper())return false;const {value:c}=projectCheck(x,null);if(!c)return false;
 const p={...c,id:'demo-'+seq,scopeRevision:1,services:build(c),archive:[]};
 const ev=newEvent('project',p,'Proyecto ficticio creado: '+p.name,{changes:[{field:'Nombre del proyecto',before:'Sin registro',after:p.name},{field:'Cliente ficticio',before:'Sin registro',after:p.client},{field:'Estado del proyecto',before:'Sin registro',after:PJ[p.status]},{field:'Fecha inicial',before:'Sin registro',after:p.start||'Sin fecha'},...active(p).map(s=>({field:'Alcance inicial · '+s.title,before:'Sin servicio activo',after:scopeServiceDescription(s)}))]});
 const saved=writeDemo([...projects,p],[ev,...history]);
 if(saved.error)return false;
 seq++;projects.push(p);if(!clients.includes(p.client))clients.push(p.client);history.unshift(ev);pid=p.id;preferredProject=pid;restoreSelection(p);rememberSelection();showNew=false;scopeDrafts.delete('new');tell((p.status==='draft'?'Prospecto ficticio guardado; aún no se muestra al inversionista.':'Proyecto ficticio guardado en esta pestaña.')+' No se crearon cuentas ni se enviaron invitaciones.','success');return true;
}
function configure(x){
 if(!isSuper())return false;const p=P();if(!p)return false;const {value:c}=projectCheck(x,p);if(!c)return false;
 if(x.scopeExpectedRevision!==p.scopeRevision)return false;
 const impact=scopeImpact(p,c),reason=typeof x.scopeChangeReason==='string'?x.scopeChangeReason.trim():'';
 if(impact.requiresConfirm&&(x.scopeConfirmed!==true||!strictText(reason,250)||!reason))return false;
 const next={...p,...c,scopeRevision:(p.scopeRevision||1)+(impact.changed?1:0),services:impact.plan.services,archive:impact.plan.archive};
 const changes=scopeHistory(p,c,impact,reason);
 if(impact.changed)changes.push({field:'Revisión de alcance',before:String(p.scopeRevision||1),after:String(next.scopeRevision)});
 if(!changes.length){scopeDrafts.delete(p.id);showConfig=false;tell('Sin cambios: se conserva la configuración vigente. No se creó un registro nuevo.','info');return true;}
 const event=newEvent('project',p,c.status==='delivered'&&p.status!=='delivered'?'Entrega de muestra registrada · servicios conservados':'Configuración ficticia guardada',{changes});
 const saved=writeDemo(projects.map(q=>q.id===p.id?next:q),[event,...history]);if(saved.error)return false;
 Object.assign(p,next);if(!clients.includes(p.client))clients.push(p.client);history.unshift(event);showConfig=false;
 scopeDrafts.delete(p.id);let discarded=0;if(impact.changed||c.status==='archived')for(const k of operationDrafts.keys())if(JSON.parse(k)[0]===p.id){operationDrafts.delete(k);discarded++;}
 tell((c.status==='delivered'?'Entrega registrada de muestra. Los estados de servicios no cambiaron automáticamente.':'Configuración ficticia guardada en esta pestaña.')+(discarded?' Se descartaron '+discarded+' borrador(es) de avances incompatibles al cambiar el alcance o archivar el proyecto.':''),'success');return true;
}

function invite(){return false;}
function cancel(){return false;}
function pickProject(id){if(!list().some(p=>p.id===id))return false;if(id===pid){preferredProject=id;return true;}rememberSelection();clearOrigin();clearNotice();execReturn=null;pid=id;preferredProject=id;restoreSelection(P());showNew=false;showConfig=false;if(!test){render();const n=$('inv36-announcer');if(n)n.textContent=mode==='client'&&!publishedProject(P())?'Expediente de muestra no disponible seleccionado.':P().name+' seleccionado.';}return true;}
function pick(id){const p=P();if(!p||!active(p).some(s=>s.id===id))return false;sid=id;rememberSelection();clearNotice();if(!test)render();return true;}
function switchMode(m,r=role){if(mode===m&&role===r)return;rememberSelection();clearOrigin();clearNotice();mode=m;role=r;const choices=list();pid=choices.some(p=>p.id===preferredProject)?preferredProject:choices.some(p=>p.id===pid)?pid:choices[0]?.id||'';restoreSelection(P());execReturn=null;showNew=false;showConfig=false;tab=role==='super'?'exceptions':'editor';if(!test)render();}
const button=(txt,cls,fn)=>{const b=E('button',txt,cls);b.type='button';if(fn)b.addEventListener('click',fn);return b;},chip=(x,k='')=>E('span',x,'chip '+k),title=(t,sub,cls='card')=>{const n=E('section',null,cls),h=E('div',null,'card-head');h.append(E('h2',t));if(sub)h.append(E('p',sub,'muted'));n.append(h);return n;};
function accent(n,s){n.style.setProperty('--company',firm(s.firm)[2]);}
function logo(s){const f=firm(s.firm),n=E('span',null,'logo'+(s.firm==='legal'?' logo-legal':''));if(f[3]){const i=E('img');i.src='/logos/'+f[3];i.alt='';n.append(i)}else n.append(E('strong',s.firm==='casa_norte'?'CN':'SM'));return n;}
function status(s){return s.blocked||s.status==='blocked'?chip('Requiere seguimiento','warn'):s.action?chip('Tu acción','warn'):chip(SS[s.status],s.status==='active'?'blue':s.status==='closed'?'ok':'');}
function sb(s,cls){const b=button(null,cls,()=>pick(s.id));b.dataset.service=s.id;b.setAttribute('aria-pressed',String(sid===s.id));accent(b,s);return b;}
function stage(x,i){const n=E('div',null,'stage-line'),nm=E('span',x.title);if(x.optional)nm.append(E('small','Opcional'));n.append(E('span',String(i+1).padStart(2,'0'),'stage-num'),nm,chip(ST[x.state],x.state==='closed'?'ok':x.state==='active'?'blue':''));return n;}
/* Synthetic client reference center. No binary files, external link, or transmission. */
const HUB_CUTOFF='2026-11-25';
const HUB_WEEKS=[
 {id:'current',start:'2026-11-23',end:'2026-11-29',cutoff:'2026-11-25',label:'23–29 nov 2026 · semana de muestra'},
 {id:'previous',start:'2026-11-16',end:'2026-11-22',cutoff:'2026-11-22',label:'16–22 nov 2026 · semana anterior'},
 {id:'empty',start:'2026-11-09',end:'2026-11-15',cutoff:'2026-11-15',label:'9–15 nov 2026 · muestra sin novedades'}
];
const HUB_STATUS={requested:'Solicitado',received:'Recibido',reviewed:'Revisado'},HUB_UPDATE_TYPES={milestone:'Hito',action:'Acción del inversionista',notice:'Aviso de coordinación'};
const HUB_DOCUMENTS=[
 {id:'hd1',project:'horizonte',service:'v1',visibility:'shared',title:'Solicitud de firma del expediente',status:'requested',date:'2026-11-24',responsible:'Inversionista',next:'Consultar la solicitud y la firma en Canopy.',source:'Canopy · referencia',clientAction:true},
 {id:'hd2',project:'horizonte',service:'v1',visibility:'shared',title:'Lista de documentación de constitución',status:'received',date:'2026-11-20',responsible:'Vision Accounts',next:'Vision revisará la documentación en su portal especializado.',source:'Canopy · referencia',clientAction:false},
 {id:'hd3',project:'horizonte',service:'l1',visibility:'shared',title:'Confirmación de expediente de coordinación',status:'received',date:'2026-11-24',responsible:'LegalKey',next:'Confirmar el siguiente punto de coordinación; el expediente legal se gestiona con LegalKey.',source:'UNARA · referencia de coordinación',clientAction:false},
 {id:'hd4',project:'horizonte',service:'n1',visibility:'shared',title:'Referencia de documentación de cierre',status:'reviewed',date:'2026-11-23',responsible:'Northreach',next:'Coordinar el siguiente hito de terreno.',source:'UNARA · referencia de coordinación',clientAction:false},
 {id:'hd5',project:'horizonte',service:'a1',visibility:'shared',title:'Referencia al expediente de obra',status:'reviewed',date:'2026-11-25',responsible:'Amplify',next:'Consultar el expediente y reporte semanal de obra en Buildertrend.',source:'Buildertrend · referencia',clientAction:false},
 {id:'hd6',project:'horizonte',service:'u1',visibility:'shared',title:'Confirmación de referencias para Look & Feel',status:'requested',date:'2026-11-25',responsible:'Inversionista',next:'Acordar las referencias con el equipo de UMBER.',source:'UNARA · referencia de coordinación',clientAction:true},
 {id:'hd7',project:'horizonte',service:'m1',visibility:'shared',title:'Constancia de entrega de Digital Launch',status:'reviewed',date:'2026-11-18',responsible:'Smartketing',next:'Consultar la entrega con el proveedor responsable.',source:'UNARA · referencia de coordinación',clientAction:false},
 {id:'hd8',project:'horizonte',service:'u1',visibility:'shared',title:'Referencia de alcance de diseño',status:'received',date:'',responsible:'',next:'Sin siguiente acción informada.',source:'UNARA · referencia de coordinación',clientAction:false},
 {id:'hd-draft',project:'horizonte',service:'v1',visibility:'draft',title:'Borrador interno de referencia Vision (muestra)',status:'requested',date:'2026-11-25',responsible:'Vision Accounts',next:'Revisar internamente.',source:'UNARA · muestra interna',clientAction:false},
 {id:'hd-withdrawn',project:'horizonte',service:'l1',visibility:'withdrawn',title:'Referencia legal retirada (muestra interna)',status:'received',date:'2026-11-24',responsible:'LegalKey',next:'No compartir.',source:'UNARA · muestra interna',clientAction:false},
 {id:'ad1',project:'aurora',service:'n2',visibility:'shared',title:'Referencia de preparación de terreno Aurora',status:'requested',date:'2026-11-24',responsible:'Northreach',next:'Confirmar alcance de desarrollo de ejemplo.',source:'UNARA · referencia de coordinación',clientAction:false},
 {id:'ad2',project:'aurora',service:'a1',visibility:'shared',title:'Referencia de expediente de construcción Aurora',status:'received',date:'2026-11-25',responsible:'Amplify',next:'Consultar el portal especializado cuando su acceso esté configurado.',source:'Buildertrend · referencia',clientAction:false}
];
const HUB_UPDATES=[
 {id:'hu1',project:'horizonte',service:'v1',visibility:'shared',kind:'action',title:'Siguiente punto: firma de documentos',date:'2026-11-24',responsible:'Inversionista',text:'El seguimiento de constitución requiere revisar la solicitud de firma. El detalle y la documentación corresponden a Canopy.'},
 {id:'hu2',project:'horizonte',service:'l1',visibility:'shared',kind:'milestone',title:'Punto de coordinación legal registrado',date:'2026-11-23',responsible:'LegalKey',text:'El equipo confirma que puede continuar con la coordinación de ejemplo; no se publica contenido del expediente legal.'},
 {id:'hu3',project:'horizonte',service:'n1',visibility:'shared',kind:'milestone',title:'Referencia de cierre revisada',date:'2026-11-25',responsible:'Northreach',text:'Se registró un hito ficticio de revisión documental para coordinar el siguiente paso.'},
 {id:'hu4',project:'horizonte',service:'a1',visibility:'shared',kind:'notice',title:'Seguimiento de obra en su portal especializado',date:'2026-11-25',responsible:'Amplify',text:'El reporte semanal de construcción permanece en Buildertrend. UNARA muestra hitos de coordinación, no avance físico de obra.'},
 {id:'hu5',project:'horizonte',service:'m1',visibility:'shared',kind:'milestone',title:'Digital Launch · entrega de muestra',date:'2026-11-18',responsible:'Smartketing',text:'La referencia de entrega se registró en la muestra. Los archivos corresponden al proveedor.'},
 {id:'hu6',project:'horizonte',service:'u1',visibility:'shared',kind:'notice',title:'Coordinación de referencias de diseño',date:'2026-11-19',responsible:'UMBER',text:'Se prepara el punto de coordinación Look & Feel; no se publican diseños ni archivos desde UNARA.'},
 {id:'hu-draft',project:'horizonte',service:'v1',visibility:'draft',kind:'notice',title:'Borrador de aviso interno Vision',date:'2026-11-25',responsible:'Vision Accounts',text:'Texto de muestra pendiente de aprobación. No es una publicación al cliente.'},
 {id:'hu-withdrawn',project:'horizonte',service:'l1',visibility:'withdrawn',kind:'notice',title:'Aviso legal retirado de muestra',date:'2026-11-24',responsible:'LegalKey',text:'Referencia no compartida con el inversionista.'},
 {id:'au1',project:'aurora',service:'n2',visibility:'shared',kind:'notice',title:'Coordinación del terreno Aurora',date:'2026-11-24',responsible:'Northreach',text:'Primer punto de coordinación ficticio del proyecto Aurora.'}
];
const HUB_TEAM_NOTES=[
 {project:'horizonte',service:'v1',date:'2026-11-25',text:'Nota interna de muestra Vision: conciliar checklist de revisión antes de decidir si se comparte un aviso.'},
 {project:'horizonte',service:'l1',date:'2026-11-25',text:'Nota interna de muestra LegalKey: preparar revisión del equipo; no publicar títulos de tareas jurídicas.'},
 {project:'horizonte',service:'a1',date:'2026-11-25',text:'Nota interna de muestra Amplify: confirmar referencia de coordinación; no copiar el reporte de Buildertrend.'},
 {project:'aurora',service:'n2',date:'2026-11-24',text:'Nota interna de muestra Northreach Aurora: revisar alcance antes de publicar un aviso.'}
];
const hubStates=new Map();
function hubState(p){
 if(!hubStates.has(p.id))hubStates.set(p.id,{view:'docs',company:'all',service:'all',status:'all',kind:'all',period:'all',week:'current'});
 return hubStates.get(p.id);
}
function hubDate(value){return date(value)?new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T00:00:00Z')):'Sin fecha registrada';}
function hubShared(records,p){
 if(!publishedProject(p))return[];
 const enabled=new Set(active(p).map(s=>s.id));
 return records.filter(r=>r.project===p.id&&enabled.has(r.service)&&r.visibility==='shared'&&(!r.date||date(r.date)&&r.date<=HUB_CUTOFF));
}
function hubMeta(container,label,value){
 const item=E('div',null,'hub-meta');item.append(E('span',label),E('strong',value||'Sin informar'));container.append(item);
}
function hubButton(label,cls,action){const b=button(label,cls,action);return b;}
function hubFocus(root,id){
 const panel=root.querySelector('#'+id);if(!panel)return;const heading=panel.querySelector('h2');
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 panel.scrollIntoView({block:'start',inline:'nearest'});
}
function appendHubShortcuts(root,p){
 const docs=hubShared(HUB_DOCUMENTS,p),updates=hubShared(HUB_UPDATES,p),nav=E('nav',null,'hub-shortcuts');nav.setAttribute('aria-label','Secciones del portal de inversión');
 const jump=(view,id)=>{root.querySelector('[data-hub-view="'+view+'"]')?.click();hubFocus(root,id);};
 nav.append(E('span','Ir a · totales sin filtros','hub-shortcuts-label'),
 hubButton('Cronograma','overview-jump',()=>hubFocus(root,'cronograma')),
 hubButton('Servicios','overview-jump',()=>hubFocus(root,'services')),
 hubButton('Seguimiento','overview-jump',()=>hubFocus(root,'actions')),
 hubButton('Documentos · '+docs.length,'hub-shortcut',()=>jump('docs','centro-documental')),
 hubButton('Actualizaciones · '+updates.length,'hub-shortcut',()=>jump('updates','centro-documental')),
 hubButton('Resumen semanal','hub-shortcut',()=>hubFocus(root,'resumen-semanal')),hubButton('Portales','overview-jump',()=>hubFocus(root,'portales-especializados')));
 root.append(nav);
}
function hubSelect(label,id,options,value){
 const wrap=E('label',null,'field hub-filter'),sel=E('select');sel.id=id;wrap.append(E('span',label),sel);
 function setOptions(items,chosen){sel.replaceChildren();for(const [v,l] of items){const op=E('option',l);op.value=v;sel.append(op);}sel.value=items.some(([v])=>v===chosen)?chosen:items[0][0];}
 setOptions(options,value);return{wrap,sel,setOptions};
}
function appendClientHub(root,p,onSelect){
 const state=hubState(p),services=active(p),byService=id=>services.find(s=>s.id===id),firms=[...new Set(services.map(s=>s.firm))];
 const docs=hubShared(HUB_DOCUMENTS,p),updates=hubShared(HUB_UPDATES,p);
 if(!firms.includes(state.company))state.company='all';if(!services.some(s=>s.id===state.service&&(state.company==='all'||s.firm===state.company)))state.service='all';
 const section=title('Documentos y actualizaciones','Referencias de seguimiento de este expediente. Estados registrados de muestra; no confirman recepción de archivos en UNARA.','card hub-center');section.id='centro-documental';
 const header=E('div',null,'hub-tabs');header.setAttribute('role','group');header.setAttribute('aria-label','Seleccionar tipo de seguimiento');
 const tabDocs=hubButton('Documentos y accesos','hub-tab',()=>setView('docs')),tabUpdates=hubButton('Novedades UNARA','hub-tab',()=>setView('updates'));
 tabDocs.dataset.hubView='docs';tabUpdates.dataset.hubView='updates';for(const b of [tabDocs,tabUpdates])b.setAttribute('aria-controls','hub-result-list');header.append(tabDocs,tabUpdates);
 const filter=E('div',null,'hub-filter-bar');
 const company=hubSelect('Empresa','hub-company',[['all','Todas las empresas'],...firms.map(f=>[f,firm(f)[1]])],state.company);
 const serviceOptions=()=>[['all','Todos los procesos'],...services.filter(s=>state.company==='all'||s.firm===state.company).map(s=>[s.id,s.title])];
 const process=hubSelect('Proceso','hub-process',serviceOptions(),state.service);
 const docStatus=hubSelect('Estado','hub-status',[['all','Todos los estados'],...Object.entries(HUB_STATUS)],state.status);
 const updateKind=hubSelect('Tipo de novedad','hub-kind',[['all','Todos los tipos'],...Object.entries(HUB_UPDATE_TYPES)],state.kind);
 const period=hubSelect('Periodo de muestra','hub-period',[['all','Todas las fechas'],['current','23–29 nov'],['previous','16–22 nov'],['empty','9–15 nov']],state.period);
 const reset=hubButton('Limpiar filtros','secondary hub-reset',()=>{
   Object.assign(state,{company:'all',service:'all',status:'all',kind:'all',period:'all'});
   company.sel.value='all';process.setOptions(serviceOptions(),'all');docStatus.sel.value='all';updateKind.sel.value='all';period.sel.value='all';draw();
 });
 filter.append(company.wrap,process.wrap,docStatus.wrap,updateKind.wrap,period.wrap,reset);
 const stats=E('div',null,'hub-status-counts'),count=E('p','','hub-result-count');count.setAttribute('role','status');count.setAttribute('aria-live','polite');count.setAttribute('aria-atomic','true');
 const list=E('div',null,'hub-list');list.id='hub-result-list';
 function setView(view){state.view=view;draw();}
 function item(r,isDocs){
  const s=byService(r.service),article=E('article',null,'hub-row');article.dataset.refId=r.id;
  article.style.setProperty('--company',firm(s.firm)[2]);
  const lead=E('div',null,'hub-row-title'),top=E('div',null,'hub-company-line');top.append(logo(s),E('span',firm(s.firm)[1]+' · '+s.title));lead.append(top,E('h3',r.title));
  if(isDocs)lead.append(chip(HUB_STATUS[r.status],r.status==='requested'?'warn':r.status==='reviewed'?'ok':'blue'),E('small',r.source,'hub-source'));
  else lead.append(chip(HUB_UPDATE_TYPES[r.kind],r.kind==='action'?'warn':r.kind==='milestone'?'ok':'blue'),E('small','Fuente: referencia UNARA de muestra','hub-source'));
  const meta=E('div',null,'hub-row-meta');hubMeta(meta,isDocs?'Fecha de estado':'Fecha de referencia',hubDate(r.date));hubMeta(meta,'Responsable',r.responsible||'Sin responsable asignado');
  const desc=E('div',null,'hub-row-desc');desc.append(E('span',isDocs?'Siguiente acción':'Actualización','hub-label'),E('p',isDocs?r.next||'Sin siguiente acción informada.':r.text));
  const links=E('div',null,'hub-row-links');
  const go=hubButton('Ver ficha del servicio ↓','hub-text-button inv36-hub-service',()=>onSelect(s,'inv36-hub-service',r.id));go.setAttribute('aria-label','Ver ficha de '+s.title+' · '+firm(s.firm)[1]+' · '+r.title);go.dataset.service=s.id;go.dataset.hubOrigin=r.id;links.append(go);
  if(isDocs&&(r.source.startsWith('Canopy')||r.source.startsWith('Buildertrend'))){
   const portal=r.source.startsWith('Canopy')?'Canopy':'Buildertrend',portalFirm=portal==='Canopy'?'vision':'amplify';
   const jump=hubButton('Ver acceso de muestra a '+portal,'hub-text-button portal-origin',()=>jumpPortal(root,p.id,portalFirm,{type:'doc',id:r.id}));jump.dataset.portalOrigin=r.id;links.append(jump);
  }
  article.append(lead,meta,desc,links);return article;
 }
 function draw(){
  const isDocs=state.view==='docs';tabDocs.setAttribute('aria-pressed',String(isDocs));tabUpdates.setAttribute('aria-pressed',String(!isDocs));
  docStatus.wrap.hidden=!isDocs;updateKind.wrap.hidden=isDocs;period.wrap.hidden=isDocs;
  stats.replaceChildren();
  if(isDocs){stats.append(E('span','Totales del expediente (sin filtros)','hub-label'));for(const [key,label] of Object.entries(HUB_STATUS)){const c=E('span',null,'hub-count-pill');c.append(E('strong',docs.filter(r=>r.status===key).length),E('span',label+'s'));stats.append(c);}}
  else stats.append(E('span',updates.length+' novedades compartidas de muestra en este expediente (total sin filtros)','muted'));
  const source=isDocs?docs:updates;
  const w=HUB_WEEKS.find(x=>x.id===state.period);
  const rows=source.filter(r=>{
   const s=byService(r.service);
   return (state.company==='all'||s.firm===state.company)&&(state.service==='all'||r.service===state.service)&&
   (isDocs?(state.status==='all'||r.status===state.status):(state.kind==='all'||r.kind===state.kind)&&(!w||date(r.date)&&r.date>=w.start&&r.date<=w.cutoff));
  }).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||a.title.localeCompare(b.title));
  count.textContent=rows.length+' de '+source.length+(isDocs?' referencias documentales':' novedades')+' · muestra';
  list.replaceChildren();
  if(!source.length)list.append(E('p',isDocs?'No hay documentos compartidos para este expediente de muestra.':'Aún no hay actualizaciones compartidas en UNARA para este expediente de muestra.','hub-empty'));
  else if(!rows.length)list.append(E('p','No hay coincidencias con estos filtros. Cambia los filtros o pulsa Limpiar filtros.','hub-empty'));
  else rows.forEach(r=>list.append(item(r,isDocs)));
 }
 company.sel.addEventListener('change',()=>{state.company=company.sel.value;process.setOptions(serviceOptions(),state.service);state.service=process.sel.value;draw();});
 process.sel.addEventListener('change',()=>{state.service=process.sel.value;draw();});
 docStatus.sel.addEventListener('change',()=>{state.status=docStatus.sel.value;draw();});
 updateKind.sel.addEventListener('change',()=>{state.kind=updateKind.sel.value;draw();});
 period.sel.addEventListener('change',()=>{state.period=period.sel.value;draw();});
 section.append(header,filter,stats,count,list,E('p','UNARA indica referencias y coordinación. Los documentos reales se consultarían en el sistema responsable; no hay carga, descarga ni sincronización de archivos en esta demo.','hub-boundary'));
 root.append(section);draw();
}
function appendWeeklyPreview(root,p,onSelect){
 const state=hubState(p),services=active(p),docs=hubShared(HUB_DOCUMENTS,p),updates=hubShared(HUB_UPDATES,p);
 const section=title('Resumen semanal','Vista previa in-app · no enviado. Separa novedades de una semana de muestra del próximo paso al consultar.','card hub-week');section.id='resumen-semanal';
 const controls=E('div',null,'hub-week-controls'),period=hubSelect('Semana de muestra','hub-week-select',HUB_WEEKS.map(w=>[w.id,w.label]),state.week);
 const stamp=E('p','','hub-week-stamp'),screen=E('div',null,'hub-week-content');stamp.setAttribute('role','status');stamp.setAttribute('aria-live','polite');stamp.setAttribute('aria-atomic','true');controls.append(period.wrap,stamp);
 const group=(label,sub,id)=>{const g=E('section',null,'hub-week-group');g.id=id;g.append(E('h3',label),E('p',sub,'muted'));return g;};
 const currentResponsible=s=>s.action?'Inversionista'+(s.owner?' · '+s.owner:' · equipo por asignar'):s.owner||'Sin responsable asignado';
 function serviceLink(s,originId){const b=hubButton('Ver ficha ↓','hub-text-button inv36-week-service',()=>onSelect(s,'inv36-week-service',originId));b.setAttribute('aria-label','Ver ficha de '+s.title+' · '+firm(s.firm)[1]);b.dataset.service=s.id;b.dataset.hubOrigin=originId;return b;}
 function draw(){
  const w=HUB_WEEKS.find(x=>x.id===state.week)||HUB_WEEKS[0];
  const inWeek=r=>date(r.date)&&r.date>=w.start&&r.date<=w.cutoff;
  const fresh=updates.filter(inWeek).sort((a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title)),documented=docs.filter(inWeek);
  const byDate=(a,b)=>(a.confirmed||a.target||'9999').localeCompare(b.confirmed||b.target||'9999');
  const activeActions=services.filter(s=>s.action).sort(byDate),pendingDocs=docs.filter(r=>r.status==='requested'&&r.clientAction).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  const next=services.filter(s=>s.status!=='closed'||s.action||s.blocked||taskStats(s.stages).percent!==100).sort(byDate);
  stamp.textContent=hubDate(w.start)+' – '+hubDate(w.end)+' · corte ficticio '+hubDate(w.cutoff)+' (Ciudad de México) · '+fresh.length+' novedades compartidas.';
  screen.replaceChildren();const summary=E('div',null,'hub-week-metrics');
  for(const [n,label] of [[fresh.length,'Novedades compartidas en el periodo'],[documented.length,'Referencias documentales fechadas en el periodo'],[activeActions.length,'Servicios requieren tu acción al consultar'],[pendingDocs.length,'Solicitudes documentales de referencia al corte']]){
   const m=E('div',null,'hub-week-metric');m.append(E('strong',n),E('span',label));summary.append(m);
  }
  screen.append(summary);
  const g1=group('Qué cambió','Novedades expresamente compartidas en el periodo. No incluye notas internas ni infiere avances externos.','hub-week-changes');
  if(!fresh.length)g1.append(E('p','No se registraron novedades compartidas durante esta semana de muestra. Esto no implica que no haya actividad en los sistemas especializados.','hub-empty'));
  else for(const r of fresh){const s=services.find(s=>s.id===r.service),row=E('article',null,'hub-week-row');row.dataset.weekUpdate=r.id;const copy=E('div',null,'hub-week-row-copy');copy.append(E('strong',r.title),E('small',firm(s.firm)[1]+' · '+hubDate(r.date)+' · '+HUB_UPDATE_TYPES[r.kind]),E('p',r.text));row.append(copy,serviceLink(s,'update:'+r.id));g1.append(row);}
  if(documented.length){const record=E('div',null,'hub-week-doc-summary');record.append(E('strong','Referencias documentales del periodo (estado registrado)'),E('span',Object.entries(HUB_STATUS).map(([v,l])=>l+': '+documented.filter(r=>r.status===v).length).join(' · ')));g1.append(record);}
  const g2=group('Qué necesitas hacer','Acciones de servicio visibles al momento de consultar la demo. Las solicitudes documentales son referencias fijas al corte de muestra; no se actualizan con el editor. No reconstruye una bandeja histórica.','hub-week-actions');
  if(!activeActions.length&&!pendingDocs.length)g2.append(E('p','No tienes acciones pendientes de tu parte en esta muestra.','hub-empty'));
  else{
   for(const s of activeActions){const row=E('article',null,'hub-week-row');row.dataset.currentAction=s.id;const copy=E('div',null,'hub-week-row-copy');copy.append(E('strong',s.next||'Próximo paso por definir'),E('small',firm(s.firm)[1]+' · '+currentResponsible(s)),E('span','Fecha objetivo: '+(s.target?hubDate(s.target):'Sin fecha definida'),'hub-label'));row.append(copy,serviceLink(s,'action:'+s.id));g2.append(row);}
   if(pendingDocs.length){const box=E('div',null,'hub-week-doc-requests');box.id='solicitudes-documentales';box.append(E('h4','Solicitudes documentales de muestra · corte '+hubDate(HUB_CUTOFF)),E('p','Pueden corresponder al mismo próximo paso de un servicio; no deben sumarse como obligaciones adicionales.','muted'));for(const r of pendingDocs){const s=services.find(s=>s.id===r.service),row=E('article',null,'hub-week-row');row.dataset.weekDoc=r.id;const copy=E('div',null,'hub-week-row-copy');copy.append(E('strong',r.title),E('small',firm(s.firm)[1]+' · '+(r.responsible||'Sin responsable asignado')),E('span','Estado registrado: '+hubDate(r.date),'hub-label'),E('p',r.next));row.append(copy,serviceLink(s,'doc:'+r.id));box.append(row);}box.append(button('↑ Volver al próximo paso','review-text-button doc-requests-back',()=>{const target=root.querySelector('.inv36-doc-primary,.inv36-doc-secondary');if(target){target.focus({preventScroll:true});target.scrollIntoView({block:'nearest'});}else focusTitle(root,'#resumen-inversion h2');}));g2.append(box);}
  }
  const g3=group('Qué viene','Siguientes pasos visibles y avance de coordinación actual. Las fechas objetivo no son fechas confirmadas.','hub-week-next');
  if(!next.length)g3.append(E('p','No hay próximos pasos abiertos en los servicios de esta muestra.','hub-empty'));
  else for(const s of next){const row=E('article',null,'hub-week-row');row.dataset.weekService=s.id;const copy=E('div',null,'hub-week-row-copy');
   const nextLabel=s.status==='closed'&&taskStats(s.stages).percent!==100?(taskStats(s.stages).total?'Revisar cierre: quedan hitos sin completar.':'Revisar cierre: no hay hitos aplicables registrados.'):s.next||'Sin próximo paso informado';
   copy.append(E('strong',firm(s.firm)[1]+' · '+s.title),E('small',progressText(s)+' de coordinación · '+progressCount(s)),E('small',sourceMethod(sourceRecord(s))+' · '+(sourceRecord(s).date?hubDate(sourceRecord(s).date):'Sin fecha registrada'),'pilot-provenance-line'),E('p',nextLabel),E('span','Responsable: '+currentResponsible(s)+' · Objetivo: '+(s.target?hubDate(s.target):'Sin fecha definida'),'hub-label'));
   if(s.confirmed)copy.append(E('small','Fecha confirmada de muestra: '+hubDate(s.confirmed)));
   if(s.blocked||s.status==='blocked')copy.append(chip('Bloqueo · seguimiento','warn'));row.append(copy,serviceLink(s,'next:'+s.id));g3.append(row);
  }
  screen.append(g1,g2,g3,E('p','Documento de ejemplo dentro del portal. No se envía correo ni notificación. El reporte de obra corresponde a Buildertrend y los documentos de Vision a Canopy.','hub-boundary'));
 }
 period.sel.addEventListener('change',()=>{state.week=period.sel.value;draw();});
 section.append(controls,screen);root.append(section);draw();
}
function appendTeamReferenceNotes(container,p,s){
 // Demonstration only. Real internal records must not be returned to investor or a cross-company reader.
 if(!canEdit(s))return;
 const n=E('details',null,'hub-team-note-panel');n.append(E('summary','Notas internas y referencias no compartidas · solo equipo (muestra)'));
 n.append(E('p','Estos ejemplos no se presentan en el centro del inversionista ni en el resumen semanal. No hay edición o publicación de documentos en esta revisión.','muted'));
 const notes=HUB_TEAM_NOTES.filter(r=>r.project===p.id&&r.service===s.id);
 const withheld=[...HUB_DOCUMENTS,...HUB_UPDATES].filter(r=>r.project===p.id&&r.service===s.id&&['draft','withdrawn'].includes(r.visibility));
 if(!notes.length&&!withheld.length)n.append(E('p','Sin notas internas ficticias para este servicio.','hub-empty'));
 for(const r of notes){const item=E('article',null,'hub-team-note');item.append(chip('Interna · no compartida'),E('p',r.text),E('small',hubDate(r.date),'muted'));n.append(item);}
 for(const r of withheld){const item=E('article',null,'hub-team-note');item.append(chip(r.visibility==='draft'?'Borrador · no compartido':'Retirado · no compartido','warn'),E('p',r.title),E('small',hubDate(r.date),'muted'));n.append(item);}
 container.append(n);
}

let inv36Navigation=null;
function jumpPortal(root,project,firmId,origin){const card=root.querySelector('#portal-'+firmId);if(!card)return;portalReturn={project,firmId,...origin};for(const b of root.querySelectorAll('.portal-return'))b.hidden=true;const b=card.querySelector('.portal-return');if(b){b.hidden=false;b.textContent=origin.type==='doc'?'↑ Volver a la referencia documental':'↑ Volver a la ficha del servicio';}focusTitle(card,'h3');}
function returnFromPortal(root,project,firmId){const origin=portalReturn;if(!origin||origin.project!==project||origin.firmId!==firmId)return;const btn=root.querySelector('#portal-'+firmId+' .portal-return');if(btn)btn.hidden=true;portalReturn=null;const target=origin.type==='doc'?[...root.querySelectorAll('.portal-origin')].find(b=>b.dataset.portalOrigin===origin.id):root.querySelector('.inv36-portal-jump');if(target){target.focus({preventScroll:true});target.scrollIntoView({block:'nearest',inline:'nearest'});}else if(origin.type==='doc')hubFocus(root,'centro-documental');else focusTitle(root,'#service-detail-title');}

function investor(root,p){
 if(inv36Navigation&&inv36Navigation.project!==p.id)inv36Navigation=null;
 if(!publishedProject(p)){root.append(title('Expediente aún no disponible',p.status==='archived'?'Este expediente de muestra está archivado y no tiene seguimiento activo. Selecciona otro proyecto.':'Este proyecto de muestra todavía no está publicado para el inversionista. Selecciona otro proyecto.'));return}
 const ss=active(p);if(!ss.length){if(p.status==='delivered')projectLifecycle(root,p,{services:ss});root.append(title('Tu expediente está en preparación','Aún no hay servicios configurados en este expediente de muestra. No hay cronograma ni porcentaje que calcular; selecciona otro proyecto si está disponible.'));return}
 const firmName=s=>firm(s.firm)[1],selected=ss.find(x=>x.id===sid)||ss[0];
 const shortDate=value=>date(value)?new Intl.DateTimeFormat('es-MX',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T00:00:00Z')):'Sin fecha definida';
 const needsReview=s=>s.status==='closed'&&taskStats(s.stages).percent!==100;
 const responsible=s=>typeof s.owner==='string'&&s.owner.trim()?s.owner:'Sin responsable asignado';
 const clientResponsible=s=>s.owner?'Tú, con '+s.owner:'Tú (equipo por asignar)';
 const open=s=>s.status!=='closed'||s.action||s.blocked||needsReview(s);
 const rank=s=>s.action?0:s.blocked||s.status==='blocked'?1:needsReview(s)?2:s.status==='active'?3:4;
 const orderDate=s=>date(s.confirmed)?s.confirmed:date(s.target)?s.target:'9999';
 const nextText=s=>needsReview(s)&&!s.action?(taskStats(s.stages).total?'Revisar cierre: quedan hitos sin completar.':'Revisar cierre: no hay hitos aplicables registrados.'):s.next||'Próximo paso por definir';
 const live=ss.filter(open).sort((a,b)=>rank(a)-rank(b)||orderDate(a).localeCompare(orderDate(b))),mine=live.filter(s=>s.action),blockers=live.filter(s=>s.blocked||s.status==='blocked'),docRequests=hubShared(HUB_DOCUMENTS,p).filter(r=>r.status==='requested'&&r.clientAction);
 const showDocumentRequests=()=>focusTitle(root,'#solicitudes-documentales h4');
 const external=PILOT_PLATFORMS;
 const state36=s=>s.action?chip('Tu acción','warn'):s.blocked||s.status==='blocked'?chip('Bloqueo · seguimiento','warn'):needsReview(s)?chip('Revisar cierre','warn'):s.status==='closed'?chip('Cerrado','ok'):s.status==='waiting'?chip('En espera',''):chip('En coordinación','blue');
 const textPalette={vision:'#15683e',legal:'#244bc0',northreach:'#76543d',amplify:'#34383d',umber:'#8b482f',marketing:'#765b25',casa_norte:'#486c73'};
 function textAccent(n,s){n.style.setProperty('--company-text',textPalette[s.firm]||'#102832');}
 function goDetail(s,origin,originId){
   portalReturn=null;const oldScroll=root.querySelector('.gantt-scroll');inv36Navigation={project:p.id,service:s.id,origin,originId,scrollLeft:oldScroll?.scrollLeft||0};
   if(!pick(s.id)){inv36Navigation=null;return}
   const h=$('service-detail-title'),newScroll=root.querySelector('.gantt-scroll');
   if(newScroll)newScroll.scrollLeft=inv36Navigation.scrollLeft;
   if(h){h.focus({preventScroll:true});h.scrollIntoView({block:'start',inline:'nearest'});}
   const announce=$('inv36-announcer');if(announce)announce.textContent=firmName(s)+' · '+s.title+' seleccionado. Detalle disponible.';
 }
 function choose(s,label,cls){const b=button(label,cls,()=>goDetail(s,cls));b.dataset.service=s.id;b.setAttribute('aria-controls','service-detail');b.setAttribute('aria-pressed',String(s.id===selected.id));accent(b,s);textAccent(b,s);return b;}
 function meta(container,label,value){const n=E('div',null,'inv36-meta');n.append(E('span',label),E('strong',value));container.append(n);}
 function line(s){
 const b=choose(s,null,'inv36-action'),label=E('span',null,'inv36-action-copy'),who=E('span',null,'inv36-action-date');
 label.append(E('strong',nextText(s)),E('small',firmName(s)+' · '+s.title));
 who.append(E('strong',s.action?'Responsable: inversionista':'Responsable: '+responsible(s)),E('small','Fecha objetivo: '+shortDate(s.target)));
 if(s.confirmed)who.append(E('small','Confirmada: '+shortDate(s.confirmed)));
 const tags=E('span',null,'inv36-action-tag');tags.append(state36(s));if(s.action&&(s.blocked||s.status==='blocked'))tags.append(chip('Bloqueo','warn'));
 b.append(label,who,tags,E('span','›','inv36-chevron'));return b;
 }
 const overview=E('section',null,'inv36-overview');overview.id='resumen-inversion';const summary=E('article',null,'inv36-summary card');
 const top=E('div',null,'inv36-summary-head');top.append(E('h2','Resumen de servicios','inv36-project-name'),chip(live.length?'En seguimiento':'Servicios concluidos','ok'));summary.append(top);
 const metrics=E('div',null,'inv36-metrics');
 for(const [n,label,kind] of [[ss.length,'Servicios contratados',''],[ss.filter(s=>s.status==='active').length,'En coordinación',''],[mine.length,'Requieren tu acción',mine.length?'notice-metric':''],[blockers.length,'Con bloqueo',blockers.length?'notice-metric':'']]){const item=E('div',null,'inv36-metric '+kind);item.append(E('strong',n),E('span',label));metrics.append(item);}
 summary.append(metrics,E('p','UNARA coordina próximos pasos; el detalle permanece en los sistemas de cada empresa.','inv36-footnote'));
 const callout=E('article',null,'inv36-callout card'),follow=mine[0]||live[0];
 callout.append(E('p',mine.length?'QUÉ NECESITAS HACER':docRequests.length?'REVISA TUS REFERENCIAS DOCUMENTALES':'ESTADO DE TUS ACCIONES','kicker'));
 if(mine.length){
  accent(callout,follow);const t=E('div',null,'inv36-callout-title');t.append(E('h2',follow.next||'Pendiente de confirmar'),chip('Tu acción','warn'));if(follow.blocked||follow.status==='blocked')t.append(chip('Bloqueo','warn'));callout.append(t,E('p',firmName(follow)+' · '+follow.title,'inv36-callout-context'));
  const data=E('div',null,'inv36-callout-meta');meta(data,'Responsable',clientResponsible(follow));meta(data,'Fecha objetivo',shortDate(follow.target));if(follow.confirmed)meta(data,'Fecha confirmada',shortDate(follow.confirmed));callout.append(data,choose(follow,'Ver qué necesito hacer →','inv36-primary'));
  if(docRequests.length){const secondary=E('div',null,'review-doc-caption');secondary.append(E('span',docRequests.length+' '+(docRequests.length===1?'solicitud documental':'solicitudes documentales')+' al corte de muestra · pueden corresponder al mismo próximo paso; no se suman.'),button('Ver solicitudes documentales','review-text-button inv36-doc-secondary',showDocumentRequests));callout.append(secondary);}
 }else if(docRequests.length){
  callout.append(E('h2',docRequests.length+' '+(docRequests.length===1?'solicitud documental de referencia':'solicitudes documentales de referencia')),E('p','No hay acciones de servicio marcadas para ti. Revisa las solicitudes de muestra; no confirman una nueva obligación ni recepción de archivos.','inv36-callout-context'),E('small','Corte de muestra: '+hubDate(HUB_CUTOFF),'review-doc-caption'),button('Ver solicitudes documentales →','inv36-primary inv36-doc-primary',showDocumentRequests));
 }else{
  callout.append(E('h2','No tienes acciones pendientes de tu parte.'));
  if(follow){accent(callout,follow);callout.append(E('p','El equipo sigue coordinando: '+nextText(follow),'inv36-callout-context'),state36(follow));const data=E('div',null,'inv36-callout-meta');meta(data,'Responsable',responsible(follow));meta(data,'Fecha objetivo',shortDate(follow.target));if(follow.confirmed)meta(data,'Fecha confirmada',shortDate(follow.confirmed));callout.append(data,choose(follow,'Consultar coordinación →','inv36-primary'));}
  else callout.append(E('p','No hay próximos pasos abiertos en los servicios de esta muestra.','inv36-callout-context'));
 }
 overview.append(callout,summary);root.append(overview);if(p.status==='delivered')projectLifecycle(root,p,{services:ss});appendHubShortcuts(root,p);
 const actions=title('Seguimiento del equipo',mine.length>1?'Otras acciones tuyas y próximos pasos del equipo.':'Consulta próximos pasos, responsables y fechas.','card inv36-actions');
 if(mine.length>1){const other=E('div',null,'inv36-actions-list');other.append(E('h3','Otras acciones tuyas'));mine.slice(1).forEach(s=>other.append(line(s)));actions.append(other);}
 const coordination=live.filter(s=>!s.action);
 if(coordination.length){const panel=E('details',null,'inv36-coordination');panel.append(E('summary',coordination.length+' '+(coordination.length===1?'próximo paso del equipo':'próximos pasos del equipo')+' · consultar responsable y fecha'));coordination.forEach(s=>panel.append(line(s)));actions.append(panel);}
 else actions.append(E('p','No hay próximos pasos del equipo en esta muestra.','body-pad muted'));
 actions.id='actions';if(mine.length>1)root.append(actions);
 const validRange=s=>Number.isFinite(s.start)&&Number.isFinite(s.end)&&s.start>=0&&s.end>=s.start&&s.end<=36;
 const horizon=Math.max(2,...ss.filter(validRange).map(s=>Math.ceil(s.end)));
 const g=title('Cronograma general','Meses del proyecto · el relleno indica hitos completados, no avance físico.','card gantt inv36-gantt');g.id='cronograma';
 const scroll=E('div',null,'gantt-scroll'),grid=E('div',null,'gantt-grid');scroll.tabIndex=0;scroll.setAttribute('role','region');scroll.setAttribute('aria-label','Cronograma mensual desplazable horizontalmente');scroll.setAttribute('aria-describedby','gantt-scroll-hint');
 grid.style.setProperty('--tick',100/horizon+'%');grid.style.minWidth=Math.max(770,286+horizon*34)+'px';const ax=E('div',null,'gantt-axis'),a=E('div',null,'timeline-axis');ax.append(E('span','SERVICIO / EMPRESA','axis-name'),a,E('span','HITOS CERRADOS','axis-pct'));for(let i=0;i<=horizon;i++){const n=E('span','M'+i,'tick');n.style.left=100*i/horizon+'%';a.append(n)}grid.append(ax);
 for(const s of ss){
  const range=validRange(s),r=choose(s,null,'gantt-row'),name=E('span',null,'gantt-name'),copy=E('span');copy.append(E('strong',s.title),E('small',firmName(s)+' · '+(range?'M'+s.start+'–M'+s.end:'Sin plazo definido')),E('small',progressText(s)+' · '+progressCount(s),'inv36-mobile-count'));if(s.id===selected.id){const selectedMark=E('span','✓','inv36-selected-mark');selectedMark.setAttribute('aria-hidden','true');name.append(selectedMark);}name.append(logo(s),copy);
  const track=E('span',null,'time-track'),bar=E('i',null,'plan-bar');
  if(range){bar.style.left=100*s.start/horizon+'%';bar.style.width=100*(s.end-s.start)/horizon+'%';if(s.end===s.start){bar.classList.add('inv36-point');if(s.start===horizon)bar.style.transform='translateX(-100%)';}const completed=taskStats(s.stages).percent,fill=E('span',null,'plan-fill');if(completed===null)bar.classList.add('inv36-unknown');fill.style.width=(completed===null?0:completed)+'%';fill.setAttribute('aria-hidden','true');bar.title='Plan: M'+s.start+' a M'+s.end+' · '+progressText(s)+' de etapas/tareas aplicables completadas';bar.append(fill);track.append(bar);}
  else track.append(E('span','Sin plazo definido','inv36-not-planned'));
  const v=E('span',null,'gantt-pct');v.append(E('strong',progressText(s)),E('small',progressCount(s)));
  r.setAttribute('aria-label',firmName(s)+', '+s.title+', '+(range?'plan mes '+s.start+' a '+s.end:'sin plazo')+', '+progressText(s)+' de coordinación: '+progressCount(s)+'. Ver detalle.');
  r.append(name,track,v);grid.append(r);
 }
 const hint=E('p','En pantallas pequeñas, desliza el cronograma para ver todos los meses. Selecciona un servicio para consultar su ficha.','inv36-gantt-hint');hint.id='gantt-scroll-hint';g.append(hint);scroll.append(grid);g.append(scroll);
 const legend=E('div',null,'legend inv36-legend');for(const [cls,label] of [['filled','Hitos de coordinación completados'],['remaining','Tramo previsto pendiente'],...(ss.some(s=>taskStats(s.stages).percent===null)?[['unknown','Sin avance registrado']]:[])]){const k=E('span',null,'inv36-key');k.append(E('i',null,'inv36-swatch '+cls),E('span',label));legend.append(k);}
 legend.append(E('p','M0 = inicio. Plazos de muestra, no fechas comprometidas. El relleno indica hitos, no tiempo transcurrido ni porcentaje de obra.','inv36-legend-note'));g.append(legend);root.append(g);
 const folders=title('Tus servicios','Selecciona una carpeta o una línea del cronograma para ver su detalle.','folder-section inv36-service-section'),fs=E('div',null,'inv36-folders');
 for(const s of ss){
  const b=choose(s,null,'folder inv36-folder'),x=E('span',null,'inv36-folder-copy');x.append(E('strong',firmName(s)),E('small',s.title));if(s.id===selected.id)x.append(E('small','✓ Seleccionado','inv36-folder-selected'));const main=E('span',null,'inv36-folder-main');main.append(logo(s),x);
  const low=E('span',null,'inv36-folder-low');low.append(E('strong',progressText(s)),E('span',progressCount(s),'folder-progress-count'),E('span',external[s.firm]?'Referencia · '+(s.id==='c1'?'Casa Norte':external[s.firm].name):'Seguimiento UNARA'));b.append(main,low);fs.append(b);
 }
 folders.id='services';folders.append(fs);root.append(folders);
 const s=selected,detail=title(s.title,firmName(s)+' · coordinación UNARA','card detail inv36-detail');detail.id='service-detail';accent(detail,s);textAccent(detail,s);
 const h=detail.querySelector('h2');h.id='service-detail-title';h.tabIndex=-1;
 const nav=inv36Navigation?.project===p.id&&inv36Navigation?.service===s.id?inv36Navigation:null;
 const origin=nav?.origin;
 const back=E('a',origin==='inv36-hub-service'?'↑ Volver a documentos y novedades':origin==='inv36-week-service'?'↑ Volver al resumen semanal':origin==='folder inv36-folder'?'↑ Volver a servicios':origin==='inv36-primary'?'↑ Volver al resumen':origin==='inv36-action'?'↑ Volver a acciones':'↑ Volver al cronograma','inv36-back');
 back.href=origin==='inv36-hub-service'?'#centro-documental':origin==='inv36-week-service'?'#resumen-semanal':origin==='folder inv36-folder'?'#services':origin==='inv36-primary'?'#resumen-inversion':origin==='inv36-action'?'#actions':'#cronograma';
 back.addEventListener('click',event=>{
  event.preventDefault();const groups={'gantt-row':'.gantt-row','folder inv36-folder':'.inv36-folder','inv36-action':'.inv36-action','inv36-primary':'.inv36-primary','inv36-hub-service':'.inv36-hub-service','inv36-week-service':'.inv36-week-service'};
  const target=groups[origin]?Array.from(root.querySelectorAll(groups[origin])).find(b=>b.dataset.service===s.id&&(!nav?.originId||b.dataset.hubOrigin===nav.originId)):null;
  if(target){const panel=target.closest('details');if(panel)panel.open=true;target.focus({preventScroll:true});target.scrollIntoView({block:'nearest',inline:'nearest'});if(origin==='gantt-row'&&nav)scroll.scrollLeft=nav.scrollLeft;}
  else if(origin==='inv36-hub-service'||origin==='inv36-week-service'){hubFocus(root,origin==='inv36-hub-service'?'centro-documental':'resumen-semanal');}else if(origin==='inv36-primary'||origin==='inv36-action'||origin==='folder inv36-folder'){focusTitle(root,origin==='inv36-primary'?'#resumen-inversion h2':origin==='inv36-action'?'#actions h2':'#services h2');}else{scroll.focus({preventScroll:true});g.scrollIntoView({block:'start'});}
 });
 detail.firstElementChild.append(back);
 const prog=E('div',null,'inv36-detail-progress'),stat=taskStats(s.stages),pLabel=E('div',null,'inv36-progress-label'),caption=E('div',null,'inv36-progress-caption');
 caption.append(E('span','Avance de coordinación'),E('small',progressCount(s)+' · cálculo automático sobre el alcance vigente'));if(stat.omitted)caption.append(E('small','El porcentaje refleja el alcance actual; excluir o reincorporar etapas puede cambiarlo sin trabajo nuevo.','scope-progress-note'));pLabel.append(E('strong',progressText(s)),caption);prog.append(pLabel,state36(s));if(s.action&&(s.blocked||s.status==='blocked'))prog.append(chip('Bloqueo','warn'));
 if(s.firm==='amplify'){const physical=E('div',null,'inv36-physical');physical.append(E('strong','Avance físico de obra: no disponible aquí'),E('span','Consulta Buildertrend. No hay sincronización API habilitada.'));prog.append(physical);}detail.append(prog);
 const split=E('div',null,'detail-split'),steps=E('div',null,'steps'),aside=E('aside',null,'next-box'),stages=Array.isArray(s.stages)?s.stages.filter(x=>x.applicable!==false):[];steps.append(E('h3','Hitos de coordinación aplicables'),E('p',TEMPLATE_SOURCE[s.id].level==='documented'?'Recorrido de referencia documentado.':'Recorrido de referencia sujeto a validación del alcance.','muted'));if(stat.omitted)steps.append(E('p',stat.omitted+' etapa(s) fuera de alcance o pendientes de validación no se muestran ni cuentan.','scope-hidden-note'));
 if(stages.length){
  const strip=E('div',null,'stage-strip');strip.setAttribute('role','img');strip.setAttribute('aria-label',stat.done+' de '+stat.total+' tareas aplicables completadas');
  for(const item of stages){const seg=E('i',null,'stage-segment '+item.state);seg.title=item.title+' · '+ST[item.state];seg.setAttribute('aria-hidden','true');strip.append(seg);}
  steps.append(strip,E('p',stat.total?'Solo cuentan las tareas aplicables. En proceso y en espera no se consideran completadas.':'Sin hitos aplicables; no se calcula un porcentaje de avance.','muted'));
  const closed=stages.filter(x=>x.state==='closed');if(closed.length){const ac=E('details',null,'accord');ac.append(E('summary','Ver '+closed.length+' '+(closed.length===1?'etapa cerrada':'etapas cerradas')));stages.forEach((x,i)=>{if(x.state==='closed')ac.append(stage(x,x.stageKey?Number(x.stageKey.split(':')[1])-1:i));});steps.append(ac);}
  stages.forEach((x,i)=>{if(x.state!=='closed')steps.append(stage(x,x.stageKey?Number(x.stageKey.split(':')[1])-1:i));});
 }else steps.append(E('p','Aún no hay hitos definidos. No se calcula el avance hasta registrar tareas aplicables.','muted'));
 if(s.id==='c1')steps.append(E('p','Casa Norte: plantilla pendiente de validación; servicio opcional para conservar y rentar después de entrega. No se han inventado etapas ni un plazo.','pilot-catalog-empty'));
 if(s.id==='m1')steps.append(E('p','Digital Launch: cinco días hábiles como objetivo, sujeto a entrega de información y aprobaciones.','muted'));
 aside.append(E('p',s.action?'QUÉ NECESITAS HACER':'QUÉ COORDINA EL EQUIPO','kicker'),E('h3',s.status==='closed'&&!open(s)?'Servicio concluido en la muestra':nextText(s)),state36(s));
 for(const [k,v] of [['Responsable',s.action?clientResponsible(s):responsible(s)],['Fecha objetivo',shortDate(s.target)],['Fecha confirmada',s.confirmed?shortDate(s.confirmed):'Sin confirmar'],['Última actualización de coordinación',s.updatedAt&&timeValid(s.updatedAt)?new Date(s.updatedAt).toLocaleString('es-MX')+' · guardado ficticio':'Registro de muestra, sin guardado posterior']]){const r=E('div',null,'meta-line');r.append(E('span',k),E('strong',v));aside.append(r);}
 sourceMetadata(aside,s,p);
 if(external[s.firm]){const e=external[s.firm],handoff=E('div',null,'inv36-handoff');handoff.append(E('strong',e.name+' · portal especializado'),E('p',e.handoff));const go=E('a','Ver referencia de '+(s.id==='c1'?'Casa Norte':e.name)+' ↓','inv36-portal-jump');go.href='#portal-'+s.firm;go.addEventListener('click',event=>{event.preventDefault();jumpPortal(root,p.id,s.firm,{type:'detail',id:s.id});});handoff.append(go);aside.append(handoff);}
 split.append(steps,aside);detail.append(split);root.append(detail);if(mine.length<=1)root.append(actions);appendClientHub(root,p,goDetail);appendWeeklyPreview(root,p,goDetail);
 const portals=title('Portales especializados','UNARA coordina; los trámites y reportes detallados permanecen en el sistema responsable.','inv36-portals folder-section');portals.id='portales-especializados';const cards=E('div',null,'inv36-portal-cards'),linked=ss.filter(s=>external[s.firm]);
 for(const s of linked){const e=external[s.firm],card=E('article',null,'card inv36-portal');card.id='portal-'+s.firm;accent(card,s);
  const hdr=E('div',null,'inv36-portal-head'),hdrCopy=E('div');hdrCopy.append(E('p',firmName(s),'kicker'),E('h3',e.name));hdr.append(logo(s),hdrCopy);card.append(hdr,E('p',e.summary,'inv36-portal-summary'),E('p',e.handoff,'inv36-portal-copy'),chip('Acceso de muestra · no conectado','warn'),chip(sourceReference(s),'warn'));sourceMetadata(card,s,p);
  const returnButton=button('↑ Volver a la referencia','secondary portal-return',()=>returnFromPortal(root,p.id,s.firm));returnButton.hidden=true;card.append(returnButton);
 if(e.example){const demo=E('details',null,'inv36-portal-example');demo.append(E('summary','Ver enlace de muestra (no operativo)'),E('code',e.example),E('p','Dirección ilustrativa no operativa. El acceso real requerirá la URL autorizada del expediente y el acceso propio del portal.'));card.append(demo);}else card.append(E('p','Destino y enlace autorizado para clientes aún no confirmados. No hay acceso operativo desde UNARA.','pilot-catalog-empty'));cards.append(card);
 }
 if(!linked.length)cards.append(E('p','Este expediente no tiene servicios con portal especializado configurados.','muted'));portals.append(cards);root.append(portals);
}

const input=(type,v='',required=false)=>{const x=E('input');x.type=type;x.value=v;x.required=required;return x;},field=(label,x)=>{const l=E('label',null,'field');l.append(E('span',label),x);return l;},select=(options,v)=>{const x=E('select');for(const [id,label] of options){const o=E('option',label);o.value=id;x.append(o)}x.value=v;return x;},check=(label,v)=>{const l=E('label',null,'check'),x=input('checkbox');x.checked=!!v;l.append(x,E('span',label));return {node:l,input:x};},submit=txt=>{const b=E('button',txt,'primary');b.type='submit';return b;},number=(v,min,max,step)=>{const x=input('number',v,true);x.min=min;x.max=max;x.step=step;return x;};
function confForm(p,creating){
 const expectedScopeRevision=p?.scopeRevision||1,draftKey=creating?'new':p.id;
 const form=E('form',null,'form config-form scope-config-form'),name=input('text',p?.name||'',true),client=input('text',p?.client||'',true),start=input('date',p?.start||''),deliveryDate=input('date',p?.deliveryDate||''),state=select(Object.entries(PJ).filter(([id])=>!creating||['draft','active'].includes(id)),p?.status||'draft'),route=select([['none','Sin Northreach'],['shovel','Shovel Ready'],['development','Desarrollo desde cero']],p?.route||'none'),fin=check('Con financiamiento',p?.finance),checks={},g=E('div',null,'form-grid');
 name.placeholder='Proyecto de muestra';client.placeholder='Cliente ficticio';name.maxLength=120;client.maxLength=120;
 form.append(E('h3',creating?'Nuevo proyecto de muestra':'Configurar '+p.name,'scope-form-title'));
 const startLabel=field('Fecha inicial de muestra',start);g.append(field('Nombre del proyecto',name),field('Cliente ficticio',client),startLabel,field('Estado',state));form.append(E('p','Usa solo etiquetas ficticias: no nombres reales, correos, documentos ni datos privados. Nombre y cliente visible son obligatorios; la fecha inicial es obligatoria al activar.','project-input-help'),g);
 const deliveryField=E('section',null,'delivery-date-fields');deliveryField.append(field('Fecha de entrega registrada (muestra)',deliveryDate),E('p','Fecha efectivamente registrada de entrega en esta muestra, no plazo objetivo. No cierra automáticamente ningún servicio; Casa Norte, por ejemplo, puede continuar después.','project-input-help'));form.append(deliveryField,E('h3','Servicios habilitados'));
 const c=E('div',null,'check-grid scope-service-checks');
 for(const f of F){const ch=check(f[1],p?active(p).some(s=>s.firm===f[0]):false);checks[f[0]]=ch.input;c.append(ch.node);}
 const options=E('section',null,'scope-options');options.append(E('h3','Alcance contratado · opciones de muestra'),E('p','Las etapas condicionales se incluyen solo por alcance. Excluir no borra el estado de trabajo ni suma tareas completadas.','muted'));
 const defaults=p?scopeOptions(p):{mercury:false,umberInstallation:false},mercury=check('Incluir apertura de cuenta Mercury',defaults.mercury),install=check('Incluir instalación y acabados UMBER · alcance por validar',defaults.umberInstallation);
 const special=E('div',null,'scope-option-grid');special.append(mercury.node,install.node,fin.node);options.append(special,E('p','Con financiamiento activa la etapa Lender de Northreach si se contrata esa ruta. Desarrollo desde cero mantiene seis referencias pendientes fuera del cálculo.','muted'));
 form.append(c,E('p','No se preseleccionan servicios en un alta. Un proyecto sin servicios es válido y no presenta avance. Casa Norte es opcional para conservar el inmueble en renta tras la entrega; su plantilla de etapas está pendiente.','pilot-contract-note'),field('Modalidad Northreach · excluyente',route),options);
 const preview=E('section',null,'scope-preview');preview.id='scope-preview';
 const confirmArea=E('section',null,'scope-confirm-area');const reason=input('text','');reason.maxLength=250;reason.placeholder='Ejemplo: se confirma alcance de muestra';const consent=check('Confirmo el cambio de alcance de este proyecto iniciado y entiendo su impacto en el avance',false);
 consent.input.id='scope-confirm';reason.id='scope-reason';confirmArea.append(E('h3','Confirmar impacto en proyecto iniciado'),E('p','Se considera iniciado un expediente activo o con etapas en proceso/cerradas. Se conservará el historial; el porcentaje puede cambiar por el alcance, no por trabajo nuevo. El motivo quedará en el historial ficticio.','muted'),field('Motivo de cambio de alcance (muestra)',reason),consent.node);
 const error=E('p','','scope-config-error');error.setAttribute('role','alert');error.hidden=true;
 const deliveryAck=check('Confirmo que la entrega de muestra está registrada; no implica concluir todos los servicios',false);deliveryAck.input.id='delivery-confirm';const deliveryConfirmPanel=E('section',null,'delivery-confirm-panel');deliveryConfirmPanel.append(E('strong','Confirmar entrega registrada'),deliveryAck.node);
 const save=submit(creating?'Alta no disponible':'Guardado no disponible');save.id='scope-save';const discard=button('Descartar borrador','secondary',()=>{scopeDrafts.delete(draftKey);render();focusTitle($('content'),'.scope-form-title');});const draftStatus=E('p','','scope-draft-status');draftStatus.setAttribute('role','status');draftStatus.setAttribute('aria-live','polite');const cancelClose=button(creating?'Cancelar alta · descartar y cerrar':'Cancelar edición · descartar y cerrar','secondary cancel-close',()=>{scopeDrafts.delete(draftKey);if(creating)showNew=false;else showConfig=false;tell(creating?'Alta cancelada. No se creó ningún expediente.':'Edición cancelada. Se conserva el expediente confirmado.','info');$('content')?.querySelector('[data-project-form="'+(creating?'new':'config')+'"]')?.focus();});const actions=E('div',null,'scope-form-actions');actions.append(save,discard,cancelClose);form.append(preview,confirmArea,deliveryConfirmPanel,error,draftStatus,actions);
 function configuration(){return{name:name.value,client:client.value,start:start.value,deliveryDate:['delivered','archived'].includes(state.value)?deliveryDate.value:'',status:state.value,route:route.value,finance:fin.input.checked,enabled:F.filter(f=>checks[f[0]].checked).map(f=>f[0]),scopeOptions:{mercury:mercury.input.checked,umberInstallation:install.input.checked}};}
 const initial=configuration();const remembered=scopeDrafts.get(draftKey);let restored=false;
 if(remembered&&remembered.revision===expectedScopeRevision){const d=remembered.values;name.value=d.name;client.value=d.client;start.value=d.start;deliveryDate.value=d.deliveryDate||'';state.value=d.status;route.value=d.route;fin.input.checked=d.finance;for(const k of Object.keys(checks))checks[k].checked=d.enabled.includes(k);mercury.input.checked=d.scopeOptions.mercury;install.input.checked=d.scopeOptions.umberInstallation;restored=true;}
 else if(remembered)scopeDrafts.delete(draftKey);
 function trackDraft(){const current=configuration(),dirty=JSON.stringify(current)!==JSON.stringify(initial);if(dirty){scopeDrafts.set(draftKey,{revision:expectedScopeRevision,values:current});draftStatus.textContent=(restored?'Borrador recuperado de esta visita. ':'Cambios sin guardar. ')+'La propuesta se conserva al navegar en esta pestaña; confirma de nuevo antes de guardar.';}else{scopeDrafts.delete(draftKey);draftStatus.textContent='Sin cambios en el formulario.';}discard.disabled=!dirty;}
 function updateConfirm(impact){const current=configuration(),needDelivery=deliveryNeedsConfirmation(p,current);confirmArea.hidden=!impact.requiresConfirm;reason.required=impact.requiresConfirm;deliveryConfirmPanel.hidden=!needDelivery;deliveryAck.input.required=needDelivery;save.disabled=(impact.requiresConfirm&&(!consent.input.checked||!reason.value.trim()))||(needDelivery&&!deliveryAck.input.checked);}
 function draw(){
  mercury.node.hidden=!checks.vision.checked;install.node.hidden=!checks.umber.checked;start.required=needsProjectStart(state.value);deliveryField.hidden=state.value!=='delivered'&&!(state.value==='archived'&&deliveryDate.value);deliveryDate.required=state.value==='delivered';deliveryDate.disabled=state.value==='archived';
  const draft=configuration(),impact=scopeImpact(p,draft),old=active(p||{services:[]}),next=impact.plan.services.filter(s=>s.enabled);
  preview.replaceChildren();
  const heading=E('div',null,'scope-preview-head');heading.append(E('h3','Vista previa de configuración'),chip('Propuesta local · sin guardar','warn'));preview.append(heading);projectLifecycle(preview,draft,{proposed:true,services:next});
  preview.append(E('p',p?'Revisión del alcance: '+(p.scopeRevision||1)+(impact.changed?' → '+((p.scopeRevision||1)+1):' · sin cambio de alcance'):'Revisión inicial del alcance: 1','muted'));
  preview.append(E('p','Plantillas: '+TEMPLATE_VERSION+' · las fuentes y pendientes de validación se muestran por servicio. No es un catálogo operativo aprobado para producción.','muted'));
  const counts=E('div',null,'scope-preview-metrics');
  for(const [label,b,a] of [['Servicios contratados',old.length,next.length],['Etapas aplicables',old.reduce((n,s)=>n+taskStats(s.stages).total,0),next.reduce((n,s)=>n+taskStats(s.stages).total,0)]]){
   const d=E('div',null,'scope-preview-stat');d.append(E('span',label),E('strong',p?b+' → '+a:String(a)));counts.append(d);
  }
  preview.append(counts);
  const none=F.filter(x=>!draft.enabled.includes(x[0])).map(x=>x[1]);preview.append(E('p',none.length?'No contratados: '+none.join(' · ')+' · no se incluyen en el Gantt ni en el avance.':'Todas las empresas de muestra están seleccionadas.','scope-not-contracted'));
  if(p&&p.route!==draft.route)preview.append(E('p','Cambio de modalidad Northreach: '+routeLabel(p.route)+' → '+routeLabel(draft.route)+'. La ruta anterior se conserva por separado; no se traslada avance a otra ruta.','scope-impact-warning'));
  if(impact.requiresConfirm)preview.append(E('p','Proyecto iniciado: el cambio modifica el alcance del seguimiento. No borra tareas ni historial; porcentajes antes y después pueden diferir sin nuevas tareas cerradas.','scope-impact-warning'));
  else if(!impact.changed&&p)preview.append(E('p','No hay cambios en los servicios o etapas aplicables de la propuesta.','muted'));
  if(!next.length)preview.append(E('p','No hay servicios habilitados en esta propuesta; el expediente no mostrará avances de servicios.','scope-empty'));
  for(const row of impact.rows){
   const svc=row.after||row.before,prov=TEMPLATE_SOURCE[svc.id],card=E('article',null,'scope-service-preview');card.dataset.scopeService=svc.id;card.dataset.scopeChange=row.kind;
   accent(card,svc);
   const titleRow=E('div',null,'scope-service-head'),labels=E('div',null,'scope-service-title');labels.append(E('small',firm(svc.firm)[1],'muted'),E('h4',svc.title));
   const changeLabels={keep:'Se conserva',alcance:'Cambia alcance',reactivate:'Se reactiva · estado conservado',add:'Se incorpora',remove:'Fuera de alcance · historial conservado'};
   titleRow.append(labels,chip(changeLabels[row.kind],row.kind==='remove'||row.kind==='alcance'?'warn':'ok'));card.append(titleRow,chip(prov.status,prov.level==='documented'?'ok':'warn'),E('p',prov.source,'scope-source'));
   const comparison=E('div',null,'scope-comparison');
   for(const [label,value] of [['Alcance vigente',scopeServiceDescription(row.before)],['Alcance propuesto',scopeServiceDescription(row.after)]]){const item=E('div',null,'scope-preview-stat');item.append(E('span',label),E('strong',value));comparison.append(item);}
   card.append(comparison);if(svc.id==='c1')card.append(E('p','Plantilla pendiente: no hay etapas ni duración aprobadas; sin porcentaje de avance. Solo coordinación del traspaso de renta si aplica.','pilot-catalog-empty'));
   if(row.changes.length)card.append(E('p',row.changes.join(' · ')+' · cambio de alcance, no de ejecución.','scope-impact-warning'));
   if(row.after?.status==='closed'&&taskStats(row.after.stages).percent!==100)card.append(E('p','El cierre del proceso requeriría revisión tras esta configuración. No se cambia su estado automáticamente.','scope-impact-warning'));
   const path=E('details',null,'scope-stage-detail'),reference=row.after||row.before;
   path.append(E('summary',row.after?'Ver etapas propuestas · '+taskStats(reference.stages).total+' aplicables / '+reference.stages.filter(x=>!x.applicable).length+' excluidas':'Ver etapas históricas conservadas · servicio no contratado en propuesta'));
   for(const step of reference.stages){const st=E('div',null,'scope-stage-row');st.dataset.stageKey=step.stageKey;st.dataset.applicable=String(!!row.after&&step.applicable);const caption=E('div',null,'scope-stage-text');caption.append(E('strong',step.stageKey.split(':')[1]+'. '+step.title),E('small',stageRule(svc.id,Number(step.stageKey.split(':')[1])-1).label));
    const label=!row.after?'Servicio no contratado':step.scopeKind==='pending-source'?'Alcance por confirmar':step.applicable?'Incluida':'No incluida';
    st.append(caption,chip(label,row.after&&step.applicable?'ok':step.scopeKind==='pending-source'?'warn':''),E('span',(row.kind==='add'?'Estado inicial: ':'Estado conservado: ')+(ST[step.state]||'En espera'),'muted'));path.append(st);
   }
   card.append(path);preview.append(card);
  }
  if(p){
   const historic=[...p.services.filter(s=>!s.enabled&&(s.revision||sourceRecord(s).revision||s.stages.some(x=>x.state==='active'||x.state==='closed'))),...(p.archive||[])].filter((s,i,a)=>a.findIndex(x=>x.id===s.id)===i);
   if(historic.length){const history=E('details',null,'scope-history-read');history.append(E('summary','Fuera de alcance · consultar estados históricos conservados'),E('p','No es parte del avance vigente. La consulta no reactiva ni cambia el proceso; se muestra el estado de ejecución conservado.','muted'));
    for(const s of historic){const card=E('section',null,'scope-history-service');card.dataset.historyService=s.id;card.append(E('h4',firm(s.firm)[1]+' · '+s.title),chip('No contribuye al avance actual'));
     sourceMetadata(card,s,p);for(const x of s.stages){const line=E('div',null,'scope-history-stage');line.append(E('span',x.stageKey.split(':')[1]+'. '+x.title),E('strong',ST[x.state]||'En espera'));card.append(line);}history.append(card);
    }preview.append(history);}
  }
  updateConfirm(impact);trackDraft();
 }
 route.addEventListener('change',()=>{checks.northreach.checked=route.value!=='none';});
 checks.northreach.addEventListener('change',()=>{if(!checks.northreach.checked)route.value='none';else if(route.value==='none')route.value='shovel';});
 for(const control of [...Object.values(checks),route,fin.input,mercury.input,install.input])control.addEventListener('change',()=>{consent.input.checked=false;deliveryAck.input.checked=false;error.hidden=true;draw();});
 for(const control of [name,client,start,state,deliveryDate]){const changed=()=>{consent.input.checked=false;deliveryAck.input.checked=false;error.hidden=true;control.removeAttribute('aria-invalid');if(control===state&&!['delivered','archived'].includes(state.value))deliveryDate.value='';draw();};control.addEventListener('input',changed);control.addEventListener('change',changed);}
 deliveryAck.input.addEventListener('change',()=>updateConfirm(scopeImpact(p,configuration())));
 consent.input.addEventListener('change',()=>updateConfirm(scopeImpact(p,configuration())));reason.addEventListener('input',()=>updateConfirm(scopeImpact(p,configuration())));
 form.addEventListener('submit',e=>{
  e.preventDefault();const draft=configuration(),impact=scopeImpact(p,draft);
  if(impact.requiresConfirm&&(!consent.input.checked||!reason.value.trim())){error.hidden=false;error.textContent='Revisa la vista previa, registra un motivo ficticio y confirma el impacto antes de guardar.';return;}
  const x={...draft,scopeConfirmed:consent.input.checked,scopeChangeReason:reason.value.trim(),scopeExpectedRevision:expectedScopeRevision,deliveryConfirmed:deliveryAck.input.checked};const result=projectCheck(x,p);if(result.error){const target={name,client,start,deliveryDate,status:state,route,finance:fin.input,deliveryConfirmed:deliveryAck.input}[result.field];error.hidden=false;error.textContent=result.error;error.tabIndex=-1;if(target){target.setAttribute('aria-invalid','true');target.focus({preventScroll:true});}else error.focus({preventScroll:true});return;}if(!form.reportValidity())return;
  if(!(creating?create(x):configure(x))){error.hidden=false;error.textContent=demoStoreState==='error'?demoStoreMessage:(!creating&&P()?.scopeRevision!==expectedScopeRevision?'El alcance vigente cambió desde que abriste el formulario. Descarta el borrador y vuelve a revisar la propuesta.':'Revisa campos, alcance y permisos de la demostración.');error.tabIndex=-1;error.focus({preventScroll:true});}
 });
 draw();return form;
}

function addClient(){return false;}
function adminClients(root){const c=title('Registro de clientes','Etiquetas ficticias y proyectos asociados.');const names=isSuper()?clients:[...new Set(list().map(p=>p.client))];c.append(table(['Cliente ficticio','Proyectos','Activos'],names.map(name=>[name,String(list().filter(p=>p.client===name).length),String(list().filter(p=>p.client===name&&p.status==='active').length)])));if(isSuper()){const f=E('form',null,'form client-form'),n=input('text','',true),err=E('p','','inline-feedback');err.setAttribute('role','alert');err.hidden=true;n.maxLength=120;n.placeholder='Inversionista de muestra';f.append(E('h3','Nuevo cliente ficticio'),field('Nombre de muestra',n),submit('Alta no disponible'),err);n.addEventListener('input',()=>inlineFormError(err,''));f.addEventListener('submit',e=>{e.preventDefault();if(f.reportValidity()&&!addClient(n.value))inlineFormError(err,'Escribe un nombre de muestra distinto. No se creó ningún cliente.');});c.append(f)}root.append(c);}
function adminProjects(root,p){const c=title('Gestiona tus expedientes','Desde prospecto hasta entrega. Archivar conserva el historial.');const g=E('div',null,'project-grid');for(const x of list()){const b=button(null,'project-card',()=>{pickProject(x.id);$('content')?.querySelector('[data-project-card="'+x.id+'"]')?.focus();});b.dataset.projectCard=x.id;b.setAttribute('aria-pressed',String(x.id===pid));b.append(E('strong',x.name),chip(PJ[x.status],publishedProject(x)?'ok':x.status==='draft'?'warn':''),E('span',x.client,'muted'),E('small',active(x).length+' servicios · '+(x.finance?'Con financiamiento':'Sin financiamiento')),E('small','Inicio: '+projectDisplayDate(x.start),'project-date-meta'));if(x.deliveryDate)b.append(E('small','Entrega registrada: '+projectDisplayDate(x.deliveryDate),'project-date-meta'));g.append(b)}c.append(g);if(isSuper()){const bar=E('div',null,'admin-actions');bar.append(button(showNew?'Cerrar alta · conservar borrador':'+ Nuevo proyecto','primary',()=>toggleProjectForm('new')),button(showConfig?'Cerrar configuración · conservar borrador':'Configurar proyecto seleccionado','secondary',()=>toggleProjectForm('config')));bar.children[0].dataset.projectForm='new';bar.children[1].dataset.projectForm='config';bar.children[0].setAttribute('aria-expanded',String(showNew));bar.children[1].setAttribute('aria-expanded',String(showConfig));c.append(bar);if(showNew)c.append(confForm(null,true));if(showConfig)c.append(confForm(p,false));}else c.append(E('p','Solo consulta de proyectos asignados.','body-pad muted'));root.append(c);}
/* Executive triage: synthetic coordination records only; not monitoring external systems. */
const EXEC_CUTOFF=HUB_CUTOFF,EXEC_WINDOW=7;
const EXEC_PRIORITY={alert:{label:'Alerta',rank:3},follow:{label:'Por atender',rank:2},info:{label:'Información pendiente',rank:1}};
const EXEC_DECISIONS=[
 {id:'decision-umber-1',project:'horizonte',service:'u1',state:'pending',date:'2026-11-25',responsible:'UMBER',title:'Confirmar criterio de alcance Look & Feel',description:'Decisión de coordinación ficticia marcada para revisión del equipo.'}
];
const execStates=new Map();let execReturn=null;
const execOwner=s=>typeof s.owner==='string'&&s.owner.trim()?s.owner.trim():'Sin responsable asignado';
const execDays=(value,cutoff=EXEC_CUTOFF)=>date(value)&&date(cutoff)?Math.round((Date.parse(value+'T00:00:00Z')-Date.parse(cutoff+'T00:00:00Z'))/86400000):null;
function executiveReasons(p,s,cutoff=EXEC_CUTOFF){
 if(!publishedProject(p)||!s||!s.enabled)return[];
 const out=[],owner=execOwner(s),open=s.status!=='closed',next=typeof s.next==='string'&&s.next.trim()?s.next.trim():'',blocked=!!s.blocked||s.status==='blocked';
 const add=(code,priority,title,detail,responsible=owner,source='UNARA · coordinación de muestra',when='',whenLabel='Fecha de registro')=>out.push({code,priority,title,detail,responsible,source,when,whenLabel});
 // Closed services do not become overdue from a stale target; inconsistent closure is a separate exception.
 if(!open&&(taskStats(s.stages).percent!==100||s.action||blocked)){
  add('closure','alert','Revisar coherencia del cierre',(taskStats(s.stages).total===0?'El servicio figura cerrado, pero no hay hitos aplicables registrados; revisa el cierre. No implica atraso de otro sistema.':'El servicio figura cerrado, pero quedan hitos no completados o seguimiento pendiente. No implica atraso de otro sistema.'));
 }
 if(open){
  if(blocked)add('blocked','alert','Bloqueo marcado','El proceso tiene un bloqueo explícito de coordinación. Consulta la ficha para revisar el siguiente paso.');
  const d=execDays(s.target,cutoff);
  if(d!==null&&next){
   if(d<0)add('overdue','alert','Objetivo vencido','La fecha objetivo quedó '+Math.abs(d)+' día(s) antes del corte de muestra. No certifica retraso físico ni falta de actividad.',owner,'UNARA · fecha objetivo de muestra',s.target,'Fecha objetivo');
   else if(d===0)add('today','follow','Vence en el corte','La fecha objetivo coincide con el corte de muestra; no está vencida.',owner,'UNARA · fecha objetivo de muestra',s.target,'Fecha objetivo');
   else if(d<=EXEC_WINDOW)add('upcoming','follow','Próximo vencimiento','Faltan '+d+' día(s) calendario respecto al corte de muestra.',owner,'UNARA · fecha objetivo de muestra',s.target,'Fecha objetivo');
  }
  if(!next)add('missing-next','info','Próximo paso no informado','No se ha definido un siguiente paso visible en la muestra. No se calcula atraso.');
  if(d===null)add('missing-date','info','Sin fecha objetivo válida',s.confirmed?'Hay una fecha confirmada registrada por separado, pero no objetivo válido para medir vencimiento.':'Fecha por definir. No se calcula atraso por ausencia de datos.');
  if(owner==='Sin responsable asignado')add('missing-owner','info','Sin responsable visible','Falta definir quién coordina el próximo paso; no equivale a un bloqueo.');
  if(s.action)add('investor-action','follow','Acción del inversionista marcada',next||'Falta describir la acción visible.','Inversionista');
  for(const d of EXEC_DECISIONS.filter(r=>r.project===p.id&&r.service===s.id&&r.state==='pending'&&date(r.date)&&r.date<=cutoff)){
   add('decision','follow','Decisión de coordinación pendiente',d.title+' · '+d.description+' Es una referencia fija al corte; no se resuelve desde el editor de esta demo.',d.responsible||'Sin responsable asignado','Decisión de muestra · referencia al corte',d.date);
  }
 }
 // Requested documents directed to the investor are follow-up references, not overdue reviews or extra obligations.
 if(open)for(const d of hubShared(HUB_DOCUMENTS,p).filter(r=>r.service===s.id&&r.status==='requested'&&r.clientAction&&(!r.date||r.date<=cutoff))){
  add('doc-request','follow','Solicitud documental al inversionista (referencia)',d.title+' · '+d.next+' Referencia fija al corte; puede corresponder al mismo próximo paso del servicio.',d.responsible||'Sin responsable asignado',d.source+' · solicitud de muestra al corte',d.date,'Fecha de referencia');
 }
 // Shared document reference only. Received is not proof that UNARA holds files or that external review is late.
 for(const d of hubShared(HUB_DOCUMENTS,p).filter(r=>r.service===s.id&&r.status==='received'&&(!r.date||r.date<=cutoff))){
  const desc=d.title+' · '+(d.next||'Sin siguiente acción informada.')+' Estado de referencia recibido; no acredita atraso ni recepción real en UNARA.';
  add('doc-review','info','Referencia pendiente de revisión',desc,d.responsible||'Sin responsable asignado',d.source+' · estado de referencia al corte',d.date,'Fecha de referencia');
 }
 return out;
}
function executiveScope(){
 if(mode!=='admin'||!['super','operations','legal'].includes(role))return[];
 return list().filter(p=>publishedProject(p)).map(p=>({project:p,services:active(p).filter(s=>ownedFirm(role,s.firm))}));
}
function executiveRows(){
 const rows=[];
 for(const {project,services} of executiveScope())for(const service of services){
  const reasons=executiveReasons(project,service);if(!reasons.length)continue;
  reasons.sort((a,b)=>EXEC_PRIORITY[b.priority].rank-EXEC_PRIORITY[a.priority].rank||a.code.localeCompare(b.code));
  rows.push({project,service,reasons,priority:reasons[0].priority,owner:execOwner(service)});
 }
 rows.sort((a,b)=>EXEC_PRIORITY[b.priority].rank-EXEC_PRIORITY[a.priority].rank||(date(a.service.target)?a.service.target:'9999').localeCompare(date(b.service.target)?b.service.target:'9999')||a.project.name.localeCompare(b.project.name)||a.service.title.localeCompare(b.service.title));
 return rows;
}
function executiveState(){if(!execStates.has(role))execStates.set(role,{project:'all',company:'all',responsible:'all',priority:'all'});return execStates.get(role);}
function openExecutiveRow(projectId,serviceId){
 const group=executiveScope().find(x=>x.project.id===projectId),service=group?.services.find(s=>s.id===serviceId);
 if(!group||!service)return false; // same local scope, rechecked at navigation.
 clearNotice();rememberSelection();execReturn={project:projectId,service:serviceId,role};pid=projectId;preferredProject=pid;sid=serviceId;rememberSelection();tab='editor';showNew=false;showConfig=false;clearOrigin();render();
 const h=$('content')?.querySelector('.admin-current-copy h3');if(h){h.tabIndex=-1;h.focus({preventScroll:true});h.scrollIntoView({block:'start',inline:'nearest'});}
 return true;
}
function appendExecutiveReturn(container){
 if(!execReturn||execReturn.role!==role||execReturn.project!==pid)return;
 const b=button('↑ Volver a bandeja de excepciones','secondary exec-return',()=>{
  const origin=execReturn;execReturn=null;clearNotice();tab='exceptions';render();
  const root=$('content'),match=Array.from(root.querySelectorAll('.exec-open')).find(x=>x.dataset.project===origin.project&&x.dataset.service===origin.service);
  if(match){match.focus({preventScroll:true});match.scrollIntoView({block:'nearest'});}else{const title=root.querySelector('.exec-inbox h2');if(title){title.tabIndex=-1;title.focus({preventScroll:true});title.scrollIntoView({block:'start'});}}
 });
 container.append(b);
}
function renderExecutiveInbox(root){
 if(mode!=='admin'||!['super','operations','legal'].includes(role))return;
 const scoped=executiveScope(),rows=executiveRows(),state=executiveState();
 const section=title('Prioridades del equipo','Revisa alertas y próximos pasos por servicio; no duplica tareas externas.','card exec-inbox');
 const meta=E('div',null,'exec-context');
 meta.append(E('strong','Cartera de muestra · '+scoped.length+' '+(scoped.length===1?'expediente con seguimiento':'expedientes con seguimiento')),E('span','Corte fijo: '+hubDate(EXEC_CUTOFF)+' · próximos '+EXEC_WINDOW+' días; no el reloj real.','muted'),E('span','Los filtros de esta bandeja revisan la cartera activa de tu ámbito, incluidas entregas con seguimiento. Abre una ficha para ver su expediente.','muted'));
 const summary=E('div',null,'exec-metrics');
 for(const key of ['alert','follow','info']){
  const n=E('div',null,'exec-metric exec-'+key);n.append(E('strong',rows.filter(x=>x.priority===key).length),E('span',key==='alert'?'Servicios con alerta':key==='follow'?'Servicios por atender':'Servicios con información pendiente'));summary.append(n);
 }
 const total=E('p','Totales de servicios agrupados sin filtros. Cada servicio cuenta una vez según su motivo de mayor prioridad.','exec-total-note');
 const criteria=E('details',null,'exec-criteria');criteria.append(E('summary','Cómo se calculan las prioridades'));
 const rules=E('div',null,'exec-rule-grid');
 for(const [key,txt] of [['alert','Bloqueo marcado, objetivo vencido de un servicio abierto con próximo paso o cierre incoherente.'],['follow','Objetivo que vence en el corte o dentro de 7 días, acción del inversionista marcada, solicitud documental dirigida al inversionista o decisión registrada de muestra. Las referencias al corte no se resuelven desde el editor.'],['info','Fecha, responsable o paso sin definir; referencia documental recibida sin revisión registrada. No se afirma atraso por estos motivos.']]){
  const r=E('div',null,'exec-rule');r.append(E('strong',EXEC_PRIORITY[key].label,'exec-'+key),E('span',txt));rules.append(r);
 }
 criteria.append(rules,E('p','Expedientes activos o entregados con seguimiento y servicios habilitados. Una fecha antigua de un servicio cerrado no se trata como atraso. No se monitorea Canopy ni Buildertrend.','muted'));
 const filterBar=E('div',null,'exec-filter-bar'),projectOpts=[['all','Todos los expedientes activos'],...scoped.map(x=>[x.project.id,x.project.name])];
 const firms=[...new Set(scoped.flatMap(x=>x.services.map(s=>s.firm)))],owners=[...new Set(rows.flatMap(x=>[x.owner,...x.reasons.map(r=>r.responsible)]))].sort((a,b)=>a.localeCompare(b,'es'));
 const project=hubSelect('Expediente','exec-project',projectOpts,state.project),company=hubSelect('Empresa','exec-company',[['all','Todas las empresas'],...firms.map(x=>[x,firm(x)[1]])],state.company);
 const responsible=hubSelect('Responsable','exec-responsible',[['all','Todos los responsables'],...owners.map(x=>[x,x])],state.responsible);
 const priority=hubSelect('Prioridad del servicio','exec-priority',[['all','Todas las prioridades'],...Object.entries(EXEC_PRIORITY).map(([v,l])=>[v,l.label])],state.priority);
 Object.assign(state,{project:project.sel.value,company:company.sel.value,responsible:responsible.sel.value,priority:priority.sel.value});
 const clear=button('Limpiar filtros','secondary exec-clear',()=>{for(const k of Object.keys(state))state[k]='all';for(const f of [project,company,responsible,priority])f.sel.value='all';draw();});
 filterBar.append(project.wrap,company.wrap,responsible.wrap,priority.wrap,clear);
 const count=E('p','','exec-result-count');count.setAttribute('role','status');count.setAttribute('aria-live','polite');count.setAttribute('aria-atomic','true');
 const listNode=E('div',null,'exec-list');
 function exceptionCard(row){
  const {project:p,service:s,reasons,priority:prio,owner}=row,card=E('article',null,'exec-row exec-'+prio);card.dataset.execProject=p.id;card.dataset.execService=s.id;card.dataset.execPriority=prio;
  const lead=E('div',null,'exec-row-main'),companyLine=E('div',null,'exec-company-line');companyLine.append(logo(s),E('span',firm(s.firm)[1]+' · '+p.name));
  lead.append(companyLine,E('h3',s.title),E('span',EXEC_PRIORITY[prio].label,'exec-priority-badge'),E('small','Avance de coordinación: '+progressText(s)+' · '+progressCount(s),'muted'));
  const data=E('div',null,'exec-row-meta');
  hubMeta(data,'Responsable visible',owner);hubMeta(data,'Próximo paso',s.next||'Sin próximo paso informado');hubMeta(data,'Fecha objetivo',date(s.target)?hubDate(s.target):'Sin fecha definida');
  hubMeta(data,'Fecha confirmada',date(s.confirmed)?hubDate(s.confirmed):'Sin confirmar');hubMeta(data,'Estado del servicio',SS[s.status]||'Sin estado');hubMeta(data,'Última actualización de coordinación',s.updatedAt&&timeValid(s.updatedAt)?new Date(s.updatedAt).toLocaleString('es-MX')+' · guardado ficticio':'Muestra inicial; sin guardado posterior');
  const why=E('div',null,'exec-reasons');
  for(const r of reasons){
   const item=E('div',null,'exec-reason exec-'+r.priority);item.dataset.reasonCode=r.code;
   const reasonHead=E('div',null,'exec-reason-header');reasonHead.append(E('strong',r.title),E('span',EXEC_PRIORITY[r.priority].label,'exec-reason-label'));item.append(reasonHead,E('p',r.detail),E('small','Responsable: '+r.responsible+' · Origen: '+r.source+(date(r.when)?' · '+r.whenLabel+': '+hubDate(r.when):r.code==='doc-review'?' · Sin fecha registrada':'')));
   why.append(item);
  }
  const actions=E('div',null,'exec-row-actions'),b=button('Ver ficha del proceso →','primary exec-open',()=>openExecutiveRow(p.id,s.id));b.dataset.project=p.id;b.dataset.service=s.id;b.setAttribute('aria-label','Ver ficha de '+s.title+' en '+p.name);actions.append(b,E('small',reasons.length+' '+(reasons.length===1?'motivo':'motivos')+' · sin notificar','muted'));
  card.append(lead,data,why,actions);return card;
 }
 function draw(){
  const filtered=rows.filter(x=>(state.project==='all'||x.project.id===state.project)&&(state.company==='all'||x.service.firm===state.company)&&(state.responsible==='all'||x.owner===state.responsible||x.reasons.some(r=>r.responsible===state.responsible))&&(state.priority==='all'||x.priority===state.priority));
  count.textContent=filtered.length+' de '+rows.length+' servicios con excepciones de muestra. El filtro responsable coincide con el responsable visible o alguno de los motivos.';
  listNode.replaceChildren();
  if(!rows.length)listNode.append(E('p','No se registran excepciones según estos datos de muestra. No garantiza el estado real de los proyectos ni la actividad de sistemas especializados.','exec-empty'));
  else if(!filtered.length)listNode.append(E('p','No hay coincidencias con estos filtros. Cambia los criterios o pulsa Limpiar filtros.','exec-empty'));
  else filtered.forEach(x=>listNode.append(exceptionCard(x)));
 }
 for(const [k,f] of [['project',project],['company',company],['responsible',responsible],['priority',priority]])f.sel.addEventListener('change',()=>{state[k]=f.sel.value;draw();});
 section.append(meta,summary,total,filterBar,count,listNode,criteria,E('p','Revisión de muestra. Guarda cambios en la ficha autorizada. No se envían alertas.','exec-foot'));
 root.append(section);draw();
}

function adminEditor(root,p){
 const c=title('Servicios del expediente','Elige una empresa. Actualiza solo los servicios que te corresponden.');appendExecutiveReturn(c);
 const list=active(p),s=list.find(x=>x.id===sid)||list[0];
 if(!s){const empty=E('div',null,'journey-empty');empty.append(E('p','No hay servicios habilitados en este expediente. El avance no se calcula.','muted'));if(isSuper())empty.append(button('Configurar servicios','secondary',()=>{openAdminTab('projects');showConfig=true;render();focusTitle($('content'),'.scope-form-title');}));c.append(empty);root.append(c);return;}
 const nav=E('section',null,'admin-service-nav');nav.setAttribute('aria-label','Carpetas de compañía y proceso');
 const navHead=E('div',null,'admin-service-nav-head');navHead.append(E('h3','Empresas y procesos'),E('span',list.length+' '+(list.length===1?'servicio habilitado':'servicios habilitados'),'muted'));nav.append(navHead);
 const folders=E('div',null,'admin-service-folders');
 for(const q of list){
  const b=button(null,'admin-service-folder',()=>{pick(q.id);root.querySelector('.admin-service-folder[data-service="'+q.id+'"]')?.focus();});
  accent(b,q);b.dataset.service=q.id;b.setAttribute('aria-pressed',String(q.id===s.id));const editable=canEdit(q);
  b.setAttribute('aria-label',firm(q.firm)[1]+', '+q.title+', '+progressText(q)+' calculado. '+(editable?'Formulario de referencia':'Solo consulta'));
  const label=E('span',null,'admin-service-folder-main'),copy=E('span',null,'admin-service-folder-copy');copy.append(E('strong',firm(q.firm)[1]),E('small',q.title));label.append(logo(q),copy);
  const meta=E('span',null,'admin-service-folder-meta');meta.append(E('strong',progressText(q)),E('span',progressCount(q),'folder-progress-count'),E('span',editable?'Formulario de referencia':'Solo consulta','folder-permission'+(editable?' editable':'')));b.append(label,meta);folders.append(b);
 }
 nav.append(folders);c.append(nav);
 const head=E('div',null,'admin-current-service');accent(head,s);const detail=E('div',null,'admin-current-copy');detail.append(E('p',firm(s.firm)[1],'kicker'),E('h3',s.title));const tags=E('div',null,'admin-current-tags');tags.append(status(s),chip(canEdit(s)?'Formulario de referencia · sin guardar':'Solo consulta',canEdit(s)?'ok':''));head.append(detail,tags);c.append(head);
 const ownMeta=(container,caption,value)=>{const m=E('div',null,'ops-meta');m.append(E('span',caption),E('strong',value));container.append(m);};
 if(!canEdit(s)){
  const r=E('div',null,'read-note ops-read');r.append(E('strong','Solo consulta · '+progressText(s)),E('p',s.next||'Sin próximo paso informado'));
  const m=E('div',null,'ops-meta-grid');ownMeta(m,'Responsable del próximo paso',s.owner||'Sin responsable asignado');ownMeta(m,'Fecha objetivo',s.target||'Sin fecha definida');r.append(m,E('p','Vista de coordinación. No puedes cambiar este servicio ni consultar sus tareas internas.','muted'));c.append(r,pilotSourcePanel(p,s));root.append(c);return;
 }
 const f=E('form',null,'form edit-form ops-editor'),key=serviceKey(p.id,s.id),fields={},next=E('textarea');
 next.maxLength=500;next.value=s.next;next.rows=3;next.placeholder='Sin próximo paso informado';fields.next=next;
 const calc=E('div',null,'calculated-progress'),calcValue=E('output',progressText(s),'calculated-number'),calcCount=E('span',progressCount(s),'calculated-count');calcValue.setAttribute('aria-live','polite');calc.append(E('span','Avance automático','calculated-label'),calcValue,calcCount,E('small','Cerradas ÷ aplicables. El porcentaje se calcula automáticamente.','muted'));
 const top=E('div',null,'ops-edit-top');const nextField=field('Próximo paso visible',next);nextField.append(E('small','Escribe qué sigue. No incluyas documentos, datos privados o notas de otra empresa.','review-field-help'));top.append(calc,nextField);f.append(top);
 let ext;
 if(isSuper()){
  const meta=E('div',null,'ops-meta-grid'),owner=input('text',s.owner),td=input('date',s.target);
  owner.maxLength=120;owner.placeholder='Sin responsable asignado';fields.owner=owner;fields.target=td;
  meta.append(field('Responsable visible del próximo paso',owner),field('Fecha objetivo (opcional)',td));f.append(meta,E('p','Responsable visible: no asigna permisos. Fecha objetivo: estimada, no confirmada.','ops-help muted'));
  const options=E('details',null,'ops-configuration');options.append(E('summary','Configuración del proceso · Superadmin'));
  const st=select(Object.entries(SS),s.status),cd=input('date',s.confirmed),from=number(s.start??'',0,36,'any'),to=number(s.end??'',0,36,'any'),block=check('Existe bloqueo',s.blocked),action=check('Requiere acción del cliente',s.action),g=E('div',null,'form-grid');
  from.required=false;to.required=false;
  Object.assign(fields,{status:st,confirmed:cd,start:from,end:to,blocked:block.input,action:action.input});
  g.append(field('Estado',st),field('Fecha confirmada',cd),field('Mes inicial',from),field('Mes de cierre',to));options.append(g,E('p','Sin plazo: deja ambos meses vacíos. No se calcula una barra de tiempo sin planificación.','muted'),block.node,action.node);f.append(options);ext={st,owner,td,cd,from,to,block,action};
 }else{
  const meta=E('div',null,'ops-meta-grid ops-read-meta');ownMeta(meta,'Responsable visible · solo consulta',s.owner||'Sin responsable asignado');ownMeta(meta,'Fecha objetivo · solo consulta',s.target||'Sin fecha definida');f.append(meta,E('p','Tu perfil puede actualizar próximo paso y estados de tareas aplicables. La configuración, fechas y responsable visible corresponden a Superadmin.','ops-help muted'));
 }
 const stages=E('section',null,'ops-stage-section'),stageHead=E('div',null,'ops-section-heading');stageHead.append(E('h3','Tareas del servicio'),E('span','Solo cuentan las etapas aplicables cerradas. Cambia alcance en Proyectos.','muted'));stages.append(stageHead);
 const stageGrid=E('div',null,'ops-stage-grid'),stageInputs=[];
 for(const x of s.stages){
  const options=Object.entries(ST).filter(([k])=>k!=='noapp'),a=select(options,x.state);
  a.dataset.taskState='true';if(x.applicable===false)a.disabled=true;stageInputs.push(a);
  const row=field(x.title+(x.applicable===false?' · fuera del alcance (estado conservado)':x.optional?' · según alcance':''),a);row.classList.add('ops-stage-label');if(x.applicable===false){row.classList.add('scope-excluded-editor');row.append(E('small',x.scopeReason,'muted'));}stageGrid.append(row);
 }
 if(!stageInputs.length)stages.append(E('p',s.id==='c1'?'Plantilla Casa Norte pendiente de validación · sin etapas aprobadas; el avance no se calcula.':'Sin hitos aplicables; el avance no se calcula.','muted'));else stages.append(stageGrid);
 f.append(stages);
 const stagePatch=()=>s.stages.map((x,i)=>({...x,state:stageInputs[i].value}));
 function getPatch(){const patch={next:next.value,stages:stagePatch()};if(ext){const a=ext;Object.assign(patch,{status:a.st.value,owner:a.owner.value,target:a.td.value,confirmed:a.cd.value,start:a.from.value===''?null:Number(a.from.value),end:a.to.value===''?null:Number(a.to.value),blocked:a.block.input.checked,action:a.action.input.checked});}return patch;}
 function putPatch(patch){next.value=patch.next??'';stageInputs.forEach((a,i)=>{a.value=patch.stages[i].state;});if(ext){const a=ext;a.st.value=patch.status;a.owner.value=patch.owner??'';a.td.value=patch.target??'';a.cd.value=patch.confirmed??'';a.from.value=Number.isFinite(patch.start)?patch.start:'';a.to.value=Number.isFinite(patch.end)?patch.end:'';a.block.input.checked=!!patch.blocked;a.action.input.checked=!!patch.action;}}
 function canonical(){const out={};for(const k of fieldsFor(role))out[k]=cp(s[k]);return out;}
 let committed=canonical(),saving=false,revision=s.revision||0;
 const was=operationDrafts.get(key);if(was){putPatch(was.patch);revision=was.revision;}
 const current=E('div',null,'ops-save-bar'),left=E('div',null,'ops-save-copy'),state=E('p','Sin cambios','ops-save-state'),notes=E('p',s.updatedAt?'Último guardado de muestra: '+new Date(s.updatedAt).toLocaleString('es-MX')+' · revisión '+(s.revision||0):'Los borradores no guardados no se recuperan al recargar.','muted');
 state.setAttribute('role','status');state.setAttribute('aria-live','polite');state.setAttribute('aria-atomic','true');left.append(state,notes);
 const btns=E('div',null,'ops-save-actions'),save=submit('Guardado no disponible'),cancel=button('Descartar borrador','secondary',()=>{if(saving)return;operationDrafts.delete(key);committed=canonical();revision=s.revision||0;putPatch(committed);refresh();next.focus();});
 save.classList.add('ops-save-button');btns.append(cancel,save);current.append(left,btns);f.append(current);
 const failure=check('Guardado de prueba no disponible',false);failure.input.dataset.simulateFailure='true';failure.node.classList.add('ops-failure');f.append(failure.node);
 const inputs=[...Object.values(fields),...stageInputs],error=E('p','','ops-field-error');error.id='ops-form-error';error.setAttribute('role','alert');error.hidden=true;f.append(error);
 function showState(kind,text){state.dataset.saveState=kind;state.textContent=text;f.setAttribute('aria-busy',String(kind==='saving'));}
 function dirty(){const current=getPatch();return fieldsFor(role).some(k=>JSON.stringify(current[k])!==JSON.stringify(committed[k]));}
 function refresh(){
  const now={stages:stagePatch()};calcValue.textContent=progressText(now);calcCount.textContent=progressCount(now);
  const changed=dirty(),stale=revision!==(s.revision||0);save.disabled=saving||!changed||stale;cancel.disabled=saving||!changed;
  if(changed){operationDrafts.set(key,{patch:getPatch(),revision});showState(stale?'error':'dirty',stale?'Hay una revisión nueva. Descarta el borrador para cargar los datos actuales.':'Cambios sin guardar · borrador de esta sesión');}
  else{operationDrafts.delete(key);revision=s.revision||0;save.disabled=true;showState('clean','Sin cambios');}
  error.hidden=true;error.textContent='';for(const input of inputs){input.removeAttribute('aria-invalid');if(input.getAttribute('aria-describedby')==='ops-form-error')input.removeAttribute('aria-describedby');}
 }
 for(const input of inputs){input.addEventListener('input',refresh);input.addEventListener('change',refresh);}
 refresh();
 if(was&&dirty()&&was.revision!==(s.revision||0)){showState('error','Hay una revisión nueva. Descarta este borrador para cargar los datos actuales.');}
 f.addEventListener('submit',async event=>{
  event.preventDefault();if(saving||!dirty())return;
  if(revision!==(s.revision||0)){save.disabled=true;showState('error','No se guardaron los cambios. Revisión desactualizada.');error.hidden=false;error.textContent='Hay una revisión más reciente. Descarta el borrador para cargar los datos actuales.';return;}
  const patch=getPatch(),validated=validatePatch(s,patch,role);
  if(validated.error){showState('error','No se guardaron los cambios.');error.hidden=false;error.textContent=validated.error;if(validated.field){const target=validated.field==='stages'?stageInputs[0]:fields[validated.field];const box=target?.closest('details');if(box)box.open=true;if(target){target.setAttribute('aria-invalid','true');target.setAttribute('aria-describedby',error.id);target.focus();}}return;}
  if(!f.reportValidity()){showState('error','Revisa los campos antes de guardar.');return;}
  const context={project:p.id,role,revision},fail=failure.input.checked,enabled=inputs.filter(x=>!x.disabled);
  failure.input.checked=false;failure.input.disabled=true;saving=true;save.disabled=true;cancel.disabled=true;enabled.forEach(x=>x.disabled=true);showState('saving','Guardando en esta demo…');error.hidden=true;
  await new Promise(resolve=>setTimeout(resolve,120));
  if(!sessionActive()||!f.isConnected){msg='Guardado cancelado al cambiar de vista. Tu borrador de este servicio se conserva en esta sesión; vuelve al proceso para guardarlo.';noticeKind='warn';const notice=$('notice');if(notice){notice.hidden=false;notice.dataset.kind=noticeKind;notice.textContent=msg;}return;}
  const result=fail?{error:'Fallo simulado: no se aplicaron cambios. Reintenta para guardar.'}:commitService(s.id,patch,context);
  saving=false;failure.input.disabled=false;enabled.forEach(x=>x.disabled=false);
  if(result.error){save.disabled=false;cancel.disabled=false;showState('error','No se guardaron los cambios.');error.hidden=false;error.textContent=result.error;return;}
  committed=canonical();revision=s.revision||0;putPatch(committed);operationDrafts.delete(key);refresh();
  if(result.unchanged){showState('clean','Sin cambios');return;}
  showState('saved','Guardado en esta pestaña · revisión '+revision+' ✓');notes.textContent='Último guardado de muestra: '+new Date(s.updatedAt).toLocaleString('es-MX')+' · recuperable al recargar esta pestaña.';
  const folder=folders.querySelector('[data-service="'+s.id+'"]');if(folder){folder.querySelector('.admin-service-folder-meta strong').textContent=progressText(s);folder.querySelector('.folder-progress-count').textContent=progressCount(s);folder.setAttribute('aria-label',firm(s.firm)[1]+', '+s.title+', '+progressText(s)+' calculado. Formulario de referencia');}
  tags.replaceChildren(status(s),chip('Formulario de referencia · sin guardar','ok'));const sourcePanel=c.querySelector('.pilot-source-admin');if(sourcePanel)sourcePanel.replaceWith(pilotSourcePanel(p,s));
 });
 c.append(f,pilotSourcePanel(p,s));appendTeamReferenceNotes(c,p,s);root.append(c);
}

function table(cols,rows){const w=E('div',null,'table-scroll'),t=E('table'),h=E('thead'),hr=E('tr');cols.forEach(x=>hr.append(E('th',x)));h.append(hr);t.append(h);const body=E('tbody');for(const row of rows){const tr=E('tr');for(const x of row){const td=E('td');if(typeof x==='string')td.textContent=x;else td.append(x);tr.append(td)}body.append(tr)}t.append(body);w.append(t);return w;}
const pname=id=>projects.find(p=>p.id===id)?.name||'Todos los proyectos';
function adminUsers(root,p){const c=title('Usuarios e invitaciones','Simulación de accesos; no crea cuentas ni envía correos.'),ps=users.filter(x=>isSuper()||scope(x.project)),iv=invites.filter(x=>scope(x.project));c.append(E('h3','Asignaciones de muestra','body-pad'),table(['Usuario','Rol','Proyecto','Estado'],ps.map(x=>[x.name,RO[x.role],pname(x.project),'Activo'])),E('h3','Invitaciones','body-pad'),table(['Correo ficticio','Perfil','Proyecto','Estado','Acción'],iv.map(x=>[x.mail,RO[x.role],pname(x.project),x.state,isSuper()&&x.state==='Pendiente'?button('Cancelar','secondary',()=>cancel(x.id)):E('span','—')])));if(isSuper()){const f=E('form',null,'form invite-form'),mail=input('email','',true),err=E('p','','inline-feedback');err.setAttribute('role','alert');err.hidden=true;mail.placeholder='persona@example.invalid';mail.maxLength=180;const op=projects.filter(x=>x.status==='active'),dest=select(op.map(x=>[x.id,x.name]),op.some(x=>x.id===p.id)?p.id:op[0]?.id||''),r=select([['client','Cliente'],['operations','Operaciones'],['legal','LegalKey']],'client');f.append(E('h3','Invitar al portal · Simulación'),field('Correo de ejemplo',mail),field('Proyecto activo',dest),field('Perfil asignado',r),E('p','Solo dominios de ejemplo. No se envía correo ni se otorgan accesos.','muted'),submit('Invitación no disponible'),err);const send=f.querySelector('button[type=submit]');if(!op.length){dest.disabled=true;mail.disabled=true;r.disabled=true;send.disabled=true;inlineFormError(err,'No hay proyectos activos de muestra disponibles. Activa uno antes de registrar una invitación simulada.');}f.addEventListener('input',()=>{if(op.length)inlineFormError(err,'');});f.addEventListener('submit',e=>{e.preventDefault();if(!op.length)return;if(f.reportValidity()&&!invite(mail.value,r.value,dest.value))inlineFormError(err,'Usa un correo de ejemplo, un proyecto activo y evita duplicados. No se registró la invitación.');});c.append(f)}else c.append(E('p','Solo Superadmin puede crear o cancelar invitaciones.','body-pad muted'));root.append(c);}
function catalog(root,p){
 const c=title('Plantillas de procesos',p.name+' · Catálogo de empresas contratables. Plantilla documentada o pendiente es independiente de si se contrata el servicio.'),g=E('div',null,'catalog-grid'),rail=E('div',null,'catalog-rail pilot-catalog-rail'),d=E('div',null,'catalog-detail');
 const contracted=t=>active(p).some(s=>s.id===t[0]);
 for(const t of T){const b=button(null,'secondary',()=>{template=t[0];render();$('content')?.querySelector('[data-template="'+template+'"]')?.focus();});b.dataset.template=t[0];b.setAttribute('aria-pressed',String(template===t[0]));b.append(E('strong',t[2]),E('small',firm(t[1])[1]+' · '+(contracted(t)?'Contratado':'No contratado')));const tags=E('span',null,'pilot-template-status');tags.append(chip(templateLabel(t[0]),TEMPLATE_SOURCE[t[0]].level==='documented'?'ok':'warn'));b.append(tags);rail.append(b);}
 const t=T.find(x=>x[0]===template)||T[0],meta=TEMPLATE_SOURCE[t[0]],tags=E('div',null,'pilot-template-status');tags.append(chip(contracted(t)?'Servicio contratado':'Servicio no contratado',contracted(t)?'ok':''),chip(templateLabel(t[0]),meta.level==='documented'?'ok':'warn'),chip(meta.status,meta.level==='documented'?'ok':'warn'));
 d.append(E('h3',firm(t[1])[1]+' · '+t[2]),tags,E('p',meta.source,'scope-source'),E('p','Versión de referencia: '+TEMPLATE_VERSION+'. El alcance por proyecto se revisa en Proyectos y configuración; aquí no se alteran etapas.','muted'));
 if(!CATALOG[t[0]].length)d.append(E('p','Recorrido pendiente de validación · no hay etapas aprobadas ni duración confirmada. No computa avance hasta definir etapas aplicables.','pilot-catalog-empty'));
 CATALOG[t[0]].forEach((x,i)=>{const rule=stageRule(t[0],i),row=E('div',null,'stage-line scope-catalog-row'),caption=E('span',x.title);caption.append(E('small',rule.label));row.append(E('span',String(i+1).padStart(2,'0'),'stage-num'),caption,chip(rule.kind==='pending-source'?'Pendiente · no computa':rule.kind==='required'?'Referencia incluida':'Condicional / opcional',rule.kind==='pending-source'?'warn':''));d.append(row);});
 const platform=PILOT_PLATFORMS[t[1]];d.append(E('p',platform?'Sistema especializado: '+platform.name+' · referencia; sin conexión habilitada.':'Sistema de referencia: seguimiento UNARA. No se confirmó plataforma especializada.','pilot-contract-note'));
 g.append(rail,d);c.append(g);root.append(c);
}

function logview(root){
 const c=title('Historial de cambios',P().name+' · Registro ficticio de esta pestaña; no constituye una auditoría de producción.');
 const items=history.filter(x=>x.project===pid&&scope(x.project)&&(isSuper()||['service','reference'].includes(x.kind)&&ownedFirm(role,x.firm)));
 if(!items.length){c.append(E('p','Aún no hay actualizaciones guardadas para este expediente y perfil de muestra.','body-pad muted'));root.append(c);return;}
 const list=E('div',null,'ops-history-list');
 for(const x of items){
  const item=E('article',null,'ops-history-entry'),head=E('div',null,'ops-history-head'),copy=E('div');
  const f=['service','reference'].includes(x.kind)?firm(x.firm)?.[1]:'';
  copy.append(E('strong',pname(x.project)+(f?' · '+f:'')),E('p',x.message,'ops-history-message'));
  head.append(copy,chip(x.kind==='service'?'Rev. '+x.revision:x.kind==='reference'?'Referencia · rev. '+x.revision:'Muestra',x.kind==='service'?'ok':''));item.append(head);
  const when=x.time==='Registro inicial'?x.time:new Date(x.time).toLocaleString('es-MX');item.append(E('p',(x.actor||'Muestra inicial')+' · '+when,'muted'));
  if(Array.isArray(x.changes)&&x.changes.length){
   const d=E('details',null,'ops-history-detail');d.append(E('summary','Ver '+x.changes.length+' cambio(s) · antes y después'));
   const rows=E('div',null,'ops-history-rows');
   for(const y of x.changes){const r=E('div',null,'ops-history-change');r.append(E('strong',y.field),E('span','Antes: '+(y.before||'Sin definir')),E('span','Después: '+(y.after||'Sin definir')));rows.append(r);}d.append(rows);item.append(d);
  }
  list.append(item);
 }
 c.append(list);root.append(c);
}

function render(){
 if(!sessionActive())return;
 displayStore();if(mode==='admin'&&!isSuper()&&!['exceptions','editor','history'].includes(tab))tab='editor';
 const p=P(),root=$('content'),pr=$('project');root.replaceChildren();pr.replaceChildren();
 const portfolio=mode==='admin'&&['exceptions','clients','users'].includes(tab);
 $('view-client').setAttribute('aria-pressed',String(mode==='client'));$('view-admin').setAttribute('aria-pressed',String(mode==='admin'));$('role-wrap').hidden=mode!=='admin';$('role').value=role;$('admin-nav').hidden=mode!=='admin';
 const adminTitles={exceptions:'Pendientes de coordinación',projects:'Proyectos',editor:'Avances por empresa',clients:'Clientes',users:'Accesos',catalog:'Plantillas',history:'Historial'};
 $('workspace-kicker').textContent=mode==='admin'?'ADMINISTRACIÓN · '+RO[role]+' · DEMO':'MI INVERSIÓN · REFERENCIA';
 $('workspace-title').textContent=mode==='admin'?(adminTitles[tab]||'Administración'):(publishedProject(p)?p.name:'Mi expediente');
 $('notice').hidden=!msg;$('notice').dataset.kind=noticeKind;$('notice').textContent=msg;
 for(const b of $('admin-nav').children){b.hidden=mode==='admin'&&!isSuper()&&!['exceptions','editor','history'].includes(b.dataset.tab);b.setAttribute('aria-pressed',String(b.dataset.tab===tab));if(b.dataset.tab===tab)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');}
 pr.disabled=!p;pr.closest('label').hidden=portfolio||!p;$('project-status').hidden=portfolio||!p;
 if(!p){pid='';sid='';$('project-status').textContent='';$('workspace-details').textContent='Sin expedientes asignados en esta demostración.';root.append(title('No tienes expedientes asignados','Cambia de perfil simulado o selecciona otra vista de muestra. No hay datos de proyectos que mostrar.'));return;}
 pid=p.id;if(!active(p).some(s=>s.id===sid))restoreSelection(p);if(sid)rememberSelection();for(const [i,x] of list().entries()){const o=E('option',projectSelectorLabel(x,i));o.value=x.id;pr.append(o);}pr.value=pid;
 pr.closest('label').querySelector('span').textContent=mode==='client'?'Cambiar expediente simulado':'Proyecto de muestra';
 $('workspace-details').textContent=mode==='client'&&!publishedProject(p)?'Expediente de demostración aún no disponible. No se comparten datos del proyecto.':portfolio?(tab==='exceptions'?'Cartera activa de muestra · incluye entregas con seguimiento':'Administración general · cartera de muestra'):(mode==='admin'?p.name+' · '+p.client+' · ':'')+routeLabel(p.route)+' · '+(p.finance?'Con financiamiento':'Sin financiamiento')+(p.start?' · Inicio '+projectDisplayDate(p.start):' · Inicio sin fecha');
 $('project-status').textContent=PJ[p.status];$('project-status').className='chip '+(publishedProject(p)?'ok':p.status==='draft'?'warn':'');
 if(mode==='client')investor(root,p);else ({exceptions:renderExecutiveInbox,clients:adminClients,projects:adminProjects,editor:adminEditor,users:adminUsers,catalog,history:logview}[tab]||adminProjects)(root,p);
 // The previous server contract authorizes only synthetic owner presentation, never operational mutations.
 for(const f of root.querySelectorAll('form')){f.setAttribute('aria-label','Formulario de referencia, guardado no habilitado');for(const control of f.querySelectorAll('input,select,textarea,button'))control.disabled=true;const note=E('p','Formulario de referencia · el guardado operativo no está habilitado.','owner-readonly-note');f.append(note);}
 for(const control of root.querySelectorAll('.table-scroll button'))control.disabled=true;

}
$('project').addEventListener('change',e=>pickProject(e.target.value));$('view-client').addEventListener('click',()=>switchMode('client'));$('view-admin').addEventListener('click',()=>switchMode('admin'));$('role').addEventListener('change',e=>switchMode('admin',e.target.value));for(const b of $('admin-nav').children)b.addEventListener('click',()=>{if(mode==='admin'&&!isSuper()&&!['exceptions','editor','history'].includes(b.dataset.tab))return;openAdminTab(b.dataset.tab)});loadDemo();render();
}

export function createOwnerPreviewUI({root,doc=document,isActive}){
 const host=doc.createElement('div');host.className='owner-preview-369-host';host.hidden=true;root.append(host);
 const shadow=host.attachShadow({mode:'open'});let disposed=false,generation=0;
 const allowed=()=>!disposed&&typeof isActive==='function'&&isActive();
 const E=(tag,txt,cls)=>{const node=doc.createElement(tag);if(txt!=null)node.textContent=txt;if(cls)node.className=cls;return node;};
 const id=(tag,name,cls,txt)=>{const node=E(tag,txt,cls);node.id=name;return node;};
 const button=(name,label)=>{const node=id('button',name,null,label);node.type='button';node.setAttribute('aria-pressed',String(name==='view-client'));return node;};
 function clear(){generation++;shadow.replaceChildren();host.hidden=true;}
 const guard=e=>{if(!allowed()){e.preventDefault();e.stopImmediatePropagation();clear();return;}if(e.type==='submit'){e.preventDefault();e.stopImmediatePropagation();}};
 for(const type of ['click','change','submit','input'])shadow.addEventListener(type,guard,true);
 function dispose(){if(disposed)return;disposed=true;for(const type of ['click','change','submit','input'])shadow.removeEventListener(type,guard,true);clear();host.remove();}
 function show({data}={}){
  clear();if(!allowed()||data?.simulation!==true)return;
  const current=generation,active=()=>allowed()&&generation===current;
  const stylesheet=E('link');stylesheet.rel='stylesheet';stylesheet.href='/portal/owner-preview-369.css?v=3.6.9-r1';
  const shell=E('div',null,'wrap'),head=E('div',null,'pilot-head'),headText=E('div');headText.append(E('span','UNARA · 3.6.9','chip'),E('p','Sesión verificada · presentación de referencia','muted'));
  const toggles=E('div',null,'switch');toggles.setAttribute('role','group');toggles.setAttribute('aria-label','Vistas de referencia');toggles.append(button('view-client','Inversionista'),button('view-admin','Admin · referencia'));head.append(headText,toggles);
  const demo=E('div',null,'demo');demo.append(E('span','DATOS FICTICIOS · SOLO CONSULTA','chip'),E('span','Nueva presentación visual. Operación real y guardado todavía no habilitados. No hay cuentas, invitaciones ni sincronización de muestra. No introduzcas datos reales.'));
  const storage=id('p','demo-storage-notice','demo-storage-notice');storage.hidden=true;storage.setAttribute('role','status');
  const workspace=E('section',null,'workspace'),left=E('div');left.append(id('p','workspace-kicker','kicker','MI INVERSIÓN · REFERENCIA'),id('h1','workspace-title',null,'Mi expediente'),id('p','workspace-details','muted'));
  const right=E('div',null,'workspace-controls'),project=E('label',null,'field');project.append(E('span','Proyecto de muestra'),id('select','project'));
  const roleWrap=id('label','role-wrap','field');roleWrap.hidden=true;const role=id('select','role');for(const [v,n] of [['super','Superadmin de muestra'],['operations','Operaciones de muestra'],['legal','LegalKey de muestra']]){const op=E('option',n);op.value=v;role.append(op);}roleWrap.append(E('span','Vista de rol de muestra'),role);right.append(project,roleWrap,id('span','project-status','chip ok'));workspace.append(left,right);
  const nav=id('nav','admin-nav','admin-nav');nav.hidden=true;nav.setAttribute('aria-label','Navegación administrativa de referencia');for(const [v,n] of [['exceptions','Pendientes'],['projects','Proyectos'],['editor','Avances'],['clients','Clientes'],['users','Accesos'],['catalog','Plantillas'],['history','Historial']]){const b=E('button',n);b.type='button';b.dataset.tab=v;nav.append(b);}
  const notice=id('p','notice','notice');notice.hidden=true;notice.setAttribute('role','status');const announcement=id('p','inv36-announcer','inv36-visually-hidden');announcement.setAttribute('role','status');announcement.setAttribute('aria-live','polite');announcement.setAttribute('aria-atomic','true');
  const content=id('div','content','content'),foot=E('footer');foot.append(E('span','UNARA · Presentación 3.6.9 · solo consulta de referencia.'));
  shell.append(head,demo,storage,workspace,nav,notice,announcement,content,foot);shadow.append(stylesheet,shell);if(!active()){clear();return;}
  startPresentation(shadow,doc,active);if(!active()){clear();return;}host.hidden=false;
 }
 return {loading:clear,show,error:clear,dispose};
}
