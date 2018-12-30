import { User } from "~/store/auth";
import { NuxtContext } from "~/types";

const redirectToSignin = (context: NuxtContext) => {
  context.redirect(`/signin?r=${encodeURIComponent(context.route.path)}`);
};

export default async function (context: NuxtContext) {
  const user: User = context.store.state.auth.user;

  if (!user.id) {
    redirectToSignin(context);
    return;
  }

  // APIサーバに認証状態を確認する
  const res = await context.$axios.$get('/auth/check');

  if (!res || !res.authenticated) {
    redirectToSignin(context);
  }
}
