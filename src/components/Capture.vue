<template>
  <section
    id="capture"
    role="region"
    aria-label="Use this section to capture radio streams"
  >
    <h2 class="lead mt-3">Record radio streams to the cloud</h2>
    <form id="capture-form" @submit.prevent="archive">
      <div class="form-group">
        <div class="my-2">
          <label id="captureURLHelp" class="form-text text-info"
            >Enter the URL of an mp3 or m3u file.</label
          >
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': formURLInvalid }"
            id="captureURLInput"
            aria-describedby="captureURLHelp"
            autocomplete="url"
            v-model="formURL"
          />
        </div>
        <div class="my-2">
          <label id="captureDescHelp" class="form-text text-info"
            >Enter a short description that describes the resource.</label
          >
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': formDescInvalid }"
            id="captureDescInput"
            aria-describedby="captureDescHelp"
            v-model="formDesc"
          />
        </div>
        <button
          name="captureURLButton"
          class="btn btn-info btn my-2"
          href="#"
          role="button"
          type="submit"
        >
          Capture Now
        </button>
      </div>
      <p>
        {{ status }}
      </p>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      //form data
      formURL: '',
      formDesc: '',
      //validation and status
      status: '',
      formURLInvalid: false,
      formDescInvalid: false
    };
  },
  methods: {
    async archive() {
      this.formURLInvalid = false;
      this.formDescInvalid = false;

      if (this.formURL === '') {
        this.formURLInvalid = true;
      }

      if (this.formDesc === '') {
        this.formDescInvalid = true;
      }

      if (this.formURLInvalid || this.formDescInvalid) {
        return;
      }

      this.status = `Downloading ${this.formURL}`;

      try {
        const response = await this.$store.dispatch('archive', {
          url: this.formURL,
          desc: this.formDesc
        });
        this.status = response;
        this.formURL = '';
        this.formDesc = '';
      } catch (error) {
        this.status = error;
      }
    }
  }
};
</script>
