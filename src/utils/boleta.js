// src/utils/boleta.js
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const toCLP = (n) =>
  Number(n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

function loadImage(url) {
  return new Promise((resolve, reject) => {
    if (!url) return resolve(null)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null) // no fallamos si el logo no carga
    img.src = url
  })
}

/**
 * Genera una boleta PDF y la descarga.
 * @param {{numero:string, fecha:string, cliente?:object, items:Array, envio?:object, total:number, logoUrl?:string}} data
 */
export async function generarBoleta({ numero, fecha, cliente = {}, items = [], envio = {}, total = 0, logoUrl }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()

  // Header
  let y = 40
  const logo = await loadImage(logoUrl)
  if (logo) {
    const logoH = 46
    const ratio = logo.width / logo.height
    const logoW = logoH * ratio
    doc.addImage(logo, 'PNG', 40, y, logoW, logoH)
  }
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('Boleta', pageW - 40, y + 10, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(`N°: ${numero}`, pageW - 40, y + 28, { align: 'right' })
  doc.text(`Fecha: ${fecha}`, pageW - 40, y + 44, { align: 'right' })

  y += 70

  // Datos comercio
  doc.setFont('helvetica', 'bold')
  doc.text('Pastelería Mil Sabores', 40, y)
  doc.setFont('helvetica', 'normal')
  y += 16
  doc.text('Av. Dulce 123, Santiago, Chile', 40, y)
  y += 14
  doc.text('Tel: +56 2 1234 5678 · contacto@milsabores.cl', 40, y)

  // Datos cliente y entrega
  y += 28
  doc.setFont('helvetica', 'bold')
  doc.text('Datos del cliente', 40, y)
  doc.setFont('helvetica', 'normal')
  y += 16
  doc.text(`Nombre: ${cliente?.nombre || cliente?.nombres || '-'}`, 40, y)
  y += 14
  doc.text(`Correo: ${cliente?.email || '-'}`, 40, y)
  y += 14
  doc.text(`Teléfono: ${cliente?.telefono || '-'}`, 40, y)

  y += 22
  doc.setFont('helvetica', 'bold')
  doc.text('Entrega', 40, y)
  doc.setFont('helvetica', 'normal')
  y += 16
  doc.text(`Fecha preferida: ${envio?.fecha || '-'}`, 40, y)
  y += 14
  doc.text(`Franja horaria: ${envio?.franja || 'Lo antes posible'}`, 40, y)

  // Tabla de ítems
  y += 20
  autoTable(doc, {
    startY: y,
    head: [['Producto', 'Cant.', 'Precio', 'Subtotal']],
    body: items.map(it => [
      it.nombre || it.name || '-',
      String(it.qty || 1),
      toCLP(it.precio || it.price || 0),
      toCLP((it.precio || it.price || 0) * (it.qty || 1))
    ]),
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [255, 192, 203], textColor: [93, 64, 55] }, // rosa pastel / choco
    theme: 'grid',
    margin: { left: 40, right: 40 }
  })

  // Total
  const endY = doc.lastAutoTable?.finalY || y
  const totalY = endY + 24
  doc.setFont('helvetica', 'bold')
  doc.text(`Total: ${toCLP(total)}`, pageW - 40, totalY, { align: 'right' })

  // Footer
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('¡Gracias por tu compra! 💖', 40, totalY + 28)
  doc.save(`Boleta-${numero}.pdf`)
}
