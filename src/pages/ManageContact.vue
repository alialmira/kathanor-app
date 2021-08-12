<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-black bg-info"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="delivered" label="Message Logs" />
          <q-tab name="contact" label="Contacts" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="delivered">
            <q-table
              title="Logs"
              :data="logs"
              :columns="columnsms"
              row-key="date"
              :pagination.sync="pagination"
            >
              <template v-slot:header="props">
                <q-tr :props="props" class="bg-info">
                  <q-th
                    class="text-black"
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
              <template v-slot:top-right>
                <div class="q-col-gutter-x-md">
                  <div>
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
          </q-tab-panel>

          <q-tab-panel name="contact">
            <div class="row  text-center">
              <div class="col">
                <q-btn
                  label="Import Data"
                  color="green"
                  text-color="white"
                  icon-right="upload"
                  dense
                  style="min-width: 150px"
                  class="q-mb-md"
                  @click="uploadContactsPopups(true)"
                >
                </q-btn>
              </div>
              <div class="col">
                <q-btn
                  label="Archive"
                  color="warning"
                  text-color="white"
                  icon-right="archive"
                  dense
                  style="min-width: 150px"
                  class="q-mb-md"
                  :disable="this.archive == 'done' || this.archive == null || this.archive == ''"
                  @click="exportTable()"
                >
                </q-btn>
              </div>
              <div class="col">
                <q-btn
                  label="Delete ALL"
                  color="red"
                  text-color="white"
                  icon-right="delete"
                  dense
                  style="min-width: 150px"
                  class="q-mb-md"
                  :disable="this.archive == 'ready' || this.archive == null || this.archive == ''"
                  @click="deleteContacts()"
                >
                </q-btn>
              </div>
            </div>

            <q-table
              title="Contacts"
              :data="data"
              :columns="columns"
              :filter="searchFilter"
              row-key="contact"
              virtual-scroll
              :pagination.sync="pagination"
            >
              <template v-slot:header="props">
                <q-tr :props="props" class="bg-info">
                  <q-th
                    class="text-black size-md"
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                  <q-th auto-width class="text-black"></q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                  <q-td auto-width> </q-td>
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
                      @popup-show="clickSelectOption()"
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
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <UploadContactsDialog @upload="upload" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import UploadContactsDialog from 'src/components/UploadContactsDialog.vue';
import IRecipient from 'src/interfaces/recipient.interface';
import IMessage from 'src/interfaces/message.interface';
import { exportFile } from 'quasar';
import IOfficer from 'src/interfaces/officer.interface';

@Component({
  components: {
    UploadContactsDialog
  },
  computed: {
    ...mapState('recipient', ['recipients', 'newRecipients', 'institution']),
    ...mapState('message', ['messages']),
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('recipient', [
      'setInstitution',
      'getContacts',
      'filterInstitution',
      'deleteRecipients'
    ]),
    ...mapActions('message', ['GetMessages']),
    ...mapActions('uiNav', ['uploadContactsPopups']),
    ...mapActions('officer', ['getOfficers'])
  }
})
export default class ManageContact extends Vue {
  pagination = {
    rowsPerPage: 9
  };
  tab = 'delivered';
  recipients!: IRecipient[];
  messages!: IMessage[];
  newRecipients!: IRecipient[];
  institution!: string[];
  officers!: IOfficer[];
  searchFilter = '';
  selectFilter = '';
  filterOptions: string[] = [];
  setInstitution!: () => void;
  uploadContactsPopups!: (show: boolean) => void;
  getContacts!: () => Promise<any[]>;
  GetMessages!: () => Promise<any[]>;
  getOfficers!: () => Promise<any[]>;
  deleteRecipients!: () => Promise<void>;
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
  columnsms = [
    {
      name: 'desc',
      required: true,
      label: 'Date',
      align: 'left',
      field: 'date',
      sortable: true
    },
    {
      name: 'recipient',
      align: 'left',
      label: 'Recipient',
      field: 'recipient',
      sortable: true
    },
    {
      name: 'subject',
      align: 'left',
      label: 'Document Subject',
      field: 'subject',
      sortable: true
    },
    {
      name: 'message',
      align: 'left',
      label: 'Message',
      field: 'message',
      sortable: true
    }
  ];
  data: IRecipient[] = [];
  logs: IMessage[] = [];
  archive: any = null;

  async created() {
    await this.getOfficers();
    await this.getContacts();
    await this.GetMessages();
    this.setInstitution();
    this.data = this.recipients;
    this.logs = this.messages;
    this.filterOptions = this.institution;
    this.archive = localStorage.getItem('archieved');
    console.log(this.archive);
  }

  upload(val: any) {
    this.archive = val;
  }

  clickSelectOption() {
    this.setInstitution();
    this.filterOptions = this.institution;
  }

  async selectedCollege(institution: string) {
    await this.filterInstitution(institution);
    this.data = this.newRecipients;
  }

  async deleteContacts() {
    this.$q
      .dialog({
        title: 'Are you sure you want to delete all contacts?',
        message: 'Please enter your password',
        prompt: {
          model: '',
          isValid: (val: any) =>
            val ==
            this.officers.find(o => {
              return o.accountType == 'admin';
            })?.password,
          type: 'text'
        },
        ok: {
          outlined: true,
          color: 'red'
        },
        cancel: true,
        persistent: true
      })
      .onOk(async (data: any) => {
        await this.deleteRecipients();
        await this.getContacts();
        this.data = this.recipients;
        this.$q.notify({
          type: 'positive',
          message: 'Contacts Deleted Successfully.'
        });
        localStorage.removeItem('archieved');
        this.archive = '';
      });
  }

  wrapCsvValue(val: any, formatFn?: any) {
    let formatted = formatFn !== void 0 ? formatFn(val) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }

  exportTable() {
    // naive encoding to csv format
    const content = [this.columns.map(col => this.wrapCsvValue(col.label))]
      .concat(
        this.data.map((row: any) =>
          this.columns
            .map((col: any) =>
              this.wrapCsvValue(
                typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format
              )
            )
            .join(',')
        )
      )
      .join('\r\n');

    const status = exportFile('table-export.csv', content, 'text/csv');

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        type: 'negative',
        icon: 'warning'
      });
    } else {
      localStorage.setItem('archieved', 'done');
      this.archive = 'done';
    }
  }
}
</script>
