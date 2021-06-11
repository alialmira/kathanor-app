<template>
    <q-page class="bg-brown-1">
       <div class="q-pa-md">
       <q-table
        title="Officers"
        :data="data"
        :columns="columns"
        :filter="searchFilter"
        row-key="name"
      >
       </q-table>
      </div>
    </q-page>
</template>