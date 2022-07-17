<template>
  <q-page>
    <q-card
      class="q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="q-pr-md q-pl-md text-weight-bold"
          >Add 201 File</q-toolbar-title
        >
      </q-toolbar>
      <q-card class="q-pr-md q-pl-md">
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
              <q-file
                v-model="files"
                label="Appointment"
                outlined
                use-chips
                multiple
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
            <div class="col">
              <q-file
                v-model="files"
                label="Transcript of Record"
                outlined
                use-chips
                multiple
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
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
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({})
export default class AddDocumentPage extends Vue {
  isUpload = false;
  isSubmit = false;
}
</script>

<style scoped></style>
