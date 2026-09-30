// FHFA All-Transactions House Price Index via FRED, Q2 each year, rebased to Q2 2000 = 100. Retrieved 2026-09-27.
const marketYears=Array.from({length:27},(_,i)=>2000+i);
const marketSeries={"houston":[100.0,106.5,110.8,115.4,119.5,124.8,132.5,139.6,143.1,144.5,142.7,140.0,144.6,152.0,168.0,184.0,190.9,198.9,207.4,215.6,225.0,242.8,283.9,299.5,306.2,311.6,322.2],"texas":[100.0,107.0,110.2,114.4,117.2,122.1,129.0,136.6,139.3,139.8,137.3,134.9,137.0,142.8,153.0,164.0,175.7,188.9,200.2,209.4,217.4,244.7,302.5,309.5,318.3,323.6,328.7],"usa":[100.0,107.7,114.2,121.1,131.5,147.2,159.2,162.7,155.1,146.0,138.2,132.3,131.9,137.4,144.3,151.6,159.4,168.3,177.9,185.8,194.0,218.1,262.6,273.0,288.1,299.0,308.1]};
function renderMarketChart(){
 const small=matchMedia('(max-width:740px)').matches,w=small?360:760,h=small?260:350,m={left:small?36:47,right:small?13:25,top:small?18:22,bottom:small?37:42},pw=w-m.left-m.right,ph=h-m.top-m.bottom,min=90,max=350;
 const x=i=>m.left+i/(marketYears.length-1)*pw,y=v=>m.top+(max-v)/(max-min)*ph;
 const colors={houston:'#26483e',texas:'#869b95',usa:'#b9916e'};
 const ys=small?[100,200,300]:[100,150,200,250,300,350],xs=small?[2000,2010,2020,2026]:[2000,2005,2010,2015,2020,2026];
 const grid=ys.map(v=>`<line x1="${m.left}" x2="${w-m.right}" y1="${y(v)}" y2="${y(v)}" stroke="#263b332e" stroke-width="1"/><text x="${m.left-9}" y="${y(v)+4}" text-anchor="end" fill="#65736e" font-size="${small?10:12}">${v}</text>`).join('');
 const dates=xs.map(v=>`<text x="${x(v-2000)}" y="${h-8}" text-anchor="middle" fill="#65736e" font-size="${small?10:12}">${v}</text>`).join('');
 const paths=Object.entries(marketSeries).map(([key,vals])=>{const d=vals.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');return `<path d="${d}" fill="none" stroke="${colors[key]}" stroke-width="${key==='houston'?(small?2.7:3.7):(small?1.8:2.3)}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${x(vals.length-1)}" cy="${y(vals.at(-1))}" r="${small?3:4}" fill="${colors[key]}"/>`}).join('');
 document.getElementById('marketChart').innerHTML=`<svg viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="hpiTitle hpiDesc"><title id="hpiTitle">Índice de precios de vivienda, 2000 a 2026</title><desc id="hpiDesc">FHFA, segundo trimestre de cada año, base 2000 igual a 100. En 2026: Houston ${marketSeries.houston.at(-1)}, Texas ${marketSeries.texas.at(-1)} y Estados Unidos ${marketSeries.usa.at(-1)}.</desc>${grid}${dates}${paths}</svg>`;
 document.getElementById('marketAsideValue').textContent=marketSeries.houston.at(-1);
 document.getElementById('marketLatest').textContent=`Q2 2026 · Houston ${marketSeries.houston.at(-1)} · Texas ${marketSeries.texas.at(-1)} · EE. UU. ${marketSeries.usa.at(-1)}`;
}
renderMarketChart();addEventListener('resize',()=>{clearTimeout(window.marketChartResize);window.marketChartResize=setTimeout(renderMarketChart,150)});
