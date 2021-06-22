<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-btn
        label="Add document"
        color="dark"
        text-color="white"
        icon-right="note_add"
        dense
        style="min-width: 150px"
        class="q-mb-md"
        @click="docsPopup(true)"
      ></q-btn>
      <q-table title="Documents" :columns="columns" row-key="name"> </q-table>
    </div>
    <addDocsDialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import addDocsDialog from 'components/addDocsDialog.vue';

@Component({
  components: {
    addDocsDialog
  },
  methods: {
    ...mapActions('uiNav', ['docsPopup'])
  }
})
export default class ManageDocument extends Vue {
  columns = [
    {
      name: 'doc',
      label: 'Document No.',
      align: 'left'
    },
    {
      name: 'file',
      label: 'File',
      align: 'left',
      field: 'file'
    },
    {
      name: 'type',
      label: 'Document Type',
      align: 'left',
      field: 'type'
    },
    {
      name: 'status',
      label: 'Status',
      align: 'left',
      field: 'status'
    }
  ];
  docsPopup!: (addDoc: boolean) => void;
}
</script>
