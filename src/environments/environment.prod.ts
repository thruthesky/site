export const environment = {
    production: true,
    hmr: false,
    urlBackend: 'https://www.ontue.com',
    firebaseConfig: {
        apiKey: 'AIzaSyBEv8lzyUI6kB8RyxG8xKnzv4WA6KfS6e4',
        authDomain: 'ontue-client-sites.firebaseapp.com',
        databaseURL: 'https://ontue-client-sites.firebaseio.com',
        projectId: 'ontue-client-sites',
        storageBucket: 'ontue-client-sites.appspot.com',
        messagingSenderId: '328021421807'
    },
    reloadTag: 0,
    disableFirebaseUserActivityLog: false,
    categories: {
        teacher_reminders: 2,
        student_reminders: 6,
        policy: 4,
        termsandconditions: 3,
        topearner: 5
    }
};
