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
        <template v-slot:top-left>
          <div class="row q-gutter-sm">
            <q-btn
              label="Submit Report"
              color="positive"
              rounded
              text-color="white"
              icon="upload"
              @click="uploadReports()"
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
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import IEmployee from '../interfaces/employee.interface';
import IEmployeeReport from '../interfaces/report.interface';
import IFIle201 from '../interfaces/File201.interface';
import { date } from 'quasar';

@Component({
  computed: {
    ...mapState('employee', ['employees', 'employee']),
    ...mapState('report', ['reports', 'report']),
    ...mapState('document', ['documents']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
    ...mapActions('report', ['getReports', 'addReport']),
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
      field: (row: IEmployeeReport) => row.birthdate,
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
    },
  ];

  pagination = {
    rowsPerPage: 10,
  };

  empReport: IEmployeeReport[] = [];
  data: IEmployeeReport[] = [];
  dataUp: IEmployeeReport[] = [];
  employees!: IEmployee[];
  documents!: IFIle201[];
  reports!: IEmployeeReport[];
  addReport!: (payload: any) => Promise<void>;
  getEmployees!: () => Promise<void>;
  getReports!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  fullName: any = [];
  accType: any = [];
  birthDate: any = [];
  testDate: any = [];
  report: any = [];
  dateRec: any = [];
  filter = '';

  async created() {
    await this.getAllDocuments();
    await this.getEmployees();
    await this.getReports();
    const empId = this.employees.map((d) => d.id);
    this.setReportData(empId);
    this.data = this.empReport.filter((r) => r.accountType == 'admin');
  }

  checkReport() {
    this.dateRec = this.reports.map((r) => r.dateRecorded);
    this.dateRec.forEach((d: any) => {
      var currentDate = date.formatDate(Date.now(), 'YYYY-MM-DD') as string;
      const date1 = new Date(d);
      const date2 = new Date(currentDate);
      if (date.isSameDate(date1, date2, 'day')) {
        console.log('true');
      } else {
        console.log('false');
      }
    });
  }

  setReportData(empId: any) {
    var currentDate = date.formatDate(Date.now(), 'YYYY-MM-DD') as string;
    for (let i = 0; i < empId.length; i++) {
      this.fullName[i] = this.employees
        .filter((e) => e.id == empId[i])
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
      this.birthDate[i] = this.employees
        .filter((e) => e.id == empId[i])
        .map((e) => e.birthDate);
      this.accType[i] = this.employees
        .filter((e) => e.id == empId[i])
        .map((e) => e.accountType);
      this.report[i] = this.documents.filter((d) => d.uploadedBy == empId[i]);
      this.empReport[i] = {
        fullname: this.fullName[i].toString(),
        birthdate: this.birthDate[i].toString(),
        dateRecorded: currentDate,
        accountType: this.accType[i].toString(),
        day: this.report[i].length as string,
        month: this.report[i].length as string,
        year: this.report[i].length as string,
      };
    }
  }

  async uploadReports() {
    this.$q
      .dialog({
        title: 'Are you sure you want to upload this reports?',
        message:
          'Please make sure to validate information first. All reports will be cleared.',
        ok: {
          outlined: true,
          color: 'red',
        },
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        this.$q.notify({
          type: 'positive',
          message: 'Reports Uploaded Successfully.',
        });
      });
  }
}
</script>
