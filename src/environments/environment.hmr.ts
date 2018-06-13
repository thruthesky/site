export const environment = {
    production: false,
    hmr: true,
    urlBackend: 'https://sonub.com:8443',
    firebaseConfig: {
        apiKey: 'AIzaSyCF9jsyLjQEDi4963DpOYi2wV0j19XSM2Q',
        authDomain: 'ontue-30fb9.firebaseapp.com',
        databaseURL: 'https://ontue-30fb9.firebaseio.com',
        projectId: 'ontue-30fb9',
        storageBucket: '',
        messagingSenderId: '1068647439857'
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
