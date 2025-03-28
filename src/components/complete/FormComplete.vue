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
          <q-form ref="formStep2" class="q-gutter-md">
            <q-input
              v-model="form2.occupation"
              label="Ocupación"
              outlined
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
            <q-input
              v-model="form2.salary"
              label="Salario Mensual"
              type="number"
              outlined
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-form>
          <q-stepper-navigation>
            <q-btn @click="step--" label="Atrás" color="grey" rounded class="q-mr-sm" />
            <q-btn @click="validateStep(2)" label="Siguiente" color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 3: Descripción de activos -->
        <q-step :name="3" title="Descripción de activos" icon="looks_3" :done="step > 3">
          <q-form ref="formStep3" class="q-gutter-md">
            <q-input
              v-model="form3.property"
              label="Propiedad (Casa, Carro, etc.)"
              outlined
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-form>
          <q-stepper-navigation>
            <q-btn @click="step--" label="Atrás" color="grey" flat class="q-mr-sm" />
            <q-btn @click="validateStep(3)" label="Siguiente" color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 4: Referencias -->
        <q-step :name="4" title="Referencias y beneficiarios" icon="looks_4" :done="step > 4">
          <q-form ref="formStep4" class="q-gutter-md">
            <q-input
              v-model="form4.reference"
              label="Nombre de Referencia"
              outlined
              :rules="[(val) => (val && val.length > 0) || 'Obligatorio']"
            />
          </q-form>
          <q-stepper-navigation>
            <q-btn @click="step--" label="Atrás" color="grey" flat class="q-mr-sm" />
            <q-btn @click="validateStep(4)" label="Siguiente" color="primary" />
          </q-stepper-navigation>
        </q-step>

        <!-- Paso 5: Aportes -->
        <q-step :name="5" title="Aportes" icon="looks_5" :done="step > 5">
          <q-form ref="formStep5" class="q-gutter-md">
            <q-input
              v-model="form5.contribution"
              label="Monto de Aporte"
              type="number"
              outlined
              :rules="[(val) => (val && val > 0) || 'Obligatorio']"
            />
          </q-form>
          <q-stepper-navigation>
            <q-btn @click="step--" label="Atrás" color="grey" flat class="q-mr-sm" />
            <q-btn @click="finishStepper" label="Finalizar" color="green" />
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

const form2 = reactive({ occupation: '', salary: '' })
const form3 = reactive({ property: '' })
const form4 = reactive({ reference: '' })
const form5 = reactive({ contribution: '' })

// Referencias a los formularios
const formStep1 = ref(null)
const formStep2 = ref(null)
const formStep3 = ref(null)
const formStep4 = ref(null)
const formStep5 = ref(null)

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
  const allValid = await Promise.all([formStep5.value.validate()])
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

const onSubmit = async () => {
  showLoading('Creando cuenta ...', 'Por favor, espere', true)
  const data = {}
  data.asociado = { ...form1 }
  await commonStore.completeDataSaac(data)

  if (commonStore.status) {
    commonStore.setCompleteData(commonStore.status)
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
