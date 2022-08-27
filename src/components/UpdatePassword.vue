<template>
  <q-dialog v-model="showChangePassDialog" persistent @hide="hideDialog()">
    <q-card
      style="width: 600px; max-width: 80vw; border-radius: 25px;"
      class="__card q-pt-xs"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center"
          >CHANGE PASSWORD</q-toolbar-title
        >
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="changePassPopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <q-input
          v-model="password.oldPass"
          ref="oldPass"
          label="Input old password"
          outlined
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          v-model="password.newPass"
          ref="newPass"
          label="Type new password"
          outlined
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          v-model="password.renewPass"
          ref="renewPass"
          label="Re-type new password"
          outlined
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        />
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md q-pr-lg q-pl-lg">
        <div class="col">
          <q-btn
            class="full-width"
            label="Cancel"
            color="red"
            rounded
            dense
            @click="changePassPopups(false)"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            label="Update"
            color="positive"
            rounded
            dense
            @click="changePasswords()"
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IEmployee from '../interfaces/employee.interface';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}
@Component({
  computed: {
    ...mapState('uiNav', ['showChangePassDialog']),
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('uiNav', ['changePassPopups']),
    ...mapActions('employee', ['updateEmployee']),
  },
})
export default class UpdatePassword extends Vue {
  password = {
    oldPass: '',
    newPass: '',
    renewPass: '',
  };

  $refs!: {
    oldPass: RefsVue;
    newPass: RefsVue;
    renewPass: RefsVue;
  };

  formHasError!: boolean;
  showChangePassDialog!: boolean;
  changePassPopups!: (show: boolean) => void;
  updateEmployee!: (payload: any) => Promise<void>;
  employees!: IEmployee[];

  changePasswords() {
    this.$refs.oldPass.validate();
    this.$refs.newPass.validate();
    this.$refs.renewPass.validate();
    if (
      this.$refs.oldPass.hasError ||
      this.$refs.newPass.hasError ||
      this.$refs.renewPass.hasError
    ) {
      this.formHasError = true;
    } else {
      this.employees.map(async (o: any) => {
        if (this.password.newPass == this.password.renewPass) {
          if (o.password == this.password.oldPass) {
            console.log();
            await this.updateEmployee({
              ...this.employees.find(
                (o: any) =>
                  (o.session == true && o.accountType == 'admin') ||
                  (o.session == true && o.accountType == 'officer')
              ),
              password: this.password.newPass,
            });
            await this.$store.dispatch('uiNav/changePassPopups', false);
            this.qNotify({
              type: 'positive',
              message: 'Password Updated',
            });
            this.password = { oldPass: '', newPass: '', renewPass: '' };
          } else {
            this.qNotify({
              type: 'warning',
              message: 'Incorrect old password!',
            });
          }
        } else {
          this.qNotify({
            type: 'warning',
            message: 'Password Unmatched!',
          });
        }
      });
    }
  }

  hideDialog() {
    this.password = { oldPass: '', newPass: '', renewPass: '' };
  }

  qNotify(props: { [key: string]: string }) {
    this.$q.notify({
      type: props.type,
      message: props.message,
    });
  }
}
</script>

<style scoped>
.__card {
  width: 350px;
}
</style>

<style scoped>
.__card {
  width: 500px;
}
</style>
