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
      <q-table title="Documents" :columns="columns" :data="data" row-key="name">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width>Action</q-th>
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

@Component({
  components: {
    AddDocsDialog,
    SendMessageDialog
  },
  computed: {
    ...mapState('document', ['documents'])
  },
  methods: {
    ...mapActions('uiNav', ['addDocsPopups'])
  }
})
export default class ManageDocument extends Vue {
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'ID Number',
      align: 'left',
      field: (row: { [key: string]: string }) => row.name,
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
  data: { [key: string]: string }[] = [];
  documents!: { [key: string]: string }[];
  addDocsPopups!: (show: boolean) => void;

  created() {
    this.data = this.documents;
  }
}
</script>
