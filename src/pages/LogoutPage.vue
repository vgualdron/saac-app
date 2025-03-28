<template>
  <q-page class="flex flex-center q-mt-none" style="display: block"> </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { resetAllStores } from '../stores/resetAllStores'
import { showLoading, hideLoading } from '../helpers/showLoading'

const router = useRouter()

const logout = () => {
  resetAllStores()
  localStorage.clear()
  router.push('/')
}

onMounted(async () => {
  showLoading('Saliendo ...', 'Por favor, espere', true)
  logout()
  hideLoading()
})
</script>
