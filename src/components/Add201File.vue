<template>
  <q-dialog v-model="showAdd201FileDialog" persistent>
    <!-- <q-card
      style="width: 700px; max-width: 80vw; border-radius: 25px;"
      full-height
      class="__card q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Add 201 File</q-toolbar-title
        >
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="add201FilePopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card class="q-pr-md q-pl-md">
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                outlined
                label="First name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                label="Middle name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                label="Last name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input outlined type="date" width hint="Date of Birth" />
            </div>
            <div class="col">
              <q-input
                outlined
                label="Place of Birth"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                outlined
                label="Home Address"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                outlined
                label="Agency"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                outlined
                label="Position"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-select
                outlined
                v-model="selection"
                :options="options"
                label="Type of Document"
              />
            </div>
            <div class="col">
              <q-file
                v-model="files"
                label="Upload File"
                outlined
                use-chips
                multiple
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>
        <q-card-action class="row q-gutter-sm q-pl-md q-pr-md">
          <div class="col">
            <q-btn
              class="full-width"
              label="Cancel"
              outline
              rounded
              dense
              :loading="isUpload"
              :disable="isUpload"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              label="Confirm"
              outline
              rounded
              dense
              :loading="isUpload"
              :disable="isUpload"
            ></q-btn>
          </div>
        </q-card-action>
      </q-card>
    </q-card> -->
    <q-card
      style="width: 500px; max-width: 80vw; border-radius: 25px;"
      full-height
      class="__card q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Add 201 File</q-toolbar-title
        >
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="add201FilePopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card class="q-pr-md q-pl-md">
        <q-card-section class="q-gutter-sm">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-select
                ref="employeeId"
                outlined
                v-model="empSelection"
                :options="newFiltered"
                option-value="id"
                option-label="lastName"
                map-options
                label="Employee"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-select
                ref="docType"
                outlined
                v-model="documents.docType"
                :options="options"
                label="Type of Document"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-file
                ref="docFile"
                v-model="documents.docFile"
                label="Upload File"
                outlined
                use-chips
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>
        <q-card-action class="row q-gutter-sm q-pl-md q-pr-md">
          <div class="col">
            <q-btn
              class="full-width"
              label="Cancel"
              outline
              rounded
              dense
              :loading="isUpload"
              :disable="isUpload"
            ></q-btn>
          </div>
          <div class="col">
            <q-btn
              class="full-width"
              label="Confirm"
              outline
              rounded
              dense
              @click="saveEmployeeDocument"
              :loading="isUpload"
              :disable="isUpload"
            ></q-btn>
          </div>
        </q-card-action>
      </q-card>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import IEmployee from 'src/interfaces/employee.interface';
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import uploadService from '../services/upload.service';
import { Promise } from 'q';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

interface IDocument {
  firstName: string;
  middleName: string;
  lastName: string;
  bod: string;
  pod: string;
  address: string;
  agency: string;
  position: string;
  docType: any;
  date: string;
  fileName: string;
  fileStatus: string;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAdd201FileDialog']),
    ...mapState('employee', ['employees', 'employee']),
  },
  methods: {
    ...mapActions('uiNav', ['add201FilePopups']),
    ...mapActions('employee', ['getEmployees', 'getEmployeeById']),
    ...mapActions('document', ['addEmployeeDocument']),
  },
})
export default class Add201File extends Vue {
  documents: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    bod: '',
    pod: '',
    address: '',
    agency: '',
    position: '',
    file: [],
    docType: '',
    date: '',
    fileName: '',
    fileStatus: '',
  };

  $refs!: {
    employeeId: RefsVue;
    docType: RefsVue;
    docFile: RefsVue;
  };

  options = [
    'Appointment',
    'Personal Data Sheet',
    'Transcript Of Record',
    'SCARD',
    'Eligibilty',
  ];

  showAdd201FileDialog!: boolean;
  shouldShow = false;
  isUpload = false;
  isSubmit = false;
  files: any = [];
  label = '';
  docSelection = '';
  empId = '';
  empSelection: IEmployee[] = [];

  formHasError!: boolean;
  newFiltered: IEmployee[] = [];
  data: IEmployee[] = [];
  employee!: IEmployee;
  employees!: IEmployee[];
  getEmployeeById!: (id: any) => Promise<void>;
  getEmployees!: () => Promise<void>;
  addEmployeeDocument!: (payload: any) => Promise<void>;
  add201FilePopups!: (show: boolean) => void;

  async created() {
    await this.getEmployees();
    this.data = this.employees;
    this.newFiltered = this.data.filter(
      (d: any) => d.agency != 'CSC - Lanao (Main Library - Office)'
    );
  }

  checkForm() {
    this.$refs.employeeId.validate();
    this.$refs.docType.validate();
    this.$refs.docFile.validate();
  }

  async saveEmployeeDocument() {
    this.isSubmit = true;
    this.checkForm();
    if (
      this.$refs.employeeId.hasError ||
      this.$refs.docType.hasError ||
      this.$refs.docFile.hasError
    ) {
      this.formHasError = true;
    } else {
      if (this.documents.docFile.length != 0) {
        await this.addEmployeeDocument({
          ...this.employee,
          file: this.documents.docFile,
          docType: this.documents.docType,
          fileName: this.documents.docType,
          fileStatus: 'active',
        });
        this.add201FilePopups(false);
        this.documents = {
          firstName: '',
          middleName: '',
          lastName: '',
          bod: '',
          pod: '',
          address: '',
          agency: '',
          position: '',
          file: [],
          docType: '',
          date: '',
          fileName: '',
          fileStatus: '',
        };
        this.$q.notify({
          type: 'positive',
          message: 'Document Added Successfully.',
        });
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'Upload Document File is required.',
        });
      }
    }
  }

  // async getEmployeeInfo() {
  //   this.empId = this.empSelection.id;
  //   await this.getEmployeeById(this.empId);
  // }
}
</script>
