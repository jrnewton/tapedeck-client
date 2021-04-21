<template>
  <section
    id="archiveList"
    role="region"
    aria-label="A list of all your archived recordings"
  >
    <h2 class="lead mt-3">Your Recordings</h2>

    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-active" v-for="item in archiveList" :key="item.id">
          <td>{{ item.createDate }}</td>
          <td>
            <a :href="item.url">{{ item.desc }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.loadArchiveList();
  },
  computed: {
    ...mapGetters(['email', 'archiveList'])
  },
  methods: {
    async loadArchiveList() {
      console.debug('loadArchiveList called');
      try {
        await this.$store.dispatch('loadArchiveList');
      } catch (error) {
        console.error('loadArchiveList error', error);
      }
    }
  }
};
</script>
