import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import * as firebase from 'firebase/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export const name = 'auth';

export const types = {
  SET_USER: 'SET_USER',
  INIT_USER: 'INIT_USER',
  SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
};

export interface User {
  id: number | null;
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
  refreshToken: string;
  idToken: string;
  likeSheetIds: number[];
}

export interface State {
  user: User;
  initialized: boolean;
}

export const state = (): State => ({
  user: {
    id: null,
    displayName: '',
    uid: '',
    email: '',
    photoURL: '',
    refreshToken: '',
    idToken: '',
    likeSheetIds: [],
  },
  initialized: false,
});

export const getters: GetterTree<State, any> = {
  isSignin: (state: State) => !!(state.user && state.user.idToken),
};

export const actions: ActionTree<State, any> = {
  async signin(context, user) {
    const idToken: string = await context.dispatch('getIdToken', user);
    const res = await (this.$axios as NuxtAxiosInstance).$post(
      '/users',
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const decoded = jwt.decode(idToken);

    cookie.set('auth', { idToken, exp: decoded.exp });

    context.commit(types.SET_USER, { res: res || {}, user, idToken });
  },

  async getIdToken(_, user): Promise<string> {
    const idToken: string = await user.getIdToken(true);
    return idToken;
  },

  async signOut(context): Promise<void> {
    context.commit(types.INIT_USER);
    cookie.remove('auth');
    await firebase.auth().signOut();
  },

  async updateDisplayName(context, name: string): Promise<void> {
    await (this.$axios as NuxtAxiosInstance).$patch('/myself/name', { name });
    context.commit(types.SET_DISPLAY_NAME, name);
  },
};

export const mutations: MutationTree<State> = {
  [types.SET_USER](
    state,
    { res, user, idToken }: { res: any; user: firebase.User; idToken: string }
  ) {
    state.user = {
      id: res && res.id,
      displayName: (res && res.name) || '',
      email: (user && user.email) || '',
      idToken: idToken || '',
      photoURL: (res && res.picture) || '',
      refreshToken: (user && user.refreshToken) || '',
      uid: (user && user.uid) || '',
      likeSheetIds: [],
    };
  },

  [types.INIT_USER](state) {
    state.user = {
      id: null,
      displayName: '',
      uid: '',
      email: '',
      photoURL: '',
      refreshToken: '',
      idToken: '',
      likeSheetIds: [],
    };
  },

  [types.SET_DISPLAY_NAME](state, displayName: string) {
    state.user.displayName = displayName;
  },
};
