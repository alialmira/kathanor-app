<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row justify-center items-center text-center q-gutter-md">
        <q-card class="col bg-green card-radius text-white">
          <q-card-section class="bg-green-8 text-h5 text-weight-medium">
            EMPLOYEES
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder">12</q-card-section>
        </q-card>
        <q-card class="col bg-orange card-radius text-white">
          <q-card-section class="bg-orange-8 text-h5 text-weight-medium">
            201-FILES
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder"
            >572</q-card-section
          >
        </q-card>
        <q-card class="col bg-yellow-8 card-radius text-white">
          <q-card-section class="bg-yellow-9 text-h5 text-weight-medium">
            MONTHLY REPORTS
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h3 text-weight-bolder"
            >236</q-card-section
          >
        </q-card>
      </div>
    </div>
    <div class="q-pa-md q-pt-md">
      <q-separator color="primary" />
    </div>
    <div class="q-pa-md">
      <div class="row justify-center items-center q-gutter-md">
        <q-card class="col card-border q-pa-md">
          <q-card-section class="text-h5 text-weight-bold">
            What is Civil Service Commission?
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h4"
            >The Civil Service Commission is one of the three Constitutional
            Commissions of the Philippines with responsibility over the civil
            service. It is tasked with overseeing the integrity of government
            actions and processes.
          </q-card-section>
        </q-card>
        <q-card class="col card-border q-pa-md">
          <q-card-section class="text-h5 text-weight-bold">
            What is 201-File?
          </q-card-section>
          <q-separator color="white" />
          <q-card-section class="text-h4"
            >201 - files contains records/data pertaining to the employee's
            personal information, financial information, employment contract,
            duties, job grade, performance, and employment history for future
            employment requirements.</q-card-section
          >
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IEmployee from '../interfaces/employee.interface';

@Component({
  computed: {
    ...mapState('employee', ['employees', 'employee']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
  },
})
export default class HomeUser extends Vue {
  employee!: IEmployee;
  getEmployees!: () => Promise<void>;

  async created() {
    await this.getEmployees();
  }
}
</script>

<style scoped>
.card-radius {
  border-radius: 25px;
}
</style>
