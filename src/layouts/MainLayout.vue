<template>
  <q-layout>
    <q-header elevated class="bg-negative" style="height: 60px">
      <q-toolbar class="q-mt-sm">
        <q-avatar square size="xl">
          <img height="100px" src="~assets/sms_4367.png" />
        </q-avatar>
        <q-toolbar-title>SMS CASTER</q-toolbar-title>
        <q-btn
          v-if="$route.name != 'login-page'"
          rounded
          icon="person"
          color="white"
          text-color="black"
        >
          <q-tooltip>Account</q-tooltip>

          <q-menu fit :offset="[0, 5]">
            <q-btn
              flat
              align="left"
              class="q-pa-sm full-width auto-close"
              label="Change Password"
              color="white"
              size="md"
              icon="settings"
              text-color="black"
              @click="changePassPopups(true)"
              clickable
              v-close-popup
            >
            </q-btn>
            <q-btn
              flat
              align="left"
              class="q-pa-sm full-width"
              label="logout"
              color="white"
              size="md"
              icon="logout"
              text-color="black"
              to="/login"
            >
            </q-btn>
          </q-menu>
        </q-btn>
        <!-- Menu end -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.name != 'login-page'"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <q-item active clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="dashboard" size="md" />
        </q-item-section>

        <q-item-section class="text-subtitle2 text-weight-bold">
          Home
        </q-item-section>
      </q-item>

      <q-item active clickable v-ripple to="/ManageAccount" exact>
        <q-item-section avatar>
          <q-icon name="manage_accounts" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2 text-weight-bold">
          Manage Accounts
        </q-item-section>
      </q-item>

      <q-item active clickable v-ripple to="/ManageDocument" exact>
        <q-item-section avatar>
          <q-icon name="topic" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2 text-weight-bold">
          Manage Documents
        </q-item-section>
      </q-item>

      <q-item active clickable v-ripple to="/ManageContact" exact>
        <q-item-section avatar>
          <q-icon name="contacts" size="md" />
        </q-item-section>
        <q-item-section class="text-subtitle2 text-weight-bold">
          SMS Status
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <ChangePassDialog />
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import ChangePassDialog from 'components/ChangePassDialog.vue';

@Component({
  components: {
    ChangePassDialog
  },
  computed: {
    ...mapState('uiNav', ['adminLoggedIn'])
  },
  methods: {
    ...mapActions('uiNav', ['changePassPopups'])
  }
})
export default class MainLayout extends Vue {
  adminLoggedIn!: boolean;
  changePassPopups!: (show: boolean) => void;
}
</script>
