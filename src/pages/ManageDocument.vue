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
        @click="addDocsPopups(true)"
      ></q-btn>
      <q-table
        class="my-sticky-dynamic text-black"
        title="Documents"
        :columns="columns"
        :data="data"
        row-key="name"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        style="height: 80vh"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              class="text-black"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th auto-width class="text-black">Action</q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                size="sm"
                color="green"
                icon="edit"
                round
                dense
                class="q-mr-sm"
              >
                <q-tooltip>Edit Document</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="preview"
                round
                dense
                class="q-mr-sm"
                @click="viewDocument(props.row)"
              >
                <q-tooltip>View Document</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="message"
                round
                dense
                class="q-mr-sm"
                @click="sendMessagePopups(true)"
              >
                <q-tooltip>SMS Status</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <AddDocsDialog />
    <SendMessageDialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import AddDocsDialog from 'src/components/AddDocsDialog.vue';
import SendMessageDialog from 'src/components/SendMessageDialog.vue';
import IDocument from 'src/interfaces/document.interface';

@Component({
  components: {
    AddDocsDialog,
    SendMessageDialog
  },
  computed: {
    ...mapState('document', ['documents'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups', 'sendMessagePopups']),
    ...mapActions('document', ['getDocuments'])
  }
})
export default class ManageDocument extends Vue {
  pagination = {
    rowsPerPage: 0
  };
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'ID Number',
      align: 'left',
      field: (row: IDocument) => row.name,
      sortable: true
    },
    {
      name: 'subject',
      align: 'left',
      label: 'Subject',
      field: 'subject',
      sortable: 'true'
    },
    {
      name: 'docType',
      align: 'left',
      label: 'Document Type',
      field: 'docType',
      sortable: true
    },
    {
      name: 'date',
      align: 'left',
      label: 'Date Posted',
      field: 'date',
      sortable: true
    }
  ];
  data: IDocument[] = [];
  documents!: IDocument[];
  addDocsPopups!: (show: boolean) => void;
  sendMessagePopups!: (show: boolean) => void;
  getDocuments!: () => Promise<void>;

  async created() {
    await this.getDocuments();
    this.data = this.documents;
  }

  viewDocument(payload: any) {
    console.log(payload.contentType, payload.file);
    const linkSource = 'data:' + payload.contentType + ';base64' + payload.file;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = 'test.txt';
    downloadLink.click();
  }
}
</script>

<style lang="sass" scoped>
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #d2b50d

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
