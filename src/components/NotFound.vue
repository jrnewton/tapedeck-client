<template>
  <section
    id="notfound"
    role="region"
    aria-label="Details about a page not found problem"
  >
    <h2 class="lead mt-3">Page not found!</h2>

    Try these links:
    <ul>
      <li><router-link to="capture">Record a stream</router-link></li>
      <li><router-link to="archives">View your archives</router-link></li>
    </ul>

    <p>Route: {{ $route.path }}</p>
  </section>
</template>
