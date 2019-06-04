import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC6PEHk0Duv6z5t1Oz3RIqpCZqbZDVzEXI',
    authDomain: 'think-piece-fc24e.firebaseapp.com',
    databaseURL: 'https://think-piece-fc24e.firebaseio.com',
    projectId: 'think-piece-fc24e',
    storageBucket: 'think-piece-fc24e.appspot.com',
    messagingSenderId: '644724385284',
    appId: '1:644724385284:web:54bd0f3458ed4e44',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
//   just for debugging
window.firebase = firebase;

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return;

    // Reference
    const userRef = await firestore.doc(`users/${user.uid}`);

    // Documen
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const createdAt = new Date();
        const { displayName, email, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            });
            console.log(await userRef.get());
        } catch (err) {
            console.error(err);
        }
    }

    return await getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
    if (!uid) return null;
    console.log({ uid });

    try {
        const userDocument = await firestore
            .collection('users')
            .doc(uid)
            .get();

        console.log({ userDocument, exists: userDocument.exists });
        return { uid, ...userDocument.data() };
    } catch (err) {
        console.error(err);
    }
};

export default firebase;
