<template>
  <q-page class="bg-white">
    <div class="q-pa-md">
      <q-table
        style="border-radius: 25px;"
        title="201 - Files"
        :data="data"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :pagination.sync="pagination"
      >
        <template v-slot:top-right>
          <div class="row q-gutter-sm">
            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              label=""
              color="dark"
              rounded
              outline
              text-color="black"
              icon-right="person_add"
              dense
              style="min-width: 50px;"
              @click="addEmployeePopups(true)"
            >
            </q-btn>
            <q-btn
              label=""
              color="dark"
              rounded
              outline
              text-color="black"
              icon-right="post_add"
              @click="add201FilePopups(true)"
              dense
              style="min-width: 50px;"
            >
            </q-btn>
          </div>
        </template>
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
      <Add201File />
      <AddEmployee />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Add201File from 'src/components/Add201File.vue';
import AddEmployee from '../components/AddEmployee.vue';

@Component({
  components: {
    Add201File,
    AddEmployee,
  },
  computed: {},
  methods: {
    ...mapActions('uiNav', ['add201FilePopups', 'addEmployeePopups']),
  },
})
export default class Manage201Files extends Vue {
  pagination = {
    rowsPerPage: 9,
  };
  searchFilter = '';
  selectFilter = '';
  add201FilePopups!: (show: boolean) => void;
  addEmployeePopups!: (show: boolean) => void;
}
</script>
