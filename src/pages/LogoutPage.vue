<template>
  <q-page class="flex flex-center q-mt-none" style="display: block">
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { resetAllStores } from '../stores/resetAllStores';
import { showLoading } from '../helpers/showLoading';

const router = useRouter();
const $q = useQuasar();

const logout = () => {
  resetAllStores();
  localStorage.clear();
  router.push('/')
}

onMounted(async () => {
  showLoading('Saliendo ...', 'Por favor, espere', true)
  logout();
  $q.loading.hide()
})
</script>
