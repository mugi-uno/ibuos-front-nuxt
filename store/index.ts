import cookieparser from 'cookieparser';
import { Commit } from 'vuex';

const parseTokenFromCookie = (cookie): string => {
  if (!cookie) return '';

  const parsed = cookieparser.parse(cookie);

  if (!parsed.auth) return '';

  return JSON.parse(parsed.auth).idToken || '';
};

export const actions = {
  async nuxtServerInit(
    { commit }: { commit: Commit },
    { req, app }: { req: any; app: any }
  ) {
    // Cookieをもとに認証状態を復元する
    const idToken: string = parseTokenFromCookie(req.headers.cookie);

    if (idToken) {
      const res = await app.$axios
        .$get('/auth/check', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .catch(() => null);

      if (res && res.authenticated) {
        commit('auth/SET_USER', { res: res || {}, idToken });
      } else {
      }
    }
    await Promise.resolve();
  },
};
