<template>
  <q-dialog v-model="showAddDocumetDialog" persistent @hide="hideDialog()">
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar> <img src="~assets/icons8-add-document-48.png"/></q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Add Document</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
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
                    <q-btn v-close-popup label="Close" color="primary" flat />
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
        <!-- <q-file
          color="red-10"
          ref="docFile"
          v-model="documents.docFile"
          filled
          :rules="[val => !!val || 'Field is required']"
          label="Choose File"
          accept=".jpg, .png, .docx, .pdf, image/*"
          @update:model-value="fileChoose($event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file> -->
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Save"
            color="dark"
            text-color="white"
            @click="saveDocument()"
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
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddDocumetDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups', 'sendMessagePopups']),
    ...mapActions('document', ['addDocument'])
  }
})
export default class addDocsDialog extends Vue {
  documents = {
    name: '',
    subject: '',
    docType: '',
    date: ''
  };
  $refs!: {
    docIdNum: RefsVue;
    subject: RefsVue;
    date: RefsVue;
    docType: RefsVue;
    docFile: RefsVue;
  };
  formHasError!: boolean;
  showAddDocumetDialog!: boolean;
  addDocsPopups!: (show: boolean) => void;
  sendMessagePopups!: (show: boolean) => void;
  addDocument!: (payload: any) => Promise<void>;

  fileChoose(val: any) {
    console.log(val);
  }

  hideDialog() {
    this.documents = { name: '', subject: '', docType: '', date: '' };
  }

  async saveDocument() {
    this.$refs.docIdNum.validate();
    this.$refs.subject.validate();
    this.$refs.date.validate();
    this.$refs.docType.validate();
    // this.$refs.docFile.validate();

    if (
      this.$refs.docIdNum.hasError ||
      this.$refs.subject.hasError ||
      this.$refs.date.hasError ||
      this.$refs.docType.hasError
    ) {
      this.formHasError = true;
    } else {
      await this.addDocument(this.documents);
      this.addDocsPopups(false);
      this.sendMessagePopups(true);
    }
  }
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
