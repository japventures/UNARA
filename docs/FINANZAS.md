# Fórmulas y supuestos

Importes nominales en USD, antes de impuestos sobre ingresos o ganancias. Las cifras iniciales proceden de V5; no se recalibraron costos, renta ni precios para producir una rentabilidad objetivo. La referencia residencial de alrededor del 10% anual es un criterio sujeto a viabilidad y comparables, no un resultado garantizado.

## Desarrollo y venta

- Costo base = terreno + construcción + permisos/estudios + obra civil aplicable + contingencia adicional + honorarios de desarrollo.
- Costo total = costo base + originación + intereses de las disposiciones + gastos de tenencia.
- Interés mensual = (saldo previo + mitad de la disposición del mes) × tasa anual / 12. Se supone disposición promedio a mitad de mes.
- Capital aportado = suma de costos e intereses mensuales menos disposiciones de crédito.
- Costos de venta = precio supuesto × comisión + otros costos de venta.
- Utilidad = precio supuesto − costos de venta − costo total.
- Efectivo neto de venta = precio supuesto − costos de venta − deuda pendiente. Incluye devolución de capital; no equivale a utilidad.
- ROC = utilidad / costo total. ROE = utilidad / capital aportado.
- Equivalente anual = (1 + retorno del periodo)^(12 / meses) − 1. No es TIR de aportaciones mensuales.

Residencial y Upscale: contrato con Northreach en mes 0, terreno en mes 1 y salida prevista en mes 12. Los índices internos 1–12 representan meses 0–11 en las tablas; la salida se muestra aparte en mes 12. Flex conserva su calendario de 18 meses.

Starter conserva: 1,786 ft² habitables, 2,179 ft² construidos, obra a $140/ft² habitable (área seleccionable hasta 3,000 ft²; incluye garage e instalaciones, sin volver a multiplicar por la superficie total), terreno desde $70,000 en incrementos de $5,000 y salida ilustrativa a $238/ft² habitable. El crédito inicial se redondea al 60% en la interfaz; la comisión de venta es 6%. Contingencia incluida en el presupuesto de obra, sin cargo doble. Estos valores requieren presupuestos y comparables actuales. El modelo muestra pérdidas si los supuestos no sostienen el proyecto.

## Conservación para renta

- Ingreso efectivo = renta potencial × (1 − vacancia).
- NOI = ingreso efectivo + recuperaciones − predial − seguro − HOA − administración − mantenimiento.
- Flujo = NOI − reserva de reparaciones − servicio de deuda.
- Pago hipotecario = P × i / [1 − (1+i)^(-n)], con i mensual y n pagos; con tasa 0 se usa P/n.
- Efectivo de refinanciamiento = préstamo nuevo − saldo de obra − costos de refinanciamiento. Si es negativo requiere capital adicional.
- Capital que permanece = capital de desarrollo − efectivo de refinanciamiento.
- Cash-on-cash = flujo anual / capital que permanece, cuando el denominador es positivo.
- Valor al año t = valor inicial × (1 + cambio anual supuesto)^t.
- Patrimonio en el activo = valor proyectado − saldo de deuda; no es efectivo recibido.
- Renta del año t = renta inicial × (1 + crecimiento de renta)^(t−1).
- Venta neta hipotética = valor proyectado − costos de venta − saldo de deuda.
- Ganancia acumulada = efectivo del refinanciamiento + flujos acumulados + venta neta hipotética − capital de desarrollo.
- ROC acumulado = ganancia acumulada / costo total del desarrollo.
- ROE acumulado = ganancia / capital de desarrollo, capital adicional de refinanciamiento y déficits de renta cubiertos. No se anualiza.
- TIR desde entrega: capital que permanece como salida inicial, flujos anuales y venta hipotética en año 5 o 10. Excluye el periodo de construcción. No es comparable directamente con una TIR desde la primera aportación.

El resumen mensual representa el primer mes con el avalúo inicial. La tabla anual aplica al predial el valor proyectado de cada año; por ello el primer flujo anual puede diferir de 12 veces el resumen mensual. Seguro y HOA crecen con el supuesto de gastos; administración, mantenimiento y reservas dependen del ingreso efectivo. No se garantiza que la renta cubra la deuda.

## Compra terminada

`purchase-model.js` conserva su horizonte de cinco años: capital inicial = precio − préstamo + gastos de compra. Incluye flujos mensuales y venta neta hipotética al mes 60 para calcular TIR. El cambio de valor y renta inicia en 0% y es editable. Predial, seguro y HOA se mantienen constantes en este modelo simplificado. Aumentar el crecimiento modifica valor futuro, no efectivo de renta ya cobrado.

Las referencias externas heredadas son antecedentes ilustrativos. No sustituyen cotizaciones, avalúos, condiciones crediticias, impuestos ni contratos del inmueble concreto.
