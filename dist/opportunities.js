
(()=>{
if(typeof location!=='undefined'&&new URLSearchParams(location.search).get('review')==='mobile'&&window.self===window.top){const frame=document.createElement('iframe');frame.title='Current Opportunities · revisión móvil a 390px';frame.src=location.pathname+'?v=3.1';frame.style.cssText='display:block;width:min(390px,100%);height:844px;max-height:94dvh;border:1px solid #c6a77e;background:#ece9e1;margin:12px auto';const label=document.createElement('p');label.textContent='UNARA · revisión responsive · 390px';label.style.cssText='text-align:center;color:#102832;margin:12px';document.body.replaceChildren(label,frame);return;}
const root=document.getElementById('houston-lot-map'),data=window.UNARA_OPPORTUNITIES;
const colors={shovel:'var(--blue)',lot:'var(--yellow)',both:'var(--purple)',flex:'var(--orange)',land:'#697b86'};
const categories={land:'Terreno · $80,000 o más',shovel:'Shovel-ready candidate',lot:'Lot under $80,000',both:'Shovel ready + under $80,000',flex:'Flex site candidate · 10,000 SF / $3M budget'};
const filter=root.querySelector('#hm-category');
const chooser=root.querySelector('#hm-property'),detail=root.querySelector('.hm-detail'),map=root.querySelector('.hm-map');
let selected=0,projection,svg,zoom,geography,pins,downtown,tiles,tileTimer,width=0,height=0,view=d3.zoomIdentity;
const search=root.querySelector('#hm-search'),minPrice=root.querySelector('#hm-min-price'),maxPrice=root.querySelector('#hm-max-price'),locationFilter=root.querySelector('#hm-location'),sort=root.querySelector('#hm-sort'),basemap=root.querySelector('#hm-basemap');
let tileGeneration=0;
const normal=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const matchesFilters=p=>matchesCategory(p)&&(!search.value||normal([p.address,p.zip,p.mls,...p.source_records.map(r=>r.mls)].join(' ')).includes(normal(search.value.trim())))&&(!minPrice.value||Math.max(p.price,p.price_high||0)>=Number(minPrice.value))&&(!maxPrice.value||(p.price_low||p.price)<=Number(maxPrice.value))&&(locationFilter.value==='all'||(locationFilter.value==='mapped'?'x' in p:!('x' in p)));
function setMobileView(value){const workspace=root.querySelector('.portal-workspace');workspace.dataset.view=value;root.querySelector('#hm-view-map').setAttribute('aria-pressed',value==='map');root.querySelector('#hm-view-list').setAttribute('aria-pressed',value==='list');if(value==='map')requestAnimationFrame(draw);}
root.querySelector('#hm-view-map').onclick=()=>setMobileView('map');root.querySelector('#hm-view-list').onclick=()=>setMobileView('list');
for(const field of [search,minPrice,maxPrice,locationFilter,sort])field.addEventListener(field===search||field===minPrice||field===maxPrice?'input':'change',applyFilter);
root.querySelector('#hm-clear').onclick=()=>{for(const field of [search,minPrice,maxPrice])field.value='';filter.value=locationFilter.value='all';sort.value='default';applyFilter()};
basemap.addEventListener('change',()=>{clearTimeout(tileTimer);tileGeneration++;tiles.selectAll('*').remove();updateTiles()});
const mapped=data.points.map((p,i)=>({...p,index:i})).filter(p=>'x' in p);
const matchesCategory=p=>filter.value==='all'||(filter.value==='lot'?(p.category==='lot'||p.category==='both')&&Math.max(p.price,p.price_high||0)<80000:p.category===filter.value||(p.category==='both'&&filter.value==='shovel'));
function applyFilter(){
 const visible=data.points.map((p,index)=>({...p,index})).filter(matchesFilters);
 if(sort.value==='price-up')visible.sort((a,b)=>(a.price_low||a.price)-(b.price_low||b.price));if(sort.value==='price-down')visible.sort((a,b)=>(b.price_high||b.price)-(a.price_high||a.price));if(sort.value==='address')visible.sort((a,b)=>a.address.localeCompare(b.address));
 chooser.replaceChildren();
 visible.forEach(p=>{const o=document.createElement('option');o.value=p.index;o.textContent=p.address+' — '+categories[p.category]+('x' in p?'':' — pin needed');chooser.append(o)});
 root.querySelector('#hm-filter-count').textContent=visible.length+' fichas · '+visible.filter(p=>'x' in p).length+' ubicadas · '+visible.filter(p=>!('x' in p)).length+' solo en lista';
 chooser.disabled=!visible.length;
 root.querySelector('.hm-nearby').replaceChildren();
 renderCards(visible);if(pins){pins.attr('display',p=>matchesFilters(p)?null:'none');layoutMarkers();}
 if(visible.length){if(!visible.some(p=>p.index===selected))selected=visible[0].index;show(selected);}
 else{selected=-1;const empty=document.createElement('p');empty.className='empty-state';empty.textContent='No hay resultados. Ajusta los filtros o pulsa Limpiar.';root.querySelector('#opportunity-cards').append(empty);detail.textContent='No hay terrenos con estos filtros. Cambia los valores o pulsa Limpiar.';}
}
filter.addEventListener('change',applyFilter);
function show(i,focus=false){
 selected=+i;chooser.value=i;root.querySelectorAll('[data-marker]').forEach(c=>{const active=Number(c.dataset.marker)===selected;c.classList.toggle('selected',active);c.setAttribute('aria-pressed',active)});const p=data.points[selected];detail.replaceChildren();document.querySelectorAll('[data-card]').forEach(c=>c.classList.toggle('selected',Number(c.dataset.card)===selected));
 const line=document.createElement('div');line.textContent=p.address+' · '+categories[p.category]+' · '+new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(p.price)+(p.category==='flex'?' · Land asking price · ':' · MLS ')+(p.mls||'pending');detail.append(line);
 const a=document.createElement('a');a.href=p.url;a.target='_blank';a.rel='noopener';a.textContent='View listing';detail.append(a);
 if(p.duplicate_review){const note=document.createElement('p');note.textContent='Registros agrupados por dirección. MLS, precio y parcela pendientes de reconciliar con el realtor.';detail.append(note);for(const record of p.source_records){const link=document.createElement('a');link.href=record.url;link.target='_blank';link.rel='noopener';link.textContent='MLS '+record.mls+' · '+moneyValue(record.price);detail.append(link,document.createElement('br'));}}if(p.category==='flex')renderFlexBudget(p);
 if(p.remarks){const note=document.createElement('p');note.className='text-small';note.textContent='Listing remarks: '+p.remarks;detail.append(note);}
 if(p.category_correction){const correction=document.createElement('p');correction.textContent='Clasificación corregida por precio; categoría original conservada en los datos de fuente.';detail.append(correction);}
 const status=document.createElement('div');status.className='text-small text-muted';status.textContent='x' in p?'Address match: '+p.matched+' · parcel boundary unverified':'Sin coordenadas exactas: esta propiedad permanece solo en lista.';detail.append(status);
 if(pins){layoutMarkers();pins.filter(d=>d.index===selected).raise();pins.select('.hm-pin').attr('r',d=>d.index===selected?8:6);pins.select('.hm-halo').attr('display',d=>d.index===selected?null:'none');}
 if(focus&&'x' in p){setMobileView('map');const card=root.querySelector('[data-card="'+selected+'"]');if(card)card.scrollIntoView({behavior:'smooth',block:'nearest'});const k=Math.max(view.k,8),[x,y]=projection([p.x,p.y]);svg.transition().duration(300).call(zoom.transform,d3.zoomIdentity.translate(width/2-k*x,height/2-k*y).scale(k));}
}

function renderFlexBudget(p){
 const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
 const section=document.createElement('section');section.className='flex-budget';
 const title=document.createElement('h3');title.textContent='10,000 SF flex / warehouse · preliminary budget';section.append(title);
 const summary=document.createElement('p');summary.textContent='Modeled total investment: '+money(p.investment_low)+'–'+money(p.investment_high)+'. Includes land and the allowances below. This is a screening estimate; costs may exceed $3M after site and construction review.';section.append(summary);
 const status=document.createElement('p');status.className='text-small';status.textContent=p.status+'. Indexed source: '+p.source_crawl+'; researched Oct 8, 2026. Site size: '+p.lot_size+'.';section.append(status);
 const disclosure=document.createElement('details');const label=document.createElement('summary');label.textContent='View budget assumptions and required site checks';disclosure.append(label);
 const table=document.createElement('table');table.className='flex-cost-table';const caption=document.createElement('caption');caption.textContent='Planning allowances, not contractor bids';table.append(caption);
 const head=document.createElement('thead'),hr=document.createElement('tr');for(const text of ['Cost','Low','High']){const th=document.createElement('th');th.scope='col';th.textContent=text;hr.append(th);}head.append(hr);table.append(head);
 const body=document.createElement('tbody');for(const row of [{label:'Land asking price (LoopNet)',low:p.price,high:p.price},...data.flexBudget.components,{label:'Total modeled investment',low:p.investment_low,high:p.investment_high}]){const tr=document.createElement('tr');for(const value of [row.label,money(row.low),money(row.high)]){const td=document.createElement('td');td.textContent=value;tr.append(td);}body.append(tr);}table.append(body);disclosure.append(table);
 for(const text of [data.flexBudget.scope,p.feasibility]){const note=document.createElement('p');note.className='text-small';note.textContent=text;disclosure.append(note);}
 const sourceLabel=document.createElement('p');sourceLabel.className='text-small';sourceLabel.textContent='Cost references inform the model; individual allowances are our planning assumptions.';disclosure.append(sourceLabel);
 for(const source of data.flexBudget.sources){const a=document.createElement('a');a.href=source.url;a.target='_blank';a.rel='noopener';a.className='text-small';a.textContent=source.label;disclosure.append(a,document.createElement('br'));}
 section.append(disclosure);detail.append(section);
}

function screenPoint(p){return view.apply(projection([p.x,p.y]));}
function shortPrice(price){return price>=1000000?'$'+Number((price/1000000).toFixed(2))+'M':'$'+Number((price/1000).toFixed(1))+'k';}
function layoutMarkers(){if(!pins||!projection)return;const boxes=[];const candidates=mapped.filter(matchesFilters).sort((a,b)=>(b.index===selected)-(a.index===selected));const compact=new Set();for(const p of candidates){const [x,y]=screenPoint(p);if(p.index!==selected&&boxes.some(b=>Math.abs(x-b[0])<70&&Math.abs(y-b[1])<36))compact.add(p.index);else boxes.push([x,y]);}pins.classed('compact',p=>compact.has(p.index));}
function tileFrame(){const world=2*Math.PI*projection.scale()*view.k;const z=Math.max(0,Math.min(16,Math.floor(Math.log2(world/256))));const n=2**z,size=world/n;const [cx,cy]=view.apply(projection([0,0]));return {z,n,size,left:cx-world/2,top:cy-world/2};}
function positionTiles(){if(!tiles)return;const f=tileFrame();tiles.selectAll('image').attr('x',d=>f.left+d.x*f.size).attr('y',d=>f.top+d.y*f.size).attr('width',f.size+.5).attr('height',f.size+.5);}
function updateTiles(){if(!tiles)return;const status=root.querySelector('.hm-tile-status');if(basemap.value==='reference'){tiles.selectAll('*').remove();geography.selectAll('.hm-road').attr('opacity',1);status.textContent='Referencia integrada · vías básicas y límite de Houston. Sin detalle de calles.';return;}
 const f=tileFrame(),items=[];for(let y=Math.max(0,Math.floor(-f.top/f.size));y<=Math.min(f.n-1,Math.floor((height-f.top)/f.size));y++)for(let x=Math.max(0,Math.floor(-f.left/f.size));x<=Math.min(f.n-1,Math.floor((width-f.left)/f.size));x++)items.push({x,y,z:f.z,key:f.z+'/'+y+'/'+x});
 const generation=++tileGeneration;let loaded=0,failed=0;const nodes=tiles.selectAll('image').data(items,d=>d.key);nodes.exit().remove();const newNodes=nodes.enter().append('image').attr('data-state','loading').attr('opacity',0);
 const message=()=>{if(!tiles)return;const images=tiles.selectAll('image').nodes();loaded=images.filter(n=>n.dataset.state==='loaded').length;failed=images.filter(n=>n.dataset.state==='error').length;status.textContent=loaded===images.length&&loaded?'Mapa topográfico USGS · vías y nombres de referencia. Ubicación de parcelas sin verificar.':loaded?'USGS parcial · '+loaded+'/'+images.length+' mosaicos; referencia integrada en áreas sin cargar.':failed?'USGS no disponible · se muestra la referencia integrada, sin detalle de calles.':'Cargando USGS · referencia integrada visible mientras carga.';geography.selectAll('.hm-road').attr('opacity',loaded===images.length?0:1);};
 newNodes.each(function(d){const node=this;const image=new Image();const timer=setTimeout(()=>{if(node.dataset.state==='loading'){node.dataset.state='error';message()}},8000);image.onload=()=>{clearTimeout(timer);if(!node.isConnected)return;node.dataset.state='loaded';d3.select(node).attr('opacity',1);message()};image.onerror=()=>{clearTimeout(timer);node.dataset.state='error';message()};const url='https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/'+d.z+'/'+d.y+'/'+d.x;d3.select(node).attr('href',url);image.src=url;});positionTiles();message();
}
function move(){
 geography.attr('transform',view);
 pins.attr('transform',d=>{const [x,y]=screenPoint(d);return `translate(${x},${y})`;});
 layoutMarkers();positionTiles();clearTimeout(tileTimer);tileTimer=setTimeout(updateTiles,180);
 const [x,y]=view.apply(projection([-95.3698,29.7604]));downtown.attr('x',x).attr('y',y+18);
 root.querySelector('#hm-zoom-level').textContent=view.k.toFixed(1)+'×';
 root.querySelector('#hm-zoom-in').disabled=view.k>=256;
 root.querySelector('#hm-zoom-out').disabled=view.k<=1;
}
function pick(event){
 const [x,y]=d3.pointer(event,svg.node());
 const nearby=mapped.filter(matchesFilters).map(p=>({p,d:Math.hypot(...screenPoint(p).map((v,j)=>v-[x,y][j]))})).filter(v=>v.d<=22).sort((a,b)=>a.d-b.d);
 if(!nearby.length)return;
 show(nearby[0].p.index);
 const choices=root.querySelector('.hm-nearby');choices.replaceChildren();
 if(nearby.length>1){const label=document.createElement('div');label.textContent='Listings near this pin:';choices.append(label);nearby.forEach(({p})=>{const button=document.createElement('button');button.type='button';button.textContent=p.address;button.onclick=()=>show(p.index);choices.append(button)});}
}
function draw(){
 const nextWidth=map.clientWidth;if(!nextWidth||nextWidth===width)return;
 const center=projection?projection.invert(view.invert([width/2,height/2])):null;
 width=nextWidth;height=map.clientHeight||600;map.replaceChildren();
 svg=d3.select(map).append('svg').attr('viewBox',`0 0 ${width} ${height}`).attr('aria-label','Interactive Houston map. Pinch or scroll to zoom; drag to move. Choose a property below to view its listing.');
 projection=d3.geoMercator().fitExtent([[16,16],[width-16,height-22]],data.city);const path=d3.geoPath(projection);
 tileGeneration++;
 svg.append('defs').append('clipPath').attr('id','hm-clip').append('rect').attr('width',width).attr('height',height);
 const clipped=svg.append('g').attr('clip-path','url(#hm-clip)');tiles=clipped.append('g').attr('class','hm-tiles').attr('pointer-events','none');geography=clipped.append('g').attr('pointer-events','none');
 geography.selectAll('.hm-road').data(data.roads.features).join('path').attr('class','hm-road').attr('d',path).attr('vector-effect','non-scaling-stroke');
 geography.selectAll('.hm-city').data(data.city.features).join('path').attr('class','hm-city').attr('d',path).attr('vector-effect','non-scaling-stroke');
 
 downtown=clipped.append('text').attr('text-anchor','middle').attr('pointer-events','none').attr('display','none');
 pins=clipped.append('g').selectAll('g').data(mapped).join('g').attr('display',p=>matchesFilters(p)?null:'none').attr('class','price-marker').attr('data-marker',p=>p.index).attr('role','button').attr('tabindex',0).attr('aria-label',p=>p.address+' · '+moneyValue(p.price)).on('click',(event,p)=>{event.stopPropagation();show(p.index);const card=root.querySelector('[data-card="'+p.index+'"]');if(card)card.scrollIntoView({behavior:'smooth',block:'nearest'})}).on('mouseenter',function(){d3.select(this).raise()}).on('keydown',(event,p)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();show(p.index)}});
 pins.append('circle').attr('class','hm-point').attr('r',4);pins.append('rect').attr('x',-33).attr('y',-16).attr('width',66).attr('height',32).attr('rx',16);pins.append('text').attr('text-anchor','middle').attr('dy','.35em').text(p=>shortPrice(p.price));pins.append('circle').attr('r',12).attr('class','hm-halo').attr('display','none');
 zoom=d3.zoom().extent([[0,0],[width,height]]).scaleExtent([1,256]).on('zoom',event=>{view=event.transform;move()});
 svg.call(zoom).on('click.listing',pick);
 if(center&&view.k>1){const [x,y]=projection(center);view=d3.zoomIdentity.translate(width/2-view.k*x,height/2-view.k*y).scale(view.k);}
 svg.call(zoom.transform,view);updateTiles();if(selected>=0)show(selected);
}
root.querySelector('#hm-zoom-in').onclick=()=>svg.transition().duration(200).call(zoom.scaleBy,1.6);
root.querySelector('#hm-zoom-out').onclick=()=>svg.transition().duration(200).call(zoom.scaleBy,.625);
root.querySelector('#hm-reset').onclick=()=>{root.querySelector('.hm-nearby').replaceChildren();svg.transition().duration(250).call(zoom.transform,d3.zoomIdentity)};
chooser.addEventListener('change',()=>{root.querySelector('.hm-nearby').replaceChildren();show(chooser.value,true)});
root.querySelector('.hm-tile-status').textContent='Cargando mapa topográfico USGS; referencia integrada disponible.';
root.querySelector('.hm-caption').textContent='Datos del mapa del realtor · 8 oct 2026. '+mapped.length+' fichas ubicadas; 5 sin coordenadas exactas. Ubicación por dirección: límites de parcela sin verificar. Permisos, precios, disponibilidad y viabilidad requieren confirmación. Flex: referencias de LoopNet pendientes de confirmar con el broker.';
function moneyValue(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v)}
function renderCards(visible){
 const list=root.querySelector('#opportunity-cards');list.replaceChildren();
 for(const p of visible){const card=document.createElement('article');card.className='lot-card'+(p.index===selected?' selected':'');card.dataset.card=p.index;
 const cat=document.createElement('p');cat.className='card-category';cat.textContent=categories[p.category];
 const title=document.createElement('h3');title.textContent=p.address;
 const price=document.createElement('strong');price.className='card-price';price.textContent=p.price_low&&p.price_low!==p.price_high?moneyValue(p.price_low)+'–'+moneyValue(p.price_high):moneyValue(p.price);
 const meta=document.createElement('p');meta.className='card-meta';meta.textContent='Houston · '+(p.zip||'ZIP por confirmar')+(p.mls?' · MLS '+p.mls:'');
 const location=document.createElement('p');location.className='location-note';location.textContent='x' in p?'Ubicación por dirección · parcela sin verificar':'Sin coordenadas exactas · disponible solo en lista';
 const action=document.createElement('button');action.type='button';action.textContent='x' in p?'Ver en el mapa':'Ver detalles';action.onclick=()=>{show(p.index,'x' in p);if(!('x' in p))root.querySelector('.hm-detail').scrollIntoView({behavior:'smooth',block:'center'})};
 const link=document.createElement('a');link.href=p.url;link.target='_blank';link.rel='noopener';link.textContent='Ver anuncio';
 card.append(cat,title,price,meta,location);if(p.category_correction){const note=document.createElement('p');note.className='review-note';note.textContent='Categoría corregida por precio; clasificación original conservada.';card.append(note);}
 if(p.duplicate_review){const note=document.createElement('p');note.className='review-note';note.textContent=p.source_records.length+' registros agrupados · revisar MLS y precio';card.append(note)}
 const sources=document.createElement('details');sources.className='source-records';const summary=document.createElement('summary');summary.textContent='Datos originales · '+p.source_records.length+' registro'+(p.source_records.length===1?'':'s');sources.append(summary);for(const record of p.source_records){const row=document.createElement('p');row.textContent=record.address+' · '+moneyValue(record.price)+' · MLS '+(record.mls||'por confirmar')+' · categoría original: '+record.category;sources.append(row);}card.append(sources);
 const actions=document.createElement('div');actions.className='card-actions';actions.append(action,link);card.append(actions);list.append(card);
 }
}
applyFilter();draw();new ResizeObserver(draw).observe(map);

})();
