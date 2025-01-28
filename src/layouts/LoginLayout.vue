<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <div>PROGRESS</div>
        <button id="installButton" style="display: none">Instalar</button>
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
