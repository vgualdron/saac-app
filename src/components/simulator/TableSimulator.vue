<template>
  <div class="q-pa-md">
    <div class="col-7 q-pl-sm text-center">
      <q-select
        dense
        rounded
        outlined
        map-options
        transition-show="flip-up"
        transition-hide="flip-down"
        v-model="form.creditLine"
        label="Línea de crédito *"
        input-debounce="0"
        :options="optionsCreditLines"
        option-value="id"
        option-label="name"
        behavior="menu"
        reactive-rules
        :rules="[(val) => val || 'Obligatorio']"
      >
      </q-select>
    </div>
    <q-table
      class="my-sticky-dynamic"
      flat
      bordered
      title="Recaudos"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="index"
      :pagination="pagination"
      :rows-per-page-options="[0]"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
// import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()

const loading = ref(false)
const pagination = ref({
  rowsPerPage: 1000,
})

const initialFormState = {
  creditLine: 1,
}
const form = reactive({ ...initialFormState })

const optionsCreditLines = computed(() => {
  return commonStore.creditLines
})

onMounted(async () => {
  loading.value = true
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getCreditLines()
  $q.loading.hide()
  loading.value = false
})

const rows = computed(() => commonStore.creditLines)

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    align: 'left',
  },
  {
    name: 'period_name',
    required: true,
    label: 'Periodo',
    align: 'left',
    field: (row) => row.period_name,
    format: (val) => {
      if (!val) return ''
      const [month, year] = val.split(' ')
      const abbreviatedMonth = month.substring(0, 3)
      return `${abbreviatedMonth} ${year}`
    },
    sortable: true,
  },
  {
    name: 'date',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.date,
    format: (val) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(val).toLocaleDateString('es-ES', options)
    },
    sortable: true,
  },
  {
    name: 'amount',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val)
    },
    sortable: true,
  },
]
</script>
<style scoped></style>
