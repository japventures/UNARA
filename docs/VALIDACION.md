# Recuperación y validación

Fecha: 30 de septiembre de 2026.

## Origen

UNARA V5, versión 7. Código y recursos recuperados directamente del repositorio de fuente de Sites, commit `c153acd10476990342497bc1677c89684fd50396`. Se conservan todos los recursos de `dist`, incluso los no utilizados por la portada. Las presentaciones originales son HTML, no archivos PowerPoint.

## Cambios

- Mensaje principal completo, documentos y decisiones visibles desde el inicio.
- Empresa y Migración opcionales e independientes; presentaciones consistentes.
- Umbrales residenciales de $350,000 USD y Upscale de $800,000 USD.
- Portal de obra identificado únicamente con Amplify, con datos ficticios.
- Se conserva el único enlace de portada al simulador en la franja final, en ventana nueva.
- Calendario Upscale alineado con mes 0, terreno mes 1 y salida mes 12.
- Se preservan los supuestos económicos, con objetivo del 10% condicionado a viabilidad.
- Compra terminada conserva sus controles, sustituye una referencia residencial tipo render por la fotografía ya existente y corrige un enlace a una sección inexistente.

## Enlaces de especialistas

Se revisó la identidad y contenido de los sitios. Todos respondieron correctamente; Legal Key y Amplify requirieron comprobación HTTP directa después de fallar la herramienta de búsqueda.

| Especialista | Sitio oficial |
|---|---|
| Vision Accounts | https://visionaccounts.us/ |
| Legal Key | https://legalkey.com.mx/ |
| Northreach | https://northreach.us/ |
| Umber | https://www.umberinteriordesign.com/ |
| Amplify | https://amplify.build/ |
| Casa Norte | https://www.casanorte.us/ |

## Logos

Los seis SVG normalizados de V5 contienen originales PNG y transformaciones que compensan márgenes transparentes. Se verificó el área alfa ponderada: 3,000 unidades para cada uno antes del escalado CSS común. Se preservan proporciones y filtros monocromáticos.

## Pruebas

- 14 pruebas financieras: conciliación en tres modelos con 0%, 50% y 70% de crédito; pagos sin interés; crecimiento compuesto; patrimonio y efectivo; déficits; pérdidas; compra terminada.
- 131 referencias locales y sintaxis JavaScript verificadas.
- Revisión en navegador: portada a 1440, 768 y 390 px, sin desbordamiento horizontal; menú móvil abre y cierra. Las dos presentaciones recorren sus diez diapositivas. Los controles de crédito, costo de terreno, superficie Flex y valorización actualizan resultados. Compra terminada responde al crecimiento del valor. Se verificó carga de los seis logos. No hubo errores de consola en las rutas revisadas.

No se publicaron nuevas versiones del sitio original ni se conectó un dominio. No se incluyeron credenciales ni historial Git de Sites.
