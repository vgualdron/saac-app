<template>
  <q-page class="">
    <card-template v-if="tab === 'identity'" />
    <info-shops v-else-if="tab === 'shops'" />
    <table-points v-else-if="tab === 'points'" />
    <div v-else-if="tab === 'status'">
      <status-player v-if="showStatusPlayer" @close="finishStatus" />
    </div>
    <q-tabs
      v-model="tab"
      dense
      switch-indicator
      narrow-indicator
      class="bg-primary text-white shadow-2 fixed-bottom"
      indicator-color="white"
      active-color="white"
    >
      <q-tab
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
        :label="item.label"
        :disable="item.disable"
        :class="{ 'active-tab': tab === item.name }"
      />
    </q-tabs>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import CardTemplate from 'components/identification/CardTemplate.vue'
import InfoShops from 'components/shop/InfoShops.vue'
import TablePoints from 'components/points/TablePoints.vue'
import StatusPlayer from 'components/status/StatusPlayer.vue'
const showStatusPlayer = ref(true)
const tab = ref('identity')
const tabs = [
  { name: 'identity', icon: 'perm_identity', label: 'Carnet', disable: false },
  { name: 'shops', icon: 'store', label: 'Convenios', disable: false },
  { name: 'status', icon: 'flip_camera_ios', label: 'Estados', disable: false },
  { name: 'points', icon: 'loyalty', label: 'Progrepuntos', disable: false },
  { name: 'repayments', icon: 'currency_exchange', label: 'Adelantos', disable: true },
]

const finishStatus = () => {
  tab.value = 'shops'
}
</script>
<style scoped>
::v-deep(.q-tab__label) {
  font-size: 10px !important;
  text-transform: capitalize;
  font-weight: 300;
}

.active-tab::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}
</style>
