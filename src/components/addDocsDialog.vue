<template>
  <q-dialog v-model="addDoc" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar> <img src="~assets/icons8-add-document-48.png"/></q-avatar>
        <q-toolbar-title class="text-weight-bold text-center">Add Document</q-toolbar-title>
        <q-btn color="dark" icon="close" size="md" @click="docsPopup(false)">
        </q-btn>
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
        <q-input></q-input>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('uiNav', ['addDoc'])
  },
  methods: {
    ...mapActions('uiNav', ['docsPopup'])
  }
})
export default class addDocsDialog extends Vue {
  addDoc!: boolean;
  sshouldShow = false;
  docsPopup!: (show: boolean) => void;

  created() {
    this.sshouldShow = this.addDoc;
  }
}
</script>

<style>
.__card {
  width: 500px;
}
</style>
