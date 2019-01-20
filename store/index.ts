import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { Commit, Dispatch } from 'vuex';
import { NuxtContext } from '~/types';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

const parseTokenFromCookie = cookieString => {
  if (!cookieString) return '';

  const parsed = cookie.parse(cookieString);

  if (!parsed.auth || !parsed.rt) return null;

  return (
    {
      auth: JSON.parse(parsed.auth),
      rt: parsed.rt,
    } || null
  );
};

const tokenRefresh = async (
  $axios: NuxtAxiosInstance,
  refreshToken: string
) => {
  const res = await $axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${
      process.env.FIREBASE_API_KEY
    }`,
    { grant_type: 'refresh_token', refresh_token: refreshToken }
  );

  return {
    idToken: res.data.id_token,
    refreshToken: res.data.refresh_token,
  };
};

const writeTokenCookie = (res, idToken, refreshToken) => {
  const decoded = jwt.decode(idToken);
  const secure = process.env.NODE_ENV === 'production';
  const expires = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000);
  const path = '/';

  res.setHeader('Set-Cookie', [
    cookie.serialize('auth', JSON.stringify({ idToken, exp: decoded.exp }), {
      secure,
      expires,
      path,
    }),
    cookie.serialize('rt', refreshToken, { secure, expires, path }),
  ]);
};

export const actions = {
  async nuxtServerInit(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    { req, res, app }: NuxtContext
  ) {
    // Cookieをもとに認証状態を復元する
    const cookieValue = parseTokenFromCookie((req.headers as any).cookie);
    if (!cookieValue) return;

    const auth = cookieValue.auth;
    const refreshToken = cookieValue.rt;

    if (!auth.idToken || !auth.exp) return;

    // 有効期限が切れている場合はトークンを再取得する
    // (処理・通信時間を考慮して５分ほど猶予を見る)
    let idToken;
    if (auth.exp < new Date().getTime() + 300) {
      try {
        const data = await tokenRefresh(app.$axios, refreshToken);
        writeTokenCookie(res, data.idToken, data.refreshToken);
        idToken = data.idToken;
      } catch (_e) {
        idToken = null;
      }
    } else {
      idToken = auth.idToken;
    }

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
