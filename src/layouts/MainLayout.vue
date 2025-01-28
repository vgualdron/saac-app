<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> PROGRESS </q-toolbar-title>

        <div>{{ nameUser }}</div>
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
        <q-item-label header class="text-grey-8 text-center q-mt-md">
          {{ versionApp }}
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-tabs
        v-model="tab"
        dense
        switch-indicator
        class="bg-primary text-white text-grey-5 shadow-2 fixed-bottom"
        indicator-color="white"
        active-color="white"
      >
        <q-tab name="mails" icon="mail" label="Mails" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCommonStore } from '../stores/common'
import EssentialLink from 'components/EssentialLink.vue'

const commonStore = useCommonStore()

const linksL = [
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
    classes: 'text-red text-bold',
  },
]

const linksList = ref(linksL)
const leftDrawerOpen = ref(false)
const tab = ref('mails')

const versionApp = computed(() => `Version ${process.env.LATEST_VERSION_APP}`)
const nameUser = computed(() => {
  let name = ''
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    name = commonStore.user.data.user.name
  }
  return name
})

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
