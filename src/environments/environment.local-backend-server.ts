export const environment = {
    production: false,
    hmr: false,
    // urlBackend: 'http://workserver.ontue.com',
    // urlBackend: 'https://www.ontue.com',
    urlBackend: 'https://sonub.com:8443',
    firebaseConfig: {
        apiKey: 'AIzaSyBEv8lzyUI6kB8RyxG8xKnzv4WA6KfS6e4',
        authDomain: 'ontue-client-sites.firebaseapp.com',
        databaseURL: 'https://ontue-client-sites.firebaseio.com',
        projectId: 'ontue-client-sites',
        storageBucket: 'ontue-client-sites.appspot.com',
        messagingSenderId: '328021421807'
    },
    reloadTag: (new Date).getTime(), /// Warning this must be only in environment.
    disableFirebaseUserActivityLog: false,
    categories: {
        reminders: 2,
        policy: 4,
        termsandconditions: 3,
        'teacher-policy': 5
    }
  };
