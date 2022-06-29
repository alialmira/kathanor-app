<template>
  <q-page>
    <div class="q-pt-md q-pr-xl q-pl-xl">
      <q-card class="align-center no-shadow" >
        <div class="row q-gutter-xl">
          <div class="col-3">
            <q-card class="text-white text-center bg-positive" style="border-radius: 25px">
              <q-card-section style="font-size: 25px;">
                EMPLOYEES
              </q-card-section>
              <q-card-action style="font-size: 100px;">
                20
              </q-card-action>
            </q-card>
          </div>
          <div class="col-3">
            <q-card class="text-white text-center bg-positive" style="border-radius: 25px">
              <q-card-section style="font-size: 25px;">
                201 - FILES
              </q-card-section>
              <q-card-action style="font-size: 100px;">
                15
              </q-card-action>
            </q-card>
          </div>
          <div class="col-3">
            <q-card class="text-white text-center bg-positive" style="border-radius: 25px">
              <q-card-section style="font-size: 25px;">
                CSC REPORT
              </q-card-section>
              <q-card-action style="font-size: 100px;">
                10
              </q-card-action>
            </q-card>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class HomeUser extends Vue {}
</script>

<style scoped></style>
