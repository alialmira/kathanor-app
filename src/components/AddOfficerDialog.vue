<template>
  <q-dialog
    v-model="showAddOfficerDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/addperson.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center">
          <span v-if="officer.onUpdate">UPDATE OFFICER</span>
          <span v-else>ADD NEW OFFICER</span>
        </q-toolbar-title>
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
        <q-input
          ref="position"
          v-model="officers.position"
          filled
          label="Position"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            :label="officer.onUpdate ? 'Update' : 'Create'"
            color="dark"
            text-color="white"
            @click="officer.onUpdate ? editOfficer() : addOfficer()"
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

interface IOfficer {
  name: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  accountType: string;
  position: string;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAddOfficerDialog'])
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups']),
    ...mapActions('officer', ['addAccount', 'updateOfficer', 'getOfficers'])
  }
})
export default class Dialog extends Vue {
  @Prop({ type: Object, required: true }) readonly officer!: IOfficer;

  _id = undefined;
  officers: any = {
    name: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    position: '',
    onUpdate: false
  };
  $refs!: {
    idNumber: RefsVue;
    firstName: RefsVue;
    lastName: RefsVue;
    contactNumber: RefsVue;
    position: RefsVue;
  };
  showAddOfficerDialog!: boolean;
  formHasError!: boolean;
  shouldShow = false;
  isSubmit = false;
  isUpload = false;
  updateOfficer!: (payload: any) => Promise<void>;
  addAccountPopups!: (show: boolean) => void;
  addAccount!: (payload: any) => Promise<void>;
  getOfficers!: () => Promise<void>;

  async addOfficer() {
    this.isSubmit = true;
    this.$refs.idNumber.validate();
    this.$refs.firstName.validate();
    this.$refs.lastName.validate();
    this.$refs.contactNumber.validate();
    this.$refs.position.validate();

    if (
      this.$refs.idNumber.hasError ||
      this.$refs.firstName.hasError ||
      this.$refs.lastName.hasError ||
      this.$refs.contactNumber.hasError ||
      this.$refs.position.hasError
    ) {
      this.formHasError = true;
    } else {
      await this.addAccount({
        ...this.officers,
        accountType: 'officer',
        session: false,
        password: this.officers.lastName
      });
      this.isSubmit = false;
      await this.$store.dispatch('uiNav/addAccountPopups', false);
      this.officers = {
        name: '',
        firstName: '',
        lastName: '',
        contactNumber: '',
        position: ''
      };
      this.$q.notify({
        
        type: 'positive',
        message: 'Account Created'
      });
    }
  }

  showDialog() {
    this.officers = { ...this.officer };
  }

  hideDialog() {
    this.officers = {
      name: '',
      firstName: '',
      lastName: '',
      contactNumber: '',
      position: ''
    };
    this.$emit('clearData', { ...this.officers, onUpdate: false });
  }
  async editOfficer() {
    try {
      await this.updateOfficer({
        ...this.officers
      });

      this.addAccountPopups(false);
      this.$q.notify({
        
        type: 'positive',
        message: 'Document Updated Successfully.'
      });
      await this.getOfficers();
    } catch (error) {
      console.log(error);
      this.$q.notify({
        
        type: 'negative',
        message: 'Somethig wrong when updating the documents.'
      });
    }
  }
}
</script>

<style scoped>
.__card {
  width: 500px;
}

</style>
