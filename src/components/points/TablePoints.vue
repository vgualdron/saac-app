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
        <q-card-section class="col-12">
          <upload-image
            :config="{
              name: 'FOTO_PUNTOS',
              storage: 'points',
              modelName: 'points',
              modelId: 1,
            }"
          />
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
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import UploadImage from 'components/common/UploadImage.vue'
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
  return `Progrepuntos ( ${total.value} )`
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
