<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pt-xs q-pr-md q-pb-sm">
        <q-label class="text-h5 text-weight-medium">201 Files</q-label>
      </div>
      <q-table
        class="card-border"
        style="border-radius: 15px;"
        :data="data"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-left>
          <div class="row q-gutter-sm">
            <!-- <q-btn
              label="Add 201-File"
              color="positive"
              rounded
              text-color="white"
              icon="add"
              to="/add-201"
            >
            </q-btn> -->
            <q-btn
              label="Add 201-File"
              color="positive"
              rounded
              text-color="white"
              icon="add"
              @click="add201FilePopups(true)"
            >
            </q-btn>
          </div>
        </template>
        <template v-slot:top-right>
          <div class="row q-gutter-sm">
            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
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
                icon="info"
                round
                dense
                class="q-mr-sm"
                @click="showEmployeeDocs(props.row)"
              >
                <q-tooltip>Show 201-File</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <Add201File />
      <ShowDocument :document="newDocument" @clearData="clearData" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import Add201File from 'src/components/Add201File.vue';
import ShowDocument from 'src/components/showDocument.vue';
import IFIle201 from 'src/interfaces/File201.interface';
import IEmployee from '../interfaces/employee.interface';
import { Promise } from 'q';

interface IEmployeeFile {
  firstName: string;
  lastName: string;
  middleName: string;
  bdate: string;
  tor: string;
  pds: string;
  scard: string;
  eligibility: string;
  appointment: string;
}

@Component({
  components: {
    Add201File,
    ShowDocument,
  },
  computed: {
    ...mapState('document', ['documents']),
    ...mapState('employee', ['employee', 'employees']),
  },
  methods: {
    ...mapActions('uiNav', ['add201FilePopups', 'showEmployeeDocsPopups']),
    ...mapActions('document', ['getAllDocuments']),
    ...mapActions('employee', ['getEmployees', 'getEmployeeById']),
  },
})
export default class ManageAccounts extends Vue {
  // columns = [
  //   {
  //     name: 'firstName',
  //     align: 'left',
  //     label: 'First Name',
  //     field: '',
  //     sortable: true,
  //   },
  //   {
  //     name: 'middleName',
  //     align: 'left',
  //     label: 'Middle Name',
  //     field: '',
  //     sortable: true,
  //   },
  //   {
  //     name: 'lastName',
  //     align: 'left',
  //     label: 'Last Name',
  //     field: '',
  //     sortable: true,
  //   },
  //   {
  //     name: 'extName',
  //     align: 'left',
  //     label: 'Extension Name',
  //     field: '',
  //     sortable: true,
  //   },

  //   {
  //     name: 'birthDate',
  //     align: 'left',
  //     label: 'Birth Date',
  //     field: '',
  //     sortable: true,
  //   },

  //   {
  //     name: 'agency',
  //     align: 'left',
  //     label: 'Agency',
  //     field: '',
  //     sortable: true,
  //   },
  // ];

  filter = '';
  pagination = {
    rowsPerPage: 10,
  };
  columns = [
    {
      name: 'employeeId',
      align: 'left',
      label: 'Employee ID',
      field: 'employeeId',
      sortable: true,
    },
    {
      name: 'filename',
      align: 'left',
      label: 'File Name',
      field: 'filename',
      sortable: true,
    },
    {
      name: 'docType',
      align: 'left',
      label: 'Document Type',
      field: 'docType',
      sortable: true,
    },

    {
      name: 'mimeType',
      align: 'left',
      label: 'Format',
      field: 'mimeType',
      sortable: true,
    },
  ];

  newDocument: any = {
    uploadedBy: '',
    employeeId: '',
    filename: '',
    docType: '',
    mimeType: '',
    onUpdate: false,
  };

  dataFile!: IEmployeeFile;
  documents!: IFIle201[];
  employees!: IEmployee[];
  employee!: IEmployee;
  getEmployees!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  add201FilePopups!: (show: boolean) => void;
  showEmployeeDocsPopups!: (show: boolean) => void;
  data: any = ([] = []);

  async created() {
    await this.getAllDocuments();
    await this.getEmployees();
    this.data = this.documents;
  }

  showEmployeeDocs(document: IFIle201) {
    this.newDocument = { ...document, onUpdate: true };
    this.showEmployeeDocsPopups(true);
  }

  clearData(val: IFIle201) {
    this.newDocument = val;
  }
}
</script>
