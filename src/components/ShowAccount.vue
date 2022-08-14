<template>
  <q-dialog
    v-model="showEmployeeInfoDialog"
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
          <span>EMPLOYEE DETAILS</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="showEmployeeInfoPopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <div class="items-center">
          <div class="row q-gutter-sm">
            <div class="col-4">
              <q-avatar size="150px">
                <img src="~assets/avatar-02.jpg" />
              </q-avatar>
            </div>
            <div class="col">
              <q-card-section class="text-h5 text-weight-bold">
                <div class="row q-gutter-sm">
                  {{ employees.firstName }} {{ employees.middleName }}
                  {{ employees.lastName }} {{ employees.extensionName }}
                  <br />
                  {{ employees.position }}
                  <br />
                  {{ employees.agency }}
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <div class="items-center">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-card-section class="text-h5">
                <div class="row q-gutter-sm">
                  <div class="col">
                    Birth Date:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.birthDate }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Birth Place:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.birthPlace }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Contact Number:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.contactNumber }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Email Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.emailAddress }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Home Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.homeAddress }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Current Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ employees.currentAddress }}
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </q-card-section>
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
  extName: String;
  birthDate: string;
  homeAddress: string;
  currentAddress: string;
  contNumber: string;
  emailAdd: string;
  position: string;
  agency: string;
  username: string;
  password: string;
  session: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showEmployeeInfoDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['showEmployeeInfoPopups']),
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
    extensionName: '',
    birthDate: '',
    birthPlace: '',
    homeAddress: '',
    currentAddress: '',
    contNumber: '',
    emailAdd: '',
    agency: '',
    position: '',
    username: '',
    password: '',
    onUpdate: false,
  };

  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  showEmployeeInfoDialog!: boolean;
  showEmployeeInfoPopups!: (show: boolean) => void;

  showDialog() {
    this.employees = { ...this.employee };
  }

  hideDialog() {
    this.employees = {
      name: '',
      firstName: '',
      lastName: '',
      extensionName: '',
      contactNumber: '',
      agency: '',
      position: '',
    };
    this.$emit('clearData', { ...this.employees, onUpdate: false });
  }
}
</script>
