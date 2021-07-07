<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import smsService from 'src/services/sms.service';

@Component
export default class App extends Vue {
  async mounted() {
    await smsService.getDocuments();
  }
}
</script>
