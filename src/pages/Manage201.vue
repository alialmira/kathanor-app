<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pt-xs q-pr-md q-pb-sm">
        <q-label class="text-h5 text-weight-medium">201 Files</q-label>
      </div>
      <q-table
      class="card-border"
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
              label="Add 201-File"
              color="positive"
              rounded
              text-color="white"
              icon="add"
              to="/add-201"
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
              >
                <q-tooltip>Show 201-File</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="green"
                icon="edit"
                round
                dense
                class="q-mr-sm"
              >
                <q-tooltip>Edit 201-File</q-tooltip>
              </q-btn>
              <q-btn
                size="sm"
                color="red"
                icon="delete"
                round
                dense
                class="q-mr-sm"
              >
              </q-btn>
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
import AddDocument from 'src/components/addFile201.vue';
import ShowDocument from 'src/components/ShowDocument.vue';
import IDocument from 'src/interfaces/document.interface';

@Component({})
export default class ManageAccounts extends Vue {
  columns = [
    {
      name: 'firstName',
      align: 'left',
      label: 'First Name',
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
      name: 'lastName',
      align: 'left',
      label: 'Last Name',
      field: '',
      sortable: true,
    },
    {
      name: 'extName',
      align: 'left',
      label: 'Extension Name',
      field: '',
      sortable: true,
    },

    {
      name: 'birthDate',
      align: 'left',
      label: 'Birth Date',
      field: '',
      sortable: true,
    },

    {
      name: 'agency',
      align: 'left',
      label: 'Agency',
      field: '',
      sortable: true,
    },
  ];
}
</script>
