<template>
  <section
    id="archiveList"
    role="region"
    aria-label="A list of all your archived recordings"
  >
    <h2 class="lead mt-3">Your Archived Recordings</h2>
    <small>Count: {{ archiveSize }}</small>
    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-active" v-for="item in archiveList" :key="item.id">
          <td>
            <a :href="item.url">{{ item.title }}</a>
          </td>
          <td>{{ item.desc }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.loadArchive();
  },
  computed: {
    ...mapGetters(['email', 'archiveList', 'archiveSize'])
  },
  methods: {
    async loadArchive() {
      console.debug('loadArchive called');
      try {
        await this.$store.dispatch('loadArchive');
      } catch (error) {
        console.error('loadArchive error', error);
      }
    }
  }
};
</script>
