<template>
  <q-page padding>
    <div class="q-pa-md">
      <div
        :class="
          $q.screen.lt.md
            ? 'justify-center items-center text-center q-gutter-md'
            : 'row justify-center items-center text-center q-gutter-md'
        "
      >
        <q-card
          class="col bg-green card-radius text-white"
          @click="employeePage"
        >
          <q-card-section class="bg-green-8 text-h5 text-weight-bold">
            EMPLOYEES
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h2 text-weight-bolder">{{
            empNum
          }}</q-card-section>
        </q-card>
        <q-card
          @click="File201Page"
          class="col bg-orange card-radius text-white"
        >
          <q-card-section class="bg-orange-8 text-h5 text-weight-bold">
            201-FILES
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h2 text-weight-bolder">
            {{ docNum }}
          </q-card-section>
        </q-card>
        <q-card
          @click="ReportPage"
          class="col bg-yellow-8 card-radius text-white"
        >
          <q-card-section
            :class="
              $q.screen.lt.md
                ? 'bg-yellow-9 text-h6 text-weight-bold'
                : 'bg-yellow-9 text-h5 text-weight-bold'
            "
          >
            MONTHLY REPORTS
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h2 text-weight-bolder">{{
            docNum
          }}</q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md q-pt-md">
      <q-separator color="black" />
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-card class="col card-border q-pa-md">
        <q-card-section
          :class="
            $q.screen.lt.md
              ? 'text-h5 text-weight-bold'
              : 'text-h4 text-weight-bold'
          "
        >
          What is Civil Service Commission?
          <q-btn
            v-if="user.accountType == 'admin' || user.accountType == 'Admin'"
            color="positive"
            round
            outlined
            text-color="white"
            icon="edit"
            @click="editCivilServiceContent()"
          >
          </q-btn>
        </q-card-section>
        <q-separator color="white" />
        <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5'"
          >The Civil Service Commission is one of the three Constitutional
          Commissions of the Philippines with responsibility over the civil
          service. It is tasked with overseeing the integrity of government
          actions and processes.
        </q-card-section>
      </q-card>
      <q-card class="col card-border q-pa-md">
        <q-card-section
          :class="
            $q.screen.lt.md
              ? 'text-h5 text-weight-bold'
              : 'text-h4 text-weight-bold'
          "
        >
          What is 201-File?
          <q-btn
            v-if="user.accountType == 'admin' || user.accountType == 'Admin'"
            color="positive"
            round
            outlined
            text-color="white"
            icon="edit"
            @click="edit201FileContent()"
          >
          </q-btn>
        </q-card-section>
        <q-separator color="white" />
        <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5'">
          201 - files contains records/data pertaining to the employee's
          personal information, financial information, employment contract,
          duties, job grade, performance, and employment history for future
          employment requirements.</q-card-section
        >
        <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5'"
          >Interestingly, the term “201 files” originated from the Army. Form
          201 in the US Army, Which is a set of documents containing a person’s
          comprehensive profile, including all previous and new information
          necessary about the individual.</q-card-section
        >
      </q-card>
      <UpdateHomeContent :content="contentType" @clearData="clearData" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IEmployee from 'src/interfaces/employee.interface';
import UpdateHomeContent from 'src/components/UpdateHomeContent.vue';
import IContent from 'src/interfaces/content.interface';

interface file201Docs {
  id?: string;
  uploadedBy: string;
  employeeId: string;
  filename: string;
  docType: string;
  mimeType: string;
  content: string;
}

@Component({
  components: {
    UpdateHomeContent,
  },
  computed: {
    ...mapState('employee', ['employees', 'employee']),
    ...mapState('document', ['documents']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
    ...mapActions('uiNav', ['homeContentPopups']),
    ...mapActions('document', ['getAllDocuments']),
  },
})
export default class HomeUser extends Vue {
  employees!: IEmployee[];
  documents!: file201Docs[];
  isAdmin = false;
  user: any = {};
  getEmployees!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  homeContentPopups!: (show: boolean) => void;
  empNum = 0;
  docNum = 0;

  contentType: IContent = {
    type: '',
    content: '',
    onUpdate: false,
  };

  async created() {
    const res = await this.user;
    await this.getEmployees();
    await this.getAllDocuments();
    this.empNum = this.employees.length;
    this.docNum = this.documents.length;
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
  }

  @Watch('employees')
  onDocumentsChanged() {
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
    this.user = this.employees.find(
      (e) =>
        (e.session == true && e.accountType == 'admin') ||
        e.accountType == 'user'
    );
  }

  async employeePage() {
    await this.$router.push('/accounts');
  }

  async File201Page() {
    await this.$router.push('/201-files');
  }

  async ReportPage() {
    await this.$router.push('/report');
  }

  editCivilServiceContent() {
    this.contentType = {
      type: 'CSC',
      content:
        '201 - files contains records/data pertaining to the employees personal information, financial information, employment contract, duties, job grade, performance, and employment history for future employment requirements.',
      onUpdate: true,
    };
    this.homeContentPopups(true);
  }

  edit201FileContent() {
    this.contentType = {
      type: '201-file',
      content: 'Interestingly, the term “201 files” originated from the Army. Form 201 in the US Army, Which is a set of documents containing a person’s comprehensive profile, including all previous and new information necessary about the individual.',
      onUpdate: true,
    };
    this.homeContentPopups(true);
  }

  clearData(val: IContent) {
    this.contentType = val;
  }

}
</script>

<style scoped>
.card-radius {
  border-radius: 25px;
}
</style>
