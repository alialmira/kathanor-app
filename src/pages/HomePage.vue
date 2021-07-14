<template>
  <q-page padding class="bg-secondary">
    
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';


@Component({
  computed: {}
})
export default class HomePage extends Vue {
  
}
</script>

<style lang="scss" scoped>
.q-item {
  height: 60px;
}
.mycard {
  height: 350px;
}
.mycards {
  height: 350px;
}

#clock {
  font-family: 'Share Tech Mono', monospace;
  color: #ffffff;
  text-align: right;
  position: fixed;
  right: -7%;
  top: 20%;
  transform: translate(-50%, -50%);
  color: #0f0e0e;
  text-shadow: 0 0 10px rgb(15, 12, 12), 0 0 20px rgba(10, 175, 230, 0);
  .time {
    letter-spacing: 0.05em;
    font-size: 40px;
    padding: 0px;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 20px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
}
</style>
