<template>
  <q-page class="flex flex-center">
    <q-card
      class="card-border"
      :style="
        $q.screen.lt.sm
          ? 'margin-top: 50px; margin-bottom: 40px'
          : 'width: 700px; max-width: 100vw; border-radius: 25px;'
      "
    >
      <q-card-section>
        <q-avatar
          :size="$q.screen.lt.md ? '120px' : '150px'"
          class="absolute-center shadow-10"
        >
          <img src="~assets/avatar-02.jpg" />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="q-pt-xl">
          <div :class="$q.screen.lt.md ? 'text-h6' : 'ellipsis'">
            <q-card-section
              :class="$q.screen.lt.md ? '' : 'text-h5 text-weight-bold'"
            >
              <div
                :class="
                  $q.screen.lt.md
                    ? 'text-center q-gutter-xs'
                    : 'text-center q-gutter-xs'
                "
              >
                {{ user.firstName }} {{ user.middleName }} {{ user.lastName }}
                {{ user.extensionName }}
                <br />
                {{ user.position }}
                <br />
                {{ user.agency }}
              </div>
            </q-card-section>
            <div class="q-pa-md q-pt-md">
              <q-separator color="black" />
            </div>
            <q-card-section
              :class="$q.screen.lt.md ? '' : 'text-h5 text-center text-weight-bold'"
            >
              <div class="row q-gutter-sm">
                <div class="col">
                  <div :class="$q.screen.lt.md ? '' : 'row'">
                    <div
                      :class="
                        $q.screen.lt.md
                          ? 'q-gutter-sm'
                          : 'col text-weight-bold q-gutter-sm'
                      "
                    >
                      <q-input
                        v-model="user.birthDate"
                        label="Birth Date"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                      <q-input
                        v-model="user.contactNumber"
                        label="Contact Number"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                      <q-input
                        v-model="user.homeAddress"
                        label="Home Address"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                    </div>
                    <div class="col text-black q-gutter-sm">
                      <q-input
                        v-model="user.birthPlace"
                        label="Birth Place"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                      <q-input
                        v-model="user.emailAddress"
                        label="Email Address"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                      <q-input
                        v-model="user.currentAddress"
                        label="Current Address"
                        borderless
                        stack-label
                        dense
                        readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </div>
        </div>
      </q-card-section>
    </q-card>
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
  }
}
</script>

<style scoped>
.opac {
  background: rgba(255, 255, 255, 0.6);
}
.radius {
  border-radius: 28px;
}
.card-radius {
  border-radius: 25px;
}
</style>
