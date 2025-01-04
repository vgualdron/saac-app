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
              outlined
              v-model.trim="email"
              label="Correo *"
              type="email"
              hint="Escriba su correo"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <q-input
              outlined
              v-model.trim="password"
              label="Contraseña *"
              hint="Escriba la contraseña"
              type="password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <div class="row text-center">
              <q-btn label="Entrar" type="submit" color="primary" class="col" />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
    <p class="text-center">{{ versionApp }}</p>
  </div>
</template>
<script>
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  computed: {
    commonStore() {
      return useCommonStore()
    },
    versionApp() {
      return `Versión ${process.env.LATEST_VERSION_APP}`
    },
  },
  created() {
    this.validateLogin()
  },
  methods: {
    showNotification(messages, status, align, timeout) {
      showNotifications(messages, status, align, timeout)
    },
    async onSubmit() {
      showLoading('Iniciando sesión ...', 'Por favor, espere', true)
      const data = {
        email: this.email,
        password: this.password,
      }
      await this.commonStore.signIn(data)
      if (this.commonStore.status && this.commonStore.status.status !== 200) {
        this.showNotification([this.commonStore.status.message], false, 'bottom-right', 5000)
        this.$q.loading.hide()
      } else {
        this.$q.loading.hide()
        this.$router.push('/home')
      }
    },
    onReset() {
      this.email = null
      this.password = null
    },
    validateLogin() {
      /* if (localStorage.getItem('tokenMC')) {
        this.$router.push('/home')
      } */
    },
  },
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
</style>
