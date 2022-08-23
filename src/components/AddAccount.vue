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
          <span v-if="newEmployee.onUpdate">EDIT EMPLOYEE</span>
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
                ref="firstName"
                v-model="newEmployee.firstName"
                outlined
                label="First Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="middleName"
                v-model="newEmployee.middleName"
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
                v-model="newEmployee.lastName"
                outlined
                label="Last Name"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                v-model="newEmployee.extensionName"
                outlined
                label="Extension Name"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref="birthDate"
                v-model="newEmployee.birthDate"
                outlined
                type="date"
                hint="Date of Birth"
              />
            </div>
            <div class="col">
              <q-input
                ref="contNumber"
                v-model="newEmployee.contactNumber"
                mask="##########"
                prefix="+63"
                outlined
                label="Contact Number"
                lazy-rules
                :rules="[
                  (val) =>
                    val.length >= 10 || 'Contact Number must be 10 digit',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref="birthPlace"
                v-model="newEmployee.birthPlace"
                outlined
                label="Place of Birth"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="homeAddress"
                v-model="newEmployee.homeAddress"
                outlined
                label="Home Address"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="currentAddress"
                v-model="newEmployee.currentAddress"
                outlined
                label="Current Address"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                ref="agency"
                v-model="newEmployee.agency"
                outlined
                label="Agency"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col">
              <q-input
                ref="position"
                v-model="newEmployee.position"
                outlined
                label="Position"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="newEmployee.emailAddress"
                outlined
                label="Email Address"
              />
            </div>
          </div>
          <div
            v-if="
              newEmployee.agency == 'CSC - LDS' ||
              newEmployee.agency == 'Csc - lds' ||
              newEmployee.agency == 'csc - lds'
            "
          >
            <div class="row q-pt-sm q-gutter-sm">
              <div class="col">
                <q-input
                  v-model="newEmployee.password"
                  label="Password"
                  :type="isShowPass ? 'text' : 'password'"
                  outlined
                >
                  <template v-slot:append>
                    <q-btn
                      :icon="isShowPass ? 'visibility' : 'visibility_off'"
                      flat
                      round
                      dense
                      @click="isShowPass = !isShowPass"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-input
                  v-model="confirmPassword"
                  label="Confirm Password"
                  :type="isShowCPass ? 'text' : 'password'"
                  outlined
                >
                  <template v-slot:append>
                    <q-btn
                      :icon="isShowCPass ? 'visibility' : 'visibility_off'"
                      flat
                      round
                      dense
                      @click="isShowCPass = !isShowCPass"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div
              v-if="
                newEmployee.agency == 'CSC - LDS' ||
                newEmployee.agency == 'Csc - lds' ||
                newEmployee.agency == 'csc - lds'
              "
              class="q-pt-xs text-center"
            >
              Note: Your contact number will be your username.
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
            :label="newEmployee.onUpdate ? 'Update' : 'Confirm'"
            color="positive"
            rounded
            dense
            @click="
              newEmployee.onUpdate ? updateEmployeeInfo() : addNewEmployee()
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
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

interface IEmployee {
  lastName: string;
  firstName: string;
  middleName: string;
  extensionName: string;
  birthDate: string;
  homeAddress: string;
  currentAddress: string;
  contNumber: string;
  emailAdd: string;
  position: string;
  accountType: string;
  username: string;
  password: string;
  session: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddAccountDialog']),
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('employee', [
      'getEmployees',
      'addEmployee',
      'updateEmployee',
      'deleteEmployee',
    ]),
  },
})
export default class AddAccount extends Vue {
  @Prop({ type: Object, required: true }) readonly employee!: IEmployee;

  newEmployee: any = {
    lastName: '',
    firstName: '',
    middleName: '',
    extensionName: '',
    birthDate: '',
    birthPlace: '',
    homeAddress: '',
    currentAddress: '',
    contNumber: '',
    emailAdd: '',
    agency: '',
    position: '',
    accountType: '',
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
    agency: RefsVue;
    position: RefsVue;
    accountType: RefsVue;
  };

  accType = ['admin', 'user', 'none'];
  confirmPassword = '';
  user: any = {};
  isShowPass = false;
  isShowCPass = false;
  isAdmin = false;
  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  formHasError!: boolean;
  showAddAccountDialog!: boolean;
  employees!: IEmployee[];
  addAccountPopups!: (show: boolean) => void;
  updateEmployee!: (payload: any) => Promise<void>;
  addEmployee!: (payload: any) => Promise<void>;
  getEmployees!: () => Promise<void>;

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

  async created() {
    await this.getEmployees();
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
  }

  checkForm() {
    this.$refs.lastName.validate();
    this.$refs.firstName.validate();
    this.$refs.middleName.validate();
    this.$refs.birthDate.validate();
    this.$refs.birthPlace.validate();
    this.$refs.homeAddress.validate();
    this.$refs.currentAddress.validate();
    this.$refs.contNumber.validate();
    this.$refs.agency.validate();
    this.$refs.position.validate();
  }

