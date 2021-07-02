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
          v-model="officer.name"
          filled
          label="ID Number"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="fName"
          v-model="officer.fName"
          filled
          label="First Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="lName"
          v-model="officer.lName"
          filled
          label="Last Name"
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          ref="contactNum"
          v-model="officer.contactNum"
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
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Reset"
            color="dark"
            text-color="white"
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
    ...mapActions('uiNav', ['addAccountPopups'])
  }
})
export default class Dialog extends Vue {
  officer = {
    name: '',
    fName: '',
    lName: '',
    contactNum: ''
  };
  $refs!: {
    idNumber: RefsVue;
    fName: RefsVue;
    lName: RefsVue;
    contactNum: RefsVue;
  };
  showAddOfficerDialog!: boolean;
  formHasError!: boolean;
  shouldShow = false;
  addAccountPopups!: (show: boolean) => void;

  async addOfficer() {
    this.$refs.idNumber.validate();
    this.$refs.fName.validate();
    this.$refs.lName.validate();
    this.$refs.contactNum.validate();

    if (
      this.$refs.idNumber.hasError ||
      this.$refs.fName.hasError ||
      this.$refs.lName.hasError ||
      this.$refs.contactNum.hasError
    ) {
      this.formHasError = true;
    } else {
      await this.$store.dispatch('officer/addOfficer', this.officer);
      await this.$store.dispatch('uiNav/addAccountPopups', false);
      this.officer = { name: '', fName: '', lName: '', contactNum: '' };
      this.$q.notify({
        icon: 'done',
        color: 'positive',
        message: 'Account Created'
      });
    }
  }

  hideDialog() {
    this.officer = { name: '', fName: '', lName: '', contactNum: '' };
  }
}
</script>

<style scoped>
.__card {
  width: 500px;
}
</style>
