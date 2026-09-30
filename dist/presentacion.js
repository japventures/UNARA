(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const prev = document.querySelector('.nav-prev');
  const next = document.querySelector('.nav-next');
  const current = document.querySelector('.nav-current');
  const progress = document.querySelector('.nav-track');
  const progressFill = progress.querySelector('i');
  const tier = document.body.dataset.tier === 'flex' ? 'flex' : 'starter';
  const dollars = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const assumptions = { ...window.UNARA.defaults, ...window.UNARA.presets[tier], tier };
  assumptions.credit = Math.round(assumptions.credit / 5) * 5;
  const result = window.UNARA.calc(assumptions);
  const residentialBase = tier === 'starter' ? window.UNARA.calc({ ...assumptions, salePerLiving: 230 }) : null;
  let index = 0;

  document.querySelector('#financial-case').textContent = tier === 'flex' ? 'FLEX / 18 MESES' : 'VIVIENDA / 12 MESES';
  document.querySelector('#financial-context').textContent = tier === 'flex'
    ? `Flex ilustrativo de ${Math.round(result.area).toLocaleString('en-US')} ft² rentables y 18 meses. El modelo supone una venta a $180/ft²; no representa un inmueble específico ni un comparable validado.`
    : 'Vivienda ilustrativa de 1,786 ft² habitables y 12 meses. La venta objetivo de $238/ft² debe comprobarse con comparables del terreno y producto elegidos.';
  document.querySelector('#financial-total').textContent = dollars(result.total);
  document.querySelector('#financial-sale').textContent = dollars(result.sale);
  document.querySelector('#financial-broker').textContent = `−${dollars(result.broker)}`;
  document.querySelector('#financial-profit').textContent = `${result.profit < 0 ? '−' : ''}${dollars(Math.abs(result.profit))}`;
  document.querySelector('#financial-roc').textContent = `${(result.roc * 100).toFixed(1)}%`;
  document.querySelector('.financial-roc').classList.toggle('is-negative', result.roc < 0);
  const target = result.total * 1.1 / (1 - assumptions.sellPct / 100);
  document.querySelector('#financial-judgment').textContent = tier === 'flex'
    ? `Este precio de salida no sostiene el costo. Para un ROC de 10%, la venta tendría que acercarse a ${dollars(target)} (≈${dollars(target / result.area)}/ft²), antes de impuestos. Es una sensibilidad matemática, no un precio de mercado.`
    : `Con ${dollars(result.sale)} de venta, la utilidad sería ${dollars(result.profit)}. A $230/ft², el ROC cae a ${(residentialBase.roc * 100).toFixed(1)}%. La referencia de alrededor de 10% anual es un objetivo sujeto a viabilidad, no un rendimiento garantizado.`;
  document.querySelector('#financial-detail').textContent = tier === 'flex'
    ? 'Incluye terreno, obra, urbanización, contingencia de $150,000, honorarios, originación, intereses y tenencia. Crédito supuesto: 50%; comisión de venta: 6%. El crédito no cubre los honorarios de desarrollo ni los costos financieros.'
    : 'Incluye terreno, obra, permisos, honorarios, originación e intereses. Crédito de obra supuesto: 60%; comisión de venta: 6%. ROC de un ciclo de 12 meses, antes de impuestos y costos particulares de cierre. El objetivo exige validar comparables y presupuestos; el crédito no cubre honorarios ni costos financieros.';

  function show(value, focus = false) {
    index = Math.max(0, Math.min(slides.length - 1, value));
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
      slide.classList.toggle('is-active', i === index);
    });
    current.textContent = String(index + 1).padStart(2, '0');
    progress.setAttribute('aria-valuenow', String(index + 1));
    progress.setAttribute('aria-valuemax', String(slides.length));
    progress.setAttribute('aria-valuetext', `${index + 1} de ${slides.length}: ${slides[index].dataset.label}`);
    document.querySelector('.nav-total').textContent = String(slides.length).padStart(2, '0');
    progressFill.style.width = `${((index + 1) / slides.length) * 100}%`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    history.replaceState(null, '', `#${slides[index].dataset.route}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (focus) {
      const heading = slides[index].querySelector('h1,h2');
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }
  prev.addEventListener('click', () => show(index - 1, true));
  next.addEventListener('click', () => show(index + 1, true));
  document.querySelector('[data-next]').addEventListener('click', () => show(index + 1, true));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,a,button')) return;
    if (['ArrowRight', 'PageDown'].includes(event.key)) { event.preventDefault(); show(index + 1, true); }
    if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); show(index - 1, true); }
    if (event.key === 'Home') { event.preventDefault(); show(0, true); }
    if (event.key === 'End') { event.preventDefault(); show(slides.length - 1, true); }
  });
  const initial = slides.findIndex(slide => `#${slide.dataset.route}` === location.hash);
  show(initial >= 0 ? initial : 0);
})();
