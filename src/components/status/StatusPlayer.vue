<template>
  <div class="status-player">
    <!-- Barra de progreso -->
    <div class="status-progress">
      <div v-for="(status, index) in statuses" :key="index" class="status-indicator">
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
        ref="video"
        :src="statuses[currentStatus].url"
        @timeupdate="updateProgress"
        @ended="nextStatus"
        @waiting="showLoader = true"
        @canplay="showLoader = false"
        :autoplay="!isPaused"
        playsinline
        :muted="isMuted"
      ></video>

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
    <button class="mute-button" @click.stop="toggleMute">
      <span class="material-icons">{{ isMuted ? 'volume_off' : 'volume_up' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  statuses: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['close'])
const video = ref(null)
const currentStatus = ref(0)
const progress = ref(0)
const isMuted = ref(false)
const isPaused = ref(false)
const showLoader = ref(false) // Muestra el loader mientras el video carga

const updateProgress = () => {
  if (video.value instanceof HTMLVideoElement && video.value.duration) {
    progress.value = video.value.currentTime / video.value.duration
  }
}

const nextStatus = async () => {
  if (currentStatus.value < props.statuses.length - 1) {
    currentStatus.value++
    progress.value = 0
    showLoader.value = true
    await playVideo()
  } else {
    closeStatus()
  }
}

const prevStatus = async () => {
  if (currentStatus.value > 0) {
    currentStatus.value--
    progress.value = 0
    showLoader.value = true
    await playVideo()
  }
}

const closeStatus = () => {
  emit('close')
}

const playVideo = async () => {
  await nextTick()
  if (video.value instanceof HTMLVideoElement) {
    try {
      await video.value.play()
      isPaused.value = false
      showLoader.value = false
    } catch (err) {
      console.error('Error al reproducir el video:', err)
    }
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

const togglePause = () => {
  if (isPaused.value) {
    playVideo()
  } else {
    video.value.pause()
    isPaused.value = true
  }
}

onMounted(() => {
  playVideo()
})

watch(currentStatus, () => {
  playVideo()
})
</script>

<style scoped>
.status-player {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  overflow: hidden;
  cursor: pointer;
}

.status-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

video {
  max-width: 100%;
  max-height: 100%;
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

.nav-button,
.mute-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  z-index: 20;
}

.nav-button.left {
  left: 10px;
  top: 50%;
}

.nav-button.right {
  right: 10px;
  top: 50%;
}

.mute-button {
  top: 10px;
  right: 10px;
}

.material-icons {
  font-size: 24px;
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
  text-align: center; /* Asegura el centrado horizontal */
}

.rotating {
  animation: rotation 1s infinite linear;
  display: inline-block; /* Necesario para asegurar que el ícono se centre dentro del flexbox */
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
