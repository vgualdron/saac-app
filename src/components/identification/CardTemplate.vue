<template>
  <q-page class="flex flex-center q-mb-md">
    <div class="column items-center">
      <canvas ref="canvas" width="320" height="500"></canvas>
      <!-- <q-btn color="primary" label="Descargar Carnet" @click="download" class="q-my-md" /> -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrCode from 'qrcode'
import { useCommonStore } from '../../stores/common'

const commonStore = useCommonStore()
const canvas = ref(null)

const generate = async () => {
  let user = commonStore.user?.data?.user || {}

  const client = {
    name: user.name || 'Usuario Desconocido',
    document: user.document || 'N/A',
    type_document: user.type_document || '',
    qr: `${process.env.URL_PANEL}/validate-card/${user.user_id || ''}`,
    photo: user.user_url_photo_proile
      ? `${process.env.URL_FILES}${user.user_url_photo_proile}`
      : new URL('/default-photo.png', import.meta.url).href, // Imagen por defecto
  }

  const ctx = canvas.value.getContext('2d')
  const templateImg = new Image()
  templateImg.src = new URL('/card-template.png', import.meta.url).href
  const logoImg = new Image() // Nueva imagen para el logo
  logoImg.src = new URL('/logo-rectangle.png', import.meta.url).href // Ruta del logo

  templateImg.onerror = () => {
    console.error('Error al cargar la imagen de plantilla')
  }

  templateImg.onload = async () => {
    ctx.clearRect(0, 0, 350, 500) // Limpiar el canvas
    ctx.drawImage(templateImg, 0, 0, 350, 500) // Dibujar la plantilla

    // Cargar y dibujar el logo
    logoImg.onload = () => {
      const logoWidth = 2238
      const logoHeight = 753
      const scale = Math.min(160 / logoWidth, 310 / logoHeight) // Ajuste proporcional

      const logoSizeWidth = logoWidth * scale
      const logoSizeHeight = logoHeight * scale

      ctx.drawImage(logoImg, (350 - logoSizeWidth) / 2, 60, logoSizeWidth, logoSizeHeight) // Ajuste al tamaño de la plantilla

      // Dibujar el texto "ASOCIADO COOPSERPROG" más abajo
      ctx.fillStyle = 'black'
      ctx.font = 'bold 16px "Open Sans", sans-serif' // Fuente Open Sans
      ctx.textAlign = 'center'
      ctx.fillText('ASOCIADO COOPSERPROG', 175, 80 + logoSizeHeight) // Ubicación del texto más abajo
    }

    // Cargar y dibujar la foto del usuario
    const userImg = new Image()
    userImg.src = client.photo
    userImg.onerror = () => {
      console.error('Error al cargar la foto del usuario')
    }

    userImg.onload = () => {
      const imgSize = 140 // Tamaño de la foto
      ctx.drawImage(userImg, 105, 20 + (logoImg.height / 350) * 60, imgSize, imgSize) // Foto más arriba (Y=130) ajustada
    }

    // Dibujar el texto del nombre con mayor separación de la foto
    ctx.fillStyle = 'black'
    ctx.font = 'bold 18px "Open Sans", sans-serif' // Fuente Open Sans
    ctx.textAlign = 'center'

    const maxWidth = 280 // Máximo ancho antes de hacer salto de línea
    const lineHeight = 22
    const nameLines = getWrappedText(ctx, client.name.toUpperCase(), maxWidth)

    // Ajustar la posición del nombre
    nameLines.forEach((line, index) => {
      ctx.fillText(line, 175, 320 + index * lineHeight) // Más espacio entre foto y nombre
    })

    // Dibujar el documento debajo del nombre
    ctx.font = 'bold 16px "Open Sans", sans-serif' // Fuente Open Sans
    ctx.fillText(`${client.type_document} ${client.document}`, 175, 360)

    // Dibujar el QR más arriba pero con separación
    const qrCanvas = document.createElement('canvas')
    await QrCode.toCanvas(qrCanvas, client.qr, { width: 100 }) // QR más pequeño
    ctx.drawImage(qrCanvas, 125, 370, 100, 100) // QR más arriba (Y=370) pero con separación
  }
}

// Función para dividir el texto en múltiples líneas si es muy largo
const getWrappedText = (ctx, text, maxWidth) => {
  const words = text.split(' ')
  let line = ''
  const lines = []

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word
    const metrics = ctx.measureText(testLine)

    if (metrics.width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  })

  if (line) lines.push(line)
  return lines
}

/* const download = () => {
  if (canvas.value) {
    const link = document.createElement('a')
    link.href = canvas.value.toDataURL('image/png')
    link.download = 'carnet.png'
    link.click()
  } else {
    console.error('Canvas no disponible')
  }
} */

onMounted(generate)
</script>
