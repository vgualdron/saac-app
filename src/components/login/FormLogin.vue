<template>
  <div class="q-pa-md" style="max-width: 400px; margin: auto">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <img src="~/assets/logo-rectangle.png" width="285" class="q-mx-auto q-my-md" />
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              dense
              v-model.trim="documentNumber"
              label="Número de documento *"
              hint="Escriba su número de documento"
              type="number"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <q-input
              dense
              v-model.trim="password"
              label="Contraseña *"
              hint="Escriba la contraseña"
              type="password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <div class="row text-center">
              <q-btn label="INICIAR SESION" type="submit" color="primary" class="col" rounded />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
    <p class="text-center">{{ versionApp }}</p>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()
const router = useRouter()

const versionApp = computed(() => `Versión ${process.env.LATEST_VERSION_APP}`)

const documentNumber = ref('')
const password = ref('')

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const onSubmit = async () => {
  showLoading('Iniciando sesión ...', 'Por favor, espere', true)
  const data = {
    documentNumber: documentNumber.value,
    password: password.value,
  }
  await commonStore.signIn(data)
  if (!commonStore.status) {
    showNotification(commonStore.responseMessages, false, 'bottom-right', 5000)
    $q.loading.hide()
  } else {
    $q.loading.hide()
    router.push('/home')
  }
}

const onReset = () => {
  documentNumber.value = ''
  password.value = ''
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
</style>
