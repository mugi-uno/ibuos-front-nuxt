import { ItemResponse, PaginatingResponse, AnyUserResponse } from './interfaces';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ItemForm } from '~/presenters/itemForm';
import * as changeCase from 'change-case-object';

export const top = async ($axios: NuxtAxiosInstance, page: number = 1) => {
  const res: {
    fresh_items: {
      list: ItemResponse[];
      meta: PaginatingResponse;
    };
  } = (await $axios.$get('/top', { params: { page } })) as any;

  return res;
};

export const getGenreItems = async (
  $axios: NuxtAxiosInstance,
  genreName: string,
  page: number = 1
) => {
  const res: {
    list: ItemResponse[];
    meta: PaginatingResponse;
  } = (await $axios.$get(`/genres/${encodeURIComponent(genreName)}/items`, {
    params: { page },
  })) as any;

  return res;
};

export const getUserItems = async (
  $axios: NuxtAxiosInstance,
  userId: number,
  page: number = 1
) => {
  const res: {
    list: ItemResponse[];
    user: AnyUserResponse;
    meta: PaginatingResponse;
  } = (await $axios.$get(`/users/${userId}/items`, {
    params: { page },
  })) as any;

  return res;
};

export const getItem = async ($axios: NuxtAxiosInstance, id: number) => {
  const res: ItemResponse = (await $axios.$get(`/items/${id}`)) as any;
  return res;
};

export const saveItem = async ($axios: NuxtAxiosInstance, itemForm: ItemForm) => {
  await $axios.$post(`/items`, changeCase.snake({
    ...itemForm,
    ...itemForm.temporaryImage
  }));
};

export const updateItem = async ($axios: NuxtAxiosInstance, id: number, itemForm: ItemForm) => {
  await $axios.$patch(`/items/${id}`, changeCase.snake({
    ...itemForm,
    ...itemForm.temporaryImage
  }));
};

export const uploadTemporaryImage = async ($axios: NuxtAxiosInstance, file: any) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await $axios.post('/items/temporary_images', formData);
  return res;
};
