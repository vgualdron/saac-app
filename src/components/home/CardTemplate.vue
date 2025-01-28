<template>
  <q-page class="flex flex-center q-mb-md">
    <div class="column items-center">
      <canvas ref="canvas" width="350" height="500"></canvas>
      <q-btn color="primary" label="Descargar Carnet" @click="download" class="q-my-md" />
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
  let user = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    user = commonStore.user.data.user
  }
  const client = {
    name: user.name,
    document: user.document,
    type_document: user.type_document,
    qr: `${process.env.URL_API}/validate-card/${user.document}`,
  }

  const ctx = canvas.value.getContext('2d')
  const img = new Image()

  // Ruta correcta de la imagen (ajustar según la ubicación de tu imagen)
  img.src = new URL('/card-template.png', import.meta.url).href

  img.onerror = () => {
    console.error('Error al cargar la imagen')
  }

  // Espera a que la imagen se cargue antes de dibujar
  img.onload = async () => {
    ctx.clearRect(0, 0, 350, 500) // Borrar cualquier dibujo anterior
    ctx.drawImage(img, 0, 0, 350, 500) // Dibuja la imagen base

    // Estilo del texto (negrita)
    ctx.fillStyle = 'black' // Texto en negro
    ctx.font = 'bold 18px Arial' // Texto en negrita
    ctx.textAlign = 'center' // Centra el texto

    // Posición y dibujo del texto
    ctx.fillText(`${client.name.toUpperCase()}`, 175, 380) // Centrado horizontal
    ctx.fillText(`${client.type_document} ${client.document}`, 175, 410) // Centrado horizontal

    // Generar QR más grande y dibujarlo en el canvas
    const qrCanvas = document.createElement('canvas')
    await QrCode.toCanvas(qrCanvas, client.qr, { width: 200 }) // Ajustar el tamaño del QR a 200px

    const qrWidth = 200 // Ancho del QR
    const qrX = (350 - qrWidth) / 2 // Calcular la posición X para centrar el QR
    ctx.drawImage(qrCanvas, qrX, 150) // Centrar el QR en el canvas (más grande)
  }
}

const download = () => {
  const link = document.createElement('a')
  link.href = canvas.value.toDataURL('image/png')
  link.download = 'carnet.png'
  link.click()
}

// Genera el carnet al cargar la página
onMounted(generate)
</script>
