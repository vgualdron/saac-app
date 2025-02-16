<template>
  <q-page class="flex flex-center q-mb-md">
    <div class="column items-center">
      <canvas ref="canvas" width="320" height="500"></canvas>
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
      : new URL('/default-photo.png', import.meta.url).href,
  }

  const ctx = canvas.value.getContext('2d')
  const templateImg = new Image()
  templateImg.src = new URL('/card-template.png', import.meta.url).href

  templateImg.onload = async () => {
    const scaleFactor = Math.min(300 / templateImg.width, 500 / templateImg.height)
    const templateWidth = templateImg.width * scaleFactor
    const templateHeight = templateImg.height * scaleFactor
    const templateX = (canvas.value.width - templateWidth) / 2
    const templateY = 0

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    // Sombra para la imagen del template
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)' // Color de la sombra
    ctx.shadowBlur = 15 // Difuminado de la sombra
    ctx.shadowOffsetX = 4 // Desplazamiento horizontal
    ctx.shadowOffsetY = 4 // Desplazamiento vertical

    // Dibujar la imagen del template con sombra
    ctx.drawImage(templateImg, templateX, templateY, templateWidth, templateHeight)

    // Restaurar el contexto para evitar que otros elementos tengan sombra
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // Texto "ASOCIADO COOPSERPROG"
    ctx.fillStyle = 'black'
    ctx.font = 'bold 18px "Open Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('ASOCIADO COOPSERPROG', canvas.value.width / 2, 280)

    // Foto del usuario
    const userImg = new Image()
    userImg.src = client.photo
    userImg.onload = () => {
      const imgSize = 175
      const x = (canvas.value.width - imgSize) / 2
      const y = 75

      ctx.save()
      ctx.beginPath()
      ctx.arc(x + imgSize / 2, y + imgSize / 2, imgSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(userImg, x, y, imgSize, imgSize)
      ctx.restore()
    }

    // Nombre y documento
    ctx.fillStyle = 'white'
    ctx.font = 'bold 16px "Open Sans", sans-serif'
    ctx.textAlign = 'left'

    const textX = 30
    const textY = 340
    const lineHeight = 20
    const nameLines = splitNameInTwoLines(client.name.toUpperCase())

    nameLines.forEach((line, index) => {
      ctx.fillText(line, textX, textY + index * lineHeight)
    })

    ctx.fillText(
      `${client.type_document} ${client.document}`,
      textX,
      textY + nameLines.length * lineHeight + 10,
    )

    // QR Code (rectángulo con esquinas redondeadas)
    const qrCanvas = document.createElement('canvas')
    await QrCode.toCanvas(qrCanvas, client.qr, { width: 90 })

    const qrX = canvas.value.width - 115
    const qrY = canvas.value.height - 182
    const qrSize = 90
    const radius = 8 // Radio de las esquinas redondeadas

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(qrX + radius, qrY)
    ctx.lineTo(qrX + qrSize - radius, qrY)
    ctx.quadraticCurveTo(qrX + qrSize, qrY, qrX + qrSize, qrY + radius)
    ctx.lineTo(qrX + qrSize, qrY + qrSize - radius)
    ctx.quadraticCurveTo(qrX + qrSize, qrY + qrSize, qrX + qrSize - radius, qrY + qrSize)
    ctx.lineTo(qrX + radius, qrY + qrSize)
    ctx.quadraticCurveTo(qrX, qrY + qrSize, qrX, qrY + qrSize - radius)
    ctx.lineTo(qrX, qrY + radius)
    ctx.quadraticCurveTo(qrX, qrY, qrX + radius, qrY)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)
    ctx.restore()
  }
}

// Función para dividir el nombre en dos líneas con máximo 2 palabras por línea
const splitNameInTwoLines = (name) => {
  const words = name.split(' ')
  if (words.length <= 2) return [name]
  return [`${words[0]} ${words[1]}`, words.slice(2).join(' ')]
}

onMounted(generate)
</script>
