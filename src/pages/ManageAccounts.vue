<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pt-xs q-pr-md q-pb-sm">
        <q-label class="text-h5 text-weight-medium"
          >Employees</q-label
        >
      </div>
      <q-table
        class="card-border"
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
              label="Add Employee"
              color="positive"
              rounded
              text-color="white"
              icon="add"
              @click="addAccountPopups(true)"
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
    extensionName: '',
    birthDate: '',
    homeAddress: '',
    currentAddress: '',
    contNumber: '',
    emailAdd: '',
    agency: '',
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
      name: 'extensionName',
      align: 'left',
      label: 'Extension Name',
      field: 'extensionName',
      sortable: true,
    },

    {
      name: 'position',
      align: 'left',
      label: 'Position',
      field: 'position',
      sortable: true,
    },

    {
      name: 'agency',
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
