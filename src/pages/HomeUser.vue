<template>
  <q-page padding>
    <div class="q-pa-md" >
      <div class="row justify-center items-center text-center q-gutter-md">
        <q-card class="col bg-green card-radius text-white">
          <q-card-section class="bg-green-8 text-h5 text-weight-medium">
            CSC EMPLOYEE
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">12</q-card-section>
        </q-card>
        <q-card class="col bg-orange card-radius text-white">
          <q-card-section class="bg-orange-8 text-h5 text-weight-medium">
            201-FILE
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">572</q-card-section>
        </q-card>
        <q-card class="col bg-yellow-8 card-radius text-white">
          <q-card-section class="bg-yellow-9 text-h5 text-weight-medium">
            MONTHLY REPORTS
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">236</q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md q-pt-md">
      <q-separator color="primary" />
    </div>
    <div class="q-pa-md" >
      <div class="row justify-center items-center q-gutter-md">
        <q-card class="col card-radius">
          <q-card-section class="text-h5 text-weight-medium">
            What is Civil Service Commission?
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">lorem ipsum</q-card-section>
        </q-card>
        <q-card class="col card-radius">
          <q-card-section class="text-h5 text-weight-medium">
            What is 201-File?
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">lorem ipsum</q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class HomeUser extends Vue {}
</script>

<style scoped>
.card-radius {
  border-radius: 25px;
}
</style>
