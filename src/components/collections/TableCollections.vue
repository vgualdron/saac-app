<template>
  <div class="q-pa-md q-mb-xl">
    <q-table
      v-if="rowsResume && rowsResume.length > 0"
      class="my-sticky-dynamic"
      title="Resumen de aportes y créditos"
      :rows="rowsResume"
      :columns="columnsResume"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      flat
      bordered
    />
    <q-table
      v-if="rows && rows.length > 0"
      class="my-sticky-dynamic q-mt-md"
      title="Recaudo de aportes realizados"
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="index"
      :pagination="pagination"
      :rows-per-page-options="[0]"
      flat
      bordered
    >
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="3"><strong>Total</strong></q-td>
          <q-td>{{ formatPrice(totalAportes) }}</q-td>
        </q-tr>
      </template>
    </q-table>
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

const totalAportes = computed(() => {
  return collectionStore.collections.reduce((total, c) => total + (parseInt(c.amount) || 0), 0)
})

const rowsResume = computed(() => {
  const safeReduce = (arr) =>
    Array.isArray(arr)
      ? arr.reduce((acc, aporte) => acc + (parseInt(aporte.valor_aporte) || 0), 0)
      : 0

  return [
    {
      description: 'Recaudo de Aportes Realizados',
      amount: safeReduce(collectionStore.collections),
    },
    {
      description: 'Cuotas de Aportes Pendientes de Cobro',
      amount: safeReduce(commonStore.statement?.aportes_pendientes),
    },
    {
      description: 'Recaudo de crédito Realizados',
      amount: safeReduce(commonStore.statement?.cuotas_credito_realizadas),
    },
    {
      description: 'Cuotas de crédito Pendientes de Cobro',
      amount: safeReduce(commonStore.statement?.cuotas_credito_pendientes),
    },
  ]
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

const formatPrice = (val) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val)
}
</script>
<style scoped></style>
