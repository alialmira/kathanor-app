<template>
  <q-dialog v-model="showAddOfficerDialog" persistent @hide="hideDialog()">
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/addperson.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >ADD NEW OFFICER</q-toolbar-title
        >
        <q-btn
          color="dark"
          icon="close"
          size="md"
          @click="addAccountPopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
        <q-input
          ref="idNumber"
          v-model="officers.name"
          filled
          label="ID Number"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="firstName"
          v-model="officers.firstName"
          filled
          label="First Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="lastName"
          v-model="officers.lastName"
          filled
          label="Last Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="contactNumber"
          v-model="officers.contactNumber"
          mask="###########"
          filled
          label="Contact Number"
          lazy-rules
          :rules="[
            val => val.length >= 11 || 'Contact Number must be 11 digit'
          ]"
        />
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Create"
            color="dark"
            text-color="white"
            @click="addOfficer()"
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Reset"
            color="dark"
            text-color="white"
            @click="hideDialog()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddOfficerDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('officer', ['addAccount'])
  }
})
export default class Dialog extends Vue {
  officers = {
    name: '',
    firstName: '',
    lastName: '',
    contactNumber: ''
  };
  $refs!: {
    idNumber: RefsVue;
    firstName: RefsVue;
    lastName: RefsVue;
    contactNumber: RefsVue;
  };
  showAddOfficerDialog!: boolean;
  formHasError!: boolean;
  shouldShow = false;
  isSubmit = false;
  isUpload = false;
  addAccountPopups!: (show: boolean) => void;
  addAccount!: (payload: any) => Promise<void>;

  async addOfficer() {
    this.isSubmit = true;
    this.$refs.idNumber.validate();
    this.$refs.firstName.validate();
    this.$refs.lastName.validate();
    this.$refs.contactNumber.validate();

    if (
      this.$refs.idNumber.hasError ||
      this.$refs.firstName.hasError ||
      this.$refs.lastName.hasError ||
      this.$refs.contactNumber.hasError
    ) {
      this.formHasError = true;
    } else {
      await this.addAccount(this.officers);
      this.isSubmit = false;
      await this.$store.dispatch('uiNav/addAccountPopups', false);
      this.officers = { name: '', firstName: '', lastName: '', contactNumber: '' };
      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Account Created'
      });
    }
  }

  hideDialog() {
    this.officers = { name: '', firstName: '', lastName: '', contactNumber: '' };
  }

}
</script>

<style scoped>
.__card {
  width: 500px;
}
</style>
