<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> PROGRESS </q-toolbar-title>

        <div>{{ versionApp }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">
          <img src="~/assets/logo-rectangle.png" width="260" class="q-mr-auto q-ml-auto" />
        </q-item-label>
        <EssentialLink
          v-for="{ name, link, title, icon, caption, classes } in linksList"
          :key="name"
          :title="title"
          :link="link"
          :icon="icon"
          :caption="caption"
          :classes="classes"
          :clickable="link !== $route.path"
          :active="link === $route.path"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <div class="" style="position: relative">
        <div style="position: absolute; bottom: 0; width: 100%">
          <q-tabs v-model="tab" dense class="bg-primary text-white">
            <q-tab name="mails" icon="mail" label="Mails" />
            <q-tab name="alarms" icon="alarm" label="Alarms" />
            <q-tab name="movies" icon="movie" label="Movies" />
          </q-tabs>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Estado de cuenta',
    caption: 'Revisa tu estado de cuenta',
    icon: 'request_quote',
    link: '/statement',
    classes: '',
  },
  {
    title: 'Simular crédito',
    caption: 'Simula tu crédito',
    icon: 'calculate',
    link: '/simulator',
    classes: '',
  },
  {
    title: 'Recaudos',
    caption: 'Revisa tus recuados',
    icon: 'paid',
    link: '/collections',
    classes: '',
  },
  {
    title: 'Salir',
    caption: 'Haz click para cerrar sesión',
    icon: 'power_settings_new',
    link: '/logout',
    classes: 'text-red bg-grey-4 text-bold',
  },
]

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink,
  },
  computed: {
    versionApp() {
      return `Version ${process.env.LATEST_VERSION_APP}`
    },
  },
  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      tab: 'mails',
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    async logout() {
      this.$router.push('/')
    },
  },
})
</script>
