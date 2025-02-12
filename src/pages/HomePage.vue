<template>
  <q-page class="">
    <card-template v-if="tab === 'identity'" />
    <info-shops v-else-if="tab === 'shops'" />
    <table-points v-else-if="tab === 'points'" />
    <div v-else-if="tab === 'status'">
      <status-player v-if="showStatusPlayer" :statuses="statuses" @close="finishStatus" />
    </div>
    <q-tabs
      v-model="tab"
      dense
      switch-indicator
      class="bg-primary text-white text-grey-5 shadow-2 fixed-bottom"
      indicator-color="white"
      active-color="white"
    >
      <q-tab name="identity" icon="perm_identity" label="Carnet" />
      <q-tab name="points" icon="loyalty" label="Puntos" />
      <q-tab name="shops" icon="store" label="Convenios" />
      <q-tab name="status" icon="flip_camera_ios" label="Estados" :disable="false" />
      <q-tab name="repayments" icon="currency_exchange" label="Adelantos" :disable="true" />
    </q-tabs>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import CardTemplate from 'components/identification/CardTemplate.vue'
import InfoShops from 'components/shop/InfoShops.vue'
import TablePoints from 'components/points/TablePoints.vue'
import StatusPlayer from 'components/status/StatusPlayer.vue'
const tab = ref('identity')
const showStatusPlayer = ref(true)
const statuses = ref([
  { url: 'https://saac.com.co/api/storage/app/public/resources/video_1.mp4' },
  { url: 'https://saac.com.co/api/storage/app/public/resources/video_2.mp4' },
  { url: 'https://saac.com.co/api/storage/app/public/resources/video_3.mp4' },
])

const finishStatus = () => {
  tab.value = 'shops'
}
</script>
