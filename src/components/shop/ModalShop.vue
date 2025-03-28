<template>
  <q-dialog v-model="showModal" persistent>
    <q-card class="my-card" flat bordered>
      <q-card-section class="row items-center q-pa-sm">
        <div class="text-h6 q-mt-sm q-mb-xs text-primary"></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <!-- <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h6 q-mt-sm q-mb-none text-primary">{{ props.shop.name }}</div>
        </q-card-section>
      </q-card-section>-->
      <q-card-section horizontal>
        <q-card-section class="q-py-none text-center">
          <q-avatar class="my-avatar q-mb-md">
            <q-img class="rounded-borders" :src="getUrl(props.shop.url_logo)" />
          </q-avatar>
          <div class="text-caption" v-html="props.shop.agreement"></div>
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
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="/icons/whatsapp.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Mas información</q-item-label>
              <q-item-label caption>
                <a :href="linkInfo" target="_blank">haz click aqui</a>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="/icons/mandaya.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Pide tu domicilio</q-item-label>
              <q-item-label caption>
                <a :href="linkDomi" target="_blank">haz click aqui</a>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const props = defineProps({
  shop: Object,
  value: Boolean,
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  hideLoading()
})

const showModal = computed({
  get: () => props.value,
  set: (val) => val,
})

const messageInfo =
  'Buen%20día%20,%20quiero%20solicitar%20más%20información%20sobre%20el%20comercio%20'
const messageDomi =
  'Buen%20día%20,%20quiero%20solicitar%20un%20domicilio%20sobre%20el%20comercio%20'
const numberInfo = '+573046607622'
const numberDomi = '+573150666696'

const linkInfo = computed(() => {
  return `https://wa.me/${numberInfo}?text=${messageInfo} ${props.shop.name}`
})

const linkDomi = computed(() => {
  return `https://wa.me/${numberDomi}?text=${messageDomi} ${props.shop.name}`
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
.my-avatar {
  font-size: 100px;
}
</style>
