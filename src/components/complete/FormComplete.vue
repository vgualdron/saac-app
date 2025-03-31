<template>
  <q-page class="flex flex-center q-px-sm">
    <q-banner dense class="bg-primary text-white q-my-sm">
      <b
        >Para poder usar todas las funcionalidades de de la app, primero debes completar la
        información referente a:</b
      >
      <br />
      Información personal, Actividad ecónomica, Descripción de activos, Aportes, Referencias y
      beneficiarios.
    </q-banner>
    <q-card class="q-pa-sm">
      <q-stepper v-model="step" color="primary" class="q-pa-none" vertical animated>
        <!-- Paso 1: Información personal -->
        <q-step :name="1" title="Información personal" icon="looks_one" :done="step > 1">
          <q-form ref="formStep1" class="q-gutter-none">
            <div class="row text-center">
              <div class="col-6 text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.primer_apellido"
                  label="Primer apellido *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.segundo_apellido"
                  label="Segundo apellido *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-7 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.nombre"
                  label="Nombres *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.nacionalidad"
                  label="Nacionalidad *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'COLOMBIANO',
                      name: 'COLOMBIANO',
                    },
                    {
                      id: 'VENEZOLANO',
                      name: 'VENEZOLANO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.tipo_documento"
                  label="T. documento *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'C.C.',
                      name: 'C.C.',
                    },
                    {
                      id: 'T.I.',
                      name: 'T.I.',
                    },
                    {
                      id: 'NUIP',
                      name: 'NUIP',
                    },
                    {
                      id: 'C.E.',
                      name: 'C.E.',
                    },
                    {
                      id: 'CARNET DIPLOMATICO',
                      name: 'CARNET DIPLOMATICO',
                    },
                    {
                      id: 'PASAPORTE',
                      name: 'PASAPORTE',
                    },
                    {
                      id: 'PPT',
                      name: 'PPT',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.cedula"
                  label="Documento *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.fecha_expedicion"
                  label="Fecha Expedición *"
                  type="date"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.dpto_expedicion"
                  label="Departamento Expedición *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-7 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.lugar_expedicion"
                  label="Municipio Expedición *"
                  input-debounce="0"
                  :options="optionsCitiesIssue"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCityIssue(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-5 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.genero"
                  label="Sexo *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'MASCULINO',
                      name: 'MASCULINO',
                    },
                    {
                      id: 'FEMENINO',
                      name: 'FEMENINO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.estado_civil"
                  label="Estado Civil *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'SOLTERO',
                      name: 'SOLTERO',
                    },
                    {
                      id: 'SEPARADO',
                      name: 'SEPARADO',
                    },
                    {
                      id: 'CASADO',
                      name: 'CASADO',
                    },
                    {
                      id: 'VIUDO',
                      name: 'VIUDO',
                    },
                    {
                      id: 'UNION LIBRE',
                      name: 'UNIÓN LIBRE',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.fecha_nacimiento"
                  label="Fecha nacimiento *"
                  type="date"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.dpto_nacimiento"
                  label="Departamento Nacimiento *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.lugar_nacimiento"
                  label="Municipio Nacimiento *"
                  input-debounce="0"
                  :options="optionsCities"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCity(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form1.nombre_representante"
                  label="Nombre representante"
                  type="text"
                  reactive-rules
                  :rules="[
                    (val) =>
                      form1.edad >= 18 ||
                      (val && val.length > 0) ||
                      'Obligatorio si la edad es menor de 18 años',
                  ]"
                />
              </div>
              <div class="col-8 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form1.cedula_representante"
                  label="Cedula representante"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) =>
                      form1.edad >= 18 ||
                      (val && val > 0) ||
                      'Obligatorio si la edad es menor de 18 años',
                  ]"
                />
              </div>
              <div class="col-4 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form1.edad_representante"
                  label="Edad representante"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) =>
                      form1.edad >= 18 ||
                      (val && val >= 18) ||
                      'Obligatorio si la edad es menor de 18 años',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form1.personas_adultos"
                  label="Adultos a cargo *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => val >= 0 || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form1.personas_menores"
                  label="Menores a cargo *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => val >= 0 || 'Obligatorio']"
                />
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.tipo_vivienda"
                  label="Tipo vivienda *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'PROPIA',
                      name: 'PROPIA',
                    },
                    {
                      id: 'ALQUILADA',
                      name: 'ALQUILADA',
                    },
                    {
                      id: 'FAMILIAR',
                      name: 'FAMILIAR',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.cabeza_familia"
                  label="Mujer cabeza de hogar *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.estrato"
                  label="Estrato *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 0,
                      name: '0',
                    },
                    {
                      id: 1,
                      name: '1',
                    },
                    {
                      id: 2,
                      name: '2',
                    },
                    {
                      id: 3,
                      name: '3',
                    },
                    {
                      id: 4,
                      name: '4',
                    },
                    {
                      id: 5,
                      name: '5',
                    },
                    {
                      id: 6,
                      name: '6',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val >= 0 || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.dpto"
                  label="Departamento recidencia *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.ciudad"
                  label="Municipio de residencia *"
                  input-debounce="0"
                  :options="optionsCitiesHouse"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCityHouse(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.direccion"
                  label="Dirección de residencia *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.telefono"
                  label="Telefono casa *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.celular"
                  label="Celular *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.email"
                  label="Correo electrónico *"
                  type="email"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.nivel_educativo"
                  label="Nivel academico *"
                  input-debounce="0"
                  option-value="id"
                  option-label="name"
                  :options="[
                    {
                      id: 'BACHILLER',
                      name: 'BACHILLER',
                    },
                    {
                      id: 'TECNICO',
                      name: 'TÉCNICO',
                    },
                    {
                      id: 'TECNOLOGICO',
                      name: 'TECNOLÓGICO',
                    },
                    {
                      id: 'LICENCIADO',
                      name: 'LICENCIADO',
                    },
                    {
                      id: 'PREGRADO',
                      name: 'PREGRADO',
                    },
                    {
                      id: 'ESPECIALIZADO',
                      name: 'ESPECIALIZADO',
                    },
                    {
                      id: 'DOCTORADO',
                      name: 'DOCTORADO',
                    },
                    {
                      id: 'MAESTRIA',
                      name: 'MAESTRIA',
                    },
                    {
                      id: 'OTRO',
                      name: 'OTRO',
                    },
                  ]"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.profesion"
                  label="Profesión *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.idiomas"
                  label="Idiomas *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form1.hobbies"
                  label="Hobbies *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_residencia"
                  label="Aut residencia *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_trabajo"
                  label="Aut corresp. trabajo *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_familiar"
                  label="Aut corresp. familiar *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_email"
                  label="Aut corresp. email *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_telefono"
                  label="Aut corresp. teléfono *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form1.autoriza_datos"
                  label="Aut trat. Datos *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
            </div>
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="validateStep(1)" label="Siguiente" color="primary" rounded />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 2: Actividad económica -->
        <q-step :name="2" title="Actividad económica" icon="looks_two" :done="step > 2">
          <q-form ref="formStep2" class="q-gutter-none">
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.actividad_economica"
                  label="Actividad económico*"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Asalariado',
                      name: 'Asalariado',
                    },
                    {
                      id: 'Independiente',
                      name: 'Independiente',
                    },
                    {
                      id: 'Comerciante',
                      name: 'Comerciante',
                    },
                    {
                      id: 'Estudiante',
                      name: 'Estudiante',
                    },
                    {
                      id: 'Hogar',
                      name: 'Hogar',
                    },
                    {
                      id: 'Inversionista',
                      name: 'Inversionista',
                    },
                    {
                      id: 'Pensionado',
                      name: 'Pensionado',
                    },
                    {
                      id: 'Rentista',
                      name: 'Rentista',
                    },
                    {
                      id: 'Socio',
                      name: 'Socio',
                    },
                    {
                      id: 'Empleado público',
                      name: 'Empleado público',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.declara_renta"
                  label="¿Declara renta? *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.codigo_ciiu"
                  label="Código CIIU *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.descripcion_ciiu"
                  label="Descripción CIIU *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-12 q-pl-none text-center">
                <q-select
                  use-input
                  fill-input
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.empresa_id"
                  label="Empresa *"
                  input-debounce="0"
                  :options="filteredCompanies"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val > 0) || 'Obligatorio']"
                  @filter="filterCompanies"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCompany(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-12 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.empresa"
                  label="Nombre empresa si es particular *"
                  type="text"
                  reactive-rules
                  :disable="form2.empresa_id !== 1"
                  :rules="[
                    (val) => (form2.empresa_id === 1 && val && val.length > 0) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.tipo_empresa"
                  label="Tipo empresa *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Publica',
                      name: 'Publica',
                    },
                    {
                      id: 'Privada',
                      name: 'Privada',
                    },
                    {
                      id: 'Mixta',
                      name: 'Mixta',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.descuento"
                  label="Descuento *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Nomina',
                      name: 'Nomina',
                    },
                    {
                      id: 'Ventanilla',
                      name: 'Ventanilla',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.cargo"
                  label="Cargo *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.ocupacion"
                  label="Ocupación *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.tipo_contrato"
                  label="Tipo contrato *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Indefinido',
                      name: 'Indefinido',
                    },
                    {
                      id: 'Termino fijo',
                      name: 'Termino fijo',
                    },
                    {
                      id: 'Prestacion de servicios',
                      name: 'Prestacion de servicios',
                    },
                    {
                      id: 'Obra / Labor',
                      name: 'Obra / Labor',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.tiempo_actividad"
                  label="Tiempo *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Completo',
                      name: 'Completo',
                    },
                    {
                      id: 'Medio',
                      name: 'Medio',
                    },
                    {
                      id: 'Por horas',
                      name: 'Por horas',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.jornada"
                  label="Jornada *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Diurno',
                      name: 'Diurno',
                    },
                    {
                      id: 'Nocturno',
                      name: 'Nocturno',
                    },
                    {
                      id: 'Mixto',
                      name: 'Mixto',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.telefono_empresa"
                  label="Tel empresa *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.extension"
                  label="Extensión"
                  type="number"
                  reactive-rules
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.direccion_empresa"
                  label="Dirección empresa *"
                  type="text"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.dpto_empresa"
                  label="Departamento Emp *"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.ciudad_empresa"
                  label="Municipio emp *"
                  input-debounce="0"
                  :options="optionsCitiesCompany"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => val || 'Obligatorio']"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCityCompany(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-12 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.actividad_secundaria"
                  label="Actividad secundaria"
                  type="text"
                />
              </div>
              <div class="col-6 text-center q-pl-none q-mt-md">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.telefono_secundaria"
                  label="Tel secundaria"
                  type="number"
                />
              </div>
              <div class="col-6 text-center q-pl-sm q-mt-md">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.direccion_secundaria"
                  label="Dirección"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-none text-center q-mt-md">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.dpto_secundaria"
                  label="Departamento"
                  input-debounce="0"
                  :options="optionsDepartments"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameDepartment(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center q-mt-md">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.ciudad_secundaria"
                  label="Municipio"
                  input-debounce="0"
                  :options="optionsCitiesSecond"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                >
                  <template v-slot:selected-item="scope">
                    <span>
                      {{ getNameCitySecond(scope.opt) }}
                    </span>
                  </template>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey"> No hay coincidencias </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-12 text-center q-pl-none q-mt-md">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model.trim="form2.descripcion_secundaria"
                  label="¿Qué tipos de productos y/o servicios comercializa? *"
                  type="text"
                />
              </div>
              <div class="col-4 q-pl-none text-center q-mt-md">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form2.pensionado"
                  label="¿Pensionado? *"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'SI',
                      name: 'SI',
                    },
                    {
                      id: 'NO',
                      name: 'NO',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-8 text-center q-pl-sm q-mt-md">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.entidad_pension"
                  label="Entidad de pensión"
                  type="text"
                  reactive-rules
                  :rules="[
                    (val) =>
                      (form2.pensionado === 'SI' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.valor_pension"
                  label="Valor de la pensión *"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) =>
                      (form2.pensionado === 'SI' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.fecha_pension"
                  label="Fecha de pensión *"
                  type="date"
                  reactive-rules
                  :rules="[
                    (val) =>
                      (form2.pensionado === 'SI' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.resolucion_pension"
                  label="Resolución de pensión *"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) =>
                      (form2.pensionado === 'SI' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.fecha_corte"
                  label="Fecha de corte *"
                  type="date"
                  reactive-rules
                  :rules="[
                    (val) =>
                      (form2.pensionado === 'SI' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.ingresos_mensuales"
                  label="Ingreso mensual *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.ingresos_anuales"
                  label="Ingreso anual *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.egresos_mensuales"
                  label="Egreso mensual *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.egresos_anuales"
                  label="Egreso anual *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.total_activos"
                  label="Total activos *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.total_pasivos"
                  label="Total pasivos *"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 text-center q-pl-none">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.otros_ingresos"
                  label="Otros ingresos *"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 text-center q-pl-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form2.descripcion_ingresos"
                  label="Descripción ingresos"
                  type="text"
                />
              </div>
            </div>
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="step--" label="Atrás" color="grey" rounded class="q-mr-sm" />
            <q-btn @click="validateStep(2)" label="Siguiente" rounded color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 3: Descripción de activos -->
        <q-step :name="3" title="Descripción de activos" icon="looks_3" :done="step > 3">
          <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
            Bien inmueble 1 (Casas, Apartamentos, Lotes, Fincas)
          </div>
          <q-form ref="formStep3" class="q-gutter-md">
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.tipo_primer_bien"
                  label="Tipo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_primer_bien"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-12 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.direccion_primer_bien"
                  label="Dirección"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.hipoteca_primer_bien"
                  label="Hipotecado a"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_primer_bien"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
            </div>
            <q-separator />
            <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
              Bien inmueble 2 (Casas, Apartamentos, Lotes, Fincas)
            </div>
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.tipo_segundo_bien"
                  label="Tipo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_segundo_bien"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-12 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.direccion_segundo_bien"
                  label="Dirección"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.hipoteca_segundo_bien"
                  label="Hipotecado a"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_segundo_bien"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
            </div>
            <q-separator />
            <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
              Vehiculo 1 (Moto, Auto, Campero, Camioneta)
            </div>
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.tipo_primer_vehiculo"
                  label="Tipo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_primer_vehiculo"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-12 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.marca_primer_vehiculo"
                  label="Marca / modelo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.placa_primer_vehiculo"
                  label="Placa"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_primer_vehiculo"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.prenda_primer_vehiculo"
                  label="Prenda a favor"
                  type="text"
                />
              </div>
            </div>
            <q-separator />
            <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
              Vehiculo 2 (Moto, Auto, Campero, Camioneta)
            </div>
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.tipo_segundo_vehiculo"
                  label="Tipo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_segundo_vehiculo"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-12 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.marca_segundo_vehiculo"
                  label="Marca / modelo"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.placa_segundo_vehiculo"
                  label="Placa"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_segundo_vehiculo"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.prenda_segundo_vehiculo"
                  label="Prenda a favor"
                  type="text"
                />
              </div>
            </div>
            <q-separator />
            <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
              Otros Bienes 1 (Describir inversiones, acciones, bonos, maquinaria, semovientes)
            </div>
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.descripcion_primer_otrobien"
                  label="Descripción"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_primer_otrobien"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_primer_otrobien"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.prenda_primer_otrobien"
                  label="Prenda a favor"
                  type="text"
                />
              </div>
            </div>
            <q-separator />
            <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
              Otros Bienes 2 (Describir inversiones, acciones, bonos, maquinaria, semovientes)
            </div>
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.descripcion_segundo_otrobien"
                  label="Descripción"
                  type="text"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.valor_segundo_otrobien"
                  label="Valor comercial"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-none q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.saldo_segundo_otrobien"
                  label="Saldo del crédito"
                  type="number"
                />
              </div>
              <div class="col-6 q-pl-sm q-mt-md text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form3.prenda_segundo_otrobien"
                  label="Prenda a favor"
                  type="text"
                />
              </div>
            </div>
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="step--" label="Atrás" color="grey" rounded class="q-mr-sm" />
            <q-btn @click="validateStep(3)" label="Siguiente" color="primary" rounded />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 4: conocimiento mejorado de personas -->
        <q-step :name="4" title="Conocimiento mejorado de personas" icon="looks_4" :done="step > 4">
          <q-form ref="formStep4" class="q-gutter-md">
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.politica_expuesta"
                  label="¿Política expuesta?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_politica_expuesta"
                  label="Indique politica expuesta"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.politica_expuesta === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.representa_ong"
                  label="¿Representa ONG?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_representa_ong"
                  label="Indique representa ONG"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.representa_ong === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.persona_publica"
                  label="¿Persona pública?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_persona_publica"
                  label="Indique persona pública"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.persona_publica === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.movimiento_politico"
                  label="¿Movimiento politico?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_movimiento_politico"
                  label="Indique movimiento politico"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.movimiento_politico === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.administra_publico"
                  label="¿Administra público?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_administra_publico"
                  label="Indique administra público"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.administra_publico === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.tributa_otro_pais"
                  label="¿Tributa otro país?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_tributa_otro_pais"
                  label="Indique tributa otro país"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.tributa_otro_pais === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.vinculo_pep"
                  label="¿Vínculo PEP?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.indique_vinculo_pep"
                  label="Indique vínculo PEP"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
            </div>
            <q-separator />
            <div class="row text-center">
              <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
                Información sobre los viculo 1 PEP
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.vinculo1"
                  label="Vínculo"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.nombre_vinculo1"
                  label="Nombre"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.tipodoc_vinculo1"
                  label="Tipo de identificación"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.numero_vinculo1"
                  label="Número de identificación"
                  type="number"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.nacionalidad_vinculo1"
                  label="Nacionalidad"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.entidad_vinculo1"
                  label="Entidad"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.cargo_vinculo1"
                  label="Cargo"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.fecha_vinculo1"
                  label="Fecha de vínculo"
                  type="date"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
            </div>
            <q-separator />
            <div class="row text-center">
              <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
                Información sobre los viculo 2 PEP
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.vinculo2"
                  label="Vínculo"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.nombre_vinculo2"
                  label="Nombre"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.tipodoc_vinculo2"
                  label="Tipo de identificación"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.numero_vinculo2"
                  label="Número de identificación"
                  type="number"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.nacionalidad_vinculo2"
                  label="Nacionalidad"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.entidad_vinculo2"
                  label="Entidad"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.cargo_vinculo2"
                  label="Cargo"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.fecha_vinculo2"
                  label="Fecha de vínculo"
                  type="date"
                  :rules="[
                    (val) =>
                      (form4.vinculo_pep === 'Si' ? val && val.length > 0 : true) || 'Obligatorio',
                  ]"
                />
              </div>
            </div>
            <div class="row text-center">
              <div class="text-subtitle2 text-weight-bold text-grey text-center q-mb-sm">
                Operaciones extranjeras?
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.operaciones_extranjeras"
                  label="¿Operaciones extranjeras?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.tipo_operaciones"
                  label="Tipo de operaciones"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.operaciones_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-5 q-pl-none text-center">
                <q-select
                  dense
                  rounded
                  outlined
                  emit-value
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="form4.cuentas_extranjeras"
                  label="¿Cuentas extranjeras?"
                  input-debounce="0"
                  :options="[
                    {
                      id: 'Si',
                      name: 'Si',
                    },
                    {
                      id: 'No',
                      name: 'No',
                    },
                  ]"
                  option-value="id"
                  option-label="name"
                  behavior="menu"
                  reactive-rules
                  :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
                >
                </q-select>
              </div>
              <div class="col-7 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.numero_cuenta"
                  label="Número de cuenta"
                  type="number"
                  :rules="[
                    (val) =>
                      (form4.cuentas_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.moneda"
                  label="Moneda"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.cuentas_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.monto"
                  label="Monto promedio"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.cuentas_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.ciudad_operaciones"
                  label="Ciudad de operaciones"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.cuentas_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form4.pais"
                  label="País de opereaciones"
                  type="text"
                  :rules="[
                    (val) =>
                      (form4.cuentas_extranjeras === 'Si' ? val && val.length > 0 : true) ||
                      'Obligatorio',
                  ]"
                />
              </div>
            </div>
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="step--" label="Atrás" color="grey" rounded class="q-mr-sm" />
            <q-btn @click="validateStep(4)" label="Siguiente" rounded color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 5: Referencias -->
        <q-step :name="5" title="Referencias y beneficiarios" icon="looks_5" :done="step > 5">
          <q-form ref="formStep5" class="q-gutter-md">
            <q-input
              v-model="form5.item"
              label="Nombre de Referencia"
              outlined
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="step--" label="Atrás" color="grey" flat class="q-mr-sm" />
            <q-btn @click="validateStep(5)" label="Siguiente" color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 6: Aportes -->
        <q-step :name="6" title="Aportes" icon="looks_6" :done="step > 6">
          <q-form ref="formStep6" class="q-gutter-md">
            <div class="row text-center">
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_voluntario"
                  label="Aporte voluntario"
                  type="number"
                  reactive-rules
                  :rules="[(val) => (val && val > 0) || 'Obligatorio']"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_vivienda"
                  label="Aporte vivienda"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_vehiculo"
                  label="Aporte vehiculo"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_microempresa"
                  label="Aporte microempresa"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_vista"
                  label="Aporte de la vistas"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_programado"
                  label="Aporte programado"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_progresandito"
                  label="Aporte progresandito"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-sm text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_extraordinario"
                  label="Aporte extraordinario"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
              <div class="col-6 q-pl-none text-center">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="form6.aporte_fijo"
                  label="Aporte ahorro fijo"
                  type="number"
                  reactive-rules
                  :rules="[
                    (val) => (val !== null && val !== undefined && val !== '') || 'Obligatorio',
                  ]"
                />
              </div>
            </div>
          </q-form>
          <q-stepper-navigation class="q-pa-sm text-right">
            <q-btn @click="step--" label="Atrás" color="grey" rounded class="q-mr-sm" />
            <q-btn @click="finishStepper" label="Finalizar" color="green" rounded />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-card>
  </q-page>
</template>

<script setup>
import { useCommonStore } from '../../stores/common'
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showNotifications } from '../../helpers/showNotifications'
import { showLoading, hideLoading } from '../../helpers/showLoading'

