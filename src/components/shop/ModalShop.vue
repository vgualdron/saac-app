<template>
  <q-dialog v-model="showModal" persistent>
    <q-card class="my-card" flat bordered>
      <q-card-section class="row items-center q-pa-sm">
        <div class="text-h6 q-mt-sm q-mb-xs text-primary"></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h6 q-mt-sm q-mb-xs text-primary">{{ props.shop.name }}</div>
        </q-card-section>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-caption" v-html="props.shop.agreement"></div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" :src="getUrl(props.shop.url_logo)" />
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="location_on" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.shop.address }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="phone" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.shop.phone }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { showLoading } from '../../helpers/showLoading'

const $q = useQuasar()

const props = defineProps({
  shop: Object,
  value: Boolean,
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  $q.loading.hide()
})

const showModal = computed({
  get: () => props.value,
  set: (val) => val,
})

const getUrl = (value) => {
  return `${process.env.URL_FILES}${value}`
}

/* const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
} */
</script>
<style scoped>
.my-card img {
  width: 100%;
  object-fit: contain;
}
</style>
