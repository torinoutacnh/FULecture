/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// @types
import axios from 'utils/axios';

import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
//
import { firebaseConfig } from '../config';

import { RootState, useSelector } from '../redux/store';
import { getLecturerById } from '../redux/lecturers/api';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
    error: string | null;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, error } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      error
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<firebase.firestore.DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [userId, setUserId] = useState<any>();
  const [userDepartment, setDepartment] = useState();

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          getLecturerById(user.email)
            .then((response) => {
              if (response.status !== 404) {
                const docRef = firebase.firestore().collection('users').doc(user.uid);
                docRef
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      setProfile(doc.data());
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                setUserId(response.data.lecturerId);
                dispatch({
                  type: Types.Initial,
                  payload: { isAuthenticated: true, user, error: null }
                });
              } else {
                dispatch({
                  type: Types.Initial,
                  payload: { isAuthenticated: false, user: null, error: 'Account is Invalid' }
                });
              }
            })
            .catch((err) => {
              dispatch({
                type: Types.Initial,
                payload: { isAuthenticated: false, user: null, error: 'Account is Invalid' }
              });
            });
        } else {
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, error: 'Có lỗi' }
          });
        }
      }),
    [dispatch]
  );
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);

        if (user) {
          getLecturerById(user.email)
            .then((response) => {
              console.log(response);

              if (response.status !== 404) {
                const docRef = firebase.firestore().collection('users').doc(user.uid);
                docRef
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      setProfile(doc.data());
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });

                dispatch({
                  type: Types.Initial,
                  payload: { isAuthenticated: true, user, error: null }
                });
              } else {
                dispatch({
                  type: Types.Initial,
                  payload: { isAuthenticated: false, user: null, error: 'Account is Invalid' }
                });
              }
            })
            .catch((err) => {
              dispatch({
                type: Types.Initial,
                payload: { isAuthenticated: false, user: null, error: 'Account is Invalid' }
              });
            });
        } else {
          console.log('login error');

          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, error: 'Có lỗi' }
          });
        }
      }),
    [dispatch]
  );

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const a = firebase.auth().signInWithPopup(provider);
    a.then((result) => console.log(result));
    return a;
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('users')
          .doc(res.user?.uid)
          .set({
            uid: res.user?.uid,
            email,
            displayName: `${firstName} ${lastName}`
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
    localStorage.removeItem('semesterLocal');
    localStorage.removeItem('LecturerDepartment');
  };

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth: Partial<AuthUser> = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        error: state.error,
        user: {
          id: auth.uid,
          email: auth.email,
          photoURL: auth.photoURL || profile?.photoURL,
          displayName: auth.displayName || profile?.displayName,
          roles: 'lecturer',
          phoneNumber: auth.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || '',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: userId,
          about: profile?.about || '',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        updateProfile: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
