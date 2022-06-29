<template>
  <q-page class="bg-white">
    <div class="q-pa-md">
      <q-table
        title="Individual Report"
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
              icon-right="post_add"
              dense
              style="min-width: 50px"
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class ManageIndividualReport extends Vue {}
</script>
