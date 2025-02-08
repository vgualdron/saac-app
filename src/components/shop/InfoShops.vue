<template>
  <div class="q-pa-md q-mb-xl">
    <div class="row text-center">
      <div class="col-12 q-pa-sm q-mb-sm text-center">
        <q-select
          dense
          rounded
          outlined
          emit-value
          transition-show="flip-up"
          transition-hide="flip-down"
          v-model="form.category"
          label="Categoria de convenios *"
          input-debounce="0"
          :options="optionsCategories"
          option-value="id"
          option-label="name"
          behavior="menu"
          clearable
        >
          <template v-slot:selected-item="scope">
            <span>
              {{ getNameCategory(scope.opt) }}
            </span>
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click.stop.prevent="form.category = null"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-pl-none text-center">
      <div class="col-6 text-center is-flex q-pa-sm" v-for="shop in optionsShops" :key="shop.id">
        <q-card class="my-card">
          <q-item>
            <q-item-section>
              <q-item-label caption class="text-bold text-primary">{{ shop.name }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-card-section horizontal style="">
            <q-img
              :src="getUrl(shop.url_logo)"
              style="width: 100%; height: 100%; object-fit: contain"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()

const form = reactive({
  category: null,
})

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getCategories()
  await commonStore.getShops()
  $q.loading.hide()
})

const optionsShops = computed(() => {
  let s = commonStore.shops
  if (form.category) {
    s = commonStore.shops.filter((sh) => sh.category_id === form.category)
  }
  return s
})
const optionsCategories = computed(() => {
  return commonStore.categories
})

const getNameCategory = (value) => {
  let name = optionsCategories.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 30) {
    name = truncateString(name, 30)
  }
  return name
}
const getUrl = (value) => {
  return `${process.env.URL_FILES}${value}`
}

const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}
</script>
<style scoped>
.my-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}
</style>
