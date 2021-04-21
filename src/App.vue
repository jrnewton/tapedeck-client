<template>
  <div class="container">
    <!-- jumbotron m-0 m-sm-3 m-lg-5 py-1" -->
    <header class="row" role="banner">
      <div class="col-12 col-md-8 col-lg-6">
        <nav
          class="navbar navbar-expand navbar-dark bg-dark mt-3"
          role="navigation"
        >
          <router-link to="/" class="navbar-brand" data-cy="homeLink"
            >Tape<br />Deck</router-link
          >
          <div class="collapse navbar-collapse" id="navbarColor03">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link
                  to="/archives"
                  class="nav-link"
                  data-cy="archivesLink"
                  >Archives</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/profile"
                  class="nav-link"
                  data-cy="profileLink"
                  >Profile</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link" data-cy="aboutLink"
                  >About</router-link
                >
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  data-cy="logoutLink"
                  @click="logout"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6">
        <main role="main">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6">
        <footer role="contentinfo" class="mt-3">
          <small> v{{ appVersion }} </small>
        </footer>
      </div>
    </div>
  </div>
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
