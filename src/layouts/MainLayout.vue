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

          <q-menu
            fit
            transition-show="jump-down"
            transition-hide="jump-up"
            max-width="218px"
            :offset="[10, 5]"
          >
            <q-btn
              flat
              align="left"
              class="q-pa-sm auto-close"
              label="Change Password"
              color="white"
              size="md"
              style="width: 218px;"
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
              class="q-pa-sm"
              label="logout"
              color="white"
              size="md"
              style="width: 218px;"
              icon="logout"
              text-color="black"
              @click="logout()"
            >
            </q-btn>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.name != 'login-page'"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
      elevated
      content-class="bg-white"
    >
      <div class="text-center q-pt-md">
        <div>
          <q-avatar size="120px" style="border-radius: 10px 10px 10px 10px">
            <img src="~assets/msuu.png" />
          </q-avatar>
        </div>
        <q-chip class="bg-white text-weight-bolder text-h6" text-color="primary"
          >MSU OIPP</q-chip
        >
      </div>
      <q-item
        active
        clickable
        v-ripple
        to="/"
        exact-active-class="text-white bg-negative"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" size="md" />
        </q-item-section>

        <q-item-section class="text-body1 text-weight-bold">
          Home
        </q-item-section>
      </q-item>

      <q-item
        active
        clickable
        v-ripple
        to="/ManageContact"
        exact-active-class="text-white bg-negative"
      >
        <q-item-section avatar>
          <q-icon name="contacts" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          SMS
        </q-item-section>
      </q-item>

      <q-item
        active
        clickable
        v-ripple
        to="/ManageDocument"
        exact-active-class="text-white bg-negative"
      >
        <q-item-section avatar>
          <q-icon name="topic" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          Manage Documents
        </q-item-section>
      </q-item>

      <q-item
        v-if="isAdmin"
        active
        clickable
        v-ripple
        to="/ManageAccount"
        exact-active-class="text-white bg-negative"
      >
        <q-item-section avatar>
          <q-icon name="manage_accounts" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          Manage Accounts
        </q-item-section>
      </q-item>
      <div class="text-center q-pb-xl fixed-bottom">
        <q-avatar square size="xl">
          <img height="100px" src="~assets/user.png" />
        </q-avatar>
        <div>
          <q-chip
            class="bg-white text-weight-bolder text-h6 text-uppercase"
            text-color="primary"
            >{{ user.accountType }}</q-chip
          >
        </div>
        <div class="text-center">
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="text-center">
          {{ user.position }}
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <ChangePassDialog />
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import ChangePassDialog from 'components/ChangePassDialog.vue';
import { OfficersReq } from 'src/services/rest-api';

@Component({
  components: {
    ChangePassDialog
  },
  computed: {
    ...mapState('uiNav', ['adminLoggedIn']),
    ...mapState('officer', ['officers'])
  },
  methods: {
    ...mapActions('uiNav', ['changePassPopups']),
    ...mapActions('officer', ['getOfficers', 'updateOfficer'])
  }
})
export default class MainLayout extends Vue {
  adminLoggedIn!: boolean;
  officers!: OfficersReq[];
  changePassPopups!: (show: boolean) => void;
  getOfficers!: () => Promise<void>;
  updateOfficer!: (payload: any) => Promise<void>;
  isAdmin = false;
  user = {};

  @Watch('officers')
  onDocumentsChanged() {
    this.isAdmin = this.officers.some(
      o => o.session == true && o.accountType == 'admin'
    );
    this.user = this.officers.find(
      o =>
        (o.session == true && o.accountType == 'admin') ||
        o.accountType == 'officer'
    );
  }

  async created() {
    await this.getOfficers();
    this.isAdmin = this.officers.some(
      o => o.session == true && o.accountType == 'admin'
    );
  }

  async logout() {
    await this.getOfficers();
    await this.updateOfficer({
      ...this.officers.find(
        o =>
          (o.session == true && o.accountType == 'admin') ||
          (o.session == true && o.accountType == 'officer')
      ),
      session: false
    });
    await this.$router.replace('/login');
  }
}
</script>
