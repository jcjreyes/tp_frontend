import { authApi } from '../axios';

const post = authApi.post;
const get = authApi.get;
const destroy = authApi.delete;
const update = authApi.put;

export const Tags = {
  getAll: () => get('/tag/list/').then((resp) => resp.data),
  getOne: (pk) => get(`/tag/detail/${pk}/`).then((resp) => resp.data),
  create: ({ ...params }) => post('/tag/create/', params),
  updateTag: (pk, { ...params }) => update(`/review/update/${pk}`, params),
  deleteTag: (pk) => destroy(`/tag/delete/${pk}`).then((resp) => resp.data),
};
