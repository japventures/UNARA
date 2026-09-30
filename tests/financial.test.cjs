const {test} = require('node:test');
const assert = require('node:assert/strict');
const {calc,defaults,presets,payment,projectHold} = require('../dist/model.js');
const purchase = require('../dist/purchase-model.js');
const near = (a,b) => assert.ok(Math.abs(a-b)<1e-6, `${a} != ${b}`);
for (const tier of ['starter','premium','flex']) for (const credit of [0,50,70]) {
 test(`${tier}, crédito ${credit}%: conciliación de costos, capital y salida`, () => {
  const s={...defaults,...presets[tier],tier,credit}; const r=calc(s);
  near(r.rows.reduce((a,x)=>a+x.cost+x.interest,0),r.total);
  near(r.equity+r.balance,r.total);
  near(r.net-r.equity,r.profit);
  near(r.profit/r.total,r.roc);
  near(r.profit/r.equity,r.roe);
  near(r.cf,r.noi-r.reserve-r.mortgage);
  assert.ok(r.balance<=r.cap+1e-6);
  if(!credit) { near(r.interest,0); near(r.orig,0); }
 });
}
test('Renta: crecimiento compuesto, deuda y patrimonio separados de efectivo',()=>{
 const s={...defaults,...presets.starter,tier:'starter',appreciation:3,rentGrowth:2};
 const r=calc(s),years=projectHold(r,s);
 near(years[4].value,r.sale*1.03**5);
 near(years[9].value,r.sale*1.03**10);
 near(years[4].rent,r.rent*12*1.02**4);
 for(const y of years) {
  near(y.propertyEquity,y.value-y.balance);
  near(y.flow,y.noi-y.service-y.reserve);
  near(y.profit,r.cashout+y.cumulativeFlow+y.saleNet-r.equity);
 }
 assert.ok(years[9].balance<years[0].balance);
});
test('Menor precio reduce ROC: no se fuerza una meta del 10%',()=>{
 const s={...defaults,...presets.starter,tier:'starter'};
 const r=calc(s),low=calc({...s,saleAdjust:-20});
 assert.ok(low.roc<r.roc);assert.ok(low.profit<0);near(low.total,r.total);
});
test('Crédito alto y renta baja permiten mostrar déficit mensual',()=>{
 const r=calc({...defaults,...presets.starter,tier:'starter',ltv:70,rentPerLiving:.5});
 assert.ok(r.cf<0);
});
test('Pago sin interés y sin deuda',()=>{near(payment(120000,0,10),1000);near(payment(0,8,30),0);});
test('Compra terminada: valorización configurable y salida conciliada',()=>{
 const s={...purchase.presets.home,growth:3};const r=purchase.calc(s);
 near(r.last.value,s.price*1.03**5);
 near(r.profit,r.last.cumulative+r.exitNet-r.equity);
 near(r.first.cf,r.first.noi-r.first.reserve-r.debt);
});
