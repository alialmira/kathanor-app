<template>
  <q-dialog v-model="showSendMessageDialog" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/baseline_send_to_mobile_black_24dp.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center">
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
          <!--- 
          <div>
            <q-input
              ref="phoneNumber"
              v-model="smss.phoneNumber"
              filled
              label="Contact Number"
              lazy-rules
              :rules="[val => val.length >= 11 || 'Contact Number must be 11 digit']"
            />
          </div>
          ---->
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
              @input="selectedPersonStatus($event)"
              @popup-show="clickSelectOption()"
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
import IRecipient from 'src/interfaces/recipient.interface';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showSendMessageDialog']),
    ...mapState('recipient', ['recipients', 'newRecipients', 'personStatus'])
  },
  methods: {
    ...mapActions('uiNav', ['sendMessagePopups']),
    ...mapActions('sms', ['sendSms']),
    ...mapActions('recipient', ['setStatus', 'getContacts', 'filterStatus'])
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
  newRecipients!: IRecipient[];
  recipients!: IRecipient[];
  personStatus!: string[];
  filterOptions: string[] = [];
  data: IRecipient[] = [];
  sendMessagePopups!: (show: boolean) => void;
  sendSms!: (payload: any) => Promise<void>;
  setStatus!: () => void;
  getContacts!: () => Promise<any[]>;
  filterStatus!: (payload: string) => Promise<void>;

  async created() {
    await this.getContacts();
    this.setStatus();
    this.data = this.recipients;
    this.filterOptions = this.personStatus;
  }

  clickSelectOption() {
    this.setStatus();
    this.filterOptions = this.personStatus;
  }

  async selectedPersonStatus(status: string) {
    await this.filterStatus(status);
    this.data = this.newRecipients;
  }

  async sendMessage() {
    this.isSubmit = true;
    this.$refs.message.validate();
    // this.$refs.phoneNumber.validate();
    if (this.$refs.message.hasError) {
      this.formHasError = true;
    } else {
      if (this.data instanceof Array) {
        this.data.map(async (d: IRecipient) => {
          const newSms = {
            ...this.smss,
            phoneNumber: '+63' + d.contact
          };
          await this.sendSms(newSms);
        });
        await this.$store.dispatch('uiNav/sendMessagePopups', false);
        this.smss = { message: '', phoneNumber: '' };
        this.selectFilter = 'ALL';
      }
    }
  }
}
</script>
