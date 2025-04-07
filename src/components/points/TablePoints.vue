<template>
  <div class="q-pa-md q-mb-xl">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img src="/icons/icon.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Redimir progrepuntos</q-item-label>
          <q-item-label caption>Carga la factura para redimir progrepuntos</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12 text-center">
          <q-item class="text-center">
            <q-item-section>
              <q-item-label>
                <q-icon name="loyalty" color="primary" size="md" />
                Tienes {{ total }} progrepuntos
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <q-item>
            <q-item-section>
              <q-btn color="primary" @click="showModalPoint = true">Redimir progrepuntos</q-btn>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-table
      class="my-sticky-dynamic q-mt-md"
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
    <modal-form-point
      v-if="showModalPoint"
      :value="showModalPoint"
      @update:value="
        (val) => {
          showModalPoint = val
        }
      "
    />
  </div>
</template>
<script setup>
import ModalFormPoint from 'components/points/ModalFormPoint.vue'
import { computed, onMounted, ref } from 'vue'
import { usePointStore } from '../../stores/point'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const pointStore = usePointStore()

const showModalPoint = ref(false)

const loading = ref(false)
const pagination = ref({
  rowsPerPage: 1000,
})

onMounted(async () => {
  loading.value = true
  showLoading('Cargando ...', 'Por favor, espere', true)
  await pointStore.listByUserSession('pendiente,aprobado,rechazado,creado')
  hideLoading()
  loading.value = false
})

const rows = computed(() => pointStore.points)
const total = computed(() => {
  return pointStore.points.reduce((acc, item) => acc + item.amount, 0)
})
const title = computed(() => {
  return `Progrepuntos`
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
    name: 'status',
    required: true,
    label: 'Estado',
    align: 'left',
    field: (row) => row.status,
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
  {
    name: 'observation',
    required: true,
    label: 'Observación',
    align: 'left',
    field: (row) => row.observation,
    sortable: true,
  },
]
</script>
<style scoped></style>
