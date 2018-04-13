// Values defined in this default environment will be overwritten when another
// environment is selected, such as during `ionic build --prod`. For details,
// see `ionic build --help`.
//
// Import the environment like this: `import env from './environment';`
//
// Configure additional environments in `.angular-cli.json`.

import { EnvironmentSchema } from './schema';

const env: EnvironmentSchema = {
  name: 'development',
};
env['urlBackend'] = 'https://sonub.com:8443';
// env['urlBackend'] = 'https://www.ontue.com';
env['firebaseConfig'] = {
    apiKey: 'AIzaSyBEv8lzyUI6kB8RyxG8xKnzv4WA6KfS6e4',
    authDomain: 'ontue-client-sites.firebaseapp.com',
    databaseURL: 'https://ontue-client-sites.firebaseio.com',
    projectId: 'ontue-client-sites',
    storageBucket: 'ontue-client-sites.appspot.com',
    messagingSenderId: '328021421807'
};
export default env;
