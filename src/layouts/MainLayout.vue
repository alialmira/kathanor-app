<template>
  <q-layout>
    <q-header
      v-if="$route.name != 'login'"
      elevated
      class="bg-positive"
      style="height: 50px;"
    >
      <q-toolbar>
        <!-- <q-avatar square size="xl">
          <img height="100px" src="" />
        </q-avatar> -->
        <q-toolbar-title>KATHANOR</q-toolbar-title>
        <q-btn
          v-if="$route.name != 'login'"
          round
          flat
          outlined
          icon="more_vert"
          text-color="white"
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
      :width="220"
      :breakpoint="500"
      bordered
      elevated
      content-class="bg-white"
    >
      <!-- <div class="text-center q-pt-md">
        <div>
          <q-avatar size="120px" style="border-radius: 10px 10px 10px 10px">
          </q-avatar>
        </div>
        <q-chip class="bg-white text-weight-bolder text-h6" text-color="primary"
          >MSU OIPP</q-chip
        >
      </div> -->
      <q-item
        active
        clickable
        v-ripple
        to="/home"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" size="md" />
        </q-item-section>

        <q-item-section class="text-body1 text-weight-bold">
          Dashboard
        </q-item-section>
      </q-item>

      <!-- <q-item
        active
        clickable
        v-ripple
        to="/employee"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="people" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          Employees
        </q-item-section>
      </q-item> -->

      <q-item
        active
        clickable
        v-ripple
        to="/accounts"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="manage_accounts" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          Accounts
        </q-item-section>
      </q-item>

      <q-item
        active
        clickable
        v-ripple
        to="/201-files"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="topic" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          201-files
        </q-item-section>
      </q-item>

      <q-item
        active
        clickable
        v-ripple
        to="/indiv-report"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="description" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          Individual Report
        </q-item-section>
      </q-item>
      <q-item
        active
        clickable
        v-ripple
        to="/csc-report"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
          <q-icon name="task" size="md" />
        </q-item-section>
        <q-item-section class="text-body1 text-weight-bold">
          CSC Report
        </q-item-section>
      </q-item>
      <div class="text-center q-pb-xl fixed-bottom">
        <q-avatar square size="xl"> </q-avatar>
        <div>
          <q-chip
            class="bg-white text-weight-bolder text-h6 text-uppercase"
            text-color="primary"
          ></q-chip>
        </div>
        <div class="text-center"></div>
        <div class="text-center"></div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {
  async logout() {
    this.$router.push('/login');
  }
}
</script>
