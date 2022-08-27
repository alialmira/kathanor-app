<template>
  <q-dialog
    v-model="showEmployeeInfoDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 500px; max-width: 85vw; border-radius: 25px;"
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
      <div class="text-center">
        <q-card-section>
          <div class="q-pt-xs">
            <div :class="$q.screen.lt.md ? 'text-h6' : 'ellipsis'">
              <q-card-section :class="$q.screen.lt.md ? '' : 'text-h5 text-weight-bold'">
                <div
                  :class="
                    $q.screen.lt.md
                      ? 'text-center q-gutter-md'
                      : 'text-center q-gutter-md'
                  "
                >
                  <q-avatar
                    :size="$q.screen.lt.md ? '110px' : '170px'"
                    class="shadow-10"
                  >
                    <img src="~assets/avatar-02.jpg" />
                  </q-avatar>
                </div>
              </q-card-section>
              <q-card-section
                :class="$q.screen.lt.md ? '' : 'text-h5 text-weight-bold'"
              >
                <div
                  :class="
                    $q.screen.lt.md
                      ? 'text-center q-gutter-xs'
                      : 'text-center q-gutter-xs'
                  "
                >
                  {{ employees.firstName }} {{ employees.middleName }}
                  {{ employees.lastName }}
                  {{ employees.extensionName }}
                  <br />
                  {{ employees.position }}
                  <br />
                  {{ employees.agency }}
                </div>
              </q-card-section>
              <div class="q-pa-md q-pt-md">
                <q-separator color="black" />
              </div>
              <q-card-section
                :class="
                  $q.screen.lt.md ? '' : 'text-h5 text-center text-weight-bold'
                "
              >
                <div class="row q-gutter-sm">
                  <div class="col">
                    <div :class="$q.screen.lt.md ? '' : 'row'">
                      <div
                        :class="
                          $q.screen.lt.md
                            ? 'q-gutter-sm'
                            : 'col text-weight-bold q-gutter-sm'
                        "
                      >
                        <q-input
                          v-model="employees.birthDate"
                          label="Birth Date"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="employees.contactNumber"
                          label="Contact Number"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="employees.homeAddress"
                          label="Home Address"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                      </div>
                      <div class="col text-black q-gutter-sm">
                        <q-input
                          v-model="employees.birthPlace"
                          label="Birth Place"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="employees.emailAddress"
                          label="Email Address"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="employees.currentAddress"
                          label="Current Address"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card-section>
      </div>
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
