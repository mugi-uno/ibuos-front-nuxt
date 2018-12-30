import Vue from 'vue';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

interface NuxtContext {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  route: Route;
  store: Store<any>;
  env: object;
  query: object;
  nuxtState: object;
  req: Request;
  res: Response;
  params: { [key: string]: any };
  redirect: (path: string) => void;
  error: (params: { statusCode?: String; message?: String }) => void;
  beforeNuxtRender: (param: { Conmponents: any; nuxtState: any }) => void;
  $axios: NuxtAxiosInstance;
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    layout?: string;
    middleware?: string | String[];
    fetch?: (context: NuxtContext) => void;
    asyncData?: (context: NuxtContext) => void;
    scrollToTop?: boolean;
    transition?: string | object | Function;
    validate?: (context: NuxtContext) => boolean;
    head?: () => { [key: string]: any };
    watchQuery?: string[];
  }
}
