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
        class="my-sticky-dynamic text-black"
        title="Officers"
        :data="data"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :pagination.sync="pagination"
        :rows-per-page-options="[0]"
        style="height: 80vh"
      >
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
                icon="archive"
                round
                dense
                class="q-mr-sm"              
              >
                <q-tooltip>Archive Officer</q-tooltip>
              </q-btn>              
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <Dialog />
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Dialog from 'src/components/AddOfficerDialog.vue';

@Component({
  components: {
    Dialog
  },
  computed: {
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('officer', ['getOfficers'])
  }
})
export default class ManageAccount extends Vue {
  pagination = {
    rowsPerPage: 0
  };
  officers!: { [key: string]: string }[];
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
    }
  ];
  data: { [key: string]: string }[] = [];
  addAccountPopups!: (show: boolean) => void;
  getOfficers!: () => Promise<void>;

  async created() {
    await this.getOfficers();
    this.data = this.officers;
  }
}
</script>

<style lang="sass" scoped>
.my-sticky-dynamic
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #d2b50d

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
