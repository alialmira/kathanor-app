<template>
  <q-page class="bg-image flex flex-center">
    <q-card
      class="card-border"
      v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
    >
      <q-card-section>
        <div class="text-center q-pt-md">
          <div :class="$q.screen.lt.md ? 'col text-h4 text-weight-bold' : 'col text-h2 text-grey-9 text-weight-bold ellipsis'">
            KAPAGATOR
          </div>
          <div :class="$q.screen.lt.md ? 'col text-weight-bold' : 'col text-h5 text-grey-9 text-weight-bold ellipsis'">
            CSC Record Management System
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-pr-md q-pl-md q-gutter-md">
          <q-input
            v-model="user.username"
            label="Phone Number"
            mask="(+63) ###-###-####"
            unmasked-value
            rounded
            outlined
            @keypress.enter="login()"
          >
            <template v-slot:prepend>
              <q-icon name="call" />
            </template>
          </q-input>

          <q-input
            v-model="user.password"
            label="Password"
            :type="isShowPass ? 'text' : 'password'"
            rounded
            outlined
            @keypress.enter="login()"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
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

          <div class="q-pb-md text-center">
            <q-btn
              class="radius bg-positive full-width text-white"
              style="height: 43px;"
              label="Login"
              @click="login()"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import IEmployee from '../interfaces/employee.interface';

@Component({
  computed: {
    ...mapState('employee', ['employees', 'employee']),
  },
  methods: {
    ...mapActions('uiNav', ['addAccountPopups', 'showEmployeeInfoPopups']),
    ...mapActions('employee', ['getEmployees', 'getLoggedIn']),
  },
})
export default class Login extends Vue {
  employees!: IEmployee[];
  employee!: IEmployee;
  userLoggedIn!: IEmployee[];
  user = {
    username: '',
    password: '',
  };
  isShowPass = false;

  getEmployees!: () => Promise<void>;
  getLoggedIn!: (payload: any) => Promise<void>;

  async login(): Promise<void> {
    await this.getEmployees();
    if (
      this.employees.find(
        (e) =>
          this.user.username === e.username &&
          this.user.password === e.password &&
          (e.accountType == 'admin')
      )
    ) {
      await this.getLoggedIn({
        ...this.employees.find(
          (e) =>
            this.user.password === e.password &&
            this.user.username === e.username &&
            e.accountType == 'admin'
        ),
        session: true,
      });
      await this.getEmployees();
      await this.$store.dispatch('uiNav/isAdminLogin', true);
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Logged in.',
      });

      await this.$router.push('/home');
    } else if (
      this.employees.find(
        (e) =>
          this.user.username === e.username &&
          this.user.password === e.password &&
          (e.accountType == 'user')
      )
    ) {
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Logged in.',
      });
      await this.getLoggedIn({
        ...this.employees.find(
          (e) =>
            this.user.password === e.password &&
            this.user.username === e.username &&
            e.accountType == 'user'
        ),
        session: true,
      });
      await this.getEmployees();
      await this.$store.dispatch('uiNav/isAdminLogin', false);
      await this.$router.push('/home');
    } else {
      this.$q.notify({
        type: 'negative',
        message: 'Failed to log-in',
      });
    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('~assets/CSC-background-1.jpg');
  background-size: cover;
}
.opac {
  background: rgba(255, 255, 255, 0.6);
}

.radius {
  border-radius: 28px;
}
</style>
