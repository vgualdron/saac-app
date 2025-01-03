<template>
  <q-page class="flex flex-center q-mt-xl" style="display: block">
    <form-login />
  </q-page>
</template>

<script>
import FormLogin from 'components/login/FormLogin.vue'

export default {
  name: 'PageLogin',
  computed: {},
  components: {
    FormLogin,
  },
}
</script>
