<template>
  <q-dialog v-model="showUploadContactsDialog" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar> <img src="~assets/icons8-add-document-48.png"/></q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Import File for Contacts</q-toolbar-title
        >
      </q-toolbar>
      <q-card-sections class="q-gutter-y-md">
        <div class="q-pa-md">
          <q-file
            v-model="files"
            label="Choose Files"
            filled
            multiple
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </q-card-sections>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Upload"
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
    ...mapActions('uiNav', ['uploadContactsPopups'])
  }
})
export default class UploadContactsDialog extends Vue {
  showUploadContactsDialog!: boolean;
  shouldShow = false;
  uploadContactsPopups!: (show: boolean) => void;
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
