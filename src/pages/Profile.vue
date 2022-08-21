<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row flex flex-center">
        <q-card
          class="card-border"
          style="width: 700px; max-width: 100vw; border-radius: 25px;"
        >
          <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
            <div class="items-center">
              <div class="row q-gutter-sm">
                <div class="col-4">
                  <q-avatar size="150px">
                    <img src="~assets/avatar-02.jpg" />
                  </q-avatar>
                </div>
                <div class="col">
                  <q-card-section class="text-h5 text-weight-bold">
                    <div class="row q-gutter-sm">
                      {{ user.firstName }} {{ user.middleName }}
                      {{ user.lastName }} {{ user.extensionName }}
                      <br />
                      {{ user.position }}
                      <br />
                      {{ user.agency }}
                    </div>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
            <div class="items-center">
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-card-section class="text-h5">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Birth Date:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.birthDate }}
                      </div>
                    </div>
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Birth Place:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.birthPlace }}
                      </div>
                    </div>
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Contact Number:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.contactNumber }}
                      </div>
                    </div>
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Email Address:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.emailAddress }}
                      </div>
                    </div>
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Home Address:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.homeAddress }}
                      </div>
                    </div>
                    <div class="row q-gutter-sm">
                      <div class="col">
                        Current Address:
                      </div>
                      <div class="col text-weight-bold">
                        {{ user.currentAddress }}
                      </div>
                    </div>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IEmployee from '../interfaces/employee.interface';

@Component({
  computed: {
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('employee', ['getEmployees']),
  },
})
export default class Profile extends Vue {
  isAdmin = false;
  user: any = {};
  employees!: IEmployee[];
  getEmployees!: () => Promise<any>;

  @Watch('employees')
  onDocumentsChanged() {
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
    this.user = this.employees.find(
      (e) =>
        (e.session == true && e.accountType == 'admin') ||
        e.accountType == 'user'
    );
  }

  async created() {
    await this.getEmployees();
    this.isAdmin = this.employees.some(
      (e) => e.session == true && e.accountType == 'admin'
    );
    console.log(this.user);
  }
}
</script>

<style scoped>
.card-radius {
  border-radius: 25px;
}
</style>
