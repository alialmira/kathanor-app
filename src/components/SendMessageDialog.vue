<template>
  <q-dialog v-model="showSendMessageDialog" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center">
          Send Message</q-toolbar-title
        ></q-toolbar
      >
      <q-card-section>
        <q-input
          maxlength="160"
          v-model="message"
          filled
          type="textarea"
          counter
        ></q-input>
        <template class="q-py-md">
          <div>
            <q-select
              v-model="selectFilter"
              label="Select Recipients"
              outlined
              dense
              clearable
              clear-icon
              style="min-width: 150px"
            />
          </div>
        </template>
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            color="green"
            label="Send Message"
            @click="sendMessage"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            color="red"
            label="Cancel"
            @click="sendMessagePopups(false)"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('uiNav', ['showSendMessageDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['sendMessagePopups'])
  }
})
export default class messageDialog extends Vue {
  message = '';
  showSendMessageDialog!: boolean;
  sendMessagePopups!: (show: boolean) => void;

  sendMessage() {
    console.log(this.message);
  }
}
</script>
