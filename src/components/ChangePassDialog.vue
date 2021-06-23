<template>
  <q-dialog v-model="isShoww" persistent>
    <q-card class="__card q-py-lg">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/icons8-password-reset-26.png" />
        </q-avatar>
        <q-toolbar-title class="text-weight-bold text-center"
          >Change Password</q-toolbar-title
        >
      </q-toolbar>
      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="password.oldPass"
          ref="oldPass"
          label="Input old password"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          v-model="password.newPass"
          ref="newPass"
          label="Type new password"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          v-model="password.renewPass"
          ref="renewPass"
          label="Re-type new password"
          filled
          lazy-rules
          :rules="[val => !!val || 'Field is required']"
        />
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md">
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Change"
            color="dark"
            text-color="white"
            @click="changePassword()"
          ></q-btn>
        </div>
        <div class="col-6">
          <q-btn
            class="full-width"
            label="Cancel"
            color="dark"
            text-color="white"
            @click="dialogPopups(false)"
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
    ...mapState('uiNav', ['isShoww']),
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('uiNav', ['dialogPopups'])
  }
})
export default class ChangePassDialog extends Vue {
  formHasError!: boolean;
  officers!: { [key: string]: string }[];
  isShoww!: boolean;
  shouldShoww = false;
  dialogPopups!: (show: boolean) => void;
  $refs!: {
    oldPass: RefsVue;
    newPass: RefsVue;
    renewPass: RefsVue;
  };
  password = {
    oldPass: '',
    newPass: '',
    renewPass: ''
  };

  created() {
    this.shouldShoww = this.isShoww;
  }

  changePassword() {
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
      this.officers.map(async (o, index) => {
        if (this.password.newPass == this.password.renewPass) {
          if (o.password == this.password.oldPass) {
            const newPassword = {
              name: o.name,
              firstName: o.firstName,
              lastName: o.lastName,
              contactNumber: o.contactNumber,
              password: this.password.newPass,
              accountType: o.accountType
            };
            await this.$store.dispatch('officer/changePassword', {
              newPassword,
              index
            });
            await this.$store.dispatch('uiNav/dialogPopups', false);
            this.qNotify({
              type: 'positive',
              message: 'Password Updated'
            });
            this.password = { oldPass: '', newPass: '', renewPass: '' };
          } else {
            this.qNotify({
              type: 'warning',
              message: 'Incorrect old password!'
            });
          }
        } else {
          this.qNotify({
            type: 'warning',
            message: 'Password Unmatched!'
          });
        }
      });
    }
  }

  qNotify(props: { [key: string]: string }) {
    this.$q.notify({
      type: props.type,
      message: props.message
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
