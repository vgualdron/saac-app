<template>
  <q-dialog v-model="showModal" persistent>
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img src="/icons/icon.png" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> Realizar pago </q-item-label>
          <q-item-label caption> Debes realizar pago de afiliación </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <info-paid></info-paid>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12 text-right">
          <q-btn label="Salir" @click="$router.push('/logout')" color="red" class="col" rounded />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed } from 'vue'
import InfoPaid from 'components/paid/InfoPaid.vue'

const props = defineProps({
  showClose: {
    type: Boolean,
    default: true,
  },
  value: Boolean,
})

const showModal = computed({
  get: () => props.value,
  set: (val) => val,
})

/* const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
}

const user = computed(() => {
  let u = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    u = commonStore.user.data.user
  }
  return u
}) */
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
</style>
