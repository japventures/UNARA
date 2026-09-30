# UNARA

Sitio privado preparado para una publicación futura. Conserva el diseño, las fotografías, los logos, las dos presentaciones web y los simuladores de la V5 aprobada. No hay despliegue automático, dominio conectado ni credenciales en este repositorio.

## Ejecutar localmente

Requiere Node.js 20 o posterior. No necesita dependencias ni compilación.

```sh
npm run dev
```

Abrir http://127.0.0.1:4173. Para otro puerto: `PORT=4174 npm run dev`. Alternativa con Python: `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` (usar rutas con `.html`).

## Contenido y edición

- `dist/index.html`: página principal y enlaces oficiales de especialistas.
- `dist/v3.css`, `v3-extra.css`, `unara-v4.css`, `unara-v5.css`: estilos heredados y ajustes V5, en ese orden. Editar overrides específicos en `unara-v5.css`.
- `dist/presentacion.html` y `presentacion-flex.html`: dos presentaciones web independientes, con diez diapositivas cada una. El acceso “PPT” conserva estas presentaciones; el proyecto original no incluía archivos `.pptx`.
- `dist/presentacion.js` y `presentacion.css`: navegación y cifras de las presentaciones.
- `dist/simulador.html?tipo=starter`, `?tipo=premium`, `?tipo=flex`: desarrollo residencial, Upscale y Flex.
- `dist/model.js`: supuestos, costos, financiación y proyecciones. `simulator.js`: controles y visualización.
- `dist/inversion.html`: simulador adicional conservado de compra de activos terminados; `purchase-model.js` y `purchase.js` contienen sus fórmulas y controles.
- `dist/logos/`: originales y versiones normalizadas con la misma área visible (3,000 unidades de alfa en un lienzo de 260 × 110). No reemplazarlas con imágenes de igual contenedor sin compensar transparencias.
- `docs/FINANZAS.md`: fórmulas y limitaciones del modelo.
- `docs/VALIDACION.md`: origen, recursos y verificación.

Las imágenes y logos están incluidos localmente. Google Fonts es la única dependencia visual externa; hay fuentes de respaldo. Los enlaces a especialistas y referencias de mercado requieren Internet. El portal es una demostración estática con datos ficticios, no un sistema de clientes.

## Verificar

```sh
npm test
npm run check
```

Las pruebas concilian costos, aportaciones, deuda, utilidad y proyecciones. `check` verifica sintaxis JavaScript, archivos enlazados y anclas locales. Revisar visualmente menú móvil, presentaciones y escenarios después de cambiar estilos o supuestos.

## Publicación futura

Publicar únicamente el contenido de `dist/` en un servicio de alojamiento estático con HTTPS. No se requiere comando de build ni servidor Node en producción. Mantener la estructura de carpetas. Los enlaces principales incluyen `.html`; configurar opcionalmente `/simulador`, `/residencial` y `/inversion` como alias de sus archivos `.html` para conservar enlaces antiguos.

Antes de publicar, revisar supuestos y referencias de mercado con cada proyecto. No activar despliegue ni DNS hasta que el propietario elija y autorice el destino. Si se vuelve a utilizar Sites, registrar o seleccionar expresamente el proyecto de destino: se omitió la identidad de hosting de V5 para evitar modificarla accidentalmente.

## Procedencia

Recuperado de UNARA V5, versión 7, commit de origen `c153acd10476990342497bc1677c89684fd50396`, el 30 de septiembre de 2026. La V5 alojada se conservó intacta. Este repositorio tiene historia independiente y no incluye credenciales ni herramientas internas de Sites. Los recursos conservan los derechos de sus respectivos titulares; no se otorga una licencia pública sobre las marcas o fotografías.
