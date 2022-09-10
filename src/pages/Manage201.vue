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
              <q-btn
                size="sm"
                color="blue"
                icon="download"
                round
                dense
                class="q-mr-sm"
                @click="downloadEmployeeDocs(props.row.file.id)"
              >
                <q-tooltip>Download 201-File</q-tooltip>
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
import ShowDocument from 'src/components/ShowDocument.vue';
import IFIle201 from 'src/interfaces/File201.interface';
import IEmployee from '../interfaces/employee.interface';

interface IEmployeeFile {
  fullname: string;
  birthDate: string;
  file: IFIle201;
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
    ...mapActions('document', ['getAllDocuments', 'downloadDocs']),
    ...mapActions('employee', ['getEmployees', 'getEmployeeById']),
  },
})
export default class ManageAccounts extends Vue {
  filter = '';
  pagination = {
  rowsPerPage: 8,
  };
  columns = [
    {
      name: 'employeeId',
      align: 'left',
      label: 'Employee',
      field: (row: IEmployeeFile) => row.fullname,
      sortable: true,
    },
    {
      name: 'birthDate',
      align: 'left',
      label: 'Birth date',
      field: (row: IEmployeeFile) => row.birthDate,
      sortable: true,
    },
    {
      name: 'docType',
      align: 'left',
      label: 'Document Type',
      field: (row: IEmployeeFile) => row.file.docType,
      sortable: true,
    },
    {
      name: 'filename',
      align: 'left',
      label: 'File Name',
      field: (row: IEmployeeFile) => row.file.filename,
      sortable: true,
    },
  ];

  newDocument: any = {
    fullname: '',
    birthDate: '',
    file: {
      id: '',
      uploadedBy: '',
      employeeId: '',
      filename: '',
      docType: '',
      mimeType: '',
      content: '',
    },
    onUpdate: false,
  };

  dataFile: IEmployeeFile[] = [];
  documents!: IFIle201[];
  employees!: IEmployee[];
  employee!: IEmployee;
  getEmployees!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  getEmployeeById!: (payload: any) => Promise<void>;
  downloadDocs!: (id: string) => Promise<void>;
  add201FilePopups!: (show: boolean) => void;
  showEmployeeDocsPopups!: (show: boolean) => void;
  data: IEmployeeFile[] = [];
  fullName: any = [];
  birthDate: any = [];
  mapVal: any;

  async created() {
    await this.getAllDocuments();
    await this.getEmployees();
    const empId = this.documents.map((d) => d.employeeId);
    this.setEmployeeDetails(empId);
    this.data = this.dataFile;
  }

  async downloadEmployeeDocs(id: string) {
    await this.downloadDocs(id);
  }

  setEmployeeDetails(empId: any) {
    for (let index = 0; index < empId.length; index++) {
      this.fullName[index] = this.employees
        .filter((e) => e.id == empId[index])
        .map(
          (e) =>
            e.firstName +
            ' ' +
            e.middleName +
            ' ' +
            e.lastName +
            ' ' +
            e.extensionName
        );
      for (let index = 0; index < empId.length; index++) {
        this.birthDate[index] = this.employees
          .filter((e) => e.id == empId[index])
          .map((e) => e.birthDate);
      }
      this.dataFile[index] = {
        fullname: this.fullName[index].toString(),
        birthDate: this.birthDate[index].toString(),
        file: this.documents[index],
      };
    }
  }

  showEmployeeDocs(document: IEmployeeFile) {
    this.newDocument = { ...document, onUpdate: true };
    this.showEmployeeDocsPopups(true);
  }

  clearData(val: IEmployeeFile) {
    this.newDocument = val;
  }
}
</script>
