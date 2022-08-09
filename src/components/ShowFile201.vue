<template>
  <q-dialog
    v-model="showFile201InfoDialog"
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
          <span>201-FILE DETAILS</span>
        </q-toolbar-title>
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="showFile201InfoPopups(false)"
        ></q-btn>
      </q-toolbar>
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
                  {{ document.firstName }} {{ document.middleName }}
                  {{ document.lastName }} {{document.extName }}
                  <br />
                  {{ document.position }}
                  <br />
                  {{ document.agency }}
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
                    {{ document.birthDate }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Birth Place:
                  </div>
                  <div class="col text-weight-bold">
                    {{ document.birthPlace }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Contact Number:
                  </div>
                  <div class="col text-weight-bold">
                    {{ document.contactNumber }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Email Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ document.emailAddress }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Home Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ document.homeAddress }}
                  </div>
                </div>
                <div class="row q-gutter-sm">
                  <div class="col">
                    Current Address:
                  </div>
                  <div class="col text-weight-bold">
                    {{ document.currentAddress }}
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import { date } from 'quasar';
import { lstat } from 'fs';

interface RefsVue extends Vue {
  validate(): void;
  next(): void;
  hasError: boolean;
}

interface IFile201 {
  lastName: string;
  firstName: string;
  middleName: string;
  extName?: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  agency: string;
  position: string;
  username: string;
  password: string;
  appointment: string;
  eligibility: string;
  pds: string;
  scard: string;
  tor: string;
  session: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showFile201InfoDialog']),
  },
  methods: {
    ...mapActions('uiNav', ['showFile201InfoPopups']),
    ...mapActions('document', [
      'addDocument',
      'updateDocument',
      'deleteDocument',
    ]),
  },
})
export default class Add201File extends Vue {
  @Prop({ type: Object, required: true }) readonly documents!: IFile201;

  document: any = {
    lastName: '',
    firstName: '',
    middleName: '',
    extName: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    agency: '',
    position: '',
    username: '',
    password: '',
    appointment:'',
    eligibility: '',
    pds: '',
    scard: '',
    tor:'',
    onUpdate: false,
  };

  readonly = false;
  _id = undefined;
  isSubmit = false;
  isUpload = false;
  showEmployeeInfoDialog!: boolean;
  showEmployeeInfoPopups!: (show: boolean) => void;

  showDialog() {
    this.document = { ...this.documents };
  }

  hideDialog() {
    this.document = {
      name: '',
      firstName: '',
      lastName: '',
      extName: '',
      contactNumber: '',
      agency: '',
      position: '',
    };
    this.$emit('clearData', { ...this.document, onUpdate: false });
  }
}
</script>
