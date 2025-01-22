<template>
  <div class="q-pa-none" style="max-width: 800px; margin: auto">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <img src="~/assets/logo-rectangle.png" width="285" class="q-mx-auto q-my-none" />
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row text-center">
              <div class="col-6 text-center">
                <q-input
                  dense
                  v-model.trim="first_lastname"
                  label="Primer apellido *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <q-input
                  dense
                  v-model.trim="second_lastname"
                  label="Segundo apellido *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="name"
                  label="Nombres *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-3 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="type_document"
                  label="T. documento *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="document_number"
                  label="Documento *"
                  type="number"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-4 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="date_issue"
                  label="Fecha Expedición *"
                  type="date"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="department_issue"
                  label="Departamento Expedición *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="city_issue"
                  label="Municipio Expedición *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-4 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="gender"
                  label="Sexo *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-4 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="marital_status"
                  label="Estado Civil *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-4 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="birthdate"
                  label="Fecha nacimiento *"
                  type="date"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="department_id"
                  label="Departamento Nacimiento *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="city_id"
                  label="Municipio Nacimiento *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="person_charge_adults"
                  label="# Adultos a cargo *"
                  type="number"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="person_charge_minors"
                  label="# Menores a cargo *"
                  type="number"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-3 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="type_house"
                  label="T. vivienda *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="head_of_family"
                  label="Mujer cabeza de hogar *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-3 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="stratum"
                  label="Estrato *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="department_house"
                  label="Departamento de residencia *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="city_house"
                  label="Municipio de residencia *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="district_house"
                  label="Barrio de residencia *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="address_house"
                  label="Dirección de residencia *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="phone_house"
                  label="Telefono casa *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="phone"
                  label="Celular *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-7 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="email"
                  label="Correo electrónico *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="academic_level"
                  label="Nivel academico *"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-4 q-pl-none text-center">
                <q-input
                  dense
                  v-model.trim="contribution"
                  label="Valor aporte *"
                  type="number"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-8 q-pl-sm text-center">
                <q-input
                  dense
                  v-model.trim="instagram"
                  label="Cuenta instagram (opcional)"
                  type="text"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
            </div>

            <div class="row text-center">
              <q-btn label="REGISTRARSE" type="submit" color="primary" class="col" rounded />
            </div>
            <div class="row text-center">
              <q-btn
                label="REGRESAR A INICIAR SESIÓN"
                color="primary"
                class="col"
                @click="login"
                rounded
                outline
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()
const router = useRouter()

const first_lastname = ref('')
const second_lastname = ref('')
const name = ref('')
const type_document = ref('')
const document_number = ref('')
const date_issue = ref('')
const department_issue = ref('')
const city_issue = ref('')
const gender = ref('')
const marital_status = ref('')
const birthdate = ref('')
const department_id = ref('')
const city_id = ref('')
const type_house = ref('')
const person_charge_adults = ref('')
const person_charge_minors = ref('')
const head_of_family = ref('')
const stratum = ref('')
const department_house = ref('')
const city_house = ref('')
const district_house = ref('')
const address_house = ref('')
const phone_house = ref('')
const phone = ref('')
const email = ref('')
const academic_level = ref('')
const contribution = ref('')
const instagram = ref('')

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const onSubmit = async () => {
  showLoading('Iniciando sesión ...', 'Por favor, espere', true)
  const data = {}
  await commonStore.signIn(data)
  if (!commonStore.status) {
    showNotification(commonStore.responseMessages, false, 'bottom-right', 5000)
    $q.loading.hide()
  } else {
    $q.loading.hide()
    const d = [
      {
        text: 'OK',
        detail: commonStore.user,
      },
    ]
    showNotification(d, commonStore.status, 'bottom-right', 5000)
    router.push('/home')
  }
}

const login = () => {
  router.push('/')
}

const onReset = () => {
  name.value = ''
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
}
</style>
