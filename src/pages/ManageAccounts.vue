<template>
  <q-page>
    <div class="q-pa-md">
      <div>
        <q-label class="text-h4 text-weight-medium">CSC - EMPLOYEE</q-label>
      </div>
      <q-table
        style="border-radius: 15px;"
        :data="newFiltered"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :filter="filter"
        :pagination.sync="pagination"
        >
        <template v-slot:top-left>
          <div class="row q-gutter-sm">
            <q-btn
              label="Add Account"
              color="dark"
              rounded
              outline
              text-color="black"
              icon="add"
              dense
              @click="addAccountPopups(true)"
            >
            </q-btn>
            <q-btn
              label="Add Employee"
              color="dark"
              rounded
              outline
              text-color="black"
              icon="add"
              dense
              to="/add-employee"
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
                color="blue"
                icon="info"
                round
                dense
                class="q-mr-sm"
                @click="showEmployee(props.row)"
              >
                <q-tooltip>Show Employee</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="edit"
                round
                dense
                class="q-mr-sm"
                @click="editEmployee(props.row)"
              >
                <q-tooltip>Edit Employee</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="red"
                icon="delete"
                round
                dense
                class="q-mr-sm"
                @click="deleteLastName(props.row.id)"
              >
                <q-tooltip>Delete Employee</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <AddAccount :employee="employee" @clearData="clearData" />
    <ShowAccount :employee="employee" @clearData="clearData" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import AddAccount from 'src/components/AddAccount.vue';
import ShowAccount from 'src/components/ShowAccount.vue';
import IEmployee from 'src/interfaces/employee.interface';

@Component({
  components: {
    AddAccount,
    ShowAccount,
  },
  computed: {
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups', 'showEmployeeInfoPopups']),
    ...mapActions('employee', ['getEmployees', 'deleteEmployee']),
  },
})
export default class ManageAccounts extends Vue {
  employee: any = {
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    homeAddress: '',
    currentAddress: '',
    contNumber: '',
    emailAdd: '',
    agency: 'Civil Service Commission - LDS',
    position: '',
    username: '',
    password: '',
    session: false,
  };
  pagination = {
    rowsPerPage: 10,
  };
  columns = [
    {
      name: 'firstName',
      align: 'left',
      label: 'First Name',
      field: 'firstName',
      sortable: true,
    },
    {
      name: 'middleName',
      align: 'left',
      label: 'Middle Name',
      field: 'middleName',
      sortable: true,
    },
    {
      name: 'lastName',
      align: 'left',
      label: 'Last Name',
      field: 'lastName',
      sortable: true,
    },
    {
      name: 'Agency',
      align: 'left',
      label: 'Agency',
      field: 'agency',
      sortable: true,
    },
  ];
  filter = '';
  data: IEmployee[] = [];
  newFiltered: IEmployee[] = [];
  employees!: IEmployee[];
  newEmployee!: IEmployee[];
  addAccountPopups!: (show: boolean) => void;
  showEmployeeInfoPopups!: (show: boolean) => void;
  getEmployees!: () => Promise<void>;
  deleteEmployee!: (payload: any) => Promise<void>;

  async created() {
    await this.getEmployees();
    this.data = this.employees;
    this.newFiltered = this.data.filter(
      (d: any) => d.agency == 'Civil Service Commission - LDS'
    );
  }

  @Watch('employees')
  onEmployeesChanged(val: any) {
    this.data = val;
  }

  editEmployee(employee: IEmployee) {
    this.employee = { ...employee, onUpdate: true };
    this.addAccountPopups(true);
  }

  showEmployee(employee: IEmployee) {
    this.employee = { ...employee, onUpdate: true };
    this.showEmployeeInfoPopups(true);
  }

  deleteLastName(id: string) {
    this.$q
      .dialog({
        title: 'Are you sure you want to delete this account?',
        message: 'Please make sure to validate information first.',
        ok: {
          outlined: true,
          color: 'red',
        },
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteEmployee(id);
        await this.getEmployees();
        this.$q.notify({
          type: 'positive',
          message: 'Account Deleted Successfully.',
        });
      });
  }

  clearData(val: IEmployee) {
    this.employee = val;
  }

  sendMessage(employee: IEmployee) {
    this.employee = document;
  }
}
</script>

<style scoped></style>
