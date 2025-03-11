<template>
  <div class="q-pa-md" style="max-width: 400px; margin: auto">
    <q-img src="pse.png" class="image-pse" @click="openPse" />
    <q-card class="my-card" flat bordered>
      <q-img src="accounts.jpg" />
    </q-card>
    <q-card class="my-card q-mt-xl" flat bordered>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="apartment" />
          </q-item-section>

          <q-item-section>
            <q-item-label>SEDE PRINCIPAL</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="location_on" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dirección</q-item-label>
            <q-item-label caption>{{ getParam('DIRECCION_SEDE_PRINCIPAL') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-card class="my-card q-mt-md" flat bordered>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="apartment" />
          </q-item-section>

          <q-item-section>
            <q-item-label>SEDE OCAÑA</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="location_on" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dirección</q-item-label>
            <q-item-label caption>{{ getParam('DIRECCION_SEDE_OCANIA') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
    <q-card class="my-card q-mt-md" flat bordered>
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="apartment" />
          </q-item-section>

          <q-item-section>
            <q-item-label>SEDE VILLA DEL ROSARIO</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="location_on" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dirección</q-item-label>
            <q-item-label caption>{{ getParam('DIRECCION_SEDE_VILLA') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script setup>
import { getConfigurationParam } from '../../helpers/getConfigurationParam'
const getParam = (ref) => {
  return getConfigurationParam(ref).value
}

const openPse = () => {
  const url = 'https://portalpagos.davivienda.com/#/comercio/10781/COOPSERPROG'
  if (url) {
    window.open(url, '_blank')
  } else {
    console.error('La URL no está definida')
  }
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
.image-pse {
  width: 90%;
  margin: 0px 10px 10px 10px;
  text-align: center;
  cursor: pointer;
}
</style>
