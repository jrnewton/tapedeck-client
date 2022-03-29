<template>
  <section id="about" role="region" aria-label="About this site">
    <h2 class="lead mt-3">About This Site</h2>

    <p>
      View the <a href="https://github.com/jrnewton/tapedeck">source code</a>
    </p>

    <small>Version: v{{ appVersion }}</small>
  </section>
</template>
<script>
export default {
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION
    };
  }
};
</script>
