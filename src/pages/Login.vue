<template>
  <q-page class="flex flex-center">
    <q-card
      class="radius opac"
      v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%'}"
    >
      <q-card-section >
        <div class="text-center q-pt-md ">
          <div class="col text-h2 text-grey-9 text-weight-bold ellipsis">
            KAPAGATOR
          </div>
          <div class="col text-h5 text-grey-9 text-weight-bold ellipsis">
            CSC Record Management System
          </div>
        </div>
      </q-card-section>
      <q-card-section >
        <q-form class="q-pr-md q-pl-md q-gutter-md">
          <q-input
            v-model="user.username"
            label="Username"
            unmasked-value
            rounded
            outlined
            @keypress.enter="login()"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
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
              class="radius"
              label="Login"
              dense
              @click="login()"
              style="width: 415px; height: 43px"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
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
  isShowPass = false;

  async login() {
    if (this.user.username == 'admin' && this.user.password == 'pass') {
      this.$router.push('/home');
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Logged in',
      });
    }else{
      this.$q.notify({
        type: 'negative',
        message: 'Failed to log-in',
      });
    }
  }
}
</script>

<style scoped>
/* .bg-image {
  background-image: url("~assets/");
} */
.opac {
  background: rgba(255, 255, 255, 0.6);
}

.radius {
  border-radius: 28px;
}
</style>
