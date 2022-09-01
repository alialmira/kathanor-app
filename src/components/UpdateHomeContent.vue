<template>
  <q-dialog
    v-model="showContentDialog"
    persistent
    @hide="hideDialog()"
    @show="showDialog()"
  >
    <q-card
      style="width: 700px; max-width: 100vw; border-radius: 25px;"
      class="__card q-pt-xs"
    >
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-center"
          >UPDATE CONTENT</q-toolbar-title
        >
        <q-btn
          outlined
          flat
          icon="close"
          size="sm"
          @click="homeContentPopups(false)"
        ></q-btn>
      </q-toolbar>
      <q-card-section
        v-if="newContent.contentType == 'CSC'"
        :class="
          $q.screen.lt.md
            ? 'q-pr-lg q-pl-lg q-pb-xs text-h5 text-weight-bold'
            : 'q-pr-lg q-pl-lg q-pb-xs text-h4 text-weight-bold'
        "
      >
        What is Civil Service Commission?
      </q-card-section>
      <q-card-section
        v-else
        :class="
          $q.screen.lt.md
            ? 'q-pr-lg q-pl-lg q-pb-xs text-h5 text-weight-bold'
            : 'q-pr-lg q-pl-lg q-pb-xs text-h4 text-weight-bold'
        "
      >
        What is 201 file?
      </q-card-section>
      <q-card-section class="q-pr-lg q-pl-lg q-pb-xs">
        <q-input
          outlined
          ref="content"
          v-model="newContent.content"
          type="textarea"
          style="max-height: 500px;"
          lazy-rules
          :rules="[(val) => !!val || 'Field is required']"
        />
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md q-pr-lg q-pl-lg q-pb-md">
        <div class="col">
          <q-btn
            class="full-width"
            label="Cancel"
            color="red"
            rounded
            dense
            @click="homeContentPopups(false)"
          ></q-btn>
        </div>
        <div class="col">
          <q-btn
            class="full-width"
            label="Update"
            color="positive"
            rounded
            dense
            :loading="isUpload"
            :disable="isUpload"
            @click="updateDashContent()"
          ></q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import IContent from '../interfaces/content.interface';

interface RefsVue extends Vue {
  validate(): void;
  hasError: boolean;
}

@Component({
  computed: {
    ...mapState('uiNav', ['showContentDialog']),
    ...mapState('content', ['contents']),
  },
  methods: {
    ...mapActions('uiNav', ['homeContentPopups']),
    ...mapActions('employee', ['updateEmployee']),
    ...mapActions('content', ['getContents', 'updateContent']),
  },
})
export default class UpdateHomeContent extends Vue {
  @Prop({ type: Object, required: true }) readonly content!: IContent;

  newContent: any = {
    id: '',
    contentType: '',
    content: '',
    onUpdate: false,
  };

  $refs!: {
    content: RefsVue;
  };

  isSubmit = false;
  isUpload = false;
  formHasError!: boolean;
  showContentDialog!: boolean;
  contents!: IContent[];
  homeContentPopups!: (show: boolean) => void;
  updateEmployee!: (payload: any) => Promise<void>;
  getContents!: () => Promise<void>;
  updateContent!: (payload: any) => Promise<void>;

  async created() {
    await this.getContents();
  }

  checkForm() {
    this.$refs.content.validate();
  }

  async updateDashContent() {
    this.isSubmit = true;
    this.checkForm();
    if (this.$refs.content.hasError) {
      this.formHasError = true;
    } else {
      try {
        await this.updateContent({ ...this.newContent });
        this.homeContentPopups(false);
        this.$q.notify({
          type: 'positive',
          message: 'Content Updated Successfully.',
        });
        this.newContent = {
          id: '',
          contentType: '',
          content: '',
          onUpdate: false,
        };
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Failed to Update Content.',
        });
      }
    }
  }

  showDialog() {
    this.newContent = { ...this.content };
  }

  hideDialog() {
    this.newContent = {
      id: '',
      contentType: '',
      content: '',
      onUpdate: false,
    };
    this.homeContentPopups(false);
  }

  qNotify(props: { [key: string]: string }) {
    this.$q.notify({
      type: props.type,
      message: props.message,
    });
  }
}
</script>

<style scoped>
.__card {
  width: 350px;
}
</style>

<style scoped>
.__card {
  width: 500px;
}
</style>
