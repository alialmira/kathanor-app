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
        :data="newFiltered"
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
import AddAccount from 'src/components/AddAccount.vue';
import ShowAccount from 'src/components/ShowAccount.vue';
import IEmployee from 'src/interfaces/employee.interface';

@Component({})
export default class ManageAccounts extends Vue {
  columns = [
    {
      name: 'lastName',
      align: 'left',
      label: 'Last Name',
      field: '',
      sortable: true,
    },
    {
      name: 'firstName',
      align: 'left',
      label: 'Fist Name',
      field: '',
      sortable: true,
    },
    {
      name: 'middleName',
      align: 'left',
      label: 'Middle Name',
      field: '',
      sortable: true,
    },

    {
      name: 'day',
      align: 'left',
      label: 'Day',
      field: '',
      sortable: true,
    },

    {
      name: 'month',
      align: 'left',
      label: 'Month',
      field: '',
      sortable: true,
    },

    {
      name: 'year',
      align: 'left',
      label: 'Year',
      field: '',
      sortable: true,
    },
  ];
}
</script>
