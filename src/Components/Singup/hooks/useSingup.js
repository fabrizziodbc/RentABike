import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseConfig } from '../../../../config/database/firebase';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from 'firebase/firestore';
import { setDeviceToken } from '../../../utils/setDeviceToken';
import { registerForPushNotifications } from '../../../utils/registerForPushNotifications';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export const useSingup = async (
  email,
  password,
  phoneNumber,
  displayName,
  navigation,
  setLoading,
) => {
  setLoading(true);
  await createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  await updateProfile(auth.currentUser, {
    displayName: displayName,
  }).catch((error) => {
    console.log(error);
  });
  const token = await registerForPushNotifications();
  console.log('token desde singuo', token);
  const uid = auth.currentUser.uid;
  try {
    await setDoc(doc(db, 'User', uid), {
      name: displayName,
      email,
      phoneNumber,
      img: 'https://firebasestorage.googleapis.com/v0/b/rent-abike.appspot.com/o/cd579617-31a7-42f8-b3b7-4ff46463ae0f?alt=media&token=572d7dbc-2cd6-4999-8ced-b4f32b44029d',
      deviceToken: token,
    });
    await setDeviceToken(uid);
    setLoading(false);
    navigation.replace('OnboardingScreen');
  } catch (error) {
    setLoading(false);
    Alert.alert('Upps', error);
    console.error('Error adding document: ', error);
  }
  console.log('sesión iniciado :', uid);
};
