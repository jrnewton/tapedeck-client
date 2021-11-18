<template>
  <div class="container">
    <!-- <div class="jumbotron m-0 m-sm-3 m-lg-5 py-1"> -->
    <!-- <header class="row" role="banner">
      <div class="col-12 col-md-8 col-lg-6">
        <h1>Tape Deck</h1>
      </div>
    </header> -->
    <!-- <div class="row">
      <div class="col-12 col-md-8 col-lg-6"> -->
    <div class="jumbotron">
      <main role="main">
        <router-link to="/" style="text-decoration: none">
          <h1 class="display-4">Tape Deck</h1>
        </router-link>
        <router-view></router-view>
      </main>
      <!-- </div>
    </div> -->
      <!-- <div class="row">
      <div class="col-12 col-md-8 col-lg-6"> -->
      <footer role="contentinfo" class="mt-3">
        <small
          ><a href="https://github.com/jrnewton/tapedeck"
            >v{{ appVersion }}</a
          ></small
        >
      </footer>
    </div>
  </div>
  <!-- </div>
  </div> -->
</template>

<script>
import Amplify from '@aws-amplify/core';
import config from './awsconfig';
export default {
  created() {
    Amplify.configure(config);
    this.$store.dispatch('autoLogin');
  },
  data() {
    return {
      appVersion: process.env.VUE_APP_VERSION
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>

<style>
@import './assets/sketchy.min.css';
</style>