const commonStore = useCommonStore()
const router = useRouter()

const step = ref(1) // Paso inicial

const user = computed(() => {
  let u = {}
  if (commonStore.user && commonStore.user.data && commonStore.user.data.user) {
    u = commonStore.user.data.user
  }
  return u
})

const novel = computed(() => {
  let n = {}
  if (user.value && user.value.new) {
    n = user.value.new
  }
  return n
})

const edad = computed(() => {
  if (!form1.fecha_nacimiento) return ''
  const nacimiento = new Date(form1.fecha_nacimiento)
  const hoy = new Date()
  let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear()

  // Ajustar si aún no ha cumplido años este año
  const mesActual = hoy.getMonth()
  const diaActual = hoy.getDate()
  if (
    mesActual < nacimiento.getMonth() ||
    (mesActual === nacimiento.getMonth() && diaActual < nacimiento.getDate())
  ) {
    edadCalculada--
  }

  return edadCalculada
})

// Datos de cada paso
const form1 = reactive({
  fecha_afiliacion: user.value.payment_date,
  nombre: novel.value.name,
  primer_apellido: novel.value.first_lastname,
  segundo_apellido: novel.value.second_lastname,
  tipo_documento: novel.value.type_document,
  cedula: novel.value.document_number,
  fecha_expedicion: novel?.value?.date_issue?.substring(0, 10),
  dpto_expedicion: novel.value.dpto_exp,
  lugar_expedicion: novel.value.city_issue,
  fecha_nacimiento: novel?.value?.birthdate?.substring(0, 10),
  edad,
  dpto_nacimiento: novel.value.dpto_birth,
  lugar_nacimiento: novel.value.city_id,
  nacionalidad: novel.value.country,
  cedula_representante: '',
  nombre_representante: '',
  edad_representante: '',
  genero: novel.value.gender,
  estado_civil: novel.value.marital_status,
  personas_adultos: novel.value.person_charge_adults,
  personas_menores: novel.value.person_charge_minors,
  cabeza_familia: novel.value.head_of_family,
  tipo_vivienda: novel.value.type_house,
  estrato: novel.value.stratum,
  dpto: novel.value.dpto_house,
  ciudad: novel.value.city_house,
  direccion: novel.value.address_house,
  telefono: novel.value.phone_house,
  celular: novel.value.phone,
  email: novel.value.email,
  nivel_educativo: novel.value.academic_level,
  profesion: '',
  idiomas: '',
  hobbies: '',
  autoriza_residencia: 'NO',
  autoriza_trabajo: 'NO',
  autoriza_familiar: 'NO',
  autoriza_email: 'NO',
  autoriza_telefono: 'NO',
  autoriza_datos: 'NO',
  estado: 'Activo',
})

