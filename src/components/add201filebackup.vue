<template>
  <q-page class="q-pa-md">
    <q-card flat class="q-pa-md card-border">
      <q-toolbar>
        <q-toolbar-title class="text-left text-h4 text-weight-bold"
          >201-File</q-toolbar-title
        >
      </q-toolbar>

      <div class="row q-gutter-sm">
        <div class="col">
          <q-input
            color="positive"
            outlined
            label="First name"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <q-input
            color="positive"
            outlined
            label="Middle name"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            color="positive"
            label="Last name"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            color="positive"
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
            color="positive"
            label="Agency"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <div class="col">
          <q-input
            color="positive"
            outlined
            label="Position"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-input
            outlined
            color="positive"
            type="date"
            width
            hint="Date of Birth"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            color="positive"
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
            color="positive"
            label="Current Address"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            color="positive"
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
            color="positive"
            label="Email Address"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col">
          <q-input
            outlined
            color="positive"
            label="Contact Number"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>

     <!-- <div class="row q-gutter-sm">
        <q-list>
          <q-item>
            <q-btn
              label="Transcript Of Record"
              color="positive"
              rounded
              :size= "xl"
              text-color="white"
              icon="attachment"
              dense
            >
            </q-btn>
          </q-item>
          <q-item>
            <q-btn
              label="Personal Data Sheet"
              color="positive"
              rounded
              :size= "xl"
              text-color="white"
              icon="attachment"
              dense
            >
            </q-btn>
          </q-item>
          <q-item>
            <q-btn
              label="Appointment"
              color="positive"
              rounded
              :size= "xl"
              text-color="white"
              icon="attachment"
              dense
            >
            </q-btn>
          </q-item>


          <q-item>
            <q-btn
              label="Eligibility"
              color="positive"
              rounded
              :size= "xl"
              text-color="white"
              icon="attachment"
              dense
            >
            </q-btn>
          </q-item>
          <q-item>
            <q-btn
              label="S-CARD"
              color="positive"
              rounded
              :size= "xl"
              text-color="white"
              icon="attachment"
              dense
            >
            </q-btn>
          </q-item>
        </q-list>
      </div> -->



  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
        label="Transcript Of Records"
        multiple
        batch
        color="grey-8"
        icon="attachment"
        flat
        bordered
        style="max-width: 500px"
      />

      <q-uploader
      label = "Personal Data Sheet"
      multiple
        batch
        color="grey-8"
        flat
        bordered

      />

      <q-uploader
         label="Appointment"
         multiple
        batch
        color="grey-8"
        icon="attachment"
        flat
        bordered
      />

      <q-uploader
         label="Eligibility"
         multiple
        batch
        color="grey-8"
        icon="attachment"
        flat
        bordered
      />

      <q-uploader
         label="S-Card"
         multiple
        batch
        color="grey-8"
        icon="attachment"
        flat
        bordered
      />


    </div>
  </div>



      <q-card-action class="row text-center">
        <div class="col">
          <q-btn
            style="width: 60%;"
            label="Cancel"
            outline
            color="red"
            rounded
            dense
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            style="width: 60%;"
            label="Confirm"
            rounded
            color="positive"
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
