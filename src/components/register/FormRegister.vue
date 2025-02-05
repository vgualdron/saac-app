<template>
  <div class="q-pa-none" style="max-width: 800px; margin: auto">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-img src="~/assets/logo-rectangle.png" width="285" class="q-mx-auto q-my-none" />
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div class="row text-center">
              <div class="col-12 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.company_id"
                  label="Empresa *"
                  input-debounce="0"
                  :options="optionsCompanies"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCompany(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.first_lastname"
                  label="Primer apellido *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.second_lastname"
                  label="Segundo apellido *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-7 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.name"
                  label="Nombres *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.country"
                  label="Nacionalidad *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'COLOMBIANO',
                      name: 'COLOMBIANO',
                    },
                    {
                      id: 'VENEZOLANO',
                      name: 'VENEZOLANO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.type_document"
                  label="T. documento *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'C.C.',
                      name: 'C.C.',
                    },
                    {
                      id: 'T.I.',
                      name: 'T.I.',
                    },
                    {
                      id: 'NUIP',
                      name: 'NUIP',
                    },
                    {
                      id: 'C.E.',
                      name: 'C.E.',
                    },
                    {
                      id: 'CARNET DIPLOMATICO',
                      name: 'CARNET DIPLOMATICO',
                    },
                    {
                      id: 'PASAPORTE',
                      name: 'PASAPORTE',
                    },
                    {
                      id: 'PPT',
                      name: 'PPT',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.document_number"
                  label="Documento *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.date_issue"
                  label="Fecha Expedición *"
                  type="date"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.department_issue"
                  label="Departamento Expedición *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-7 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.city_issue"
                  label="Municipio Expedición *"
                  input-debounce="0"
                  :options="optionsCitiesIssue"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCityIssue(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.gender"
                  label="Sexo *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'MASCULINO',
                      name: 'MASCULINO',
                    },
                    {
                      id: 'FEMENINO',
                      name: 'FEMENINO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.marital_status"
                  label="Estado Civil *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'SOLTERO',
                      name: 'SOLTERO',
                    },
                    {
                      id: 'SEPARADO',
                      name: 'SEPARADO',
                    },
                    {
                      id: 'CASADO',
                      name: 'CASADO',
                    },
                    {
                      id: 'VIUDO',
                      name: 'VIUDO',
                    },
                    {
                      id: 'UNION LIBRE',
                      name: 'UNIÓN LIBRE',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.birthdate"
                  label="Fecha nacimiento *"
                  type="date"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.department_id"
                  label="Departamento Nacimiento *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.city_id"
                  label="Municipio Nacimiento *"
                  input-debounce="0"
                  :options="optionsCities"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCity(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.person_charge_adults"
                  label="Adultos a cargo *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.person_charge_minors"
                  label="Menores a cargo *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.type_house"
                  label="Tipo vivienda *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'PROPIA',
                      name: 'PROPIA',
                    },
                    {
                      id: 'ALQUILADA',
                      name: 'ALQUILADA',
                    },
                    {
                      id: 'FAMILIAR',
                      name: 'FAMILIAR',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.head_of_family"
                  label="Mujer cabeza de hogar *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.stratum"
                  label="Estrato *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 0,
                      name: '0',
                    },
                    {
                      id: 1,
                      name: '1',
                    },
                    {
                      id: 2,
                      name: '2',
                    },
                    {
                      id: 3,
                      name: '3',
                    },
                    {
                      id: 4,
                      name: '4',
                    },
                    {
                      id: 5,
                      name: '5',
                    },
                    {
                      id: 6,
                      name: '6',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val >= 0 || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.department_house"
                  label="Departamento recidencia *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.city_house"
                  label="Municipio de residencia *"
                  input-debounce="0"
                  :options="optionsCitiesHouse"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCityHouse(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.district_house"
                  label="Barrio de residencia *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.address_house"
                  label="Dirección de residencia *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.phone_house"
                  label="Telefono casa *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.phone"
                  label="Celular *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.email"
                  label="Correo electrónico *"
                  type="email"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.academic_level"
                  label="Nivel academico *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'BACHILLER',
                      name: 'BACHILLER',
                    },
                    {
                      id: 'TECNICO',
                      name: 'TÉCNICO',
                    },
                    {
                      id: 'TECNOLOGICO',
                      name: 'TECNOLÓGICO',
                    },
                    {
                      id: 'LICENCIADO',
                      name: 'LICENCIADO',
                    },
                    {
                      id: 'PREGRADO',
                      name: 'PREGRADO',
                    },
                    {
                      id: 'ESPECIALIZADO',
                      name: 'ESPECIALIZADO',
                    },
                    {
                      id: 'DOCTORADO',
                      name: 'DOCTORADO',
                    },
                    {
                      id: 'MAESTRIA',
                      name: 'MAESTRIA',
                    },
                    {
                      id: 'OTRO',
                      name: 'OTRO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form.contribution"
                  label="Valor aporte *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 60000,
                      name: '$60.000',
                    },
                    {
                      id: 70000,
                      name: '$70.000',
                    },
                    {
                      id: 80000,
                      name: '$80.000',
                    },
                    {
                      id: 90000,
                      name: '$90.000',
                    },
                    {
                      id: 100000,
                      name: '$100.000',
                    },
                    {
                      id: 120000,
                      name: '$120.000',
                    },
                    {
                      id: 150000,
                      name: '$150.000',
                    },
                    {
                      id: 200000,
                      name: '$200.000',
                    },
                    {
                      id: 300000,
                      name: '$300.000',
                    },
                    {
                      id: 400000,
                      name: '$400.000',
                    },
                    {
                      id: 500000,
                      name: '$500.000',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form.instagram"
                  label="Cuenta instagram (opcional)"
                  type="text"
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
import { reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()
const router = useRouter()

const initialFormState = {
  company_id: '',
  country: '',
  first_lastname: '',
  second_lastname: '',
  name: '',
  type_document: '',
  document_number: '',
  date_issue: '',
  department_issue: '',
  city_issue: '',
  gender: '',
  marital_status: '',
  birthdate: '',
  department_id: '',
  city_id: '',
  type_house: '',
  person_charge_adults: '',
  person_charge_minors: '',
  head_of_family: '',
  stratum: '',
  department_house: '',
  city_house: '',
  district_house: '',
  address_house: '',
  phone_house: '',
  phone: '',
  email: '',
  academic_level: '',
  contribution: '',
  instagram: '',
  active: 1,
}

const form = reactive({ ...initialFormState })

const onSubmit = async () => {
  showLoading('Creando cuenta ...', 'Por favor, espere', true)
  const data = { ...form }
  await commonStore.signUp(data)

  if (commonStore.status) {
    router.push('/')
  }
  showNotification(commonStore.responseMessages, commonStore.status, 'bottom-right', 5000)
  $q.loading.hide()
}

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const login = () => {
  console.log(form)
  router.push('/')
}

const onReset = () => {
  Object.assign(form, initialFormState)
}

const getNameCompany = (value) => {
  let name = optionsCompanies.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 30) {
    name = truncateString(name, 30)
  }
  return name
}

const getNameDepartment = (value) => {
  let name = optionsDepartments.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCityIssue = (value) => {
  let name = optionsCitiesIssue.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCity = (value) => {
  let name = optionsCities.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCityHouse = (value) => {
  let name = optionsCitiesHouse.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}

const optionsCompanies = computed(() => {
  return commonStore.companies
})

const optionsDepartments = computed(() => {
  return commonStore.departments
})

const optionsCitiesIssue = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form.department_issue)
})

const optionsCities = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form.department_id)
})

const optionsCitiesHouse = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form.department_house)
})

watch(
  () => form.department_issue,
  () => {
    form.city_issue = ''
  },
)

watch(
  () => form.department_id,
  () => {
    form.city_id = ''
  },
)

watch(
  () => form.department_house,
  () => {
    form.city_house = ''
  },
)

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getDepartments()
  await commonStore.getCities()
  await commonStore.getCompanies()
  $q.loading.hide()
})
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 800px;
}
</style>