const getNameDepartment = (value) => {
  let name = optionsDepartments.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCityIssue = (value) => {
  let name = optionsCitiesIssue.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCity = (value) => {
  let name = optionsCities.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCityHouse = (value) => {
  let name = optionsCitiesHouse.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCityCompany = (value) => {
  let name = optionsCitiesCompany.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const getNameCitySecond = (value) => {
  let name = optionsCitiesSecond.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 15) {
    name = truncateString(name, 15)
  }
  return name
}

const truncateString = (str, maxLength = 30) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}

const optionsDepartments = computed(() => {
  return commonStore.departments
})

const optionsCitiesIssue = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form1.dpto_expedicion)
})

const optionsCities = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form1.dpto_nacimiento)
})

const optionsCitiesHouse = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form1.dpto)
})

const optionsCitiesCompany = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form2.dpto_empresa)
})

const optionsCitiesSecond = computed(() => {
  return commonStore.cities.filter((c) => c.department_id === form2.dpto_secundaria)
})

const form2 = reactive({
  actividad_economica: 'Asalariado',
  declara_renta: 'No',
  codigo_ciiu: '',
  descripcion_ciiu: '',
  ocupacion: '',
  cargo: '',
  empresa: '',
  empresa_id: 1,
  tipo_empresa: 'Privada',
  descuento: 'Nomina',
  tipo_contrato: 'Indefinido',
  tiempo_actividad: 'Completo',
  jornada: 'Diurno',
  direccion_empresa: '',
  ciudad_empresa: '',
  dpto_empresa: '',
  telefono_empresa: '',
  extension: '',
  actividad_secundaria: 'N/A',
  direccion_secundaria: '',
  ciudad_secundaria: '',
  dpto_secundaria: '',
  telefono_secundaria: '',
  descripcion_secundaria: 'N/A',
  pensionado: 'No',
  entidad_pension: '',
  valor_pension: '',
  fecha_pension: '',
  resolucion_pension: '',
  fecha_corte: '',
  ingresos_anuales: '',
  ingresos_mensuales: '',
  egresos_anuales: '',
  egresos_mensuales: '',
  total_activos: '',
  total_pasivos: '',
  otros_ingresos: 0,
  descripcion_ingresos: '',
})

