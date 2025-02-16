<template>
  <div class="q-pa-xs">
    <div class="row q-ma-xs">
      <div class="col-12 text-center">
        <img
          v-if="urlFile"
          :src="urlFile"
          width="250rem"
          class="editable-image"
          @click="initCamera"
        />
        <p v-else class="text-subtitle1 text-center" @click="initCamera">No hay foto</p>
        <q-btn
          v-if="!item && type !== 'read'"
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
          <div class="text-h6">Foto de perfil</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup v-if="showClose" />
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
import { ref, onMounted, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { useCommonStore } from '../../stores/common'
import { useFileStore } from '../../stores/file'
import { showNotifications } from '../../helpers/showNotifications'

const commonStore = useCommonStore()

const props = defineProps({
  config: Object,
  type: {
    type: String,
    default: '',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
})

const initCamera = () => {
  showModal.value = true
}

defineExpose({
  initCamera,
})

const fileStore = useFileStore()
const isLoading = ref(false)
const item = ref(null)
const urlFile = ref(null)
const imagePreview = ref(null)
const showModal = ref(false)
const uploader = ref(null)
let cropper = null

onMounted(async () => {
  if (!props.config.photo) {
    await fetchFile()
  } else {
    urlFile.value = props.config.photo
  }
})

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
      aspectRatio: 1, // Mantener proporción 1:1 (cuadrado)
      viewMode: 0, // Modo de visualización (0, 1, 2, 3)
      dragMode: 'move', // Modo de arrastre: 'crop', 'move', 'none'
      responsive: true, // Redimensionar el cropper automáticamente al cambiar el tamaño del contenedor
      zoomable: true, // Permitir hacer zoom en la imagen
      scalable: true, // Permitir rotar la imagen
      rotatable: true, // Permitir rotar la imagen
      movable: true, // Permitir mover la imagen
      autoCrop: true, // Recortar automáticamente la imagen al cargarla
      autoCropArea: 0.5, // Área de recorte inicial (entre 0 y 1, donde 1 es el 100% de la imagen)
      highlight: true, // Resaltar el área de recorte
      background: true, // Mostrar el fondo oscuro detrás de la imagen
      minCropBoxWidth: 50, // Ancho mínimo del área de recorte
      minCropBoxHeight: 50,
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

// Recortar y guardar la imagen
const cropImage = async () => {
  if (!cropper) return

  const canvas = cropper.getCroppedCanvas({
    width: 800,
    height: 800, // Ajusta las dimensiones según tus necesidades
  })

  canvas.toBlob(async (blob) => {
    if (!blob) {
      console.error('Error: no se pudo crear el archivo blob.')
      return
    }

    const base64Image = await convertBlobToBase64(blob)

    isLoading.value = true
    const { name, storage, modelId, modelName } = props.config

    try {
      await fileStore.saveFile({
        name,
        storage,
        modelName,
        modelId,
        type: 'image',
        file: base64Image.split(',')[1],
        extension: 'jpg',
        status: 'aprobado',
      })
      await fetchFile()
      showNotifications(fileStore.responseMessages, fileStore.status, 'top-right', 5000)
      cropper.destroy()
      cropper = null
      imagePreview.value = null
      showModal.value = false
      window.location.reload()
    } catch (error) {
      console.error('Error al guardar la imagen:', error)
    } finally {
      isLoading.value = false
    }
  }, 'image/jpeg')
}

// Manejar errores del uploader
const handleFailed = (error) => {
  console.error('Error al cargar la imagen:', error)
}

const fetchFile = async () => {
  // showLoading('Consultando archivo...', 'Por favor, espere', true)
  isLoading.value = true
  const { name, modelId, modelName } = props.config

  const response = await fileStore.getFile({ name, modelName, modelId })
  if (response.data) {
    item.value = response.data
    urlFile.value = `${process.env.URL_FILES}${item.value.url}`
    commonStore.setUserPhoto(item.value.url)
    commonStore.setUserUpdatePhoto(true)
  }
  isLoading.value = false
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
