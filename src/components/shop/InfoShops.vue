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
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-pl-none text-center">
      <div
        class="col-12 text-left is-flex text-bold"
        v-for="(category, index) in optionsShops"
        :key="category.category_id"
      >
        <div
          :class="{ 'q-mt-xl': index !== 0 && !form.category }"
          v-if="!form.category || form.category === category.category_id"
        >
          <q-chip icon="bookmark" color="primary" text-color="white" class="chip-style" ripple>{{
            category.category_name
          }}</q-chip>
          <div
            v-if="!form.category || form.category === category.category_id"
            class="row q-pl-none text-center"
          >
            <div
              class="col-6 text-center is-flex q-pa-sm"
              v-for="shop in category.shops"
              :key="shop.id"
            >
              <q-card class="my-card" @click="openShop(shop)">
                <q-card-section horizontal style="">
                  <q-img
                    :src="getUrl(shop.url_logo)"
                    style="width: 100%; object-fit: contain; margin: 10px; border-radius: 50%"
                  />
                </q-card-section>
              </q-card>
              <q-item>
                <q-item-section>
                  <q-item-label caption class="text-bold text-primary">{{
                    shop.name
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-shop v-if="showModalShop" v-model="showModalShop" :shop="shopSelected" />
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import ModalShop from 'components/shop/ModalShop.vue'
import { useCommonStore } from '../../stores/common'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()

const form = reactive({
  category: null,
})

const showModalShop = ref(false)
const shopSelected = ref(null)

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getCategories()
  await commonStore.getShops()
  hideLoading()
})

const optionsShops = computed(() => {
  let s = commonStore.shops
  const groupedShops = Object.values(
    s.reduce((acc, shop) => {
      const { category_id, category_name, ...shopData } = shop

      if (!acc[category_id]) {
        acc[category_id] = {
          category_id,
          category_name,
          shops: [],
        }
      }

      acc[category_id].shops.push(shopData)
      return acc
    }, {}),
  )
  return groupedShops
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

const openShop = (value) => {
  console.log(value)
  shopSelected.value = value
  showModalShop.value = true
}

const getUrl = (value) => {
  return `${process.env.URL_FILES}${value}`
}

const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}
</script>
<style scoped>
.my-card {
  border-radius: 50%;
  width: 135px;
  height: 135x;
}
.my-card img {
  object-fit: contain;
}
.chip-style {
  width: 100%;
}
</style>