const optionsCompanies = computed(() => {
  return commonStore.companies
})

const getNameCompany = (value) => {
  let name = optionsCompanies.value.find((opt) => opt.id === value)?.name
  if (name && name.length > 30) {
    name = truncateString(name, 30)
  }
  return name
}

const filteredCompanies = ref([...optionsCompanies.value])

const filterCompanies = (val, update) => {
  if (val === '') {
    update(() => {
      filteredCompanies.value = [...optionsCompanies.value]
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filteredCompanies.value = optionsCompanies.value.filter((company) =>
      company.name.toLowerCase().includes(needle),
    )
  })
}

const form3 = reactive({
  tipo_primer_bien: '',
  direccion_primer_bien: '',
  valor_primer_bien: '',
  hipoteca_primer_bien: '',
  saldo_primer_bien: '',
  tipo_segundo_bien: '',
  direccion_segundo_bien: '',
  valor_segundo_bien: '',
  hipoteca_segundo_bien: '',
  saldo_segundo_bien: '',
  tipo_primer_vehiculo: '',
  valor_primer_vehiculo: '',
  marca_primer_vehiculo: '',
  placa_primer_vehiculo: '',
  saldo_primer_vehiculo: '',
  prenda_primer_vehiculo: '',
  tipo_segundo_vehiculo: '',
  valor_segundo_vehiculo: '',
  marca_segundo_vehiculo: '',
  placa_segundo_vehiculo: '',
  saldo_segundo_vehiculo: '',
  prenda_segundo_vehiculo: '',
  descripcion_primer_otrobien: '',
  valor_primer_otrobien: '',
  saldo_primer_otrobien: '',
  prenda_primer_otrobien: '',
  descripcion_segundo_otrobien: '',
  valor_segundo_otrobien: '',
  saldo_segundo_otrobien: '',
  prenda_segundo_otrobien: '',
})

const form4 = reactive({
  politica_expuesta: 'No',
  indique_politica_expuesta: '',
  representa_ong: 'No',
  indique_representa_ong: '',
  persona_publica: 'No',
  indique_persona_publica: '',
  movimiento_politico: 'No',
  indique_movimiento_politico: '',
  administra_publico: 'No',
  indique_administra_publico: '',
  tributa_otro_pais: 'No',
  indique_tributa_otro_pais: '',
  vinculo_pep: 'No',
  indique_vinculo_pep: '',
  vinculo1: '',
  nombre_vinculo1: '',
  tipodoc_vinculo1: '',
  numero_vinculo1: '',
  nacionalidad_vinculo1: '',
  entidad_vinculo1: '',
  cargo_vinculo1: '',
  fecha_vinculo1: '',
  vinculo2: '',
  nombre_vinculo2: '',
  tipodoc_vinculo2: '',
  numero_vinculo2: '',
  nacionalidad_vinculo2: '',
  entidad_vinculo2: '',
  cargo_vinculo2: '',
  fecha_vinculo2: '',
  operaciones_extranjeras: 'No',
  tipo_operaciones: '',
  cuentas_extranjeras: 'No',
  numero_cuenta: '',
  entidad_cuenta: '',
  moneda: '',
  monto: '',
  ciudad_operaciones: '',
  pais: '',
})
const form5 = reactive({ item: '' })

const form6 = reactive({
  aporte_voluntario: novel.value.contribution,
  aporte_vivienda: 0,
  aporte_vehiculo: 0,
  aporte_microempresa: 0,
  aporte_vista: 0,
  aporte_programado: 0,
  aporte_progresandito: 0,
  aporte_extraordinario: 0,
  aporte_fijo: 0,
  aporte_fundador: 0,
})

// Referencias a los formularios
const formStep1 = ref(null)
const formStep2 = ref(null)
const formStep3 = ref(null)
const formStep4 = ref(null)
const formStep5 = ref(null)
const formStep6 = ref(null)

// Función para validar el formulario antes de avanzar
const validateStep = async (currentStep) => {
  const formRef = eval(`formStep${currentStep}`)
  if (formRef.value) {
    const valid = await formRef.value.validate()
    if (valid) step.value++
  }
}

// Función para finalizar el proceso
const finishStepper = async () => {
  const allValid = await Promise.all([formStep6.value.validate()])
  if (allValid.every((valid) => valid)) {
    onSubmit()
  }
}

onMounted(async () => {
  showLoading('Cargando ...', 'Por favor, espere', true)
  await commonStore.getDepartments()
  await commonStore.getCities()
  await commonStore.getCompanies()
  hideLoading()
})

watch(
  () => form1.dpto_expedicion,
  () => {
    form1.lugar_expedicion = ''
  },
)

watch(
  () => form1.department_id,
  () => {
    form1.city_id = ''
  },
)

watch(
  () => form1.department_house,
  () => {
    form1.city_house = ''
  },
)

watch(
  () => form2.empresa_id,
  (val) => {
    if (val !== 1) {
      form2.empresa = getNameCompany(val)
    } else {
      form2.empresa = ''
    }
  },
)

const onSubmit = async () => {
  showLoading('Creando cuenta ...', 'Por favor, espere', true)
  const data = {}
  data.asociado = { ...form1 }
  data.economicas = { ...form2 }
  data.activos = { ...form3 }
  data.conocimientos = { ...form4 }
  data.aportes = [
    {
      linea_aporte_id: 1,
      valor_aporte: form6.aporte_voluntario,
    },
    {
      linea_aporte_id: 2,
      valor_aporte: form6.aporte_vivienda,
    },
    {
      linea_aporte_id: 3,
      valor_aporte: form6.aporte_vehiculo,
    },
    {
      linea_aporte_id: 4,
      valor_aporte: form6.aporte_microempresa,
    },
    {
      linea_aporte_id: 5,
      valor_aporte: form6.aporte_vista,
    },
    {
      linea_aporte_id: 6,
      valor_aporte: form6.aporte_programado,
    },
    {
      linea_aporte_id: 7,
      valor_aporte: form6.aporte_progresandito,
    },
    {
      linea_aporte_id: 8,
      valor_aporte: form6.aporte_extraordinario,
    },
    {
      linea_aporte_id: 9,
      valor_aporte: form6.aporte_fijo,
    },
  ]
  await commonStore.completeDataSaac(data)

  if (commonStore.status) {
    commonStore.setCompleteData(commonStore.status)
    // PONER QUE SE CAMBIE EL VALOR DEL CAMPO. USERS.COMPLETED_FIELDS, en update_user
    router.push('/')
  }
  showNotifications(commonStore.responseMessages, commonStore.status, 'bottom-right', 5000)
  hideLoading()
}
</script>
<style scoped>
:deep(.q-stepper--vertical .q-stepper__step-inner) {
  padding: 0px 0px 0px 20px;
}
:deep(.q-stepper--vertical .q-stepper__tab) {
  padding: 12px 0px;
}
</style>
