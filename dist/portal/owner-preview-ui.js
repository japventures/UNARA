// Presentation for the verified, server-filtered owner pilot. No transport or persistence.
const SECTIONS = Object.freeze([
  ['summary', 'Resumen', 'overview'], ['stages', 'Etapas', 'journey'],
  ['tasks', 'Tareas', 'tasks'], ['documents', 'Documentos', 'document'],
]);
const STATUS = Object.freeze({pending: 'Pendiente', 'in-progress': 'En curso', done: 'Completado'});
const SVG_NS = 'http://www.w3.org/2000/svg';
let instance = 0;

export function createOwnerPreviewUI({root, doc = document, options, onOpen, isActive = () => true, mountGuides} = {}) {
  if (!root || !Array.isArray(options) || typeof onOpen !== 'function') throw Error('OWNER_PREVIEW_UI_INPUT');
  const routes = options.map(option => ({id: option[0], view: option[1], label: option[2]}));
  const routeFor = (id, mode) => routes.find(route => route.id === id && (mode === 'admin' ? route.view === 'admin' : route.view !== 'admin'));
  if (!routes.length || routes.some(route => typeof route.id !== 'string' || typeof route.view !== 'string' || typeof route.label !== 'string')) throw Error('OWNER_PREVIEW_UI_ROUTES');
  const prefix = 'owner-preview-' + (++instance);
  const hadClass = root.classList.contains('owner-preview-v24');
  root.classList.add('owner-preview-v24');
  const el = (tag, text, className) => {
    const node = doc.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const icon = name => {
    const svg = doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('op-icon');
    const shapes = {
      overview: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M3 14h7v7H3z', 'M14 14h7v7h-7z'],
      journey: ['M5 5v14', 'M5 5h0', 'M5 12h0', 'M5 19h0', 'M10 5h10', 'M10 12h10', 'M10 19h10'],
      tasks: ['m3 6 2 2 3-4', 'M11 6h10', 'm3 13 2 2 3-4', 'M11 13h10', 'M4 21h3', 'M11 20h10'],
      document: ['M6 3h8l4 4v14H6z', 'M14 3v5h4', 'M9 12h6', 'M9 16h6'],
      shield: ['M12 3 4 6v6c0 4 4 7 8 9 4-2 8-5 8-9V6z', 'm8 12 3 3 5-6'],
      check: ['m5 12 4 4L19 6'],
      clock: ['M12 8v5l3 2', 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'],
      case: ['M3 7h18v14H3z', 'M8 7V3h8v4', 'M3 12h18', 'M10 12v3h4v-3'],
      search: ['M17 17l4 4', 'M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0'],
    };
    for (const d of shapes[name] || shapes.document) {
      const path = doc.createElementNS(SVG_NS, 'path'); path.setAttribute('d', d); svg.append(path);
    }
    return svg;
  };
  const listeners = [], screenListeners = [];
  const listen = (node, type, handler, screen = false) => {
    node.addEventListener(type, handler);
    (screen ? screenListeners : listeners).push(() => node.removeEventListener(type, handler));
  };
  let disposed = false, data = null, selection = routes.find(route => route.view === 'admin') || routes[0];
  let section = 'summary', currentScreen = null, guideInstance = null, guideEpoch = 0;
  let taskQuery = '', taskStatus = '', selectedStage = 0, state = 'loading';
  const live = () => !disposed && isActive();
  const own = el('div', null, 'op-shell');
  const top = el('div', null, 'op-toolbar');
  const identity = el('div', null, 'op-toolbar-copy');
  identity.append(el('p', 'MI CUENTA UNARA', 'op-eyebrow'), el('p', 'Todo tu recorrido, en un mismo lugar.', 'op-toolbar-title'));
  const controls = el('div', null, 'op-toolbar-controls');
  const projectLabel = el('label', 'Expediente', 'op-project-label'); projectLabel.htmlFor = prefix + '-project';
  const projectSelect = el('select'); projectSelect.id = prefix + '-project'; projectSelect.dataset.testid = 'owner-project-select';
  const ids = [...new Set(routes.map(route => route.id))];
  // Routing labels are the same public aliases already present in the pilot.
  // Full names from a response are still cleared on every scope change/error.
  const routeLabel = id => {
    const route = routes.find(item => item.id === id && item.view === 'admin');
    return route?.label.includes(' · ') ? route.label.split(' · ').slice(1).join(' · ') : 'Caso ' + (ids.indexOf(id) + 1);
  };
  for (const id of ids) {
    const option = el('option', routeLabel(id)); option.value = id; projectSelect.append(option);
  }
  projectLabel.append(projectSelect);
  const mode = el('div', null, 'op-mode'); mode.setAttribute('role', 'group'); mode.setAttribute('aria-label', 'Vista del expediente');
  const adminButton = el('button', 'Admin'), clientButton = el('button', 'Vista de cliente');
  for (const button of [adminButton, clientButton]) {button.type = 'button'; mode.append(button);}
  adminButton.dataset.testid = 'owner-view-admin'; clientButton.dataset.testid = 'owner-view-client';
  controls.append(projectLabel, mode); top.append(identity, controls);
  const banner = el('div', null, 'op-notice');
  const bannerCopy = el('div'); bannerCopy.append(el('strong', 'Revisión 2.4 · Piloto privado'), el('p', 'Datos de ejemplo. Consulta ambas vistas; no hay cambios, envíos ni archivos reales en esta prueba.'));
  banner.append(icon('shield'), bannerCopy);
  const layout = el('div', null, 'op-layout');
  const side = el('aside', null, 'op-sidebar');
  const account = el('div', null, 'op-account');
  const accountIcon = el('span', null, 'op-account-icon'); accountIcon.append(icon('case'));
  const accountCopy = el('div'); accountCopy.append(el('strong', 'Tu espacio UNARA'), el('p', 'Servicios y proyectos'));
  account.append(accountIcon, accountCopy);
  const nav = el('nav', null, 'op-nav'); nav.setAttribute('aria-label', 'Secciones del expediente');
  const navButtons = new Map(), navCounts = new Map();
  for (const [key, label, glyph] of SECTIONS) {
    const button = el('button'); button.type = 'button'; button.dataset.section = key; button.dataset.testid = 'owner-nav-' + key;
    button.append(icon(glyph), el('span', label));
    const count = el('span', '', 'op-nav-count'); count.hidden = true; button.append(count);
    nav.append(button); navButtons.set(key, button); navCounts.set(key, count);
    listen(button, 'click', () => {
      if (!live() || !data) return;
      section = key; render();
      currentScreen?.querySelector('h1')?.focus({preventScroll: true});
    });
  }
  const sideFoot = el('div', null, 'op-side-foot');
  sideFoot.append(el('strong', 'Una dirección. Todo tu proceso.'), el('p', 'UNARA coordina y te ayuda a identificar lo que sigue.'));
  side.append(account, nav, sideFoot);
  const content = el('div', null, 'op-main'); content.dataset.testid = 'owner-content';
  layout.append(side, content); own.append(top, banner, layout); root.append(own);

  function disposeScreen() {
    guideEpoch++;
    for (const stop of screenListeners.splice(0)) stop();
    guideInstance?.dispose?.(); guideInstance = null;
    currentScreen?.remove(); currentScreen = null;
  }
  function syncControls() {
    projectSelect.value = selection.id;
    const admin = selection.view === 'admin';
    adminButton.setAttribute('aria-pressed', String(admin)); clientButton.setAttribute('aria-pressed', String(!admin));
    adminButton.disabled = !routeFor(selection.id, 'admin'); clientButton.disabled = !routeFor(selection.id, 'client');
    for (const [key, button] of navButtons) {
      button.disabled = !data;
      if (key === section) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
    }
    const counts = data ? {stages: data.stages.length, tasks: data.tasks.filter(task => task.status !== 'done').length, documents: data.documents.length} : {};
    for (const [key, node] of navCounts) {node.hidden = !Object.hasOwn(counts, key); node.textContent = Object.hasOwn(counts, key) ? String(counts[key]) : '';}
    own.setAttribute('aria-busy', String(state === 'loading'));
  }
  function choose(id, requestedMode) {
    if (!live()) return;
    const route = routeFor(id, requestedMode); if (!route) return;
    loading({id: route.id, view: route.view});
    try {Promise.resolve(onOpen(route.id, route.view)).catch(() => {if (live() && selection === route) error();});}
    catch {error();}
  }
  listen(projectSelect, 'change', () => choose(projectSelect.value, selection.view === 'admin' ? 'admin' : 'client'));
  listen(adminButton, 'click', () => choose(selection.id, 'admin'));
  listen(clientButton, 'click', () => choose(selection.id, 'client'));

  function badge(status) {const node = el('span', STATUS[status] || 'Por confirmar', 'op-badge'); node.dataset.status = status; return node;}
  function heading(title, description) {
    const block = el('div', null, 'op-page-heading');
    const h1 = el('h1', title); h1.tabIndex = -1;
    block.append(el('p', data.name, 'op-breadcrumb'), h1);
    if (description) block.append(el('p', description, 'op-page-description'));
    const view = el('span', selection.view === 'admin' ? 'Vista administrativa · Solo consulta' : 'Vista de cliente simulada · Solo consulta', 'op-view-label');
    block.append(view); return block;
  }
  function panel(title, copy) {
    const block = el('section', null, 'op-panel');
    const header = el('div', null, 'op-panel-heading'); header.append(el('h2', title));
    if (copy) header.append(el('p', copy));
    block.append(header); return block;
  }
  function button(label, handler, className = 'op-button') {
    const node = el('button', label, className); node.type = 'button'; listen(node, 'click', handler, true); return node;
  }
  function go(key) {if (!live() || !data) return; section = key; render(); currentScreen?.querySelector('h1')?.focus({preventScroll: true});}
  function progress() {
    const group = el('div', null, 'op-progress');
    const label = el('div', null, 'op-progress-label'); label.append(el('span', 'Avance del expediente'), el('strong', data.progress + '%'));
    const meter = el('progress'); meter.max = 100; meter.value = data.progress; meter.setAttribute('aria-label', 'Avance simulado de este expediente');
    group.append(label, meter); return group;
  }
  function taskRow(task, compact = false) {
    const row = el('li', null, 'op-task-row' + (compact ? ' is-compact' : ''));
    const marker = el('span', null, 'op-task-marker'); marker.dataset.status = task.status; marker.append(icon(task.status === 'done' ? 'check' : 'tasks'));
    const copy = el('div', null, 'op-task-copy'); copy.append(el('strong', task.label));
    if (!compact) copy.append(el('p', 'Responsable por asignar · Revisión por programar', 'op-task-meta'));
    row.append(marker, copy, badge(task.status)); return row;
  }
  function internalNote(screen) {
    if (selection.view !== 'admin' || typeof data.internalNote !== 'string') return;
    const note = el('aside', null, 'op-internal-note'); note.dataset.testid = 'owner-internal-note';
    note.append(el('strong', 'Solo equipo · Nota interna simulada'), el('p', data.internalNote)); screen.append(note);
  }
  function summary(screen) {
    screen.append(heading('Resumen', 'Tu avance y el siguiente paso, sin perder el contexto.'));
    const stats = el('div', null, 'op-stats');
    const completed = data.stages.filter(stage => stage.status === 'done').length;
    for (const [label, value, copy, glyph] of [
      ['Avance del expediente', data.progress + '%', 'Progreso de esta simulación', 'journey'],
      ['Etapas terminadas', completed + ' de ' + data.stages.length, 'Del recorrido de este expediente', 'check'],
      ['Tareas pendientes', String(data.tasks.filter(task => task.status !== 'done').length), 'Pendientes y en curso', 'tasks'],
      ['Documentos de referencia', String(data.documents.length), 'Etiquetas de ejemplo, sin archivos', 'document'],
    ]) {
      const card = el('article', null, 'op-stat'); const box = el('div'); box.append(el('p', label), el('strong', value), el('small', copy));
      const glyphBox = el('span', null, 'op-stat-icon'); glyphBox.append(icon(glyph)); card.append(box, glyphBox); stats.append(card);
    }
    screen.append(stats);
    const hero = el('section', null, 'op-next-card');
    const heroCopy = el('div'); heroCopy.append(el('p', 'ESTÁS AQUÍ', 'op-eyebrow'), el('h2', data.stage), progress());
    const next = el('div', null, 'op-next-action'); next.append(el('span', 'Lo que sigue'), el('h3', data.nextStep), button('Ver etapas', () => go('stages'), 'op-button op-primary'));
    hero.append(heroCopy, next); screen.append(hero);
    const columns = el('div', null, 'op-summary-columns');
    const tasks = panel('Tareas por revisar', 'Consulta el detalle de cada pendiente.');
    const list = el('ul', null, 'op-task-list');
    for (const task of data.tasks.filter(item => item.status !== 'done').slice(0, 3)) list.append(taskRow(task, true));
    if (!list.children.length) list.append(el('li', 'No hay tareas pendientes en esta vista.', 'op-empty-inline'));
    tasks.append(list, button('Ver todas las tareas', () => go('tasks'), 'op-panel-link'));
    const stages = panel('Tu recorrido', 'Las etapas recibidas para este expediente.'); const stageList = el('ol', null, 'op-stage-preview');
    for (const stage of data.stages.slice(0, 4)) {
      const row = el('li'); row.append(el('strong', stage.name), badge(stage.status)); stageList.append(row);
    }
    if (!data.stages.length) stageList.append(el('li', 'Tu equipo confirmará las etapas.', 'op-empty-inline'));
    stages.append(stageList, button('Explorar etapas', () => go('stages'), 'op-panel-link'));
    columns.append(tasks, stages); screen.append(columns); internalNote(screen);
  }
  function stages(screen) {
    screen.append(heading('Etapas y avances', 'Identifica dónde va el expediente y qué sigue.'));
    const journey = panel('Recorrido del expediente'); journey.append(progress());
    const current = el('p', null, 'op-current-stage'); current.append(el('span', 'Etapa actual'), el('strong', data.stage)); journey.append(current);
    const timeline = el('ol', null, 'op-timeline'); timeline.setAttribute('aria-label', 'Etapas del expediente');
    const selected = el('div', null, 'op-selected-stage'); selected.dataset.testid = 'owner-preview-selected-stage';
    const showSelected = () => {
      const stage = data.stages[selectedStage]; selected.replaceChildren();
      if (!stage) {selected.append(el('p', 'Tu equipo confirmará las etapas de este recorrido.')); return;}
      selected.append(el('p', 'ETAPA SELECCIONADA', 'op-eyebrow'), el('h3', stage.name), badge(stage.status));
      for (const item of timeline.querySelectorAll('button')) item.setAttribute('aria-pressed', String(Number(item.dataset.index) === selectedStage));
    };
    data.stages.forEach((stage, index) => {
      const item = el('li'); const select = button('', () => {if (live()) {selectedStage = index; showSelected();}}, 'op-timeline-step');
      select.dataset.index = String(index); select.dataset.status = stage.status;
      const number = el('span', String(index + 1), 'op-timeline-number'); if (stage.status === 'done') {number.replaceChildren(icon('check')); number.setAttribute('aria-label', 'Completada');}
      select.append(number, el('strong', stage.name), el('span', STATUS[stage.status], 'op-timeline-status'));
      item.append(select); timeline.append(item);
    });
    journey.append(timeline, selected); showSelected(); screen.append(journey);
    const next = el('div', null, 'op-inline-next'); next.append(icon('clock'), el('div'));
    next.lastChild.append(el('span', 'Siguiente paso del expediente'), el('strong', data.nextStep)); screen.append(next);
    if (typeof mountGuides !== 'function') return;
    const reference = panel('Guías por empresa', 'Referencia de servicios. Estas guías no indican servicios contratados ni avances de este expediente.');
    reference.classList.add('op-guides-panel'); const guideRoot = el('div', null, 'op-guide-root'); reference.append(guideRoot); screen.append(reference);
    const epoch = ++guideEpoch;
    const active = () => live() && epoch === guideEpoch && section === 'stages' && !!data && guideRoot.isConnected;
    try {
      const result = mountGuides(guideRoot, {isActive: active});
      if (result && typeof result.then === 'function') result.then(handle => {if (active()) guideInstance = handle; else handle?.dispose?.();}).catch(() => {if (active()) guideRoot.replaceChildren(el('p', 'No pudimos mostrar las guías. Vuelve a abrir esta sección.', 'op-empty-inline'));});
      else if (active()) guideInstance = result; else result?.dispose?.();
    } catch {if (active()) guideRoot.replaceChildren(el('p', 'No pudimos mostrar las guías. Vuelve a abrir esta sección.', 'op-empty-inline'));}
  }
  function tasks(screen) {
    screen.append(heading('Tareas', 'Todos los pendientes recibidos para este expediente y esta vista.'));
    const box = panel('Tu lista de tareas');
    const filters = el('div', null, 'op-task-filters');
    const queryLabel = el('label', 'Buscar tarea'); const query = el('input'); query.type = 'search'; query.value = taskQuery; query.maxLength = 200; query.placeholder = 'Buscar en tus tareas'; query.dataset.testid = 'owner-task-search'; queryLabel.append(query);
    const stateLabel = el('label', 'Estado'); const stateSelect = el('select'); stateSelect.dataset.testid = 'owner-task-filter';
    for (const [value, label] of [['', 'Todos los estados'], ['pending', 'Pendientes'], ['in-progress', 'En curso'], ['done', 'Completadas']]) {const item = el('option', label); item.value = value; stateSelect.append(item);}
    stateSelect.value = taskStatus; stateLabel.append(stateSelect); filters.append(queryLabel, stateLabel);
    const count = el('p', '', 'op-result-count'); count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite');
    const list = el('ul', null, 'op-task-list');
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const update = () => {
      if (!live() || !data || section !== 'tasks') return;
      const matching = data.tasks.filter(task => (!taskStatus || task.status === taskStatus) && normalize(task.label).includes(normalize(taskQuery.trim())));
      list.replaceChildren(...matching.map(task => taskRow(task)));
      if (!matching.length) list.append(el('li', 'No hay tareas que coincidan con estos filtros.', 'op-empty-inline'));
      count.textContent = matching.length + ' de ' + data.tasks.length + ' tareas';
    };
    listen(query, 'input', () => {taskQuery = query.value; update();}, true);
    listen(stateSelect, 'change', () => {taskStatus = stateSelect.value; update();}, true);
    box.append(filters, count, list); screen.append(box); update();
  }
  function documents(screen) {
    screen.append(heading('Documentos', 'Referencias del expediente, en el contexto de esta prueba.'));
    const note = el('div', null, 'op-document-notice'); note.append(icon('shield'), el('p', 'Estos son nombres de documentos simulados. No contienen archivos y no hay descargas habilitadas.')); screen.append(note);
    const box = panel('Documentos de referencia'); const list = el('ul', null, 'op-document-list');
    for (const document of data.documents) {
      const item = el('li'); const glyph = el('span', null, 'op-document-icon'); glyph.append(icon('document'));
      const copy = el('div'); copy.append(el('strong', document.label), el('p', 'Referencia de ejemplo · Sin archivo adjunto'));
      item.append(glyph, copy, badge(document.status)); list.append(item);
    }
    if (!data.documents.length) {
      const empty = el('li', null, 'op-empty'); empty.append(icon('document'), el('h3', 'Todo en su lugar, cuando esté disponible'), el('p', 'Todavía no hay documentos de referencia para esta vista.')); list.append(empty);
    }
    box.append(list); screen.append(box);
  }
  function render() {
    disposeScreen(); syncControls();
    const screen = el('section', null, 'op-screen'); currentScreen = screen; content.append(screen);
    if (!data) {
      const empty = el('div', null, 'op-empty op-waiting'); empty.append(icon(state === 'error' ? 'shield' : 'case'));
      empty.append(el('h1', state === 'error' ? 'No se pudo verificar el acceso' : 'Comprobando tu expediente'));
      empty.append(el('p', state === 'error' ? 'No se mostró información del expediente. Puedes volver a comprobar tu acceso.' : 'La información aparecerá cuando se confirme esta vista.'));
      if (state === 'error') empty.append(button('Volver a comprobar', () => choose(selection.id, selection.view === 'admin' ? 'admin' : 'client'), 'op-button op-primary'));
      screen.append(empty); return;
    }
    if (section === 'summary') summary(screen);
    else if (section === 'stages') stages(screen);
    else if (section === 'tasks') tasks(screen);
    else documents(screen);
    screen.append(el('p', 'Piloto de consulta. Los datos de ejemplo no acreditan avances ni documentos de clientes reales.', 'op-footnote'));
  }
  function loading({id, view}) {
    if (!live()) return;
    const route = routes.find(item => item.id === id && item.view === view); if (!route) {error(); return;}
    selection = route; data = null; state = 'loading'; section = 'summary'; taskQuery = ''; taskStatus = ''; selectedStage = 0;
    for (const option of projectSelect.options) option.textContent = routeLabel(option.value);
    render();
  }
  function show({data: nextData, id, view}) {
    if (!live() || selection.id !== id || selection.view !== view) return;
    if (!nextData || nextData.id !== id || nextData.simulation !== true) {error(); return;}
    data = nextData; state = 'ready';
    const stageIndex = data.stages.findIndex(stage => stage.name === data.stage); selectedStage = stageIndex < 0 ? 0 : stageIndex;
    for (const option of projectSelect.options) {if (option.value === id) option.textContent = data.name;}
    render();
  }
  function error() {
    if (disposed) return;
    data = null; state = 'error'; taskQuery = ''; taskStatus = ''; selectedStage = 0;
    for (const option of projectSelect.options) option.textContent = routeLabel(option.value);
    render();
  }
  function dispose() {
    if (disposed) return;
    disposed = true; data = null; taskQuery = ''; taskStatus = '';
    disposeScreen(); for (const stop of listeners.splice(0)) stop();
    own.remove(); if (!hadClass) root.classList.remove('owner-preview-v24');
  }
  render();
  return {loading, show, error, dispose};
}
