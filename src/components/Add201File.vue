<template>
  <q-dialog
    v-model="showAdd201FileDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 600px; max-width: 80vw; border-radius: 25px;"
      class="__card q-pt-xs q-pb-md"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center">
          <span v-if="documents.onUpdate">UPDATE 201 FILE</span>
          <span v-else>ADD 201 FILE</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="add201FilePopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <div class="items-start">
          <div class="row q-gutter-sm">
            <div class="col">
              <q-select
                ref="employeeId"
                v-model="documents.employeeId"
                :options="data"
                option-value="id"
                :option-label="
                  (data) =>
                    data === null
                      ? ''
                      : data.firstName +
                        ' ' +
                        data.middleName +
                        ' ' +
                        data.lastName +
                        ' ' +
                        data.extensionName +
                        ' - ' +
                        data.agency
                "
                outlined
                label="Employee - ID"
                emit-value
                map-options
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No Employees Found
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">
                  {{ scope.opt.firstName }} {{ scope.opt.middleName }}
                  {{ scope.opt.lastName }} - {{ scope.opt.agency }}
                </template>
              </q-select>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-select
                label="Document Type"
                v-model="documents.docType"
                outlined
                emit-value
                map-options
                :options="[
                  'Transcript of Records',
                  'Eligibility',
                  'Appointment',
                  'Personal Data Sheet',
                  'SCARD',
                ]"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-file
                clearable
                style="width: 550px; max-width: 80vw;"
                v-model="documents.files"
                label="Choose Files"
                multiple
                batch
                icon="attachment"
                outlined
                bordered
                @update:model-value="fileChoose($event)"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="row q-col-gutter-md q-pr-lg q-pl-lg">
        <div class="col">
          <q-btn
            class="full-width"
            label="Reset"
            color="red"
            rounded
            dense
            @click="hideDialog()"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            :label="documents.onUpdate ? 'Update' : 'Confirm'"
            color="positive"
            rounded
            dense
            @click="documents.onUpdate ? '' : addNewDocument()"
            :loading="isUpload"
            :disable="isUpload"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import file201Service from 'src/services/201file.service';
import IDocument from '../interfaces/document.interface';
import IEmployee from 'src/interfaces/employee.interface';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAdd201FileDialog']),
    ...mapState('employee', ['employees']),
  },
  methods: {
    ...mapActions('uiNav', ['add201FilePopups']),
    ...mapActions('employee', ['getEmployees']),
    ...mapActions('document', ['add201File']),
  },
})
export default class Add201File extends Vue {
  @Prop({ type: Object, required: true }) readonly document!: IDocument;

  documents:IDocument = {
    employeeId: '',
    docType: '',
    files: [],
    onUpdate: false,
  };

  $refs!: {
    employeeId: RefsVue;
    appointment: RefsVue;
    eligibility: RefsVue;
    pds: RefsVue;
    scard: RefsVue;
    tor: RefsVue;
  };

  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  formHasError!: boolean;
  showAdd201FileDialog!: boolean;
  data: IEmployee[] = [];
  employees!: IEmployee[];
  add201FilePopups!: (show: boolean) => void;
  getEmployees!: () => Promise<void>;
  add201File!: (payload: any) => Promise<void>;

  async created() {
    await this.getEmployees();
    this.data = this.employees;
  }

  checkForm() {
    this.$refs.employeeId.validate();
  }

  async addNewDocument() {
    this.isSubmit = true;
    this.checkForm();
    if (this.$refs.employeeId.hasError) {
      this.formHasError = true;
    } else {
      this.isSubmit = false;
      console.log(this.documents.docType);
      await this.add201File(this.documents);
      // await file201Service.upload201File(
      //   this.documents.docType,
      //   this.documents.employeeId,
      //   this.documents.file
      // );
      await this.$store.dispatch('uiNav/add201FilePopups', false);
      this.documents = {
        employeeId: '',
        docType: '',
        files: [],
      };
      this.$q.notify({
        type: 'positive',
        message: 'Document Successfully Created.',
      });
    }
  }

  fileChoose(val: any) {
    this.documents.files = val;
  }

  showDialog() {
    this.documents = { ...this.documents };
  }

  hideDialog() {
    this.documents = {
      employeeId: '',
      docType: '',
      files: [],
    };
    this.$emit('clearData', { ...this.documents, onUpdate: false });
  }
}
</script>
