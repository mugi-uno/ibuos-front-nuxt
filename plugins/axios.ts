import { State as Auth } from '~/store/auth';

const initialize = ({ $axios, store, redirect }: any) => {
  $axios.onRequest((config: any) => {
    const auth: Auth = store.state.auth;
    const user = auth && auth.user;
    const idToken = user && user.idToken;
    if (idToken) {
      config.headers.common.Authorization = `Bearer ${idToken}`;
    }
    config.baseURL = `${process.env.API_HOST}${process.env.API_ROOT_PATH}`;

    return config;
  });

  $axios.onError(error => {
    // 認証エラーをハンドリングした場合は固定のエラーメッセージを表示する
    if (error && error.response && error.response.status === 401) {
      store.dispatch('alert/addWarningAlert', { title: 'ログインが必要です' });
    } else {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        store.dispatch('alert/addWarningAlert', {
          title: error.response.data.errorMessage,
        });
      } else {
        store.dispatch('alert/addWarningAlert', {
          title: 'エラーが発生しました。しばらくおいてから再度お試しください。',
        });
      }
    }
  });
};

export default initialize;
