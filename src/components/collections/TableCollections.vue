<template>
  <div class="q-pa-md q-mb-xl">
    <q-table
      class="my-sticky-dynamic"
      flat
      bordered
      title="Resumen de aportes y créditos"
      :rows="rowsResume"
      :columns="columnsResume"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[0]"
    />
    <q-table
      class="my-sticky-dynamic q-mt-md"
      flat
      bordered
      title="Recaudo de aportes realizados"
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
import { useCollectionStore } from '../../stores/collection'
import { useCommonStore } from '../../stores/common'
// import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const collectionStore = useCollectionStore()
const commonStore = useCommonStore()
const $q = useQuasar()

const loading = ref(false)
const pagination = ref({
  rowsPerPage: 1000,
})

onMounted(async () => {
  loading.value = true
  showLoading('Cargando ...', 'Por favor, espere', true)
  let document = ''
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    document = commonStore.user.data.user.document
  }
  await collectionStore.getCollections(document)
  await commonStore.getStatement(document)
  $q.loading.hide()
  loading.value = false
})

const rows = computed(() => collectionStore.collections)
const rowsResume = computed(() => {
  const a = [
    {
      description: 'Recaudo de Aportes Realizados',
      amount: commonStore.statement.aportes_realizados.reduce(
        (acc, aporte) => acc + (aporte.valor_aporte || 0),
        0,
      ),
    },
    {
      description: 'Cuotas de Aportes Pendientes de Cobro',
      amount: commonStore.statement.aportes_pendientes.reduce(
        (acc, aporte) => acc + (aporte.valor_aporte || 0),
        0,
      ),
    },
    {
      description: 'Recaudo de crédito Realizados',
      amount: commonStore.statement.cuotas_credito_realizadas.reduce(
        (acc, aporte) => acc + (aporte.valor_aporte || 0),
        0,
      ),
    },
    {
      description: 'Cuotas de crédito Pendientes de Cobro',
      amount: commonStore.statement.cuotas_credito_pendientes.reduce(
        (acc, aporte) => acc + (aporte.valor_aporte || 0),
        0,
      ),
    },
  ]
  return a
})

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

const columnsResume = [
  {
    name: 'description',
    required: true,
    label: 'Descripción',
    align: 'left',
    field: (row) => row.description,
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
