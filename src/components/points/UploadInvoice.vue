<template>
  <div class="q-pa-xs">
    <div class="row q-ma-xs">
      <div class="col-12 text-center">
        <img
          v-if="modelValue"
          :src="modelValue"
          width="250rem"
          class="editable-image"
          @click="initCamera"
        />
        <p v-else class="text-subtitle1 text-center" @click="initCamera">Carga una foto</p>
        <q-btn
          v-if="!modelValue && type !== 'read'"
          color="primary"
          icon="add_a_photo"
          class="q-mt-sm"
          @click="initCamera"
          :loading="isLoading"
        />
      </div>
    </div>

    <q-dialog v-model="showModal" persistent>
      <q-card style="max-width: 95vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Subir y Recortar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div v-if="!imagePreview">
            <q-uploader
              accept="image/*"
              ref="uploader"
              color="primary"
              text-color="white"
              :multiple="false"
              label="Selecciona una imagen"
              @added="handleAdded"
              @failed="handleFailed"
              :hide-upload-btn="true"
              :auto-upload="false"
            />
          </div>
          <div v-else>
            <img ref="cropperImage" :src="imagePreview" class="crop-image" />
          </div>
        </q-card-section>
        <q-separator />
        <div class="row text-center q-pa-md">
          <q-btn
            v-if="imagePreview"
            label="Recortar y Guardar"
            color="primary"
            class="col q-ml-sm"
            @click="cropImage"
            :loading="isLoading"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

defineProps({
  modelValue: String, // Usamos modelValue para el soporte de v-model
  type: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue']) // Emitimos el evento update:modelValue

const isLoading = ref(false)
const imagePreview = ref(null)
const showModal = ref(false)
let cropper = null

// Función para abrir el modal
const initCamera = () => {
  showModal.value = true
}

// Función para manejar la imagen seleccionada
const handleAdded = (files) => {
  if (files.length > 0) {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
      nextTick(() => initCropper())
    }
    reader.readAsDataURL(file)
  }
}

// Inicializar Cropper.js
const initCropper = () => {
  const imageElement = document.querySelector('.crop-image')
  if (imageElement) {
    cropper = new Cropper(imageElement, {
      aspectRatio: 1,
      viewMode: 0,
      dragMode: 'move',
      responsive: true,
      zoomable: true,
      scalable: true,
      rotatable: true,
      movable: true,
    })
  }
}

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Recortar y emitir la imagen
const cropImage = async () => {
  if (!cropper) return

  const canvas = cropper.getCroppedCanvas({
    width: 800,
    height: 800,
  })

  canvas.toBlob(async (blob) => {
    if (!blob) {
      console.error('Error: no se pudo crear el archivo blob.')
      return
    }

    const base64Image = await convertBlobToBase64(blob)
    emit('update:modelValue', base64Image) // Emitimos el valor de la imagen recortada
    showModal.value = false
    cropper.destroy()
    cropper = null
    imagePreview.value = null
  }, 'image/jpeg')
}

const handleFailed = (error) => {
  console.error('Error al cargar la imagen:', error)
}
</script>

<style scoped>
.editable-image {
  cursor: pointer;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.editable-image:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.03);
}
.q-uploader {
  cursor: pointer;
  max-width: 300px;
  width: 100%;
}
.crop-image {
  width: 300px;
  height: 300px;
  object-fit: cover; /* La imagen se recorta para llenar el área definida */
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
