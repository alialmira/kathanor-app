<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pt-xs q-pr-md q-pb-sm">
        <q-label class="text-h5 text-weight-medium"
          >Civil Service Commission - LDS Report</q-label
        >
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
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props"> </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import IEmployee from '../interfaces/employee.interface';
import IFIle201 from '../interfaces/File201.interface';

interface IEmployeeReport {
  fullname: string;
  birthDate: string;
  day: string;
  month: string;
  year: string;
}

@Component({
  computed: {
    ...mapState('employee', ['employees', 'employee']),
    ...mapState('document', ['documents']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
    ...mapActions('document', ['getAllDocuments']),
  },
})
export default class ManageReport extends Vue {
  columns = [
    {
      name: 'fullname',
      align: 'left',
      label: 'Employee',
      field: (row: IEmployeeReport) => row.fullname,
      sortable: true,
    },
    {
      name: 'birthDate',
      align: 'left',
      label: 'Birth Date',
      field: (row: IEmployeeReport) => row.birthDate,
      sortable: true,
    },
    {
      name: 'day',
      align: 'left',
      label: 'Day',
      field: (row: IEmployeeReport) => row.day,
      sortable: true,
    },
    {
      name: 'month',
      align: 'left',
      label: 'Month',
      field: (row: IEmployeeReport) => row.month,
      sortable: true,
    },
    {
      name: 'year',
      align: 'left',
      label: 'Year',
      field: (row: IEmployeeReport) => row.year,
      sortable: true,
    }
  ];

  pagination = {
    rowsPerPage: 10,
  };

  empReport: IEmployeeReport[] = [];
  data: IEmployeeReport[] = [];
  employees!: IEmployee[];
  documents!: IFIle201[];
  getEmployees!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  fullName: any = [];
  birthDate: any = [];
  filter = '';

  async created() {
    await this.getAllDocuments();
    await this.getEmployees();
    const empId = this.documents.map((d) => d.uploadedBy);
    const res = this.setReportDetails(empId);
    this.data = this.empReport;
    console.log('result: ', this.data);
  }

  setReportDetails(empId: any) {
    for (let index = 0; index < empId.length; index++) {
      this.fullName[index] = this.employees
        .filter((e) => e.id == empId[index] && e.accountType == 'admin')
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
          .filter((e) => e.id == empId[index] && e.accountType == 'admin')
          .map((e) => e.birthDate);
      }
      this.empReport[index] = {
        fullname: this.fullName[index].toString(),
        birthDate: this.birthDate[index].toString(),
        day: '',
        month: '',
        year: '',
      };
    }
    return this.empReport;
  }
}
</script>
