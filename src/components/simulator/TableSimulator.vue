<template>
  <div class="q-pa-md q-mb-xl">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>Simulación de crédito</q-item-label>
          <q-item-label caption>
            Selecciona la linea de credito, la cantidad de plazo, el valor a simular y oprime el
            botón de generar plan de pagos.</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col-12">
          <div class="row">
            <div class="col-12 q-pl-none text-center">
              <q-select
                dense
                rounded
                outlined
                map-options
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="form.creditLine"
                label="Línea de crédito *"
                input-debounce="0"
                :options="optionsCreditLines"
                option-value="id"
                option-label="name"
                behavior="menu"
                reactive-rules
                :rules="[(val) => val || 'Error']"
              >
              </q-select>
            </div>
            <div
              v-if="form.creditLine && form.creditLine.value"
              class="col-6 q-pl-none text-center"
            >
              <q-input
                dense
                rounded
                outlined
                v-model="formattedAmount"
                :max="form.creditLine.value"
                :label="`Valor (Max ${formatPrice(form.creditLine.value)})`"
                type="text"
                @update:model-value="updateAmount"
                reactive-rules
                :rules="[
                  (val) => (form.amount > 0 && form.amount <= form.creditLine.value) || 'Error',
                ]"
              />
            </div>
            <div v-if="form.creditLine && form.creditLine.term" class="col-6 q-pl-sm text-center">
              <q-input
                dense
                rounded
                outlined
                v-model="form.amountFees"
                :label="`Plazo (meses, Max ${form.creditLine.term}) `"
                type="number"
                :max="parseInt(form.creditLine.term)"
                :min="2"
                reactive-rules
                :rules="[
                  (val) =>
                    (parseInt(form.creditLine.term) > 1 &&
                      parseInt(form.creditLine.term) <= form.creditLine.term) ||
                    'Error',
                ]"
              />
            </div>
            <div
              v-if="form.creditLine && form.creditLine.annual_interest"
              class="col-6 q-pl-none text-center"
            >
              <q-input
                dense
                rounded
                outlined
                v-model="form.creditLine.annual_interest"
                label="Interés anual(%)"
                type="number"
                readonly
                reactive-rules
                :rules="[(val) => val >= 0 || 'Error']"
              />
            </div>
            <div
              v-if="form.creditLine && form.creditLine.annual_interest"
              class="col-6 q-pl-sm text-center"
            >
              <q-input
                dense
                rounded
                outlined
                v-model="form.creditLine.interest"
                label="Interés (%)"
                type="number"
                readonly
                reactive-rules
                :rules="[(val) => val >= 0 || 'Error']"
              />
            </div>
            <div
              v-if="form.creditLine && form.creditLine.debtor_insurance >= 0"
              class="col-6 q-pl-none text-center"
            >
              <q-input
                dense
                rounded
                outlined
                v-model="form.creditLine.debtor_insurance"
                label="Seguro de vida deudor"
                type="number"
                readonly
                reactive-rules
                :rules="[(val) => val >= 0 || 'Error']"
              />
            </div>
            <div
              v-if="form.creditLine && form.creditLine.credit_insurance >= 0"
              class="col-6 q-pl-sm text-center"
            >
              <q-input
                dense
                rounded
                outlined
                v-model="form.creditLine.credit_insurance"
                label="Seguro de crédito"
                type="number"
                readonly
                reactive-rules
                :rules="[(val) => val >= 0 || 'Error']"
              />
            </div>
          </div>
          <p class="text-bold text-primary text-center q-mb-none">VALOR DE LA COUTA:</p>
          <p class="text-bold text-primary text-center">${{ formatPriceDecimal(valueFee) }}</p>
          <div class="row text-center q-mb-md">
            <q-btn
              :disable="form.amount <= 0"
              label="Generar plan de pagos"
              color="primary"
              class="col"
              @click="generateTable"
              rounded
            />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-table
      v-if="generate"
      class="q-mt-md"
      title="Plan de pagos (Cuotas)"
      :rows="fees"
      :columns="columns"
      :loading="loading"
      row-key="index"
      separator="cell"
      :rows-per-page-options="[0]"
      hide-bottom
      flat
      bordered
    />
  </div>
</template>
<script setup>
import moment from 'moment'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useCommonStore } from '../../stores/common'
// import { showNotifications } from '../../helpers/showNotifications'
import { showLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const $q = useQuasar()

const loading = ref(false)
const generate = ref(false)

const initialFormState = {
  creditLine: null,
  amount: 0,
  amountFees: 2,
}

const formattedAmount = ref(initialFormState.amount)

const form = reactive({ ...initialFormState })

const optionsCreditLines = computed(() => {
  return commonStore.creditLines
})

const valueFee = computed(() => {
  let valorCuota = 0
  if (form && form.amount) {
    const valorCredito = form.amount
    const interesAnual = parseFloat(form.creditLine.annual_interest) / 100 || 0
    const interesMensual = interesAnual / 12 || 0
    const plazo = parseInt(form.amountFees) || 12
    const seguroDeudor = parseFloat(form.creditLine.debtor_insurance) || 0
    const seguroCredito = parseFloat(form.creditLine.credit_insurance) || 0

    if (plazo > 0) {
      if (interesMensual > 0) {
        valorCuota =
          (valorCredito * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo)) +
          seguroDeudor +
          seguroCredito
      } else {
        valorCuota = valorCredito / plazo + seguroDeudor + seguroCredito // Sin intereses
      }
    }
  }

  return valorCuota
})

