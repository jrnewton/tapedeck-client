<template>
  <section class="jumbotron m-0 m-sm-3 m-lg-5">
    <div class="row d-none d-sm-inline">
      <div class="col-12">
        <h1 class="display-3">Tape Deck Archives</h1>
      </div>
    </div>

    <p class="lead">Archives for {{ email }}</p>
    <hr class="my-4" />

    <h4>Recent Recordings</h4>

    <div class="row" v-for="item in recent" :key="item.id">
      <div class="col-md-2">
        <a :href="'playback.html?' + item.id">{{ item.desc }}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tapedeck',
  data() {
    return {
      email: 'newt@hey.com',
      recent: [
        {
          id: 1,
          desc: 'Test File',
          url:
            'https://tapedeck-88da7a2d-990c-474b-aa2f-2716203101d9.s3.us-east-2.amazonaws.com/test.mp3'
        }
      ]
    };
  }
};
</script>

<style>
@import '../../assets/sketchy.min.css';

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
