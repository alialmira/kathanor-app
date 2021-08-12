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
          :rules="[val => val.length >= 1 || 'Field is required']"
        ></q-input>
        <template class="q-py-md">
          <div>
            <q-select
              ref="phoneNumber"
              v-model="selectFilter"
              :options="filterOptions"
              label="Select Recipients by Status"
              outlined
              dense
              clearable
              filled
              lazy-rules
              :rules="[val => !!val || 'Field is required']"
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
            :loading="isSubmit"
            :disable="isSubmit"
            @click="sendMessage()"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            color="red"
            label="Cancel"
            :disable="isSubmit"
            @click="sendMessagePopups(false)"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import IRecipient from 'src/interfaces/recipient.interface';
import IDocument from 'src/interfaces/document.interface';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { Message } from 'src/services/rest-api';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showSendMessageDialog']),
    ...mapState('recipient', ['recipients', 'newRecipients', 'personStatus']),
    ...mapState('document', ['smsStatus'])
  },
  methods: {
    ...mapActions('uiNav', ['sendMessagePopups']),
    ...mapActions('sms', ['sendSms']),
    ...mapActions('recipient', ['setStatus', 'getContacts', 'filterStatus']),
    ...mapActions('document', ['updateDocument', 'getDocuments']),
    ...mapActions('message', ['addMessage'])
  }
})
export default class SendMessageDialog extends Vue {
  @Prop({ type: Object, required: true }) readonly document!: IDocument;
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
  payload: IDocument[] = [];
  updateDocument!: (payload: any) => Promise<void>;
  getDocuments!: () => Promise<void>;
  sendMessagePopups!: (show: boolean) => void;
  sendSms!: (payload: any) => Promise<void>;
  setStatus!: () => void;
  getContacts!: () => Promise<any[]>;
  filterStatus!: (payload: string) => Promise<void>;
  addMessage!: (payload: Message) => Promise<void>;

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
    this.$refs.phoneNumber.validate();
    if (
      this.$refs.message.hasError ||
      this.$refs.phoneNumber.hasError ||
      !navigator.onLine
    ) {
      this.formHasError = true;
      this.isSubmit = false;
      this.sendMessagePopups(false);
      this.$q.notify({
        
        type: 'negative',
        message: 'No Internet Connection.'
      });
    } else {
      this.data.map(async (d: IRecipient) => {
        const newSms = {
          ...this.smss,
          message: `(Message from MSU-OIPP, ${this.document.docType}-${this.document.date}) - ${this.smss.message}`, //
          phoneNumber: '+63' + d.contact
        };
        await this.sendSms(newSms);
        await this.addMessage({
          ...newSms,
          recipient: newSms.phoneNumber,
          subject: this.document.subject,
          date: this.document.date,
          message: newSms.message
        });
      });
      const smsStatus = {
        ...this.document,
        smsStatus: true
      };
      await this.updateDocument(smsStatus);
      await this.getDocuments();
      this.isSubmit = false;
      this.smss = { message: '', phoneNumber: '' };
      this.selectFilter = '';
      this.sendMessagePopups(false);
      this.$q.notify({
        
        type: 'positive',
        message: 'Message Sent Successfully.'
      });
    }
  }
}
</script>
