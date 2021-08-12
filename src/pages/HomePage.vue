<template>
  <q-page padding class="__card2">
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="col-md-3 col-sm-12 col-xs-12"
          >
            <q-item
              :style="`background-color: ${item.color1}`"
              class="q-pa-none"
              :to="item.route"
            >
              <q-item-section
                v-if="icon_position === 'left'"
                side
                :style="`background-color: ${item.color2}`"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon :name="item.icon" color="white" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{
                  item.value
                }}</q-item-label>
                <q-item-label>{{ item.title }}</q-item-label>
              </q-item-section>
              <q-item-section
                v-if="icon_position === 'right'"
                side
                class="q-mr-md text-white"
              >
                <q-icon :name="item.icon" color="white" size="44px"></q-icon>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import IDocument from 'src/interfaces/document.interface';
import IMessage from 'src/interfaces/message.interface';
import IOfficer from 'src/interfaces/officer.interface';
import IRecipient from 'src/interfaces/recipient.interface';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

@Component({
  computed: {
    ...mapState('officer', ['officers']),
    ...mapState('document', ['documents']),
    ...mapState('recipient', ['recipients']),
    ...mapState('message', ['messages'])
  },
  methods: {
    ...mapActions('officer', ['getOfficers']),
    ...mapActions('document', ['getDocuments']),
    ...mapActions('recipient', ['getContacts']),
    ...mapActions('message', ['GetMessages'])
  }
})
export default class HomePage extends Vue {
  @Prop({ type: String, required: false, default: 'left' })
  readonly icon_position!: string;

  officersArr: IOfficer[] = [];
  officers!: IOfficer[];
  getOfficers!: () => Promise<void>;
  documentsArr: IDocument[] = [];
  documents!: IDocument[];
  getDocuments!: () => Promise<void>;
  recipientsArr: IRecipient[] = [];
  recipients!: IRecipient[];
  getContacts!: () => Promise<void>;
  messagesArry: IMessage[] = [];
  messages!: IMessage[];
  GetMessages!: () => Promise<void>;

  async created() {
    await this.getOfficers();
    this.officersArr = this.officers.filter(
      (s: any) => s.accountType == 'officer'
    );
    await this.getDocuments();
    this.documentsArr = this.documents;
    await this.getContacts();
    this.recipientsArr = this.recipients;
    await this.GetMessages();
    this.messagesArry = this.messages;
  }

  get items() {
    return this.icon_position === 'left'
      ? [
          {
            title: 'Accounts',
            icon: 'person',
            value: this.officersArr.length,
            color1: '#5064b5',
            color2: '#3e51b5',
            route: '/ManageAccount'
          },
          {
            title: 'Documents',
            icon: 'assignment',
            value: this.documentsArr.length,
            color1: '#f37169',
            color2: '#f34636',
            route: '/ManageDocument'
          },
          {
            title: 'Receipients',
            icon: 'contact_mail',
            value: this.recipientsArr.length,
            color1: '#ea6a7f',
            color2: '#ea4b64',
            route: '/ManageContact'
          },
          {
            title: 'Messages',
            icon: 'question_answer',
            value: this.messagesArry.length,
            color1: '#a270b1',
            color2: '#9f52b1',
            route: '/ManageContact'
          }
        ]
      : [
          {
            title: 'Monthly Income',
            icon: 'fas fa-dollar-sign',
            value: '$ 20k',
            color1: '#546bfa',
            color2: '#3e51b5'
          },
          {
            title: 'Weekly Sales',
            icon: 'fas fa-chart-bar',
            value: '20',
            color1: '#3a9688',
            color2: '#3e51b5'
          },
          {
            title: 'New Customers',
            icon: 'fas fa-chart-line',
            value: '321',
            color1: '#7cb342',
            color2: '#3e51b5'
          },
          {
            title: 'Active Users',
            icon: 'person',
            value: '82',
            color1: '#f88c2b',
            color2: '#3e51b5'
          }
        ];
  }

 
}
</script>

<style lang="scss" scoped>
.q-item {
  height: 60px;
}
.mycard {
  height: 350px;
}
.mycards {
  height: 350px;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: center;
  position: fixed;
  right: -5%;
  top: 90%;
  transform: translate(-50%, -50%);
  color: #c0d407;
  text-shadow: 0 0 5px rgb(230, 231, 225), 0 0 20px rgba(10, 175, 230, 0);
  .time {
    letter-spacing: 0.05em;
    font-size: 40px;
    padding: 0px;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 20px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
}
.__card2 {
  background-image: url('~assets/LoginPic5.jpg');
}
</style>
