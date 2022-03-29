<template>
  <h2 class="lead mt-3">Record radio streams to the cloud</h2>
  <p class="lead">
    I &#128151; <a href="https://wmbr.org/">college</a>&nbsp;
    <a href="https://www.whrb.org/">radio</a>
    and wrote this app to capture my favorite shows for later listening and
    archiving. It currently supports archiving M3U playlists and individual MP3
    files.
  </p>
  <!-- <hr class="my-4" />
  <p>
    You can capture a playlist archive or a single MP3 file. Coming soon -
    schedule recordings of mp3 streams!
  </p> -->
  <p class="lead">
    <router-link
      to="/capture"
      name="captureButton"
      class="btn btn-info btn-lg my-2 mx-2"
      role="button"
      tag="button"
    >
      Capture Now
    </router-link>

    <router-link
      to="/archives"
      name="archivesButton"
      class="btn btn-outline-info btn-lg my-2 mx-2"
      role="button"
      tag="button"
    >
      Your Archives
    </router-link>
  </p>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
