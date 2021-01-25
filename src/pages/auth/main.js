import App from './App.vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

//work around for Vue 3 problem -
//https://github.com/aws-amplify/amplify-js/issues/6756

//workaround part 1
import { createApp } from 'vue';
import {
  applyPolyfills,
  defineCustomElements
} from '@aws-amplify/ui-components/loader';

Amplify.configure(awsconfig);

//workaround part 2
applyPolyfills().then(() => {
  defineCustomElements(window);
});

const app = createApp(App);

//workaround part 3
app.config.isCustomElement = (tag) => tag.startsWith('amplify-');

app.mount('#app');
