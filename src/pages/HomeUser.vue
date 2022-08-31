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
            @click="editContent(cscDetails)"
          >
          </q-btn>
        </q-card-section>
        <q-separator color="white" />
        <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5'"
          >{{ cscContent }}
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
            @click="editContent(fileDetails)"
          >
          </q-btn>
        </q-card-section>
        <q-separator color="white" />
        <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5'">
          {{ fileContent }}</q-card-section
        >
      </q-card>
      <UpdateHomeContent :content="newContent" @clearData="clearData" />
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
    ...mapState('content', ['contents']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
    ...mapActions('uiNav', ['homeContentPopups']),
    ...mapActions('document', ['getAllDocuments']),
    ...mapActions('content', ['getContents']),
  },
})
export default class HomeUser extends Vue {
  isAdmin = false;
  user: any = {};
  empNum = 0;
  docNum = 0;
  cscContent = '';
  fileContent = '';
  employees!: IEmployee[];
  documents!: file201Docs[];
  contents!: IContent[];
  cscDetails!: any;
  fileDetails!: any;
  newContent: any = {
    contentType: '',
    content: '',
    onUpdate: false,
  };
  getEmployees!: () => Promise<void>;
  getContents!: () => Promise<void>;
  getAllDocuments!: () => Promise<void>;
  homeContentPopups!: (show: boolean) => void;

  async created() {
    const res = await this.user;
    await this.getEmployees();
    await this.getAllDocuments();
    await this.getContents();
    this.empNum = this.employees.length;
    this.docNum = this.documents.length;
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
    this.setDashboardContents();
    this.setDashboardDetails();
  }

  setDashboardDetails() {
    this.cscDetails = this.contents.find((c) => c.contentType == 'CSC');
    this.fileDetails = this.contents.find((c) => c.contentType == 'file201');
  }

  setDashboardContents() {
    this.cscContent = this.contents
      .filter((c) => c.contentType == 'CSC')
      .map((c) => c.content)
      .toString();

    this.fileContent = this.contents
      .filter((c) => c.contentType == 'file201')
      .map((c) => c.content)
      .toString();
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

  editContent(content: IContent) {
    this.newContent = {
      ...content,
      onUpdate: true,
    };
    console.log('payload: ', this.newContent);
    this.homeContentPopups(true);
  }

  clearData(val: IContent) {
    this.newContent = val;
  }
}
</script>

<style scoped>
.card-radius {
  border-radius: 25px;
}
</style>
