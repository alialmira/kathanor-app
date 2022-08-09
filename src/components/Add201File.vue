<template>
  <q-dialog
    v-model="showAdd201FileDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 700px; max-width: 80vw; border-radius: 25px;"
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
                outlined
                label="Employee ID"
                lazy-rules
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <q-uploader
              label="Transcript Of Records"
              ref="tor"
              v-model="documents.tor"
              multiple
              batch
              color="grey-8"
              icon="attachment"
              flat
              bordered
              style="max-width: 500px;"
            />
            <q-uploader
              ref="pds"
              v-model="documents.pds"
              label="Personal Data Sheet"
              multiple
              batch
              color="grey-8"
              flat
              bordered
            />

            <q-uploader
              ref="appointment"
              v-model="documents.appointment"
              label="Appointment"
              multiple
              batch
              color="grey-8"
              icon="attachment"
              flat
              bordered
            />

            <q-uploader
              ref="eligibility"
              v-model="documents.eligibility"
              label="Eligibility"
              multiple
              batch
              color="grey-8"
              icon="attachment"
              flat
              bordered
            />

            <q-uploader
              ref="scard"
              v-model="documents.scard"
              label="S-Card"
              multiple
              batch
              color="grey-8"
              icon="attachment"
              flat
              bordered
            />
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
import IDocument from '../interfaces/document.interface';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showAdd201FileDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['add201FilePopups']),
    ...mapActions([]),
  },
})
export default class Add201File extends Vue {
  @Prop({ type: Object, required: true }) readonly document!: IDocument;

  documents: any = {
    employeeId: '',
    appointment: '',
    eligibility: '',
    pds: '',
    scard: '',
    tor: '',
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
  add201FilePopups!: (show: boolean) => void;

  checkForm() {
    this.$refs.employeeId.validate();
    this.$refs.appointment.validate();
    this.$refs.eligibility.validate();
    this.$refs.pds.validate();
    this.$refs.scard.validate();
    this.$refs.tor.validate();
  }

  async addNewDocument() {
    this.isSubmit = true;
    this.checkForm();
    if (
      this.$refs.employeeId.hasError ||
      this.$refs.appointment.hasError ||
      this.$refs.eligibility.hasError ||
      this.$refs.pds.hasError ||
      this.$refs.scard.hasError ||
      this.$refs.tor.hasError
    ) {
      this.formHasError = true;
    } else {
      this.isSubmit = false;
      await this.$store.dispatch('uiNav/add201FilePopups', false);
      this.documents = {
        employeeId: '',
        appointment: '',
        eligibility: '',
        pds: '',
        scard: '',
        tor: '',
      };
      this.$q.notify({
        type: 'positive',
        message: 'Document Successfully Created.',
      });
    }
  }

  showDialog() {
    this.documents = { ...this.documents };
  }

  hideDialog() {
    this.documents = {
      employeeId: '',
      appointment: '',
      eligibility: '',
      pds: '',
      scard: '',
      tor: '',
    };
    this.$emit('clearData', { ...this.documents, onUpdate: false });
  }
}
</script>
