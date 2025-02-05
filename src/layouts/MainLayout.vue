<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          {{ $route.meta.name }}
        </q-toolbar-title>
        <q-btn-dropdown
          color="white"
          class="no-shadow"
          push
          no-caps
          :label="truncateText(user.name, 18)"
          outline
        >
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="200px">
                <upload-image-profile
                  :config="{
                    name: 'FOTO_PROFILE',
                    storage: 'users',
                    modelName: 'users',
                    modelId: user.user_id,
                    photo: photo,
                  }"
                />
              </q-avatar>
              <div class="text-subtitle1 q-mt-xs text-weight-bolder text-center">
                {{ user.name }}
              </div>
              <!-- <q-btn
                color="primary"
                label="Cambiar contraseña"
                push
                size="sm"
                v-close-popup
                @click="showChangePasswordForm()"
              /> -->
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-img src="~/assets/logo-rectangle.png" width="260" class="q-mr-auto q-ml-auto" />
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
          <q-img
            src="https://saac.com.co/api/storage/app/public/resources/supersolidaria.png"
            width="200"
            class="q-mr-auto q-ml-auto"
          />
        </q-item-label>
        <!-- Redes sociales -->
        <q-item-label header class="text-grey-8 text-center q-mt-md">
          <div class="row justify-center items-center no-wrap" style="gap: 8px">
            <q-btn
              href="https://api.whatsapp.com/send/?phone=573228642938&text&type=phone_number&app_absent=0"
              target="_blank"
              flat
              class="p-0"
            >
              <q-img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                width="32px"
              />
            </q-btn>
            <q-btn
              href="https://www.facebook.com/profile.php?id=61557430033016"
              target="_blank"
              flat
              class="p-0"
            >
              <q-img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                width="32px"
              />
            </q-btn>
            <q-btn href="https://www.instagram.com/coopserprog" target="_blank" flat class="p-0">
              <q-img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                width="32px"
              />
            </q-btn>
            <q-btn href="https://www.tiktok.com/@coopserprog" target="_blank" flat class="p-0">
              <q-img
                src="https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg"
                width="32px"
              />
            </q-btn>
          </div>
        </q-item-label>

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
        <q-tab name="mails" icon="store" label="Convenios" />
        <q-tab name="alarms" icon="loyalty" label="ProgrePuntos" />
        <q-tab name="movies" icon="currency_exchange" label="Adelantos" />
      </q-tabs>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCommonStore } from '../stores/common'
import EssentialLink from 'src/components/common/EssentialLink.vue'
import UploadImageProfile from 'components/common/UploadImageProfile.vue'
import { showLoading } from '../helpers/showLoading'
import { useQuasar } from 'quasar'

const commonStore = useCommonStore()
const $q = useQuasar()

const linksL = [
  {
    title: 'Inicio',
    caption: 'Ir al inicio de la app',
    icon: 'home',
    link: '/home',
    classes: '',
  },
  {
    title: 'Estado de cuenta',
    caption: 'Revisa tu estado de cuenta',
    icon: 'request_quote',
    link: '/collections',
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
    title: 'Pagos',
    caption: 'Realiza tus recuados',
    icon: 'paid',
    link: '/paid',
    classes: '',
  },
  {
    title: 'Contacto',
    caption: 'Contactanos o envía tu PQR',
    icon: 'phone',
    link: '/contact',
    classes: '',
  },
  {
    title: 'Sobre nosotros',
    caption: 'Revisa información en la web',
    icon: 'info',
    link: 'https://www.ipsprogresandoensalud.com/articulos/mision-y-vision',
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

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getConfigurations()
  $q.loading.hide()
})

const versionApp = computed(() => `Version ${process.env.LATEST_VERSION_APP}`)

const user = computed(() => {
  let u = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    u = commonStore.user.data.user
  }
  return u
})

const photo = computed(() => {
  return user.value.user_url_photo_proile
    ? `${process.env.URL_FILES}${user.value.user_url_photo_proile}`
    : null
})

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
