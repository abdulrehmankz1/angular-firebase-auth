import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from './environments/environment';

const firebaseApp = initializeApp(environment.firebaseConfig);
const auth = getAuth(firebaseApp);

export { firebaseApp, auth }; // Ensure auth is exported
