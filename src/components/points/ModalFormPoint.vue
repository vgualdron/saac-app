<template>
  <q-dialog v-model="showModal">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="loyalty" color="primary" size="md" />
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
            <q-select
              dense
              rounded
              outlined
              emit-value
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="form.category"
              label="Categoria de convenios *"
              input-debounce="0"
              :options="optionsCategories"
              option-value="id"
              option-label="name"
              behavior="menu"
              clearable
            >
              <template v-slot:selected-item="scope">
                <span>
                  {{ getNameCategory(scope.opt) }}
                </span>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-select
              dense
              rounded
              outlined
              emit-value
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="form.shop_id"
              label="Convenio *"
              input-debounce="0"
              :options="optionsShops"
              option-value="id"
              option-label="name"
              behavior="menu"
              class="q-mt-md"
              reactive-rules
              :rules="[(val) => val && val > 0]"
              clearable
            >
              <template v-slot:selected-item="scope">
                <span>
                  {{ getNameShop(scope.opt) }}
                </span>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              dense
              rounded
              outlined
              v-model.trim="form.invoice_number"
              label="Número de factura *"
              type="text"
              class="q-mt-none"
              reactive-rules
              :rules="[(val) => (val && val.length > 0) || 'Este campo es obligatorio']"
            />
            <q-input
              dense
              rounded
              outlined
              v-model="formattedPrice"
              :label="`Valor `"
              type="text"
              @update:model-value="updatePrice"
              reactive-rules
              :rules="[(val) => form.price >= 1000 || 'Este campo es obligatorio']"
            />
            <upload-invoice v-model="form.photo" />
            <div v-if="!form.photo && showError" class="text-red">
              Campo obligatorio, debes cargar imagen de la factura.
            </div>
            <q-separator />
            <div class="row text-center q-my-sm">
              <q-btn label="Solicitar puntos" type="submit" color="primary" class="col" rounded />
            </div>
            <div class="row text-center q-my-sm">
              <q-btn label="Cerrar" color="primary" class="col" rounded outline v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import UploadInvoice from 'components/points/UploadInvoice.vue'
import { useCommonStore } from '../../stores/common'
import { usePointStore } from '../../stores/point'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const pointStore = usePointStore()
const $q = useQuasar()
const emit = defineEmits(['update:value'])

const props = defineProps({
  value: Boolean,
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  $q.loading.hide()
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getCategories()
  await commonStore.getShops()
  $q.loading.hide()
})

const showModal = computed({
  get: () => props.value,
  set: (val) => {
    emit('update:value', val)
  },
})

const initialFormState = {
  category: '',
  shop_id: '',
  invoice_number: '',
  amount: 0,
  price: 0,
  description: 'Redimir puntos con compras',
  photo: null,
}

const form = reactive({ ...initialFormState })
const formattedPrice = ref(initialFormState.price)
const showError = ref(false)

const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const updatePrice = (value) => {
  const numericValue = value.replace(/\D/g, '')
  form.price = numericValue
  formattedPrice.value = new Intl.NumberFormat('es-CO').format(numericValue)
}

const optionsShops = computed(() => {
  let s = commonStore.shops
  if (form.category) {
    s = commonStore.shops.filter((sh) => sh.category_id === form.category)
  }
  return s
})
const optionsCategories = computed(() => {
  return commonStore.categories
})

const getNameCategory = (value) => {
  let name = optionsCategories.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 30) {
    name = truncateString(name, 30)
  }
  return name
}

const getNameShop = (value) => {
  let name = optionsShops.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 30) {
    name = truncateString(name, 30)
  }
  return name
}

const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}

const user = computed(() => {
  let u = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    u = commonStore.user.data.user
  }
  return u
})

const validateForm = () => {
  if (!form.photo) {
    showError.value = true
  } else {
    showError.value = false
  }
}

const onSubmit = async () => {
  validateForm()
  if (showError.value) {
    return false
  }
  showLoading('Registrando ...', 'Por favor, espere', true)
  const data = {
    ...form,
    photo: form.photo.split(',')[1],
    user_id: user.value.user_id,
  }

  await pointStore.save(data)
  showNotification(pointStore.responseMessages, pointStore.status, 'bottom-right', 5000)

  if (pointStore.status) {
    showModal.value = false
    await pointStore.listByUserSession('pendiente,aprobado,rechazado,creado')
  }
  $q.loading.hide()
}

const onReset = () => {
  showModal.value = false
}
</script>
<style scoped></style>
