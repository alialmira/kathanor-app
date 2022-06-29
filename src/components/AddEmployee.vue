<template>
  <q-dialog
    v-model="showAddEmployeeDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 700px; max-width: 80vw; border-radius: 25px;"
      class="__card q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center">
          <span v-if="documents.onUpdate">UPDATE EMPLOYEE</span>
          <span v-else>ADD EMPLOYEE</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="addEmployeePopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <div class="items-start">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref="firstName"
                v-model="documents.firstName"
                outlined
                label="First Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="middleName"
                v-model="documents.middleName"
                outlined
                label="Middle Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="lastName"
                v-model="documents.lastName"
                outlined
                label="Last Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref="birthDate"
                v-model="documents.birthDate"
                outlined
                type="date"
                hint="Date of Birth"
              />
            </div>
            <div class="col">
              <q-input
                ref="birthPlace"
                v-model="documents.birthPlace"
                outlined
                label="Place of Birth"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
        </div>
        <div class="row q-gutter-sm">
          <div class="col">
            <q-input
              ref="address"
              v-model="documents.address"
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
              ref="agency"
              v-model="documents.agency"
              outlined
              label="Agency"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              ref="position"
              v-model="documents.position"
              outlined
              label="Position"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md q-pr-lg q-pl-lg">
        <div class="col">
          <q-btn
            class="full-width"
            label="Reset"
            outline
            rounded
            dense
            @click="hideDialog()"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            :label="documents.onUpdate ? 'Update' : 'Confirm'"
            outline
            rounded
            dense
            @click="documents.onUpdate ? '' : addNewEmployeeDocument()"
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import { lstat } from 'fs';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

interface IEmployee {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  homeAddress: string;
  currentAddress: string;
  contNumber: string;
  emailAdd: string;
  position: string;
  username: string;
  password: string;
  session: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddEmployeeDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['addEmployeePopups']),
    ...mapActions('employee', [
      'updateEmployee',
      'deleteEmployee',
      'getEmployees',
    ]),
    ...mapActions('document', ['addEmployeeDocument']),
  },
})
export default class AddEmployee extends Vue {
  @Prop({ type: Object, required: true }) readonly employee!: IEmployee;

  documents: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    agency: '',
    position: '',
    file: [],
    docType: '',
    date: '',
    fileName: '',
    fileStatus: '',
    onUpdate: false,
  };

  $refs!: {
    lastName: RefsVue;
    firstName: RefsVue;
    middleName: RefsVue;
    birthDate: RefsVue;
    birthPlace: RefsVue;
    address: RefsVue;
    agency: RefsVue;
    position: RefsVue;
  };

  _id = undefined;
  isSubmit = false;
  isUpload = false;
  formHasError!: boolean;
  showAddEmployeeDialog!: boolean;
  addEmployeePopups!: (show: boolean) => void;
  getEmployees!: () => Promise<void>;
  addEmployeeDocument!: (payload: any) => Promise<void>;

  checkForm() {
    this.$refs.lastName.validate();
    this.$refs.firstName.validate();
    this.$refs.middleName.validate();
    this.$refs.birthDate.validate();
    this.$refs.birthPlace.validate();
    this.$refs.address.validate();
    this.$refs.agency.validate();
    this.$refs.position.validate();
  }

  async addNewEmployeeDocument() {
    this.isSubmit = true;
    this.checkForm();
    if (
      this.$refs.lastName.hasError ||
      this.$refs.lastName.hasError ||
      this.$refs.firstName.hasError ||
      this.$refs.middleName.hasError ||
      this.$refs.birthDate.hasError ||
      this.$refs.birthPlace.hasError ||
      this.$refs.agency.hasError ||
      this.$refs.position.hasError
    ) {
      this.formHasError = true;
    } else {
      this.isSubmit = false;
      await this.addEmployeeDocument({
        ...this.documents,
        file: [],
        docType: '',
        date: '',
        fileName: '',
        fileStatus: true,
      });
      await this.$store.dispatch('uiNav/addEmployeePopups', false);
      this.documents = {
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        birthPlace: '',
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
        message: 'Employee Information Created',
      });
    }
  }

  showDialog() {
    this.documents = { ...this.documents };
  }

  hideDialog() {
    this.documents = {
      firstName: '',
      middleName: '',
      lastName: '',
      birthDate: '',
      birthPlace: '',
      address: '',
      agency: '',
      position: '',
      file: [],
      docType: '',
      date: '',
      fileName: '',
      fileStatus: '',
    };
    this.$emit('clearData', { ...this.documents, onUpdate: false });
  }
}
</script>
