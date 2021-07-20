<template>
  <q-dialog v-model="showAddDocumetDialog" persistent @hide="hideDialog()">
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/icons8-add-document-48.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >ADD NEW DOCUMENT</q-toolbar-title
        >
        <q-btn
          color="dark"
          icon="close"
          size="md"
          @click="addDocsPopups(false)"
        ></q-btn>
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
          :options="['Special Order', 'Memorandum', 'Official Announcement']"
          label="Document Type"
        />
        <q-file
          color="red-10"
          clearable
          ref="docFile"
          max-file-size="1048576"
          v-model="documents.contentType"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
          label="Choose Files"
          @update:model-value="fileChoose($event)"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Create"
            color="dark"
            text-color="white"
            @click="saveDocument()"
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Reset"
            color="dark"
            text-color="white"
            @click="hideDialog()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import uploadService from 'src/services/upload.service';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

interface IDocument {
  name: string;
  subject: string;
  docType: string;
  date: string;
  contentType: any;
  docFile: any;
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
export default class AddDocsDialog extends Vue {
  _id = undefined;
  step = 1;
  isSubmit = false;
  isUpload = false;
  documents: IDocument = {
    name: '',
    subject: '',
    docType: '',
    date: '',
    contentType: [],
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
      contentType: [],
      docFile: []
    };
    this.step = 1;
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
      this.documents.docFile = this.documents.contentType;
      const res = await uploadService.uploadOneFile(this.documents.docFile);
      console.log(res);
      console.log({
        ...this.documents,
        file: res.fileDownloadUri,
        contentType: res.fileType
      });
      await this.addDocument({
        ...this.documents,
        file: res.fileDownloadUri,
        contentType: res.fileType
      });
      this.addDocsPopups(false);
      this.documents = {
        name: '',
        subject: '',
        docType: '',
        date: '',
        contentType: [],
        docFile: []
      };
      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Document Added'
      });
    }
  }
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
