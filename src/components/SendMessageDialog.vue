<template>
  <q-dialog v-model="showSendMessageDialog" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
      <q-avatar>
          <img src="~assets/baseline_send_to_mobile_black_24dp.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center" >
          Send Message</q-toolbar-title
        ></q-toolbar
      >
      <q-card-section>
        <q-input
          ref="message"
          maxlength="160"
          v-model="smss.message"
          filled
          type="textarea"
          counter
          lazy-rules
          :rules="[val => val.length >= 11 || 'Field is required']"
        ></q-input>
        <template class="q-py-md">
          <div>
            <q-input
              ref="phoneNumber"
              v-model="smss.phoneNumber"
              filled
              label="Contact Number"
              lazy-rules
              :rules="[
                val => val.length >= 11 || 'Contact Number must be 11 digit'
              ]"
            />
          </div>
          <div>
            <q-select
              v-model="selectFilter"
              :options="filterOptions"
              label="Select Recipients by Status"
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
            @click="sendMessage()"
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

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showSendMessageDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['sendMessagePopups']),
    ...mapActions('sms', ['sendSms'])
  }
})
export default class SendMessageDialog extends Vue {
  smss = {
    message: '',
    phoneNumber: ''
  };
  $refs!: {
    message: RefsVue;
    phoneNumber: RefsVue;
  };
  selectFilter = '';
  showSendMessageDialog!: boolean;
  formHasError!: boolean;
  isSubmit = false;
  isUpload = false;
  filterOptions: string[] = [];
  sendMessagePopups!: (show: boolean) => void;
  sendSms!: (payload: any) => Promise<void>;

  async sendMessage() {
    this.isSubmit = true;
    this.$refs.message.validate();
    this.$refs.phoneNumber.validate();
    if (this.$refs.message.hasError || this.$refs.phoneNumber.hasError) {
      this.formHasError = true;
    } else {
      await this.sendSms(this.smss);
      await this.$store.dispatch('uiNav/sendMessagePopups', false);
      this.smss = { message: '', phoneNumber: '' };
    }
  }
  
}
</script>
