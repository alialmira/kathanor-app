<template>
  <q-dialog
    v-model="showAddAccountDialog"
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
          <span v-if="employees.onUpdate">EDIT EMPLOYEE</span>
          <span v-else>ADD EMPLOYEE</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="addAccountPopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <div class="items-start">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref= "firstName"
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
          </div>
          <div class="row q-gutter-sm">
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
            <div class="col">
              <q-input
                v-model="employees.extName"
                outlined
                label="Extension Name"
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
                ref="contNumber"
                v-model="employees.contactNumber"
                mask="###########"
                outlined
                label="Contact Number"
                lazy-rules
                :rules="[
                  (val) =>
                    val.length >= 11 || 'Contact Number must be 11 digit',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
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
            <div class="col">
              <q-input
                ref="homeAddress"
                v-model="employees.homeAddress"
                outlined
                label="Home Address"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="currentAddress"
                v-model="employees.currentAddress"
                outlined
                label="Current Address"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>

          <q-input
            ref="emailAdd"
            v-model="employees.emailAddress"
            outlined
            label="Email Address"
            lazy-rules
            :rules="[(val) => !!val || 'Field is required']"
          />
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
        </div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md q-pr-lg q-pl-lg">
        <div class="col">
          <q-btn
            class="full-width"
            label="Reset"
            color="red"
            rounded
            dense
            @click="hideDialog()"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            :label="employees.onUpdate ? 'Update' : 'Confirm'"
            color="positive"
            rounded
            dense
            @click="
              employees.onUpdate ? updateEmployeeInfo() : addNewEmployee()
            "
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
  extName: string;
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
    ...mapState('uiNav', ['showAddAccountDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('employee', [
      'addEmployee',
      'updateEmployee',
      'deleteEmployee',
    ]),
  },
})
export default class AddAccount extends Vue {
  @Prop({ type: Object, required: true }) readonly employee!: IEmployee;

  employees: any = {
    lastName: '',
    firstName: '',
    middleName: '',
    extName: '',
    birthDate: '',
    birthPlace: '',
    homeAddress: '',
    currentAddress: '',
    contNumber: '',
    emailAdd: '',
    agency: 'Civil Service Commission - LDS',
    position: '',
    username: '',
    password: '',
    onUpdate: false,
  };

  $refs!: {
    lastName: RefsVue;
    firstName: RefsVue;
    middleName: RefsVue;
    birthDate: RefsVue;
    birthPlace: RefsVue;
    homeAddress: RefsVue;
    currentAddress: RefsVue;
    contNumber: RefsVue;
    emailAdd: RefsVue;
    agency: RefsVue;
    position: RefsVue;
  };

  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  formHasError!: boolean;
  showAddAccountDialog!: boolean;
  addAccountPopups!: (show: boolean) => void;
  updateEmployee!: (payload: any) => Promise<void>;
  addEmployee!: (payload: any) => Promise<void>;

  checkForm() {
    this.$refs.lastName.validate();
    this.$refs.firstName.validate();
    this.$refs.middleName.validate();
    this.$refs.birthDate.validate();
    this.$refs.birthPlace.validate();
    this.$refs.homeAddress.validate();
    this.$refs.currentAddress.validate();
    this.$refs.contNumber.validate();
    this.$refs.emailAdd.validate();
    this.$refs.agency.validate();
    this.$refs.position.validate();
  }

  async addNewEmployee() {
    this.isSubmit = true;
    this.checkForm();
    if (
      this.$refs.lastName.hasError ||
      this.$refs.firstName.hasError ||
      this.$refs.middleName.hasError ||
      this.$refs.birthDate.hasError ||
      this.$refs.birthPlace.hasError ||
      this.$refs.homeAddress.hasError ||
      this.$refs.currentAddress.hasError ||
      this.$refs.contNumber.hasError ||
      this.$refs.emailAdd.hasError ||
      this.$refs.agency.hasError ||
      this.$refs.position.hasError
    ) {
      this.formHasError = true;
    } else {
      this.isSubmit = false;
      await this.addEmployee({
        ...this.employees,
        session: false,
        username: this.employees.firstName,
        password: this.employees.lastName,
      });
      await this.$store.dispatch('uiNav/addAccountPopups', false);
      this.employees = {
        lastName: '',
        firstName: '',
        middleName: '',
        extName: '',
        birthDate: '',
        homeAddress: '',
        currentAddress: '',
        contNumber: '',
        emailAdd: '',
        agency: '',
        position: '',
      };
      this.$q.notify({
        type: 'positive',
        message: 'Employee Account Created',
      });
    }
  }

  async updateEmployeeInfo() {
    try {
      await this.updateEmployee({
        ...this.employees,
      });
      this.addAccountPopups(false);
      this.$q.notify({
        type: 'positive',
        message: 'Account Updated Successfully.',
      });
    } catch (error) {
      console.log(error);
      this.$q.notify({
        type: 'negative',
        message: 'Account Failed to Update.',
      });
    }
  }

  showDialog() {
    this.employees = { ...this.employee };
  }

  hideDialog() {
    this.employees = {
      name: '',
      firstName: '',
      lastName: '',
      extName: '',
      contactNumber: '',
      agency: '',
      position: '',
    };
    this.$emit('clearData', { ...this.employees, onUpdate: false });
  }
}
</script>
