<template>
  <q-dialog
    v-model="showEmployeeDocsDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 450px; max-width: 80vw; border-radius: 25px;"
      class="__card q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center">
          <span>FILE DETAILS</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="showEmployeeDocsPopups(false)"
        ></q-btn>
      </q-toolbar>
      <div class="text-center">
        <q-card-section>
          <div class="q-pt-xs">
            <div :class="$q.screen.lt.md ? 'text-h6' : 'ellipsis'">
              <q-card-section
                :class="$q.screen.lt.md ? '' : 'text-h5 text-weight-bold'"
              >
                <div
                  :class="
                    $q.screen.lt.md
                      ? 'text-center q-gutter-md'
                      : 'text-center q-gutter-md'
                  "
                >
                  <q-avatar
                    :size="$q.screen.lt.md ? '110px' : '170px'"
                    class="shadow-10"
                  >
                    <img src="~assets/avatar-02.jpg" />
                  </q-avatar>
                </div>
              </q-card-section>
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
                  {{ formData }}
                </div>
              </q-card-section>
              <div class="q-pa-md q-pt-md">
                <q-separator color="black" />
              </div>
              <q-card-section
                :class="
                  $q.screen.lt.md ? '' : 'text-h5 text-center text-weight-bold'
                "
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
                          v-model="documents.filename"
                          label="Filename"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="documents.docType"
                          label="Document Type"
                          borderless
                          stack-label
                          dense
                          readonly
                        />
                        <q-input
                          v-model="documents.mimeType"
                          label="Format"
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
        </q-card-section></div
    ></q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IFIle201 from '../interfaces/File201.interface';
import IEmployee from '../interfaces/employee.interface';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showEmployeeDocsDialog']),
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('uiNav', ['showEmployeeDocsPopups']),
    ...mapActions('employee', ['getEmployees']),
  },
})
export default class ShowDocument extends Vue {
  @Prop({ type: Object, required: true }) readonly document!: IFIle201;

  documents: any = {
    uploadedBy: '',
    employeeId: '',
    filename: '',
    docType: '',
    mimeType: '',
    onUpdate: false,
  };
  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  formData: any = {};
  employees!: IEmployee[];
  showEmployeeDocsDialog!: boolean;
  showEmployeeDocsPopups!: (show: boolean) => void;
  getEmployees!: () => Promise<void>;

  async created(){
    await this.getEmployees();
    this.formData = this.employees.find((e) => e.id == this.document.employeeId);
  }

  showDialog() {
    this.documents = { ...this.document };
  }

  hideDialog() {
    this.$emit('clearData', { ...this.documents, onUpdate: false });
  }
}
</script>
