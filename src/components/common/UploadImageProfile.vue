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
          <div class="text-h6">Subir foto</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="row">
            <q-uploader
              accept="image/*"
              ref="uploader"
              color="primary"
              text-color="white"
              :no-thumbnails="false"
              label="Haz clic en el [+] para seleccionar"
              :multiple="false"
              :url="uploadUrl"
              field-name="file"
              @added="handleAdded"
              @failed="handleFailed"
              :factory="fileFactory"
              :hide-upload-btn="true"
              :auto-upload="false"
              @click="handleUploaderClick"
            />
          </div>
        </q-card-section>
        <q-separator />
        <div class="row text-center q-pa-md">
          <q-btn
            label="Guardar"
            color="primary"
            class="col q-ml-sm"
            :disabled="!image"
            @click="sendImage"
            :loading="isLoading"
          />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFileStore } from '../../stores/file'
import { showNotifications } from '../../helpers/showNotifications'
// import { showLoading } from '../../helpers/showLoading'

const props = defineProps({
  config: Object,
  type: {
    type: String,
    default: '',
  },
})

const file = computed(() => (image.value ? image.value.file : null))
const extension = computed(() => (image.value ? image.value.type.split('/')[1] : null))

const fileStore = useFileStore()

const isLoading = ref(false)
const item = ref(null)
const urlFile = ref(null)
const image = ref(null)
const showModal = ref(false)
const uploadUrl = ref('https://example.com/upload')
const uploader = ref(null)

onMounted(async () => {
  if (!props.config.photo) {
    await fetchFile()
  } else {
    urlFile.value = props.config.photo
  }
})

// Función para manejar el clic en el uploader
const handleUploaderClick = () => {
  uploader.value.pickFiles()
}

// Función para manejar los errores de carga
const handleFailed = (error) => {
  console.error('Error al cargar', error)
}

// Función para procesar el archivo antes de enviarlo
const fileFactory = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        // Configurar las nuevas dimensiones (ajustar según sea necesario)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Establecer las dimensiones deseadas (por ejemplo, 800px de ancho)
        const maxWidth = 800
        const scaleFactor = maxWidth / img.width
        const newWidth = maxWidth
        const newHeight = img.height * scaleFactor

        // Redimensionar la imagen en el canvas
        canvas.width = newWidth
        canvas.height = newHeight
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        // Convertir la imagen redimensionada a un archivo
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type })
          resolve(resizedFile) // Resolver con el archivo redimensionado
        }, file.type)
      }
      img.onerror = (error) => reject(error)
      img.src = reader.result
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file) // Leer el archivo como URL de datos
  })
}

const handleAdded = (files) => {
  if (files.length > 0) {
    const file = files[0]
    if (file instanceof File) {
      const reader = new FileReader()
      reader.onload = (e) => {
        image.value = {
          name: file.name,
          type: file.type,
          file: e.target.result.split(',')[1],
        }
      }
      reader.readAsDataURL(file)
    } else {
      console.error('El archivo no es válido:', file)
    }
  }
}

const initCamera = () => {
  showModal.value = true
}

const sendImage = async () => {
  // showLoading('Guardando ...', 'Por favor, espere', true)
  isLoading.value = true
  const { name, storage, modelId, modelName } = props.config

  await fileStore.saveFile({
    name,
    storage,
    modelName,
    modelId,
    type: 'image',
    file: file.value,
    extension: extension.value,
    status: 'aprobado',
  })

  showModal.value = false
  showNotifications(fileStore.responseMessages, fileStore.status, 'top-right', 5000)
  window.location.reload()
  isLoading.value = false
}

const fetchFile = async () => {
  // showLoading('Consultando archivo...', 'Por favor, espere', true)
  isLoading.value = true
  const { name, modelId, modelName } = props.config

  const response = await fileStore.getFile({ name, modelName, modelId })
  if (response.data) {
    item.value = response.data
    urlFile.value = `${process.env.URL_FILES}${item.value.url}`
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
}
</style>
