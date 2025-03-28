<template>
  <div v-if="isLoaded" class="status-player">
    <!-- Barra de progreso -->
    <div class="status-progress">
      <div v-for="(status, index) in fileStore.statusesToday" :key="index" class="status-indicator">
        <div
          class="status-fill"
          :style="{
            width:
              index === currentStatus
                ? progress * 100 + '%'
                : index < currentStatus
                  ? '100%'
                  : '0%',
          }"
        ></div>
      </div>
    </div>

    <div class="status-container" @click="togglePause">
      <video
        v-if="currentFile.type === 'video'"
        ref="video"
        :src="getUrl(currentFile.url)"
        @timeupdate="updateProgress"
        @ended="nextStatus"
        @waiting="showLoader = true"
        @canplay="showLoader = false"
        :autoplay="!isPaused"
        playsinline
        :muted="isMuted"
      ></video>

      <img
        v-else-if="currentFile.type === 'image'"
        :src="getUrl(currentFile.url)"
        class="status-image"
      />

      <!-- Loader -->
      <div v-if="showLoader" class="loader">
        <span class="material-icons rotating">cached</span>
      </div>
    </div>

    <!-- Botones de navegación -->
    <button class="nav-button left" @click.stop="prevStatus">
      <span class="material-icons">chevron_left</span>
    </button>
    <button class="nav-button right" @click.stop="nextStatus">
      <span class="material-icons">chevron_right</span>
    </button>

    <!-- Botón de mute -->
    <button class="mute-button" @click.stop="toggleMute" v-if="currentFile.type === 'video'">
      <span class="material-icons">{{ isMuted ? 'volume_off' : 'volume_up' }}</span>
    </button>
    <button class="download-button" @click.stop="downloadFile">
      <span class="material-icons">download</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { useFileStore } from '../../stores/file'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const fileStore = useFileStore()
const isLoaded = ref(false)
const video = ref(null)
const currentStatus = ref(0)
const progress = ref(0)
const isMuted = ref(false)
const isPaused = ref(false)
const showLoader = ref(false)
const imageTimeout = ref(null)

const emit = defineEmits(['close'])

const currentFile = computed(() => fileStore.statusesToday[currentStatus.value] || {})

const updateProgress = () => {
  if (currentFile.value.type === 'image') {
    progress.value = 1
  } else if (video.value instanceof HTMLVideoElement && video.value.duration) {
    progress.value = video.value.currentTime / video.value.duration
  }
}

const nextStatus = async () => {
  if (currentStatus.value < fileStore.statusesToday.length - 1) {
    currentStatus.value++
    progress.value = 0
    showLoader.value = true
    await playFile()
  } else {
    closeStatus()
  }
}

const prevStatus = async () => {
  if (currentStatus.value > 0) {
    currentStatus.value--
    progress.value = 0
    showLoader.value = true
    await playFile()
  }
}

const closeStatus = () => {
  emit('close')
}

const getUrl = (url) => {
  return `${process.env.URL_FILES}${url}`
}

const playFile = async () => {
  await nextTick()
  if (currentFile.value.type === 'video' && video.value instanceof HTMLVideoElement) {
    try {
      await video.value.play()
      isPaused.value = false
      showLoader.value = false
    } catch (err) {
      console.error('Error al reproducir el video:', err)
    }
  } else if (currentFile.value.type === 'image') {
    progress.value = 1
    showLoader.value = false // 🔹 Ocultar loader para imágenes
    clearTimeout(imageTimeout.value)
    imageTimeout.value = setTimeout(nextStatus, 5000) // Mostrar imagen por 5s
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

const togglePause = () => {
  if (currentFile.value.type === 'video') {
    if (isPaused.value) {
      playFile()
    } else {
      video.value.pause()
      isPaused.value = true
    }
  }
}

const formatLinkRoute = (url) => {
  return `${process.env.URL_FILES}${url}`
}

const downloadFile = async () => {
  const fileUrl = formatLinkRoute(currentFile.value.url)
  const url = `${process.env.URL_API}/download-file-from-url?type=${currentFile.value.type}&extension=${currentFile.value.extension}&url=${fileUrl}`
  window.open(url, '_blank')
}

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await fileStore.listStatusesToday()
  hideLoading()
  isLoaded.value = true
  playFile()
})

watch(currentStatus, () => {
  playFile()
})
</script>

<style scoped>
video,
.status-image {
  max-width: 100%;
  max-height: 100%;
}

.status-player {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  cursor: pointer;
}

.status-progress {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 10;
}

.status-indicator {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  background: #65a30d;
  transition: width 0.2s ease;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 20;
  font-size: 48px;
}

.nav-button.left {
  left: 20px;
}

.nav-button.right {
  right: 20px;
}

.mute-button {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 20;
  font-size: 28px;
  background: transparent;
}

.download-button {
  position: absolute;
  top: 20px;
  right: 60px;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 20;
  font-size: 28px;
  background: transparent;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 48px;
  z-index: 30;
}

.rotating {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
