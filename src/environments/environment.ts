// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    hmr: false,
    // urlBackend: 'http://workserver.ontue.com',
    urlBackend: 'https://www.ontue.com',
    // urlBackend: 'https://sonub.com:8443',
    firebaseConfig: {
        apiKey: 'AIzaSyCF9jsyLjQEDi4963DpOYi2wV0j19XSM2Q',
        authDomain: 'ontue-30fb9.firebaseapp.com',
        databaseURL: 'https://ontue-30fb9.firebaseio.com',
        projectId: 'ontue-30fb9',
        storageBucket: '',
        messagingSenderId: '106864743985'
    },
    reloadTag: (new Date).getTime(), /// Warning this must be only in environment.
    disableFirebaseUserActivityLog: false,
    categories: {
        teacher_reminders: 2,
        student_reminders: 6,
        policy: 4,
        termsandconditions: 3,
        topearner: 5
    }
};

  /*
   * In development mode, to ignore zone related error stack frames such as
   * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
   * import the following file, but please comment it out in production mode
   * because it will have performance impact when throw error
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
