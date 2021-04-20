<template>
  <section id="capture">
    <form id="capture-form" @submit.prevent="archive">
      <div class="form-group">
        <div class="my-2">
          <input
            type="text"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': formURLInvalid }"
            id="captureURLInput"
            aria-describedby="captureURLHelp"
            placeholder="URL to archive"
            v-model="formURL"
          />
          <small id="captureURLHelp" class="form-text text-muted"
            >Enter the URL of an mp3 or m3u file.</small
          >
        </div>
        <div class="my-2">
          <input
            type="text"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': formDescInvalid }"
            id="captureDescInput"
            aria-describedby="captureDescHelp"
            placeholder="Description"
            v-model="formDesc"
          />
          <small id="captureDescHelp" class="form-text text-muted"
            >Enter a short description.</small
          >
        </div>
        <button
          name="captureURLButton"
          class="btn btn-primary btn-lg my-2"
          href="#"
          role="button"
          type="submit"
        >
          Archive Now
        </button>

        <router-link
          to="/archives"
          class="btn btn-outline-info btn-lg my-2 mx-3"
          data-cy="yourArchivesButton"
          role="button"
          >Your Archives</router-link
        >
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
      console.log('archive called');

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
      } catch (error) {
        this.status = error;
      }
    }
  }
};
</script>
