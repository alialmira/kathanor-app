<template>
  <q-page>
    <q-card flat class="q-pa-md">
      <q-toolbar>
        <q-toolbar-title class="text-center text-h4 text-weight-bold"
          >ADD EMPLOYEE</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              outlined
              label="First name"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Middle name"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Last name"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Extension name"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              outlined
              label="Agency"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Position"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input outlined type="date" width hint="Date of Birth" />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Place of Birth"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              outlined
              label="Current Address"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Home Address"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              outlined
              label="Email Address"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              outlined
              label="Contact Number"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-action class="row q-gutter-sm q-pl-md q-pr-md">
        <div class="col">
          <q-btn
            class="full-width"
            label="Cancel"
            outline
            rounded
            dense
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            label="Confirm"
            outline
            rounded
            dense
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
      </q-card-action>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class AddEmployeePage extends Vue {
  isUpload = false;
  isSubmit = false;
}
</script>

<style scoped></style>
