// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    // urlBackend: 'http://workserver.ontue.com',
    urlBackend: 'https://www.ontue.com',
    // urlBackend: 'https://sonub.com:8443',
    firebaseConfig: {
        apiKey: 'AIzaSyBEv8lzyUI6kB8RyxG8xKnzv4WA6KfS6e4',
        authDomain: 'ontue-client-sites.firebaseapp.com',
        databaseURL: 'https://ontue-client-sites.firebaseio.com',
        projectId: 'ontue-client-sites',
        storageBucket: 'ontue-client-sites.appspot.com',
        messagingSenderId: '328021421807'
    },
    reloadTag: (new Date).getTime(), /// Warning this must be only in environment.
    disableFirebaseUserActivityLog: true,
    categories: {
        reminders: 2,
        policy: 4,
        termsandconditions: 3
    }
  };

  /*
   * In development mode, to ignore zone related error stack frames such as
   * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
