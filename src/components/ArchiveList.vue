<template>
  <section id="archives" role="region" aria-label="Recording archives">
    <h2 class="lead mt-3">Your recordings</h2>

    <table class="table table-hover mt-3">
      <thead>
        <tr>
          <th scope="col">Date Saved</th>
          <th scope="col">Description</th>
          <th scope="col">URL</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-active" v-for="item in recent" :key="item.id">
          <th scope="row">{{ item.createDate }}</th>
          <td>{{ item.desc }}</td>
          <td>
            <a :href="item.url">{{ item.url }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      //dummy archive data
      recent: [
        {
          id: 1,
          createDate: '2020-10-31',
          desc: 'Backwoods Halloween 2020',
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.mp3'
        },
        {
          id: 2,
          createDate: '2021-01-02',
          desc: 'James Dean Death Car New Year Day',
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.mp3'
        },
        {
          id: 3,
          desc: 'Late Risers Club - last week',
          createDate: '2021-03-25',
          url:
            'https://tapedeck-sample-files.s3.us-east-2.amazonaws.com/test.mp3'
        },
        {
          id: 4,
          desc: 'S3 test file',
          createDate: '2021-04-20',
          url:
            'https://tapedeck-archives.s3.us-east-2.amazonaws.com/d6ade639-bada-4ea2-9381-52c9d625cec2/1ebc2c3d-9972-4ce8-9fa2-b76b7babb44c.mp3'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['email'])
  }
};
</script>
