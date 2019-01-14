import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import * as firebase from 'firebase/app';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import * as changeCase from 'change-case-object';
import { ProvierProfile } from '~/presenters/anyUser';

export const name = 'auth';

export const types = {
  SET_USER: 'SET_USER',
  INIT_USER: 'INIT_USER',
  SET_DISPLAY_NAME: 'SET_DISPLAY_NAME',
  LINK_PROVIDER: 'LINK_PROVIDER',
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
  profileOfGithub: ProvierProfile;
  profileOfTwitter: ProvierProfile;
  profileOfGoogle: ProvierProfile;
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
    profileOfGithub: { providerId: null, name: '', picture: '', url: '' },
    profileOfTwitter: { providerId: null, name: '', picture: '', url: '' },
    profileOfGoogle: { providerId: null, name: '', picture: '', url: '' }
  },
  initialized: false,
});

export const getters: GetterTree<State, any> = {
  isSignin: (state: State) => !!(state.user && state.user.idToken),
};

export const actions: ActionTree<State, any> = {
  async signin(context, authResult: firebase.auth.UserCredential) {
    const user: firebase.User = authResult.user!;
    const idToken: string = await context.dispatch('getIdToken', user);

    const res = await (this.$axios as NuxtAxiosInstance).$post(
      '/users',
      {
        additionalUserInfo: authResult.additionalUserInfo
      },
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    context.dispatch('saveTokenToCookie', {
      idToken,
      refreshToken: user.refreshToken,
    });
    context.commit(types.SET_USER, { res: res || {}, user, idToken });
  },

  saveTokenToCookie(_, { idToken, refreshToken }) {
    const decoded = jwt.decode(idToken);
    const secure = process.env.NODE_ENV === 'production';
    const expires = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);

    cookie.set('auth', { idToken, exp: decoded.exp }, { secure, expires });
    cookie.set('rt', refreshToken, { secure, expires });
  },

  async getIdToken(_, user: firebase.User): Promise<string> {
    const idToken: string = await user.getIdToken(true);
    return idToken;
  },

  async signOut(context): Promise<void> {
    context.commit(types.INIT_USER);
    cookie.remove('auth');
    cookie.remove('rt');
    await firebase.auth().signOut();
  },

  async linkProvider(context, authResult: firebase.auth.UserCredential) {
    const res = await (this.$axios as NuxtAxiosInstance).$post(
      `/myself/provider`, { additionalUserInfo: authResult.additionalUserInfo }
    );

    context.commit(types.LINK_PROVIDER, {
      profileOfGithub: changeCase.camel(res.profile_of_github),
      profileOfTwitter: changeCase.camel(res.profile_of_twitter),
      profileOfGoogle: changeCase.camel(res.profile_of_google),
    });
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
      profileOfGithub: changeCase.camel(res.profile_of_github),
      profileOfTwitter: changeCase.camel(res.profile_of_twitter),
      profileOfGoogle: changeCase.camel(res.profile_of_google),
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
      profileOfGithub: { providerId: null, name: '', picture: '', url: '' },
      profileOfTwitter: { providerId: null, name: '', picture: '', url: '' },
      profileOfGoogle: { providerId: null, name: '', picture: '', url: '' }
    };
  },
  
  [types.LINK_PROVIDER](
    state,
    payload: { profileOfGithub: ProvierProfile, profileOfTwitter: ProvierProfile, profileOfGoogle: ProvierProfile }
  ) {
    state.user.profileOfGithub = payload.profileOfGithub;
    state.user.profileOfTwitter = payload.profileOfTwitter;
    state.user.profileOfGoogle = payload.profileOfGoogle;
  },

  [types.SET_DISPLAY_NAME](state, displayName: string) {
    state.user.displayName = displayName;
  },
};
