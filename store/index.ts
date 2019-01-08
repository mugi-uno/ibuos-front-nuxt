import cookieparser from 'cookieparser';
import { Commit } from 'vuex';

const parseTokenFromCookie = (cookie) => {
  if (!cookie) return '';

  const parsed = cookieparser.parse(cookie);

  if (!parsed.auth) return '';

  return JSON.parse(parsed.auth) || {};
};

export const actions = {
  async nuxtServerInit(
    { commit }: { commit: Commit },
    { req, app }: { req: any; app: any }
  ) {
    // Cookieをもとに認証状態を復元する
    const auth = parseTokenFromCookie(req.headers.cookie);

    if (!auth.idToken || !auth.exp) return;

    // 有効期限が切れている場合はトークンを再取得する
    // (処理・通信時間を考慮して５分ほど猶予を見る)
    let idToken;
    if (auth.exp < new Date().getTime() + 300)

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
      }
    }
    await Promise.resolve();
  },
};
