import { GetterTree, ActionTree, MutationTree } from 'vuex';
import * as uuid from 'uuid/v4';

export const name = 'flash';

export const types = {
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT',
};

export enum AlertType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface Alert {
  key: string;
  title: string;
  type: AlertType;
  hops: number;
}

export interface State {
  alerts: Alert[];
}

export const state = (): State => ({ alerts: [] });

export const getters: GetterTree<State, any> = {};

export const actions: ActionTree<State, any> = {
  addSuccessAlert(context, { title, redirect }) {
    context.commit(types.ADD_ALERT, {
      title,
      type: AlertType.Success,
      redirect,
    });
  },
  addInfoAlert(context, { title, redirect }) {
    context.commit(types.ADD_ALERT, { title, type: AlertType.Info, redirect });
  },
  addWarningAlert(context, { title, redirect }) {
    context.commit(types.ADD_ALERT, {
      title,
      type: AlertType.Warning,
      redirect,
    });
  },
  addErrorAlert(context, { title, redirect }) {
    context.commit(types.ADD_ALERT, { title, type: AlertType.Error, redirect });
  },
  removeAlert(context, { key }) {
    context.commit(types.REMOVE_ALERT, { key });
  },
  clearAlert(context) {
    context.commit(types.CLEAR_ALERT);
  },
};

export const mutations: MutationTree<State> = {
  [types.ADD_ALERT](
    state,
    payload: {
      title: string | string[];
      type: AlertType;
      push: boolean;
      redirect: boolean;
    }
  ) {
    if (!payload.push) {
      state.alerts = [];
    }
    const titles =
      typeof payload.title === 'string' ? [payload.title] : payload.title;
    titles.forEach(title => {
      const newAlert = {
        title,
        type: payload.type,
        key: uuid(),
        hops: payload.redirect ? 1 : 0,
      };

      state.alerts.push(newAlert);
    });
  },

  [types.REMOVE_ALERT](state, { key }) {
    const index = state.alerts.findIndex(alert => alert.key === key);
    state.alerts.splice(index, 1);
  },

  [types.CLEAR_ALERT](state) {
    state.alerts = state.alerts
      .filter(alert => alert.hops > 0)
      .map(alert => ({
        ...alert,
        hops: alert.hops - 1,
      }));
  },
};
