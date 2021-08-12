<template>
  <q-page class="bg-secondary">
    <div class="q-pa-md">
      <q-btn
        label="Add Officer"
        color="dark"
        text-color="white"
        icon-right="person"
        dense
        style="min-width: 150px"
        class="q-mb-md"
        @click="addAccountPopups(true)"
      >
      </q-btn>

      <q-table
        title="Officers"
        :data="data"
        :columns="columns"
        row-key="name"
        virtual-scroll
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
                @click="editOfficer(props.row)"
              >
                <q-tooltip>Edit Document</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="delete"
                round
                dense
                class="q-mr-sm"
                @click="deleteContact(props.row._id)"
              >
                <q-tooltip>Delete Officer</q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <Dialog :officer="officer" @clearData="clearData" />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Dialog from 'src/components/AddOfficerDialog.vue';
import IOfficer from 'src/interfaces/officer.interface';

@Component({
  components: {
    Dialog
  },
  computed: {
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('officer', ['getOfficers', 'deleteOfficer'])
  }
})
export default class ManageAccount extends Vue {
  officer: any = {
    name: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    position: ''
  };
  pagination = {
    rowsPerPage: 10
  };
  columns = [
    {
      name: 'desc',
      required: true,
      label: 'SSN',
      align: 'left',
      field: (row: { [key: string]: string }) => row.name,
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
      name: 'contactNumber',
      align: 'left',
      label: 'Contact Number',
      field: 'contactNumber',
      sortable: true
    },
    {
      name: 'position',
      align: 'left',
      label: 'Position',
      field: 'position',
      sortable: true
    }
  ];
  data: IOfficer[] = [];
  officers!: IOfficer[];
  addAccountPopups!: (show: boolean) => void;
  getOfficers!: () => Promise<void>;
  deleteOfficer!: (payload: any) => Promise<void>;

  @Watch('officers')
  onOfficersChanged(val: any) {
    this.data = val.filter((s: any) => s.accountType == 'officer');
  }

  async created() {
    await this.getOfficers();
    this.data = this.officers.filter((s: any) => s.accountType == 'officer');
  }

  deleteContact(id: string) {
    this.$q
      .dialog({
        title: 'Are you sure you want to delete this account?',
        message: 'Please enter your password',
        prompt: {
          model: '',
          isValid: (val: any) =>
            val ==
            this.officers.find((o: any) => {
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
      .onOk(async () => {
        await this.deleteOfficer(id);
        await this.getOfficers();
        this.data = this.officers.filter((s: any) => s.accountType == 'officer');
        this.$q.notify({
          
          type: 'positive',
          message: 'Account Deleted Successfully.'
        });
      });
  }

  clearData(val: IOfficer) {
    this.officer = val;
  }

  editOfficer(officer: IOfficer) {
    this.officer = { ...officer, onUpdate: true };
    this.addAccountPopups(true);
  }
}
</script>
