<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-btn
          color="primary"
          label="Instalar App"
          icon="download"
          size="sm"
          id="installButton"
          style="display: block"
          class="q-my-md"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout',
  components: {},
  data() {
    return {}
  },
}
</script>
