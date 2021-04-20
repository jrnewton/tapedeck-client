<template>
  <section id="archives" role="region" aria-label="Your Recent Recordings">
    <p class="lead">Recent recordings for {{ sessionData.email }}</p>

    <div
      class="card border-light mb-3"
      style="max-width: 20rem"
      v-for="item in recent"
      :key="item.id"
    >
      <div class="card-header">{{ item.desc }}</div>
      <div class="card-body">
        <!-- <p class="card-title">
            <a :href="item.url">{{ item.url }}</a>
          </p> -->
        <p class="card-text">
          <audio controls ref="audio" preload="meta">
            <source :src="item.url" type="audio/mpeg" />
            <p>
              Your browser does not support audio controls but you can
              <a :href="item.url">download the file</a>
              directly.
            </p>
          </audio>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      //dummy archive data
      recent: [
        {
          id: 1,
          desc: 'Test File',
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.mp3'
        }
      ]
    };
  }
};
</script>
