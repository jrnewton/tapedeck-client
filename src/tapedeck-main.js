Vue.createApp({
  data() {
    return {
      email: '',
      archiveURL: '',
      status: ''
    };
  },
  methods: {
    async archiveSubmit() {
      if (this.archiveURL === '') {
        alert('Please enter a URL to archive');
        return;
      }

      try {
        //TODO: add real URL once auth is in place
        const res = await axios.get('lambda-url');
        console.log(JSON.stringify(res));
      } catch (error) {
        console.log(error);
      }
      this.archiveURL = '';
    }
  },
  computed: {}
}).mount('#tapedeck-main');
