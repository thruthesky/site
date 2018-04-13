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
    apiKey: 'AIzaSyCF9jsyLjQEDi4963DpOYi2wV0j19XSM2Q',
    authDomain: 'ontue-30fb9.firebaseapp.com',
    databaseURL: 'https://ontue-30fb9.firebaseio.com',
    projectId: 'ontue-30fb9',
    storageBucket: '',
    messagingSenderId: '1068647439857'
};
export default env;
