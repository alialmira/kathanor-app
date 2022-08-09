<template>
  <div>
    <q-layout>
      <q-header
        v-if="$route.name != 'login'"
        elevated
        class="bg-positive"
        :style="$q.screen.lt.md ? 'height: 60px' : 'height: 80px;'"
      >
        <q-toolbar>
          <q-avatar v-show="!$q.screen.lt.md" class="q-pa-xs" circle size="70px">
            <img src="~assets/CSC-logo-2.png" />
          </q-avatar>

          <q-toolbar-title v-if="!$q.screen.lt.md" class="text-h4 text-weight-medium">
            <strong> KAPAGATOR: </strong>
            CIVIL SERVICE COMMISSION - LANAO DEL SUR
          </q-toolbar-title>

          <q-toolbar-title v-else class="text-h6 text-weight-medium">
            <strong> KAPAGATOR </strong>
          </q-toolbar-title>


          <q-btn
            size="20px"
            v-if="$route.name != 'login'"
            round
            flat
            outlined
            icon="settings"
            text-color="white"
          >
            <q-tooltip>Logout</q-tooltip>

            <q-menu
              fit
              transition-show="jump-down"
              transition-hide="jump-up"
              max-width="218px"
              :offset="[10, 5]"
            >
              <!-- <q-btn
              flat
              align="left"
              class="q-pa-sm auto-close"
              label="Change Password"
              color="white"

              style="width: 218px;"
              icon="settings"
              text-color="black"
              clickable
              v-close-popup
            >
            </q-btn> -->
              <q-btn
                flat
                align="left"
                class="q-pa-sm"
                label="logout"
                color="white"
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
            <q-icon name="home" />
          </q-item-section>

          <q-item-section class="text-weight-bold">
            HOME
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
        <q-icon name="people" />
        </q-item-section>
        <q-item-section class="text-weight-bold">
          CSC EMPLOYEES
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
            <q-icon name="manage_accounts" />
          </q-item-section>
          <q-item-section class="text-weight-bold">
            EMPLOYEES
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
            <q-icon name="topic" />
          </q-item-section>
          <q-item-section class="text-weight-bold">
            201-FILE
          </q-item-section>
        </q-item>

        <!-- <q-item
        active
        clickable
        v-ripple
        to="/indiv-report"
        exact-active-class="text-white bg-positive"
      >
        <q-item-section avatar>
        <q-icon name="description" />
        </q-item-section>
        <q-item-section class="text-weight-bold">
          Individual Report
        </q-item-section>
      </q-item> -->

        <q-item
          active
          clickable
          v-ripple
          to="/report"
          exact-active-class="text-white bg-positive"
        >
          <q-item-section avatar>
            <q-icon name="task" />
          </q-item-section>
          <q-item-section class="text-weight-bold">
            REPORT
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class MainLayout extends Vue {
  async logout() {
    this.$router.push('/');
  }
}
</script>
