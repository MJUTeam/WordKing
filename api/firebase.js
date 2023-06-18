import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdl1a97jdzDwZDQMG7i54JbmI7-XXaSXk',
  authDomain: 'wordking-3a036.firebaseapp.com',
  projectId: 'wordking-3a036',
  storageBucket: 'wordking-3a036.appspot.com',
  messagingSenderId: '754094156608',
  appId: '1:754094156608:web:9a20bd9a23fd1d4fbd28a5',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export { firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
