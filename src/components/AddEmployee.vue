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
          <span v-if="employees.onUpdate">UPDATE EMPLOYEE</span>
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
                v-model="employees.firstName"
                outlined
                label="First Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="middleName"
                v-model="employees.middleName"
                outlined
                label="Middle Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="lastName"
                v-model="employees.lastName"
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
                v-model="employees.birthDate"
                outlined
                type="date"
                hint="Date of Birth"
              />
            </div>
            <div class="col">
              <q-input
                ref="birthPlace"
                v-model="employees.birthPlace"
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
              v-model="employees.address"
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
              v-model="employees.agency"
              outlined
              label="Agency"
              lazy-rules
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
          <div class="col">
            <q-input
              ref="position"
              v-model="employees.position"
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
            :label="employees.onUpdate ? 'Update' : 'Confirm'"
            outline
            rounded
            dense
            @click="employees.onUpdate ? updateEmployeeInfo() : addNewEmployeeDocument()"
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
import IDocument from 'src/interfaces/document.interface';
import IEmployee from '../interfaces/employee.interface';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddEmployeeDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['addEmployeePopups']),
    ...mapActions('employee', [
      'addEmployee',
      'updateEmployee',
      'deleteEmployee',
      'getEmployees',
    ]),
    ...mapActions('document', ['addEmployeeDocument']),
  },
})
export default class AddEmployee extends Vue {
  @Prop({ type: Object, required: true }) readonly employee!: IEmployee;

  employees: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    agency: '',
    position: ''
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
  addEmployee!: (payload: any) => Promise<void>;
  updateEmployee!: (payload: any) => Promise<void>;

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
      await this.addEmployee({ ...this.employees, onUpdate: false });
      await this.$store.dispatch('uiNav/addEmployeePopups', false);
      this.employees = {
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        birthPlace: '',
        address: '',
        agency: '',
        position: ''
      };
      this.$q.notify({
        type: 'positive',
        message: 'Employee Information Created',
      });
    }
  }

  async updateEmployeeInfo() {
    try {
      await this.updateEmployee({
        ...this.employees,
      });
      this.addEmployeePopups(false);
      this.$q.notify({
        type: 'positive',
        message: 'Employee Updated Successfully.',
      });
    } catch (error) {
      console.log(error);
      this.$q.notify({
        type: 'negative',
        message: 'Employee Failed to Update.',
      });
    }
  }

  showDialog() {
    this.employees = { ...this.employees };
  }

  hideDialog() {
    this.employees = {
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
    this.$emit('clearData', { ...this.employees, onUpdate: false });
  }
}
</script>
