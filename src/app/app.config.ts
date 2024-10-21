import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from './environments/environment';

// Initialize Firebase
const firebaseApp = initializeApp(environment.firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(firebaseApp);

// Export the app and auth objects
export { firebaseApp, auth };
