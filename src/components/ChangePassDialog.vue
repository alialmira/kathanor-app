<template>
  <q-dialog v-model="isShoww" persistent>
    <q-card class="__card">
      <q-toolbar-title>Change Password</q-toolbar-title>
      <q-card-section></q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
    computed: {
    ...mapState('uiNav', ['isShoww'])
  },
    methods: {
    ...mapActions('uiNav', ['dialogPopups'])
  }
})

export default class ChangePassDialog extends Vue {
    isShoww!: boolean;
    shouldShoww = false;
    dialogPopups!: (show: boolean) => void;

  created() {
    this.shouldShoww = this.isShoww;
  }
  }
</script>

<style scoped>
.__card {
  width: 350px;
}
</style>
