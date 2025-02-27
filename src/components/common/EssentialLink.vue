<template>
  <q-item
    :clickable="clickable"
    tag="a"
    @click="clickOption(link, title)"
    :class="classes"
    :active="active"
    active-class="text-primary bg-accent"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '#',
  },
  icon: {
    type: String,
    default: '',
  },
  classes: {
    type: String,
    default: '',
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const clickOption = async (link) => {
  console.log(link)
  if (typeof link === 'string' && (link.startsWith('http://') || link.startsWith('https://'))) {
    window.open(link, '_blank')
  } else {
    try {
      await router.push(link)
    } catch (error) {
      console.error('Error al navegar:', error)
    }
  }
}
</script>
