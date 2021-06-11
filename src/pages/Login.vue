<template>
  <q-page class="bg-brown-1 flex flex-center">
    <div class="row">
      <div class="col-8 text-center">
        <img
          class="__card q-ma-lg"
          height="350px"
          width="350px"
          src="~assets/msu-logo.png"
        />
        <q-card>
          <div class="text-subtitle2 text-center q-ma-lg">
            Mindanao State University - Marawi City
            <br />
            Office of Information Press and Publication
            <br /> <br/>
            Definition dito Definition dito Definition dito Definition dito
          </div>
        </q-card>
      </div>
      <div class="col-4 q-pa-xl">
        <q-card class="__card q-py-lg">
          <q-card-section class="q-gutter-y-md">
            <q-input
              v-model="user.username"
              outlined
              label="Username"
              bg-color="white"
              color="black"
              ><template v-slot:prepend> <q-icon name="person"/></template>
            </q-input>
            <q-input
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
          <q-card-actions>
            <q-btn
              class="full-width"
              size="lg"
              label="login"
              color="red-10"
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

interface User {
  username: string;
  password: string;
}
@Component({})
export default class Login extends Vue {
  user: User = {
    username: '',
    password: ''
  };
  hidePassword = false;

  async login(): Promise<void> {
    if (this.user.username == 'abs' && this.user.password == 'abs') {
      await this.$router.push('/');
    } else {
      // alert("Invalid Username or Password");
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
  width: 350px;
}
</style>
