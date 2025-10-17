import QRCode from 'qrcode'

export async function generateQRCode(data: string): Promise<string> {
  try {
    // Génère un QR Code en Data URL (base64)
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 300,
      margin: 1
    })
  } catch (error) {
    console.error('Erreur lors de la génération du QR Code:', error)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la génération du QR Code'
    })
  }
}

export function generateOrderQRData(orderId: string, orderNumber: string): string {
  // Format: JSON contenant les infos de commande
  return JSON.stringify({
    type: 'order',
    id: orderId,
    number: orderNumber,
    timestamp: Date.now()
  })
}

export function generateTableQRData(tableId: string, tableNumber: number): string {
  // Format: JSON contenant les infos de table
  return JSON.stringify({
    type: 'table',
    id: tableId,
    number: tableNumber,
    timestamp: Date.now()
  })
}

