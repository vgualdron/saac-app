<template>
  <q-dialog v-model="showModal" persistent>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img src="/icons/icon.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> Redimir progrepuntos </q-item-label>
          <q-item-label caption> Completa los datos y carga la factura </q-item-label>
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
              v-model.trim="form.password"
              label="Contraseña *"
              type="password"
              reactive-rules
              :rules="rules.password"
            />
            <q-input
              dense
              rounded
              outlined
              v-model.trim="form.confirmPassword"
              label="Confirmar contraseña *"
              type="password"
              reactive-rules
              :rules="rules.confirmPassword"
            />

            <upload-image
              :config="{
                name: 'FOTO_PUNTOS',
                storage: 'points',
                modelName: 'points',
                modelId: 1,
              }"
            />
            <div class="row text-center q-mb-md">
              <q-btn label="Cambiar contraseña" type="submit" color="primary" class="col" rounded />
            </div>
            <div class="row text-center q-mb-sm">
              <q-btn label="Cerrar" color="primary" class="col" rounded outline v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useQuasar } from 'quasar'
// import UploadImage from 'components/common/UploadImage.vue'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()

const props = defineProps({
  value: Boolean,
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getPoints('pendiente,aprobado,rechazado,creado')
  $q.loading.hide()
})

const showModal = computed({
  get: () => props.value,
  set: (val) => val,
})

const initialFormState = {
  password: '',
  confirmPassword: '',
}

const form = reactive({ ...initialFormState })

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const user = computed(() => {
  let u = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    u = commonStore.user.data.user
  }
  return u
})

const rules = {
  password: [
    (val) => !!val || 'Debe ingresar una contraseña',
    (val) => val.length >= 5 || 'La contraseña debe tener un mínimo de 5 caracteres',
    (val) => val.length <= 20 || 'La contraseña debe tener un máximo de 20 caracteres',
  ],
  confirmPassword: [
    (val) => !!val || 'Debe ingresar una confirmación de contraseña',
    (val) => val === form.password || 'La confirmación no coincide con la contraseña',
  ],
}

const onSubmit = async () => {
  showLoading('Cambiando contraseña ...', 'Por favor, espere', true)
  const data = {
    ...form,
    id: user.value.user_id,
  }

  await commonStore.changePassword(data)
  showNotification(commonStore.responseMessages, commonStore.status, 'bottom-right', 5000)

  /* if (commonStore.status) {
    router.push('/')
  } */
  $q.loading.hide()
}

const onReset = () => {
  showModal.value = false
}
</script>
<style scoped></style>
