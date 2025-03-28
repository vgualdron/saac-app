<template>
  <div class="q-px-md" style="max-width: 400px; margin: auto">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img src="/icons/icon.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Enviar PQR</q-item-label>
          <q-item-label caption> Escribe tu petición, queja o reclamo </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-none">
            <q-input
              dense
              rounded
              outlined
              v-model.trim="form.message"
              label="Mesaje *"
              type="textarea"
              rows="4"
              maxlength="300"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <div class="row text-center q-mb-md">
              <q-btn label="ENVIAR MENSAJE" type="submit" color="primary" class="col" rounded />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const router = useRouter()

const initialFormState = {
  message: '',
}

const form = reactive({ ...initialFormState })

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const onSubmit = async () => {
  showLoading('Enviado pqr ...', 'Por favor, espere', true)
  let user = commonStore.user?.data?.user || {}

  const data = {
    ...form,
    subject: `PQR Contacto Progress App - ${user.name}`,
    name: user.name || 'Usuario Desconocido',
    document: user.document || 'N/A',
  }

  await commonStore.sendPqr(data)

  if (commonStore.status) {
    showNotification(commonStore.responseMessages, true, 'bottom-right', 5000)
    router.push('/home')
  } else {
    showNotification(commonStore.responseMessages, false, 'bottom-right', 5000)
  }
  hideLoading()
}

const onReset = () => {
  Object.assign(form, initialFormState)
}

onMounted(async () => {})
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
</style>