const fees = computed(() => {
  const array = []

  if (form && form.creditLine) {
    const valorCredito = form.amount
    const interesAnual = parseFloat(form.creditLine.annual_interest) / 100 || 0
    const interesMensual = interesAnual / 12 || 0
    const plazo = parseInt(form.amountFees) || 12
    const seguroDeudor = parseFloat(form.creditLine.debtor_insurance) || 0
    const seguroCredito = parseFloat(form.creditLine.credit_insurance) || 0

    let saldoCredito = valorCredito
    let totalInteresPagado = 0
    let totalAbonoCapital = 0
    let totalSeguroDeudor = 0
    let totalSeguroCredito = 0
    let totalValorCuota = 0

    for (var i = 1; i <= plazo; i++) {
      let fechaPago = moment().add(i, 'month')

      var interesPagado = saldoCredito * interesMensual

      let valorCuota = 0
      let abonoCapital = 0
      if (interesMensual > 0) {
        valorCuota =
          (valorCredito * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo)) +
          seguroDeudor +
          seguroCredito
        abonoCapital = valorCuota - interesPagado - seguroDeudor - seguroCredito
      } else {
        valorCuota = valorCredito / plazo + seguroDeudor + seguroCredito
        abonoCapital = valorCredito / plazo
      }

      saldoCredito -= abonoCapital

      totalValorCuota += valorCuota
      totalInteresPagado += interesPagado
      totalAbonoCapital += abonoCapital
      totalSeguroDeudor += seguroDeudor
      totalSeguroCredito += seguroCredito

      const obj = {
        index: i,
        date: fechaPago,
        amount: valorCuota.toFixed(2),
        interest_paid: interesPagado.toFixed(2),
        capital: abonoCapital.toFixed(2),
        debtor_insurance: seguroDeudor,
        credit_insurance: seguroCredito,
        credit_balance: saldoCredito.toFixed(2),
      }

      array.push(obj)
    }

    const total = {
      index: 'TOTAL',
      date: null,
      amount: totalValorCuota.toFixed(2),
      interest_paid: totalInteresPagado.toFixed(2),
      capital: totalAbonoCapital.toFixed(2),
      debtor_insurance: totalSeguroDeudor,
      credit_insurance: totalSeguroCredito,
      credit_balance: saldoCredito.toFixed(2),
    }
    array.push(total)
  }
  return array
})

/* const showNotification = (messages, status, align, timeout) => {
  showNotifications(messages, status, align, timeout)
} */

const generateTable = async () => {
  showLoading('Generando ...', 'Por favor, espere', true)
  let user = commonStore.user?.data?.user || {}

  const data = {
    message: `Generó una simulación de crédito de: ${formatPrice(form.amount)}, tipo crédito: ${form.creditLine.name}, a ${form.amountFees} cuotas.`,
    subject: `Simulación crédito Progress App - ${user.name}`,
    name: user.name || 'Usuario Desconocido',
    document: user.document || 'N/A',
  }

  await commonStore.sendPqr(data)

  if (commonStore.status) {
    generate.value = true
  }
  $q.loading.hide()
}

const updateAmount = (value) => {
  const numericValue = value.replace(/\D/g, '')
  form.amount = numericValue
  formattedAmount.value = new Intl.NumberFormat('es-CO').format(numericValue)
}

const formatPrice = (value) => {
  if (!value) {
    return 0
  }
  const numericValue = value.toString().replace(/\D/g, '')
  return new Intl.NumberFormat('es-CO').format(numericValue)
}

const formatPriceDecimal = (value) => {
  if (!value) {
    return '0'
  }

  const numericValue = parseFloat(value.toString().replace(/[^\d.]/g, '')).toFixed(2)

  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue)
}

onMounted(async () => {
  loading.value = true
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getCreditLines()
  form.creditLine = optionsCreditLines.value[0]
  $q.loading.hide()
  loading.value = false
})

watch(
  () => [form.creditLine, form.amount, form.amountFees],
  () => {
    generate.value = false
  },
)

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'index',
    align: 'left',
  },
  {
    name: 'date',
    required: true,
    label: 'Fecha',
    align: 'left',
    field: (row) => row.date,
    format: (val) => {
      if (!val) {
        return ''
      }
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(val).toLocaleDateString('es-ES', options)
    },
  },
  {
    name: 'amount',
    required: true,
    label: 'Valor',
    align: 'left',
    field: (row) => row.amount,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
  {
    name: 'interest_paid',
    required: true,
    label: 'Interés pagado',
    align: 'left',
    field: (row) => row.interest_paid,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
  {
    name: 'capital',
    required: true,
    label: 'Capital',
    align: 'left',
    field: (row) => row.capital,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
  {
    name: 'debtor_insurance',
    required: true,
    label: 'Seguro deudor',
    align: 'left',
    field: (row) => row.debtor_insurance,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
  {
    name: 'credit_insurance',
    required: true,
    label: 'Seguro crédito',
    align: 'left',
    field: (row) => row.credit_insurance,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
  {
    name: 'credit_balance',
    required: true,
    label: 'Saldo crédito',
    align: 'left',
    field: (row) => row.credit_balance,
    format: (val) => {
      return formatPriceDecimal(val)
    },
  },
]
</script>
<style scoped></style>
