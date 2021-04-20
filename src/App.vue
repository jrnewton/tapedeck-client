<template>
  <div class="jumbotron m-0 m-sm-3 m-lg-5 py-1">
    <header class="row" role="banner">
      <div class="col-12 col-lg-8">
        <a href="/" style="text-decoration: none">
          <h1 class="display-3">
            <span class="d-none d-sm-inline">Welcome to</span> Tape Deck
          </h1>
        </a>
        <p class="lead">Record radio streams to the cloud</p>
      </div>
    </header>
    <main role="main">
      <router-view></router-view>
    </main>
    <footer role="contentinfo" class="mt-3">
      <!-- class="d-block d-sm-none" -->
      Version: {{ appVersion }} -
      <a href="https://github.com/jrnewton/tapedeck">About</a>
    </footer>
  </div>
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

<style>
@import './assets/sketchy.min.css';
</style>
