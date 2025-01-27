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

const clickOption = (link) => {
  console.log(link)
  router.push(link)
}
</script>
