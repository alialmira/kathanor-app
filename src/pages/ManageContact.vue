<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-btn
        label="Import Data"
        color="dark"
        text-color="white"
        icon-right="upload"
        dense
        style="min-width: 150px"
        class="q-mb-md"
        @click="uploadContactsPopups(true)"
      >
      </q-btn>
      <q-table
        title="Contacts"
        :data="data"
        :columns="columns"
        :filter="searchFilter"
        row-key="contact"
      >
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
              <q-btn size="sm" color="green" icon="edit" round dense />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-right>
          <div class="row q-col-gutter-x-md">
            <div class="col-6">
              <q-select
                v-model="selectFilter"
                :options="filterOptions"
                label="Offices/Colleges"
                outlined
                dense
                clearable
                clear-icon
                style="min-width: 150px"
                @input="selectedCollege($event)"
              />
            </div>
            <div class="col-6">
              <q-input
                dense
                debounce="300"
                v-model="searchFilter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>
      </q-table>
    </div>
    <UploadContactsDialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import UploadContactsDialog from 'src/components/UploadContactsDialog.vue';
import IRecipient from 'src/interfaces/recipient.interface';

@Component({
  components: {
    UploadContactsDialog
  },
  computed: mapState('recipient', [
    'recipients',
    'newRecipients',
    'institution'
  ]),
  methods: {
    ...mapActions('recipient', [
      'setInstitution',
      'getContacts',
      'filterInstitution'
    ]),
    ...mapActions('uiNav', ['uploadContactsPopups'])
  }
})
export default class ManageContact extends Vue {
  recipients!: IRecipient[];
  newRecipients!: IRecipient[];
  institution!: string[];
  searchFilter = '';
  selectFilter = '';
  filterOptions: string[] = [];
  setInstitution!: () => void;
  uploadContactsPopups!: (show: boolean) => void;
  getContacts!: () => Promise<any[]>;
  filterInstitution!: (payload: string) => Promise<void>;
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'Contact No.',
      align: 'left',
      field: (row: IRecipient) => row.contact,
      sortable: true
    },
    {
      name: 'firstName',
      align: 'left',
      label: 'First Name',
      field: 'firstName',
      sortable: true
    },
    {
      name: 'lastName',
      align: 'left',
      label: 'Last Name',
      field: 'lastName',
      sortable: true
    },
    {
      name: 'status',
      align: 'left',
      label: 'Status',
      field: 'status',
      sortable: true
    },
    {
      name: 'institution',
      align: 'left',
      label: 'Office / College',
      field: 'institution',
      sortable: true
    }
  ];
  data: IRecipient[] = [];

  async mounted() {
    await this.getContacts();
    this.setInstitution();
    this.data = this.recipients;
    this.filterOptions = this.institution;
  }

  async selectedCollege(institution: string) {
    await this.filterInstitution(institution);
    this.data = this.newRecipients;
  }
}
</script>
