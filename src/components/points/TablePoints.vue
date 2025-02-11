<template>
  <div class="q-pa-md q-mb-xl">
    <q-table
      class="my-sticky-dynamic"
      flat
      bordered
      :title="title"
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
import { computed, onMounted, ref } from 'vue'
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

onMounted(async () => {
  loading.value = true
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getPoints('pendiente,aprobado,rechazado,creado')
  $q.loading.hide()
  loading.value = false
})

const rows = computed(() => commonStore.points)
const total = computed(() => {
  return commonStore.points.reduce((acc, item) => acc + item.amount, 0)
})
const title = computed(() => {
  return `Puntos ( ${total.value} )`
})

const columns = [
  {
    name: 'date',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.created_at,
    format: (val) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(val).toLocaleDateString('es-ES', options)
    },
    sortable: true,
  },
  {
    name: 'amount',
    required: true,
    label: 'Cantidad',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => {
      return new Intl.NumberFormat('es-ES', {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val)
    },
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Descripción',
    align: 'left',
    field: (row) => row.description,
    sortable: true,
  },
]
</script>
<style scoped></style>
