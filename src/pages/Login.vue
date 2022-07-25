<template>
  <q-page class="bg-primary flex flex-center">
    <q-card class="my-card" flat>
      <q-card-section horizontal>
        <q-img class="col" src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-actions vertical class="justify-around q-px-md">
          <q-card flat class="bg-grey-1 q-pa-md" style="border-radius: 25px;">
            <q-item-label class="text-h5">
              <b>Sign-in</b>
            </q-item-label>
            <q-card-section>
              <q-input
                v-model="user.username"
                color="positive"
                label="Username"
                type="text"
              >
              </q-input>
              <q-input
                v-model="user.password"
                color="positive"
                label="Password"
                @keypress.enter="login()"
              >
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
        </q-card-actions>
      </q-card-section>
    </q-card>
    <!-- <q-card
      class="__card shadow-10 bg-grey-1 q-pa-lg"
      style="border-radius: 25px;"
    >
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
    </q-card> -->
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class Login extends Vue {
  user = {
    username: '',
    password: '',
  };

  hidePassword = false;

  async login() {
    if (this.user.username == 'admin' && this.user.password == 'pass') {
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 700px;
  max-width: 80vw;
  height: 450px;
  max-height: 80vw;
}
</style>
