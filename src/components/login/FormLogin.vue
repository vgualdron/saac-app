<template>
  <div :style="backgroundStyle" class="login-container">
    <div class="q-pa-md" style="width: 400px; margin: auto">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-img
            src="~/assets/logo-rectangle-transparent.png"
            width="285"
            class="q-mx-auto q-my-md"
          />
        </q-card-section>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="col-12">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-none">
              <q-input
                dense
                rounded
                outlined
                v-model.trim="form.documentNumber"
                label="Número de documento *"
                type="number"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
              />
              <q-input
                dense
                rounded
                outlined
                v-model.trim="form.password"
                label="Contraseña *"
                type="password"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
              />
              <div class="row text-center q-mb-md">
                <q-btn label="INICIAR SESIÓN" type="submit" color="primary" class="col" rounded />
              </div>
              <div class="row text-center q-mt-sm">
                <q-btn
                  label="REGISTRARSE"
                  color="primary"
                  class="col"
                  @click="register"
                  rounded
                  outline
                />
              </div>
              <p class="text-center q-mt-md">{{ versionApp }}</p>
            </q-form>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

// Importar la imagen de fondo
import backgroundImage from '../../assets/background_1.png'

const commonStore = useCommonStore()
const $q = useQuasar()
const router = useRouter()

const versionApp = computed(() => `Versión ${process.env.LATEST_VERSION_APP}`)

const initialFormState = {
  documentNumber: '',
  password: '',
}

const form = reactive({ ...initialFormState })

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const onSubmit = async () => {
  showLoading('Iniciando sesión ...', 'Por favor, espere', true)
  const data = { ...form }

  await commonStore.signIn(data)

  if (commonStore.status) {
    router.push('/home')
  } else {
    showNotifications(commonStore.responseMessages, false, 'bottom-right', 5000)
  }
  $q.loading.hide()
}

const register = () => {
  router.push('/register')
}

const onReset = () => {
  Object.assign(form, initialFormState)
}

onMounted(async () => {
  if (commonStore.isLoggedIn) {
    console.log('isLoggedIn!')
    router.push('/home')
  } else {
    console.log('notLoggedIn!')
  }
})
</script>

<style scoped>
.my-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.5); /* Fondo semitransparente */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