  // async addNewEmployee() {
  //   this.isSubmit = true;
  //   this.checkForm();
  //   if (
  //     this.$refs.lastName.hasError ||
  //     this.$refs.firstName.hasError ||
  //     this.$refs.middleName.hasError ||
  //     this.$refs.birthDate.hasError ||
  //     this.$refs.birthPlace.hasError ||
  //     this.$refs.homeAddress.hasError ||
  //     this.$refs.currentAddress.hasError ||
  //     this.$refs.contNumber.hasError ||
  //     this.$refs.agency.hasError ||
  //     this.$refs.position.hasError ||
  //     this.$refs.accountType.hasError
  //   ) {
  //     this.formHasError = true;
  //   } else {
  //     this.isSubmit = false;
  //     if (this.newEmployee.accountType == 'None') {
  //       await this.addEmployee({
  //         ...this.newEmployee,
  //         session: false,
  //         username: '',
  //         password: '',
  //       });
  //       await this.$store.dispatch('uiNav/addAccountPopups', false);
  //       this.newEmployee = {
  //         lastName: '',
  //         firstName: '',
  //         middleName: '',
  //         extensionName: '',
  //         birthDate: '',
  //         homeAddress: '',
  //         currentAddress: '',
  //         contNumber: '',
  //         emailAdd: '',
  //         agency: '',
  //         position: '',
  //       };
  //       this.confirmPassword = '';
  //       this.$q.notify({
  //         type: 'positive',
  //         message: 'Employee Account Created.',
  //       });
  //     } else if (this.newEmployee.password == this.confirmPassword) {
  //       await this.addEmployee({
  //         ...this.newEmployee,
  //         session: false,
  //         username: this.newEmployee.contactNumber,
  //         password: this.newEmployee.password,
  //       });
  //       await this.$store.dispatch('uiNav/addAccountPopups', false);
  //       this.newEmployee = {
  //         lastName: '',
  //         firstName: '',
  //         middleName: '',
  //         extensionName: '',
  //         birthDate: '',
  //         homeAddress: '',
  //         currentAddress: '',
  //         contNumber: '',
  //         emailAdd: '',
  //         agency: '',
  //         position: '',
  //       };
  //       this.confirmPassword = '';
  //       this.$q.notify({
  //         type: 'positive',
  //         message: 'Employee Account Created.',
  //       });
  //     } else if (this.newEmployee.password == this.confirmPassword) {
  //       this.$q.notify({
  //         type: 'negative',
  //         message: 'Password Not Matched.',
  //       });
  //     } else {
  //       this.$q.notify({
  //         type: 'positive',
  //         message: 'Failed to Create Account.',
  //       });
  //     }
  //   }
  // }

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
      this.$refs.agency.hasError ||
      this.$refs.position.hasError
    ) {
      this.formHasError = true;
    } else {
      this.isSubmit = false;
      if (this.newEmployee.agency != "CSC - LDS") {
        await this.addEmployee({
          ...this.newEmployee,
          accountType: 'user',
          session: false,
          username: '',
          password: '',
        });
        await this.$store.dispatch('uiNav/addAccountPopups', false);
        this.newEmployee = {
          lastName: '',
          firstName: '',
          middleName: '',
          extensionName: '',
          birthDate: '',
          homeAddress: '',
          currentAddress: '',
          contNumber: '',
          emailAdd: '',
          agency: '',
          position: '',
        };
        this.confirmPassword = '';
        this.$q.notify({
          type: 'positive',
          message: 'Employee Account Created.',
        });
      } else if (this.newEmployee.agency == "CSC - LDS") {
        if (this.newEmployee.password == this.confirmPassword) {
          await this.addEmployee({
            ...this.newEmployee,
            accountType: 'user',
            session: false,
            username: this.newEmployee.contactNumber,
            password: this.newEmployee.password,
          });
          await this.$store.dispatch('uiNav/addAccountPopups', false);
          this.newEmployee = {
            lastName: '',
            firstName: '',
            middleName: '',
            extensionName: '',
            birthDate: '',
            homeAddress: '',
            currentAddress: '',
            contNumber: '',
            emailAdd: '',
            agency: '',
            position: '',
            username: '',
            password: '',
          };
          this.confirmPassword = '';
          this.$q.notify({
            type: 'positive',
            message: 'Employee Account Created.',
          });
        }else{
          this.confirmPassword = '';
          this.$q.notify({
            type: 'warning',
            message: 'Password not Matched.',
          });
        }
      } else {
        this.confirmPassword = '';
          this.$q.notify({
            type: 'warning',
            message: 'Failed to Created Account.',
          });
      }
    }
  }

  async updateEmployeeInfo() {
    try {
      await this.updateEmployee({
        ...this.newEmployee,
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
    this.newEmployee = { ...this.employee };
  }

  hideDialog() {
    this.newEmployee = {
      lastName: '',
      firstName: '',
      middleName: '',
      extensionName: '',
      birthDate: '',
      homeAddress: '',
      currentAddress: '',
      contNumber: '',
      emailAdd: '',
      agency: '',
      position: '',
      accountType: '',
      username: '',
      password: '',
    };
    this.confirmPassword = '';
    this.$emit('clearData', { ...this.newEmployee, onUpdate: false });
  }
}
</script>
