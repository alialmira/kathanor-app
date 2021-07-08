<template>
  <q-dialog v-model="showAddDocumetDialog" persistent @hide="hideDialog()">
    <q-stepper
      v-model="step"
      class="q-pa-none"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        class="q-pa-none"
        :name="1"
        title="Document Details"
        icon="description"
        :done="step > 1"
      >
        <q-card flat class="__card q-pa-none">
          <q-card-section class="q-gutter-y-md q-pa-none">
            <q-input
              ref="docIdNum"
              v-model="documents.name"
              filled
              label="Document ID Number"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              ref="subject"
              v-model="documents.subject"
              filled
              label="Subject"
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
            />
            <q-input
              filled
              ref="date"
              v-model="documents.date"
              mask="date"
              :rules="['date']"
              label="Date Posted"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date color="primary" v-model="documents.date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-select
              filled
              ref="docType"
              v-model="documents.docType"
              :rules="[val => !!val || 'Field is required']"
              :options="['Special Order', 'Memorandum']"
              label="Document Type"
            />
          </q-card-section>
          <!-- <q-card-actions class="row q-col-gutter-md">
            <div class="col-6">
              <q-btn
                class="full-width"
                label="Next"
                color="dark"
                text-color="white"
              ></q-btn>
            </div>
            <div class="col-6">
              <q-btn
                class="full-width"
                label="Cancel"
                color="dark"
                text-color="white"
                @click="addDocsPopups(false)"
              ></q-btn>
            </div>
          </q-card-actions> -->
        </q-card>
      </q-step>

      <q-step
        class="q-pa-none"
        :name="2"
        title="Upload File"
        icon="upload_file"
        :done="step > 2"
      >
        <q-file
          color="red-10"
          ref="docFile"
          v-model="documents.docFile"
          filled
          :rules="[val => !!val || 'Field is required']"
          label="Choose File"
          @update:model-value="fileChoose($event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            @click="step === 2 ? uploadFile() : saveDocument()"
            color="red-10"
            :label="step === 2 ? 'Finish' : 'Continue'"
            :loading="isSubmit"
            :disable="isSubmit"
          />
          <q-btn
            v-if="step >= 1"
            flat
            color="red-10"
            @click="step === 1 ? addDocsPopups(false) : $ref.stepper.previous()"
            :label="step === 1 ? 'Cancle' : 'Previous'"
            class="q-ml-sm"
            :loading="isUpload"
            :disable="isUpload"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddDocumetDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups', 'sendMessagePopups']),
    ...mapActions('document', ['addDocument', 'uploadDocument'])
  }
})
export default class addDocsDialog extends Vue {
  _id = undefined;
  step = 1;
  isSubmit = false;
  isUpload = false;
  documents = {
    name: '',
    subject: '',
    docType: '',
    date: '',
    docFile: []
  };
  $refs!: {
    docIdNum: RefsVue;
    subject: RefsVue;
    date: RefsVue;
    docType: RefsVue;
    docFile: RefsVue;
    stepper: RefsVue;
  };
  formHasError!: boolean;
  showAddDocumetDialog!: boolean;
  addDocsPopups!: (show: boolean) => void;
  sendMessagePopups!: (show: boolean) => void;
  addDocument!: (payload: any) => Promise<void>;
  uploadDocument!: (payload: any) => Promise<void>;

  fileChoose(val: any) {
    this.documents.docFile = val;
  }

  hideDialog() {
    this.documents = {
      name: '',
      subject: '',
      docType: '',
      date: '',
      docFile: []
    };
  }

  async saveDocument() {
    this.isSubmit = true;
    this.$refs.docIdNum.validate();
    this.$refs.subject.validate();
    this.$refs.date.validate();
    this.$refs.docType.validate();

    if (
      this.$refs.docIdNum.hasError ||
      this.$refs.subject.hasError ||
      this.$refs.date.hasError ||
      this.$refs.docType.hasError
    ) {
      this.formHasError = true;
    } else {
      const res: any = await this.addDocument(this.documents);
      this._id = res.data._id;
      this.isSubmit = false;
      this.$refs.stepper.next();
    }
  }

  async uploadFile() {
    this.isUpload = true;
    this.$refs.docFile.validate();
    if (this.$refs.docFile.hasError) {
      this.formHasError = true;
    } else {
      console.log('file: ', this.documents.docFile);
      await this.uploadDocument({ id: this._id, file: this.documents.docFile });
      this.isUpload = false;
      this.addDocsPopups(false);
    }
  }
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
