<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 400px;"
      class="shadow-2 rounded-borders"
    >
      <q-header v-if="$route.name != 'login'" elevated>
        <q-toolbar class="glossy">
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-avatar>
            <img src="~assets/CSC-logo.jpg" />
          </q-avatar>

          <q-toolbar-title
            >KAPAGATOR: CIVIL SERVICE COMMISSION - LANAO DEL
            SUR</q-toolbar-title
          >
          <q-btn
            v-if="$route.name != 'login'"
            round
            flat
            outlined
            icon="more_vert"
            text-color="white"
          />

          <q-btn flat round dense icon="people" />
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

