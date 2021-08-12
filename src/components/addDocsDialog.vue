<template>
  <q-dialog
    v-model="showAddDocumetDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/icons8-add-document-48.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center">
          <span v-if="document.onUpdate">UPDATE DOCUMENT</span>
          <span v-else>ADD NEW DOCUMENT</span>
        </q-toolbar-title>
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
          maxlength="20"
          v-model="documents.name"
          filled
          label="Document ID Number"
          mask="########"
          lazy-rules
          :rules="[
            val => val.length >= 3 || 'Document ID Number is not complete'
          ]"
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
        <div class="row q-col-gutter-md">
          <div class="col-6">
            <q-input
              filled
              ref="acadYear"
              mask="####-####"
              v-model="documents.acadYear"
              :rules="[val => !!val || 'Field is required']"
              label="Academic Year"
            />
          </div>
          <div class="col-6">
            <q-select
              filled
              ref="semester"
              v-model="documents.semester"
              :rules="[val => !!val || 'Field is required']"
              :options="['1st Semester', '2nd Semester', 'Summer']"
              label="Semester"
            />
          </div>
        </div>
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
          max-file-size="1048576"
          v-model="documents.contentType"
          filled
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
            :label="document.onUpdate ? 'Update' : 'Create'"
            color="dark"
            text-color="white"
            @click="document.onUpdate ? editDocument() : saveDocument()"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';

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
  smsStatus: any;
  semester: string;
  acadYear: string;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddDocumetDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups', 'sendMessagePopups']),
    ...mapActions('document', [
      'addDocument',
      'uploadDocument',
      'updateDocument',
      'getDocuments'
    ])
  }
})
export default class AddDocsDialog extends Vue {
  @Prop({ type: Object, required: true }) readonly document!: IDocument;

  _id = undefined;
  isSubmit = false;
  isUpload = false;
  documents: any = {
    name: '',
    subject: '',
    docType: '',
    date: '',
    smsStatus: '',
    contentType: [],
    docFile: [],
    onUpdate: false,
    semester: '',
    acadYear: ''
  };
  $refs!: {
    docIdNum: RefsVue;
    subject: RefsVue;
    date: RefsVue;
    docType: RefsVue;
    docFile: RefsVue;
    semester: RefsVue;
    acadYear: RefsVue;
  };
  formHasError!: boolean;
  showAddDocumetDialog!: boolean;
  addDocsPopups!: (show: boolean) => void;
  sendMessagePopups!: (show: boolean) => void;
  addDocument!: (payload: any) => Promise<void>;
  uploadDocument!: (payload: any) => Promise<void>;
  updateDocument!: (payload: any) => Promise<void>;
  getDocuments!: () => Promise<void>;

  fileChoose(val: any) {
    this.documents.docFile = val;
  }

  showDialog() {
    this.documents = { ...this.document, docFile: [], contentType: [] };
  }

  hideDialog() {
    this.documents = {
      name: '',
      subject: '',
      docType: '',
      date: '',
      smsStatus: '',
      contentType: [],
      docFile: [],
      semester: '',
      acadYear: ''
    };
    this.$emit('clearData', { ...this.documents, onUpdate: false });
  }

  async saveDocument() {
    this.isSubmit = true;
    this.$refs.docIdNum.validate();
    this.$refs.subject.validate();
    this.$refs.date.validate();
    this.$refs.docType.validate();
    this.$refs.semester.validate();
    this.$refs.acadYear.validate();

    if (
      this.$refs.docIdNum.hasError ||
      this.$refs.subject.hasError ||
      this.$refs.date.hasError ||
      this.$refs.docType.hasError ||
      this.$refs.semester.hasError ||
      this.$refs.acadYear.hasError
    ) {
      this.formHasError = true;
    } else {
      this.documents.docFile = this.documents.contentType;
      if (this.documents.contentType.length != 0) {
        const res = await uploadService.uploadOneFile(this.documents.docFile);
        const currentYear = date.formatDate(Date.now(), 'YYYY') as string;
        await this.addDocument({
          ...this.documents,
          file: res.fileDownloadUri,
          contentType: res.fileType,
          name: `${currentYear}-${this.documents.name as string}-OP`,
          smsStatus: false
        });
        this.addDocsPopups(false);
        this.documents = {
          name: '',
          subject: '',
          docType: '',
          date: '',
          smsStatus: '',
          contentType: [],
          docFile: [],
          semester: '',
          acadYear: ''
        };
        this.$q.notify({
          type: 'positive',
          message: 'Document Added Successfully.'
        });
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'Upload Document File is required.'
        });
      }
    }
  }

  async editDocument() {
    try {
      this.documents.docFile = this.documents.contentType;
      if (this.document.docFile || this.document.docFile != null) {
        const res = await uploadService.uploadOneFile(this.documents.docFile);
        delete this.documents.onUpdate;
        await this.updateDocument({
          ...this.documents,
          file: res.fileDownloadUri,
          contentType: res.fileType
        });
      } else {
        await this.updateDocument({
          ...this.documents,
          contentType: this.document.contentType,
          docFile: this.document.docFile
        });
      }
      this.addDocsPopups(false);
      this.$q.notify({
        type: 'positive',
        message: 'Document Updated Successfully.'
      });
      await this.getDocuments();
    } catch (error) {
      console.log(error);
      this.$q.notify({
        type: 'warning',
        message: 'Somethig wrong when updating the documents.'
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
