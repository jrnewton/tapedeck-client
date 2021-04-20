<template>
  <!-- <div class="jumbotron m-0 m-sm-3 m-lg-5 py-1"> -->
  <header class="row" role="banner">
    <div class="col-12 col-lg-8">
      <nav class="navbar navbar-expand navbar-dark bg-dark" role="navigation">
        <router-link to="/" class="navbar-brand" data-cy="homeLink"
          >Tape Deck</router-link
        >
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link
                to="/archives"
                class="nav-link"
                data-cy="archivesLink"
                >Your Archives</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link" data-cy="profileLink"
                >Profile</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" data-cy="aboutLink"
                >About</router-link
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" data-cy="logoutLink" @click="logout"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
  <main role="main">
    <router-view></router-view>
  </main>
  <footer role="contentinfo" class="mt-3">
    <small>
      <!-- class="d-block d-sm-none" -->
      v{{ appVersion }}
    </small>
  </footer>
  <!-- </div> -->
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
    }
  }
};
</script>

<style>
@import './assets/sketchy.min.css';
</style>
