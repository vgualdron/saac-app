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
      row-key="description"
    >
      <template v-slot:body="props">
        <q-tr :props="props" @click="scrollToTable(props.rowIndex)" class="clickable-row">
          <q-td key="description">{{ props.row.description }}</q-td>
          <q-td key="amount">{{ formatPrice(props.row.amount) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="rows && rows.length > 0"
      id="table1"
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
          <q-td>{{ formatPrice(totalRows) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="rows2 && rows2.length > 0"
      id="table2"
      class="my-sticky-dynamic q-mt-md"
      title="Cuotas de Aportes Pendientes de Cobro"
      :rows="rows2"
      :columns="columns2"
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
          <q-td>{{ formatPrice(totalRows2) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="rows3 && rows3.length > 0"
      id="table3"
      class="my-sticky-dynamic q-mt-md"
      title="Recaudo de crédito Realizados"
      :rows="rows3"
      :columns="columns3"
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
          <q-td>{{ formatPrice(totalRows3) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="rows4 && rows4.length > 0"
      id="table4"
      class="my-sticky-dynamic q-mt-md"
      title="Cuotas de crédito Pendientes de Cobro"
      :rows="rows4"
      :columns="columns4"
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
          <q-td>{{ formatPrice(totalRows4) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-if="rows5 && rows5.length > 0"
      id="table5"
      class="my-sticky-dynamic q-mt-md"
      title="Cuotas de crédito Pendientes de Cobro a Futuro"
      :rows="rows5"
      :columns="columns5"
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
          <q-td>{{ formatPrice(totalRows5) }}</q-td>
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

const rowsResume = computed(() => {
  const safeReduce = (arr, field) =>
    Array.isArray(arr) ? arr.reduce((acc, aporte) => acc + (parseInt(aporte[field]) || 0), 0) : 0

  return [
    {
      description: 'Recaudo de Aportes Realizados',
      amount: safeReduce(commonStore.statement?.aportes_realizados, 'valor_aporte'),
    },
    {
      description: 'Cuotas de Aportes Pendientes de Cobro',
      amount: safeReduce(commonStore.statement?.aportes_pendientes, 'total_aportes'),
    },
    {
      description: 'Recaudo de crédito Realizados',
      amount: safeReduce(commonStore.statement?.cuotas_credito_realizadas, 'valor_cuota_credito'),
    },
    {
      description: 'Cuotas de crédito Pendientes de Cobro',
      amount: safeReduce(commonStore.statement?.cuotas_credito_pendientes, 'total_cuotas_credito'),
    },
    {
      description: 'Cuotas de Créditos Pendientes de Cobro a Futuro',
      amount: safeReduce(commonStore.statement?.cuotas_credito_pendientes_futuro, 'valor_cuota'),
    },
  ]
})

const columnsResume = [
  {
    name: 'description',
    required: true,
    label: 'Descripción',
    align: 'left',
    field: (row) => row.description,
    sortable: false,
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
    sortable: false,
  },
]

const rows = computed(() => commonStore.statement?.aportes_realizados)

const totalRows = computed(() => {
  return rows.value.reduce((total, c) => total + (parseInt(c.valor_aporte) || 0), 0)
})

const columns = [
  {
    name: 'periodo_nombre',
    required: true,
    label: 'Periodo',
    align: 'left',
    field: (row) => row.periodo_nombre,
    sortable: true,
  },
  {
    name: 'linea_aporte_nombre',
    required: true,
    label: 'Linea aporte',
    align: 'left',
    field: (row) => row.linea_aporte_nombre,
    sortable: true,
  },
  {
    name: 'fecha_recaudo',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.fecha_recaudo,
    sortable: true,
  },
  {
    name: 'valor_aporte',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.valor_aporte,
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

const rows2 = computed(() => commonStore.statement?.aportes_pendientes)

const totalRows2 = computed(() => {
  return rows2.value.reduce((total, c) => total + (parseInt(c.total_aportes) || 0), 0)
})

const columns2 = [
  {
    name: 'periodo_nombre',
    required: true,
    label: 'Periodo',
    align: 'left',
    field: (row) => row.periodo_nombre,
    sortable: true,
  },
  {
    name: 'linea_aporte_nombre',
    required: true,
    label: 'Linea aporte',
    align: 'left',
    field: (row) => row.linea_aporte_nombre,
    sortable: true,
  },
  {
    name: 'comentario',
    required: true,
    label: 'Comentario',
    align: 'left',
    field: (row) => row.comentario,
    sortable: true,
  },
  {
    name: 'valor_aporte',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.total_aportes,
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

const rows3 = computed(() => commonStore.statement?.cuotas_credito_realizadas)

const totalRows3 = computed(() => {
  return rows3.value.reduce((total, c) => total + (parseInt(c.valor_cuota_credito) || 0), 0)
})

const columns3 = [
  {
    name: 'periodo_nombre',
    required: true,
    label: 'Periodo',
    align: 'left',
    field: (row) => row.periodo_nombre,
    sortable: true,
  },
  {
    name: 'linea_credito_nombre',
    required: true,
    label: 'Linea de crédito',
    align: 'left',
    field: (row) => row.linea_credito_nombre,
    sortable: true,
  },
  {
    name: 'fecha_recaudo',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.fecha_recaudo,
    sortable: true,
  },
  {
    name: 'valor_cuota_credito',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.valor_cuota_credito,
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

const rows4 = computed(() => commonStore.statement?.cuotas_credito_pendientes)

const totalRows4 = computed(() => {
  return rows4.value.reduce((total, c) => total + (parseInt(c.total_cuotas_credito) || 0), 0)
})

const columns4 = [
  {
    name: 'periodo_nombre',
    required: true,
    label: 'Periodo',
    align: 'left',
    field: (row) => row.periodo_nombre,
    sortable: true,
  },
  {
    name: 'linea_credito_nombre',
    required: true,
    label: 'Linea de crédito',
    align: 'left',
    field: (row) => row.linea_credito_nombre,
    sortable: true,
  },
  {
    name: 'comentario',
    required: true,
    label: 'Comentario',
    align: 'left',
    field: (row) => row.comentario,
    sortable: true,
  },
  {
    name: 'valor_aporte',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.total_cuotas_credito,
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

const rows5 = computed(() => commonStore.statement?.cuotas_credito_pendientes_futuro)

const totalRows5 = computed(() => {
  return rows5.value.reduce((total, c) => total + (parseInt(c.valor_cuota) || 0), 0)
})

const columns5 = [
  {
    name: 'cuota',
    required: true,
    label: 'Cuota',
    align: 'left',
    field: (row) => row.cuota,
    sortable: true,
  },
  {
    name: 'fecha_corte',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.fecha_corte,
    sortable: true,
  },
  {
    name: 'linea_credito_nombre',
    required: true,
    label: 'Linea de crédito',
    align: 'left',
    field: (row) => row.linea_credito_nombre,
    sortable: true,
  },
  {
    name: 'valor_saldo',
    required: true,
    label: 'Saldo',
    align: 'left',
    field: (row) => row.valor_saldo,
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
  {
    name: 'interes',
    required: true,
    label: 'Interes',
    align: 'left',
    field: (row) => row.interes,
    sortable: true,
  },
  {
    name: 'seguro_deudor',
    required: true,
    label: 'S. Deudor',
    align: 'left',
    field: (row) => row.seguro_deudor,
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
  {
    name: 'seguro_credito',
    required: true,
    label: 'S. Crédito',
    align: 'left',
    field: (row) => row.seguro_credito,
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
  {
    name: 'capital',
    required: true,
    label: 'Capital',
    align: 'left',
    field: (row) => row.capital,
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

const scrollToTable = (index) => {
  const tableIds = ['table1', 'table2', 'table3', 'table4', 'table5']
  const target = document.getElementById(tableIds[index])
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const formatPrice = (val) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val)
}
</script>
<style lang="sass">
.my-sticky-dynamic
  .q-table__top
    background-color: #D0E2B6

.clickable-row
  cursor: pointer
  &:hover
    background-color: rgba(0, 0, 0, 0.1)
</style>
