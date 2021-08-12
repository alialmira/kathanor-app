<template>
  <q-dialog v-model="showUploadContactsDialog" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar> <img src="~assets/icons8-add-document-48.png"/></q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Import File for Contacts</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
        <div class="q-pa-md">
          <q-file
            v-model="contacts"
            label="Choose Files"
            filled
            accept=".csv, .json"
            @update:model-value="fileChoose($event)"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Upload"
            color="dark"
            text-color="white"
            :loading="isUpload"
            :disable="isUpload"
            @click="upload()"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Cancel"
            color="dark"
            text-color="white"
            @click="uploadContactsPopups(false)"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('uiNav', ['showUploadContactsDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['uploadContactsPopups']),
    ...mapActions('recipient', [
      'uploadContacts',
      'getContacts',
      'setInstitution'
    ])
  }
})
export default class UploadContactsDialog extends Vue {
  showUploadContactsDialog!: boolean;
  shouldShow = false;
  isUpload = false;
  file = '';
  contacts: any = [];
  uploadContactsPopups!: (show: boolean) => void;
  uploadContacts!: (file: File) => Promise<void>;
  setInstitution!: () => void;
  fileChoose(val: any) {
    this.contacts = val;
  }

  async upload() {
    localStorage.setItem('archieved', 'ready');
    this.isUpload = true;
    await this.uploadContacts(this.contacts);
    this.isUpload = false;
    this.setInstitution();
    this.uploadContactsPopups(false);
    this.$q.notify({
      type: 'positive',
      message: 'File Successfully Uploaded'
    });
    this.$emit('upload', 'ready')
  }
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
