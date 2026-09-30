(function(root){
  const presets={
    home:{price:410000,rent:2800,tax:2.3,insurance:2400,hoa:0,vacancy:7,management:8,maintenance:5,reserve:3,credit:50,rate:8.5,years:30,closing:2.5,growth:0,rentGrowth:0,selling:6},
    flex:{price:2500000,rent:22000,tax:2.3,insurance:14000,hoa:0,vacancy:10,management:5,maintenance:3,reserve:2,credit:50,rate:8.5,years:25,closing:2.5,growth:0,rentGrowth:0,selling:6}
  };
  function payment(principal,annualRate,years){const n=years*12,i=annualRate/1200;return principal===0?0:i===0?principal/n:principal*i/(1-(1+i)**-n)}
  function irr(flows){const npv=r=>flows.reduce((v,f,m)=>v+f/(1+r)**m,0);let lo=-.95,hi=1;if(npv(lo)*npv(hi)>0)return null;for(let i=0;i<110;i++){const mid=(lo+hi)/2;if(npv(mid)>0)lo=mid;else hi=mid}return (1+(lo+hi)/2)**12-1}
  function calc(s){
    const price=s.price,loan=price*s.credit/100,closing=price*s.closing/100,equity=price-loan+closing;
    const debt=payment(loan,s.rate,s.years),monthly=[],annual=[],flows=Array(61).fill(0);flows[0]-=equity;
    let balance=loan,cumulative=0;
    for(let m=1;m<=60;m++){
      const year=Math.floor((m-1)/12),rent=s.rent*(1+s.rentGrowth/100)**year,effective=rent*(1-s.vacancy/100),tax=s.price*s.tax/1200,insurance=s.insurance/12,hoa=s.hoa/12,mgmt=effective*s.management/100,maint=effective*s.maintenance/100,reserve=effective*s.reserve/100,noi=effective-tax-insurance-hoa-mgmt-maint,cf=noi-reserve-debt;
      balance=Math.max(0,balance*(1+s.rate/1200)-debt);cumulative+=cf;flows[m]+=cf;
      monthly.push({rent,effective,tax,insurance,hoa,mgmt,maint,reserve,noi,debt,cf,balance});
      if(m%12===0){const value=s.price*(1+s.growth/100)**(m/12);annual.push({year:m/12,rent:monthly.slice(m-12,m).reduce((a,x)=>a+x.effective,0),noi:monthly.slice(m-12,m).reduce((a,x)=>a+x.noi,0),cf:monthly.slice(m-12,m).reduce((a,x)=>a+x.cf,0),cumulative,value,balance,equity:value-balance})}
    }
    const first=monthly[0],last=annual.at(-1),selling=last.value*s.selling/100,exitNet=last.value-selling-last.balance,profit=last.cumulative+exitNet-equity;flows[60]+=exitNet;
    return {price,loan,closing,equity,debt,first,annual,last,selling,exitNet,profit,totalROI:equity>0?profit/equity:null,irr:irr(flows),cashOnCash:equity>0?first.cf*12/equity:null,capRate:first.noi*12/price,grossYield:s.rent*12/price};
  }
  root.UNARAPurchase={presets,calc};if(typeof module!=='undefined')module.exports=root.UNARAPurchase;
})(typeof window!=='undefined'?window:globalThis);
