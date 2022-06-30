<template>
  <q-page padding>
    <div class="q-pa-md" >
      <div class="row justify-center items-center text-center q-gutter-md">
        <q-card class="col bg-green card-radius text-white">
          <q-card-section class="bg-green-8 text-h5 text-weight-medium">
            Accounts
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder"></q-card-section>
        </q-card>
        <q-card class="col bg-orange card-radius text-white">
          <q-card-section class="bg-orange-8 text-h5 text-weight-medium">
            Documents
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder"> </q-card-section>
        </q-card>
        <q-card class="col bg-yellow-8 card-radius text-white">
          <q-card-section class="bg-yellow-9 text-h5 text-weight-medium">
            Employees
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder"> </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md q-pt-md">
      <q-separator color="primary" />
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
