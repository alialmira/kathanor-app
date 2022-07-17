<template>
  <q-page class="flex flex-center">
    <q-card class="__card shadow-10 bg-grey-1 q-pa-lg" style="border-radius: 25px">
      <q-item-label class="text-center text-h3">
        <b>KAPAGATOR</b>
      </q-item-label>
      <q-card-section>
        <q-input
          v-model="user.username"
          color="positive"
          label="Username"
          type="text"
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <q-input
          v-model="user.password"
          color="positive"
          label="Password"
          @keypress.enter="login()"
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="hidePassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="hidePassword = !hidePassword"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="positive"
          label="Log in"
          rounded
          outline
          class="full-width"
          size="m"
          @click="login()"
        >
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  user = {
    username: '',
    password: ''
  };

  hidePassword = false;

  async login() {
    if (this.user.username == 'admin' && this.user.password == 'pass') {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped></style>
