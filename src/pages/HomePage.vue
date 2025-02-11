<template>
  <q-page class="">
    <card-template v-if="tab === 'identity'" />
    <info-shops v-if="tab === 'shops'" />
    <table-points v-if="tab === 'points'" />
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
      <q-tab name="repayments" icon="currency_exchange" label="Adelantos" :disable="true" />
    </q-tabs>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import CardTemplate from 'components/identification/CardTemplate.vue'
import InfoShops from 'components/shop/InfoShops.vue'
import TablePoints from 'components/points/TablePoints.vue'
const tab = ref('identity')
</script>
