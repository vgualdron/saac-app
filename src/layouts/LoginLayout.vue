<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Progress</q-toolbar-title>
        <q-btn
          color="white"
          label="Instalar App"
          icon="download"
          size="sm"
          id="installButton"
          style="display: none"
          class="q-my-md"
          outline
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
