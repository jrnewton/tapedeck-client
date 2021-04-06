<template>
  <section id="capture">
    <form id="capture-form" @submit.prevent="archive">
      <div class="form-group">
        <div class="my-2">
          <input
            type="text"
            class="form-control form-control-lg"
            :class="{ 'is-invalid': formValidationURLError }"
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
        <a
          class="btn btn-outline-info btn-lg my-2 mx-3"
          data-cy="yourArchivesButton"
          href="#"
          role="button"
          @click="showArchives"
          >Your Archives</a
        >
      </div>
      <p>
        {{ progress }}
      </p>
    </form>
  </section>
</template>

<script>
import { apiEndpoint } from './awsconfig';

export default {
  data() {
    return {
      //form data
      formURL: '',
      formDesc: '',
      //validation and status
      progress: '',
      formValidationURLError: false
    };
  },
  methods: {
    async archive() {
      console.log('archive called');

      if (this.formURL === '') {
        this.formValidationURLError = true;
        return;
      }

      this.formValidationURLError = false;

      if (this.sessionData === null) {
        this.setupLogin(this.archive);
        return;
      }

      try {
        const url = `${apiEndpoint}/archive?accessToken=${this.sessionData.accessToken}`;
        this.progress = 'Sending request for ' + this.formURL;
        console.log('archive POST', url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            //prettier-ignore
            'Authorization': this.sessionData.idToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: this.formURL,
            desc: this.formDesc
          })
        });

        console.log('archive response', response);

        if (response.ok) {
          const json = await response.json();
          console.log('archive response msg', json);
          this.progress = json;

          this.archivesEnabled = false;
          this.formURL = '';
          console.log('archive done');
        } else {
          console.log('archive throwing error due to status');
          throw new Error(response.status + ': ' + response.statusText);
        }
      } catch (error) {
        console.log('archive error', error);
        this.progress = error;
      }
    }
  }
};
</script>
