<template>
  <q-page class="flex flex-center bg-secondary">
    <div class="row">
      <div class="col-7">
        <q-card flat class="fit">
          <img src="~assets/try2.jpg" class="__imag" />
        </q-card>
      </div>
      <div class="col-5">
        <q-card elevated flat bordered class="__card bg-accent">
          <q-card-section class="q-gutter-y-md  flex flex-center outlined">
            <q-img class="__img" src="~assets/try3.png" />
            <div class="text-overline">Log in your account</div>
            <q-input
              style="width: 300px"
              class="center"
              v-model="user.username"
              outlined
              label="ID Number"
              bg-color="white"
              mask="#########"
              color="black"
              ><template v-slot:prepend> <q-icon name="person"/></template>
            </q-input>
            <q-input
              style="width: 300px"
              v-model="user.password"
              outlined
              label="Password"
              bg-color="white"
              color="black"
              :type="hidePassword ? '' : 'password'"
              @keypress.enter="login()"
            >
              <template v-slot:prepend> <q-icon name="lock"/></template>
              <template v-slot:append>
                <q-icon
                  :name="hidePassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="hidePassword = !hidePassword"
                ></q-icon
              ></template>
            </q-input>
          </q-card-section>
          <q-card-actions class="flex flex-center">
            <q-btn
              class="__btn q-py-xs"
              rounded
              size="md"
              label="login"
              color="dark"
              text-color="white"
              @click="login()"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState } from 'vuex';

interface User {
  username: string;
  password: string;
}

interface Officers {
  name: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  password: string;
  accountType: string;
}

@Component({
  computed: {
    ...mapState('officer', ['officers'])
  }
})
export default class Login extends Vue {
  officers!: Officers[];
  user: User = {
    username: '',
    password: ''
  };
  hidePassword = false;
  async login(): Promise<void> {
    if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'Admin'
      )
    ) {
      this.$q.notify({
        type: 'success',
        message: 'Logged in as Admin'
      });
      await this.$store.dispatch('uiNav/isAdminLogin', true);
      await this.$router.push('/');
    } else if (
      this.officers.find(
        o =>
          this.user.password == o.password &&
          this.user.username == o.name &&
          o.accountType == 'Officer'
      )
    ) {
      this.$q.notify({
        type: 'success',
        message: 'Logged in as Officer'
      });
      await this.$store.dispatch('uiNav/isAdminLogin', false);
      await this.$router.push('/');
    } else {
      this.$q.notify({
        
        type: 'warning',
        message: 'Invalid Username or Password.'
      });
    }
  }
}
</script>

<style scoped>
.__card {
  width: 400px;
  height: 500px;
}
.__btn {
  width: 250px;
}
.__img {
  height: 200px;
}
.__imgg {
  width: 600px;
  height: 500px;
}
.__imag {
  height: 500px;
}
</style>
